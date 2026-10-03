# Freak Show — corrección responsive y accesibilidad

Página: `2026-10/24-freak-show.html`. Preview: http://127.0.0.1:8000/2026-10/24-freak-show.html

03/10/2026. Auditoría y adaptación con impeccable. Git inicialmente limpio; únicamente esta página y este informe/capturas cambian. Fashion Week intacta. Sin instalaciones, commits ni push.

## Causas verificadas

- **P1, ancho móvil:** `.hero` usa `grid-template-columns:1fr` bajo 860 px; la columna conserva el mínimo intrínseco de `.hero-copy h1` (Halloween a 24vw, 86.4 px en 360). `.hero-copy` y `.machine-wrap` llegan a 525.6 px, derecha 540, dentro de un hero de 331.2 px. Root clientWidth 360, scrollWidth e innerWidth 540. Prueba aislada de overflow-wrap en h1 devolvió ambos a 360. A 390/430 el layout llegaba a 585/645. No es un meta viewport ausente: width=device-width, initial-scale=1 y viewport-fit ya estaban correctos, sin impedir zoom.
- **P1, entrada:** `.intro` fija se centra sobre ese layout ensanchado. `.stage` y `.footer` seguían ocupando el documento bajo las cortinas (scrollHeight 2903 en 360×800); no existía bloqueo del contenido/foco. A 844×390 `.intro-card` medía 466 px y botón bottom 399, cortado por overflow hidden.
- **P1, campos:** `.field input` tenía 14 px y outline:none. Es un factor conocido de zoom automático de Safari/iOS, no reproducible como dispositivo real aquí.
- **P2, ticket:** `.ticket-preview` oculto solo por altura/opacidad/transform todavía podía recibir foco; max-height:760px podía recortar contenido ampliado. `#stage` no tenía tabindex, por lo que el foco tras entrar no era efectivo.
- **P2, ruleta:** `.slot-window` centraba el reel de cuatro filas; se ancla al inicio para que el primer resultado y los saltos de 122 px correspondan a su ventana.
- `.curtain-photo` scale(1.03), `.curtain-half` y `.event-track` se extienden deliberadamente fuera de sus cajas. Se confirmó que no causan el ancho raíz cuando se corrige el hero; su recorte queda local en `.intro-scenery`/`.event-strip`. No hay SVG sin límites ni 100vw con padding como causa observada.

## Correcciones

Columnas minmax(0,1fr), mínimos de hijos resueltos, título móvil fluidamente ajustado sin scale de escena, máquina limitada al contenedor y ticket más legible. Se retira overflow-x:hidden global del body. Imágenes/SVG limitados al ancho. Campos 16 px/44 px, labels legibles y foco visible. Ticket sin máximo fijo al abrir.

Entrada en el flujo del documento con ancho disponible, safe areas y min-height dinámica; crece y permite scroll vertical del documento cuando el contenido lo requiere. Los adornos permanecen en una escena fija recortada. El interior se retira del layout y se marca inert solo durante el cierre. Al entrar se restauran layout, scroll y foco, sin manipular globalmente overflow. Timeout 1700 ms desbloquea incluso si la transición falla; modo reducido inmediato. No existe reapertura en el comportamiento actual. Ticket inert hasta reclamarlo. Sin JS, entrada oculta e interior/ticket disponibles.

Contenido, assets incrustados y handler de submit (payload, webhook, endpoint, estados y respuestas) comparados byte a byte: intactos. No se envió ningún formulario.

## Verificación

| Emulación | Ancho layout antes | Ancho después | Altura documento con entrada cerrada después |
|---|---:|---:|---:|
| 360×800 | 540 | 360 | 800 |
| 390×844 | 585 | 390 | 844 |
| 430×932 | 645 | 430 | 932 |
| 844×390 | 844 | 844 | 390 |
| 1440×900 | 1440 | 1440 (1425 de contenido con scrollbar) | 900 |

Chromium vía localhost, caché desactivada. Sin overflow horizontal antes/después; todos los botones de entrada dentro de pantalla normal, incluido horizontal; scroll vertical normal al entrar. Ticket sin recorte y Nombre enfocado al abrir. Enter abre cortinas y enfoca stage; Tab desde Nombre enfoca Apellido con outline sólido. Ruleta 122 px por resultado. Movimiento reducido inmediato, sin bloqueo. Altura 390×400 para simular teclado: WhatsApp visible, ancho 390. Texto al 200 % aplicado a entrada/ticket: sin overflow horizontal ni recorte del ticket, entrada permite scroll en horizontal. Sin JS: interior y ticket visibles. Consola sin errores. Sintaxis JS y git diff --check correctos.

Capturas antes/después: entrada a 360 y horizontal; formulario después a 390. Son capturas de emulación, no teléfonos físicos.

## Límites y pendientes

No se probó iPhone/Android real, Safari, barras dinámicas reales, teclado virtual real, pinch zoom ni lector de pantalla. Ampliación de texto simulada mediante estilos al 200 %. Detector estático ejecutado: 78 hallazgos, muchos relativos al concepto de feria conservado (rayas, marquee, tipografía condensada, bordes y sombras). Avisos rojos de 3.3:1 sobre título grande pasan umbral 3:1; no se tratan como error de texto normal. Sí quedan contrastes secundarios bajos (`.small-note`, `.promo small`, otros textos diminutos), y assets grandes embebidos: fuera de la corrección responsive, sin afirmar certificación WCAG ni rendimiento. La lógica de registro preexistente no fue auditada ni modificada como integración en esta etapa.

Confirmación final de texto 200 % horizontal: documento 718 px frente a viewport de 390, scrollY 328 y botón visible entre y=184.75–285.94. Al entrar: scrollY 0 y stage sin inert. Se repitieron los cinco tamaños tras pasar la entrada al flujo del documento: cero overflow horizontal, alturas cerradas iguales al viewport y consola sin errores.

Iteración posterior de apertura: el interior ya no usa display:none durante el cierre; permanece renderizado e inert detrás de una entrada fija y scroll restringido solo en ese estado. Esta mejora sustituye la estrategia de entrada en el flujo descrita arriba. Véase ../freak-show-transition-2026-10-03/transicion.md.
