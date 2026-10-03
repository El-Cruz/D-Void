# Fashion Week · Etapa 4

> Estado actual: **Satin Bow es la única versión activa**, en `2026-10/15-fashion-week.html`. Consulte [la especificación vigente](2026-10-15-fashion-week-active.md). Este documento conserva el historial de una etapa anterior; sus rutas `work/`, comparadores y variantes describen material retirado y no deben usarse para continuar el trabajo. Las siguientes iteraciones se hacen en la página principal.


Fecha de trabajo: 2026-10-02. Esta etapa completa las cinco propuestas del comparador local; no selecciona una entrega final.

## Contenido común confirmado

- Jueves 15 de octubre de 2026, público +21.
- Entrada indicada para esta etapa: 21h30.
- Girls Night hasta las 23h00.
- Cover ellas $10 hasta las 23h00; luego $15 para todos.
- CTA y campos de demostración: “Quiero estar en la lista”, nombre, apellido y celular.
- El entorno es simulado: no existe todavía una cuenta o enlace oficial para Reservas vía DM. El formulario valida localmente y muestra explícitamente que no envía ni guarda datos.

## Variantes activas

| Opción | Dirección aplicada | Asset principal | Diferencia estructural |
| --- | --- | --- | --- |
| 01 · Editorial Perla | marfil editorial, copa y zapatos | `assets/publish/01-editorial-perla` | arte a la derecha y ritmo aireado |
| 02 · Pink Backstage | rosa intenso, collage | `assets/publish/02-pink-backstage` | diagonal cromática y tono expresivo |
| 03 · Chrome Runway | plata, negro y rosa | `assets/publish/03-chrome-runway` | hero oscuro de dos órdenes, objeto cromado protagonista |
| 04 · Satin Invitation | invitación de moda y satén | `assets/publish/04-satin-invitation` | copy superpuesto a panel editorial y detalle de lazo |
| 05 · After Hours | ciruela, flash y rosa eléctrico | `assets/publish/05-after-hours` | fotografía primero en móvil, tipografía display condensada |

Las variantes 03–05 cargan `shared/advanced.css` además de los tokens compartidos. La ruta del iframe cambia sin recargar el comparador; solo hay un iframe activo para no descargar cinco páginas simultáneamente. El comparador conserva los valores escritos por variante en memoria de sesión de la página y los restaura después de volver a ella.

## Auditoría de comportamiento

- La identificación de variante se obtiene del contenedor `.fw-shell`, por lo que los estados no se mezclan entre opciones.
- El listener de cada formulario se registra una vez por carga del iframe. El comparador destruye la página anterior al cambiar `src`, evitando listeners duplicados.
- La comunicación usa `location.origin` y valida `event.source`/`event.origin`; no se usa `postMessage('*')`.
- Las imágenes nuevas tienen `picture` para móvil/escritorio; el detalle de Satin usa `loading="lazy"`.
- No hay librerías externas, animación continua, html2canvas ni captura. `prefers-reduced-motion` desactiva desplazamiento suave y tratamientos decorativos.

## Verificación pendiente de integración

- El selector y los formularios fueron verificados en el servidor local; falta probar el método real de integración en GoHighLevel antes de publicar.
- El logo conserva la ruta absoluta del repositorio original (`/Resources/DVOID/dvoid-logo.png`); debe resolverse como asset de entrega cuando se prepare el paquete final.
- El comparador es una herramienta interna de revisión y no debe incorporarse a la entrega final.
