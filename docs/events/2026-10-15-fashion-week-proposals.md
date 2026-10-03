# Fashion Week — cinco propuestas de diseño

> Estado actual: **Satin Bow es la única versión activa**, en `2026-10/15-fashion-week.html`. Consulte [la especificación vigente](2026-10-15-fashion-week-active.md). Este documento conserva el historial de una etapa anterior; sus rutas `work/`, comparadores y variantes describen material retirado y no deben usarse para continuar el trabajo. Las siguientes iteraciones se hacen en la página principal.


## Actualización de etapa 2 — assets creados

La instrucción posterior del usuario autoriza ejecutar la creación de assets. Se completaron cinco originales y doce WebP para las cinco variantes, con revisión visual y prompts conservados. Consultar [inventario de assets](2026-10-15-fashion-week-assets.md) y `work/fashion-week-2026-10-15/assets/manifest.json`. Las menciones siguientes a “no creados” describen la planificación anterior. No se implementaron páginas ni selector; original HTML intacto. Ambiente visual simulado, entrada 21h30, Freak Show pausado.

Etapa 1, 02/10/2026. **Especificación para construir después; no son páginas implementadas.** Usuario autoriza rediseño completo y assets originales, pero pide detener esta etapa en documentación. La página `2026-10/15-fashion-week.html` permanece intacta durante toda la comparación. Freak Show sigue pausado. Sin dependencias nuevas, commits, push ni registros de prueba.

## Confirmaciones recibidas durante esta etapa

El usuario confirma **hora de entrada 21h30** y aclara: **ambiente simulado, solo visual**. Las cinco incorporarán 21h30; ningún formulario enviará o guardará datos. No se necesita cuenta DM ni backend para esta comparación. Toda vista de registro indicará “Demostración visual · no envía datos”; cualquier muestra de estado estará rotulada como simulación, sin entrada válida ni QR funcional.

## Evidencia y referencias abiertas

Se localizaron por nombre y se abrieron las cuatro imágenes dentro de `Resources/References/Fashion Week/`. La carpeta y `docs/` ya estaban sin seguimiento al comenzar; se conservan. Rama `main`, sin cambios rastreados iniciales. Se releían AGENTS, contexto, ficha de auditoría y `redesign-existing-projects/SKILL.md`; se aplica diagnóstico/composición, no su fase de cambios en esta etapa. El brief y las direcciones del usuario prevalecen sobre sugerencias genéricas de la skill, incluidas desaturación, homogeneidad de fondos o incorporación de Picsum.

| ID / archivo | Peso original | Observación visual comprobada | Qué tomar / qué no copiar |
| --- | --- | --- | --- |
| R1 `IMG-20260921-WA0173.jpg` | 89 815 B | Editorial claro, espacios amplios, rosa difuso, recortes separados, mezcla de sans y serif cursiva; adaptación vertical móvil visible. | Ritmo, aire y escalas de Editorial Perla/Satin; no catálogo de lencería, modelos, textos ni maquetación literal. |
| R2 `IMG-20260921-WA0172.jpg` | 318 038 B | Identidad Miss Eyelashes, rosa muy presente, cintas diagonales, collage, stickers, tipografía expresiva. | Energía, capas y cintas de Pink Backstage; excluir marcas ajenas, corazones infantiles y símbolos no pertinentes. |
| R3 `IMG-20260921-WA0174.jpg` | 67 333 B | Bolso rosa aislado delante de titular enorme, aire blanco, objetos cromados y composiciones asimétricas. | Jerarquía objeto/tipo de Chrome Runway y Perla; no copiar bolso, branding HUSH o escaparate comercial. |
| A1 `IMG-20260922-WA0043.jpg` | 112 242 B | Arte oficial: logo DVOID, título rosa con florituras, copa, piernas con zapatos rosa, fondo perlado, tipografía negra y rosa. | Fuente de identidad y condiciones del evento. Conservar original; no reconstruir ni alterar logo oficial. Assets originales podrán reinterpretar copa/zapatos sin calcar la fotografía. |

Fuentes oficiales adicionales consultadas mediante lectura web (sin descarga de assets ni inspección visual completa de esos sitios): [archivo Fashion Show de Victoria’s Secret](https://www.victoriassecret.com/us/vs/vsinsider/fashion-show) organiza contenidos de backstage, looks e invitaciones; [Vogue Runway](https://www.vogue.com/fashion-shows) organiza colecciones y cobertura de moda. **Inferencia de diseño:** separar la atmósfera editorial de la información práctica, y presentar looks con ritmo de edición. Estas páginas no confirman una pasarela, artistas ni experiencias en D-Void. No se reutilizarán sus imágenes, logotipos o diseños.

## Contraste de fuentes y contenido común

A1 = arte abierto; B = PDF `Resources/References/Brief_Web_DVOID_Fashion_Week.pdf`; U = instrucciones del usuario; H = HTML existente. No tratar H como aprobación comercial.

| Dato | Fuentes y decisión común para las cinco |
| --- | --- |
| Nombre y fecha | D-VOID Fashion Week; jueves 15 de octubre de 2026. A1 confirma día/mes/jueves; U confirma año. |
| Admisión | Mostrar **+21**, ahora sustentado por A1 y U, no solo por segmentación. H min 18 queda obsoleto para nuevas propuestas. No agregar “estrictamente mayores de 21” ni otra interpretación diferente del +21 publicado. |
| Dinámica | **Girls Night hasta las 23h00. Después de las 23h00, la noche se abre para todos.** A1 usa Girls Night, B Girls Only; U ratifica Girls Night. Se adopta el texto de A1 sin inventar excepciones. |
| Cover | **Ellas $10 hasta las 23h00; después $15 para todos.** La relación temporal está explícita en B y respaldada por A1/U. No agregar consumos incluidos, preventa o gratuidad. |
| Apertura | **Entrada 21h30**, confirmada por U durante esta etapa. Sustituye 21h00 de B/H; A1 no indica apertura. Usar 21h30 también en microcopy y no reutilizar “SEE YOU AT 9”. Sin hora de cierre inventada. |
| Lugar | D-VOID · Av. República · Quito (A1/B + contexto U). No inventar número de calle o mapa. |
| Dress code | Dress to impress (A1/B); no necesitas venir de rosa (B). Zapatos/copa son dirección visual, no un requisito de vestimenta ni bebida incluida. |
| Contacto | A1 dice “Reservas vía DM”; B propone WhatsApp/reservas. U confirma ambiente solo visual: no incorporar enlace activo ni solicitar cuenta en esta fase. Si se representa el canal del arte, rotularlo “Reservas vía DM · muestra visual, sin conexión”; no sustituir por WhatsApp. |
| Promociones y experiencias | B sigue pendiente. Publicar únicamente condiciones de cover confirmadas; no venderlas como descuento ni prometer pasarela, backstage real, regalos, barra libre o afterparty. |
| Registro | U requiere sección en todas. Base común: nombre, apellido, celular. Edad/Instagram/acompañantes son sugeridos en B y quedan fuera del núcleo hasta confirmación. El diseño editorial de registro no autoriza confirmar entradas. |

Copy base: “D-VOID Fashion Week” → “Jueves 15 de octubre · 21h30 · +21” → “Girls Night hasta las 23h00” → “GET ON THE LIST”. Concepto: “Una noche para sacar ese outfit, venir con tus amigas o llegar sola y conocer nuevas”. Condiciones en texto legible, no dentro de imágenes. Registro: “Regístrate para Fashion Week”, botón “I’M IN” dentro de demo claramente identificada, sin envío ni almacenamiento. Mensajes funcionales en español.

No usar $15–20 de consumo habitual, cupos, fechas límite de reservas ni número máximo de acompañantes como condiciones. No reutilizar las cuatro experiencias inventadas ni el QR del prototipo.

## Base comparable y tipografía

Las cinco serán páginas completas con hero, concepto/dress code, condiciones aprobadas y registro final; misma información, mismos campos y mismo estado de integración. Cambian composición, materiales y jerarquía, no oferta. Módulos de promociones adicionales previstos pero no visibles hasta aprobación.

Tipografía disponible sin nuevas descargas: stacks `Georgia, 'Times New Roman', serif` y `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`; `ui-monospace, monospace` solo para numeración editorial. La fuente exacta depende del dispositivo; no prometer Georgia/SF en todos. Se comprobó que los templates de bundles contienen Inter Tight y que index contiene Anton embebida; no hay archivos de fuentes sueltos identificados. No extraer ni redistribuir automáticamente fuentes de bundles sin revisar manifest/licencia. Cherona/Rosting Rose del AGENTS histórico no se comprobaron en los templates revisados. Cormorant remoto del prototipo no será requisito de las variantes.

Texto de formulario 16px o mayor; cuerpo 16–18px; controles ≥44×44; títulos fluidos y cortes deliberados sin ocultar palabras. Máximo dos familias por variante. Paletas siguientes son propuestas, no colores oficiales extraídos por medición. Texto crítico en tonos oscuros/claros contrastantes, rosa tenue solo ornamental; comprobar contraste al implementar.

## 01 — Editorial Perla

**Idea:** portada de revista de moda con bodegón de copa y zapatos; la dirección más próxima al arte oficial y a R1. Marfil frío, no amarillo.

- **Paleta:** base `#F7F4F1`, rosa `#E88EB9`, rosa profundo CTA `#9E285D`, tinta `#252124`, reflejo `#D8D4D6`.
- **Tipografía:** Georgia regular/cursiva para titulares; system-ui para datos y formulario. El título permanece texto HTML; no imitar artificialmente la caligrafía del arte con una fuente inexistente.
- **Móvil:** logo pequeño, fecha/+21, titular a dos líneas, bodegón 4:5 con copa recortada hacia un borde y zapatos completos, CTA visible sin esperar animación. Condiciones en dos filas bajo el hero; concepto breve; registro en columna sobre marfil.
- **Escritorio:** retícula 5/7: titular y datos a izquierda, bodegón a derecha con solapamiento solo ornamental; espacio editorial generoso. Condiciones horizontales con separación tipográfica; registro 5 columnas junto a detalle de imagen 7 columnas, sin campos sobre fotografía.
- **Secuencia:** hero → cover/dinámica → concepto y dress code → registro → ubicación/contacto aprobado.
- **Animaciones (máximo 3):** entrada ornamental del bodegón 350ms una vez; subrayado de CTA 150ms al interactuar; feedback de botón 100ms. Nada oculta texto ni mueve el formulario.
- **Assets a crear después:** P1 bodegón original copa/zapatos (master vertical y recorte horizontal); P2 detalle de cristal para sección editorial. Sin bebida gratuita implícita, marcas ajenas ni texto rasterizado.
- **Riesgo de diseño:** parecer invitación de boda. Corregir con escala editorial contundente y datos de club claros, sin ornamentos románticos excesivos.

## 02 — Pink Backstage

**Idea:** mesa de preparación/collage editorial en rosa expresivo; toma de R2 las cintas y de A1 los accesorios, sin prometer acceso real a backstage.

- **Paleta:** rosa `#FF4DA0`, claro `#FFE6F1`, tinta `#21151D`, frambuesa CTA `#941344`, blanco `#FFF9FC`.
- **Tipografía:** system-ui 800/900 en titulares y 400/600 en texto; Georgia cursiva solo como acento de dos o tres palabras, no en campos.
- **Móvil:** titular superior fuerte, collage acotado a tres recortes; una cinta diagonal “Dress to impress” sin tapar fecha/CTA. Condiciones en lista sobre fondo claro; formulario limpio a ancho disponible.
- **Escritorio:** collage asimétrico ocupa 60%, bloque tipográfico 40%; cinta cruza solo la zona visual. Cambio a franja clara de condiciones y layout de dos columnas concepto/registro.
- **Secuencia:** hero/collage → concepto → condiciones de la noche → dress code breve → registro.
- **Animaciones (máximo 3):** asentamiento de tres recortes como una secuencia de 400ms; pequeño desplazamiento de cinta al hover/foco 150ms; feedback del CTA 100ms. Sin marquee infinito ni parallax.
- **Assets:** B1 fotografía original de accesorios de camerino; B2 tres recortes (espejo, zapato y copa) con transparencias; B3 cinta SVG propia con copy aprobado, sin logos ajenos. No fotos de artistas que impliquen su presencia.
- **Riesgo:** ruido o estética infantil. Límite de tres recortes, sin corazones/stickers de relleno; campos siempre rectos y tranquilos.

## 03 — Chrome Runway

**Idea:** objeto escultórico cromado delante de gran tipografía, inspirado en la jerarquía de R3. “Runway” es nombre interno de la propuesta, no una pasarela anunciada.

- **Paleta:** negro `#111114`, plata `#C9C9D0`, papel `#F4F4F6`, rosa `#E979B0`, CTA `#F5A3CA` con texto oscuro.
- **Tipografía:** system-ui de peso fuerte, títulos grandes con tracking compacto; ui-monospace para índices “01/02” y hora 23h00, nunca para párrafos largos.
- **Móvil:** título a dos líneas sin desbordar; zapato escultórico sobre zona gráfica separada, base clara; franja negra de fecha/+21 y CTA. Condiciones apiladas como programa editorial; formulario claro.
- **Escritorio:** titular enorme horizontal detrás del objeto, conservando las palabras legibles; bloque negro secundario con condiciones en dos columnas y rosa puntual. Registro en retícula limpia con margen amplio.
- **Secuencia:** hero/objeto → dinámica en dos momentos → dress code → registro → ubicación.
- **Animaciones (máximo 3):** aparición del reflejo 300ms una vez; desplazamiento ornamental de objeto ≤6px por hover/foco 180ms, sin seguimiento del cursor; feedback de CTA 100ms.
- **Assets:** C1 zapato/forma original cromada con detalle rosa, transparencia; C2 plano de reflejo o textura metálica raster estática. Nada de WebGL, vídeo o librerías 3D.
- **Riesgo:** sensación tecnológica fría. Mantener acento rosa y zapato reconocible; condiciones y concepto humano en texto, sin interfaz de “terminal”.

## 04 — Satin Invitation

**Idea:** invitación editorial apoyada sobre satén; delicadeza táctil de R1 con detalles del arte oficial. No sobre que deba abrirse para acceder.

- **Paleta:** rosa papel `#F9E8ED`, satén `#D9A4B7`, marfil `#FFF9F7`, tinta ciruela `#402331`, CTA `#82334F`.
- **Tipografía:** Georgia regular/cursiva; system-ui para condiciones y formulario. No usar cursiva para cifras, labels o errores.
- **Móvil:** pliegue satinado en márgenes, tarjeta central completamente visible con título, fecha y CTA; detalle de zapato en borde inferior; condiciones y registro continúan en flujo normal sobre papel, sin modal.
- **Escritorio:** invitación central desplazada ligeramente a izquierda, satén amplio y detalle de copa a derecha. Concepto breve junto al bloque de condiciones; registro como continuación de la invitación.
- **Secuencia:** hero/invitación → concepto/dress code → condiciones → registro → contacto/ubicación.
- **Animaciones (máximo 3):** pequeño asentamiento de tarjeta 300ms; revelado de una línea ornamental 250ms; feedback CTA 100ms. Sin giro 3D ni apertura obligatoria.
- **Assets:** S1 satén rosa original con zona central limpia; S2 bodegón pequeño copa/zapato. Textura de papel sutil mediante CSS o SVG propio; sin lazos o sellos que parezcan tickets válidos.
- **Riesgo:** poco contraste/demasiado ceremonial. Tinta ciruela sólida, fecha y cover explícitos; nada de texto fino rosa sobre satén.

## 05 — After Hours

**Idea:** editorial nocturna con fotografía de flash estática, ciruela y rosa eléctrico. Nombre interno; no implica prolongación del evento ni hora de cierre.

- **Paleta:** ciruela `#251220`, negro `#130F14`, rosa eléctrico `#FF5CB8`, papel `#FFF2F8`, gris rosa `#C8B5C2`.
- **Tipografía:** system-ui 800 para titulares contundentes, Georgia cursiva para un acento editorial. System-ui regular para todo texto funcional.
- **Móvil:** foto 4:5 de accesorios/escena original con luz de flash; titular y datos en panel ciruela separado, no texto sobre caras o reflejos. CTA rosa con tinta oscura. Condiciones en panel claro; formulario ciruela con campos claros.
- **Escritorio:** composición de doble página: fotografía grande a izquierda, título/data a derecha; detalle fotográfico más pequeño descentrado en concepto. Registro a una columna de ancho limitado con información al lado.
- **Secuencia:** hero → condiciones → concepto y dress code → registro → ubicación/contacto.
- **Animaciones (máximo 3):** entrada del encuadre 300ms; línea rosa de sección 200ms una vez; feedback CTA 100ms. El “flash” es iluminación de la fotografía, **nunca parpadeo de pantalla**.
- **Assets:** A2 fotografía original nocturna de copa/zapatos con flash directo; A3 recorte de textura satinada/metal para contrapunto. Si se incluyen personas, adultos y sin fingir asistencia real de invitados o artistas.
- **Riesgo:** alejarse del arte claro y parecer otra fiesta. Repetir rosa oficial, copa/zapatos y condiciones, sin códigos visuales de terror de Freak Show.

## Movimiento, formulario y estados comunes

Los tres efectos enumerados por variante son el presupuesto total, incluidas microinteracciones; sin loaders bloqueantes, scroll secuestrado ni contenido oculto por defecto. `prefers-reduced-motion` elimina los efectos y conserva todos los estados. No activar skill de animación ni generar animaciones ahora: esto solo documenta límites para una implementación posterior.

Registro idéntico: nombre/apellido/celular con labels persistentes, autocomplete apropiado, foco visible y errores asociados. No pedir otros datos solo para llenar el diseño. Estados previstos: inicial, validación, enviando, error recuperable, respuesta inválida y confirmación únicamente tras respuesta válida del contrato. Sin backend en revisión: formulario rotulado “Demostración: no envía datos”, no persistir PII ni mostrar entrada/QR. Opción de revisar estados con datos ficticios controlados, nunca enviando a producción. En ausencia de JS, contenido y condiciones visibles y aviso de registro no disponible; evitar submit GET con datos personales.

Por decisión del usuario, todas las variantes son simulaciones visuales; ninguna debe parecer funcionalmente superior por simular éxito. Las especificaciones de integración son únicamente criterios para una eventual entrega posterior, no trabajo ni preguntas bloqueantes de esta etapa. No afirmar compatibilidad GHL hasta probar el método real de inserción. Namespace `fw-` en clases/IDs y encapsulación de scripts previstos; no inyectar estilos globales en el anfitrión.

## Selector de revisión — especificación, no implementación

Una página local externa a las variantes con selector nativo etiquetado de cinco opciones, nombre/dirección visible, enlaces directos y área de vista previa con un único iframe activo. Controles de ancho 375, 390, 768 y 1440px, más ancho disponible. En móvil no encoger texto para fingir una pantalla de escritorio: abrir variante directamente para prueba real. El iframe aísla estilos entre propuestas; no prueba por sí mismo integración GHL.

Selector conserva variante/ancho/sección en URL de revisión, nunca valores del formulario. Al cambiar variante vuelve a la misma sección semántica (hero/condiciones/registro) si se implementa un pequeño contrato de mensajes con validación de origen y source; si no, se reinicia arriba de forma explícita. No mantener cinco iframes cargados. Sin navegación envolvente obligatoria, con foco en selector después de cambios y título accesible del iframe.

Criterios de comparación comunes: claridad de fecha/+21/cover, identidad vinculada al arte, diferenciación real de composición, lectura móvil, recorrido al registro, teclado/foco, movimiento reducido y peso real de assets. Revisar con los mismos textos y campos. La entrega final excluirá selector, controles, demos, referencias y variantes descartadas.

## Estructura propuesta adaptada al repositorio — no creada

```text
2026-10/15-fashion-week.html                  # original intacto
Resources/References/Fashion Week/           # cuatro JPG originales; no mover
Resources/References/Brief_Web_DVOID_Fashion_Week.pdf
Resources/DVOID/                             # compartidos existentes intactos
work/fashion-week-2026-10-15/
  review/index.html                         # selector solo para revisión local
  shared/                                   # contrato/copy/formulario común nativo
  variants/
    01-editorial-perla/index.html
    02-pink-backstage/index.html
    03-chrome-runway/index.html
    04-satin-invitation/index.html
    05-after-hours/index.html
  assets/
    originals/                              # masters creados, prompts y procedencia
    publish/01-editorial-perla/              # equivalentes 02–05
  delivery/                                 # solo variante elegida, HTML + assets
    index.html
    assets/
    README.md
docs/events/2026-10-15-fashion-week-proposals.md
```

Esta propuesta sustituye para la comparación la carpeta genérica `events/...` sugerida en la inicialización, evitando mover páginas mensuales o referencias. `work/` no se publica ni despliega en esta etapa; si después se usa Vercel para revisar, acordar exclusiones/hosting para no exponer masters y referencias accidentalmente. No modificar vercel.json ahora. La entrega se preparará después de elegir variante, adaptando paths al hosting acordado y verificando que funciona fuera de `work/`.

## Inventario futuro y producción de assets

Los IDs P1/P2, B1–B3, C1/C2, S1/S2, A2/A3 son encargos, **no archivos existentes ni generados**. Todas las propuestas usarán el logo oficial compartido sin filtros ni alteraciones, previa comparación con A1. A1 es autoridad visual, no una imagen que se estira como toda la web. Se puede consultar como referencia; los tres moodboards de terceros no son assets publicables.

Cada futuro asset registrará ID, variante, archivo original, autor/herramienta, prompt si aplica, referencias empleadas, fecha, dimensiones, peso, permiso/procedencia y exportaciones. Preparar recortes móvil/escritorio deliberados (4:5 y aproximadamente 3:2 según composición), texto siempre en HTML. WebP para fotos y PNG/WebP transparente o SVG para objetos según soporte de herramientas existentes. Objetivo inicial de hero ≤250 KB por viewport, sujeto a calidad y medición; no es un resultado comprobado. No descargar fuentes/CDN ni usar Picsum.

La autorización de crear originales está registrada; generación y edición comenzarán en la etapa de construcción, leyendo entonces la skill pertinente y usando herramientas disponibles sin instalar dependencias. No se han creado imágenes ni código en esta etapa.

## Dudas indispensables y siguientes decisiones

**Ninguna duda bloqueante para esta etapa ni para construir la comparación visual autorizada después:** entrada 21h30 confirmada y ambiente simulado. Se resolvieron las consultas de horario/contacto mientras se redactaba este documento. No se pide endpoint, cuenta DM ni modo GHL para un ejercicio exclusivamente visual.

Una eventual entrega funcional requerirá un encargo posterior para definir GHL, integración y contrato de respuesta. Mientras tanto: sin envíos, persistencia, QR funcional ni enlaces fingidos. No hace falta confirmar promociones adicionales para avanzar; incluir únicamente covers y dinámica aprobados.

Se recomienda construir las cinco con igual alcance antes de elegir: Editorial Perla aporta mayor continuidad con A1, Pink Backstage máxima expresión, Chrome Runway contraste escultórico, Satin Invitation intimidad y After Hours atmósfera nocturna. Esta etapa termina con especificaciones, no con construcción.
