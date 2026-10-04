# Staging y entrega — Sitio Water Tech

Este documento describe cómo se prepara y publica una **versión de revisión**
del sitio para el cliente. Aplica solo al **website**. No toca el CRM de Water
Tech ni el dominio original.

---

## 1. Cómo se genera el paquete

```bash
bash tools/build-staging.sh
```

Produce:

| Salida | Qué es |
|---|---|
| `staging/` | Copia limpia del sitio, lista para subir. |
| `water-tech-staging.zip` | El mismo contenido comprimido (~11 MB), por si se envía por correo. |

Ambos son artefactos de build: **no se versionan** (están en `.gitignore`) y se
pueden regenerar cuando se quiera desde el código aprobado.

## 2. Requisitos técnicos

El sitio es **estático**: HTML, CSS, JS y assets. No hay framework, build,
compilador ni base de datos.

- **Servidor**: cualquiera que sirva archivos estáticos (Apache, Nginx, hosting
  compartido, Netlify, Vercel, Cloudflare Pages…).
- **Raíz del sitio**: la carpeta `staging/` se sube como raíz del dominio o
  subdominio. Las rutas son relativas, así que también funciona dentro de una
  subcarpeta (por ejemplo `midominio.com/preview/`).
- **HTTPS**: recomendado (Google Fonts y las llamadas al formulario funcionan
  igual sin él, pero el navegador marcará el sitio como no seguro).
- **No requiere** PHP, Node, Python ni permisos de escritura en el servidor.

## 3. Qué cambia respecto al sitio de producción

El script aplica tres ajustes **solo en el paquete de revisión**:

1. **No indexable**: `robots.txt` con `Disallow: /` y
   `<meta name="robots" content="noindex, nofollow">` en las 15 páginas.
   Así el cliente puede revisar sin que Google empiece a mostrar el sitio.
2. **Formularios inertes**: se elimina la URL de Google Apps Script, de modo
   que **ninguna prueba del cliente escribe filas en la hoja de cálculo real**.
   Al enviar, el mensaje es explícito:
   *"Vista previa de revisión: el envío del formulario está desactivado en este
   entorno."* Lo mismo aplica al modal de WhatsApp.
3. **Sin archivos de desarrollo**: no se copian `.git`, `.codex`, `AGENTS.md`,
   `_import_preview/`, `qa-screenshots/`, `tools/` ni `.DS_Store`.

Lo que **no** cambia: diseño, textos, imágenes, menú, animaciones y enlaces. El
cliente ve exactamente el sitio que está aprobado en el repositorio.

## 4. Antes de publicar

- [ ] `bash tools/build-staging.sh` sin errores.
- [ ] Revisar que `staging/` no contenga archivos de desarrollo.
- [ ] Confirmar que las 15 páginas cargan (incluido el pie y el menú móvil).
- [ ] Revisar en móvil, tablet y escritorio.
- [ ] Confirmar que el formulario muestra el aviso de "vista previa" y no envía.
- [ ] Tener claro el punto de rollback (ver sección 7).

## 5. Cómo publicar

Cualquiera de estas opciones sirve; el contenido es el mismo:

**a) Subir por FTP/panel del hosting** — subir el contenido de `staging/` a la
raíz del dominio o subdominio de revisión.

**b) rsync (si hay acceso SSH)**
```bash
rsync -avz --delete staging/ usuario@servidor:/ruta/al/dominio-de-revision/
```

**c) Hosting estático temporal** (Netlify, Vercel, Cloudflare Pages, Surge) —
subir la carpeta `staging/` o el zip. Conviene activar la protección por
contraseña si la plataforma lo permite, además del `noindex` ya incluido.

> **Protección adicional recomendada**: cuando el contenido es del cliente, lo
> ideal es que la URL de revisión pida usuario y contraseña (opción habitual en
> Netlify/Vercel, o `.htpasswd` en Apache). El sitio no incluye credenciales.

### Qué necesitamos para publicarlo

Para hacerlo desde aquí hace falta **una de estas dos cosas**:

1. Los datos del servidor de revisión: host, ruta, método (FTP/SSH) y
   credenciales; o
2. Autorización explícita para usar un servicio temporal concreto (por ejemplo
   Netlify o GitHub Pages) sabiendo que el sitio quedaría accesible por URL
   pública, aunque con `noindex`.

Sin eso, la entrega se queda en el paquete listo para subir.

## 6. Integraciones externas del sitio

| Integración | Dónde vive | Nota |
|---|---|---|
| Formulario → Google Apps Script → Google Sheets | `contacto.html` (`data-endpoint`) y `site.js` (`LEADS_ENDPOINT`) | **Desactivada en staging.** Al pasar a producción hay que restaurar la URL. |
| WhatsApp (botón flotante y modal) | `site.js` (`WHATSAPP_NUMBER`) | Solo se abre al pulsarlo el usuario. |
| Teléfonos y correo | `site.js`, `contacto.html` | Enlaces `tel:` y `mailto:`. |
| Google Fonts (Outfit) | `<link>` en las 15 páginas | Requiere conexión a internet. |
| Facebook e Instagram | `site.js` (pie) | Enlaces externos. |

No hay secretos ni credenciales dentro del sitio: todo el código es público por
naturaleza. El único dato sensible es la URL del Apps Script, que es un endpoint
de escritura y conviene proteger del lado de Google (validación de origen) antes
de publicar en producción.

## 7. Rollback

El punto de retorno es el repositorio, no la copia subida:

- Último estado aprobado: commit **`b3b9c20`** (rama `main`, sincronizada con
  GitHub).
- Para volver a generar el paquete desde cualquier commit:
  ```bash
  git checkout <commit> && bash tools/build-staging.sh
  ```
- El paquete de revisión se puede reemplazar por completo en el servidor: no
  guarda estado propio.

## 8. Después de la revisión del cliente

1. Recoger el feedback y aplicarlo en local, con su ciclo de verificación.
2. Regenerar el paquete y volver a subirlo.
3. Cuando el cliente apruebe, preparar la entrega final: restaurar el endpoint
   del formulario, retirar el `noindex` y publicar en el dominio correspondiente
   (eso requiere autorización explícita).

## 9. Pendientes conocidos del sitio

Estos puntos no bloquean la revisión visual, pero conviene cerrarlos antes de
producción:

- ~788 líneas de CSS heredado sin uso (32 % de `styles.css`).
- `_import_preview/` (90 MB de material fuente) sigue versionado en el repo.
- 3 videos MP4 (~2,4 MB) sin comprimir; no hay `srcset`/AVIF en las imágenes.
- El carrito (`carrito.html`) sigue con la plantilla antigua y sin forma de
  agregar productos; pendiente de decisión.
- La entradilla de `soluciones.html` está redactada como nota interna.
