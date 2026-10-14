import puppeteer from 'puppeteer';
import { createServer } from 'node:http';
import { readFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(root, 'capturas_octubre_2026');
const events = [
  ['2026-10-01', '01-la-tentacion.html'],
  ['2026-10-08', '08-medicine.html'],
  ['2026-10-15', '15-fashion-week.html'],
  ['2026-10-24', '24-freak-show.html'],
];
const profiles = [
  ['desktop', { width: 1920, height: 1080, deviceScaleFactor: 1 }],
  ['mobile', { width: 375, height: 812, deviceScaleFactor: 1, isMobile: true, hasTouch: true }],
];
const mime = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css',
  '.js': 'text/javascript', '.png': 'image/png', '.webp': 'image/webp',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.mp4': 'video/mp4',
};

// HTTP local conserva las rutas de assets relativas y absolutas de las páginas.
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const filename = path.resolve(root, `.${pathname}`);
    if (!filename.startsWith(`${root}${path.sep}`)) {
      response.writeHead(403).end();
      return;
    }
    const body = await readFile(filename);
    response.writeHead(200, { 'Content-Type': mime[path.extname(filename)] || 'application/octet-stream' });
    response.end(body);
  } catch {
    response.writeHead(404).end('Recurso no encontrado');
  }
});

let browser;
try {
  await mkdir(output, { recursive: true });
  for (const [, filename] of events) await access(path.join(root, '2026-10', filename));
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  browser = await puppeteer.launch({ headless: true });
  const base = `http://127.0.0.1:${server.address().port}`;
  for (const [date, filename] of events) {
    for (const [profile, viewport] of profiles) {
      const page = await browser.newPage();
      try {
        await page.setViewport(viewport);
        if (profile === 'mobile') {
          await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');
        }
        const response = await page.goto(`${base}/2026-10/${filename}`, {
          waitUntil: ['domcontentloaded', 'networkidle2'], timeout: 60000,
        });
        if (!response?.ok()) throw new Error(`No se pudo cargar ${filename}`);
        await page.evaluate(async () => {
          await document.fonts.ready;
          // Las imágenes lazy fuera del viewport no se cargan hasta hacer scroll.
          const images = Array.from(document.images).filter(img => img.loading !== 'lazy' || img.complete);
          await Promise.all(images.map(img => img.decode().catch(() => {})));
        });
        // Espera adicional para las animaciones de entrada; no espera loops infinitos.
        await delay(2000);
        const destination = path.join(output, `${date}-${profile}.png`);
        // Captura del viewport: dimensiones exactas, sin fullPage ni escala Retina.
        await page.screenshot({ path: destination, type: 'png', fullPage: false });
        console.log(`Guardada: ${path.relative(root, destination)}`);
      } finally {
        await page.close();
      }
    }
  }
} catch (error) {
  console.error('Error al generar capturas:', error.message);
  process.exitCode = 1;
} finally {
  try {
    if (browser) await browser.close();
  } finally {
    if (server.listening) await new Promise(resolve => server.close(resolve));
  }
}
