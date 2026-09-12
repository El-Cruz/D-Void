import fs from "node:fs";
import path from "node:path";
import {
  BUNDLE_MARKER,
  BUNDLES,
  bundleNameFor,
  decodeTemplate,
  md5,
  reencode,
  splitBundle,
  templateNameFor,
} from "./bundler.mjs";

function usage() {
  console.log(
    [
      "Usage:",
      "  node reencode.mjs                              reinsert home_v2_template.html into home_v2.html",
      "  node reencode.mjs <name|bundle.html>            e.g. 'home' / 'menu' / 'ingreso'",
      "  node reencode.mjs <bundle.html> <template.html> explicit pair",
      "  node reencode.mjs <name> --check                dry-run: report without writing files",
      "Guarantees the runtime + manifest prefix (everything before the template block) keeps an",
      "identical MD5. Only the <script type=\"__bundler/template\"> content is replaced.",
    ].join("\n"),
  );
  process.exit(1);
}

const args = process.argv.slice(2);
const positional = args.filter((a) => !a.startsWith("--"));
const flags = new Set(args.filter((a) => a.startsWith("--")));
const check = flags.has("--check") || flags.has("--dry-run");
if (flags.has("--help") || flags.has("-h")) usage();
if (positional.length > 2) usage();

let bundle = positional[0] || "home_v2.html";
if (!bundle.endsWith(".html") && !bundle.endsWith(".htm")) {
  const exact = BUNDLES.find((b) => b.slice(0, -".html".length) === bundle);
  const hit = exact || [...BUNDLES].sort((a, b) => b.length - a.length).find((b) => b.startsWith(bundle));
  if (!hit) {
    console.error(`Unknown page "${bundle}". Known: ${BUNDLES.join(", ")}`);
    process.exit(1);
  }
  bundle = hit;
}
if (!fs.existsSync(bundle)) {
  console.error(`Bundle not found: ${bundle}`);
  process.exit(1);
}

const template = positional[1] || templateNameFor(bundle);
if (!fs.existsSync(template)) {
  console.error(`Template not found: ${template}. Run 'node unpack.mjs ${path.basename(bundle, ".html")}' first.`);
  process.exit(1);
}
if (path.basename(template) !== templateNameFor(bundle)) {
  console.warn(`warning: template "${template}" does not match expected "${templateNameFor(bundle)}"`);
}

const html = fs.readFileSync(template, "utf8");
const src = fs.readFileSync(bundle, "utf8");
if (!src.includes(BUNDLE_MARKER)) {
  console.error(`"${bundle}" is not a GHL bundle (no ${BUNDLE_MARKER} found).`);
  process.exit(1);
}

const { prefix } = splitBundle(src);
const expectedMd5 = md5(prefix);
const candidate = reencode(html, src);
const { prefix: newPrefix } = splitBundle(candidate);
const newMd5 = md5(newPrefix);
const decoded = decodeTemplate(splitBundle(candidate).body);
const roundtripOk = decoded === html;

console.log(`[reencode] ${template} -> ${bundle}${check ? " (dry-run)" : ""}`);
console.log(`  template bytes:      ${Buffer.byteLength(html)}`);
console.log(`  bundle size before:  ${Buffer.byteLength(src)}`);
console.log(`  bundle size after:   ${Buffer.byteLength(candidate)}`);
console.log(`  runtime+manifest MD5 before: ${expectedMd5}`);
console.log(`  runtime+manifest MD5 after:  ${newMd5}`);
console.log(`  prefix (runtime+manifest) untouched: ${expectedMd5 === newMd5 ? "yes" : "NO"}`);
console.log(`  decode(encode(template)) === template: ${roundtripOk ? "yes" : "NO"}`);

if (expectedMd5 !== newMd5 || !roundtripOk) {
  console.error("FAIL: re-encode would corrupt the bundle. No file written.");
  process.exit(1);
}

if (!check) {
  fs.writeFileSync(bundle, candidate);
  console.log(`  written: ${bundle}`);
} else {
  console.log("  dry-run: no file written");
}