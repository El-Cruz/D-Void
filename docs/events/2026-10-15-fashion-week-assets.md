# Fashion Week — assets originales, etapa 2

> Estado actual: **Satin Bow es la única versión activa**, en `2026-10/15-fashion-week.html`. Consulte [la especificación vigente](2026-10-15-fashion-week-active.md). Este documento conserva el historial de una etapa anterior; sus rutas `work/`, comparadores y variantes describen material retirado y no deben usarse para continuar el trabajo. Las siguientes iteraciones se hacen en la página principal.


Creación: 02/10/2026. Cinco originales creados mediante **image_gen integrado**, en tandas 2 + 2 + 1. Sin CLI/API alternativo, nuevas instalaciones ni permiso/coste adicional solicitado por el servicio. Exportación con ImageMagick ya instalado. No se implementaron páginas ni selector; el registro sigue siendo una propuesta visual simulada. Hora 21h30 y +21 permanecen como contenido HTML futuro, nunca rasterizado.

## Archivos y procedencia

Raíz: `work/fashion-week-2026-10-15/assets/`.

- `originals/<variante>/master-v1.png`: salida original sin alterar, copiada del directorio generado por image_gen; también se conserva la salida del servicio.
- `originals/<variante>/prompt-v1.txt`: **prompt final exacto** de cada generación.
- `publish/<variante>/hero-desktop.webp` y `hero-mobile.webp`: versiones optimizadas. Perla añade `detail-glass.webp`; Satin añade `detail-bow.webp`.
- `manifest.json`: rutas, origen del servicio, herramienta, dimensiones, bytes, transparencia, calidad WebP, operaciones de recorte y hashes SHA-256. Fuente técnica del inventario.
- `review/desktop-contact-sheet.jpg` y `mobile-contact-sheet.jpg`: láminas de inspección, compositadas sobre el color previsto. No son assets de la entrega pública.

Se tomó del arte oficial el lenguaje de copa, satén, zapatos y rosa; se generaron composiciones nuevas mediante descripción, sin subir/copiar la fotografía original ni marcas de las referencias. No hay texto, fechas, logos, QR ni botones en los assets. No se alteraron originales de referencias ni logos compartidos. No se incrustaron imágenes en HTML/base64.

## Inventario medido

Pesos en bytes (no estimaciones). Todos los originales miden 1536×1024. Los WebP conservan alpha cuando corresponde.

| Variante / archivo | Dimensiones | Bytes | Transparencia |
| --- | --- | ---: | --- |
| 01-editorial-perla / original | 1536×1024 | 1,753,655 | No |
| 01-editorial-perla / hero-desktop.webp | 1536×1024 | 41,170 | No |
| 01-editorial-perla / hero-mobile.webp | 900×1024 | 38,296 | No |
| 01-editorial-perla / detail-glass.webp | 420×480 | 15,606 | No |
| 02-pink-backstage / original | 1536×1024 | 2,011,279 | Sí |
| 02-pink-backstage / hero-desktop.webp | 1536×1024 | 183,848 | Sí |
| 02-pink-backstage / hero-mobile.webp | 768×512 | 55,070 | Sí |
| 03-chrome-runway / original | 1536×1024 | 1,730,505 | Sí |
| 03-chrome-runway / hero-desktop.webp | 1536×1024 | 125,274 | Sí |
| 03-chrome-runway / hero-mobile.webp | 768×512 | 40,880 | Sí |
| 04-satin-invitation / original | 1536×1024 | 2,722,720 | No |
| 04-satin-invitation / hero-desktop.webp | 1536×1024 | 116,126 | No |
| 04-satin-invitation / hero-mobile.webp | 820×1024 | 75,144 | No |
| 04-satin-invitation / detail-bow.webp | 430×420 | 21,792 | No |
| 05-after-hours / original | 1536×1024 | 2,077,153 | No |
| 05-after-hours / hero-desktop.webp | 1536×1024 | 87,288 | No |
| 05-after-hours / hero-mobile.webp | 900×922 | 70,512 | No |

## Decisiones de composición y revisión visual

### Editorial Perla — P1 + P2 reutilizado

Fondo completo de estudio perlado, copa y dos zapatos satinados blush. Original aceptado por forma/material y espacio negativo a izquierda (aprox. 0–38% del ancho). Titular/CTA de escritorio a izquierda; no superponer sobre cristal o zapatos. Móvil: recorte 900×1024 desde x600,y0 conserva los objetos; título y CTA **fuera de la foto**, encima. No forzar 4:5 ni aplicar otro cover agresivo: se prefirió conservar ambos zapatos y copa. Detalle P2 derivado del cristal del mismo original, no segunda generación. La temperatura del reflejo es ligeramente cálida, sin convertirse en paleta dorada dominante.

### Pink Backstage — B1/B2 consolidados

Trío transparente de espejo, zapato fucsia y copa, revisado visualmente sobre `#FF4DA0`. Alpha real comprobado en PNG y WebP. Se acepta como **un collage conjunto**, no como tres archivos recortados independientemente. Su unidad mantiene luces y escala; evita generaciones innecesarias. Titular/CTA en columna adyacente en escritorio, encima en móvil; imagen con contain y relación 3:2, sin texto sobre accesorios. El espejo no muestra personas ni marcas. Si una futura interacción exige mover cada objeto por separado, habrá que producir recortes adicionales entonces; no es necesario para el hero actual. B3/cintas pueden resolverse posteriormente con HTML/CSS y texto, no se rasterizaron ni se construyeron en esta etapa.

### Chrome Runway — C1

Zapato escultórico cromado con cinta rosa, transparencia real. Revisado sobre plata clara; reflejos conservan definición y la silueta es completa. Reutilizar el mismo objeto a 1536 o 768px de ancho; **no** cortarlo en vertical. Situarlo en área gráfica independiente delante de tipografía grande solo si sigue siendo legible; en móvil título/CTA arriba y objeto debajo. La transparencia proporciona flexibilidad para márgenes CSS, no licencia para tapar información. C2/reflejo adicional no se generó: la escultura ya aporta material y se evita una textura redundante.

### Satin Invitation — S1 + detalle de lazo

Fondo completo de satén con zona central amplia y lazo inferior derecho. Recorte móvil 820×1024 desde x716,y0 mantiene lazo y zona izquierda más tranquila; limitar el texto a esa zona o usar panel HTML de papel encima. No es una tarjeta rasterizada. Detalle del lazo reutiliza el original (430×420 desde x1100,y600); sustituye el bodegón secundario S2 propuesto, coherente con la prioridad actual del usuario. Textura revisada después de compresión; sin bordes dentados visibles en las vistas inspeccionadas.

### After Hours — A2

Fondo ciruela completo con zapatos rosa intenso, clutch plateado y copa bajo flash estático; no efecto luminoso animado. Titular/CTA de escritorio en derecha tranquila (aprox. 68–95% del ancho). Móvil: recorte izquierdo 1000×1024 reducido a 900×922 preserva accesorios; texto/CTA arriba en panel HTML ciruela. La copa conserva reflejo algo cálido de estudio; no se utiliza para anunciar bebidas incluidas. A3 secundario no se creó porque el mismo bodegón ya contiene metal y satén: reutilizar antes de producir más.

## Validación y estado de aceptación

Los cinco originales fueron vistos individualmente. Se inspeccionaron las diez versiones hero en dos láminas (móvil/escritorio), ambos detalles por separado, y transparencia de Backstage/Chrome sobre fondo opaco de uso. Se verificaron dimensiones, peso y canal alpha con ImageMagick. Aceptados para la comparación visual: **ninguna variante necesita regeneración en esta etapa**. No se realizaron pruebas de render de páginas porque aún no se construyen; legibilidad con texto real y escala final se verificará al integrar.

Los originales ocupan 10.30 MB en total y se conservan como masters, no se sirven al navegador por defecto. Las doce versiones web suman 871.0 KB; cada archivo queda por debajo de 250 000 bytes. No cargar las cinco variantes a la vez en la revisión. Imágenes con dimensiones explícitas y selección responsiva previstas para implementación posterior, sin añadir código ahora.

## Límites de esta entrega

Se construyó la familia de assets prioritaria para cada una de las cinco variantes, no cada idea secundaria del inventario especulativo. Se registran arriba consolidaciones y reutilizaciones para evitar archivos redundantes. No hay fotografías de asistentes reales, marcas añadidas, promesas de experiencias ni credenciales de entrada. No se publicaron archivos ni se modificó configuración de Vercel; `originals/` y `review/` deberán excluirse de una futura entrega pública.
