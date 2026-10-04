/* ============================================================
   WATER TECH — DONA DE AGUA DEL HERO
   El elemento circular de la referencia, dibujado en canvas 2D.

   En AGS el banner recorta un video submarino con un clip-path en
   forma de dona. Aqui no hay video: la dona se construye por capas.

   1. cuerpo: degradado de agua (blanco cian a azul profundo)
   2. sombra interior hacia el hueco, para que se lea el volumen
   3. reflejo especular que gira lento
   4. textura de puntos, el mismo lenguaje que la malla de la onda
   5. filo encendido en el borde exterior e interior

   Se pausa si la pestana no esta visible o si el hero sale del viewport.
   ============================================================ */
(() => {
  "use strict";

  const canvas = document.getElementById("wt-ring");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let W = 0;
  let H = 0;
  let cx = 0;
  let cy = 0;
  let R = 0;
  let rIn = 0;
  let running = false;
  let raf = 0;
  let t0 = 0;

  function resize() {
    const base = Math.min(window.devicePixelRatio || 1, 2);
    const area = window.innerWidth * window.innerHeight;
    const cap = area > 1400000 ? 1 : area > 900000 ? 1.25 : 1.75;
    const dpr = Math.min(base, cap);

    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    cx = W * 0.5;
    cy = H * 0.5;
    R = Math.min(W, H) * 0.47;
    // Hueco relativo parecido al de la referencia: el interior manda.
    rIn = R * 0.5;
  }

  // Silueta de la dona. Se reutiliza para recortar cada capa.
  function ringPath() {
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.arc(cx, cy, rIn, 0, Math.PI * 2, true);
    ctx.closePath();
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);

    /* ---- 1. Cuerpo: degradado de agua ---- */
    const body = ctx.createLinearGradient(
      cx + R * 0.8,
      cy - R * 0.95,
      cx - R * 0.85,
      cy + R
    );
    // Alphas mas bajos que antes: la foto que vive debajo de la dona
    // aporta el cuerpo real y este degradado solo lo tine de agua.
    body.addColorStop(0, "rgba(226, 250, 255, 0.72)");
    body.addColorStop(0.2, "rgba(176, 231, 252, 0.66)");
    body.addColorStop(0.46, "rgba(96, 172, 231, 0.6)");
    body.addColorStop(0.74, "rgba(36, 102, 182, 0.55)");
    body.addColorStop(1, "rgba(11, 42, 100, 0.5)");
    ringPath();
    ctx.fillStyle = body;
    ctx.fill("evenodd");

    /* ---- 2. Sombra hacia el hueco: da el volumen del tubo ---- */
    ctx.save();
    ringPath();
    ctx.clip("evenodd");
    const inner = ctx.createRadialGradient(cx, cy, rIn * 0.7, cx, cy, R);
    inner.addColorStop(0, "rgba(3, 16, 44, 0.5)");
    inner.addColorStop(0.42, "rgba(3, 16, 44, 0.2)");
    inner.addColorStop(1, "rgba(3, 16, 44, 0)");
    ctx.fillStyle = inner;
    ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
    ctx.restore();

    /* ---- 3. Reflejo especular que recorre el anillo ---- */
    const angle = -0.6 + t * 0.28;
    const hx = cx + Math.cos(angle) * R * 0.66;
    const hy = cy + Math.sin(angle) * R * 0.66;
    ctx.save();
    ringPath();
    ctx.clip("evenodd");
    const spec = ctx.createRadialGradient(hx, hy, 0, hx, hy, R * 0.95);
    spec.addColorStop(0, "rgba(255, 255, 255, 0.5)");
    spec.addColorStop(0.32, "rgba(198, 244, 255, 0.26)");
    spec.addColorStop(1, "rgba(198, 244, 255, 0)");
    ctx.fillStyle = spec;
    ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
    ctx.restore();

    /* ---- 4. Textura de puntos sobre el cuerpo ---- */
    ctx.save();
    ringPath();
    ctx.clip("evenodd");
    ctx.fillStyle = "rgba(236, 254, 255, 1)";
    const RN = 34; // anillos radiales
    const AN = 176; // puntos por anillo
    for (let ri = 0; ri <= RN; ri++) {
      const rad = rIn + (R - rIn) * (ri / RN);
      const size = 0.9 + 1.5 * (rad / R);
      for (let ai = 0; ai < AN; ai++) {
        const a = (ai / AN) * Math.PI * 2;
        const nx = Math.cos(a);
        const ny = Math.sin(a);

        // Luz desde arriba-derecha (como en la referencia) mas una
        // corriente que viaja por el tubo.
        const lit = 0.5 + 0.5 * (nx * 0.5 - ny * 0.78);
        const flow =
          0.5 + 0.5 * Math.sin(a * 3 - t * 1.05 + (ri / RN) * 5.2);
        // Un poco mas discretos que antes: las burbujas reales del video
        // tienen que leerse por encima de esta textura.
        const alpha = 0.05 + Math.pow(lit, 2.1) * 0.24 + flow * lit * 0.12;
        if (alpha <= 0.02) continue;

        ctx.globalAlpha = alpha > 0.6 ? 0.6 : alpha;
        ctx.fillRect(cx + nx * rad, cy + ny * rad * 0.94, size, size);
      }
    }
    ctx.restore();
    ctx.globalAlpha = 1;

    /* ---- 5. Filo encendido ---- */
    const line = Math.max(1, R * 0.012);
    ctx.save();
    ctx.lineWidth = line;
    ctx.strokeStyle = "rgba(220, 252, 255, 0.5)";
    ctx.beginPath();
    ctx.arc(cx, cy, R - line * 0.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(160, 230, 255, 0.34)";
    ctx.beginPath();
    ctx.arc(cx, cy, rIn + line * 0.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function loop(now) {
    if (!t0) t0 = now;
    draw((now - t0) / 1000);
    raf = window.requestAnimationFrame(loop);
  }

  function start() {
    if (running || reduced) return;
    running = true;
    raf = window.requestAnimationFrame(loop);
  }

  function stop() {
    if (!running) return;
    running = false;
    window.cancelAnimationFrame(raf);
    t0 = 0;
  }

  function init() {
    resize();
    if (reduced) {
      draw(1.6);
      return;
    }
    start();

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else start();
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        (entries) => entries.forEach((e) => (e.isIntersecting ? start() : stop())),
        { threshold: 0 }
      ).observe(canvas);
    }
  }

  let resizeTimer = 0;
  window.addEventListener(
    "resize",
    () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        if (reduced) draw(1.6);
      }, 160);
    },
    { passive: true }
  );

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
