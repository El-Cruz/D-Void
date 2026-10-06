# Fashion Week — Satin Bow, única versión activa

03/10/2026. Elección definitiva y reorganización autorizadas por el usuario. Las próximas iteraciones se realizan únicamente en **`2026-10/15-fashion-week.html`**. Se reemplaza el prototipo anterior con la última Satin Bow, incluyendo paleta pastel/perla, etiquetas, cinta CSS, microanimaciones y formulario sin el aviso retirado expresamente.

URL local: http://127.0.0.1:8000/2026-10/15-fashion-week.html

## Rutas permanentes

- `Resources/events/2026-10-15-fashion-week/assets/`: bow.webp, cocktail-shoes.webp y favicon.svg.
- `Resources/events/2026-10-15-fashion-week/styles/`: base.css, satin-refinements.css y los tres CSS de composición, movimiento y UI de Satin Bow. Se conservó el orden de cascada; se retiraron selectores exclusivos del comparador y otras variantes.
- `Resources/events/2026-10-15-fashion-week/scripts/`: form.js y satin-bow-motion.js. El script de movimiento conserva sus bytes; form.js conserva validación, mensajes, foco y navegación, eliminando únicamente mensajería exclusiva del comparador.
- `Resources/events/2026-10-15-fashion-week/manifest.json`: inventario actual con tamaños y hashes.
- `Resources/DVOID/dvoid-logo.png`: logo oficial compartido, intacto. La copia temporal duplicada se elimina.

Las rutas del HTML son relativas hacia Resources; ninguna dependencia está en work. Slug público `/fashion-week` y vercel.json intactos. Este cambio no publica ni certifica GoHighLevel.

## Conservación y retirada

Los originales de generación y prompts de toda la comparación se archivaron sin alteración en `Resources/References/Fashion Week/Generated/originals/`, incluido el lazo v1/v2 y copa/zapatos. El manifest inicial se conserva como `Generated/generation-manifest-2026-10-02.json`; sus rutas antiguas son evidencia histórica, no inventario activo. Las referencias oficiales y recursos compartidos de otros eventos permanecen intactos.

Se retiran siete variantes alternativas, comparador, scripts de comparación, exportaciones descartadas y láminas temporales; se elimina work completo después de verificar la página nueva. Se inspeccionaron los 59 archivos originales: no había material ajeno a Fashion Week ni symlinks. Los documentos anteriores quedan identificados como históricos y enlazan esta especificación vigente.

## Comportamiento conservado

Textos y campos idénticos a la última Satin Bow. Entrada 21h30, +21, Girls Night hasta 23h00, ellas $10 hasta 23h00 y general $15 después. Nombre, apellido y celular; validación local, foco en primer error y estado de demostración actual. Sin envío, almacenamiento, integración nueva ni confirmación real. Retirar mensajería parent/postMessage del comparador no cambia el registro standalone.

## Verificación de traslado

Antes de eliminar work se compararon origen y destino con Chromium vía localhost a 360, 390, 768 y 1440 px: posiciones, tamaños, fuentes, colores, bordes y espaciados computados idénticos en los elementos principales. Imágenes cargadas, sin overflow, ninguna solicitud del destino hacia work y cero errores de consola. Validación de vacíos, celular corto y datos ficticios válidos, foco/Tab, navegación al registro y estado activo correctos. Movimiento inicia y termina en reposo; modo reducido estable. No se realizaron envíos externos.

Pendiente: dispositivos reales, Instagram/WhatsApp, lector de pantalla y entorno GHL si se solicita integración posteriormente. Sin dependencias instaladas, commits ni push.

Comprobación posterior a la eliminación: work ya no existe. Recarga HTTP del destino a 390 px con caché desactivada: todas las imágenes cargadas, tres campos presentes, sin overflow, cero solicitudes a work y cero errores de consola. Logo compartido y fuentes de assets originales conservados.

## Iteración — navbar, Dress Code e invitación (03/10/2026)

Navbar blanca, proporciones y márgenes responsive. Se inspeccionaron visualmente ambos logos oficiales: dvoid-logo.png es crema/rojo sobre negro; LOGO DVOID.png es blanco transparente. No existe asset negro independiente en los recursos disponibles; se conserva el actual sin filtros ni recoloración, pendiente de recibir el oficial negro.

Dress Code recuperado exclusivamente desde HEAD, sección #dress-code: “Your best look has plans. Dress to impress.” y “No necesitas venir de rosa. Solo queremos que saques ese outfit que estabas esperando una excusa para usar.” Composición tipográfica editorial, sin restricciones nuevas ni Picsum. No hay fotografías válidas de outfits; para un moodboard fotográfico se necesitan imágenes aprobadas. Copa/zapatos existentes siguen en la sección contigua.

Nuevos archivos satin-bow-invitation.css y satin-bow-invitation.js, registrados en manifest. Todos los enlaces al registro y el botón de apertura despliegan la misma tarjeta en la página, con líneas y fecha decorativas; sin QR, códigos ni confirmación. Apertura vertical breve con WAAPI, foco en Nombre, datos preservados y clics repetidos idempotentes. Sin JavaScript el formulario permanece visible. form.js y satin-bow-motion.js intactos.

Verificación localhost Chromium a 360/390/768/1440: navbar blanca, assets cargados, sin overflow ni errores de consola, apertura y reapertura sin pérdida de datos, tres campos y validación/estado demo intactos. Movimiento reducido sin animaciones, fallback sin JS visible y submit demo desactivado. Inspección visual de Dress Code e invitación a 390/1440. Pendientes dispositivos físicos, navegadores de Instagram/WhatsApp y lector de pantalla.

La automatización de Enter/Tab en Chromium headless no confirmó activación (foco de ventana no fiable); comprobación manual de teclado pendiente. El foco programático en Nombre y en el primer error sí se verificó.

## Logo negro autorizado

El usuario autorizó derivar el logo negro desde Resources/DVOID/LOGO DVOID.png. Nueva copia Resources/DVOID/dvoid-logo-black.png: RGB negro, dimensiones originales 1290×568 y canal alfa idéntico píxel a píxel (diferencia absoluta 0). Original intacto. HTML actualizado a esta copia; navbar blanca y soporte del logo transparente, sin fondo oscuro. Sustituye la necesidad pendiente de un logo negro.

## Registro personalizado de muestra — 03/10/2026

Autorización nueva: selección de acompañantes y pase personalizado sustituyen el estado visual final de la demo anterior. No existe backend ni contrato de respuesta real. Se conservan Nombre, Apellido, Celular, validación local y todos los textos anteriores. Fieldset con radios reales, elección obligatoria sin preselección. Número entero mínimo 1, sin máximo, solo habilitado/requerido con amigas; representa acompañantes sin contar a quien registra. Selección individual excluye ese dato del resultado. Apertura/cierre local de 240/160 ms, altura animada únicamente en este recuadro para evitar saltos; resto de movimiento con transform/opacity.

Validación antes del pase, mensajes asociados y foco en primer error. Fade 180 ms y despliegue del pase 520 ms (700 total); modo reducido inmediato. Datos insertados por textContent, nombre protagonista, logo negro autorizado, fecha/entrada confirmadas y compañía; celular nunca expuesto. Etiqueta Vista previa y QR de muestra no válido para acceso. Botón Editar mis datos conserva entradas y permite regenerar; bloqueo de doble submit y listeners únicos. Cambio anunciado por status y foco en encabezado. CTA externos vuelven al formulario sin borrar valores.

QR generado localmente con qrencode 4.1.1 disponible, SVG inline con quiet zone. Payload exacto: DVOID-FASHION-WEEK-DEMO-NO-VALIDO-PARA-ACCESO. zbarimg decodificó tanto la exportación de prueba como el QR de la captura móvil real; sin datos personales. No llamadas externas, instalaciones ni registros reales.

Pruebas Chromium localhost 360/390/768/1440: vacíos, amigas vacío/0/-1/1.5 y 3 válido, sola, cambio de selección, nombre largo con tildes, editar y regenerar, doble submit, foco en primer error/encabezado, Tab a apellido con outline sólido. Sin overflow, celular ausente del pase, consola sin errores; modo reducido sin animaciones. Se confirma el recorrido Tab que quedó pendiente en la etapa anterior. Pendiente lector de pantalla y teléfonos/navegadores internos reales.

## Girls Night — sección editorial (06/10/2026)

Se incorpora #girls-night después de Dress Code y antes de “La noche, en dos momentos”, exclusivamente en el HTML activo. Textos de apertura, seis experiencias y cierre proporcionados por el usuario, sin horarios adicionales ni nuevas condiciones. La identidad pastel/perla del resto se conserva; el bloque usa fondo ciruela oscuro, serif grande, rosa, bordes finos y composiciones asimétricas en desktop, dos columnas en tablet y bloques verticales en móvil. Cierre de 75svh como transición a la fiesta.

Nueva fotografía ilustrativa de bouquet (generada, no evidencia del evento), servida en WebP de 900×1350, 124590 bytes. Original y prompt en Generated/originals/07-girls-night, sin enlaces de la página a ese archivo. Beauty y Photo Spots reutilizan los recortes activos; colorimetría usa muestras de color CSS; Girl Talk y Sexual Wellness, dirección tipográfica sin íconos. Nuevos satin-bow-experiences.css y .js inventariados en manifest. Entrada de cards de 550 ms, desplazamiento de imágenes ligado al scroll limitado a 10 px; contenido visible sin JavaScript. Movimiento reducido cancela animaciones y transformaciones; ninguna reproducción automática en bucle.

Auditoría del HTML y textos repetidos: jueves 15 de octubre de 2026, entrada 21h30, Girls Night hasta 23h00, cover ellas $10 hasta 23h00 y general $15 después. Hero, información, invitación, pase y footer coherentes; no se inventan horarios para experiencias. Formulario, scripts anteriores y logos intactos.

Validación Chromium a 375/768/1440 px: seis cards, imágenes cargadas, sin overflow horizontal ni errores de consola. Movimiento reducido: cero animaciones en la nueva sección, transformaciones none. Inspección visual móvil y desktop; ajuste de tablet incluido. Manifest completo comprobado por bytes y SHA-256. Sin instalaciones, commits, push ni publicación. Pendiente revisión en dispositivos físicos y navegadores internos.
