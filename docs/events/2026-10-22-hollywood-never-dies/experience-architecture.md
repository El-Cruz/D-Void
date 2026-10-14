# Hollywood Never Dies — arquitectura conceptual y técnica

## Dirección vigente — primera iteración scroll-based (2026-10-10)

La nueva instrucción del usuario sustituye las propuestas históricas inferiores para Intro, Hero, Red Carpet y Mutation. Ahora comparten un fondo fullscreen y un stage sticky de 100svh dentro de un recorrido de 270svh móvil / 360svh desktop. Scroll nativo, sin controles de reproducción, overlay de entrada, timeline automática ni referencias públicas a graduación. Identidad: D-VOID — HOLLYWOOD NEVER DIES.

El progreso controla cámara, título, exposición clean/undead, luz y haze mediante un único scheduler rAF por eventos. Reduced motion usa solo opacidad, sin desplazamientos ni flashes. Sin JS, o si el texto ampliado hace que el stage exceda la pantalla, se conserva la llegada en flujo normal. El master horizontal fullscreen pierde invitados laterales en móvil; no se generó otro asset.

Dresscode, Box Office y Golden Ticket conservan su composición y lógica. Su conversión se abordará únicamente después de validar estas primeras escenas. Las referencias inferiores a botones de entrada/reproducción, vídeos, graduación o prohibición de sticky son antecedentes, no instrucciones vigentes para esta iteración.

## Documento anterior (histórico)

Estado: propuesta de arquitectura; sin implementación, generación ni render. Alcance exclusivo: variante `old-hollywood/`. La página activa de Fashion Week y los recursos compartidos quedan fuera de esta propuesta.

Directriz responsive vigente: leer [responsive-direction.md](responsive-direction.md). Teléfono y laptop deben tener calidad premium equivalente. Cada propuesta/entrega indicará comportamiento móvil, laptop y necesidad de variante específica. Las decisiones sobre recortes y ticket de ese documento precisan la arquitectura de esta propuesta; los masters existentes no se consideran automáticamente adaptados a todos los formatos.

## Idea rectora

Una graduación es el final de un capítulo. Esta premiere se niega a terminar. El visitante entra en un salón de Hollywood clásico y descubre, progresivamente, que la celebración continúa más allá de la vida. La frase central es **HOLLYWOOD NEVER DIES.** Debe seguir siendo texto HTML seleccionable y accesible, nunca lettering generado dentro del vídeo.

Arco: invitación → llegada → primera anomalía → revelación → pertenencia → reserva → recuerdo. La graduación aparece en el relato y la invitación, sin inventar universidad, promoción, fecha o beneficios. El undead se expresa con quietud, palidez sutil, vestuario atemporal y luz imposible cuidadosamente contenida; sin gore, caricatura ni criaturas estridentes.

Paleta acordada: black #070707, burgundy #3A0707, carpet-red #760D0B, champagne #E1C18B, antique-gold #B98A38, ivory #F2ECE2. La etapa undead conserva el mismo salón y paleta: reduce la calidez de piel y ambiente, manteniendo el oro de las lámparas. No introducir verde neón como atajo visual de Halloween.

## Escenas — conservar los seis bloques existentes

### 1. Intro cinematográfica — el umbral (`oh-intro`)

- **Qué ve:** negro cálido, identidad D-VOID y título editorial; la luz de la premiere apenas se intuye detrás. La frase central puede aparecer aquí y adquirir su sentido completo en la revelación.
- **Movimiento:** apertura breve por opacidad, de 0,6–1 s. Sin cuenta atrás ni loader. Acción «Entrar a la premiere» y acceso directo al contenido. La experiencia permanece legible antes de cargar vídeo.
- **Assets:** logo oficial sin alterar y poster del salón limpio; ninguna generación exclusiva para esta intro.
- **Hyperframes:** ninguno necesario en este bloque. No gastar un render en una aparición tipográfica simple.
- **CSS/JS:** composición tipográfica, aparición opcional, acción de entrada, cierre del overlay si se incorpora y manejo del foco. Sin JS la intro sigue en el flujo. Nunca atrapar al usuario esperando un archivo.
- **Conexión:** el poster ya comparte composición con el primer fotograma del hero; la cubierta se desvanece y descubre el mismo mundo.

### 2. Hero / red carpet — la llegada (`oh-hero`)

- **Qué ve:** alfombra roja central, salón, arañas, mármol, fotógrafos laterales y asistentes de gala. Espacio negativo para título y CTA, sin texto dentro del metraje.
- **Movimiento:** dolly frontal mínimo y estable durante hasta 6 s; personajes con microgestos. Una pasada, terminando en una imagen estable. No asumir que un dolly puede reiniciarse sin salto.
- **Assets:** `hero-clean` (6 s), poster inicial y still final. `paparazzi-flash-overlay` (4 s) es una capa de producción opcional; no es imprescindible para esta escena.
- **Hyperframes:** preparar entrada/salida, igualar exposición, recortar la toma y crear un final estable. Si se usa el flash, componerlo en el render final con intensidad moderada; no superponer otro vídeo en la landing.
- **CSS/JS:** título HTML, CTA al box office y control accesible de reproducción/pausa. La acción de entrada habilita el movimiento; cualquier rechazo de reproducción conserva el poster. Pausar fuera de pantalla.
- **Conexión:** el scroll natural acerca el relato. El siguiente poster conserva salón, eje de cámara y geometría, evitando un cambio arbitrario de escenario.

### 3. Event concept — anomalía y revelación (`oh-concept`)

- **Qué ve:** una frase breve sobre cerrar una etapa y una fiesta que se resiste a terminar. Primero cambia el ambiente; después reconoce a los mismos invitados como presencias undead. **HOLLYWOOD NEVER DIES.** remata el descubrimiento.
- **Movimiento:** subescena A, pausa visual; B, transformación de unos 5 s; C, resolución undead estable. Un reflejo se oscurece, cae la calidez y la escena revela su segunda identidad. Evitar fundir dos caras incompatibles, cambios anatómicos o un glitch genérico.
- **Assets:** `mutation-transition` (5 s), `hero-undead` (6 s) y fotogramas coincidentes del clean/undead. Los clips deben compartir cámara, salón, posiciones, ropa y dirección de luz. Aprobar un fotograma maestro antes de producir variantes.
- **Hyperframes:** composición principal. Alinear planos, temporizar máscaras/oclusiones, exposición y empalmes, e integrar el reveal y su asentamiento en una sola pieza reproducible. La mutación anatómica debe estar resuelta en el material fuente: Hyperframes compone, no corrige identidad por sí solo. Si la toma generada ya contiene una transformación válida, no duplicarla con otra transición encima.
- **CSS/JS:** IntersectionObserver para preparar el medio al aproximarse y activar una pasada solo después de la entrada voluntaria a la experiencia. Texto independiente, pausa y opción de omitir. Nunca ligar `currentTime` a cada píxel del scroll, bloquear el desplazamiento ni obligar a completar los 5 s.
- **Conexión:** el último fotograma fija el universo undead. El vestido, la silueta o la posición de una pareja encuentra continuidad en Dresscode. Si el usuario avanza rápido, mostrar directamente el poster undead.

### 4. Dresscode — tú perteneces a esta película (`oh-dresscode`)

- **Qué ve:** una pareja de gala que pertenece al mundo revelado, con presencia elegante y un detalle inquietante sutil. Las indicaciones reales de vestuario quedan pendientes de aprobación.
- **Movimiento:** respiración y giro mínimo, hasta 6 s. La ropa, la silueta y la caída de las telas importan más que una actuación compleja.
- **Assets:** `couple-hero` (6 s), poster de pareja y encuadre móvil. Debe heredar el vestuario y la dirección visual del salón.
- **Hyperframes:** recorte, encuadre, continuidad de color y entrada breve si aporta al montaje. No requiere otra gran transformación.
- **CSS/JS:** distribución responsive, texto de vestuario, reproducción opcional y enlace a reserva. La imagen estática es suficiente para comprender el bloque.
- **Conexión:** una vertical de terciopelo o un acento de latón anticipa la taquilla. El ritmo baja para facilitar la lectura del formulario.

### 5. Reservation / box office — la invitación (`oh-reservation`)

- **Qué ve:** taquilla de época, madera oscura, latón y luz cálida. El formulario tiene su propia superficie sólida y legible, sin competir con flashes o personajes.
- **Movimiento:** atmósfera mínima en un plano de hasta 6 s. En móvil se prioriza el poster; al entrar a un campo se pausa el vídeo y no se desplaza el formulario.
- **Assets:** `box-office` (6 s), poster y recorte móvil. Ningún precio, horario o condición generado dentro de la imagen.
- **Hyperframes:** preparar el plano y su continuidad cromática. No componer los campos, errores ni respuestas dentro del vídeo.
- **CSS/JS:** formulario semántico, labels, validación, errores asociados, foco, estado de envío y prevención de doble envío. Debe funcionar independientemente del metraje. Endpoint, campos definitivos, consentimiento, respuesta y entorno de ensayo requieren contrato confirmado.
- **Conexión:** solo una respuesta válida permite pasar a confirmación. Ante un error, conservar datos y foco útil en taquilla. En demo, usar un estado de muestra explícito sin envío ni entrada real.

### 6. Confirmation / printed ticket — el recuerdo (`oh-confirmation`)

- **Qué ve:** una impresora de tickets de época y una tarjeta HTML con los datos autorizados de la reserva. No inventar código de acceso o QR. Si no hay integración, permanece identificado como muestra.
- **Movimiento:** impresión de hasta 5 s en el vídeo, coordinada con una entrada breve de la tarjeta HTML. La confirmación textual aparece de inmediato; no depende de acabar la animación.
- **Assets:** `ticket-machine` (5 s), poster final de la máquina y diseño del ticket en HTML/CSS. El metraje no incluye nombre, fecha ni texto legible generado.
- **Hyperframes:** temporizar mecanismo, ranura y papel en blanco; preparar puntos de empalme con la tarjeta. En móvil, usar plano de máquina y tarjeta debajo si la alineación exacta no es robusta.
- **CSS/JS:** datos dinámicos mediante textContent, región de estado, foco y acciones posteriores según contrato. Sin datos personales en URL, medios o logs. No crear almacenamiento local por defecto.
- **Conexión:** cierre visual en ivory y antique gold con HOLLYWOOD NEVER DIES. La página permite volver y corregir sin reproducir toda la narrativa.

## Frontera técnica: Hyperframes en producción, vanilla en entrega

Hyperframes se usará para autorar composiciones HTML temporizadas y exportar vídeos de las transformaciones. Sus herramientas y runtime de composición no se cargan en GoHighLevel ni en el navegador del visitante. El entregable público sigue siendo HTML, CSS, JS y medios locales; ninguna librería externa, iframe de editor, CDN de animación o canvas permanente.

Esta fase no instala herramientas ni crea composiciones. Una fase posterior debe verificar la disponibilidad del entorno de render sin añadir dependencias a la landing. Las fuentes de composición se mantendrán separadas de `assets/video/`, que contendrá solo exportaciones listas para publicar.

Hay tres capas: (1) maestros generados, sin lettering; (2) composiciones Hyperframes para revelación, empalmes y sincronización; (3) página accesible con texto, navegación y formulario. Siete clips fuente no implican siete reproductores simultáneos ni siete descargas al abrir.

La configuración actual de `loadVideos` es un andamio. En implementación debe pasar a carga por escena y por dispositivo, con rutas separadas para vídeo, poster y versión estática. Un fallo de red o reproducción conserva el texto y el poster, sin errores bloqueantes.

## Móvil, rendimiento y accesibilidad

- Poster del hero como recurso visual inicial prioritario; título, CTA y contenido útiles antes de descargar vídeos. No precargar los siete clips.
- Presupuesto propuesto, pendiente de medición: poster inicial de 150–250 KB; transferencia inicial de HTML/CSS/JS/poster inferior a 500 KB; vídeo móvil principal de 1–2 MB y desktop de 2–4 MB por toma corta. Son metas de exportación, no tamaños garantizados.
- Los masters 1080p/high bitrate son fuentes de producción. Crear copias web optimizadas; no servir automáticamente el master. MP4 H.264 como entrega base, posters WebP y dimensiones/proporciones reservadas para evitar saltos.
- Mantener un solo vídeo reproduciéndose; como máximo preparar la escena siguiente cuando se aproxime. Pausar al salir del viewport y cuando la pestaña se oculte. Liberar medios lejanos si la medición muestra presión de memoria.
- Exportar encuadres móviles dirigidos, preferentemente verticales, desde la misma composición. Un recorte 16:9 a 9:16 solo es válido si conserva la acción; no ampliar a ciegas ni generar nuevas versiones sin autorización.
- Con movimiento reducido: posters clean/undead ordenados, transición inmediata y confirmación estática. Si Save-Data está disponible, preferir imágenes; no depender de que todos los navegadores expongan esa señal.
- Scroll nativo, sin scroll-jacking ni secciones fijadas durante varias pantallas. Usar min-height flexible; contenido largo y teclado móvil pueden ampliar cada escena. No exigir orientación horizontal.
- Animaciones DOM breves con opacity/transform. Evitar filtros animados, blur de pantalla completa, granos procedurales continuos y demasiadas capas compositadas.
- Flashes suaves y aislados, sin estrobo ni pantalla blanca completa; omitirlos en movimiento reducido. No se necesita el overlay de paparazzi para comprender la narrativa.
- Texto HTML con contraste estable, controles de al menos 44×44, foco visible y safe areas. Vídeos mudos; ningún sonido automático. No activar bucles infinitos en la base propuesta.
- Verificar al implementar: 375×812 y otros anchos, zoom de texto, teclado, sin JS, red lenta, movimiento reducido, entrada directa a reserva y navegadores internos de Instagram/WhatsApp.

## Integración GoHighLevel y estados

Dos rutas posibles: alojar la carpeta completa e insertarla mediante iframe, o integrar el fragmento de `.oh-page` junto a CSS/JS en los espacios admitidos por GHL. Iframe aísla estilos; el bloque evita un segundo contexto de scroll, pero requiere probar la ejecución y el aislamiento real. Confirmar método antes de certificar compatibilidad. Si se necesita comunicar altura entre ventanas, definir origen y contrato explícitos; no reutilizar mensajes de otros eventos.

El estado narrativo conceptual es `clean → transition → undead`. El de reserva es independiente: `idle → submitting → confirmed | error`. Navegar o saltarse la película nunca significa confirmar una reserva. La intro se puede omitir, el box office permanece accesible desde el inicio y ningún estado depende de la duración de un vídeo.

## Criterio de aprobación para producir

Primero aprobar composición maestra clean/undead, continuidad de personajes, encuadre móvil y la progresión de luz. Después producir las tomas y componer la transformación. Evaluar manos, caras, reflejos y geometría fotograma a fotograma donde haya empalmes. Eliminar tomas con morphing visible en vez de esconderlas con flashes.

La cotización previa de siete vídeos no incluye automáticamente generación de imágenes, versiones adicionales, herramientas de render, renders correctivos o postproducción. Esta arquitectura no autoriza esos gastos. Tampoco promete un bucle perfecto, transparencia real en el overlay ni emisión de tickets: cada capacidad deberá verificarse en su fase correspondiente.
