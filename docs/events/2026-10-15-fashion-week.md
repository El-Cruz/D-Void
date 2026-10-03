# Fashion Week — 15 de octubre de 2026

> Estado actual: **Satin Bow es la única versión activa**, en `2026-10/15-fashion-week.html`. Consulte [la especificación vigente](2026-10-15-fashion-week-active.md). Este documento conserva el historial de una etapa anterior; sus rutas `work/`, comparadores y variantes describen material retirado y no deben usarse para continuar el trabajo. Las siguientes iteraciones se hacen en la página principal.


## Actualización de etapa 2 — assets creados

La instrucción posterior del usuario autoriza ejecutar la creación de assets. Se completaron cinco originales y doce WebP para las cinco variantes, con revisión visual y prompts conservados. Consultar [inventario de assets](2026-10-15-fashion-week-assets.md) y `work/fashion-week-2026-10-15/assets/manifest.json`. Las menciones siguientes a “no creados” describen la planificación anterior. No se implementaron páginas ni selector; original HTML intacto. Ambiente visual simulado, entrada 21h30, Freak Show pausado.

## Actualización — propuestas y arte oficial

Vigente para la siguiente construcción: [cinco propuestas de Fashion Week](2026-10-15-fashion-week-proposals.md). Las cuatro referencias JPG ahora existen en `Resources/References/Fashion Week/` y se abrieron visualmente. El arte `IMG-20260922-WA0043.jpg` confirma +21, fecha, Girls Night hasta 23h00, ellas $10 y luego $15 para todos, Dress to impress y reservas vía DM. Esto actualiza la incertidumbre de edad y el inventario incompleto de la auditoría anterior; conservarla como evidencia histórica. El mínimo 18 del prototipo no se reutiliza.

El arte no indica apertura; el brief dice 21h00. El usuario confirma **entrada 21h30**, valor vigente común en las cinco. Aclara además que el ambiente es solo visual y simulado: sin envío real, enlace DM ni integración de reservas en esta comparación. Autorizado rediseño completo y creación futura de assets originales; en esta etapa solo documentación. Original HTML e integraciones intactos, sin generación de assets ni implementación del selector. Freak Show pausado.

Estado: inicialización/documentación terminada; implementación pendiente. Auditoría de código del 02/10/2026. Freak Show pausado; solo se leyó su formulario para comparar. No se modificaron páginas, assets ni integraciones.

## Fuentes y procedencia

- **[U] Usuario:** instrucciones de esta tarea. Fecha completa/año 2026, Quito, entrega máxima 8 de octubre, público objetivo +21, flujo por etapas, tecnologías nativas y entrega HTML/assets a un integrador GHL. Consumo habitual $15–20 exclusivamente interno.
- **[B] Brief:** `Resources/References/Brief_Web_DVOID_Fashion_Week.pdf`, 5 páginas, 76 696 bytes. Leído con `pdftotext -layout`; `pdfinfo` confirma 5 páginas, no cifrado. Se extrajo todo el texto; no se evaluó la maquetación visual del PDF. Los números de página siguientes son páginas PDF, no encabezados de secciones.
- **[H] HTML actual:** `2026-10/15-fashion-week.html`, 1 180 líneas, 46 230 bytes. Las líneas se refieren al archivo sin modificar durante esta auditoría. Hechos de implementación no equivalen a decisiones comerciales aprobadas.
- **[R] Repositorio:** `reservas.html`, eventos de septiembre/octubre, scripts y `vercel.json`. Referencias comparativas, no contratos aprobados para Fashion Week.

## Brief extraído

| Tema | Dato y fuente |
| --- | --- |
| Objetivo | Invitación digital exclusiva que explica la dinámica y lleva a registro/reserva; chic, femenina, editorial y nocturna, no una landing genérica de discoteca. [B p.1] |
| Evento y fecha | D-VOID Fashion Week, jueves 15 de octubre; año 2026 proviene de [U], no se ve explicitado en el texto extraído del brief. [B pp.1–3] |
| Horarios y acceso | Inicio 21H00, Girls Only hasta 23H00, luego abierto para todos. [B pp.2–3] |
| Covers | Chicas $10 hasta 23H00; general $15 después de 23H00. Datos confirmados en el brief, distintos del consumo habitual informado por el usuario. [B pp.2–3] |
| Lugar | D-VOID · Av. República. Quito procede de [U]. [B pp.1–4] |
| Identidad | Victoria’s Secret backstage / editorial de moda / girls dressing room llevado a la noche D-Void. Rosa pastel e intenso protagonistas, blanco, negro y cromo/plata puntual. Evitar amarillo, infantil, exceso de corazones y estética caricaturesca “Barbie”. [B p.2] |
| Recursos sugeridos | Espejos de camerino, silla de director, labios, flashes, copas, disco balls, cortinas metálicas, boas/plumas, micrófonos backstage, satén y fotografía con flash. Son sugerencias visuales, no experiencias confirmadas. [B p.2] |
| Composición | Alternar fondos claros/blancos, bloques negros, fotografías a pantalla completa y rosa intenso. No encadenar rectángulos rosados. [B p.2] |
| Hero y concepto | “GIRLS ONLY UNTIL 11 PM”; CTA “GET ON THE LIST”; “Dress to impress”; concepto “THIS ONE’S FOR THE GIRLS”, venir sola o con amigas y conocer nuevas. [B p.3] |
| Experiencias/promos | Preparar cuatro módulos editables; **no publicar experiencias hasta confirmar**. Promociones y experiencias definitivas pendientes. [B pp.2,4–5] |
| Dress code | “YOUR BEST LOOK HAS PLANS”, “DRESS TO IMPRESS”; no exige venir de rosa; 3–4 looks editoriales como inspiración sin hacerlo restrictivo. [B p.4] |
| Registro | Nombre y apellido, WhatsApp, edad, Instagram, sola/con amigas, cantidad de acompañantes: **campos sugeridos**, no obligatoriedad definida. CTA “I’M IN”. Confirmación propuesta “SEE YOU AT FASHION WEEK”, fecha/hora/lugar; acceso a WhatsApp/reservas de mesa. [B p.4] |
| Desarrollo | Mobile first por Instagram/WhatsApp; CTA hero y final; fotografía, titulares grandes, texto corto; formulario rápido; confirmación después del envío; identidad propia conservando D-Void. [B p.5] |
| Microcopy | GET READY WITH US; GIRLS TAKE OVER; DRESS TO IMPRESS; SEE YOU AT 9; AFTER 11, EVERYONE’S INVITED. [B p.5] |

## Inventario de assets

| Recurso actual | Uso / estado |
| --- | --- |
| PDF del brief | Referencia original, no asset de publicación. |
| `/Resources/DVOID/dvoid-logo.png` (131 068 bytes) | Único archivo local enlazado por Fashion Week, en navegación [H ~811]. Existe; ruta desde raíz del dominio. |
| `Resources/DVOID/LOGO DVOID.png` (62 603 bytes) | Logo compartido alternativo; no usado por este HTML. No cambiar/sustituir automáticamente. |
| Cuatro URLs Picsum `dvoid-exp1`…`dvoid-exp4`, 600×800 | Fondos de experiencias [H ~899–923]. Imágenes externas de relleno, no material aprobado del evento. |
| Cuatro URLs Picsum `dvoid-mood1`…`dvoid-mood4`, 500×660 | Moodboard [H ~943–946]. No asumir que representan looks editoriales pertinentes. |
| Hero | Solo gradientes CSS; clase `hero-image-placeholder`, sin foto local ni externa asignada [H ~820]. |
| Google Fonts | Cormorant Garamond remoto vía `fonts.googleapis.com`/`fonts.gstatic.com` [H 7–9]. Fallback Georgia; no archivo local de esta fuente identificado en el inventario revisado. |
| QR | SVG inline fijo [H ~1020–1062], igual para cada usuario; no codifica un identificador emitido por un backend. |
| html2canvas 1.4.1 | Script de cdnjs [H 1179], captura local de la tarjeta como JPG. Dependencia externa existente. |
| `Resources/videos/`, `Resources/images/`, `Resources/UDLA/`, otras referencias | Compartidos o de otros eventos; no usados por Fashion Week actualmente. No tratarlos como aprobados para esta campaña ni moverlos. |

No se localizaron fotos, looks ni artes locales específicos de Fashion Week además del brief. No se descargaron recursos remotos ni se evaluaron licencias/permiso de publicación de imágenes.

## Registro actual y campos

`<form id="registroForm" novalidate>` [H 958] no tiene `action` ni `method`. Con JavaScript activo, el listener [H 1131–1155] cancela el envío, copia nombre/apellido al DOM, lee acompañamiento/cantidad, oculta el formulario y muestra `ENTRADA CONFIRMADA`. **No hay fetch, XHR, envío a backend, payload de red, cookies de registro ni persistencia en localStorage/sessionStorage en este HTML.** WhatsApp, edad e Instagram ni siquiera se leen en el handler. Recargar pierde esa confirmación.

| Campo HTML / tipo | Estado declarado | Comportamiento real |
| --- | --- | --- |
| `nombre` / text | required | Copiado sin trim al texto del pase; no valida vacío. |
| `apellido` / text | required | Igual que nombre. |
| `whatsapp` / tel | required; placeholder +1234567890 | Sin patrón, normalización ni lectura en el handler. No hay `autocomplete`. |
| `edad` / number | required, min 18, max 100 | Sin comprobación de rango; sin política de admisión confirmada en [B]. |
| `instagram` / text | required | No se valida ni utiliza. [B] solo lo sugiere. |
| `acompaniante` / radios | required; sola/amigas | Ninguno seleccionado inicialmente. Sin selección el handler cae en “ENTRADA GRUPAL”. |
| `grupo` / number | required inicial, min 1, max 20; contenedor oculto | “amigas” muestra/exige; “sola” oculta, quita required y vacía. No está disabled cuando oculto. No se valida cantidad ni selección. El límite 20 solo procede del HTML, no es un cupo confirmado. |

`novalidate` elimina la validación automática al enviar y no hay `checkValidity`, `reportValidity` ni validación propia. Por lectura del flujo, enviar vacío también llega al éxito. No se hizo un envío para demostrarlo. La cantidad pregunta por personas “contigo”, pero el pase dice “N personas”: ambiguo si incluye a la titular. La obligatoriedad y semántica deben acordarse antes del contrato de datos.

Sin JavaScript el loader permanece sobre el contenido. Si se consiguiera accionar el formulario por otros medios, los defaults HTML serían GET a la misma URL y los campos con nombre podrían ir en la query; no existe un fallback seguro de registro. No se ejecutó esa ruta.

El SVG es un dibujo fijo con apariencia de QR: no hay codificador ni token individual o verificación. “Presenta tu entrada en puerta”, “Special Guest”, “ENTRADA UNICA/GRUPAL” y “ENTRADA CONFIRMADA” son mensajes locales [H 1011–1070], no respuestas de una integración. La descarga solo exporta el DOM a `dvoid-entrada.jpg`, no guarda asistentes ni valida acceso.

## Comparación de formularios del repositorio

Inspección de código, sin envío a producción. En todos los eventos planos revisados los formularios carecen de action/method; los handlers cancelan el submit. La excepción de transporte programático potencial es Freak Show con endpoint configurado.

| Página / evidencia | Campos y validación | Destino, método/payload y estado real |
| --- | --- | --- |
| `reservas.html` completo | Formulario dentro de iframe externo; campos desconocidos desde el wrapper. | GET de `/reservar/embed` en Azure; recibe solo mensaje de altura `{tipo:'dvoid:alto', alto}`. No hay POST propio ni confirmación local en el wrapper. Existencia de servicio integrado no demuestra persistencia; contrato interno no inspeccionado. |
| Casino `2026-09/17-casino.html` ~291–319, 562–618 | nombre, numero/WhatsApp, fecha nacimiento; nombre ≥2 caracteres, teléfono 7–15 dígitos, edad calculada ≥21. | Sin payload HTTP. Hash local `DV-...`, función `drawFakeQR`, “Reserva confirmada”. En iframe emite `{tipo:'dvoid:reserva-exitosa'}` al padre con origen `*`; independiente guarda solo código en sessionStorage `dvoid:pase` y redirige relativamente a `survey.html`. Eso no es guardar una reserva. La ruta relativa desde el directorio mensual requiere revisión. |
| UDLA `2026-09/25-evento-udla.html` ~770–821, 1115–1164 | nombre completo, cédula 10 dígitos, celular 7–15, fecha presente, Banner; tipo de pase en estado JS. Rama valida Banner solo si `required`, pero no se encontró activación de ese atributo en el flujo revisado. | Sin envío/payload HTTP. Folio de Date.now y boarding pass local con pago “Confirmado” y Fila VIP: no verifica pago/reserva. |
| Tentación `2026-10/01-la-tentacion.html` ~1262–1294, 1472–1490, 1583–1648 | nombre, apellido, WhatsApp, pulsera oculta; comprueba no vacíos, no formato telefónico. | Sin envío/payload HTTP. Código aleatorio de 3 dígitos y dibujo SVG pseudo-QR por patrón; mensaje “ACCESO CONFIRMADO” local. |
| Medicine `2026-10/08-medicine.html` ~1008–1021, 1115–1143 | fname, lname, whatsapp, cover 10/12. Validación nativa required, teléfono patrón numérico; handler solo usa nombres. | Sin envío/payload HTTP. ID aleatorio, QR decorativo CSS y “ACCESO CONCEDIDO” local. Nombre interpolado en innerHTML: no copiar este patrón a la nueva implementación. |
| Freak Show `2026-10/24-freak-show.html` ~287–295, 405–465 — pausado | firstName, lastName, phone; no vacíos y mínimo 7 dígitos. | Endpoint vacío por defecto: `data-endpoint` o `window.DVOID_GHL_WEBHOOK`. Si se configura: POST JSON `{firstName,lastName,phone,event,source}`; event `D-VOID Halloween Freak Show · 24 Octubre · 21H00`, source `landing-freak-show-2410`. Solo comprueba HTTP ok; tolera JSON inválido y confirma, usa qrUrl opcional. Sin endpoint simula boleto tras 650 ms, sin etiqueta visible de demo. No hay prueba de backend configurado. |
| `survey.html` ~212–217, 261–270 | facilidad, claridad, confuso, detalle, sugerencia; lee código de sesión. | `console.log('Survey Payload:', ...)` y agradecimiento. Sin envío de encuesta. |

Conclusión: ningún mensaje de éxito de estos prototipos sirve como prueba de persistencia para Fashion Week. No trasladar endpoints, payloads ni políticas de un evento a otro sin confirmación.

## Auditoría priorizada

### P0 — confianza y registro

- Confirmación de entrada sin guardar datos, validación ni respuesta válida; QR fijo presentado como pase. Se necesita integración de ensayo y contrato de éxito antes de anunciar registro real. Las demos deben rotularse; no se corrigió aún por alcance.
- Edad: [U] público objetivo mayor de 21; [H] min 18 inoperante; [B] no establece mínimo de admisión. Confirmar política y campos obligatorios; no convertir el dato comercial en regla de acceso.
- [B] prohíbe publicar experiencias no confirmadas. [H] ya expone “BACKSTAGE VIBES”, “THE CROWD”, “MUSIC & DRINKS”, “AFTER PARTY”. Son textos del prototipo, no experiencias aprobadas. Promociones pendientes; no inventar.

### P1 — acceso al contenido, portabilidad y GHL

- Loader fijo z-index 9999: solo se oculta en `window.load` + 600 ms [H 1091–1095]. Espera recursos remotos; sin JS permanece. Si GHL inserta el script después de load, puede no cerrarse. Sin fallback `noscript`.
- `[data-reveal]`, `.timeline-item` y `.exp-card` empiezan en opacity 0 y dependen de IntersectionObserver [H 756–763, 1097–1118]. Falta fallback ante indisponibilidad/error. La media query de movimiento reducido revela contenido, pero no elimina la dependencia JS del loader.
- Anclas [H 1157–1165]: handler global para todo `a[href^="#"]`. El logo `href="#"` llega a `document.querySelector('#')`, selector inválido. Previene el comportamiento nativo; no actualiza hash/foco ni compensa explícitamente nav fija. `scrollIntoView({behavior:'smooth'})` no consulta movimiento reducido; la regla CSS por sí sola no debe darse por suficiente. Verificar con teclado y en móviles posteriormente.
- Portabilidad: `/Resources/DVOID/dvoid-logo.png` resuelve en la raíz del dominio anfitrión, no junto al HTML ni necesariamente en GHL. Funciona sirviendo raíz local; falta acordar hosting/rutas de entrega. Los slugs de Vercel no se configuran automáticamente en GHL.
- CSS global `:root`, reset `*`, `html/body`, scrollbar, `.nav`, `.footer`, `.form-group` y variables genéricas pueden afectar el anfitrión. IDs genéricos (`nombre`, `apellido`, `loader`, `successMessage`), variables globales `var form` y selectores sobre todo document pueden colisionar con otras instancias/GHL. Listener load, onerror inline y librería global pueden no ejecutarse según inserción/CSP. En iframe hay aislamiento, pero altura, scroll, links y descarga deben verificarse. No afirmar compatibilidad sin conocer el mecanismo.
- html2canvas remoto [H 1167–1179]: no hay catch/finally; si no carga o rechaza, el botón ocultado puede quedarse oculto. `useCORS` no garantiza permisos. Descargar JPG con anchor no demuestra que funcione dentro de Instagram/WhatsApp. No añadir otra librería; resolver requisitos con herramientas existentes en la etapa adecuada.

### P2 — visual, accesibilidad y rendimiento por comprobar

- Ocho fondos Picsum externos, fuente Google Fonts y script cdnjs: disponibilidad y conexiones externas, imágenes no controladas ni aprobadas. Fuente contradice prohibición CDN del AGENTS histórico. html2canvas es dependencia heredada, no autorización para añadir librerías. Planificar sustitución/conservación acordada, sin tocar todavía.
- Dirección actual carbón/rosa apagado + serif y bloques alternos es una interpretación parcial; faltan fotos editoriales del hero, blanco/rosa intenso y medios aprobados del brief. No aplicar preferencias genéricas de la skill contra el brief.
- Foco visible existe en CTAs; inputs/selects eliminan outline y solo cambian borde. Radios sin fieldset/legend; éxito sin aria-live ni traslado de foco; al ocultar el form se pierde la referencia del teclado. No hay main ni enlace de salto. Autocomplete ausente en campos Fashion Week. Auditar contraste y tamaños reales antes de afirmar cumplimiento.
- Fuentes pequeñas en CTA (11px), ayudas (11px), footer (10px); tamaño táctil de nav CTA no garantiza 44px. Comprobar zoom, teclado virtual, overflow, safe areas y landscape en etapa móvil. Hay viewport-fit=cover pero no uso de env(safe-area-inset-*).
- Tarjetas exp-card tienen cursor de botón sin acción/semántica interactiva. Moodboard con etiquetas genéricas inglesas y sin foco/controles explícitos; no verificar teclado solo por scroll táctil. QR sin descripción significativa.
- Existen reglas CSS duplicadas de guest-entry; hover de descarga usa `var(--text)` no definido en :root. Falta meta description y metadatos Open Graph para compartir por WhatsApp/Instagram. No inventar imagen social.
- Solo se conocen tamaños locales (HTML 46 230 B, logo usado 131 068 B); no hay waterfall, tamaños de Picsum/font/CDN ni métricas CWV. No se atribuyen milisegundos ni mejoras estimadas.

## Discrepancias y decisiones pendientes

| Fuentes | Discrepancia / tratamiento |
| --- | --- |
| U vs H vs B | Target +21 / min 18 HTML / edad admitida ausente del brief. No decidir admisión por inferencia. |
| B vs H | Campos sugeridos pasan a obligatorios; confirmación editorial pasa a entrada/QR; cupo 20 y tipo de pase no están en el brief. Confirmar contrato y semántica. |
| B vs H | Experiencias pendientes aparecen como contenidos; contacto WhatsApp/reservas pedido en brief no existe como enlace en HTML (solo estilos `.guest-entry-whatsapp`). Falta canal aprobado. |
| B vs AGENTS histórico | Rosa/blanco/negro y evitar amarillo frente a paleta histórica roja/dorada. Para este evento manda el brief específico. |
| AGENTS histórico vs archivos | Documentación dice cuatro bundles y referencias home/glow ausentes; la carpeta real tiene tres bundles raíz identificados y Fashion Week es plano. No ejecutar defaults históricos. |
| U vs prototipos R | Prohibido éxito sin integración válida; varias páginas simulan éxito. Documentar y no usarlas como patrón funcional. |

## Próximos pasos — no ejecutados

1. Confirmar las tres dudas bloqueantes de `docs/project-context.md`: integración/ensayo/GHL, admisión/campos, promociones/experiencias/medios/contacto autorizado. La documentación actual no necesita esperar esas respuestas.
2. Definir dirección visual usando brief y referencias oficiales investigadas entonces; registrar lo que aporta cada una, sin copiar. Preparar módulos para datos pendientes sin publicarlos como aprobados.
3. Implementar progresivamente HTML/CSS/JS nativos: aislamiento según GHL, contenido base visible, formulario accesible con estados reales, validación acordada, respuesta de error/éxito y QR solo si la integración lo emite/valida.
4. Verificar con mocks identificados o entorno de pruebas autorizado: nunca producción. Comprobar vacío, teléfono inválido, sola/amigas y cambios de selección, límites confirmados, error de red, respuesta inválida, doble envío y éxito válido; sin JS/movimiento reducido; teclado/foco y descarga si aún es requisito.
5. Medir una vez con assets finales y hacer verificación móvil/GHL representativa. Preparar entrega HTML/assets con instrucciones de integración y limitaciones reales. No dar por validado Safari/iOS o webviews usando únicamente Chromium desktop.

La propuesta de carpetas por evento y la secuencia de skills están en `docs/project-context.md`; ninguna reorganización fue aplicada. Validación de esta inicialización: revisión de código y PDF, sintaxis JS, HTTP local HTML/logo; sin pruebas visuales, envíos ni despliegue.
