# Polcura Export — sitio web

Implementación estática (HTML + CSS + JS, sin build step) del diseño **"Polcura Export"**
creado en Claude Design. El sitio es una landing page de una página con navegación por anclas,
selector de idioma ES/EN, formulario de contacto con validación, y un mapa interactivo de
mercados de exportación.

## Estructura

```
index.html                  Página principal
mapa-mercados.html          Mapa de mercados (se carga en un <iframe>, dibuja con D3 + world-atlas)
assets/css/style.css        Estilos (con breakpoints en 1099px y 699px, igual que el diseño original)
assets/js/main.js           Interactividad: menú móvil, scroll header, ES/EN, reveals, contador
                             animado de años, layout del proceso, validación del formulario
assets/img/*.svg            Ilustraciones de reemplazo (ver abajo)
```

## Cómo verlo localmente

No requiere instalación ni build. Sirve la carpeta con cualquier servidor estático, por ejemplo:

```
python3 -m http.server 8000
```

y abre `http://localhost:8000`.

El mapa de mercados (`mapa-mercados.html`) carga D3 y un archivo TopoJSON desde CDNs externos,
por lo que necesita conexión a internet para dibujarse.

## Assets pendientes de reemplazo

El archivo de diseño original ya señalaba que varios recursos son *placeholders* a reemplazar
por el material real del cliente antes de publicar. Las imágenes reales del proyecto de diseño
superan el límite de tamaño que se puede sincronizar automáticamente, así que se incluyeron
ilustraciones vectoriales (SVG) equivalentes en su lugar, en la misma paleta de marca y en las
mismas rutas/tamaños, para que el sitio se vea completo y funcional. Antes de publicar, reemplaza:

| Archivo actual (placeholder)              | Reemplazar por                                              |
|--------------------------------------------|---------------------------------------------------------------|
| `assets/img/logo-polcura.svg`              | Logo real de Polcura Export                                   |
| `assets/img/presentacion-campo.svg`        | Foto de brote joven en el campo al amanecer                   |
| `assets/img/producto-cerezas.svg`          | Foto de selección de cerezas en packing                       |
| `assets/img/producto-uvas-kiwi.svg`        | Foto de uvas/kiwi/cerezas frescas                              |
| `assets/img/productores.svg`               | Foto de productor con cajón de cerezas recién cosechadas       |

Para cada uno, mantén el mismo nombre de archivo (o actualiza la ruta correspondiente en
`index.html`) y reemplaza el `<img>` por la foto real; el CSS ya está pensado para `object-fit: cover`
así que cualquier proporción razonable se recorta bien.

### Video del hero

`assets/video/hero-uvas.mp4` (+ poster `assets/img/hero-poster.jpg`, extraído del segundo 1 del
video) ya están montados y funcionando con autoplay/muted/loop. **Ojo:** el video recibido parece
generado por IA (se ve el ícono/marca de agua tipo "sparkle" de Gemini en la esquina inferior
derecha, y está compuesto de varios clips distintos unidos con una transición). Sirve como
placeholder de alta calidad por ahora, pero antes de publicar en producción debería reemplazarse
por footage real filmado en terreno, sin marca de agua. Al reemplazarlo, conserva el mismo nombre
de archivo o actualiza el `src`/`poster` del `<video id="hero-media">` en `index.html`.

## Datos a validar por Polcura antes de publicar

- Cifras de la franja de confianza ("+15 años", etc.)
- Datos de contacto en el footer (correo, teléfono, dirección)
- El formulario de contacto no tiene integración de envío real todavía: al enviar, simula un
  estado de "enviado" localmente. Debe conectarse a un backend/servicio de email antes de producción.
