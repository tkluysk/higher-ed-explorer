(function () {
  // Ordinal price tiers on the blue sequential ramp (steps 250/400/550/700).
  // Pins also print the price when zoomed in, and the table lists it, so the
  // tier colour is never the only cue.
  const PRICE_TIERS = [
    { max: 400, label: "Under $400", color: "#86b6ef", ink: "#0b0b0b" },
    { max: 500, label: "$400–499", color: "#3987e5", ink: "#ffffff" },
    { max: 600, label: "$500–599", color: "#1c5cab", ink: "#ffffff" },
    { max: Infinity, label: "$600+", color: "#0d366b", ink: "#ffffff" },
  ];

  const state = {
    campus: "rmit",
    kind: "all",
    maxPrice: null,
    maxTransit: null,
    sortKey: "priceFrom",
    sortDir: 1,
  };
  const markers = new Map();
  const campusMarkers = new Map();
  let map = null;

  const tierFor = (price) => PRICE_TIERS.find((t) => price < t.max);
  const money = (n) => (n == null ? "—" : `$${n}`);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  // Door-to-door minutes to a campus: transit time, or the walk when it's
  // close enough that no transit was routed.
  const tripMin = (a, campus) => {
    const t = a.travel[campus];
    return t.transit == null ? t.walk : t.transit;
  };
  const tripLabel = (t) => (t.transit == null ? `${t.walk} min walk` : `${t.transit} min`);

  function directionsUrl(a, campus) {
    const params = new URLSearchParams({
      api: "1",
      origin: a.address,
      destination: CAMPUSES[campus].address,
      travelmode: "transit",
    });
    return `https://www.google.com/maps/dir/?${params}`;
  }

  function getFiltered() {
    return ACCOMMODATION.filter(
      (a) =>
        (state.kind === "all" || a.kind === state.kind) &&
        (state.maxPrice == null || a.priceFrom < state.maxPrice) &&
        (state.maxTransit == null || tripMin(a, state.campus) <= state.maxTransit)
    );
  }

  function sortValue(a, key) {
    if (key === "name") return a.name.toLowerCase();
    if (key === "area") return a.area.toLowerCase();
    if (key === "priceFrom") return a.priceFrom;
    if (key === "studioFrom") return a.studioFrom ?? Infinity;
    if (key === "transit") return tripMin(a, state.campus);
    return a.travel[state.campus][key];
  }

  // Price pills overlap in the dense Carlton cluster, so zoomed out each
  // property is a small tier-coloured dot (price in the hover tooltip), and
  // the pills appear once zoomed in far enough to separate them.
  // University-run housing gets a square dot / square-cornered pill.
  const PILL_ZOOM = 15;

  function priceIcon(a, zoom) {
    const t = tierFor(a.priceFrom);
    const uni = a.kind === "university" ? " is-uni" : "";
    if (zoom < PILL_ZOOM) {
      return L.divIcon({
        className: "price-pin-wrap",
        html: `<div class="price-dot${uni}" style="background:${t.color}"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, -6],
        tooltipAnchor: [0, -8],
      });
    }
    return L.divIcon({
      className: "price-pin-wrap",
      html: `<div class="price-pin${uni}" style="background:${t.color};color:${t.ink}">$${a.priceFrom}</div>`,
      iconSize: [48, 22],
      iconAnchor: [24, 11],
      popupAnchor: [0, -10],
      tooltipAnchor: [0, -11],
    });
  }

  function travelRows(a) {
    return Object.entries(CAMPUSES)
      .map(([id, c]) => {
        const t = a.travel[id];
        const route = t.transit == null ? `${t.km} km by bike` : `${esc(t.route)}, incl. ${t.walkMin} min walking`;
        const active = id === state.campus ? ' class="is-active"' : "";
        return `<li${active}><span>${c.short}</span> ${tripLabel(t)} <em>${route} · bike ${t.bike} min</em></li>`;
      })
      .join("");
  }

  function popupHtml(a) {
    const src = a.priceSource === "listing" ? ` <span class="source-tag">listing</span>` : "";
    const kind = a.kind === "university" ? ` <span class="source-tag uni-tag">${esc(a.university)}-run</span>` : "";
    return `
      <p class="popup-name">${esc(a.name)}${kind}</p>
      <p class="popup-location">${esc(a.operator)} · ${esc(a.address)}</p>
      <p class="accom-popup-price"><strong>From ${money(a.priceFrom)}/wk</strong>${a.studioFrom ? ` · studio from ${money(a.studioFrom)}` : ""}${src}</p>
      <p class="accom-popup-note">${esc(a.priceNote)}</p>
      <p class="accom-popup-note">${esc(a.roomTypes)}</p>
      <ul class="accom-travel">${travelRows(a)}</ul>
      <p class="popup-link">
        <a href="${a.url}" target="_blank" rel="noopener noreferrer">Provider site</a> ·
        <a href="${directionsUrl(a, state.campus)}" target="_blank" rel="noopener noreferrer">Directions to ${CAMPUSES[state.campus].short}</a>
      </p>`;
  }

  function campusIcon(id) {
    const active = id === state.campus ? " is-active" : "";
    return L.divIcon({
      className: "price-pin-wrap",
      html: `<div class="campus-pin${active}">${CAMPUSES[id].name}</div>`,
      iconSize: [140, 26],
      iconAnchor: [70, 13],
    });
  }

  function initMap() {
    map = L.map("map", { scrollWheelZoom: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 18,
    }).addTo(map);
    L.control.scale({ metric: true, imperial: false, position: "bottomleft" }).addTo(map);

    Object.entries(CAMPUSES).forEach(([id, c]) => {
      const m = L.marker([c.lat, c.lng], { icon: campusIcon(id), zIndexOffset: 1000 })
        .addTo(map)
        .bindPopup(`<p class="popup-name">${c.name}</p><p class="popup-location">${c.address}</p><p class="accom-popup-note">${c.note}</p>`);
      campusMarkers.set(id, m);
    });

    ACCOMMODATION.forEach((a) => {
      const m = L.marker([a.lat, a.lng], { icon: priceIcon(a, 0), riseOnHover: true })
        .bindPopup(() => popupHtml(a), { maxWidth: 320 })
        .bindTooltip(() => `<strong>${esc(a.name)}</strong><br>From $${a.priceFrom}/wk · ${tripLabel(a.travel[state.campus])} to ${CAMPUSES[state.campus].short}`, { direction: "top" });
      markers.set(a.id, m);
    });

    // Frame the inner-city cluster plus the three campuses; Bundoora is an
    // outlier that would zoom the map out too far to separate the Carlton pins.
    const inner = ACCOMMODATION.filter((a) => a.area !== "Bundoora");
    const pts = [...inner.map((a) => [a.lat, a.lng]), ...Object.values(CAMPUSES).map((c) => [c.lat, c.lng])];
    map.fitBounds(L.latLngBounds(pts).pad(0.05));

    let pills = null;
    const updateIcons = () => {
      const want = map.getZoom() >= PILL_ZOOM;
      if (want === pills) return;
      pills = want;
      ACCOMMODATION.forEach((a) => markers.get(a.id).setIcon(priceIcon(a, map.getZoom())));
    };
    map.on("zoomend", updateIcons);
    updateIcons();
  }

  function renderMarkers(filtered) {
    const visible = new Set(filtered.map((a) => a.id));
    markers.forEach((m, id) => {
      if (visible.has(id)) m.addTo(map);
      else m.remove();
    });
    campusMarkers.forEach((m, id) => m.setIcon(campusIcon(id)));
  }

  function columns() {
    const c = CAMPUSES[state.campus].short;
    return [
      { key: "name", label: "Property" },
      { key: "area", label: "Area" },
      { key: "priceFrom", label: "From / wk" },
      { key: "studioFrom", label: "Studio from" },
      { key: "transit", label: `To ${c}` },
      { key: "bike", label: "Bike" },
      { key: "walk", label: "Walk" },
    ];
  }

  function renderTable(filtered) {
    const rows = [...filtered].sort((a, b) => {
      const va = sortValue(a, state.sortKey);
      const vb = sortValue(b, state.sortKey);
      return (va < vb ? -1 : va > vb ? 1 : 0) * state.sortDir || a.priceFrom - b.priceFrom;
    });
    const head = columns()
      .map((c) => {
        const active = c.key === state.sortKey;
        const arrow = active ? (state.sortDir === 1 ? " ↑" : " ↓") : "";
        return `<th scope="col" aria-sort="${active ? (state.sortDir === 1 ? "ascending" : "descending") : "none"}"><button type="button" class="sort-btn${active ? " active" : ""}" data-key="${c.key}">${c.label}${arrow}</button></th>`;
      })
      .join("");
    const body = rows
      .map((a) => {
        const t = tierFor(a.priceFrom);
        const tr = a.travel[state.campus];
        const src = a.priceSource === "listing" ? ` <span class="source-tag">listing</span>` : "";
        const kind = a.kind === "university" ? ` <span class="source-tag uni-tag">${esc(a.university)}-run</span>` : "";
        const route = tr.transit == null ? "walk" : esc(tr.route);
        return `<tr class="compare-row" tabindex="0" data-id="${a.id}">
          <td><span class="compare-name">${esc(a.name)}</span>${kind}<span class="compare-type">${esc(a.operator)}</span></td>
          <td>${esc(a.area)}</td>
          <td class="num"><span class="tier-dot${a.kind === "university" ? " is-uni" : ""}" style="background:${t.color}"></span>${money(a.priceFrom)}${src}</td>
          <td class="num">${money(a.studioFrom)}</td>
          <td class="num">${tripLabel(tr)}<span class="compare-type">${route}</span></td>
          <td class="num">${tr.bike} min</td>
          <td class="num">${tr.walk} min</td>
        </tr>`;
      })
      .join("");
    document.getElementById("accom-table").innerHTML = `<thead><tr>${head}</tr></thead><tbody>${body}</tbody>`;
  }

  function renderHousingNotes() {
    document.getElementById("housing-notes").innerHTML = HOUSING_NOTES.map(
      (n) => `
      <div class="housing-note">
        <p class="housing-note-title">${n.uni}</p>
        <ul class="question-list">${n.points.map((p) => `<li>${p}</li>`).join("")}</ul>
        <p class="question-links">
          ${n.source ? `<a href="${n.source.url}">${n.source.label}</a>` : ""}
          ${n.links.map((l) => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a>`).join("")}
        </p>
      </div>`
    ).join("");
  }

  function render() {
    const filtered = getFiltered();
    document.getElementById("result-count").textContent =
      `Showing ${filtered.length} of ${ACCOMMODATION.length} residences · travel times to ${CAMPUSES[state.campus].name}`;
    renderMarkers(filtered);
    renderTable(filtered);
  }

  function focusProperty(id) {
    const a = ACCOMMODATION.find((x) => x.id === id);
    const m = markers.get(id);
    if (!a || !m) return;
    document.getElementById("map").scrollIntoView({ behavior: "smooth", block: "center" });
    map.flyTo([a.lat, a.lng], Math.max(map.getZoom(), 15), { duration: 0.6 });
    map.once("moveend", () => m.openPopup());
  }

  function wireChips(containerId, key, parse) {
    const container = document.getElementById(containerId);
    container.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      state[key] = parse(btn.dataset.value);
      container.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c === btn)));
      render();
    });
  }
  const numOrNull = (v) => (v === "all" ? null : Number(v));

  document.getElementById("price-legend").innerHTML =
    PRICE_TIERS.map((t) => `<span class="legend-item"><span class="tier-dot" style="background:${t.color}"></span>${t.label}</span>`).join("") +
    `<span class="legend-item"><span class="tier-dot is-uni" style="background:var(--text-muted)"></span>University-run</span>`;

  wireChips("campus-filters", "campus", (v) => v);
  wireChips("kind-filters", "kind", (v) => v);
  wireChips("price-filters", "maxPrice", numOrNull);
  wireChips("transit-filters", "maxTransit", numOrNull);

  const table = document.getElementById("accom-table");
  table.addEventListener("click", (e) => {
    const sortBtn = e.target.closest(".sort-btn");
    if (sortBtn) {
      const key = sortBtn.dataset.key;
      state.sortDir = state.sortKey === key ? -state.sortDir : 1;
      state.sortKey = key;
      render();
      return;
    }
    const row = e.target.closest("tr[data-id]");
    if (row) focusProperty(row.dataset.id);
  });
  table.addEventListener("keydown", (e) => {
    const row = e.target.closest("tr[data-id]");
    if (row && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      focusProperty(row.dataset.id);
    }
  });

  renderHousingNotes();
  initMap();
  render();
})();
