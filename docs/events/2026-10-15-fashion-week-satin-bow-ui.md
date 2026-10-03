# Satin Bow — color y detalles UI

> Estado actual: **Satin Bow es la única versión activa**, en `2026-10/15-fashion-week.html`. Consulte [la especificación vigente](2026-10-15-fashion-week-active.md). Este documento conserva el historial de una etapa anterior; sus rutas `work/`, comparadores y variantes describen material retirado y no deben usarse para continuar el trabajo. Las siguientes iteraciones se hacen en la página principal.


03/10/2026. Refinamiento exclusivo de Satin Bow según el fragmento recibido: paleta, etiquetas fecha/+21 y líneas/separadores. El mensaje termina en «Detalles»; se pidió aclaración, sin añadir otros requisitos imaginados. Se conserva la composición, textos, logo y assets. No nuevas imágenes, dependencias, commits ni push.

Skill impeccable releída, referencias colorize/delight/craft-floor aplicadas al mundo visual existente; contexto local ya cargado en esta sesión. No cambios en otras variantes.

- Fondo perla #FFF8F2; invitación rosa pastel #F2C9D8; texto ciruela #482536; CTA frambuesa #A83262.
- Título cursivo y cifras usan #86264F para conservar contraste.
- Fecha en etiqueta perla y +21 en etiqueta con línea ciruela; mantienen semántica de texto, sin botones falsos ni claims.
- Cuatro separadores HTML aria-hidden/pointer-events:none; entrada de 420 ms con scaleX/opacity, una sola vez usando el sistema WAAPI y sus pausas existentes. No loop nuevo.
- Condiciones: acento puntual sobre cover ellas; registro en rosa claro #FAE9EF para distribuir color sin superficie uniforme. Fondos de las imágenes siguen transparentes y sin marcos.

CSS específico `shared/satin-bow-ui.css`; enlace exclusivo en `variants/06-satin-bow.html`. Movimiento añade únicamente separadores a `shared/satin-bow-motion.js`. Scripts satin.js/satin-review.js y assets preservados por hash. Texto HTML normalizado idéntico.

Contrast ratios calculados: ciruela/perla 12,53:1; ciruela/pastel 8,86:1; perla/CTA 6,05:1; cursiva/pastel 5,87:1. Borde funcional de inputs #986479 sobre perla 4,50:1. Foco conserva contorno oscuro visible y errores mantienen texto/ARIA, no solo color.

Chromium por localhost a 360, 390, 768 y 1440 px: sin overflow, todas las imágenes cargadas, lazo sin tapar primer texto, tres errores de validación vacía, cero errores de consola. Colores computados corresponden a la paleta. Capturas móvil/escritorio inspeccionadas. prefers-reduced-motion: cero animaciones, separadores estables. Pendiente dispositivos reales/Instagram/WhatsApp y contexto GHL; no publicación ni paquete final.

URL: http://127.0.0.1:8000/2026-10/15-fashion-week.html

## Actualización — encargo completo recibido

La instrucción completa posterior sustituye el fragmento anterior. Se agrega una cinta decorativa CSS en el borde de la invitación, sin imágenes nuevas ni SVG de escena. No tiene texto, foco, role de control ni interacción; aria-hidden y pointer-events:none. La tarjeta entra en 380 ms, las etiquetas aparecen con opacidad en 260 ms y stagger hasta 110 ms; la cinta entra y se mueve apenas durante 2200 ms, luego se detiene. Usa el sistema de pausas WAAPI existente, con tarjeta/cinta observadas para detenerlas fuera de pantalla y con cancelación por movimiento reducido. Sin loops nuevos.

Girls Night y apertura posterior conservan exactamente sus frases, agrupadas en spans para contraste tipográfico; cover ellas tiene acento rosa y cover posterior tratamiento perla/ciruela con línea discontinua. Condiciones +21, 21h30, 23h00, $10/$15 intactas. Las cifras siguen siendo texto, sin botones falsos.

Por solicitud expresa se elimina únicamente el párrafo `.fw-demo` equivalente a «Demostración visual · no envía ni guarda datos personales.» dentro del registro. No se reemplaza por explicación técnica. El título, CTAs, descripción restante, noscript, campos/labels/controles, errores y estado de demostración existente permanecen. No campos condicionales preexistentes, por lo que no se agregan.

Verificación final en Chromium/localhost: 360, 390, 768 y 1440 px; imágenes cargadas, sin overflow, colores computados acordes, alineación hero y lazo sin solapamiento. Teclado Tab y foco sólido, submit vacío con tres errores/foco en nombre, CTA lleva al registro y activa navegación. Cero errores de consola. Después de 4,2 s quedan cero animaciones activas; PerformanceObserver local observa CLS 0 y ninguna longtask, sin extrapolar a dispositivos reales. Movimiento reducido: cero animaciones y separadores estables. JS desactivado: contenido visible y registro deshabilitado igual que antes. Texto normalizado idéntico salvo el único aviso retirado. Hashes de otras variantes, assets, selector, estilos compartidos y lógica de registro idénticos.

Pendiente prueba física de móvil/ratón, lectores de pantalla, Instagram/WhatsApp y CPU/red limitadas. Sin publicación, preparación GHL, instalaciones, commits ni push.
