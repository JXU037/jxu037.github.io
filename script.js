// ============================================================
//  Theme toggle (persists choice + respects system preference)
// ============================================================
(function initTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const setTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (toggle) toggle.firstElementChild.textContent = theme === "dark" ? "☀️" : "🌙";
  };

  setTheme(stored || (prefersDark ? "dark" : "light"));

  toggle?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(next);
  });
})();

// ============================================================
//  Mobile navigation
// ============================================================
(function initNav() {
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close after clicking a link
  menu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", closeMenu)
  );

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();

// ============================================================
//  Tech-stack marquee: duplicate tiles for a seamless loop
//  (the CSS animation shifts the track by -50%, so we need
//   two identical copies of the content back-to-back)
// ============================================================
(function initMarquee() {
  const track = document.querySelector(".marquee__track");
  if (!track) return;
  Array.from(track.children).forEach((tile) => {
    const clone = tile.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.append(clone);
  });
})();

// ============================================================
//  Projects carousel: arrow navigation + periodic auto-scroll
// ============================================================
(function initCarousel() {
  const AUTOPLAY_MS = 4500;

  document.querySelectorAll("[data-carousel]").forEach((root) => {
    const viewport = root.querySelector("[data-carousel-viewport]");
    const prevBtn = root.querySelector("[data-carousel-prev]");
    const nextBtn = root.querySelector("[data-carousel-next]");
    const dotsBox = root.querySelector("[data-carousel-dots]");
    const cards = Array.from(viewport?.querySelectorAll(".card") ?? []);
    if (!viewport || !cards.length) return;

    // Distance to advance = one card width + the flex gap
    const stepSize = () => {
      const styles = getComputedStyle(viewport);
      const gap = parseFloat(styles.columnGap || styles.gap) || 0;
      return cards[0].getBoundingClientRect().width + gap;
    };

    const atStart = () => viewport.scrollLeft <= 2;
    const atEnd = () =>
      viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 2;

    const activeIndex = () =>
      atEnd() ? cards.length - 1 : Math.round(viewport.scrollLeft / stepSize());

    // Build one pagination dot per card
    const dots = cards.map((_, i) => {
      const dot = document.createElement("button");
      dot.className = "carousel__dot";
      dot.type = "button";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Go to project ${i + 1}`);
      dot.addEventListener("click", () => {
        viewport.scrollTo({ left: i * stepSize(), behavior: "smooth" });
      });
      dotsBox?.appendChild(dot);
      return dot;
    });

    // Sync arrow disabled state + active dot with scroll position
    const sync = () => {
      if (prevBtn) prevBtn.disabled = atStart();
      if (nextBtn) nextBtn.disabled = atEnd();
      const idx = activeIndex();
      dots.forEach((dot, i) => {
        const active = i === idx;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-selected", String(active));
      });
    };

    const goNext = () => {
      if (atEnd()) viewport.scrollTo({ left: 0, behavior: "smooth" });
      else viewport.scrollBy({ left: stepSize(), behavior: "smooth" });
    };
    const goPrev = () => {
      if (atStart())
        viewport.scrollTo({ left: viewport.scrollWidth, behavior: "smooth" });
      else viewport.scrollBy({ left: -stepSize(), behavior: "smooth" });
    };

    nextBtn?.addEventListener("click", goNext);
    prevBtn?.addEventListener("click", goPrev);
    viewport.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    sync();

    // Autoplay (skipped when the user prefers reduced motion)
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = null;
    const play = () => {
      if (reduceMotion || timer) return;
      timer = setInterval(goNext, AUTOPLAY_MS);
    };
    const pause = () => {
      clearInterval(timer);
      timer = null;
    };

    root.addEventListener("mouseenter", pause);
    root.addEventListener("mouseleave", play);
    root.addEventListener("focusin", pause);
    root.addEventListener("focusout", play);
    viewport.addEventListener("touchstart", pause, { passive: true });
    document.addEventListener("visibilitychange", () =>
      document.hidden ? pause() : play()
    );

    play();
  });
})();

// ============================================================
//  Dynamic footer year
// ============================================================
(function initYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
})();
