// Routes renderer for the explorer's Pathways view: one lane per degree on a
// shared time axis (phases as bars, gates as diamonds), then a card per route
// listing every step. Data lives in data/routes.js; js/app.js decides which
// routes pass the filter bar and calls RouteView.render(routes).
// The "today" line is computed in the browser.
const RouteView = (function () {
  const AXIS_FROM = Date.parse("2026-10-01");
  const AXIS_TO = Date.parse("2036-03-01");
  const pct = (iso) => ((Date.parse(iso) - AXIS_FROM) / (AXIS_TO - AXIS_FROM)) * 100;
  const clamp = (v) => Math.max(0, Math.min(100, v));

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const ym = (iso) => {
    const [y, m] = iso.split("-").map(Number);
    return { y, m: MONTHS[m - 1] };
  };
  const fmtWhen = (step) => {
    const a = ym(step.date);
    if (!step.end) return `${a.m} ${a.y}`;
    const b = ym(step.end);
    if (a.y === b.y) return a.m === b.m ? `${a.m} ${a.y}` : `${a.m}–${b.m} ${a.y}`;
    return `${a.m} ${a.y} – ${b.m} ${b.y}`;
  };

  const diamond = (kind) => `<span class="rt-diamond rt-gate-${kind}" aria-hidden="true"></span>`;

  function renderLegend() {
    const gates = Object.entries(GATE_KINDS).map(([k, label]) => `<span class="rt-key">${diamond(k)}${label}</span>`).join("");
    const phases = Object.entries(PHASE_KINDS).map(([k, label]) => `<span class="rt-key"><span class="rt-swatch rt-phase-${k}"></span>${label}</span>`).join("");
    document.getElementById("rt-legend").innerHTML =
      `<div class="rt-legend-row"><span class="rt-legend-label">Gates</span>${gates}</div>` +
      `<div class="rt-legend-row"><span class="rt-legend-label">Phases</span>${phases}</div>`;
  }

  function renderOverview(routes) {
    const years = [];
    for (let y = 2027; y <= 2036; y++) years.push(y);
    const ticks = years
      .map((y) => `<span class="rt-tick" style="left:${pct(`${y}-01-01`).toFixed(2)}%"><span>${y}</span></span>`)
      .join("");
    const now = pct(new Date().toISOString().slice(0, 10));
    const nowLine = now >= 0 && now <= 100 ? `<span class="rt-now" style="left:${now.toFixed(2)}%" title="Today"></span>` : "";
    // Every lane draws its own year lines and today line, so lanes can stack on a phone.
    const grid = years.map((y) => `<span class="rt-gridline" style="left:${pct(`${y}-01-01`).toFixed(2)}%"></span>`).join("") + nowLine;

    const lanes = routes.map((r) => {
      const bars = r.phases
        .map((p) => {
          const l = clamp(pct(p.from)), w = clamp(pct(p.to)) - l;
          return `<span class="rt-bar rt-phase-${p.kind}" style="left:${l.toFixed(2)}%;width:${Math.max(w, 0.4).toFixed(2)}%" title="${p.label}"></span>`;
        })
        .join("");
      const gates = r.steps
        .filter((s) => s.gate)
        .map((s) => {
          const at = s.end ? (Date.parse(s.date) + Date.parse(s.end)) / 2 : Date.parse(s.date);
          const left = clamp(((at - AXIS_FROM) / (AXIS_TO - AXIS_FROM)) * 100);
          return `<span class="rt-gate-mark" style="left:${left.toFixed(2)}%" title="${GATE_KINDS[s.gate]}: ${s.label} (${fmtWhen(s)}${s.est ? ", est." : ""})">${diamond(s.gate)}</span>`;
        })
        .join("");
      return `<a class="rt-lane" href="#${r.id}">
          <span class="rt-lane-label"><strong>${r.inst}</strong><span>${r.name}</span></span>
          <span class="rt-track">${grid}${bars}${gates}</span>
          <span class="rt-lane-end">${r.outcome}</span>
        </a>`;
    }).join("");

    document.getElementById("rt-overview").innerHTML = routes.length
      ? `<div class="rt-axis"><span class="rt-lane-label"></span><span class="rt-track rt-track-axis">${ticks}</span><span class="rt-lane-end"></span></div>` +
        `<div class="rt-lanes">${lanes}</div>`
      : `<p class="no-results">No routes match these filters.</p>`;
  }

  function renderCards(routes) {
    document.getElementById("rt-cards").innerHTML = routes.map((r) => {
      const steps = r.steps
        .slice()
        .sort((a, b) => a.date.localeCompare(b.date))
        .map((s) => {
          const gate = s.gate ? `<span class="rt-gate-tag rt-gate-${s.gate}">${GATE_KINDS[s.gate]}</span>` : "";
          const marker = s.gate ? diamond(s.gate) : `<span class="rt-dot${s.end ? " rt-dot-span" : ""}" aria-hidden="true"></span>`;
          return `<li class="rt-step${s.gate ? " is-gate" : ""}">
              ${marker}
              <span class="rt-when">${fmtWhen(s)}${s.est ? ' <span class="rt-est">est.</span>' : ""}</span>
              <span class="rt-what">${gate}<span class="rt-label">${s.label}</span>${s.note ? `<span class="rt-note">${s.note}</span>` : ""}</span>
            </li>`;
        })
        .join("");
      const inst = r.instId ? `<a href="index.html#school=${r.instId}&full">${r.inst}</a>` : r.inst;
      const sources = r.sources.map((s) => `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.label}</a>`).join(" · ");
      const nGates = r.steps.filter((s) => s.gate).length;
      return `<article class="rt-card" id="${r.id}">
          <header class="rt-card-head">
            <p class="rt-card-meta">${inst} · ${r.city} · ${nGates} gates · ${r.outcome}</p>
            <h3>${r.name}</h3>
            <p class="rt-card-summary">${r.summary}</p>
          </header>
          <ol class="rt-steps">${steps}</ol>
          <p class="rt-sources">Sources: ${sources}</p>
        </article>`;
    }).join("");
  }

  let legendDone = false;
  return {
    render(routes) {
      if (!legendDone) { renderLegend(); legendDone = true; }
      renderOverview(routes);
      renderCards(routes);
    },
  };
})();
