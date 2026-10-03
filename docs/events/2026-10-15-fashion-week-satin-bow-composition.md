# Satin Bow — etapa 2, integración y composición

> Estado actual: **Satin Bow es la única versión activa**, en `2026-10/15-fashion-week.html`. Consulte [la especificación vigente](2026-10-15-fashion-week-active.md). Este documento conserva el historial de una etapa anterior; sus rutas `work/`, comparadores y variantes describen material retirado y no deben usarse para continuar el trabajo. Las siguientes iteraciones se hacen en la página principal.


03/10/2026. Se integra el lazo transparente aprobado sobre el borde superior de la invitación, reservando espacio para los extremos antes del primer texto. Copa y zapatos acompañan el concepto/dress code en una sección existente: debajo del texto en móvil, en columna adyacente desde 700 px. Ningún asset decorativo tiene tarjeta, fondo, borde ni recorte.

Fondo perla #fff9f7, identidad rosa, marco fino de invitación, jerarquía centrada en hero y condiciones. Ancho de lectura limitado, ritmo vertical ajustado, formulario alineado a su contenedor; en móvil campos apilados, en escritorio nombre/apellido en la misma fila. CSS específico en `shared/satin-bow-composition.css`, sin afectar Original, Editorial ni Afterglow. Sin animaciones añadidas.

Se usó la skill redesign-existing-projects: inspección del stack nativo, diagnóstico del lazo rectangular y de la alineación, cambios acotados. No dependencias, commits ni push.

## Logo

La página usaba `/Resources/DVOID/dvoid-logo.png`: dependencia de la raíz del host, frágil al servir únicamente work/ o al trasladar el HTML. El archivo existe y carga en el servidor desde la raíz del proyecto; no se atribuye un 404 en ese entorno. Se copia exactamente el recurso oficial a `assets/publish/06-satin-bow/dvoid-logo.png`, se usa ruta relativa y dimensiones reales 700×262. Superficie oscura y ancho legible, sin filtros ni alterar logo. Futura entrega debe conservar o reescribir explícitamente esa ruta junto a los assets; no se certifica GHL.

## Accesibilidad y conservación

Decoraciones con alt vacío/aria-hidden, pointer-events:none, sin foco ni enlaces. Texto visible idéntico antes/después según extracción HTML. Horarios y condiciones preservados: 21h30, Girls Night hasta 23h00, +21, ellas $10 hasta 23h00 y general $15 después. Scripts satin.js y satin-review.js idénticos por SHA-256; campos, comportamiento y demostración sin cambios. No conexión backend ni confirmaciones reales.

## Verificación

Chromium headless vía HTTP localhost puerto 8000: 360, 390, 768 y 1440 px, capturas completas. Todas las imágenes cargadas, sin desbordamiento horizontal, sin errores de consola/recursos. El lazo termina 25 px antes del kicker en los cuatro anchos; no tapa título, fecha o CTA. Decoraciones no interceptan clics. Validación vacía marca tres campos; valores ficticios se mantienen al cambiar las cuatro opciones del comparador. No envíos externos. Foco visible y movimiento reducido conservados en CSS existente. Pendiente prueba en dispositivos reales/Instagram/WhatsApp y futura inserción GHL.

URL directa: http://127.0.0.1:8000/2026-10/15-fashion-week.html
