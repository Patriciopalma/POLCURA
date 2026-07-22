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
assets/img/*.jpg, *.png     Fotos y logo reales del cliente (procesados/optimizados, ver abajo)
```

## Cómo verlo localmente

No requiere instalación ni build. Sirve la carpeta con cualquier servidor estático, por ejemplo:

```
python3 -m http.server 8000
```

y abre `http://localhost:8000`.

El mapa de mercados (`mapa-mercados.html`) carga D3 y un archivo TopoJSON desde CDNs externos,
por lo que necesita conexión a internet para dibujarse.

## Fotos (ya montadas)

Todas las fotos de producto/secciones ya son reales, entregadas por el cliente vía Drive y
optimizadas a JPEG (~150-210 KB cada una, bajado de PNGs de 1.7-2.6 MB):

| Archivo                                | Sección                                   |
|-----------------------------------------|--------------------------------------------|
| `assets/img/presentacion-campo.jpg`     | Empresa — brote joven en el campo           |
| `assets/img/producto-cerezas.jpg`       | Producto Cerezas                            |
| `assets/img/producto-uvas-kiwi.jpg`     | Producto Uvas y Kiwi                        |
| `assets/img/productores.jpg`            | Productores — productor con cajón de cerezas|

Nota: `producto-cerezas.jpg` es una foto de cerezas en la rama (no en línea de packing como
sugería el texto alt original); se ajustó el alt para que describa la foto real.

### Logo (ya montado)

`assets/img/logo-icon-white.png` (para fondos oscuros: header, menú móvil, footer) y
`assets/img/logo-icon-color.png` (variante a color, disponible para fondos claros) salieron del
logo real entregado por el cliente vía Drive. El archivo original tenía dos problemas que se
corrigieron al procesarlo:

- Venía en un lienzo de 4320×944 px con el ícono ocupando solo una franja angosta a la izquierda
  — se recortó al contenido real y se redujo a 200px de alto (suficiente para retina a los
  tamaños que se usa, ~28-34px).
- El fondo "transparente" en realidad era un relleno blanco opaco cubriendo todo el lienzo (por
  eso se veía "en blanco" al pegarlo en un chat) — se regeneró la transparencia real a partir del
  contraste de color/alfa.

El archivo entregado solo traía el ícono (sin el texto "Polcura Export"), así que el wordmark se
armó en HTML/CSS (`.logo-wordmark` en `index.html`/`style.css`) en vez de quedar quemado en la
imagen — así el texto se ve nítido a cualquier tamaño y es fácil de ajustar. También se generó
`assets/img/favicon.png` a partir del ícono a color.

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
