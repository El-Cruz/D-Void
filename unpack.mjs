import fs from "node:fs";
import path from "node:path";
import {
  BUNDLE_MARKER,
  BUNDLES,
  decodeTemplate,
  encodeTemplate,
  reencode,
  splitBundle,
  templateNameFor,
} from "./bundler.mjs";

function usage() {
  console.log(
    [
      "Usage:",
      "  node unpack.mjs                              unpack home_v2.html -> home_v2_template.html",
      "  node unpack.mjs <bundle.html>                 unpack any GHL bundle (home, menu, ingreso...)",
      "  node unpack.mjs <bundle.html> --out=FILE      write template to FILE",
      "  node unpack.mjs <bundle.html> --check         dry-run: decode + re-encode + decode, assert identity",
    ].join("\n"),
  );
  process.exit(1);
}

const args = process.argv.slice(2);
const positional = args.filter((a) => !a.startsWith("--"));
const flags = new Set(args.filter((a) => a.startsWith("--")));
let out = null;
const outArg = args.find((a) => a.startsWith("--out="));
if (outArg) out = outArg.slice("--out=".length);
if (flags.has("--help") || flags.has("-h")) usage();

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
if (flags.has("--check") || flags.has("--verify")) out = null;
if (!out && !flags.has("--check") && !flags.has("--verify")) out = templateNameFor(bundle);

const src = fs.readFileSync(bundle, "utf8");
if (!src.includes(BUNDLE_MARKER)) {
  console.error(`"${bundle}" is not a GHL bundle (no ${BUNDLE_MARKER} found).`);
  process.exit(1);
}

if (flags.has("--check") || flags.has("--verify")) {
  const { prefix, body, suffix } = splitBundle(src);
  const html = decodeTemplate(body);
  const reencoded = encodeTemplate(html);
  const decodedAgain = decodeTemplate(reencoded);
  const htmlOk = decodedAgain === html;
  const prefixAfter = splitBundle(reencode(html, src)).prefix;
  console.log(`[check] ${bundle}`);
  console.log(`  original prefix:  ${prefix.length} bytes`);
  console.log(`  re-encoded prefix untouched: ${prefix === prefixAfter ? "yes" : "NO"}`);
  console.log(`  decode(encode(template)) === template: ${htmlOk ? "yes" : "NO"}`);
  console.log(`  template bytes: ${html.length}`);
  if (prefix !== prefixAfter || !htmlOk) process.exit(1);
  console.log("  round-trip OK (no data loss)");
} else {
  const html = decodeTemplate(splitBundle(src).body);
  fs.writeFileSync(out, html);
  const inPath = path.resolve(bundle);
  const outPath = path.resolve(out);
  console.log(`unpacked ${inPath} -> ${outPath} (${(html.length / 1024).toFixed(1)} KiB)`);
  console.log(`edit "${outPath}", then run: node reencode.mjs ${path.basename(bundle, ".html")}`);
}