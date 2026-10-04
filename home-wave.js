/* ============================================================
   WATER TECH — ONDA GENERATIVA DEL HERO
   Malla de puntos en perspectiva, en canvas 2D, sin librerías.

   Referencia: el banner de AGS es un vídeo de 20s con una malla de
   partículas en azul profundo (#0a2f86 -> #01081f) con un filo cian
   (#75fbff) que viaja por la cresta.

   Decisiones de rendimiento:
   - Resolucion limitada a 1.5x de densidad para no castigar moviles.
   - El canvas pausa su bucle si la pestana no esta visible o si el
     hero sale del viewport (IntersectionObserver).
   - Con prefers-reduced-motion se dibuja un solo fotograma fijo.
   ============================================================ */
(() => {
  "use strict";

  // Solo se sirve desde index.html, asi que basta con comprobar el canvas.
  const canvas = document.getElementById("wt-wave");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* El agua de fondo y la de la dona son videos: acompanan el mismo ciclo
     de la malla para no gastar GPU cuando el hero no se ve. */
  const RATES = [
    [".wt-hero-bg-video", 1.6],
    [".wt-hero-ring-video", 1.45],
    [".wt-hero-ring-bubbles-video", 1.25],
  ];

  const videos = Array.prototype.slice.call(
    document.querySelectorAll(
      ".wt-hero-bg-video, .wt-hero-ring-video, .wt-hero-ring-bubbles-video"
    )
  );

  function playVideos() {
    videos.forEach((video) => {
      // El footage de agua es lento de por si: se acelera un poco para que
      // el hero no se sienta dormido.
      const rate = RATES.find(([selector]) => video.matches(selector));
      if (rate && video.playbackRate !== rate[1]) video.playbackRate = rate[1];
      const playing = video.play();
      if (playing && typeof playing.catch === "function") playing.catch(() => {});
    });
  }

  function pauseVideos() {
    videos.forEach((video) => video.pause());
  }

  /* ---------- Parametros de la malla ---------- */
  const COLS = 240;         // puntos por fila
  const ROWS = 132;         // filas de profundidad
  const FOV = 1.35;
  const CAM_Y = 1.72;       // altura de camara en unidades del mundo
  const WORLD_X = 26;       // ancho del mundo
  const AMP = 4.6;          // amplitud de la ola

  let W = 0;
  let H = 0;
  let running = false;
  let raf = 0;
  let t0 = 0;

  /* ---------- Superficie: suma de senos desfasados ----------
     Nunca se repite de forma perceptible y la cresta viaja hacia la
     camara, que es el gesto central de la referencia. */
  function height(u, z, t) {
    return (
      Math.sin(u * 1.8 + t * 0.48) * 0.46 +
      Math.sin(u * 4.1 - t * 0.33 + z * 1.7) * 0.24 +
      Math.sin(u * 8.4 + t * 0.64 + z * 0.9) * 0.11 +
      Math.sin(u * 0.85 - z * 1.9 + t * 0.21) * 0.36
    );
  }

  function resize() {
    // El canvas cubre toda la pantalla del hero, asi que en monitores
    // grandes el area de pintado se dispara. Se limita la densidad de
    // render por area para sostener 60fps sin perder nitidez apreciable.
    const base = Math.min(window.devicePixelRatio || 1, 2);
    const area = window.innerWidth * window.innerHeight;
    const cap = area > 1400000 ? 1 : area > 900000 ? 1.25 : 1.75;
    const dpr = Math.min(base, cap);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);

    const horizon = H * 0.47;

    // Halo del horizonte: la cresta enciende el aire justo por encima del
    // agua. Es el gesto que separa la malla del fondo plano en la
    // referencia y evita que el canvas se lea como un degradado.
    const haze = ctx.createLinearGradient(0, horizon - H * 0.16, 0, horizon + H * 0.12);
    haze.addColorStop(0, "rgba(24, 96, 196, 0)");
    haze.addColorStop(0.62, "rgba(52, 176, 245, 0.2)");
    haze.addColorStop(0.88, "rgba(138, 240, 255, 0.28)");
    haze.addColorStop(1, "rgba(24, 96, 196, 0)");
    ctx.fillStyle = haze;
    ctx.fillRect(0, horizon - H * 0.16, W, H * 0.28);

    // Dos pasadas con un unico fillStyle cada una: evita reasignar el
    // estado del contexto en cada punto, que era el cuello de botella.
    for (let pass = 0; pass < 2; pass++) {
      const crestPass = pass === 1;
      ctx.fillStyle = crestPass
        ? "rgba(186,255,255,1)"
        : "rgba(136, 214, 248, 1)";

      for (let r = 0; r < ROWS; r++) {
        const z = r / (ROWS - 1);
        const zz = 0.55 + Math.pow(z, 1.35) * 15;
        const crest = 0.5 + 0.5 * Math.sin(z * 2.6 - t * 0.45);
        const glow = Math.pow(crest, 1.8);
        const isCrestRow = glow > 0.38;
        if (isCrestRow !== crestPass) continue;

        const persp = FOV / zz;
        const depthFade = 0.42 + z * 0.58;
        const soft = persp < 0.17;
        const size = Math.max(0.85, persp * 2.4);

        for (let c = 0; c < COLS; c++) {
          const ux = (c / (COLS - 1)) * 2 - 1;
          const x = ux * WORLD_X;
          const hy = height(ux * 2.4, z, t) * AMP;

          const sx = W * 0.5 + x * persp * (W * 0.028);
          const sy = horizon + (CAM_Y - hy) * persp * (H * 0.055);

          if (sy < -30 || sy > H + 60 || sx < -60 || sx > W + 60) continue;

          const edge = 1 - Math.min(1, Math.abs(ux) * 0.5);
          const alpha = crestPass
            ? (0.88 + glow * 0.12) * depthFade * edge * (soft ? 0.7 : 1)
            : (0.62 + glow * 0.38) * depthFade * edge * (soft ? 0.65 : 1);
          if (alpha <= 0.012) continue;

          // globalAlpha es mas barato que construir un rgba() por punto.
          ctx.globalAlpha = alpha > 1 ? 1 : alpha;
          ctx.fillRect(sx, sy, size, size);
        }
      }
    }
    ctx.globalAlpha = 1;
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

  function paintStatic() {
    draw(2.4);
  }

  /* ---------- Arranque ---------- */
  const init = () => {
    resize();
    if (reduced) {
      pauseVideos();
      paintStatic();
      return;
    }
    start();
    playVideos();

    // Pausa si la pestana no esta visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stop();
        pauseVideos();
      } else {
        start();
        playVideos();
      }
    });

    // Pausa si el hero sale del viewport
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              start();
              playVideos();
            } else {
              stop();
              pauseVideos();
            }
          });
        },
        { threshold: 0 }
      ).observe(canvas);
    }
  };

  let resizeTimer = 0;
  window.addEventListener(
    "resize",
    () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        if (reduced) paintStatic();
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
