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
//  Dynamic footer year
// ============================================================
(function initYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
})();
