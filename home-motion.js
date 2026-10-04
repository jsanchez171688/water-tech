/* ============================================================
   WATER TECH — MOVIMIENTO DE LA HOME
   GSAP + ScrollTrigger + Lenis. Solo se ejecuta en la Home.

   Reglas de la dirección visual:
   - transiciones lentas y sin rebote (sin elásticos)
   - máscaras y desplazamiento, no simples fundidos
   - parallax sutil: nunca más de ~7% de recorrido
   - respeta prefers-reduced-motion
   ============================================================ */
(() => {
  "use strict";

  if (!document.body.classList.contains("home-redesign")) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGsap = typeof window.gsap !== "undefined";
  const hasST = hasGsap && typeof window.ScrollTrigger !== "undefined";
  const hasLenis = typeof window.Lenis !== "undefined";

  const header = document.querySelector(".wt-header");
  const hero = document.querySelector(".wt-hero");
  const toArray = (sel) => Array.prototype.slice.call(document.querySelectorAll(sel));

  /* ----------------------------------------------------------
     1. HEADER — transparente sobre el hero, sólido al scrollear
     ---------------------------------------------------------- */
  const SWITCH_AT = 70;

  const initHeader = () => {
    if (!header) return;

    const apply = (solid) => {
      header.classList.toggle("is-scrolled", solid);
    };

    // Un solo listener pasivo: el header no necesita ScrollTrigger y así
    // no depende de que el trigger esté bien inicializado.
    let ticking = false;
    const watch = () => {
      const solid = window.scrollY > SWITCH_AT;
      apply(solid);
      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(watch);
      },
      { passive: true }
    );

    watch();
  };

  /* ----------------------------------------------------------
     2. SCROLL SUAVE (Lenis)
     Solo en puntero fino: en móvil el scroll nativo responde mejor.
     ---------------------------------------------------------- */
  let lenis = null;

  const initSmoothScroll = () => {
    if (!hasLenis || reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    lenis = new window.Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
    });

    // Expuesto para que otros componentes (p. ej. el menú móvil) puedan
    // detener y reanudar el scroll suave mientras están abiertos.
    window.__wtLenis = lenis;

    if (hasGsap) {
      lenis.on("scroll", hasST ? ScrollTrigger.update : () => {});
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (time) => {
        lenis.raf(time);
        window.requestAnimationFrame(raf);
      };
      window.requestAnimationFrame(raf);
    }

    // Los anclas internas deben pasar por Lenis, no por el navegador.
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const id = link.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        event.preventDefault();
        lenis.scrollTo(target, { offset: -60, duration: 1.4 });
      });
    });
  };

  /* ----------------------------------------------------------
     3. HERO — revelado por líneas al cargar
     ---------------------------------------------------------- */
  const initHero = () => {
    if (!hero) return;

    const lines = toArray(".wt-hero .wt-line > span");
    const fades = toArray("[data-hero-fade]");

    if (!hasGsap || reduced || !lines.length) return;

    const tl = gsap.timeline({
      defaults: { ease: "expo.out", duration: 1.5 },
      delay: 0.12,
    });

    tl.from(lines, { yPercent: 106, duration: 1.6, stagger: 0.1 }, 0.1);

    if (fades.length) {
      tl.from(
        fades,
        { y: 26, autoAlpha: 0, duration: 1.2, stagger: 0.11 },
        0.55
      );
    }
  };

  /* ----------------------------------------------------------
     4. REVELADOS AL SCROLL
     - .wt-line dentro de secciones: las líneas suben tras su máscara
     - [data-reveal]: el bloque entero sube suavemente
     ---------------------------------------------------------- */
  const initReveals = () => {
    if (!hasST || reduced) return;

    const sectionLines = toArray(".wt-section .wt-line > span");
    const sectors = toArray("[data-sector]");

    if (sectionLines.length) {
      /* y: 0 explicito: el estado previo en CSS usa porcentaje y GSAP lo lee
         como pixeles, asi que sin este reset el desplazamiento se sumaba y
         la linea quedaba fuera de su mascara. */
      gsap.set(sectionLines, { y: 0, yPercent: 106 });
      toArray(".wt-section .wt-line").forEach((mask) => {
        const inner = mask.querySelector("span");
        if (!inner) return;
        gsap.to(inner, {
          y: 0,
          yPercent: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: mask.closest("section") || mask,
            start: "top 78%",
            once: true,
          },
          delay: Array.prototype.indexOf.call(mask.parentNode.children, mask) * 0.09,
        });
      });
    }

    /* Cada seccion dispara sus propios bloques. Antes todas las secciones
       heredaban el trigger de la primera, asi que las nuevas aparecian sin
       animacion al llegar a ellas. */
    const groups = new Map();
    toArray(".wt-section .wt-kicker, .wt-section [data-reveal]").forEach((el) => {
      const section = el.closest("section");
      if (!section) return;
      if (!groups.has(section)) groups.set(section, []);
      groups.get(section).push(el);
    });

    groups.forEach((items, section) => {
      gsap.from(items, {
        autoAlpha: 0,
        y: 26,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });
    });

    if (sectors.length) {
      gsap.from(sectors, {
        autoAlpha: 0,
        y: 44,
        duration: 1.5,
        ease: "expo.out",
        stagger: 0.14,
        scrollTrigger: {
          trigger: ".wt-sectors-grid",
          start: "top 82%",
          once: true,
        },
      });
    }
  };

  /* ----------------------------------------------------------
     5. PARALLAX SUTIL
     Desplaza el <img> sobre-unido dentro de su figura.
     La figura no se toca, así el hover de la tarjeta sigue intacto.
     ---------------------------------------------------------- */
  const initParallax = () => {
    if (!hasST || reduced) return;

    toArray("[data-sector] .wt-sector-figure img").forEach((img) => {
      gsap.fromTo(
        img,
        { yPercent: -3.5 },
        {
          yPercent: 3.5,
          ease: "none",
          scrollTrigger: {
            trigger: img.closest("[data-sector]"),
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
  };

  /* ----------------------------------------------------------
     6. ARRANQUE
     site.js corre después de este archivo y reconstruye el header
     (utility bar + topbar-main). Esperamos a que termine para no
     perder referencias ni medir alturas equivocadas.
     ---------------------------------------------------------- */
  const boot = () => {
    initHeader();
    initSmoothScroll();
    initHero();
    initReveals();
    initParallax();

    if (!reduced) {
      // Confirma que el movimiento se inicializó: el <head> deja de retirar
      // la clase .wt-anim y el CSS deja de ocultar el texto.
      window.__wtMotionReady = true;
      document.documentElement.classList.remove("wt-anim");
    }

    // Recalcular cuando las fuentes terminan de cargar (cambian alturas).
    if (hasST && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    window.addEventListener("load", () => {
      if (hasST) ScrollTrigger.refresh();
    });
  };

  /* El header queda listo cuando site.js inserta la utility bar.
     Con un tope de tiempo por si esa marca nunca aparece. */
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    boot();
  };

  const waitForHeader = () => {
    if (document.querySelector(".utility-bar") || !header) {
      start();
      return;
    }
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (document.querySelector(".utility-bar") || tries > 40) {
        window.clearInterval(timer);
        start();
      }
    }, 25);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", waitForHeader);
  } else {
    waitForHeader();
  }
})();
