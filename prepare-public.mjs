import { cpSync, copyFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(root, 'public');

if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

// Copy monthly event folders
for (const entry of readdirSync(root, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('.html') && entry.name !== 'index.html') {
    copyFileSync(path.join(root, entry.name), path.join(publicDir, entry.name));
  } else if (entry.isDirectory() && /^\d{4}-\d{2}$/.test(entry.name)) {
    cpSync(path.join(root, entry.name), path.join(publicDir, entry.name), { recursive: true });
  }
}

// Copy original home to dvoid-home.html
if (existsSync(path.join(root, 'index.html'))) {
  copyFileSync(path.join(root, 'index.html'), path.join(publicDir, 'dvoid-home.html'));
}

// Copy Resources (excluding references)
if (existsSync(path.join(root, 'Resources'))) {
  cpSync(path.join(root, 'Resources'), path.join(publicDir, 'Resources'), {
    recursive: true,
    filter: source => !source.includes('Resources' + path.sep + 'references') && !source.includes('Resources/references'),
  });
}

console.log('Public assets prepared successfully for Next.js build!');
