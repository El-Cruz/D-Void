# Fashion Week — refinamientos Satin

> Estado actual: **Satin Bow es la única versión activa**, en `2026-10/15-fashion-week.html`. Consulte [la especificación vigente](2026-10-15-fashion-week-active.md). Este documento conserva el historial de una etapa anterior; sus rutas `work/`, comparadores y variantes describen material retirado y no deben usarse para continuar el trabajo. Las siguientes iteraciones se hacen en la página principal.


03/10/2026. Instrucción vigente del usuario: implementar tres alternativas de Satin Invitation, conservar original y retirar las cuatro direcciones anteriores del selector sin borrarlas. Esta autorización reemplaza el límite histórico de solo documentar para esta comparación. No se prepara entrega GHL.

## Implementación

- Satin Original sigue cargando `variants/04-satin-invitation.html`, sin cambios de bytes en HTML, base.css ni advanced.css.
- Nuevas alternativas: `variants/06-satin-editorial.html`, `06-satin-bow.html`, `06-satin-afterglow.html`.
- Estilos aislados en `shared/satin-refinements.css`; comportamiento derivado del registro actual en `shared/satin.js`. Mismos nombre, apellido y celular; mismo CTA, validación local y aviso de demostración. Sin destinos, envíos ni confirmaciones reales.
- Editorial: perla, título grande, fotografía desplazada, condiciones con divisores y registro abierto en dos columnas en escritorio.
- Bow: lazo protagonista sobre invitación enmarcada, condiciones en paneles de papel y formulario con campos subrayados; nombre/apellido comparten fila en escritorio.
- Afterglow: ciruela, el mismo satén con mezcla screen, cristal existente, condiciones en filas y formulario oscuro de alto contraste.
- Sin generación nueva: reutiliza héroes/detalle de Satin y detalle de cristal de Editorial Perla registrados en manifest. Masters, prompts y referencias intactos.
- Selector de cuatro botones de 44 px, en flujo normal; único iframe. `shared/satin-review.js` comparte los valores entre las cuatro alternativas en memoria temporal; recargar los elimina. No se escriben en URL ni almacenamiento persistente. Mensajes verificados por origen y ventana emisora.
- Las cuatro direcciones retiradas conservan su código y assets. Página mensual original y Freak Show intactos. Sin instalaciones, commits ni push.

## Revisión

Skill principal leída: `/home/nicocruz_04/.agents/skills/redesign-existing-projects/SKILL.md`. Diagnóstico: tarjeta original superpuesta, hero centrado en material, formulario consecutivo sin retícula lateral. Se diferencian composición, jerarquía de covers y presentación del registro usando CSS nativo y tipografía local Georgia/system-ui.

Chromium headless con CDP y Node existentes: las cuatro variantes a 390×900 y 1440×900. Capturas completas inspeccionadas para las tres nuevas. Sin desbordamiento horizontal, todas las imágenes cargadas, tres campos idénticos, CTA accesible. Validación de vacíos: tres errores y foco en primer campo. Campos ficticios se conservan al pasar por las cuatro opciones. Selector comprobado en ambos anchos; controles móviles de 44 px. Sintaxis de scripts correcta. Hashes de los cinco HTML anteriores, estilos anteriores y página mensual idénticos antes/después.

Sin excepciones JavaScript ni errores de recursos de las propuestas nuevas. Satin Original solicita el favicon global ausente (404 preexistente), excluido del conteo de errores del ensayo; se conserva su HTML intacto. Las nuevas páginas y el comparador incluyen favicon SVG local.

Movimiento reducido y foco visible revisados en código; no hay loops, loaders ni contenido diferido. Pendiente: prueba en dispositivos reales y navegadores internos Instagram/WhatsApp, lector de pantalla y entorno GHL. No se afirma compatibilidad de integración.

## Vista previa

Ruta desde raíz: `work/fashion-week-2026-10-15/review/index.html`.

URL: http://127.0.0.1:8000/2026-10/15-fashion-week.html

El servidor existente en puerto 8000 respondió HTTP 200. Recomendación: Satin Editorial por lectura inmediata de fecha/CTA, aire editorial y registro claro, conservando la delicadeza Satin.
