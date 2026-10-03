# Contexto del proyecto D-Void

## Estado vigente — Satin Bow único

Única página activa de Fashion Week: `2026-10/15-fashion-week.html`. Dependencias en `Resources/events/2026-10-15-fashion-week/`, logo oficial en `Resources/DVOID/`. No existe comparador ni carpeta work; las próximas iteraciones se hacen directamente en la página principal. Lea [la especificación vigente](events/2026-10-15-fashion-week-active.md). Originales/prompts se conservan como referencias en `Resources/References/Fashion Week/Generated/`. Registro local sin backend; no se modifica su contrato en esta reorganización.

Preview: http://127.0.0.1:8000/2026-10/15-fashion-week.html

## Registro histórico de inicialización y comparación

El contenido siguiente conserva el historial y no sustituye el estado vigente; las rutas work y selector quedaron retiradas por autorización expresa.


## Actualización de etapa 2 — assets creados

La instrucción posterior del usuario autoriza ejecutar la creación de assets. Se completaron cinco originales y doce WebP para las cinco variantes, con revisión visual y prompts conservados. Consultar [inventario de assets](events/2026-10-15-fashion-week-assets.md) y `work/fashion-week-2026-10-15/assets/manifest.json`. Las menciones siguientes a “no creados” describen la planificación anterior. No se implementaron páginas ni selector; original HTML intacto. Ambiente visual simulado, entrada 21h30, Freak Show pausado.

## Actualización — Etapa 1: cinco propuestas

El usuario autoriza rediseño completo y assets originales; la tarea actual se limita a especificarlos, sin construir. La restricción previa “no rediseñar” describe la inicialización anterior, no impide esta planificación. Página original intacta y Freak Show pausado. Referencias localizadas y abiertas en `Resources/References/Fashion Week/`; arte oficial confirma +21. Entrada **21h30** confirmada por el usuario, reemplaza 21h00 del brief. El usuario aclara que el ambiente es solo visual y simulado; no hace falta enlace DM ni integración real para comparar.

Consultar [cinco propuestas](events/2026-10-15-fashion-week-proposals.md): composición móvil/escritorio, tipografías disponibles, paletas, estructura, presupuesto de movimiento, inventario y selector de revisión. La estructura `work/fashion-week-2026-10-15/` allí propuesta reemplaza para la comparación el árbol genérico sugerido abajo; no se ha creado. Git inicial de esta etapa: rama main, `?? docs/` y `?? Resources/References/Fashion Week/`, conservados. Las secciones siguientes mantienen la auditoría histórica con su fecha.

Inspección: 2 de octubre de 2026, hora de Bogotá/Quito. Raíz confirmada: `/home/nicocruz_04/Projects/D-Void`. Rama `main`; `git status --short` inicial vacío. Instrucciones aplicables: `AGENTS.md` de raíz; no se encontraron AGENTS en ancestros ni en los directorios de páginas/recursos. `.agents/skills/apple-design/AGENTS.md` pertenece a esa skill y no gobierna las páginas.

## Alcance y decisiones confirmadas

Fuente: instrucciones del usuario de esta tarea. Inicializar y documentar Fashion Week del 15/10/2026; fecha límite 08/10/2026, preferentemente antes. Freak Show pausado. No rediseñar, alterar integraciones, mover recursos, instalar dependencias, hacer commits ni push. Trabajo por etapas y explicaciones concretas para un desarrollador junior.

D-Void: discoteca de Quito; audiencia objetivo mayor de 21 años, clase media alta; tráfico desde Instagram y WhatsApp. Los $15–20 de consumo habitual son contexto interno y **no** una condición publicable. Edad admitida pendiente de confirmación; no equipararla automáticamente a la segmentación.

## Estructura real

| Ruta | Estado observado / función |
| --- | --- |
| `index.html`, `menu.html`, `ingreso.html` | Bundles con runtime, manifest y template serializado. Preservar runtime y assets embebidos. |
| `reservas.html` | Fragmento HTML con iframe al servicio Azure de reservas y recepción de altura por `postMessage`. |
| `survey.html` | Encuesta local; imprime payload en consola y muestra agradecimiento. No hay envío de encuesta. |
| `2026-09/` | `17-casino.html`, `25-evento-udla.html`: HTML de eventos. |
| `2026-10/` | `01-la-tentacion.html`, `08-medicine.html`, `15-fashion-week.html`, `24-freak-show.html`. |
| `Resources/References/` | Brief de Fashion Week y referencias originales de diversos eventos. |
| `Resources/DVOID/`, `Resources/UDLA/`, `Resources/images/`, `Resources/videos/` | Logos, materiales de identidad y medios compartidos/de otros eventos. Conservar. |
| `bundler.mjs`, `unpack.mjs`, `reencode.mjs`, `verify.mjs` | Utilidades Node nativas para bundles; no son un build de Fashion Week. |
| `vercel.json` | `cleanUrls: false`; rewrite `/fashion-week` → `/2026-10/15-fashion-week.html`, además de portada, reservas, menú, ingreso, casino, UDLA y Tentación. No hay rewrite para Medicine ni Freak Show. |
| `AUDIT_REPORT.md` | Auditoría histórica; no sustituye la inspección actual ni valida este evento. |
| `.agents/skills/apple-design/`, `skills-lock.json`, `.impeccable/` | Material/configuración de herramientas existente. No modificado. |
| `.env.local`, `.vercel/` | Configuración existente; no se leyeron secretos ni se modificó configuración. No incluirlos en entregas. |

No hay `package.json`, lockfile de dependencias npm ni framework de pruebas. `skills-lock.json` no es un lockfile de npm. No se crearon templates, builds ni instalaciones.

Nota de conservación: `.gitignore:3` excluye `AGENTS.md`; ya existía localmente, pero no está en HEAD. Se añadió un bloque de alcance vigente conservando el contenido previo (5 336 bytes). La actualización de AGENTS existe en disco, aunque no aparece en `git status`. No se cambió `.gitignore` ni se forzó su incorporación. Al cerrar, Git solo muestra `?? docs/` y ningún cambio en archivos rastreados; no hubo commits/push.

## Herramientas y vista previa

Disponibles: Python 3.14.7, Node 26.7.0, Chromium, `pdftotext`, `pdfinfo`. Desde cualquier carpeta:

```bash
python -m http.server 8000 --bind 127.0.0.1 --directory /home/nicocruz_04/Projects/D-Void
```

Abrir `http://127.0.0.1:8000/2026-10/15-fashion-week.html`. Servir desde la raíz para resolver `/Resources/...`. Este servidor no aplica rewrites de Vercel: `/fashion-week` no es la URL local equivalente. Detener con Ctrl+C. No enviar formularios de producción desde una vista previa.

Comprobado con un servidor HTTP temporal en loopback: HTML 200 (46 230 bytes), logo 200 (131 068 bytes). El servidor temporal quedó detenido. Esto verifica disponibilidad de archivos, no representación visual ni compatibilidad móvil/GHL.

`node verify.mjs 2026-10/15-fashion-week.html --static` devuelve `SKIP: not a GHL bundle` y salida 1: limitación del verificador, no prueba de HTML inválido. El script inline de Fashion Week pasó `node --check` tras extracción temporal sin ejecutarlo. No se enviaron registros. No se midieron Core Web Vitals, no se realizaron pruebas visuales en navegador ni pruebas end-to-end.

Para bundles existentes, `node unpack.mjs index.html --check` permite un round-trip de solo lectura (comando documentado, no ejecutado en esta etapa). Los defaults de scripts apuntan a `home_v2.html`/`home.html`, ausentes; `verify.mjs` también mantiene títulos históricos. No ejecutar el flujo por defecto a ciegas. Fashion Week se edita como HTML plano en una etapa posterior y necesita una verificación adecuada a ese formato.

## Entrega e integraciones

El usuario confirma entrega de un HTML acompañado de assets a un compañero que lo inserta en GoHighLevel. El repositorio contiene tanto bundles como HTML plano: no se conoce el mecanismo real usado para Fashion Week. Deben acordarse contenedor, ejecución de scripts, hosting de assets y contrato de registro antes de certificar la entrega. Vercel sirve como publicación del repositorio; no demuestra compatibilidad GHL.

`reservas.html` carga por GET `https://app-dvoid-prod-rdbpg.azurewebsites.net/reservar/embed`. Solo ajusta altura al recibir `{tipo: 'dvoid:alto', alto: ...}` desde ese origen. Campos, método de envío, payload, validación, persistencia y confirmaciones internas del servicio no están en el repositorio y **no fueron verificados en producción**. No copiar su contrato supuesto al evento. El wrapper comprueba origen, pero no `e.source` ni el tipo/rango de `alto`.

La comparación de formularios y las simulaciones encontradas están en [la ficha del evento](events/2026-10-15-fashion-week.md). Preservar integraciones conocidas y distinguir una conexión real de una confirmación visual local.

## Organización propuesta — sin aplicar

```text
events/2026-10-15-fashion-week/
  references/            # originales, brief y procedencia; no publicación
  assets/                # medios aprobados y optimizados para publicar
  src/                   # HTML/CSS/JS editables nativos
  delivery/
    index.html           # HTML final para el integrador
    assets/              # solo los recursos necesarios para esta entrega
    README.md            # rutas, integración y pruebas de entrega
```

Mantener `Resources/DVOID/` y otros recursos compartidos en su ubicación actual. En una etapa posterior acordar si la entrega copia únicamente los compartidos utilizados o referencia un hosting estable. El HTML final puede llevar CSS/JS inline si el método GHL lo necesita. No duplicar fuentes de verdad inadvertidamente: definir generación/copia de entrega antes de implementar esta estructura. Documentación estable en `docs/events/`. Por ahora todos los archivos permanecen donde están, incluidas las referencias originales.

## Skills y etapas posteriores

Leída primero y aplicada solo para inspección/diagnóstico: `/home/nicocruz_04/.agents/skills/redesign-existing-projects/SKILL.md`. Su paso “Fix” queda fuera del alcance por instrucción del usuario; sugerencias de Picsum, fuentes, librerías o estética genérica no prevalecen sobre el brief y las restricciones.

Única skill adicional seleccionada para esta etapa: `/home/nicocruz_04/.agents/skills/web-perf/SKILL.md`, limitada a dependencias y análisis de código. No hay herramientas MCP de trazas DevTools disponibles; no se instaló ninguna. No hay métricas ni estimaciones inventadas. Se leyeron también las instrucciones de `impeccable` para evaluar su selección, pero **no se activó** su workflow: su launcher puede descargar un binario si falta y su documentación adicional no es necesaria para esta inicialización mínima. No se ejecutó ni instaló el launcher. La skill local `apple-design` fue localizada, no activada.

Secuencia propuesta:

1. Diseño: `redesign-existing-projects` para partir de la auditoría y preservar lo funcional. Tras confirmar dirección, `impeccable` (shape) puede ayudar a definir jerarquía y flujo; revisar entonces sus instrucciones y usar solo herramientas ya disponibles. Investigar webs oficiales de referencias relevantes (por ejemplo, la marca citada en el brief), explicar decisiones de composición/fotografía/tipografía sin copiar sus diseños ni assets. No se hizo esa investigación en esta etapa.
2. Implementación: `impeccable` (harden/adapt) si sigue siendo compatible, enfocada en formulario, estados, teclado, móvil y CSS aislado. Si requiere descargas o servicios no disponibles, seguir con inspección del código, Python/Node/Chromium instalados; no instalar dependencias. HTML/CSS/JS nativos y pruebas con integración de ensayo, nunca registros de prueba a producción.
3. Rendimiento/entrega: `web-perf`, medir después de tener medios definitivos e integración representativa; usar herramientas existentes. Sin trazas disponibles, registrar limitación y pruebas de red/código útiles sin atribuir resultados de Lighthouse ni Core Web Vitals. Validar en Instagram/WhatsApp y en el mecanismo GHL acordado.

## Dudas que bloquean etapas posteriores

1. ¿Cómo insertará el compañero el HTML en GHL y qué integración/entorno de prueba guardará los registros (campos, payload, respuesta válida y eventual emisión de pases)?
2. ¿Cuál es la edad mínima admitida y cuáles extras del formulario son obligatorios (edad, Instagram y acompañantes)? El brief los sugiere, el prototipo los exige y usa mínimo 18.
3. ¿Qué promociones, experiencias y medios oficiales están aprobados para la versión final, y cuál es el canal de contacto/reserva de mesa autorizado? Hasta confirmarlos, no publicar experiencias ni contactos inventados.
