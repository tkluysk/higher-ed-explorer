(function () {
  const STORE_KEY = "fees-calculator-v1";
  // Residences whose fee includes meals: food drops to snacks when one is picked.
  const CATERED = new Set(["unimelb-colleges", "unimelb-wilam-hall"]);
  const CATERED_FOOD = 40;

  const DEFAULTS = {
    course: "unimelb-biomed",
    mix: { ...COURSE_PRESETS[0].mix },
    years: 3,
    load: 1,
    start: 2028,
    ssaf: true,
    home: "unimelb-lisa-bellear",
    rent: null, // filled from the residence
    weeks: 48,
    ...LIVING_DEFAULTS,
    trips: 2,
    flight: 500,
    setup: 1500,
    index: 3,
    fx: 1.1,
  };

  const $ = (id) => document.getElementById(id);
  const fmt = (n) => "$" + Math.round(n).toLocaleString("en-AU");
  const preset = (id) => COURSE_PRESETS.find((p) => p.id === id) || COURSE_PRESETS[0];
  const residence = (id) => ACCOMMODATION.find((a) => a.id === id);

  // Per-viewer convenience only: the page works without storage.
  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY));
      if (saved) return { ...DEFAULTS, ...saved, mix: { ...saved.mix } };
    } catch (e) { /* storage unavailable */ }
    return { ...DEFAULTS, mix: { ...DEFAULTS.mix }, rent: residence(DEFAULTS.home).priceFrom };
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  let state = load();

  // ---- form setup -----------------------------------------------------------
  $("f-course").innerHTML = COURSE_PRESETS.map((p) => `<option value="${p.id}">${p.label}</option>`).join("");

  const groups = [
    ["University-run housing", ACCOMMODATION.filter((a) => a.kind === "university")],
    ["Private residences (RMIT list)", ACCOMMODATION.filter((a) => a.kind === "private")],
  ];
  $("f-home").innerHTML =
    groups
      .map(([label, list]) =>
        `<optgroup label="${label}">${[...list]
          .sort((a, b) => a.priceFrom - b.priceFrom)
          .map((a) => `<option value="${a.id}">${a.name} — from $${a.priceFrom}/wk</option>`)
          .join("")}</optgroup>`)
      .join("") + `<option value="custom">Somewhere else (enter rent)</option>`;

  $("f-mix").innerHTML = CSP_BANDS.map(
    (b) => `
    <label class="mix-row" title="${b.covers}">
      <span class="mix-label">${b.label} <em>$${b.amount.toLocaleString("en-AU")}/yr in ${FEE_SOURCE_YEAR}</em></span>
      <input type="number" min="0" max="100" step="12.5" data-band="${b.id}"> %
    </label>`
  ).join("");

  $("fee-links").innerHTML = FEE_LINKS.map((l) => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a>`).join("");

  const NUM_FIELDS = { years: "f-years", start: "f-start", rent: "f-rent", weeks: "f-weeks", food: "f-food", transport: "f-transport",
    phone: "f-phone", study: "f-study", other: "f-other", trips: "f-trips", flight: "f-flight", setup: "f-setup", index: "f-index", fx: "f-fx" };

  function fillForm() {
    $("f-course").value = state.course;
    $("f-course-note").textContent = preset(state.course).note;
    $("f-load").value = String(state.load);
    $("f-ssaf").checked = state.ssaf;
    $("f-home").value = state.home;
    Object.entries(NUM_FIELDS).forEach(([k, id]) => ($(id).value = state[k]));
    document.querySelectorAll("#f-mix input").forEach((inp) => {
      inp.value = Math.round((state.mix[inp.dataset.band] || 0) * 1000) / 10;
    });
  }

  // ---- calculation ----------------------------------------------------------
  function calculate(s) {
    const mixTotal = Object.values(s.mix).reduce((a, b) => a + b, 0) || 1;
    const perEftsl = CSP_BANDS.reduce((sum, b) => sum + ((s.mix[b.id] || 0) / mixTotal) * b.amount, 0);
    const weekly = s.food + s.transport + s.phone + s.study + s.other;
    const years = [];
    for (let y = 0; y < s.years; y++) {
      const year = s.start + y;
      const grow = Math.pow(1 + s.index / 100, year - FEE_SOURCE_YEAR);
      const tuition = perEftsl * s.load * grow;
      const ssaf = s.ssaf ? SSAF_MAX * s.load * grow : 0;
      // Living costs run for the weeks she's in Melbourne; outside them she's home.
      const housing = s.rent * s.weeks * grow;
      const living = weekly * s.weeks * grow;
      const travel = s.trips * s.flight * grow;
      const setup = y === 0 ? s.setup : 0;
      years.push({ year, tuition, ssaf, housing, living, travel, setup,
        total: tuition + ssaf + housing + living + travel + setup });
    }
    const sum = (k) => years.reduce((a, r) => a + r[k], 0);
    return { perEftsl, mixTotal, years, totals: {
      tuition: sum("tuition"), ssaf: sum("ssaf"), housing: sum("housing"), living: sum("living"),
      travel: sum("travel"), setup: sum("setup"), total: sum("total") } };
  }

  // ---- rendering ------------------------------------------------------------
  const nz = (n) => `<span class="nzd">NZ${fmt(n * state.fx)}</span>`;

  function render() {
    const r = calculate(state);
    const y1 = r.years[0];
    const pct = Math.round(r.mixTotal * 1000) / 10;
    $("f-mix-total").textContent =
      `Mix adds to ${pct}%${pct !== 100 ? " — shares are scaled to 100%" : ""} · about ${fmt(r.perEftsl)} per full-time year at ${FEE_SOURCE_YEAR} rates.`;

    const tiles = [
      { label: "Each semester, upfront", value: (y1.tuition + y1.ssaf) / 2, sub: `tuition + SSAF, ${y1.year}` },
      { label: `First year (${y1.year}), all-in`, value: y1.total, sub: "tuition, housing, living, travel, setup" },
      { label: `Whole degree (${state.years} years)`, value: r.totals.total, sub: `${state.start}–${state.start + state.years - 1}` },
      { label: "Tuition only, whole degree", value: r.totals.tuition + r.totals.ssaf, sub: "student contribution + SSAF" },
    ];
    $("fee-tiles").innerHTML = tiles
      .map((t) => `<div class="fee-tile"><p class="fee-tile-label">${t.label}</p><p class="fee-tile-value">${fmt(t.value)}</p><p class="fee-tile-sub">${nz(t.value)} · ${t.sub}</p></div>`)
      .join("");

    const cols = [["tuition", "Tuition"], ["ssaf", "SSAF"], ["housing", "Housing"], ["living", "Living"], ["travel", "Flights"], ["setup", "Setup"], ["total", "Total"]];
    const head = `<thead><tr><th>Year</th>${cols.map(([, l]) => `<th class="num">${l}</th>`).join("")}<th class="num">Total NZ$</th></tr></thead>`;
    const rows = r.years
      .map((y) => `<tr><td>${y.year}</td>${cols.map(([k]) => `<td class="num${k === "total" ? " strong" : ""}">${fmt(y[k])}</td>`).join("")}<td class="num">${fmt(y.total * state.fx)}</td></tr>`)
      .join("");
    const foot = `<tfoot><tr><td>Total</td>${cols.map(([k]) => `<td class="num strong">${fmt(r.totals[k])}</td>`).join("")}<td class="num strong">${fmt(r.totals.total * state.fx)}</td></tr></tfoot>`;
    $("fee-years").innerHTML = head + `<tbody>${rows}</tbody>` + foot;

    $("fee-schedule").innerHTML = r.years
      .flatMap((y) => [
        `<li><span>~March ${y.year}</span> ${fmt((y.tuition + y.ssaf) / 2)} ${nz((y.tuition + y.ssaf) / 2)}</li>`,
        `<li><span>~August ${y.year}</span> ${fmt((y.tuition + y.ssaf) / 2)} ${nz((y.tuition + y.ssaf) / 2)}</li>`,
      ])
      .join("");
  }

  // ---- events ---------------------------------------------------------------
  function update() {
    render();
    save();
  }

  $("f-course").addEventListener("change", (e) => {
    const p = preset(e.target.value);
    state.course = p.id;
    state.mix = { ...p.mix };
    state.years = p.years;
    fillForm();
    update();
  });
  $("f-mix").addEventListener("input", (e) => {
    const band = e.target.dataset.band;
    if (!band) return;
    state.mix[band] = (parseFloat(e.target.value) || 0) / 100;
    if (state.course !== "custom") {
      state.course = "custom";
      $("f-course").value = "custom";
      $("f-course-note").textContent = preset("custom").note;
    }
    update();
  });
  $("f-load").addEventListener("change", (e) => { state.load = parseFloat(e.target.value); update(); });
  $("f-ssaf").addEventListener("change", (e) => { state.ssaf = e.target.checked; update(); });
  $("f-home").addEventListener("change", (e) => {
    const wasCatered = CATERED.has(state.home);
    state.home = e.target.value;
    const a = residence(state.home);
    if (a) state.rent = a.priceFrom;
    state.weeks = CATERED.has(state.home) ? 40 : 48;
    if (CATERED.has(state.home)) state.food = CATERED_FOOD;
    else if (wasCatered) state.food = LIVING_DEFAULTS.food;
    fillForm();
    update();
  });
  Object.entries(NUM_FIELDS).forEach(([k, id]) =>
    $(id).addEventListener("input", (e) => {
      const v = parseFloat(e.target.value);
      if (Number.isNaN(v)) return;
      state[k] = v;
      if (k === "rent" && state.home !== "custom" && residence(state.home) && v !== residence(state.home).priceFrom) {
        state.home = "custom";
        $("f-home").value = "custom";
      }
      update();
    })
  );
  $("f-reset").addEventListener("click", () => {
    try { localStorage.removeItem(STORE_KEY); } catch (e) { /* ignore */ }
    state = load();
    fillForm();
    render();
  });

  if (state.rent == null) state.rent = (residence(state.home) || {}).priceFrom || 400;
  fillForm();
  render();
})();
