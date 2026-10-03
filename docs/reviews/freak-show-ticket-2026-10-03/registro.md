# Freak Show — ticket personalizado

03/10/2026. Página activa: `2026-10/24-freak-show.html`. Se mantienen las correcciones de responsive y apertura continua de cortinas. Fashion Week intacto.

## Textos y logo

Hero condensado a una frase. Se retiraron chips repetidos, instrucciones obvias, “Registro en 10 segundos”, nombres decorativos de la máquina y chistes redundantes en promociones. Las actividades conservan títulos y explicaciones útiles: bodas falsas sin validez legal y tragos especiales en barra. Se mantiene la condición del trago gratis a criterio de los bartenders, fecha, 21H00, dress code y derecho de admisión. No se añaden tarifas, límites ni disponibilidad.

Logo blanco original `Resources/DVOID/LOGO DVOID.png`, inspeccionado visualmente y utilizado sin recolorear en entrada y navbar. Ruta relativa codificada; imagen original conservada.

## Registro y estado real

Radios nativos obligatorios, errores asociados a campos y foco en el primer error. Acompañado activa un entero ≥1; solo/a desactiva y excluye el campo. El total es 1 + acompañantes, o 1 individual. Se muestra antes de enviar y en el resumen. Datos personales insertados mediante textContent; el celular no aparece en el resultado.

Sin endpoint configurado, el resultado es únicamente una **Vista previa**. QR SVG inline generado localmente con qrencode instalado. Contenido exacto: `DVOID-FREAK-SHOW-DEMO-NO-VALIDO-PARA-ACCESO`. Sin nombre ni teléfono, no válido para acceso. Decodificado con zbarimg desde el PNG generado y desde la captura del ticket en el navegador. Se eliminan las barras decorativas antiguas y la confirmación ficticia.

Se conserva el payload existente { firstName, lastName, phone, event, source } y la respuesta qrUrl. El contrato no documenta acompañantes: con endpoint configurado se bloquea el envío grupal, sin inventar campos. Solo una respuesta HTTP válida con qrUrl HTTP/HTTPS permite mostrar el resumen real. Una respuesta recibida sin código bloquea reenvíos automáticos para evitar duplicados. Editar un resultado real reutiliza la reserva original: no persiste cambios ni genera otra reserva. Los errores HTTP permiten reintentar y conservan valores. Sin pruebas a producción.

Transformación en la misma carcasa: campos se desvanecen y resumen aparece con barrido tenue de luz/revelado, 760 ms; movimiento reducido inmediato. Formulario y resumen comparten huella en grid para evitar cambios bruscos de altura. Editar mantiene valores. Estado anunciado y foco en encabezado.

## Verificación

Chromium emulado en localhost: 360×800, 390×844, 430×932, 844×390 y 1440×900. Sin overflow horizontal ni errores de consola. Cortinas, logo y entrada conservados. Vacíos, cantidades vacías/0/negativas/decimales rechazados; 2 acompañantes produce 3 asistentes; volver a individual produce 1 y desactiva required. Nombre largo con tildes, edición, regeneración y doble activación comprobados. Capturas móvil/escritorio adjuntas.

Respuestas de fetch simuladas localmente: HTTP 500 conserva formulario/datos; respuesta válida reutilizada al editar sin segundo POST; acompañantes bloqueados en contrato individual; HTTP exitoso sin qrUrl no produce confirmación y evita duplicados. Teclado Enter abre cortinas y flechas seleccionan radios. Movimiento reducido comprobado, incluido foco inmediato en el encabezado. Se corrigió la regla universal de transición de 0,01 ms: provocaba que visibility siguiera oculto durante la llamada de foco. En ese modo las transiciones CSS quedan desactivadas.

Pendiente: teléfono físico y teclado virtual real; endpoint productivo y contrato de acompañantes/actualización no disponibles. No se certifica una integración de reserva grupal.

URL: http://127.0.0.1:8000/2026-10/24-freak-show.html

Sin instalaciones, commits ni push.
