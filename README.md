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
por el material real del cliente antes de publicar. Las imágenes/video reales del proyecto de
diseño superan el límite de tamaño que se puede sincronizar automáticamente, así que se
incluyeron ilustraciones vectoriales (SVG) equivalentes en su lugar, en la misma paleta de
marca y en las mismas rutas/tamaños, para que el sitio se vea completo y funcional. Antes de
publicar, reemplaza:

| Archivo actual (placeholder)              | Reemplazar por                                              |
|--------------------------------------------|---------------------------------------------------------------|
| `assets/img/logo-polcura.svg`              | Logo real de Polcura Export                                   |
| `assets/img/hero-placeholder.svg`          | Video de uvas en el campo (`En_la_segunda_toma_de_las_uvas.mp4`) + foto de poster |
| `assets/img/presentacion-campo.svg`        | Foto de brote joven en el campo al amanecer                   |
| `assets/img/producto-cerezas.svg`          | Foto de selección de cerezas en packing                       |
| `assets/img/producto-uvas-kiwi.svg`        | Foto de uvas/kiwi/cerezas frescas                              |
| `assets/img/productores.svg`               | Foto de productor con cajón de cerezas recién cosechadas       |

Si se reemplaza `hero-placeholder.svg` por un video real, cambia el `<img>` del hero (`#hero-media`
en `index.html`) por un `<video autoplay muted loop playsinline poster="...">`.

## Datos a validar por Polcura antes de publicar

- Cifras de la franja de confianza ("+15 años", etc.)
- Datos de contacto en el footer (correo, teléfono, dirección)
- El formulario de contacto no tiene integración de envío real todavía: al enviar, simula un
  estado de "enviado" localmente. Debe conectarse a un backend/servicio de email antes de producción.
