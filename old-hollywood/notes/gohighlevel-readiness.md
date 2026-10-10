# Hollywood Never Dies — QA final / GoHighLevel readiness

## Cambio posterior al QA 4.9 — primera iteración scroll-based

El QA 4.9 documentado debajo describe la versión anterior. El 2026-10-10 se reemplazaron Intro/Hero/Mutation por un stage sticky continuo; revisar la nueva validación en responsive-foundation.md. Dresscode, formulario y ticket mantienen sus contratos. Esta iteración requiere validación visual del usuario antes de convertir las escenas restantes.

Para montaje, los ancestros del stage deben permitir sticky: comprobar overflow, alturas y transformaciones del builder en el entorno real. No asumir compatibilidad GHL por las pruebas standalone. Un iframe necesita viewport y scroll interno adecuados; un iframe de altura total elimina la equivalencia con el scroll de la página anfitriona. No hay integración real realizada.


FASE 4.9 · 10 de octubre de 2026. Preparación local de una **demo**, sin montaje en GHL, backend, reserva, QR auténtico, analytics ni nuevas funciones. No certifica un entorno GoHighLevel que todavía no se ha probado. La arquitectura inicial es conceptual; para el estado implementado mandan esta nota y el cierre de `responsive-foundation.md`.

## 1. Seguridad y pertenencia de archivos

Rama `main`. `git ls-files old-hollywood` no devuelve archivos y `git check-ignore old-hollywood/index.html` no lo excluye: la variante aparece untracked porque no está registrada en el índice; no por una regla que oculte sus páginas. Sin un commit anterior no se puede determinar quién la creó ni reconstruir cada fase desde Git. Esta fase conserva copias anteriores locales para revisar exclusivamente su propio diff.

Pertenecen a la variante: `index.html`, `styles.css`, `script.js`, seis masters PNG, ocho derivados fotográficos WebP, el nuevo derivado ornamental WebP, notas de arquitectura/dirección/fases/prompts, `AGENTS.md` y tres `.gitkeep` en img/audio/video. Los directorios audio/video están vacíos: no existen reproductores ni medios de ese tipo. `Resources/References/Old Hollywood/` contiene las dos referencias oficiales archivadas, no recursos públicos de la página. El único recurso compartido utilizado es `Resources/DVOID/dvoid-logo.png`; no se modifica.

`package.json` y `package-lock.json` raíz son untracked y declaran `dvoid-capturas`, un único script `capturas:octubre` y Puppeteer. `capturas-octubre.mjs` captura La Tentación, Medicine, Fashion Week y Freak Show; no Hollywood. Sus fechas de modificación son del 6 de octubre. Esto demuestra su función como tooling local de captura/QA y que no son dependencias de la landing; no demuestra que sean desechables. Se conservaron junto con `capturas_octubre_2026/` y la modificación preexistente de `.gitignore` (`node_modules/`). Las notas antiguas que dicen que no existe package.json describen un estado anterior del repositorio.

Recomendación futura: revisar y registrar explícitamente la variante, sus notas, derivados y masters; conservar los masters en el repositorio/archivo de producción pero excluirlos del paquete público cuando no sean fallback. Revisar aparte el tooling de capturas y las referencias antes de decidir su registro. Evitar `git add .`, que mezclaría tareas. La regla `AGENTS.md` ignora también `old-hollywood/AGENTS.md`: si se acuerda registrar esas instrucciones, hará falta añadir ese archivo explícitamente con `git add -f old-hollywood/AGENTS.md`. No se ejecutó git add, commit ni push.

## 2. Archivos necesarios para montaje

| Archivo | Destino / necesidad |
| --- | --- |
| `old-hollywood/index.html` | Documento completo si se aloja standalone; solo el wrapper `#dvoid-hollywood` si se elige bloque HTML. |
| `old-hollywood/styles.css` | CSS de la landing. Conservar keyframes, media queries y tokens. |
| `old-hollywood/script.js` | JS nativo de escenas y formulario demo, cargado después de que exista el wrapper. |
| `old-hollywood/assets/img/web/` | Los nueve WebP usados por la página; subirlos todos conservando nombres o actualizar cada URL. |
| `old-hollywood/assets/img/the-golden-ticket-v1.png` | Fallback ornamental de compatibilidad para CSS sin image-set con tipos. |
| `Resources/DVOID/dvoid-logo.png` | Logo oficial compartido; conservar ruta al alojar el árbol completo o actualizar su referencia. |

No enviar `node_modules`, package.json/lockfile, scripts de QA/capturas, directorios vacíos, prompts, referencias, ni los otros cinco masters PNG como dependencias de la página. No eliminarlos del archivo de producción. No hay fuentes/CDN/librerías externas, runtime Hyperframes, build ni bundler necesarios.

## 3. Auditoría de assets utilizados

Pesos exactos en bytes. Rutas de la tabla relativas a `old-hollywood/`, salvo el logo. Ningún master artístico se alteró; hashes SHA-256 de los seis masters y del logo comprobados contra el inicio de 4.9.

| Archivo | Dimensiones | Bytes | Sección | Carga / prioridad |
| --- | --- | ---: | --- | --- |
| `../Resources/DVOID/dvoid-logo.png` | 700×262 | 131068 | Intro y hero | Un elemento; eager predeterminado, prioridad auto. Se corrigieron atributos 700×259 a 700×262. |
| `assets/img/web/the-last-premiere-master-v1-640.webp` | 640×360 | 47148 | Hero clean | Alternativa srcset; eager, async, fetchpriority high. |
| `assets/img/web/the-last-premiere-master-v1-1280.webp` | 1280×720 | 147198 | Hero clean | Alternativa srcset; eager, async, fetchpriority high. |
| `assets/img/web/the-last-premiere-master-v2-undead-640.webp` | 640×360 | 49242 | Mutation | Alternativa srcset; lazy inicial, async, prioridad auto; JS solicita eager/decode al entrar. |
| `assets/img/web/the-last-premiere-master-v2-undead-1280.webp` | 1280×720 | 153930 | Mutation | Misma política. El navegador puede anticipar la capa lazy cercana. |
| `assets/img/web/skeleton-couple-charlie-marilyn-v1-640.webp` | 640×854 | 94400 | Dresscode | Lazy, async, auto; eager al intersectar el retrato. |
| `assets/img/web/skeleton-couple-charlie-marilyn-v1-1280.webp` | 1086×1449 | 189730 | Dresscode | Alternativa srcset 1086w correcta pese al nombre 1280; misma política. |
| `assets/img/web/the-last-box-office-v1-640.webp` | 640×360 | 53944 | Box Office | Lazy, async, auto. |
| `assets/img/web/the-last-box-office-v1-1280.webp` | 1280×720 | 170468 | Box Office | Alternativa srcset; misma política. |
| `assets/img/web/the-golden-ticket-v1.webp` | 1860×845 | 305612 | Ornamento del ticket | Fondo CSS, solicitado al mostrar el ticket; auto. |
| `assets/img/the-golden-ticket-v1.png` | 1860×845 | 2578636 | Fallback ornamental | Fondo CSS alternativo por compatibilidad; no eager/preload. |

Derivado ornamental: ImageMagick existente, WebP calidad 90, sin redimensionar ni recortar, metadatos retirados y transparencia conservada. Ahorro de 2273024 bytes (**88,15%**) frente al PNG. Revisión visual comparada del ornamento a 1090 px de ancho: sin pérdida importante visible. El original permanece intacto. Se eligió WebP, ya usado en la página, sin añadir AVIF ni una cadena de formatos.

La declaración PNG queda como fallback de CSS; un `@supports` usa image-set con WebP y PNG tipados en navegadores compatibles. El fallback cubre incompatibilidad de sintaxis/formato, **no** sustituye automáticamente una URL WebP que devuelva 404. Si falla el ornamento, el ticket conserva fondo marfil, borde CSS y datos completos. Referencia: [MDN image-set](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/image/image-set).

Los otros cinco masters PNG y la variante zombie-paparazzi no se enlazan desde HTML/CSS. No hay vídeo/audio. Si el hosting sirve incorrectamente WebP, corregir MIME `image/webp` y URLs; no desactivar globalmente la optimización de GHL sin una prueba que lo justifique.

## 4. Responsive y crop móvil

Móvil: jerarquía, CTA y formulario en superficies propias; pareja íntegra con contain; taquilla horizontal completa; ticket en columna con altura libre. Laptop: hero panorámico, Dresscode editorial en columnas, formulario anclado visualmente a la parte inferior del mostrador y ticket con talón lateral. Los nombres largos pueden hacer que el ticket ocupe varias pantallas: se accede por scroll natural, no se recorta ni se encoge.

Hero a 375×812: ventana de aproximadamente 375×487,5 px; cover conserva cerca del **43,3% central del ancho original** (x≈28,35–71,65%), descartando cerca de 28,35% de cada lado. En los teléfonos 360–430 revisados la retención es similar; 320×568 retiene aproximadamente 51,1%. Se pierden los fotógrafos y asistentes exteriores, parte de mármol/decoración lateral y algunas siluetas donde el cambio undead es más perceptible. Permanecen puertas, alfombra, eje de luz, lámparas y los grupos interiores. El título móvil queda debajo de los personajes; no se superpone a sus caras.

Impacto: disminuye el contraste visual humano/undead y la amplitud de la premiere. El texto de Concept y la pareja undead completa comunican igualmente la narrativa. **Aceptable y no bloqueante para publicar esta demo**; no equivale a aprobar el horizontal como master vertical definitivo ni un morph geométrico entre las dos imágenes. No se generó 9:16.

Futuro master específico: 9:16, preferentemente 1080×1920 (derivados web según medición), clean/undead con idéntica cámara, puerta, alfombra, lámparas y posiciones. Colocar invitados/fotógrafos legibles dentro del encuadre vertical en ambas orillas; evitar que elementos esenciales dependan de bordes. Reservar zona alta para logo/control y baja para HTML sin tapar caras; revisar safe zones con la UI real a 320/375/430 y recortes 4:5/16:9. Sin lettering generado. No obtenerlo mediante otro recorte central del mismo horizontal.

**Variante específica:** sí para mejorar el relato del hero; pendiente y no producida. No para Dresscode, taquilla ni ticket en su composición actual.

## 5. Estructura, aislamiento y fallbacks

Wrapper único `#dvoid-hollywood.oh-page`. Los dos controladores IIFE buscan sus nodos dentro de él; errores y navegación del formulario también se resuelven allí. Guards `data-motion-initialized` y `data-reservation-initialized` impiden añadir otra instancia de handlers/observers al mismo DOM al cargar de nuevo script.js. No es un sistema de desmontaje: no reemplazar repetidamente el wrapper mientras la página sigue abierta.

CSS ya estaba scoped bajo `.oh-page`; se conserva ese scope y `body.oh-document` solo para standalone. Keyframes tienen prefijo oh-. No se convirtió automáticamente toda la hoja a selectores ID ni se añadió `!important` general. Se retiraron reglas de doce clases heredadas sin uso en HTML/JS: oh-header, oh-brand, oh-nav, oh-text-link, oh-button, oh-premiere, oh-media--portrait, oh-scene-footer, oh-editorial, oh-editorial-copy, oh-muted y oh-intro-bottom, incluidas sus reglas responsive. Los TODO GHL actuales siguen siendo puntos reales de integración, no debugging.

La llegada es visible desde HTML. Sin JS no se activa el recorrido alto ni sticky. El antiguo fallback `<noscript><style>` del head fue retirado; conservar el aviso noscript del formulario.

IDs oh-* y wrapper deben existir una sola vez. No duplicar la landing en bloques móvil/desktop de GHL. Ante estilos anfitriones más específicos, comprobar computed styles; el scope protege a la página anfitriona de nuestras reglas pero no impide que sus reglas/`!important` entren en el componente. Iframe proporciona aislamiento más fuerte; no se promete inmunidad CSS para el bloque.

Fallbacks probados: JS desactivado muestra llegada y contenido en flujo; formulario deshabilitado y ticket oculto. Hero fallido conserva identidad/título; undead fallido conserva clean sin bloquear el resto; retrato/taquilla fallidos conservan texto, proporción y formulario; ornamento fallido conserva datos y marco CSS. Los errores de red simulados son esperados, sin excepciones JS. No se ocultan mensajes de red ni se fabrica una reserva para compensar un fallo.

## 6. Performance y Safari/iOS

Hero en HTML con eager/async/high, descubierto sin esperar JS. No se añadió preload: la imagen ya se descubre temprano y un preload incorrecto podría descargar otra variante del srcset. CSS pequeño bloquea el primer render para evitar contenido sin estilo; JS es defer. No imports, fuentes externas, fetch, cookies o analytics. Tamaños explícitos/proporciones reservan los medios; la confirmación se inserta por una acción del usuario, no por una carga tardía arbitraria.

La política lazy no garantiza que los recursos cercanos esperen al scroll: Chromium puede anticipar undead y Dresscode. Las cifras de red/CLS locales se resumen en responsive-foundation; no son Core Web Vitals de producción ni un Lighthouse móvil con red real. Medir compresión, caché, MIME y latencia del hosting al montar. No se añadió minificación/build/dependencias.

El nuevo stage usa un único rAF pendiente, solicitado por scroll/resize/media changes. Los listeners scroll/resize se retiran fuera de la escena y con la pestaña oculta. No hay timers del hero, loops autónomos ni will-change permanente. Reduced motion sigue el scroll con opacidad y desactiva cámara/flashes. Dresscode/Box Office conservan sus reveals; el adaptador demo conserva su espera local de 180 ms. Sticky debe probarse dentro del anfitrión GHL.

Safari/iOS: usa svh y min-height flexible, no un layout rígido dependiente de 100vh; safe-area y viewport-fit=cover presentes. Inputs de 16 px, altura mínima 52 px y scroll-margin; no zoom desactivado, scroll lock ni barras fijas. overflow:hidden precede overflow:clip como fallback. Si clip-path no está disponible, el ticket mantiene opacity/transform y su contenido base; reduced motion elimina ambos efectos. No se añadieron hacks de teclado/appearance/backdrop-filter/overscroll.

Base técnica prevista: Safari/iOS moderno con svh e inert; svh llegó en 15.4 e inert en 15.5 ([WebKit 15.4](https://webkit.org/blog/12445/new-webkit-features-in-safari-15-4/), [WebKit 15.5](https://webkit.org/blog/12669/new-webkit-features-in-safari-15-5/)). No hay polyfill para navegadores anteriores ni certificación de esa versión mínima. Pendientes pruebas Safari físico de clip-path, foco programático, scrollIntoView, safe areas, teclado/resize, back-forward y navegadores internos. Un user-agent iPhone en Chromium no equivale a WebKit y no se usó como prueba de Safari.

## 7. Plan de montaje GoHighLevel — no ejecutado

### Opción A: alojar standalone e insertar iframe

Conservar el árbol de archivos o actualizar el logo compartido. Servir por HTTPS HTML/CSS/JS e imágenes con MIME correcto. Insertar un iframe con título accesible en un Code element de una página de ensayo; comprobar frame-ancestors/CSP y ancho/altura disponibles. No fijar una altura que corte el formulario o el ticket largo. No hay postMessage/resizing de iframe implementado: acordar ese contrato si se requiere; el scroll interno y la navegación/foco se deben probar. Los fragmentos siguen dentro del iframe. El CSS/JS permanece en la página alojada, no se pega además en GHL.

### Opción B: fragmento HTML con CSS y JS de página

1. Crear una página de ensayo con sección/fila de ancho completo; retirar padding/márgenes del builder que limiten el wrapper. Añadir un Code element y pegar **solo** `<div id="dvoid-hollywood" ...>…</div>`; no duplicar html/head/body ni cargar script.js también dentro del fragmento. Mantener noscript, hidden, IDs, labels y atributos ARIA. Si el anfitrión ya tiene un main envolvente, adaptar `#oh-main` a contenedor sin un segundo landmark main; preservando su ID/tabindex.
2. En Custom CSS de esa página, pegar styles.css, omitiendo `body.oh-document` si se usa fragmento, o cargar su URL alojada desde el head de esa página. Si se pega CSS, convertir todas las URLs relativas del ornamento a URLs absolutas. Mantener tokens/keyframes/media queries. No poner reglas globales de body en todo el funnel.
3. En el código de pie de **esa página** cargar script.js una sola vez cuando exista el wrapper. Standalone usa defer; no garantiza por sí solo el orden de un DOM insertado dinámicamente por GHL. HighLevel documenta `hydrationDone` para ejecutar custom code después de la hidratación de preview: adaptar allí la carga/inicialización en el montaje, comprobar también la página publicada y no dejarla esperando un evento que no ocurra en su entorno. No se añadió un listener GHL a la demo local.
4. Configurar título/descripción/lang/viewport en la página anfitriona y verificar que viewport-fit y zoom se conservan. No copiar favicon data: como dependencia adicional.
5. Publicar únicamente una página de ensayo y probar URLs, CSP, CSS anfitrión, carga tardía del DOM, doble inicialización, enlaces, foco y nombres largos. Revisar los scripts/analytics del anfitrión: la privacidad local no certifica lo que GHL pueda inyectar.

HighLevel documenta [Code element e hidratación](https://help.gohighlevel.com/support/solutions/articles/155000002421-hydration-event-in-custom-code-in-funnels) y [ubicaciones de código de página](https://help.gohighlevel.com/support/solutions/articles/48000980311-add-tracking-code-to-funnels-and-websites). Esas ubicaciones no autorizan añadir tracking; se usarían exclusivamente para el código funcional existente. Método, hosting y CSP todavía por confirmar.

### Rutas que actualizar

`./styles.css`, `./script.js`, todos los `src`/`srcset` `./assets/img/web/...`, ambas rutas `../Resources/DVOID/dvoid-logo.png`, y las tres URLs ornamentales CSS (PNG base y WebP/PNG dentro de image-set). El navegador resuelve imágenes HTML contra la URL de la página; CSS alojado contra la URL del CSS, CSS pegado contra la página GHL. Usar URLs HTTPS absolutas en el fragmento y CSS pegado. Los anchors #oh-* permanecen internos; no inventar un slug público ni romper parámetros de campañas.

## 8. Backend futuro — frontera exacta

No existen variables/endpoints reales. Confirmar: endpoint HTTPS, método, nombres/tipos del payload, consentimiento y textos legales, política definitiva Guests, autenticación pública permitida, CORS/orígenes, respuesta verificable, errores, timeout/red e idempotencia. Secretos solo en servidor. Campos actuales: `{ firstName, lastName, phone, accompanied, guests }`; guests excluye al titular y es 0 sin acompañado.

Punto exacto: función `submitReservation(payload)` en el segundo IIFE de script.js, bajo el TODO GHL. Sustituir allí el adaptador demo, no las escenas. Su caller es el listener submit del formulario: valida, normaliza, deshabilita fieldset y bloquea el doble envío, luego espera el adaptador. Hoy **rechaza cualquier mode/status distinto de demo/demo-preview**. Error conserva datos y reactiva controles. El contador DVOID-DEMO-* es local, base 36, sin persistencia; no sirve como ID real.

Respuesta futura esperada, pendiente de contrato:

```js
{
  reservationId, // Identificador emitido y verificable por el servidor.
  status,        // Enum contractual; nunca aceptar un success genérico como reserva.
  qrValue        // Valor auténtico/autorizado, o null si el contrato no emite QR.
}
```

El adaptador actual añade `mode: 'demo'`, status demo-preview y qrValue null. Antes de habilitar producción habrá que sustituir el guard del caller por validación explícita del contrato real (ID válido, estado permitido, QR según contrato). No basta retirar el guard ni cambiar una etiqueta.

Presentación: `renderTicket(payload, result, moveFocus)`, `#oh-ticket-code`, `#oh-ticket-state`, `[data-ticket-qr]`, `.oh-ticket[data-status]`, y región `.oh-form-status`. Mantener datos con textContent, estado accesible y foco al resumen sin robarlo si el usuario se movió. Hoy renderTicket no renderiza QR ni cambia el texto hardcoded del estado: habrá que implementar ambos según respuesta auténtica y pruebas de error. No mostrar confirmación durante submitting, con respuesta incompleta o fallo de red. No usar preview como prueba de éxito del backend.

## 9. Demo frente a producción

La demo actual conserva advertencias visibles antes y después del submit. Teléfono excluido del ticket; datos en memoria y campos de la pestaña, sin storage, cookies, URL, logs o solicitudes externas. No reservas reales ni QR escaneable.

| Texto / estado actual | Cambio futuro condicionado a backend |
| --- | --- |
| `#oh-demo-note`: Vista previa · No se enviarán datos ni se realizará una reserva | Texto exacto de envío/consentimiento acordado; solo después de activar servicio probado. |
| Aviso noscript: formulario de demostración; reservas reales no disponibles | Describir el fallback real; nunca permitir un POST accidental sin contrato. |
| Límite Guests «en esta demo», «Límite definitivo por confirmar» | Política real confirmada; no asumir 10 como capacidad comercial. |
| `.oh-form-status`: Preparando la vista previa / Ticket demo preparado… no confirmada | Estado de envío y resultado real; error no confirma reserva. |
| `.oh-eyebrow` de confirmation: Premiere pass — demo | Etiqueta real autorizada tras respuesta válida. |
| `#oh-ticket-state`: DEMO PREVIEW / NOT YET CONFIRMED | Estado real mapeado explícitamente; pendientes/error permanecen sin confirmar. |
| `.oh-ticket-code` label Demo code y DVOID-DEMO-* | Código auténtico de servidor, sin generar otro contador local. |
| `[data-ticket-qr]`: DEMO / NO QR y aria-label de placeholder | QR autorizado y descripción accesible; sin placeholder que parezca escaneable. |
| `#oh-ticket-note`: Vista previa personalizada · Sin reserva confirmada ni validez como entrada | Validez/condiciones reales aprobadas. |
| `data-status="demo-preview"`, `mode:'demo'`, estado demo-success | Estados reales definidos por contrato y UI; no renombrarlos como sustituto del backend. |

Los títulos narrativos “Claim your invitation”, “Reserve my invitation” y “Admit to the afterlife” no constituyen confirmación; están acompañados por los avisos demo. Revisarlos con las condiciones reales al habilitar producción. No se modificó el copy creativo de esta fase.

## 10. Gate de montaje y publicación

Preparada para **montaje de la demo en GoHighLevel** después de elegir opción/hosting y adaptar rutas/orden de ejecución. No se hizo montaje ni se certifica funcionamiento en GHL. No hay bloqueantes funcionales locales detectados tras las correcciones de QA. La ausencia de backend/QR es deliberada y solo bloquea ofrecer reservas/entradas reales, no publicar la demo correctamente identificada.

Antes de publicar el montaje: probar la página GHL de ensayo con assets HTTPS, CSP, móvil, teclado/foco, reduced motion, formulario y ticket. Mantener visibles las etiquetas demo. Safari físico, navegadores internos y lector de pantalla siguen pendientes. Master vertical del hero y mayor resolución Retina son mejoras futuras, no un permiso para generar ahora.


## Publicación Vercel (2026-10-10)

Ruta pública: `/hollywood-never-dies`, reescrita a `/old-hollywood/index.html`. El build copia HTML/CSS/JS, nueve WebP y PNG fallback del ticket; excluye notas y los demás masters de esta variante. HTML usa rutas absolutas `/old-hollywood/` y `/Resources/` para funcionar bajo el slug. Al migrar a GHL reemplazarlas por las URLs del alojamiento elegido. El formulario sigue siendo demo sin backend.
