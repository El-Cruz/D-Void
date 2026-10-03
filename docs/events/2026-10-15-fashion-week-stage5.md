# Fashion Week · Etapa 5: revisión comparativa

> Estado actual: **Satin Bow es la única versión activa**, en `2026-10/15-fashion-week.html`. Consulte [la especificación vigente](2026-10-15-fashion-week-active.md). Este documento conserva el historial de una etapa anterior; sus rutas `work/`, comparadores y variantes describen material retirado y no deben usarse para continuar el trabajo. Las siguientes iteraciones se hacen en la página principal.


## Alcance

Se revisaron las cinco variantes del comparador local en 360, 390, 768 y 1440 px con Chromium headless. No se envió ningún registro y no se publicó nada.

## Resultado técnico

- Las cinco páginas cargan sus imágenes (`complete=true`, `naturalWidth>0`) y el CTA está presente en los cuatro anchos.
- `document.documentElement.scrollWidth` no supera el viewport en ninguno de los 20 casos.
- El selector ofrece cinco botones activos; en móvil se reorganiza en tres filas y no tapa el iframe.
- Campos vacíos muestran los tres errores; un celular de dos dígitos mantiene el estado de revisión; un celular válido se conserva al cambiar de variante y volver.
- El foco del CTA conserva un contorno sólido de 3 px. Con `prefers-reduced-motion: reduce`, el modo reducido se detecta y se usa desplazamiento instantáneo.
- No hay contenido esencial oculto por animación: HTML, hero, condiciones y formulario están presentes antes de JavaScript.
- Chromium no reportó errores de página. Los mensajes `SharedImageManager` observados en stderr son avisos internos del modo headless/GPU durante capturas, no fallos de recursos del sitio.

## Pesos de imágenes publicables

El conjunto de WebP publicables suma aproximadamente 0,8 MB. Los héroes móviles pesan entre 40 y 76 KB salvo After Hours (72 KB); Satin añade un detalle lazy de 24 KB. Se mantienen versiones separadas para móvil y escritorio.

## Decisión recomendada

Para tráfico de Instagram y WhatsApp recomiendo **Chrome Runway**: el objeto cromado se reconoce en el primer vistazo, la fecha/hora y el CTA quedan visibles pronto en móvil, y el contraste oscuro/rosa funciona bien en capturas compartidas. Pink Backstage es la alternativa de mayor impacto cromático; Editorial Perla es la más serena; Satin Invitation es la más delicada; After Hours comunica mejor una sesión nocturna intensa, aunque su hero exige más atención tipográfica.

La recomendación no elimina ni bloquea ninguna variante. La elección final y la preparación del HTML para GoHighLevel quedan para la siguiente etapa, después de confirmar el método de integración.
