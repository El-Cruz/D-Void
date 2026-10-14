# Hollywood Never Dies — dirección responsive

## Dirección vigente — primera iteración scroll-based (2026-10-10)

La nueva instrucción del usuario sustituye las propuestas históricas inferiores para Intro, Hero, Red Carpet y Mutation. Ahora comparten un fondo fullscreen y un stage sticky de 100svh dentro de un recorrido de 270svh móvil / 360svh desktop. Scroll nativo, sin controles de reproducción, overlay de entrada, timeline automática ni referencias públicas a graduación. Identidad: D-VOID — HOLLYWOOD NEVER DIES.

El progreso controla cámara, título, exposición clean/undead, luz y haze mediante un único scheduler rAF por eventos. Reduced motion usa solo opacidad, sin desplazamientos ni flashes. Sin JS, o si el texto ampliado hace que el stage exceda la pantalla, se conserva la llegada en flujo normal. El master horizontal fullscreen pierde invitados laterales en móvil; no se generó otro asset.

Dresscode, Box Office y Golden Ticket conservan su composición y lógica. Su conversión se abordará únicamente después de validar estas primeras escenas. Las referencias inferiores a botones de entrada/reproducción, vídeos, graduación o prohibición de sticky son antecedentes, no instrucciones vigentes para esta iteración.

## Documento anterior (histórico)

Instrucción global del usuario, vigente para futuras fases. Objetivo: teléfono cinematográfico y claro; laptop editorial y envolvente, con calidad equivalente. Esta documentación no implica implementación ni regeneración de assets.

## Composición y safe zones

Diseñar por contenido, no por una única proporción. Cada asset debe declarar qué elementos deben sobrevivir en 16:9, 4:5 y 9:16, qué zona admite HTML y qué puede salir del encuadre. No depender de una esquina ni colocar elementos críticos junto a bordes superiores/inferiores. Un retrato de pareja tiene una safe zone distinta de un salón con personajes laterales; un ticket no admite recorte de contenido.

En un master 16:9, un recorte vertical 9:16 a altura completa retiene aproximadamente el 31,6% del ancho. Centrando ese recorte se conserva la puerta del salón, pero pueden desaparecer los invitados undead: la perspectiva sola no conserva el relato. El recorte 4:5 retiene aproximadamente el 45% del ancho. Usar estos límites para decidir una nueva composición; no garantizar adaptabilidad por prompt.

## Decisiones propuestas para los assets actuales

| Asset | Teléfono | Laptop | Variante específica |
| --- | --- | --- | --- |
| The Last Premiere clean y sus versiones undead | Composición vertical que conserve alfombra, puerta y presencia de invitados en ambos lados. Las dos etapas deben compartir exactamente el mismo encuadre dirigido. | Masters horizontales amplios, con los grupos laterales y centro para título/CTA. | **Sí, para un hero vertical a pantalla completa**: el recorte central elimina buena parte del contraste humano/undead. Pendiente producir, no autorizado por esta directriz. |
| Pareja Chaplin / Marilyn | Retrato 3:4 completo o 4:5 revisado, sin cortar bowler, rostros, bastón ni vestido. Texto fuera de las caras. No forzar cover a 9:16 si corta la pareja. | Imagen vertical en una composición editorial junto al texto; no convertirla automáticamente en fondo horizontal. | **No para una sección editorial**: el master vertical es adecuado como base. **Sí si se exige fondo 16:9 de pantalla completa**, porque un recorte pierde cuerpo y accesorios. |
| The Last Box Office | Encuadre dirigido de taquilla/taquillero con formulario en superficie propia, legible y de altura flexible. El panel de la fotografía no impone la altura del formulario. | Plano amplio como ambiente, con formulario distribuido sin tapar al taquillero. | **No inicialmente si se muestra la imagen en su proporción y se apila el formulario**. **Sí si el diseño exige conservar toda la ventanilla como fondo 9:16**; el recorte central estrecha el marco. |
| The Golden Ticket | Ticket completo con datos y QR redistribuidos en HTML; marco adaptable a la altura del contenido, nombres largos y zoom de texto. | Cuerpo horizontal y talón derecho para QR, con espacio generoso. | **Sí, composición móvil del componente/marco**. No basta reducir el PNG 2,2:1. No implica necesariamente otra imagen generada: puede reutilizarse el lenguaje ornamental en CSS o piezas del marco. |

Estas decisiones parten de los encuadres y proporciones actuales, no de pruebas de integración. No se consideran los masters actuales automáticamente certificados para móvil.

## Jerarquía y comportamiento

Móvil: títulos con saltos dirigidos, párrafos cortos, ritmo de scroll fluido y bloques compactos sin ocultar la información necesaria. Reservar espacio para textos dinámicos y teclado. Controles de al menos 44×44 y cuerpo legible sin zoom obligado. La frase HOLLYWOOD NEVER DIES conserva su contenido; ajustar composición antes de sustituirla.

Laptop: márgenes más amplios, composición editorial, profundidad y overlays distribuidos. La imagen debe tener presencia sin imponerse a lectura y acciones.

Vídeo: masters separados de exportaciones web, versiones ligeras por dispositivo y posters que ya transmitan la escena. Un solo vídeo activo; pausa al salir de vista y cuando la pestaña se oculta. Preferir poster al escribir si la animación distrae. Movimiento reducido conserva narrativa y confirmaciones mediante imágenes y estados inmediatos. No reproducir vídeo dentro del ticket ni hacer depender la confirmación del render.

## Validación y entrega

Revisar primero teléfono (referencia 375×812, con controles adicionales a 360/390/430 px), después tablet y laptop (por ejemplo 768, 1280 y 1440 px). Verificar proporciones, ausencia de overflow, contraste, nombres largos, zoom de texto, teclado abierto y contenido útil sin JS. Son tamaños de revisión, no breakpoints obligatorios. Probar GHL y navegadores internos en la fase de integración.

Para cada propuesta o entrega usar tres líneas breves:

- **Móvil:** encuadre, jerarquía o comportamiento específico.
- **Laptop:** composición y distribución.
- **Variante específica:** sí/no, razón y estado (propuesta, producida o validada).

Si móvil pierde un elemento crítico, resolverlo antes de avanzar. Esta instrucción no autoriza generar variantes ni gastar créditos sin la autorización aplicable a cada fase.
