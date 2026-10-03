# Satin Bow — etapa 3, microanimaciones

> Estado actual: **Satin Bow es la única versión activa**, en `2026-10/15-fashion-week.html`. Consulte [la especificación vigente](2026-10-15-fashion-week-active.md). Este documento conserva el historial de una etapa anterior; sus rutas `work/`, comparadores y variantes describen material retirado y no deben usarse para continuar el trabajo. Las siguientes iteraciones se hacen en la página principal.


03/10/2026. Se mantiene la composición aprobada, textos, datos y lógica del registro. No se prepara paquete GHL ni se publica. Sin dependencias, commits ni push. Assets y variantes anteriores conservados.

Skills leídas: impeccable (context, animate, craft-floor) y web-perf. El motor local de impeccable context se ejecutó sin descargas y autorizó el refinamiento acotado sobre la implementación existente; no hay PRODUCT.md. Se consultó también la entrada de HyperFrames: la entrega solicitada sigue siendo microinteracciones de una página nativa, no composición de video, y no se incorpora framework alguno.

## Sistema

- Foco visual: lazo que entra 480 ms, con un balanceo de 3200 ms máximo de ±0,7 grados, luego permanece quieto. Sin bucle.
- Título/detalles: cambio breve de opacidad desde 0,72 a 1; texto sin desplazamiento durante lectura.
- Secciones: entrada única de grupos con translateY de 8 px, 360 ms; stagger hasta 120 ms. Copa/zapatos con entrada de 480 ms y desplazamiento de 12 px.
- Puntero preciso de escritorio: movimiento decorativo acotado a ±2,5 px horizontal y ±2 px vertical. Un requestAnimationFrame únicamente cuando hay pointermove; ningún bucle en reposo. Se aplica al contenedor decorativo, independiente del balanceo del lazo. Sin cursor personalizado.
- CTA: hover ligero, foco visible y escala de pulsación, respuesta de 160 ms.
- Navegación: aria-current=location durante intersección del registro y transición de línea/acento.
- Covers: microrespuesta de color y 1 px en las cifras al hover preciso. Mantienen semántica de texto y cursor normal; sin tabindex/roles de botón.
- Campos: borde, fondo y label al foco. Contorno sólido incluso tras foco programático de validación.
- Validación: MutationObserver observa únicamente mensajes/aria-invalid generados por el handler actual y anima su opacidad 180 ms. No modifica reglas, contenido, envío ni estado. Roles status, live regions y relaciones de error existentes conservados.
- No hay campos condicionales en esta versión; no se agregan. No hay backend ni estados reales remotos: se conserva la demostración explícita, sin confirmaciones ficticias.

Las animaciones usan WAAPI nativa; CSS solo para feedback de controles. Sin filtros, sombras animadas, loaders, destellos, scroll secuestrado ni layout animado. IntersectionObserver pausa efectos fuera de pantalla; visibilitychange pausa al ocultar pestaña y limpia desplazamiento. Se limpian al abandonar la página. Resize limpia desplazamiento. prefers-reduced-motion cancela WAAPI, elimina transiciones espaciales y deja todo visible/estable. Default sin JS: contenido visible, registro de demostración deshabilitado como antes; sin envío GET accidental.

Archivos específicos: `shared/satin-bow-motion.css` (2209 bytes) y `shared/satin-bow-motion.js` (5598 bytes), total 7807 bytes sin comprimir. Solo se enlazan en Satin Bow. El asset copa/zapatos recibe wrapper decorativo para separar movimiento de puntero y entrada; composición conservada.

## Comprobaciones

Chromium headless por localhost a 360, 390, 768 y 1440 px: sin desbordamientos ni errores de consola; imágenes cargadas, submit disponible durante el movimiento, validación de tres vacíos y foco en nombre. Tab avanza a apellido y se ve contorno sólido con pestaña activa. Registro en pantalla activa la navegación. Cambio de tamaño limpia puntero. Se inspeccionaron capturas móvil/escritorio.

Después de 4,5 s no quedan animaciones activas. Se comprobó pausa fuera de pantalla y ocultando realmente la pestaña mediante una segunda pestaña de Chromium: document.hidden=true y balanceo paused. Movimiento reducido tanto al cargar como durante una animación: cero animaciones y contenido visible. JS desactivado: título/secciones visibles y registro deshabilitado. Los scripts satin.js/satin-review.js conservan hashes; el texto visible extraído del HTML es idéntico.

Chromium headless anuncia pointer no preciso aun con viewport de escritorio. Para cubrir la rama de JS se simuló exclusivamente esa capacidad vía matchMedia en el harness, se emitió mouseMoved y se observó translate3d(0.97px,-0.67px,0); limpieza al resize y al ocultar. No se modifica esa condición en el sitio. Prueba de ratón físico pendiente.

## Rendimiento y límites

No hay herramientas MCP DevTools de trazas disponibles. Se usó CDP existente, Resource Timing y PerformanceObserver nativos. Carga local sin caché de 1440 px: LCP observado 140 ms, CLS 0 y ninguna entrada longtask durante 4,5 s. Medición de laboratorio en localhost sin throttling, no datos de campo ni certificación de Core Web Vitals. Las microanimaciones terminan sin trabajo rAF continuo. No se afirma una puntuación Lighthouse ni un INP medido.

Red: recursos locales, ningún CDN/librería nueva. Movimiento CSS 2209 bytes y JS 5598 bytes verificados desde Resource Timing. Imágenes siguen siendo los WebP aprobados; dimensiones explícitas, copa/zapatos lazy y lazo fetchpriority=high.

Pendiente: medición en teléfono de gama media y navegadores Instagram/WhatsApp, ratón físico, lector de pantalla, CPU/red limitadas, trazas detalladas, Lighthouse/INP y mecanismo GHL en un encargo posterior. No se instala tooling para suplir estas limitaciones.

URL: http://127.0.0.1:8000/2026-10/15-fashion-week.html
