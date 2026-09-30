(function () {
  // Ordinal price tiers on the blue sequential ramp (steps 250/400/550/700).
  // Pins also print the price, so the tier colour is never the only cue.
  const PRICE_TIERS = [
    { max: 400, label: "Under $400", color: "#86b6ef", ink: "#0b0b0b" },
    { max: 500, label: "$400–499", color: "#3987e5", ink: "#ffffff" },
    { max: 600, label: "$500–599", color: "#1c5cab", ink: "#ffffff" },
    { max: Infinity, label: "$600+", color: "#0d366b", ink: "#ffffff" },
  ];

  const state = { maxPrice: null, maxTransit: null, sortKey: "priceFrom", sortDir: 1 };
  const markers = new Map();
  let map = null;

  const tierFor = (price) => PRICE_TIERS.find((t) => price < t.max);
  const money = (n) => (n == null ? "—" : `$${n}`);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  function directionsUrl(a) {
    const params = new URLSearchParams({
      api: "1",
      origin: a.address,
      destination: RMIT_BRUNSWICK.address,
      travelmode: "transit",
    });
    return `https://www.google.com/maps/dir/?${params}`;
  }

  function getFiltered() {
    return ACCOMMODATION.filter(
      (a) =>
        (state.maxPrice == null || a.priceFrom < state.maxPrice) &&
        (state.maxTransit == null || a.travel.transit <= state.maxTransit)
    );
  }

  function sortValue(a, key) {
    if (key === "name") return a.name.toLowerCase();
    if (key === "area") return a.area.toLowerCase();
    if (key === "priceFrom") return a.priceFrom;
    if (key === "studioFrom") return a.studioFrom ?? Infinity;
    return a.travel[key];
  }

  // Price pills overlap in the dense Carlton cluster, so zoomed out each
  // property is a small tier-coloured dot (price in the hover tooltip), and
  // the pills appear once zoomed in far enough to separate them.
  const PILL_ZOOM = 15;

  function priceIcon(a, zoom) {
    const t = tierFor(a.priceFrom);
    if (zoom < PILL_ZOOM) {
      return L.divIcon({
        className: "price-pin-wrap",
        html: `<div class="price-dot" style="background:${t.color}"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, -6],
        tooltipAnchor: [0, -8],
      });
    }
    return L.divIcon({
      className: "price-pin-wrap",
      html: `<div class="price-pin" style="background:${t.color};color:${t.ink}">$${a.priceFrom}</div>`,
      iconSize: [48, 22],
      iconAnchor: [24, 11],
      popupAnchor: [0, -10],
      tooltipAnchor: [0, -11],
    });
  }

  function popupHtml(a) {
    const src = a.priceSource === "listing" ? ` <span class="source-tag">listing</span>` : "";
    return `
      <p class="popup-name">${esc(a.name)}</p>
      <p class="popup-location">${esc(a.operator)} · ${esc(a.address)}</p>
      <p class="accom-popup-price"><strong>From ${money(a.priceFrom)}/wk</strong>${a.studioFrom ? ` · studio from ${money(a.studioFrom)}` : ""}${src}</p>
      <p class="accom-popup-note">${esc(a.priceNote)}</p>
      <p class="accom-popup-note">${esc(a.roomTypes)}</p>
      <ul class="accom-travel">
        <li><span>Transit</span> ${a.travel.transit} min <em>${esc(a.travel.route)}, incl. ${a.travel.walkMin} min walking</em></li>
        <li><span>Bike</span> ${a.travel.bike} min <em>${a.travel.km} km</em></li>
        <li><span>Walk</span> ${a.travel.walk} min</li>
      </ul>
      <p class="popup-link">
        <a href="${a.url}" target="_blank" rel="noopener noreferrer">Provider site</a> ·
        <a href="${directionsUrl(a)}" target="_blank" rel="noopener noreferrer">Directions</a>
      </p>`;
  }

  function initMap() {
    map = L.map("map", { scrollWheelZoom: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 18,
    }).addTo(map);
    L.control.scale({ metric: true, imperial: false, position: "bottomleft" }).addTo(map);

    L.marker([RMIT_BRUNSWICK.lat, RMIT_BRUNSWICK.lng], {
      icon: L.divIcon({
        className: "price-pin-wrap",
        html: `<div class="campus-pin">RMIT Brunswick</div>`,
        iconSize: [110, 26],
        iconAnchor: [55, 13],
      }),
      zIndexOffset: 1000,
    })
      .addTo(map)
      .bindPopup(`<p class="popup-name">${RMIT_BRUNSWICK.name}</p><p class="popup-location">${RMIT_BRUNSWICK.address}</p><p class="accom-popup-note">School of Fashion &amp; Textiles. Next to Jewell station (Upfield line); tram 19 on Sydney Rd.</p>`);

    ACCOMMODATION.forEach((a) => {
      const m = L.marker([a.lat, a.lng], { icon: priceIcon(a, 0), riseOnHover: true })
        .bindPopup(popupHtml(a), { maxWidth: 300 })
        .bindTooltip(`<strong>${esc(a.name)}</strong><br>From $${a.priceFrom}/wk · ${a.travel.transit} min by transit`, { direction: "top" });
      markers.set(a.id, m);
    });

    // Frame the inner-city cluster plus campus; Bundoora and South Yarra are
    // outliers that would zoom the map out too far to separate the Carlton pins.
    const inner = ACCOMMODATION.filter((a) => a.area !== "Bundoora" && a.area !== "South Yarra");
    map.fitBounds(L.latLngBounds([...inner.map((a) => [a.lat, a.lng]), [RMIT_BRUNSWICK.lat, RMIT_BRUNSWICK.lng]]).pad(0.08));

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
  }

  const COLUMNS = [
    { key: "name", label: "Property" },
    { key: "area", label: "Area" },
    { key: "priceFrom", label: "From / wk" },
    { key: "studioFrom", label: "Studio from" },
    { key: "transit", label: "Transit" },
    { key: "bike", label: "Bike" },
    { key: "walk", label: "Walk" },
  ];

  function renderTable(filtered) {
    const rows = [...filtered].sort((a, b) => {
      const va = sortValue(a, state.sortKey);
      const vb = sortValue(b, state.sortKey);
      return (va < vb ? -1 : va > vb ? 1 : 0) * state.sortDir || a.priceFrom - b.priceFrom;
    });
    const head = COLUMNS.map((c) => {
      const active = c.key === state.sortKey;
      const arrow = active ? (state.sortDir === 1 ? " ↑" : " ↓") : "";
      return `<th scope="col" aria-sort="${active ? (state.sortDir === 1 ? "ascending" : "descending") : "none"}"><button type="button" class="sort-btn${active ? " active" : ""}" data-key="${c.key}">${c.label}${arrow}</button></th>`;
    }).join("");
    const body = rows
      .map((a) => {
        const t = tierFor(a.priceFrom);
        const src = a.priceSource === "listing" ? ` <span class="source-tag">listing</span>` : "";
        return `<tr class="compare-row" tabindex="0" data-id="${a.id}">
          <td><span class="compare-name">${esc(a.name)}</span><span class="compare-type">${esc(a.operator)}</span></td>
          <td>${esc(a.area)}</td>
          <td class="num"><span class="tier-dot" style="background:${t.color}"></span>${money(a.priceFrom)}${src}</td>
          <td class="num">${money(a.studioFrom)}</td>
          <td class="num">${a.travel.transit} min<span class="compare-type">${esc(a.travel.route)}</span></td>
          <td class="num">${a.travel.bike} min</td>
          <td class="num">${a.travel.walk} min</td>
        </tr>`;
      })
      .join("");
    document.getElementById("accom-table").innerHTML = `<thead><tr>${head}</tr></thead><tbody>${body}</tbody>`;
  }

  function render() {
    const filtered = getFiltered();
    document.getElementById("result-count").textContent =
      `Showing ${filtered.length} of ${ACCOMMODATION.length} residences`;
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

  function wireChips(containerId, key) {
    const container = document.getElementById(containerId);
    container.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      state[key] = btn.dataset.max === "all" ? null : Number(btn.dataset.max);
      container.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c === btn)));
      render();
    });
  }

  document.getElementById("price-legend").innerHTML = PRICE_TIERS.map(
    (t) => `<span class="legend-item"><span class="tier-dot" style="background:${t.color}"></span>${t.label}</span>`
  ).join("");

  wireChips("price-filters", "maxPrice");
  wireChips("transit-filters", "maxTransit");

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

  initMap();
  render();
})();
