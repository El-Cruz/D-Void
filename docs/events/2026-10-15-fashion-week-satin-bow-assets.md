# Satin Bow — assets transparentes, etapa 1

> Estado actual: **Satin Bow es la única versión activa**, en `2026-10/15-fashion-week.html`. Consulte [la especificación vigente](2026-10-15-fashion-week-active.md). Este documento conserva el historial de una etapa anterior; sus rutas `work/`, comparadores y variantes describen material retirado y no deben usarse para continuar el trabajo. Las siguientes iteraciones se hacen en la página principal.


03/10/2026. El usuario mantiene Satin Bow y aprueba sus textos. Esta etapa genera dos elementos independientes, sin cambiar composición, HTML, CSS, selector ni registro. Rama main; cambios anteriores sin seguimiento conservados. Sin dependencias, commits ni push.

Generados mediante image_gen integrado, sin conexión adicional. Originales y prompts exactos: `work/fashion-week-2026-10-15/assets/originals/06-satin-bow/`. Manifest adicional en ese directorio; el manifest histórico permanece intacto.

| Elemento | Original aceptado | Versión web | Tamaño web | Bytes |
| --- | --- | --- | --- | ---: |
| Lazo rosa empolvado | bow-v2.png | assets/publish/06-satin-bow/bow.webp | 1048×962 | 126474 |
| Copa y zapatos satinados | cocktail-shoes-v1.png | assets/publish/06-satin-bow/cocktail-shoes.webp | 1048×962 | 141572 |

Rutas assets relativas a `work/fashion-week-2026-10-15/`. PNG originales 1312×1199, conservados sin modificación. Exportación con ImageMagick instalado: reducción proporcional a caja 1000×1000, sin recorte, 24 px adicionales transparentes por borde; WebP calidad 88, alpha calidad 100. No base64 ni fondo rectangular.

## Procedencia exacta

Directorio del servicio: `/home/nicocruz_04/.codex/generated_images/01a10266-c92c-75e3-a2b2-b529a4d7274e/`.

- bow-v1.png: exec-4af5e0b3-2ebc-4fe4-91d0-6b079310be7e.png, primera generación conservada.
- bow-v2.png: exec-d6811841-5505-4e6e-a52b-67534601e86f.png, edición de matte del primer lazo; conserva forma, textura, nudo y extremos.
- cocktail-shoes-v1.png: exec-8973cd6c-6e8a-4109-aa87-284f70e23636.png, generación independiente.

Prompts finales guardados en bow-v1-prompt.txt, bow-v2-prompt.txt y cocktail-shoes-v1-prompt.txt. No referencias externas, marcas ni personas.

## Inspección

Transparencia real verificada en PNG y WebP (sRGBA, alpha mínimo 0 y máximo 1). Se inspeccionaron originales y las cuatro composiciones de WebP sobre perla #fff9f7 y ciruela #291b28. Siluetas completas, nudo y pliegues coherentes, zapatos de la misma pareja, cristal reconocible y huecos transparentes. Sin halos visibles al tamaño web revisado. La vista directa del visor mostró colores extraños en píxeles transparentes del primer resultado; la composición con alpha sobre fondos sólidos no los reproduce. Se conserva ese original y se elige la segunda versión revisada del lazo.

Láminas de comprobación: `assets/review/06-satin-bow/`, solo revisión, no assets para servir. No se rasterizaron textos, logos ni fondos de página. Hashes de Satin Bow HTML y satin-refinements.css idénticos antes/después. La integración sobre fondo perla queda para una etapa posterior.
