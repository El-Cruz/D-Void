# Freak Show — apertura continua del telón

03/10/2026. Página: `2026-10/24-freak-show.html`. Iteración limitada a entrada/transición, sobre los arreglos responsive anteriores. Fashion Week y handler de registro intactos; sin instalaciones, commits ni push.

## Diagnóstico reproducido

El cierre anterior usaba `.entry-closed .stage,.entry-closed .footer{display:none}`. Mediciones a 0/300/800/1400 ms tras clic: stage seguía display:none. A 1850 ms ya era flex. Un timeout de 1700 ms quitaba la entrada del flujo y renderizaba el interior de golpe; navbar sin transición y cortinas de 1550 ms. No había redirecciones. Recursos originales incrustados en el HTML, sin solicitudes remotas esenciales. La causa era la conmutación de layout al final del temporizador.

## Secuencia actual

Interior renderizado detrás de una entrada fija, fuera de foco con inert. Durante cierre se limita solo el contenedor de escena y scroll de html/body; al terminar se retiran esas restricciones sin cambiar posición del hero ni llamar a scrollTo. El telón permite scroll propio si el contenido cerrado supera la altura. Los arreglos de columnas, anchos, campos 16 px y ticket se conservan.

Un solo inicio idempotente: botón deshabilitado inmediatamente, tarjeta se desvanece en 180 ms, foto de fondo en 240 ms bajo las dos cortinas opacas. Cortinas viajan hacia los lados durante 1000 ms. Navbar sube de opacidad .25 a 1 entre 600–1000 ms; copy y máquina de .55 a 1 entre 450–1000 ms. El interior está presente durante toda la apertura, sin fondo vacío ni loaders. Transform y opacity, Web Animations API nativa. Imágenes interiores existentes con lazy/async, sin assets nuevos.

Finalización por las promesas finished de ambas cortinas, también resuelta si se cancelan; catch ante error y watchdog de 1200 ms solo como recuperación. Movimiento reducido revela inmediatamente. Al terminar: telón hidden/inert/aria-hidden, interior deja inert y foco preventScroll en h1. No existe reapertura en este flujo.

Entrada reducida a D-VOID, Freak Show, 24 de octubre y Entrar al Freak Show. Interior, promociones y condiciones sin cambios. Handler submit y strings de assets incrustados comparados byte a byte: idénticos.

## Verificación

Chromium localhost sin caché a 360×800, 390×844, 430×932, 844×390 y 1440×900. Stage flex antes del clic y en todas las muestras cada 50 ms. Hero y stage conservan su posición durante/final; scrollY 0. Cero desplazamientos de layout registrados durante secuencia y sin overflow horizontal. Desbloqueo medido entre 1050–1100 ms (muestreo y captura incluyen tiempo adicional).

Capturas intermedias móvil/escritorio: las cortinas revelan el interior, sin frame vacío observado. Navbar aumenta opacidad en la misma secuencia. Doble clic y Escape concurrente no duplican la apertura. Enter con teclado, movimiento reducido inmediato y foco freak-heading. Cancelar las animaciones abre el interior y retira inert. Red lenta emulada: 200 ms de latencia y 500 KB/s, HTML terminado antes de activar, ningún recurso HTTP adicional durante la apertura y acceso correcto. No demuestra fluidez en teléfonos reales ni mide cada frame del compositor; los assets siguen incrustados en un HTML grande.

Capturas en esta carpeta. Preview: http://127.0.0.1:8000/2026-10/24-freak-show.html

Pendiente: Safari/iOS/Android físicos, barras/teclado reales y lector de pantalla. Contrastes secundarios pendientes de la auditoría anterior permanecen fuera de esta etapa.
