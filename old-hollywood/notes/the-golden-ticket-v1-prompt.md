# The Golden Ticket — v1

Herramienta: ImageGen integrada, con `transparent_background: true`. Una sola imagen; sin servicios externos de pago, Higgsfield, vídeo ni integración. No se sustituyeron assets existentes ni se modificó HTML/CSS/JS.

Arquitectura leída: `experience-architecture.md`. Referencias visuales inspeccionadas y usadas para continuidad: `the-last-box-office-v1.png`, `skeleton-couple-charlie-marilyn-v1.png` y `the-last-premiere-master-v2-undead.png`. Solo guían materiales, color y lenguaje visual; no se insertaron las escenas en el ticket.

Resultado: `../assets/img/the-golden-ticket-v1.png`. PNG RGBA nativo de **1860 × 845 px**, relación **2,201:1**, sin reescalado. SHA-256: `f08cd656b47debda0816998e6ee6e3364628c2c6add6656a71e234384e497647`.

Revisión visual: papel ivory, marco dorado con geometría Art Déco y motivos pequeños de calaveras/rosas en esquinas. Gran cuerpo izquierdo vacío y talón derecho vacío separado por perforación ornamental. Sin texto, logos, nombres, fechas, QR, códigos de barras, botones ni campos generados. La decoración tiene relieve y brillo perceptibles; el encuadre es frontal. Es una propuesta gráfica, no un componente responsive validado.

En integración futura, mantener textos y QR como HTML/elementos independientes y adaptar el marco al contenido en móvil, en vez de reducir todo el ticket hasta volver ilegibles los datos. No existe código de acceso ni confirmación real en este asset. Revisar el borde alfa al componer sobre el fondo definitivo; se conserva la salida original de ImageGen sin retoques.

## Prompt exacto

Use case: product-mockup / luxury print asset.
Generate exactly ONE finished flat graphic base of THE GOLDEN TICKET for the D-VOID HOLLYWOOD NEVER DIES experience. This is ONLY the blank ornamental substrate on which real HTML text and a real QR code will later be placed. Absolutely NO typography or codes in this image.

FORMAT AND VIEW: a horizontal vintage cinema admission ticket, width-to-height approximately 2.2:1. Ticket occupies nearly the entire canvas with a small even transparent exterior margin. TRUE TRANSPARENT alpha outside the ticket, NOT a checkerboard pattern, table, photographic scene, or baked background. Ticket paper itself is opaque ivory. Perfect frontal orthographic view, edges parallel to image edges, zero tilt, zero perspective, no curled corners, no extruded 3D object, no cast shadows outside the paper, no hands or props. Highest available native image quality.

REFERENCE ROLES: the supplied Last Box Office, skeletal couple and undead ballroom images are COLOR, MATERIAL and ART-DIRECTION references only. Translate their 1940s cinema architecture, aged brass, champagne warmth, deep burgundy and refined macabre into tasteful engraved ticket ornament. DO NOT put scenes, buildings, portraits or characters on the ticket.

MATERIAL: premium warm ivory cotton paper #F2ECE2, gently aged but clean and well preserved, fine low-contrast paper fibers, subtle letterpress embossing and restrained antique-gold foil #B98A38 with champagne #E1C18B glints. Deep burgundy #3A0707 and near-black #070707 only as very fine accent details. Not shiny yellow metal, not burned parchment, no heavy grime or stains.

OUTLINE AND ORNAMENT: authentic collectible 1940s movie-palace premiere ticket silhouette with restrained geometric corner steps and small traditional ticket-edge notches if appropriate. Precise symmetrical peripheral ornament: thin parallel gold keylines, stepped Art Deco cinema-facade geometry, miniature fan/sunburst details at the corners and fine vintage engraved lines. Decoration concentrated in the outer 6–8 percent of the paper area. High-end graphic design, very generous clean ivory interior, disciplined ornament, no baroque overload. Movie-theatre ticket character, not currency, casino voucher, supermarket receipt, carnival ticket, modern event pass or wedding invitation.

SUBTLE HALLOWEEN DETAILS: tiny engraved skull medallions integrated into matching corner ornaments, delicate stylized bone-like linework woven into gold geometry, two small deep-burgundy dark rose details at peripheral corners. Skull motifs must be genuinely miniature, seen only on close inspection. Refined gothic undertone inside the Art Deco border, not large skeleton drawings. No central emblem competing with future text.

BLANK LAYOUT FOR LATER HTML:
- Left main body approximately 72 percent of ticket width; right reserved stub approximately 24 percent, separated by a single subtle antique-gold vertical rule or fine perforation-like line.
- Upper main body: a completely blank low-texture ivory area for the future official logo. Do NOT draw a logo, label or logo placeholder.
- Middle main body: a wide uninterrupted blank ivory title area for a future three-word headline. Do NOT write any words, letters or glyphs.
- Lower main body: generous blank ivory surface for the future guest name, guest count, event date and reservation code. No labels, fake data, input fields, lines suggesting a form, buttons, tables or placeholder typography.
- Right stub: a clean plain rectangular/square ivory field large enough for a real QR code later, with ample blank quiet-space clearance. At most a thin understated outer gold frame far from that field. Inside must remain completely empty: no QR-like pixels, finder squares, barcode lines, numbers, marks, icons or sample code.
Keep the composition understandable as a physical unprinted luxury ticket template, not a website UI.

RESPONSIVE DESIGN INTENT: broad readable blank surfaces, ornament at edges that can later be recreated separately in CSS, no fine illustration under future dynamic content. The image is a design foundation, not a screenshot of a responsive component.

STRICT EXCLUSIONS: all text, pseudo-text, gibberish, logos, initials, dates, names, serial numbers, printed headings, QR codes, barcodes, buttons, fake form fields, currency symbols, banknote guilloche patterns, casino suits/chips, wedding calligraphy, huge skulls, gore, blood, cartoon, neon, clutter, generic Halloween poster style, external shadows, background objects, checkered transparency simulation.
Deliver a SINGLE blank horizontal luxury ticket with actual transparent exterior and opaque ivory paper.
