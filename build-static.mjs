// Static publishing only: source pages and GHL bundles remain untouched.
import { cpSync, copyFileSync, mkdirSync, readdirSync, rmSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(root, 'dist');
const medicine = path.join(root, '2026-10/08-medicine.html');
// Check the entry point before replacing generated output.
const html = readFileSync(medicine, 'utf8');
if (!html.includes('MEDICINE After Dark')) throw new Error('Medicine entry point missing');
rmSync(output, { recursive: true, force: true });
mkdirSync(output);
for (const entry of readdirSync(root, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('.html')) {
    copyFileSync(path.join(root, entry.name), path.join(output, entry.name));
  } else if (entry.isDirectory() && /^\d{4}-\d{2}$/.test(entry.name)) {
    cpSync(path.join(root, entry.name), path.join(output, entry.name), { recursive: true });
  }
}
cpSync(path.join(root, 'Resources'), path.join(output, 'Resources'), {
  recursive: true,
  filter: source => source !== path.join(root, 'Resources/References'),
});
// Publish only runtime files; keep art masters and notes in the repository.
const hollywood = path.join(output, 'old-hollywood');
mkdirSync(path.join(hollywood, 'assets/img'), { recursive: true });
for (const file of ['index.html', 'styles.css', 'script.js']) {
  copyFileSync(path.join(root, 'old-hollywood', file), path.join(hollywood, file));
}
cpSync(path.join(root, 'old-hollywood/assets/img/web'), path.join(hollywood, 'assets/img/web'), { recursive: true });
copyFileSync(path.join(root, 'old-hollywood/assets/img/the-golden-ticket-v1.png'), path.join(hollywood, 'assets/img/the-golden-ticket-v1.png'));
copyFileSync(path.join(root, 'index.html'), path.join(output, 'dvoid-home.html'));
copyFileSync(medicine, path.join(output, 'index.html'));
console.log('Static build ready: dist/ — Medicine at /; D-Void home at /home');
