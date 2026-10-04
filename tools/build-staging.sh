#!/usr/bin/env bash
#
# Genera la carpeta staging/ lista para subir a un servidor de revisión.
#
# El sitio es estático: no hay build ni dependencias. Este script solo
# empaqueta los archivos del sitio y aplica los ajustes propios de un
# entorno de revisión:
#   1. noindex (robots.txt + meta robots) para que no aparezca en Google.
#   2. Formularios neutralizados: no escriben en la hoja de cálculo real.
#   3. Sin archivos de desarrollo (.git, .codex, capturas, material fuente).
#
# Uso:  bash tools/build-staging.sh
# Salida: staging/  y  water-tech-staging.zip
#
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/staging"
ZIP="$ROOT/water-tech-staging.zip"

# Salvaguarda: solo se borra una carpeta llamada "staging" dentro del repo.
if [ -e "$OUT" ]; then
  case "$OUT" in
    "$ROOT"/staging) rm -rf "$OUT" ;;
    *) echo "Ruta inesperada, abortando: $OUT" >&2; exit 1 ;;
  esac
fi
mkdir -p "$OUT"

cd "$ROOT"

# 1. Copia solo lo que el sitio necesita para funcionar.
cp ./*.html "$OUT"/
cp ./*.css "$OUT"/
cp ./*.js "$OUT"/
# El pie que inyecta site.js usa logo-watertech.png de la raíz: se copian
# todas las imágenes sueltas de la raíz para no dejarnos ninguna.
cp ./*.png ./*.jpg ./*.jpeg ./*.ico ./*.svg "$OUT"/ 2>/dev/null || true
mkdir -p "$OUT/assets"
rsync -a --exclude '.DS_Store' assets/ "$OUT/assets/"

# 2. Nada de indexación mientras sea un entorno de revisión.
printf 'User-agent: *\nDisallow: /\n' > "$OUT/robots.txt"
perl -pi -e 's{<head>}{<head>\n    <meta name="robots" content="noindex, nofollow" />}' "$OUT"/*.html

# 3. Formularios inertes: sin endpoint no se escribe nada en la hoja real.
perl -pi -e 's{https://script\.google\.com/macros/s/[A-Za-z0-9_\-]+/exec}{}g' \
  "$OUT"/contacto.html "$OUT"/site.js
perl -pi -e 's{No pudimos enviar el formulario en este momento\. Escríbenos por WhatsApp o correo y lo resolvemos enseguida\.}{Vista previa de revisión: el envío del formulario está desactivado en este entorno.}' \
  "$OUT"/site.js
perl -pi -e 's{No pudimos completar la solicitud\. Intenta otra vez o escríbenos por correo\.}{Vista previa de revisión: la solicitud no se envía desde este entorno.}' \
  "$OUT"/site.js

# 4. Paquete para enviar por correo o subir de una sola vez.
[ -e "$ZIP" ] && rm -f "$ZIP"
(cd "$OUT" && zip -qr "$ZIP" .)

echo "Listo."
echo "  carpeta : $OUT"
echo "  zip     : $ZIP ($(du -h "$ZIP" | cut -f1))"
echo "  archivos: $(find "$OUT" -type f | wc -l | tr -d ' ')"
