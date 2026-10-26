// Site-wide navigation bar, rendered into <nav id="site-nav"></nav> on every
// page (including the generated timeline, which doesn't load styles.css — so
// the bar carries its own small stylesheet, built on the site's colour tokens
// with fallbacks).
(function () {
  const PAGES = [
    { href: "index.html", label: "Institutions" },
    { href: "accommodation.html", label: "Accommodation" },
    { href: "fees.html", label: "Fees" },
    { href: "routes.html", label: "Routes" },
    { href: "timeline.html", label: "Timeline" },
    { href: "interviews.html", label: "Interviews" },
  ];

  const here = location.pathname.split("/").pop() || "index.html";
  const nav = document.getElementById("site-nav");
  if (!nav) return;

  nav.className = "site-nav";
  nav.setAttribute("aria-label", "Site");
  nav.innerHTML = `
    <div class="site-nav-inner">
      <a class="site-nav-brand" href="index.html">🎓 Higher Ed Explorer</a>
      <ul class="site-nav-links">
        ${PAGES.map(
          (p) =>
            `<li><a href="${p.href}"${p.href === here ? ' aria-current="page"' : ""}>${p.label}</a></li>`
        ).join("")}
      </ul>
    </div>`;

  if (!document.getElementById("site-nav-style")) {
    const style = document.createElement("style");
    style.id = "site-nav-style";
    style.textContent = `
      .site-nav { position: sticky; top: 0; z-index: 900; background: var(--surface-1, var(--bg, #fff)); padding: 0 20px;
        border-bottom: 1px solid var(--border, rgba(127,127,127,.2)); font-family: system-ui, -apple-system, "Segoe UI", sans-serif; }
      .site-nav-inner { max-width: 1120px; margin: 0 auto; display: flex; align-items: center;
        gap: 8px 20px; flex-wrap: wrap; min-height: 48px; }
      .site-nav-brand { font-weight: 700; font-size: 0.95rem; color: var(--text-primary, var(--ink, #111)); text-decoration: none; white-space: nowrap; }
      .site-nav-links { list-style: none; margin: 0; padding: 0; display: flex; gap: 2px; flex-wrap: wrap; overflow-x: auto; }
      .site-nav-links::before { content: none; } /* the timeline page draws its spine on every ul */
      .site-nav-links a { display: block; padding: 12px 10px; font-size: 0.88rem; color: var(--text-secondary, var(--ink2, #555));
        text-decoration: none; border-bottom: 2px solid transparent; white-space: nowrap; }
      .site-nav-links a:hover { color: var(--text-primary, var(--ink, #111)); }
      .site-nav-links a[aria-current="page"] { color: var(--text-primary, var(--ink, #111)); font-weight: 600;
        border-bottom-color: var(--field-business, #2a78d6); }
      @media (max-width: 640px) {
        .site-nav { padding: 6px 16px 0; }
        .site-nav-links { width: 100%; flex-wrap: nowrap; }
        .site-nav-links a { padding: 8px 8px 10px; }
      }`;
    document.head.appendChild(style);
  }
})();
