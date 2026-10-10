# Fase 4.1 — base responsive estática

Implementada el 7 de octubre de 2026. No se inició la fase 4.2.

## Auditoría inicial

- index.html: seis secciones semánticas, pero textos y medios vacíos; videos sin archivos publicados y sin posters.
- styles.css: aislamiento bajo .oh-page correcto; min-height de una pantalla en todos los bloques, un solo breakpoint y cajas genéricas no resolvían la composición por dispositivo.
- script.js: loadVideos desactivado, pero su activación habría asignado todos los vídeos a la vez. Eliminado ese mecanismo. Esta fase no necesita comportamiento JS.
- Los seis PNG se revisaron visualmente. Cada original pesa 2,3–2,5 MiB; se conservan intactos. No hay vídeo, impresora ni variantes móviles dirigidas disponibles.

## Mapa completo de assets

| Original en assets/img | Dimensiones | Escena / decisión |
| --- | --- | --- |
| the-last-premiere-master-v1.png | 1672 × 941 | Premiere, poster prioritario. Intro tipográfica comparte el mundo visual sin repetir descarga ni fotografía. |
| the-last-premiere-master-v2-undead.png | 1672 × 941 | Transformation: escena undead estática e independiente; ninguna mutación. |
| the-last-premiere-master-v2-zombie-paparazzi.png | 1672 × 941 | Alternativa archivada; no se descarga. Elegir definitivamente antes de producir movimiento. |
| skeleton-couple-charlie-marilyn-v1.png | 1086 × 1449 | Dresscode: retrato completo, sombrero, bastón y vestido visibles. |
| the-last-box-office-v1.png | 1672 × 941 | Box Office: imagen completa, panel independiente de altura flexible. |
| the-golden-ticket-v1.png | 1860 × 845 | Referencia ornamental; no se descarga. Marco y talón reconstruidos de forma sencilla en CSS para poder redistribuir HTML. No es una reproducción exacta del ornamento. |

## Sistema implementado

Paleta acordada y tokens locales para superficies, contraste, spacing de 8/16/24/32/48/80 px, gutters fluidos, tipografía de sistema y serif local de fallback. No fuentes remotas. H1, H2 y H3 fluidos, medida de lectura limitada, composición máxima de 1440 px. Breakpoints de 640 y 960 px por contenido. Safe areas laterales, superiores e inferiores; scroll natural y alturas libres. Overlays ópticos mínimos, sin texto esencial sobre fotos. Identidad textual D-VOID; no se modifica el logo compartido.

Móvil: intro vertical, CTA ancho, copy separado de fotos, salones en proporción horizontal completa, pareja vertical, taquilla apilada y ticket con talón inferior. No hay cover 9:16 accidental. El formato horizontal conserva la narrativa, aunque no ofrece un hero vertical inmersivo.

Laptop: salones panorámicos amplios, mayor escala tipográfica y espacio editorial; pareja y texto en columnas; taquilla y superficie de reserva independientes. Ticket horizontal con talón lateral. No se impone altura de imagen al panel de reserva.

Variantes específicas: sí para futuros heroes clean/undead a pantalla completa vertical, con idéntico encuadre dirigido y presencia de ambos grupos. Pareja: no para la composición editorial actual; sí para un eventual fondo panorámico. Taquilla: no apilada; sí si se exige fondo 9:16 con ventanilla completa. Ticket: composición móvil ya resuelta con CSS, sin requerir otra generación.

## Medios y rendimiento

Ocho derivados WebP en assets/img/web, desde cuatro originales existentes, sin generación de arte. Dos escalas por foto: 640 y hasta 1280 px. La pareja conserva un máximo real de 1086 px (descriptor srcset correcto aunque el nombre de exportación indica 1280). Calidad 80, metadatos retirados. Aproximadamente 47–185 KiB por archivo. No se sirven PNG masters.

picture/img conserva width, height y aspect-ratio antes de descargar. srcset/sizes seleccionan resolución; eager/fetchpriority high solo para Premiere. Resto loading=lazy y decoding=async. El navegador puede anticipar imágenes cercanas, no garantiza una única descarga inicial. No se duplican las fotos como fondos CSS.

Cada figure tiene data-media y data-media-state=poster. La clase oh-media admite img/video con object-fit y object-position configurables. En esta fase contain y ratio nativo conservan el cuadro completo; la posición no realiza un recorte artificial. Al disponer de variantes móviles, añadir source media dentro de picture. Futuros vídeos deberán usar el mismo contenedor, poster persistente y preload=none. No hay reproductores, fuentes de vídeo ni runtime Hyperframes instalados.

## Validación realizada

Chromium local mediante Puppeteer ya existente; ninguna instalación.

- 320, 360, 375, 390, 430, 640, 768, 960, 1280 y 1440 px: seis secciones, sin overflow horizontal ni enlaces menores de 44 px de alto.
- Sin JS a 320 px: Tab alcanza “Saltar al contenido”; Enter enfoca oh-main.
- Prueba adicional a 320 px con cuerpo de 32 px y H1 ampliado: sin overflow. No equivale a una certificación completa de zoom de cada navegador.
- Capturas revisadas a 375 y 1440 px; recorrido posterior por todas las imágenes para verificar decode de medios lazy y reserva de espacio.
- prefers-reduced-motion activo en el recorrido final; página sin animaciones ni reproducción.
- Único 404 inicial: favicon automático; corregido con icono vacío embebido. Sin excepciones JS observadas.
- Texto sobre superficies sólidas: ivory/champagne sobre negro o superficie oscura; ticket con texto oscuro sobre marfil. Foco explícito y enlaces nativos para navegación; no botones falsos ni acción de envío.

## Riesgos y límites

No certificar GHL: falta decidir iframe o bloque HTML y probar URLs de medios, CSS anfitrión, ancho contenedor, CSP y ejecución permitida. El CSS se limita a .oh-page, salvo body.oh-document en standalone. Breakpoints relativos al viewport: un bloque estrecho dentro de una página GHL amplia requerirá validar su contenedor. Rutas de assets relativas funcionan al alojar la carpeta completa; insertar un fragmento requiere ajustar la base de hosting.

Fuentes locales varían entre sistemas. Retina desktop puede necesitar exportación mayor tras medición visual. No se han probado Safari/iOS, navegadores internos, dispositivo con notch, teclado de formulario ni red móvil real. No hay formulario para probar nombres largos, consentimiento o errores. La continuidad geométrica clean/undead debe revisarse antes de una mutación; estas imágenes no certifican un empalme válido.

Los textos de enlace narrativo son propuesta editorial; condiciones, fecha, precios y dresscode definitivo no se inventan. La reserva permanece deshabilitada como contenido informativo. Ticket claramente de muestra, sin QR, datos personales, envío ni almacenamiento.

## Siguiente fase 4.2 — pendiente, no ejecutada

1. Revisar/aprobar composición y copy en teléfono y laptop; confirmar variante undead y necesidad de masters verticales.
2. Definir método GHL y validar un montaje estático en entorno de prueba, incluyendo assets, aislamiento y contenedor.
3. Acordar alcance explícito del movimiento; solo entonces preparar variantes/posters y continuidad clean/undead. Sin producción ni gasto implícitos.
4. Antes de habilitar reserva/ticket, confirmar contrato, campos, consentimiento y respuesta válida; probar estados sin producción.

Archivos editados: index.html, styles.css, script.js. Añadidos: esta nota y ocho WebP en assets/img/web. Originales, otras páginas y configuración raíz intactos. Sin commits ni push.

## Fase 4.2 — intro cinematográfica (7 de octubre de 2026)

Esta actualización sustituye únicamente el estado «4.2 pendiente» de esta nota. Se implementó la intro, sin desarrollar el hero completo ni los comportamientos de las secciones posteriores.

- Cubierta negra en un grid sobre el único poster clean aprobado de The Last Premiere. El poster existente se trasladó desde el bloque estático a este umbral; no hay imagen duplicada, generación, vídeo, dependencia nueva ni almacenamiento.
- Logo oficial compartido `../Resources/DVOID/dvoid-logo.png`, sin alterarlo. Serif de sistema ya disponible. La entrega debe conservar esa ruta compartida.
- Apariciones por opacity: logo/Presents 0,5 s; título 1,5 s; subtítulo 2,5 s; botón 3 s. El botón real está habilitado desde el inicio, incluso durante la aparición; el foco de teclado lo hace visible inmediatamente. Recargar reinicia la secuencia.
- Atmósfera CSS: borgoña y oro tenues, textura fija, dos variaciones mínimas de proyector y un flash lateral aislado. Sin bucles continuos, filtros, canvas ni WebGL.
- Entrada: flash suave, salida de texto y fundido de cubierta de aproximadamente 1 s. Foco al poster, intro inerte y fuera del árbol accesible. La cubierta conserva su espacio en el grid para evitar saltos. Scroll nativo libre y enlace de salto al contenido.
- Reduced motion muestra todo directamente, elimina animaciones y flashes y conserva solo un fundido de 180 ms. Sin JS hay enlace nativo y el poster se dispone después de la intro.

**Móvil:** título centrado en dos líneas, subtítulo dividido, botón de 52 px y safe areas. En 320–430 px el CTA queda dentro de la primera pantalla. Poster horizontal completo con `contain`, centrado, con franjas negras: conserva ambos grupos y alfombra, pero no llena una pantalla vertical.

**Laptop:** título editorial más amplio, subtítulo en una línea y mayor aire. Poster con `cover` y `object-position: 50% 48%`, verificado visualmente a 1440 × 900; conserva el centro y ambos grupos principales.

**Variante específica:** no hace falta otro asset para la intro tipográfica actual. Sí se necesita una composición vertical dirigida para un futuro hero 9:16 inmersivo que conserve fotógrafos, invitados, lámparas y alfombra. El horizontal completo se ve pequeño en teléfono; ampliarlo hasta cubrir perdería narrativa lateral. No se generó esa variante.

Validación: Chromium local, anchos 320, 360, 375, 390, 430, 768, 1280 y 1440; sin overflow horizontal, CTA dentro del viewport, altura idéntica antes/después de entrada, una sola imagen clean y sin excepciones JS. Enter/Space y foco al poster comprobados. También entrada inmediata, recarga, movimiento reducido y enlace sin JS. Capturas revisadas de intro y revelación a 375 × 812 y 1440 × 900. No certifica Safari/iOS, notch físico, navegador de Instagram/WhatsApp ni integración GHL.

FASE 4.3 queda sin iniciar: disponible el umbral y su transición hacia el poster para trabajar posteriormente el hero bajo instrucciones nuevas.

## Fase 4.3 — Red Carpet Hero

Implementación limitada al hero clean y a su conexión con la intro. Sustituye el estado «4.3 sin iniciar» anterior. Las secciones posteriores siguen siendo la base estática de 4.1: no se implementó mutación, dresscode, reservas, ticket ni vídeo.

### Composición y navegación

El único picture clean vive ahora dentro de `#oh-hero`, debajo de la intro. El hero contiene logo oficial, título, subtítulo y dos anchors: GET ON THE LIST → `#oh-reservation` (solo información de reservas aún deshabilitadas), VIEW THE PREMISE → `#oh-concept`. No hay fecha/hora: `concept.md` confirma que esos datos requieren aprobación específica para este evento. No se heredaron condiciones de Fashion Week.

Entrada por botón/teclado, enlace de salto o fragmento directo. Mientras la intro está activa, el hero es inert y aria-hidden; al entrar recibe foco y queda accesible. Sin JS, intro y hero se ordenan en el flujo y el enlace de entrada es nativo. Los textos existentes posteriores no se modificaron.

### Móvil

Hero de 100svh con altura flexible si crece el texto. Imagen con altura `min(62svh,130vw)`, cover y posición `50% 46%`: ventana vertical dirigida que conserva eje, puertas, parte de las lámparas y los invitados próximos de ambos lados. Título y acciones abajo, subtítulo en dos líneas, CTA principal de ancho completo. Gradiente al pie del encuadre para unirlo al fondo sin caja opaca. Safe areas y foco visible.

El crop retiene aproximadamente un 43% del ancho del master en 375 × 812; pierde fotógrafos e invitados exteriores. Es una solución provisional deliberada, no una certificación del horizontal como master móvil. `sizes` contempla el ancho de la imagen escalada por altura para seleccionar el WebP existente de mayor resolución cuando corresponde; no hay otro master ni fotografía duplicada.

**Variante específica: sí**, para un futuro master 9:16 a pantalla completa. Debe conservar puerta central, perspectiva y entrada de alfombra, lámparas identificables, fotógrafos e invitados en ambos lados, y zonas limpias superiores/inferiores para identidad y CTA. Las futuras versiones clean/undead deben compartir cámara, geometría y posiciones. No se generó esa variante.

### Laptop

Fotografía a pantalla completa, cover `50% 48%`. Identidad arriba y composición editorial abajo a la izquierda; el eje de puertas/alfombra y los grupos principales quedan libres. Título en dos líneas, subtítulo en una y acciones en fila. Overlays oscuros graduados mantienen contraste sin panel opaco grande.

### Movimiento y estado

- Estado narrativo canónico en DOM: `#oh-hero[data-hero-state="clean"]`. JS no cambia ese valor. `has-motion` / `is-running` controlan reproducción, no identidad narrativa.
- Push-in de una sola pasada, 28 s: escala 1 → 1,015 móvil/tablet y 1 → 1,025 laptop. Mantiene el encuadre final, sin reiniciar en bucle.
- Tres planos ópticos, sin segmentar ni duplicar personajes: fotografía de fondo, haze/luz intermedia y sombra de primer plano. Con scroll se desplazan hasta +6/−10/−20 px respectivamente; zoom adicional máximo 0,8%. El copy pierde como máximo 12% de opacidad y recupera opacidad total al recibir foco.
- Haze por gradientes, transform y opacity: dos recorridos suaves de 19 s. Sin filtros, canvas, WebGL ni librerías.
- Flashes laterales de 360 ms, opacidad máxima 0,09, separados aleatoriamente por 9–19 s. No blanquean toda la pantalla ni cubren los controles.
- Pausa manual con botón real y aria-pressed. IntersectionObserver y visibilitychange suspenden animaciones, temporizador de flashes y observación del scroll fuera de vista o en pestaña oculta. Scroll pasivo, como máximo una actualización pendiente en requestAnimationFrame; no hay bucle JS por fotograma.
- Reduced motion elimina push-in, parallax, haze animado y flashes; conserva la transición simple de la intro. Sin scroll-jacking, vídeos ni almacenamiento.

### Validación

Chromium local: 320×568, 360×740, 375×812, 390×844, 430×932, 768×1024, 1280×800 y 1440×900. Hero de una pantalla, CTA principal visible sin scroll, sin overflow horizontal ni excepciones JS, una sola imagen clean. Capturas revisadas a 375 y 1440 px. Verificados entrada con Enter/Space, foco, pausa/reanudación, progreso al hacer scroll, suspensión fuera de pantalla, reduced motion, salto de intro, fragmento directo, destinos de ambos CTA y fallback sin JS. Texto al 200% sin overflow horizontal; la altura puede crecer para conservar acceso a todo el contenido.

No certifica Safari/iOS, dispositivos físicos ni integración GHL. La profundidad es atmosférica sobre una fotografía plana: no hay movimiento independiente de personas ni dolly con geometría 3D.

**Siguiente, FASE 4.4:** hero clean, estado explícito, planos visuales y control de movimiento disponibles para diseñar HOLLYWOOD → AFTERLIFE MUTATION. Falta aprobar y resolver continuidad/encuadres antes de implementar la transformación. No se inició esa fase.

## Fase 4.4 — Hollywood → Afterlife Mutation

Implementada únicamente la transformación del salón. Sustituye el estado «4.4 no iniciada» anterior. Dresscode y secciones posteriores no se modificaron.

### Assets y continuidad

Se reutilizan los WebP aprobados de `the-last-premiere-master-v1` y `the-last-premiere-master-v2-undead`. La variante zombie-paparazzi no participa. El poster undead antes separado en Concept se trasladó al hero: quedan exactamente dos capas del salón en toda la página, sin generaciones nuevas ni descargas de masters PNG.

Ambos picture comparten `.oh-world-camera`: misma caja absoluta, object-fit, object-position, tamaño responsive, transform de acercamiento y parallax del padre. Durante la mutación se pausa el movimiento ambiental/cámara. No se deforma ninguna imagen. Los tamaños y geometría de puertas, lámparas y alfombra son muy próximos; cambian algunas siluetas, accesorios y decoración lateral. Exposiciones breves, sombreado y haze suavizan la diferencia, pero no constituyen una transformación anatómica continua.

### Trigger y estado

Estado único `#oh-hero[data-hero-state]`: `clean` → `transitioning` → `undead`. IntersectionObserver detecta la salida del hero por arriba cuando su intersección cae bajo el 85%, anticipando el siguiente bloque mientras aún hay imagen visible. No depende de un offset de scroll en píxeles, no fija el hero y no bloquea el desplazamiento. El enlace a Concept conserva navegación nativa: avanzar rápido permite omitir la película.

Se solicita decode del undead al entrar a la premiere. La secuencia espera una imagen válida sin bloquear la página; si falla su carga, permanece clean. Un guard local evita repetir la secuencia durante esa carga de página. Recargar vuelve a clean; sin localStorage. Si el usuario deja atrás toda la escena o esconde la pestaña, se resuelve el estado final sin seguir emitiendo flashes. Volver arriba conserva undead.

### Móvil / tablet (<960 px)

3,4 s y dos flashes laterales suaves. Anomalía inicial, primera exposición corta seguida de regreso a clean, exposición intermedia más larga bajo sombra y último flash que conduce a undead permanente. Pico de opacidad del overlay de flash: 0,14; el gradiente limita todavía más su luminancia y extensión. No hay filtros ni blur. El título solo baja levemente de opacidad y termina estable en ivory.

Crop compartido `50% 46%`, misma ventana de 4.3. Mantiene puerta, alfombra y personajes próximos, pero deja fuera grupos y fotógrafos exteriores, justamente donde la mutación resulta más evidente. Prioridad a estabilidad geométrica; no ampliar una capa respecto de la otra. La versión 9:16 sigue siendo necesaria para conservar todo el relato. Debe incluir grupos humanos/undead en ambas orillas, fotógrafos, puerta, alfombra y lámparas, con idéntica cámara entre versiones y safe zones para texto.

### Laptop

4,4 s y tres flashes localizados, aproximadamente a 1,1 / 2,15 / 3,34 s; opacidad máxima 0,22 sobre gradientes, nunca blanco uniforme. Primer destello revela undead brevemente y devuelve clean. La segunda exposición dura más; la tercera lleva al fundido final. Sombras más profundas, viñeta y tinte neutral discretos, haze adicional sin filtros. Alfombra roja y lámparas doradas siguen visibles. Mayor contraste final en HOLLYWOOD NEVER DIES.

Los masters actuales son suficientes para demostrar esta secuencia. Para una continuidad final sin cambios de silueta, conviene rehacer/alinear la versión undead desde el clean aprobado, especialmente al producir la pareja 9:16. No se regeneró nada ni se considera resuelto un futuro morph anatómico o vídeo.

### Accesibilidad y rendimiento

Reduced motion: solo opacity durante 180 ms, sin flashes ni flicker. Cambiar esa preferencia o pulsar pausa durante la mutación cancela los destellos y resuelve con el mismo fundido breve. Los CTA siguen siendo enlaces utilizables; no se cambian textos esenciales ni foco durante la mutación. No hay aria-live para el efecto decorativo; el alt accesible del salón corresponde a la capa final.

WAAPI nativa para las exposiciones, sobre opacity; transform compartido del sistema previo. Las animaciones finitas se cancelan al consolidar el estado final, dejando el estilo en CSS. Sin will-change permanente ni nuevos timers recurrentes. Los flashes ambientales de 4.3 se cancelan al comenzar la mutación y no vuelven después de undead. Sin audio, Hyperframes, vídeo, canvas, WebGL, instalaciones ni nuevas dependencias.

### Validación

Chromium local en 320, 360, 375, 390, 430, 768, 1280 y 1440 px: rectángulos/crop de ambas capas iguales, duraciones y número de pulsos correctos, clean=0 y undead=1 al finalizar, overlay de flash=0, sin overflow ni excepciones JS. Verificados permanencia al volver arriba, reduced motion desde inicio y activado a mitad de secuencia, pausa durante la mutación, scroll rápido, recarga y fallo de descarga undead conservando clean. Capturas revisadas en 375 y 1440 px; corregido el borde del haze para que su gradiente termine de forma suave. No certifica Safari/iOS, dispositivos físicos ni GoHighLevel.

**Siguiente, FASE 4.5:** estado undead persistente y atmósfera final disponibles para conectar con Charlie Chaplin + Marilyn Monroe / Dresscode Experience. La sección y el asset de pareja existentes permanecen intactos; esa fase no se implementó.

## Fase 4.5 — Charlie Chaplin + Marilyn Monroe / Dresscode Experience

Cierre de validación: 8 de octubre de 2026. Sustituye el estado «4.5 no implementada» de la nota anterior. Se retomó la implementación existente sin reiniciarla ni rediseñar. La carpeta `old-hollywood/` estaba sin seguimiento en Git: no existe un diff contra HEAD que permita atribuir sus cambios a la sesión anterior. En esta continuación solo se actualizó esta nota; no fue necesario corregir HTML, CSS ni JS.

### Implementación encontrada y conservada

- Texto HTML: «Come back as an icon.», invitación a elegir una leyenda de Hollywood, GALA, paleta Black / White / Gold / Champagne / Deep red y «Hollywood icons — undead.».
- Retrato WebP existente de Charlie Chaplin + Marilyn Monroe, con srcset, carga lazy y proporción reservada 1086 / 1449. `object-fit: contain` conserva el cuadro completo; no hay transformación de escala ni deformación de los personajes.
- CTA nativo «Claim your invitation» hacia `#oh-reservation`. El Box Office sigue siendo informativo, con reservas aún deshabilitadas; no se implementaron formulario, envío ni confirmación.
- Reveal de una sola pasada al intersectar Dresscode después del estado undead: retrato, copy y detalles mediante opacity/translateY. Retrato de 700 ms y desplazamiento de 6 px móvil / 12 px desktop; copy y detalles de 550 ms, con entradas escalonadas de 180 ms. Las animaciones se liberan al terminar y no se repiten al volver.
- Reduced motion conserva solo un fundido leve de 160 ms, sin desplazamiento. Activarlo durante el reveal cancela las animaciones. El contenido base permanece visible sin JS y no depende del efecto para leerse.

### Móvil

Título, retrato completo y copy/CTA apilados, sin texto sobre los personajes. Captura revisada a 375 × 812. Sombrero, caras, bastón y vestido permanecen visibles. La paleta se redistribuye en líneas y el CTA mide 52 px de alto; scroll natural para recorrer el bloque.

### Laptop

Composición editorial desde 960 px: retrato a la izquierda, título y copy a la derecha. Captura revisada a 1440 × 900. Imagen íntegra, con aire entre columnas y sin superponer texto a los rostros.

### Variante específica

**No** hace falta otro crop ni asset para este Dresscode editorial. El master vertical existente conserva la pareja y sus accesorios en móvil y desktop. Esto no resuelve ni cambia la necesidad previamente documentada de variantes verticales para el salón del hero.

### Validación final

Chromium local con Puppeteer ya instalado, sin dependencias nuevas:

- Anchos 320, 360, 375, 390, 430, 639, 640, 768, 959, 960, 1024, 1280, 1440 y 1920 px; altura 812 px por debajo de 640 y 900 px desde 640. Sin overflow horizontal en ninguno, incluidos ambos lados de los breakpoints.
- En todos: imagen decodificada, `contain`, estado undead, reveal completado, CTA de 52 px y cero animaciones residuales en Dresscode. CTA probado mediante click hasta `#oh-reservation`.
- Entrada normal desde la intro: undead antes del reveal; volver arriba y regresar conserva undead y no repite la animación.
- Reduced motion desde la carga y activado durante el reveal: contenido visible, sin desplazamiento persistente ni animaciones residuales.
- Teclado: primer Tab al enlace de salto, Enter para entrar, recorrido hasta el CTA, foco visible con contorno champagne de 3 px y Enter hacia Box Office (destino a aproximadamente 16 px del borde superior).
- Sin JS a 375 px: copy completo visible y sin overflow. Prueba adicional a 320 px duplicando texto de párrafos, paleta y CTA: sin overflow. No equivale a certificar todos los modos de zoom de cada navegador.
- Cero excepciones JavaScript y cero respuestas HTTP de error durante la matriz de validación.
- No se encontró código temporal de testing en index.html, styles.css o script.js. Los scripts de comprobación de esta continuación se ejecutaron fuera del repositorio y se retiraron al finalizar; no se borraron herramientas preexistentes de otras tareas.

Sin problemas bloqueantes encontrados en 4.5. Permanecen fuera de esta validación Safari/iOS, dispositivos físicos, navegadores internos y GoHighLevel; no se certifica compatibilidad con esos entornos.

**Siguiente: listo para FASE 4.6 — THE LAST BOX OFFICE / RESERVATION EXPERIENCE.** No iniciada en esta continuación. Antes de habilitar reservas reales sigue siendo necesario confirmar el contrato de integración, campos, consentimiento y respuesta del servicio.

## Fase 4.6 — The Last Box Office / Reservation Experience

Implementada el 8 de octubre de 2026. Sustituye el estado «4.6 no iniciada» anterior. Alcance: únicamente `#oh-reservation`, su CSS y un bloque JS independiente del controlador cinematográfico. Intro, hero, mutación, Dresscode y ticket de muestra preexistente conservados. No se desarrolló 4.7 ni se conectó la demo al ticket.

### Móvil

Orden: encabezado «The last box office / Claim your invitation», subcopy «One last ticket. One last premiere.», imagen horizontal íntegra, formulario y CTA «Reserve my invitation». La superficie de madera oscura y filetes de latón continúa directamente debajo de la fotografía, sin superponer inputs sobre el personaje. Campos apilados por debajo de 640 px, texto de entrada de 16 px, inputs de 52 px, label táctil de Acompañado de 48 px y submit de 56 px. Altura libre, scroll nativo y scroll-margin en campos/CTA; sin barras fijas que compitan con el teclado.

Se reutilizan los WebP 640/1280 del asset aprobado `the-last-box-office-v1.png`, con srcset, lazy loading y proporción 1672 / 941 reservada. Una sola imagen, con contain: no se recortan marco, taquillero, luz ni mostrador. A 375 px el plano es atmosférico y el personaje pequeño, pero la interacción tiene superficie y tamaño propios.

### Laptop

Encabezado editorial y subcopy lateral. Fotografía a todo el ancho del shell, con formulario centrado y anclado visualmente al frontal del mostrador desde 960 px. Se superpone únicamente a la parte inferior de la escena; el taquillero, sus manos y la ventanilla quedan libres. Superficie sólida, esquinas rectas y bordes interiores de latón; no depende de la altura de la foto para alojar campos, acompañantes, errores o feedback. Nombres en dos columnas a partir de 640 px; el resto permanece en una columna.

### Variante específica

**No hace falta 9:16 para esta composición.** El horizontal completo funciona sobre el formulario móvil. Si en una fase futura se exige una taquilla inmersiva vertical, un recorte central 9:16 conservaría solo cerca del 31,6% del ancho y cortaría el marco. Una nueva composición tendría que conservar: dintel y lámparas superiores, ambos laterales de latón de la ventanilla, cabeza/sombrero y manos del taquillero, lámpara de escritorio, borde y frontal del mostrador; además de una zona inferior limpia para HTML de altura flexible. No se generaron ni modificaron assets.

### Formulario y validación

- Nombre requerido: al menos 2 caracteres después de normalizar espacios. Apellido requerido. Ambos hasta 80 caracteres, con al menos una letra Unicode y sin `<` / `>`. Se permiten acentos, apóstrofes, guiones y nombres compuestos; no se restringe el alfabeto a ASCII. El tope de longitud es de entrada, no una condición del evento.
- Número / WhatsApp requerido: validación estructural de 7–15 dígitos, con prefijo internacional opcional. Acepta espacios, paréntesis, puntos y guiones; sin máscara. Convierte `00` inicial a `+`, retira separadores y normaliza caracteres de ancho completo. No verifica país, existencia del número ni cuenta de WhatsApp.
- Checkbox real «Acompañado». Al activarlo muestra Guests con valor inicial 1. Guests son **acompañantes adicionales**, nunca asistentes totales: el titular queda separado. Entero entre 1 y 10; máximo explícitamente provisional de esta demo, no cupo ni política comercial confirmada. Al desactivarlo, input oculto y deshabilitado, error retirado y valor/payload 0.
- Normalización de nombres: Unicode NFC, retirada de caracteres de control, trim y compactación de espacios. Validación junto a cada campo al salir y al enviar; errores mediante textContent. La validación frontend no sustituye futura validación del servidor.
- Submit inválido: estado error, resumen enfocable con enlaces a campos, errores asociados con aria-describedby y aria-invalid, sin borrar datos. Edición posterior retira feedback obsoleto y descarta el payload anterior de memoria.

Payload en variable local `reservation`, nunca en atributos, URL, logs ni almacenamiento:

```js
{
  firstName: 'Ana María',
  lastName: 'Pérez',
  phone: '+593991234567',
  accompanied: true,
  guests: 2 // Dos adicionales: tres asistentes contando al titular.
}
```

Estados en `form.dataset.state`: `idle` → `validating` → `ready` → `submitting` → `demo-success`; validación fallida o fallo del adaptador → `error`. Editar vuelve a `idle`. `ready` y `validating` son pasos síncronos; no se añadieron esperas teatrales. Durante submitting se deshabilita el fieldset y un guard bloquea doble envío. El adaptador actual devuelve una promesa local inmediatamente; no contacta ningún servicio.

La advertencia «Vista previa · No se enviarán datos ni se realizará una reserva» permanece visible. El resultado dice «Demo lista… no se han enviado y tu reserva no está confirmada». No hay redirección, ticket, QR, identificador de reserva ni estado persistente. Inputs conservados tras demo o error; los datos y payload solo viven en memoria mientras la página permanece abierta. Sin localStorage, sessionStorage ni cookies de aplicación. Sin JS, el fieldset permanece deshabilitado con explicación explícita para impedir un POST nativo accidental.

### Movimiento y accesibilidad

IntersectionObserver de una sola pasada sobre la imagen; se desconecta al activar el reveal. Luz cálida mínima durante 850 ms y entrada del formulario de 600 ms tras 150 ms, desde opacidad .85 y desplazamiento 4 px: nunca se oculta ni bloquea la interacción. Al enfocar cualquier campo se cancela la animación del formulario y de la luz. Guests aparece en 180 ms. Sin movimiento ambiental recurrente, flashes, vídeo o listeners de scroll adicionales.

Reduced motion: formulario y selector inmediatos, sin animación de luz ni desplazamiento; también funciona al cambiar la preferencia en caliente. Labels reales, legend «Datos del titular», autocomplete given-name/family-name/tel, inputmode tel/numeric, foco champagne, errores enlazados y feedback general role=status / aria-live=polite / aria-atomic. Copy del formulario en español y titulares/CTA en inglés, con lang explícito.

### Validación realizada

Chromium local mediante Puppeteer existente, sin instalaciones:

- 320, 360, 375, 390, 430, 639, 640, 768, 959, 960, 1024, 1280, 1440 y 1920 px; sin overflow horizontal, tanto inicial como con acompañantes y errores. Capturas revisadas a 375 × 812 y 1440 × 900.
- 812 × 375 horizontal y viewport reducido a 375 × 350: sin overflow; Tab puede llevar al submit y dejarlo visible mediante scroll. Esta simulación no certifica el teclado virtual de un teléfono físico.
- Entradas de 16 px y 52 px de alto, submit de 56 px; texto del formulario ampliado a 32 px a 320 px de ancho sin overflow. No equivale a verificar todos los modos de zoom de cada navegador.
- Teclado: orden nombre → apellido → teléfono → acompañado → Guests cuando procede → submit; Space/click nativo de checkbox, submit por Enter, resumen enfocado tras error y enlaces que enfocan el campo correspondiente. Labels y referencias aria-describedby resuelven correctamente.
- Nombres vacíos/cortos, teléfonos inválidos y válidos locales/internacionales, separación/normalización del payload, Guests vacío/negativo/cero/fraccionario/exponencial/superior a 10, límite 10 válido, y reinicio a 0 al desactivar.
- Adaptador observado mediante instrumentación temporal solo en la respuesta del navegador de pruebas: payload correcto; adaptador pendiente invocado una sola vez ante doble submit; error del adaptador conserva datos y vuelve a habilitar el formulario. Código de prueba no incorporado a la página.
- Reduced motion inicial y dinámico, iluminación/reveal cancelados al enfocar, contenido legible sin esperar animación y fallback sin JS.
- Cero excepciones JS y errores HTTP en la matriz. Ningún POST ni petición externa por el formulario; storage y cookies vacíos. Datos de prueba ficticios.
- Contrastes calculados: texto secundario sobre superficie más clara 9,36:1; texto en inputs 16,62:1; borde de input sobre su fondo 4,68:1; error 10,32:1; CTA 11,70:1.
- Recorrido intro → undead → Dresscode → CTA a Box Office comprobado. Comparación contra copia previa: HTML anterior a reserva y desde confirmation en adelante intacto; JS 4.2–4.5 intacto.

No certifica lector de pantalla real, Safari/iOS, notch o teclado físico/virtual de dispositivos, navegadores internos ni GoHighLevel. No se detectaron problemas bloqueantes en las pruebas realizadas.

### Punto de conexión pendiente para GoHighLevel

En el segundo bloque de `script.js`, `submitReservation(payload)` es el adaptador aislado a sustituir. Confirmar antes: método de inserción GHL (iframe/bloque), hosting/base de assets y aislamiento CSS; endpoint y contrato de campos; política definitiva de acompañantes; consentimiento; validación y normalización de servidor; idempotencia/doble envío, fallos/red y respuesta verificable. No incluir secretos en JS público.

El caller acepta únicamente `{ mode: 'demo' }` hoy. Al conectar un servicio real habrá que mapear explícitamente su respuesta y los errores en ese mismo flujo; **no** reutilizar demo-success como prueba de reserva confirmada. No hay integración GHL implementada ni datos enviados externamente.

### Siguiente — Fase 4.7

Quedan preparados el payload normalizado, errores, estados y frontera del adaptador para THE GOLDEN TICKET / CONFIRMATION EXPERIENCE. La futura confirmación real debe depender de una respuesta válida del contrato; cualquier preview deberá conservar identificación de muestra. No se inició 4.7: el ticket de muestra preexistente no recibe datos del formulario y sigue sin QR ni validez como entrada.

Archivos modificados en 4.6: `index.html`, `styles.css`, `script.js` y esta nota. Sin assets nuevos, librerías, backend, cambios en Fashion Week, commits ni push. Scripts de pruebas temporales fuera del repositorio, retirados al terminar.

## Fase 4.7 — The Golden Ticket / Confirmation Experience

Implementada el 8 de octubre de 2026. Sustituye el estado «4.7 no iniciada» anterior. El ticket de muestra se convirtió en una preview personalizada después de un submit válido de la demo. No hay integración GoHighLevel, confirmación de servidor, QR real, descarga, compartir, vídeo ni desarrollo de 4.8. HTML del Box Office y secciones anteriores intactos; el controlador cinematográfico 4.2–4.5 no cambió.

### Móvil

Un único ticket HTML reorganizado en columna: evento, nombre destacado, Guests y Party size, estado, código y espacio QR al final. Talón inferior con separación discontinua y botón Edit reservation de ancho completo. Marco CSS adaptable y ornamento superior del PNG aprobado; no se reduce una imagen horizontal con datos incrustados. Nombres largos y código tienen ajuste de línea; el CTA admite texto ampliado sin empujar la flecha fuera del componente.

### Laptop

Desde 960 px, cuerpo principal a la izquierda y talón de estado/código/placeholder a la derecha. El marco conserva altura libre, incluso con nombres largos. La sección de cierre aparece inmediatamente después de Box Office; una ranura oscura con bordes de latón y salida vertical del papel conectan visualmente el mostrador con la invitación. No se añadió otra fotografía de taquilla ni se cubrió el formulario.

### Asset y variante específica

Se reutiliza `assets/img/the-golden-ticket-v1.png` como franja ornamental superior mediante un único pseudo-elemento CSS. Es un recorte decorativo deliberado, no el marco completo escalado/deformado. El cuerpo, borde y perforación responsive se construyen en HTML/CSS. **No hace falta un asset móvil adicional para esta composición.** Sin generaciones, conversiones ni nuevos archivos de imagen.

El PNG original pesa 2.578.636 bytes (aproximadamente 2,46 MiB). Prueba de red: cero peticiones de ese PNG antes del submit y una después de mostrar la preview; no se duplicó el archivo ni se carga inicialmente. No es una exportación web optimizada: una futura optimización del medio podrá evaluarse por separado sin cambiar el componente.

### Datos y código demo

`renderTicket(payload, result, moveFocus)` recibe el payload normalizado del formulario y el resultado del adaptador. Inserta datos exclusivamente mediante textContent:

- Nombre completo: firstName + espacio + lastName.
- Guests: payload.guests si accompanied es true; 0 en caso contrario.
- Party size: 1 + Guests, incluyendo al titular.
- Código y estado visual de la demo. El teléfono nunca se copia al ticket.

`submitReservation(payload)` devuelve en esta fase:

```js
{
  mode: 'demo',
  reservationId: 'DVOID-DEMO-0001',
  status: 'demo-preview',
  qrValue: null
}
```

El sufijo es un contador local codificado en base 36 y rellenado a cuatro caracteres. Cada nueva preview en la misma página obtiene un código distinto (0001, 0002…); recargar reinicia el contador. No contiene datos personales, no es aleatorio ni persistente y no sirve como identificador real. La UI lo etiqueta Demo code, con DEMO PREVIEW / NOT YET CONFIRMED y aviso de falta de validez como entrada.

El área QR es solo un marco con una estrella ornamental y «DEMO / NO QR», descrito como espacio sin código para escanear. No hay patrón escaneable ni generación de QR.

### Estados, edición y secuencia

Flujo conservado: idle → validating → ready → submitting → demo-success, o error. Validating y ready son síncronos. Solo el adaptador local añade 180 ms en modo de movimiento normal para hacer perceptible submitting; reduced motion omite esa espera. Se mantiene el fieldset deshabilitado durante submitting y el guard de doble envío.

Al obtener un resultado mode=demo y status=demo-preview se completan los datos y se muestra la sección. Print effect: 800 ms, translateY de −24 px a 0, opacity .6 a 1 y clip-path inset sencillo. Datos personales y código reciben un reveal leve de opacity durante 240 ms, tras 920 ms: impresión, pausa de 120 ms y asentamiento. La información está en HTML desde el primer momento; el estado y aviso demo no dependen de terminar el efecto. La clase de impresión se retira al acabar. Sin efectos recurrentes, sonido, canvas, WebGL, Hyperframes ni librerías.

Edit reservation oculta la preview, devuelve estado idle y enfoca Nombre, conservando valores del formulario. Una edición desde los campos también invalida/oculta el ticket anterior. Reenviar valida, actualiza los datos y emite otro código. Desactivar Acompañado sigue restableciendo Guests a 0; la siguiente preview muestra Party size 1. Un submit inválido o fallo del adaptador mantiene el ticket oculto y conserva los campos.

### Accesibilidad y privacidad

Ticket semántico con encabezados, dl para cantidades y contenido HTML único. El resumen enfocable `#oh-ticket-summary` está descrito por nombre, estado y aviso demo. Tras un submit iniciado desde el formulario, recibe foco y scroll inmediato. Si durante la espera el visitante lleva el foco a otra parte, no se lo roba. No hay un segundo cambio de foco al terminar la animación.

La región role=status / aria-live=polite existente en el formulario anuncia «Ticket demo preparado. No se han enviado datos y tu reserva no está confirmada». Edit reservation es un botón real, con foco visible y orden natural de Tab.

Reduced motion muestra el ticket directamente, sin impresión ni reveal escalonado; funcionalidad y gestión de foco idénticas al submit. Cambiar la preferencia durante la secuencia elimina la clase de impresión; volver a habilitar movimiento no reinicia el ticket anterior. No se añade una espera o movimiento de foco posterior por esa preferencia.

Datos solo en memoria y en los campos/textos de la página abierta. Sin localStorage, sessionStorage, cookies de aplicación, teléfono en la invitación ni datos personales en URL o logs. Al recargar, formulario vacío y ticket oculto. Sin JS, formulario deshabilitado con su aviso previo y sin ticket personalizado.

### Validación realizada

Chromium local y Puppeteer existente, sin instalaciones:

- Anchos 320, 360, 375, 390, 430, 639, 640, 768, 959, 960, 1024, 1280, 1440 y 1920 px: sin overflow durante ni después de la impresión, un único ticket y CTA de al menos 52 px.
- Capturas revisadas a 375 × 812 y 1440 × 900. Orientación horizontal 812 × 375 comprobada.
- Nombres de 80 + 80 caracteres a 320 px y textos del ticket/CTA ampliados a 32 px: sin overflow. Se corrigió el ajuste del texto y flecha del botón de edición. No equivale a certificar todos los modos de zoom del navegador.
- Nombre normalizado «Nicolás Cruz», Guests 2 y Party size 3; edición con acompañantes desactivados: Guests 0 y Party size 1. Teléfono excluido del contenido visible del ticket.
- Código distinto en cada reenvío de la misma sesión; datos preservados al editar; ticket oculto tras edición, validación fallida, error del adaptador y recarga.
- Teclado: Enter envía, foco al resumen, Tab al botón Edit reservation, Enter devuelve al campo Nombre. Foco preservado si el visitante se mueve fuera del formulario durante submitting.
- Reduced motion desde inicio, activado durante impresión y vuelto a desactivar: sin animaciones ni replay del ticket anterior; sin foco diferido.
- Árbol de accesibilidad Chromium: nombre, región de estado y botón de edición presentes. No equivale a una prueba con lector de pantalla real.
- Instrumentación temporal de la respuesta JS solo en el navegador de pruebas: estados validating/ready/submitting observados, guard de doble submit con una sola llamada al adaptador, error conserva datos y un resultado mode=real/status=confirmed es rechazado por el flujo actual. No se aceptó una confirmación de servidor inventada.
- Cero excepciones JS y errores HTTP en la matriz; ningún POST, petición externa, storage ni cookie. PNG solicitado solo tras submit válido, una vez.
- Comparación contra copia previa: HTML anterior a confirmation y controlador cinematográfico intactos. Sintaxis JS comprobada.

Sin problemas bloqueantes encontrados en estos chequeos. Pendientes Safari/iOS, dispositivos físicos, teclado virtual, lectores de pantalla reales, navegadores internos y montaje GoHighLevel.

### Pendiente backend y punto de integración

Sustituir `submitReservation(payload)` después de confirmar contrato, consentimiento, campos, validación de servidor e idempotencia. El resultado futuro deberá aportar `reservationId`, `status` y `qrValue` auténticos. Hoy el caller rechaza cualquier modo/estado distinto de demo/demo-preview.

El punto de presentación es `renderTicket(payload, result, moveFocus)`: código en `#oh-ticket-code`, estado en `#oh-ticket-state` y contenedor reservado `[data-ticket-qr]`. En la fase de integración habrá que mapear explícitamente estados reales y mensajes accesibles, actualizar avisos y validar/renderizar el QR autorizado. Esto podrá hacerse sobre el mismo componente, sin duplicar datos ni rediseñar el layout. No basta cambiar una etiqueta demo para afirmar una reserva confirmada.

### Siguiente — Fase 4.8

Quedan listos Box Office, payload, preview personalizada, edición y secuencia finita para revisar MOTION / POLISH / CINEMATIC COHESION. Fase 4.8 no iniciada.

Archivos modificados: `index.html`, `styles.css`, `script.js` y esta nota. Sin nuevos assets/dependencias, cambios en Fashion Week, commits ni push. Scripts temporales de comprobación fuera del repositorio, retirados al finalizar.

## Fase 4.8 — Motion / polish / cinematic cohesion

Implementada el 8 de octubre de 2026 sobre las fases 4.1–4.7 existentes. Solo `styles.css`, `script.js` y esta nota. HTML, assets, validación, payload, contrato demo y contenido funcional preservados. Sin dependencias, backend, QR, audio, descargas ni nuevas generaciones. Esta entrada actualiza el estado histórico «Fase 4.8 no iniciada» de la sección anterior.

### Movimiento y continuidad

- Cuatro curvas compartidas por CSS y Web Animations: cinematic `(.4,0,.2,1)`, enter `(.16,1,.3,1)`, exit `(.4,0,1,1)` y mechanical `(.3,.1,.3,1)`. Linear queda únicamente en las líneas de tiempo que sincronizan offsets de exposición y flashes de mutation.
- Micro 180 ms; UI 320 ms; editorial 500–900 ms. Entrada intro/hero 700 ms móvil y 900 ms desktop, con 80 ms de continuidad de cubierta. Mutation 2.8 s móvil / 4 s desktop. Las exposiciones ambientales de cámara son la excepción intencional: avance único de 0.8% en 20 s móvil / 1.8% en 28 s desktop; haze único de 24 s solo desktop. No son esperas de interacción.
- Intro más breve, exposición de entrada suave y texto del hero revelado una sola vez. El final real de la transición retira la cubierta, conservando su espacio en el grid; se elimina el timeout fijo. El foco no reinicia el reveal del hero una vez terminada la entrada.
- Hero: parallax solo desktop, amplitudes máximas de 4 / −6 / −12 px; eliminado el zoom adicional ligado al scroll y el desvanecimiento del texto. Móvil sin parallax ni haze animado. Flashes ambientales finitos: uno móvil / dos desktop por carga, pico 0.035 / 0.055, separados originalmente 12–20 s. Mutation conserva su lógica, con una exposición de flash móvil / dos desktop, de menor intensidad.
- Pausa visual antes de Dresscode mediante espacio y un burgundy menos luminoso. Retrato y texto se revelan como dos planos, sin animación anidada en sus detalles: 600/500 ms móvil y 800/600 ms desktop, texto retrasado 140/220 ms. Retrato sin desplazamiento móvil, solo 4 px desktop. El observador sigue al retrato real; foco, pausa, pestaña oculta o reduced motion estabilizan el contenido.
- Dresscode cae hacia #100a08, el mismo tono con el que comienza Box Office; la taquilla vuelve a negro y el ticket entra sobre un resplandor cálido más contenido. Marcos, tipografía, sujetos y composición conservados.
- Box Office revela luz una sola vez. Un error reproducido antes del cambio reiniciaba luz/formulario al perder foco: ahora la clase se consume al enfocar o terminar la luz. Formulario y selector de acompañantes usan opacidad, sin desplazamiento; escribir no reactiva ambiente.
- Ticket: 680 ms móvil / 860 ms desktop, clip progresivo, pequeño avance vertical y pausa mecánica entre 40–46%; sombra óptica temporal bajo la ranura. Datos aparecen 100 ms después durante 180 ms. La secuencia termina sin movimiento residual. No se modifica el flujo demo ni la edición.

### Rendimiento y accesibilidad

Scroll nativo, sin suavizado artificial. Un rAF pendiente como máximo para el parallax y solo cuando desktop está visible y activo; sin bucle rAF permanente. Los listeners scroll/resize se retiran fuera del hero, al pausar o con reduced motion; no se duplican al reanudar. Observadores de Dresscode y taquilla se desconectan tras su reveal. Sin will-change permanentes, filtros, canvas ni librerías. Las imágenes y sus dimensiones/srcset permanecen como estaban.

Reduced motion elimina push-in, parallax, haze animado, flashes, impresión y reveals escalonados. Intro y mutation resuelven con opacidad de 180 ms; formulario y ticket disponibles sin espera animada. Cambiar la preferencia durante la impresión estabiliza el ticket y no lo vuelve a imprimir al desactivarla. Botón de pausa actualiza también su nombre accesible. Se conservan labels, aria-live, estados demo, foco visible y navegación natural. El texto del hero conserva ahora opacidad completa al hacer scroll. Contraste revisado visualmente en capturas; no se afirma una certificación automatizada de contraste sobre cada píxel de las fotografías.

### Validación de esta fase

Chromium local con Puppeteer ya instalado; scripts de prueba temporales fuera del repositorio, retirados al terminar:

- 320, 360, 390, 430, 768, 1024, 1280, 1440 y 1920 px: sin overflow horizontal en el documento ni elementos de main fuera del ancho, durante y después de impresión. Comprobaciones adicionales a 375 px.
- 812 × 375 landscape, 375 × 350 como simulación de viewport reducido por teclado, y raíz/texto de botones a 32 px: sin overflow. Nombres de 80 + 80 caracteres y CTA de edición largo verificados. Esto no equivale a probar teclado virtual físico ni todos los modos de zoom del navegador.
- Capturas revisadas de hero, Dresscode, Box Office y ticket; detalle de impresión intermedia revisado. Pareja íntegra con contain; taquilla mantiene su proporción, como atmósfera sobre el formulario móvil y escena amplia en desktop. Ticket se reorganiza por HTML/CSS y no necesita otro asset móvil.
- Intro por botón y por fragmento: cubierta retirada; altura del stage conservada al entrar. Mutation llega a undead; Dresscode termina visible y sin animaciones pendientes. Sin excepciones JS en la matriz.
- Teclado: Tab entre campos, Space en Acompañado, flecha para cantidad, Enter para submit, foco al resumen y Tab/Enter para volver a editar. Datos preservados; Guests 2 / Party size 3 y después 0 / 1 al desactivar Acompañado.
- Reduced motion desde carga y durante impresión: ticket sin animaciones, datos accesibles y sin replay al restaurar la preferencia.
- CDP confirmó cero listeners scroll/resize en móvil, uno de cada tipo en desktop activo y cero al pausar o salir de escena. Reanudar mantiene uno de cada tipo. Instrumentación temporal del reloj de flashes confirmó los límites de uno/dos y ausencia de nuevos flashes al reanudar tras agotarlos; el código entregado conserva intervalos reales.
- No se reinician animaciones de taquilla tras enfocar/desenfocar. Ticket estable tras secuencia. Comparación con copia previa confirma index.html intacto; sintaxis JS válida.
- Sin peticiones externas ni POST; localStorage/sessionStorage vacíos y sin cookies de aplicación en la prueba final. No cambia la privacidad ni el adaptador demo.

### Riesgos y siguiente fase

Sin problemas bloqueantes encontrados en Chromium. Pendientes dispositivos físicos, Safari/iOS, lectores de pantalla reales, teclado virtual y montaje GoHighLevel. El PNG ornamental del ticket sigue pesando aproximadamente 2.46 MiB; no se ha generado un derivado nuevo porque esta fase no autoriza nuevos assets. Conserva carga al mostrar el ticket.

El hero horizontal conserva la limitación de crop móvil documentada: pierde personajes laterales. Una futura variante 9:16 debería mantener puertas, alfombra, eje de luz y presencia legible de invitados/fotógrafos en safe zones, con clean/undead alineados. Dresscode, taquilla y ticket actuales no requieren nueva variante para su layout validado. Las diferencias entre masters clean/undead siguen siendo cambio de escena, no morphing geométrico.

Preparado para Fase 4.9 — QA FINAL / GOHIGHLEVEL READINESS: sistema de movimiento consistente, estados demo intactos y puntos de integración documentados. Fase 4.9 no iniciada. Sin commits, push ni cambios en Fashion Week.

### Cierre de continuación — 10 de octubre de 2026

FASE 4.8 cerrada sin reiniciar ni modificar la implementación. Se leyeron las instrucciones y las notas de dirección, arquitectura y base responsive; se revisaron completos `index.html`, `styles.css` y `script.js`. Los ajustes de movimiento descritos en esta fase están presentes en el código actual. `old-hollywood/` continúa sin seguimiento en Git: el diff contra HEAD no permite reconstruir un antes/después por fase. No se encontraron copias anteriores de la fase en /tmp; la matriz extensa anterior se conserva como evidencia documentada, sin afirmar una comparación byte a byte con sus archivos de prueba.

Chequeo breve de cierre con Chromium y Puppeteer existentes, sin instalaciones: cuatro recorridos a 375 × 812 y 1440 × 900, con movimiento normal y reduced motion desde carga. Pasaron intro por Enter, retirada de cubierta y altura estable, hero, mutation hasta undead, Dresscode sin animaciones residuales, Box Office, ticket, edición y reenvío. Sin overflow horizontal en los puntos revisados, excepciones JS, errores de consola ni respuestas HTTP de error. Guests 2 / Party size 3 y después 0 / 1; código demo nuevo al reenviar. Enter, Space, flecha de cantidad, Tab al botón de edición y retorno del foco a Nombre comprobados.

CDP confirmó cero listeners scroll/resize en móvil y reduced motion, uno de cada tipo en desktop activo, cero al pausar y al salir del hero, y uno de cada tipo al reanudar. Activar reduced motion tras el segundo submit dejó el ticket sin animaciones. Sin POST ni peticiones externas; storage vacío y sin cookies de aplicación. Sintaxis JS válida. No se repitieron matrices extensas, pruebas instrumentadas de flashes ni revisión de capturas; sus resultados anteriores permanecen documentados y la lógica de límites uno/dos se verificó por lectura.

No se encontró instrumentación temporal de testing en los tres archivos de la página. Los TODO GHL son puntos de integración deliberados. El script `/tmp/dvoid-phase48-close.cjs` y su perfil `/tmp/dvoid-phase48-close-profile` se retiraron después del chequeo; no quedan temporales de esta continuación. No se identificaron temporales anteriores de Hollywood en /tmp. Los temporales generales de Chromium y de otras aplicaciones no se atribuyeron a esta fase y se conservaron. No se borró ningún archivo fuera de /tmp.

Único archivo modificado en esta continuación: esta nota. HTML, CSS y JS conservados. Sin regresiones detectadas en el chequeo mínimo; siguen pendientes Safari/iOS, dispositivos físicos, teclado virtual real, lectores de pantalla, navegadores internos y montaje GoHighLevel, además del crop móvil del hero y el peso ornamental del ticket ya descritos. Listos para FASE 4.9 — QA FINAL / GOHIGHLEVEL READINESS; no iniciada.

## Fase 4.9 — QA final / GoHighLevel readiness

Cerrada el 10 de octubre de 2026. QA y preparación de montaje de la demo existente; sin rediseño, features nuevas, backend, QR real, vídeo, audio, analytics ni integración GHL. Guía completa: [gohighlevel-readiness.md](gohighlevel-readiness.md), con inventario/pesos, seguridad Git, aislamiento, rutas, opciones de montaje, frontera del adaptador y cambios de textos condicionados al backend.

### Correcciones comprobadas

- En una carga inicial a 320×568 se observó un layout shift de 1 al pasar el hero de dos filas a una después del primer pintado. Se reserva la misma celda del grid desde CSS y el espacio del botón de entrada desde HTML. Head contiene un fallback noscript que restaura dos filas y oculta el botón, conservando el enlace nativo. Comprobación final: CLS local de carga/entrada 0 en la matriz, también retrasando script.js 900 ms. No se cambió la dirección visual ni el motion de 4.8.
- Atributos del logo ajustados a sus dimensiones reales 700×262; el archivo compartido no cambió.
- Wrapper `#dvoid-hollywood`, búsquedas JS acotadas y guards de inicialización por controlador. Cargar el script otra vez sobre el mismo DOM no duplica handlers/listeners ni reinicia el contador demo. CSS conserva scope .oh-page; no se convirtió automáticamente toda la hoja.
- Retiradas doce clases CSS heredadas sin uso y sus reglas responsive; sin refactor del flujo o validación.
- Añadido overflow:hidden como fallback previo a overflow:clip.
- Ornamento convertido a un derivado WebP independiente 1860×845, calidad 90, 305612 bytes frente a 2578636 bytes del PNG: ahorro 88,15%. Transparencia/dimensiones preservadas y apariencia comparada a ancho de entrega. PNG intacto como fallback de compatibilidad de image-set; no fallback automático de red. Chromium solicita un WebP y cero PNG ornamentales tras submit; cero ornamentos antes. Hashes de seis masters y logo intactos.

### Matriz final — Chromium local

| Viewport | Intro/hero/mutation/Dresscode/formulario/ticket | Overflow horizontal | CLS local de carga/entrada |
| --- | --- | --- | ---: |
| 320×568 | PASS | No | 0 |
| 360×800 | PASS | No | 0 |
| 375×812 | PASS | No | 0 |
| 390×844 | PASS | No | 0 |
| 430×932 | PASS | No | 0 |
| 768×1024 | PASS | No | 0 |
| 1024×768 | PASS | No | 0 |
| 1280×800 | PASS | No | 0 |
| 1440×900 | PASS | No | 0 |
| 1920×1080 | PASS | No | 0 |
| 812×375 landscape | PASS | No | 0 |

En cada tamaño: entrada por teclado, altura del stage estable, reveal final, nombres de 80+80 caracteres, selector Guests abierto, Guests=10 / Party size=11, impresión y asentamiento sin overflow de documento/textos/controles ni excepciones. Controles e inputs visibles ≥44 px de alto; inputs 52 px, fuente 16 px. Capturas de hero clean/undead, Dresscode, taquilla y ticket revisadas a 375 y 1440 px. Retrato y taquilla íntegros, superficies de lectura separadas de personajes; ticket largo continúa por scroll, no debe caber completo en una pantalla.

Adicionales: raíz a 32 px y botones a 32 px en 320×568, 375×350 y 1440×900; sin overflow. Es ampliación de texto, no certificación de todos los zooms de navegador. Emulación táctil 375×812 y resize a 375×350 con foco en teléfono, sin overflow: no equivale al teclado virtual de iOS. Móvil y laptop conservan calidad de lectura; crop móvil del hero aceptable para la demo, con limitación narrativa detallada en la guía. Variante 9:16 recomendada a futuro; no generada.

### Interacciones, formulario y fallbacks

- Entrada doble y cuatro toggles de pausa, scroll rápido fuera del hero, estado undead final y sin animaciones residuales en Dresscode. Reglas y límites de flashes de 4.8 conservados; no se aceleró el reloj ni se repitió esa instrumentación.
- Reduced motion desde carga y activado durante mutation/ticket; final estable, sin replay al restaurar la preferencia. Sin cambios de foco diferidos.
- Doble requestSubmit rápido con una sola emisión; doble submit ante adaptador demorado, una llamada. Error del adaptador y respuesta inventada real/confirmed rechazados, campos conservados y fieldset reactivado. Instrumentación solo en respuestas JS del navegador de pruebas, no en el proyecto.
- Nombre mínimo 2, apellido obligatorio, teléfono 7–15 dígitos y Guests entero 1–10 sin cambiar reglas. Probados nombre vacío/HTML inválido, teléfono corto/largo/letras, Guests 0/11/1.5/1e1 rechazados, extremos 1/10 y 0 sin acompañado. Espacios compactados, Unicode, prefijo +/00, dígitos de ancho completo, guiones, paréntesis y apóstrofe tipográfico normalizados. Entrada en bloque mediante API de teclado y simulación de valores/input tipo autofill; no se certifica portapapeles ni autofill real de Safari.
- Editar oculta ticket, conserva campos, devuelve foco a Nombre; reenviar cambia código. Toggle acompañado repetido, Guests modificado y reset a 0 sin acompañado comprobados. Enter, Space, flecha de cantidad y Tab entre resumen/edición comprobados.
- Fallos forzados independientes de hero, undead, retrato, taquilla y ornamento: contenido/CTA/formulario/ticket utilizables y cero excepciones JS. Errores de red/consola de esas solicitudes bloqueadas son esperados; no se contabilizan como una carga normal sin errores. Undead fallido conserva clean.
- JS desactivado: enlace nativo hacia hero, contenido en flujo, formulario deshabilitado y ticket oculto. La nueva disposición/fallback noscript pasó esta prueba.

### Accesibilidad, privacidad y estructura

Sintaxis JS y anidación/balance de tags HTML revisados. Auditoría DOM automatizada sin IDs duplicados, anchors inexistentes, referencias aria-labelledby/describedby/controls sin destino, inputs sin label ni imágenes sin alt/dimensiones. Roles/nombres del árbol AX de Chromium revisados. No se usó un validador completo de conformidad HTML, axe/Lighthouse ni un lector de pantalla real; no se instalaron herramientas. Foco visible champagne, encabezados y legend semánticos, live region y botones/enlaces nativos conservados.

Contrastes calculados sobre superficies sólidas: cuerpo 17,14:1; texto secundario sobre el extremo más claro del formulario 9,36:1; inputs 16,62:1; texto secundario del ticket 6,81:1; principal del ticket 12,65:1; CTA 11,70:1. No certifican contraste de todos los píxeles/fotografías o estados de navegador. Capturas mantienen textos lejos de las caras y sobre overlays/superficies legibles.

Ninguna petición externa, POST, datos personales en URL, storage o cookie de aplicación en recorridos normales; teléfono ausente del ticket. Sin analytics, debugging, logs ni instrumentación de testing incorporada. Los TODO GHL siguen siendo puntos pendientes reales. Los avisos DEMO PREVIEW / NOT YET CONFIRMED y falta de validez permanecen visibles.

### Performance y límites de las mediciones

HTML 12351 bytes, CSS 34132, JS 21087. Compresión gzip estimada localmente, no activada/configurada en hosting: aproximadamente 3,7 / 7,3 / 6,1 KB. CSS bloqueante deliberado; JS defer; hero eager/async/high sin preload redundante. Lazy puede anticipar imágenes cercanas.

A 375×812 antes de entrar, carga local fría observada: 594166 bytes de cuerpos sin compresión HTTP (HTML/CSS/JS/logo/hero/undead/retrato lazy anticipados). Supera la meta conceptual de <500 KB iniciales; no se afirma que se haya cumplido ese presupuesto. El coste inmediato del documento/CSS/JS/logo/clean es menor; la anticipación de medios explica la diferencia. No justifica rehacer el cargador en esta fase. No hay red móvil real, INP de campo ni score Lighthouse; LCP de la intro en localhost no representa cuándo un visitante termina la narrativa. Cache/compression/CSP/latencia del hosting GHL se validarán en el montaje.

Listeners de 4.8 conservados; prueba CDP de nueva carga de JS sin duplicación en desktop. Observadores y rAF/timers siguen acotados. Prueba de aislamiento con reglas genéricas p/h2/input de un anfitrión simulado: superficie/inputs propios y contenido externo conservados. No garantiza aislamiento frente a reglas ID/!important del GHL real ni su ciclo de hidratación.

### Estado, riesgos y entrega

**A. Lista para montaje en GoHighLevel**, como demo identificada. Elegir iframe o bloque, hosting y adaptar URLs/orden de ejecución antes de probar una página de ensayo. No se inició integración real. Sin bloqueantes funcionales locales encontrados tras correcciones. Backend y QR ausentes por alcance; no se puede ofrecer una reserva auténtica con esta demo.

Pendientes reales: Safari/iOS, dispositivos físicos, teclado virtual, autofill/clipboard real, lectores de pantalla y navegadores internos; montaje GHL, CSP y estilos anfitriones; crop hero 9:16 y eventual resolución Retina. Fallback overflow agregado; sin hacks, polyfills o nuevas librerías. Base técnica svh/inert de Safari moderno revisada, no certificada físicamente.

Archivos modificados en 4.9: index.html, styles.css, script.js, esta nota; añadidos gohighlevel-readiness.md y assets/img/web/the-golden-ticket-v1.webp. Masters, logo, referencias, tooling raíz y otras páginas intactos. Scripts, perfiles, capturas y copias temporales de esta fase se ejecutaron en /tmp/dvoid-qa49 y se retiraron al cerrar; resultados conservados en estas notas. No se borró ningún archivo fuera de /tmp. Sin git add, commits ni push.


## 2026-10-10 — dirección scroll-based, iteración 1

Alcance implementado: Intro, Hero, Red Carpet y Hollywood → Afterlife en una sola composición fullscreen sticky. Se retiran la entrada temporizada, reproducción/pausa y copy público de graduación. No se convierten Dresscode, Box Office ni Golden Ticket. La lógica JS del formulario/ticket se comparó literalmente con la copia previa: idéntica.

- Recorrido 270svh móvil y 360svh desde 960px. Cámara avanza hasta 2.5% / 6.5%; indicador desaparece en el primer 10%; título sale entre 20–43%.
- Mutation: clean hasta 35%; exposición undead hasta 72% entre 35–46%; regreso parcial a 14% entre 50–58%; undead completo entre 65–80%. Revelación tipográfica entre 72–87%, oscurecimiento de salida desde 91%. Smoothstep local, sin duración temporal ni scroll-jacking; volver atrás recorre los mismos estados.
- Un pulso luminoso móvil / dos desktop por recorrido, discretos y ligados a posición. Reduced motion: crossfade monotónico 45–80%, cámara inmóvil, sin flashes. Sin JS: llegada en flujo; texto ampliado que excede viewport: fallback estático sin sticky ni espacio artificial.
- Un scheduler rAF por eventos, nunca un loop continuo. Scroll/resize pasivos solo con escena visible y documento activo; sin timers de intro/hero ni will-change permanente. Si undead falla se mantiene clean.
- Chromium: 320×568, 375×812, 390×844, 768×1024, 1024×768, 1440×900 y 812×375; seis posiciones por tamaño, sticky estable, sin overflow horizontal ni excepciones JS. Estado estable al detener scroll y reproducible al volver atrás. Reduced motion inicial/runtime, salto de teclado al Dresscode y fallback sin JS comprobados. Capturas revisadas móvil/desktop.
- Limitación visual: fullscreen móvil conserva alfombra/puerta/arañas, pero recorta la mayoría de invitados y fotógrafos laterales; el relato undead es menos evidente. Futuro master vertical debe retener invitados clean/undead dentro del corredor central, con geometría idéntica y zonas libres para logo/título. No se generaron assets.
- No probado en Safari/iOS físicos, navegadores internos ni montaje GHL. No se afirma compatibilidad real. El siguiente paso, tras aprobación visual, es integrar Charlie/Marilyn + Dresscode al recorrido; después Box Office y desenlace ticket.

Comprobaciones finales: texto al 200% en 320×568 activa stage relativo (807px de contenido) sin overflow; submit con teléfono formateado y 10 acompañantes, edición y reenvío producen DVOID-DEMO-0002 sin teléfono en ticket. Bloqueo de undead con caché desactivada mantiene exposición 0 y cero excepciones JS. Sin IDs duplicados ni anchors inexistentes; sintaxis JS válida; un único call site requestAnimationFrame. No se añadieron tests/debugging al proyecto; scripts y capturas de revisión están en /tmp/dvoid-scroll1. Sin commits ni push.
