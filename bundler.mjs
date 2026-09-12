import path from "node:path";
import { createHash } from "node:crypto";

export const BUNDLE_MARKER = 'type="__bundler/template"';
export const BUNDLES = ["home_v2.html", "home.html", "menu.html", "ingreso.html"];

export function templateNameFor(bundle) {
  const base = path.basename(bundle, ".html");
  return base.endsWith("_template") ? `${base}.html` : `${base}_template.html`;
}

export function bundleNameFor(template) {
  const base = path.basename(template, ".html");
  if (base.endsWith("_template")) return `${base.slice(0, -"_template".length)}.html`;
  return `${base}.html`;
}

export function decodeTemplate(raw) {
  return JSON.parse(raw.trim());
}

export function encodeTemplate(html) {
  return JSON.stringify(html).replace(/\//g, "\\u002F");
}

export function splitBundle(src) {
  const openRe = /(<script type="__bundler\/template">)([\s\S]*?)(<\/script>)/;
  const m = openRe.exec(src);
  if (!m) throw new Error(`No <script type="__bundler/template"> block found`);
  return {
    prefix: src.slice(0, m.index + m[1].length),
    body: m[2],
    suffix: src.slice(m.index + m[1].length + m[2].length),
  };
}

export function reencode(html, bundleSrc) {
  const { prefix, body, suffix } = splitBundle(bundleSrc);
  const encoded = encodeTemplate(html);
  const trimmed = body.trim();
  const lead = body.slice(0, body.indexOf(trimmed));
  const trail = body.slice(body.indexOf(trimmed) + trimmed.length);
  return prefix + lead + encoded + trail + suffix;
}

export function md5(text) {
  return createHash("md5").update(text, "utf8").digest("hex");
}