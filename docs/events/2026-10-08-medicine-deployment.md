# Medicine After Dark — publicación estática

## Diagnóstico

El prototipo vigente es `2026-10/08-medicine.html`. `git log --follow`
lo vincula al monitor CRT con canales interactivos y sus ajustes responsive;
el commit `1234d9d` normalizó el nombre. Es HTML con CSS, JavaScript y SVG
inline, sin imports, imágenes externas, fuentes descargadas, rutas locales
del computador ni dependencia de localhost. No es una SPA ni un bundle GHL.

El repositorio no tiene package.json, scripts npm ni Vite/React/Next.js.
Las utilidades unpack/reencode/verify son para bundles GHL, no para compilar
Medicine. El entry point previo era index.html (portada general), y
vercel.json no tenía una ruta /medicine. Estos problemas de enrutamiento
son verificables; no hay logs ni ajustes remotos disponibles para atribuir
un error de build específico a Vercel. `.vercel/project.json` contiene solo
identificación del proyecto, sin comandos ni framework.

## Configuración de Vercel

| Ajuste | Valor |
| --- | --- |
| Framework Preset | Other |
| Root Directory | Raíz del repositorio (campo vacío) |
| Build Command | `node build-static.mjs` |
| Output Directory | `dist` |
| Install Command | Vacío; sin instalación |

vercel.json fija framework, build, salida e instalación. Root Directory
se configura en el panel. No usar `2026-10` como raíz: perdería configuración,
script de publicación y recursos compartidos. No ejecutar npm run build.

El build nativo copia las páginas mensuales, HTML de raíz y Resources
(excepto referencias archivadas), sin transformar su contenido. Genera
dist/index.html desde Medicine, conserva la portada en dist/dvoid-home.html
y publica /home mediante rewrite. Conserva las demás rutas y añade /medicine.
No modifica originales ni bundles. dist es salida regenerable y está ignorada
por Git. No publica .env, .vercel, herramientas ni documentos de auditoría.

## Validación y reproducción

1. Fuente: `python -m http.server 8000 --bind 127.0.0.1`, abrir
   `/2026-10/08-medicine.html`. Python no aplica rewrites de Vercel.
2. Producción: `node build-static.mjs`.
3. Servir salida: `python -m http.server 8001 --bind 127.0.0.1 --directory dist`.
4. Abrir `http://127.0.0.1:8001/` directamente.

Chromium comprobó fuente y salida en 375×812 y 1440×900: carga de Medicine,
boot, canales CH-01/02/03, controles dentro del viewport, sin overflow
horizontal ni excepciones JS. JS inline y script de build pasan sintaxis.
Medicine y portada se compararon byte a byte contra las copias generadas;
todos los destinos de rewrites existen. Medicine no solicita assets externos
(salvo la búsqueda automática opcional de favicon.ico del navegador).
No se enviaron formularios ni se alteró la simulación existente.

No se ejecutó Vercel CLI: no está instalada y esta etapa no instala dependencias.
El build de producción ejecutado es el comando que Vercel usará. Verificar
URL y logs del nuevo deployment después de publicarlo; la prueba local de
salida no certifica CDN, configuración del panel ni estado de producción.
