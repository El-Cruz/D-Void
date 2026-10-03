# Fashion Week — etapa 3

> Estado actual: **Satin Bow es la única versión activa**, en `2026-10/15-fashion-week.html`. Consulte [la especificación vigente](2026-10-15-fashion-week-active.md). Este documento conserva el historial de una etapa anterior; sus rutas `work/`, comparadores y variantes describen material retirado y no deben usarse para continuar el trabajo. Las siguientes iteraciones se hacen en la página principal.


Implementación local terminada para la comparación: 2 de 5 variantes construidas.

## Archivos

- `work/fashion-week-2026-10-15/review/index.html`: selector accesible con cinco botones; 03–05 quedan deshabilitados y etiquetados “Pendiente”. Cambia el iframe sin recargar el comparador.
- `work/fashion-week-2026-10-15/variants/01-editorial-perla.html`: Editorial Perla completa.
- `work/fashion-week-2026-10-15/variants/02-pink-backstage.html`: Pink Backstage completa.
- `work/fashion-week-2026-10-15/shared/base.css` y `base.js`: estilos y lógica compartida.

El HTML original `2026-10/15-fashion-week.html` no se tocó. No se añadió ninguna dependencia. El formulario es deliberadamente una demostración: valida nombre, apellido y celular, pero nunca hace `fetch`, no persiste datos y muestra el estado “no envía ni guarda datos personales”. No genera entradas, QR ni confirmaciones válidas.

## Contenido común

Las dos variantes muestran D-VOID Fashion Week, jueves 15 de octubre, entrada 21h30, +21, Girls Night hasta las 23h00, cover ellas $10 hasta las 23h00 y $15 general después. CTA común: “Quiero estar en la lista”. Reservas vía DM aparece como muestra visual sin enlace real.

## Verificación realizada

- Servidor local existente en `127.0.0.1:8000`: las rutas del comparador, ambas variantes y los WebP respondieron HTTP 200.
- Capturas de Chromium headless a 390×844 y 1440×1000 para el comparador y Pink Backstage; Perla también se inspeccionó en ambas medidas mediante el comparador.
- Cambio de variante implementado por botones, estado `aria-pressed`, foco devuelto al botón y título del iframe actualizado.
- JavaScript inline y compartido pasó `node --check`.
- Revisión manual del detector de `impeccable`: avisó sobre el borde superior del aviso de demo, el fondo marfil deliberado y un contraste variable del rosa intenso sobre el fondo diagonal. El fondo marfil sigue el brief Editorial Perla; el contraste rosa se debe comprobar con texto final y puede oscurecerse antes de publicar. No se ejecutó una auditoría WCAG automatizada ni se afirma compatibilidad GHL.

## Vista previa

```bash
python -m http.server 8000 --bind 127.0.0.1 --directory /home/nicocruz_04/Projects/D-Void
```

Abrir: `http://127.0.0.1:8000/2026-10/15-fashion-week.html`

La vista de revisión es interna y no forma parte de la entrega final. Las variantes 03–05 permanecen pendientes.
