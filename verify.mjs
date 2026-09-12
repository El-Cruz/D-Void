import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";
import { spawn, execSync } from "node:child_process";
import { decodeTemplate, splitBundle } from "./bundler.mjs";

const VIEWPORT = { width: 375, height: 812 };
const PAGE_TITLES = {
  "home_v2.html": "DVOID — Club de música electrónica",
  "home.html": "DVOID",
  "menu.html": "DVOID · Menú",
  "ingreso.html": "DVOID · Normas de ingreso",
};

const VOID_ELEMENTS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
]);
const RAW_TEXT_ELEMENTS = new Set(["script", "style", "textarea", "title", "noembed", "noframes"]);
const SKIP_SCRIPT_TYPES = new Set([
  "__bundler/template", "__bundler/manifest", "__bundler/page_order", "__bundler/ext_resources",
  "text/babel", "text/jsx", "application/json", "application/ld+json",
]);

function tokenizeHtml(html) {
  const tokens = [];
  const L = html.length;
  let i = 0;
  while (i < L) {
    const lt = html.indexOf("<", i);
    if (lt === -1) break;
    if (html.startsWith("<!--", lt)) {
      const fin = html.indexOf("-->", lt + 4);
      tokens.push({ type: "comment", start: lt, end: fin === -1 ? L : fin + 3 });
      i = fin === -1 ? L : fin + 3;
      continue;
    }
    let j = lt + 1;
    while (j < L && /\s/.test(html[j])) j++;
    if (html[j] === "!" || html[j] === "?") {
      const fin = html.indexOf(">", j);
      tokens.push({ type: "decl", start: lt, end: fin === -1 ? L : fin + 1 });
      i = fin === -1 ? L : fin + 1;
      continue;
    }
    if (html[j] === "/") {
      let k = j + 1;
      while (k < L && /\s/.test(html[k])) k++;
      const m = /^[a-zA-Z][\w-]*/.exec(html.slice(k));
      const fin = html.indexOf(">", lt + 2);
      if (m) tokens.push({ type: "close", name: m[0].toLowerCase(), start: lt, end: fin === -1 ? L : fin + 1 });
      i = fin === -1 ? L : fin + 1;
      continue;
    }
    const m = /^[a-zA-Z][\w-]*/.exec(html.slice(j));
    if (m) {
      const name = m[0].toLowerCase();
      let k = j + m[0].length;
      let selfClose = false;
      let gt = -1;
      let q = null;
      for (; k < L; k++) {
        const ch = html[k];
        if (q) { if (ch === q) q = null; continue; }
        if (ch === '"' || ch === "'") { q = ch; continue; }
        if (ch === "/" && html[k + 1] === ">") { selfClose = true; gt = k + 1; break; }
        if (ch === ">") { gt = k; break; }
      }
      if (gt === -1) { tokens.push({ type: "unterminated", name, start: lt, end: L }); break; }
      const attrText = html.slice(j + m[0].length, gt);
      if (RAW_TEXT_ELEMENTS.has(name) && !selfClose) {
        const rest = html.slice(gt + 1);
        const closeRe = new RegExp(`<\\s*\\/\\s*${name}\\s*>`);
        const cm = closeRe.exec(rest);
        if (cm) {
          const openStart = gt + 1;
          const contentStart = openStart;
          const content = rest.slice(0, cm.index);
          tokens.push({
            type: "raw", name, attrText, content,
            contentStart, closed: true, start: lt, end: gt + 1 + cm.index + cm[0].length,
          });
          i = gt + 1 + cm.index + cm[0].length;
        } else {
          tokens.push({
            type: "raw", name, attrText, content: "", contentStart: gt + 1,
            closed: false, start: lt, end: L,
          });
          i = L;
        }
      } else {
        tokens.push({ type: "open", name, selfClose, attrText, start: lt, end: gt + 1 });
        i = gt + 1;
      }
      continue;
    }
    i = lt + 1;
  }
  return tokens;
}

function checkHtmlBalance(html) {
  const issues = [];
  const stack = [];
  for (const t of tokenizeHtml(html)) {
    if (t.type === "open") {
      if (!t.selfClose && !VOID_ELEMENTS.has(t.name)) stack.push(t.name);
    } else if (t.type === "close") {
      if (!stack.length) issues.push(`unexpected closing </${t.name}> at offset ${t.start}`);
      else if (stack[stack.length - 1] !== t.name) {
        issues.push(`mismatched closing </${t.name}> at offset ${t.start}; expected </${stack[stack.length - 1]}>`);
        stack.pop();
      } else stack.pop();
    } else if (t.type === "raw" && !t.closed) {
      issues.push(`unterminated raw-text element <${t.name}> (rest of document treated as its content)`);
    }
  }
  for (const name of stack) issues.push(`unclosed <${name}>`);
  return issues;
}

function checkScriptSyntax(html) {
  const issues = [];
  let checked = 0;
  let skippedExternal = 0;
  for (const t of tokenizeHtml(html)) {
    if (t.type !== "raw" || t.name !== "script") continue;
    const typeAttr = ((t.attrText || "").match(/type\s*=\s*(["'])(.*?)\1/) || [])[2] || "";
    const type = typeAttr.toLowerCase();
    if (SKIP_SCRIPT_TYPES.has(type) || type.startsWith("__bundler")) continue;
    const srcAttr = (t.attrText || "").match(/\bsrc\s*=\s*(["'])(.*?)\1/);
    if (srcAttr) { skippedExternal++; continue; }
    const code = t.content;
    if (!code.trim()) continue;
    try {
      if (type === "module") {
        checkModuleSyntax(code, issues);
      } else {
        new Function(code);
      }
      checked++;
    } catch (e) {
      issues.push(`script syntax error (type="${type}"): ${e.message}`);
    }
  }
  return { issues, checked, skippedExternal };
}

function checkModuleSyntax(code, issues) {
  const tmp = path.join(os.tmpdir(), `dvoid-check-${process.pid}-${Math.random().toString(36).slice(2)}.mjs`);
  fs.writeFileSync(tmp, code);
  try {
    execSync(`node --check "${tmp}"`, { stdio: "pipe" });
  } catch (e) {
    issues.push(`module script syntax error: ${String(e.stderr || e.message).trim().slice(0, 300)}`);
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

// ───────────────────────── CDP browser harness ─────────────────────────

function findChromium() {
  for (const bin of ["chromium", "chromium-browser", "google-chrome", "google-chrome-stable", "chrome"]) {
    try {
      const out = execSync(`command -v ${bin} 2>/dev/null`).toString().trim();
      if (out) return out;
    } catch {}
  }
  return null;
}

class Cdp {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.pending = new Map();
    this.events = [];
  }
  async open() {
    if (this.ws.readyState === WebSocket.OPEN) return;
    await new Promise((res, rej) => {
      this.ws.addEventListener("open", res, { once: true });
      this.ws.addEventListener("error", () => rej(new Error("CDP websocket failed")), { once: true });
    });
    this.ws.addEventListener("message", (ev) => this.onMessage(String(ev.data)));
  }
  onMessage(data) {
    const msg = JSON.parse(data);
    if (msg.id) {
      const p = this.pending.get(msg.id);
      if (!p) return;
      this.pending.delete(msg.id);
      if (msg.error) p.reject(new Error(JSON.stringify(msg.error)));
      else p.resolve(msg.result);
    } else if (msg.method) {
      this.events.push(msg);
    }
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  clearEvents() {
    this.events.length = 0;
  }
  async waitEvent(method, timeoutMs = 30000) {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      const idx = this.events.findIndex((e) => e.method === method);
      if (idx !== -1) return this.events.splice(idx, 1)[0].params;
      await new Promise((r) => setTimeout(r, 50));
    }
    throw new Error(`timeout waiting for ${method}`);
  }
  close() {
    try { this.ws.close(); } catch {}
  }
}

function startServer(files) {
  const server = http.createServer((req, res) => {
    const name = decodeURIComponent(req.url.split("?")[0].replace(/^\//, ""));
    const full = /\.html$/.test(name) ? name : `${name}.html`;
    fs.readFile(path.join(files, full), (err, buf) => {
      if (err) { res.writeHead(404); res.end("not found"); return; }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(buf);
    });
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve({ server, port: server.address().port }));
  });
}

function launchChromium(binary) {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "dvoid-chrome-"));
  const proc = spawn(binary, [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--disable-background-networking",
    "--remote-debugging-port=0",
    `--user-data-dir=${profile}`,
    "about:blank",
  ], { stdio: ["ignore", "ignore", "pipe"] });
  return new Promise((resolve, reject) => {
    let resolved = false;
    let stderrBuf = "";
    const t = setTimeout(() => { if (!resolved) reject(new Error("chromium did not report a debugging port")); }, 20000);
    proc.stderr.on("data", (chunk) => {
      stderrBuf += String(chunk);
      const m = stderrBuf.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (!m || resolved) return;
      resolved = true;
      const port = Number(new URL(m[1]).port);
      const finish = async (url) => {
        clearTimeout(t);
        resolve({ proc, pageWsUrl: url, profile });
      };
      (async () => {
        try {
          const res = await fetch(`http://127.0.0.1:${port}/json/list`);
          const list = await res.json();
          const page = list.find((tg) => tg.type === "page");
          if (page) return finish(page.webSocketDebuggerUrl);
          throw new Error("no page target found");
        } catch (e) {
          clearTimeout(t);
          reject(e);
        }
      })();
    });
    proc.on("exit", (code) => {
      if (!resolved) { clearTimeout(t); reject(new Error(`chromium exited early (code ${code})`)); }
    });
  });
}

async function checkInBrowser(cdp, port, bundle) {
  const title = PAGE_TITLES[bundle];
  cdp.clearEvents();
  await cdp.send("Page.navigate", { url: `http://127.0.0.1:${port}/${bundle}` });
  await cdp.waitEvent("Page.loadEventFired", 30000);
  // Poll until the bundle runtime has mounted the template (its <title> is the identity signal).
  const deadline = Date.now() + 30000;
  let mounted = false;
  while (Date.now() < deadline) {
    const r = await cdp.send("Runtime.evaluate", {
      expression: `document.readyState === 'complete' && document.title === ${JSON.stringify(title)}`,
      returnByValue: true,
    });
    if (r.result?.value) { mounted = true; break; }
    await new Promise((r) => setTimeout(r, 250));
  }
  if (!mounted) {
    const snap = await cdp.send("Runtime.evaluate", {
      expression: "({title: document.title, state: document.readyState, bodyLen: (document.body ? document.body.innerHTML.length : -1)})",
      returnByValue: true,
    });
    throw new Error(`template never mounted; title=${JSON.stringify(snap.result?.value?.title)}, state=${snap.result?.value?.state}`);
  }
  await new Promise((r) => setTimeout(r, 1500)); // let layout/fonts settle

  const metrics = await cdp.send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const de = document.documentElement, b = document.body;
      const overflowers = [...document.querySelectorAll('*')]
        .map((el) => { const r = el.getBoundingClientRect(); return { el, r }; })
        .filter(({ r }) => r.right > window.innerWidth + 1 || r.left < -1)
        .slice(0, 10)
        .map(({ el }) => {
          const cls = typeof el.className === 'string' && el.className ? '.' + String(el.className).trim().split(/\\s+/)[0] : '';
          return el.tagName.toLowerCase() + cls;
        });
      return {
        scrollX: window.scrollX,
        innerWidth: window.innerWidth,
        deScrollWidth: de.scrollWidth,
        deClientWidth: de.clientWidth,
        bodyScrollWidth: b ? b.scrollWidth : 0,
        overflowers,
      };
    })()`,
  });
  const m = metrics?.result?.value ?? {};
  const overflow = m.scrollX !== 0 || m.deScrollWidth > m.innerWidth || (m.bodyScrollWidth ?? 0) > m.innerWidth;

  const consoleErrors = [];
  for (const ev of cdp.events) {
    if (ev.method === "Runtime.exceptionThrown") {
      const d = ev.params?.exceptionDetails || {};
      consoleErrors.push(`exception: ${d.text} ${d.exception?.description || ""}`.trim().slice(0, 300));
    } else if (ev.method === "Runtime.consoleAPICalled" && ev.params?.type === "error") {
      const args = (ev.params.args || []).map((a) => a.value ?? a.description ?? a.unserializableValue ?? "").join(" ");
      consoleErrors.push(`console.error: ${args}`.slice(0, 300));
    } else if (ev.method === "Page.loadFailed") {
      consoleErrors.push(`load failed: ${ev.params?.errorText} (${ev.params?.url?.slice(0, 80)})`);
    }
  }

  return {
    mounted,
    metrics: m,
    overflow,
    consoleErrors: consoleErrors.filter((e, i, a) => a.indexOf(e) === i),
  };
}

// ───────────────────────── CLI ─────────────────────────

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const positional = args.filter((a) => !a.startsWith("--"));
const onlyStatic = flags.has("--static");
const onlyBrowser = flags.has("--browser");
const pages = positional.length
  ? positional.map((p) => (p.endsWith(".html") ? p : `${p}.html`))
  : ["home_v2.html", "home.html", "menu.html", "ingreso.html"];

let failures = 0;

for (const bundle of pages) {
  console.log(`\n── ${bundle} ──`);
  const src = fs.readFileSync(bundle, "utf8");
  if (!src.includes('type="__bundler/template"')) {
    console.error(`  SKIP: not a GHL bundle`);
    failures++;
    continue;
  }
  const html = decodeTemplate(splitBundle(src).body);

  if (!onlyBrowser) {
    const tagIssues = checkHtmlBalance(html);
    const { issues: jsIssues, checked, skippedExternal } = checkScriptSyntax(html);
    const tagOk = tagIssues.length ? "FAIL" : "ok";
    const jsOk = jsIssues.length ? "FAIL" : "ok";
    console.log(
      `  static: html tag balance ${tagOk} | js syntax (${checked} scripts` +
      `${skippedExternal ? `, ${skippedExternal} external skipped` : ""}) ${jsOk}`,
    );
    for (const i of tagIssues) { console.log(`    [tag] ${i}`); failures++; }
    for (const i of jsIssues) { console.log(`    [js]  ${i}`); failures++; }
  }
}

if (!onlyStatic) {
  const binary = findChromium();
  if (!binary) {
    console.error("\n[browser] chromium not found — install chromium or run with --static");
    process.exitCode = 2;
  } else {
    let cdp = null;
    let proc = null;
    let profile = null;
    let server = null;
    try {
      ({ server } = await startServer(process.cwd()));
      const { proc: p, pageWsUrl, profile: prof } = await launchChromium(binary);
      proc = p; profile = prof;
      cdp = new Cdp(pageWsUrl);
      await cdp.open();
      await cdp.send("Page.enable");
      await cdp.send("Runtime.enable");
      await cdp.send("Emulation.setDeviceMetricsOverride", {
        width: VIEWPORT.width, height: VIEWPORT.height,
        screenWidth: VIEWPORT.width, screenHeight: VIEWPORT.height,
        deviceScaleFactor: 1, mobile: true,
      });
      for (const bundle of pages) {
        if (!fs.existsSync(bundle)) continue;
        console.log(`\n── ${bundle} (browser, 375×812) ──`);
        try {
          const res = await checkInBrowser(cdp, server.address().port, bundle);
          const { metrics: m } = res;
          console.log(`  mounted template: yes (title: ${JSON.stringify(PAGE_TITLES[bundle])})`);
          console.log(
            `  overflow: ${res.overflow ? "FAIL" : "ok"} (scrollX=${m.scrollX}, innerWidth=${m.innerWidth}, ` +
            `docScrollWidth=${m.deScrollWidth})`,
          );
          if (res.overflow) {
            failures++;
            for (const o of m.overflowers || []) console.log(`    [overflow] ${o}`);
          }
          console.log(`  console errors: ${res.consoleErrors.length ? res.consoleErrors.length + " (see below) FAIL" : "0 (ok)"}`);
          for (const e of res.consoleErrors) { console.log(`    [console] ${e}`); failures++; }
        } catch (e) {
          console.error(`  [browser] ${e.message}`);
          failures++;
        }
      }
    } finally {
      if (cdp) cdp.close();
      if (proc) { try { proc.kill("SIGKILL"); } catch {} }
      if (profile) { try { fs.rmSync(profile, { recursive: true, force: true }); } catch {} }
      if (server) server.close();
    }
  }
}

console.log(failures ? `\nVERIFY: ${failures} failure(s)` : `\nVERIFY: all checks passed`);
process.exit(failures ? 1 : 0);