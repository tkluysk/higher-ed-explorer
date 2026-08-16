(function () {
  const FIELD_LABELS = {
    fashion: "Fashion",
    chemistry: "Chemistry",
    biology: "Biology",
    business: "Business",
    finance: "Finance",
    entrepreneurship: "Entrepreneurship",
    medicalSciences: "Medical Sciences",
  };

  const CITY_CENTERS = {
    all: [-35.5, 148.0],
    melbourne: [-37.8136, 144.9631],
    sydney: [-33.8688, 151.2093],
  };

  const CITY_LABELS = {
    melbourne: "Melbourne",
    sydney: "Sydney",
  };

  function locationLabel(inst) {
    return state.city === "all" ? `${inst.location}, ${CITY_LABELS[inst.city]}` : inst.location;
  }

  const state = {
    city: "melbourne",
    fields: new Set(), // empty = all fields
    type: "all",
    status: "all",
    query: "",
    view: "list",
  };

  const STATUS_KEY = "hee-status";
  const statusMap = loadStatusMap();

  function loadStatusMap() {
    try {
      return JSON.parse(localStorage.getItem(STATUS_KEY)) || {};
    } catch {
      return {};
    }
  }

  function saveStatusMap() {
    localStorage.setItem(STATUS_KEY, JSON.stringify(statusMap));
  }

  function getStatus(id) {
    return statusMap[id] || null;
  }

  function setStatus(id, status) {
    if (statusMap[id] === status) {
      delete statusMap[id];
    } else if (status === null) {
      delete statusMap[id];
    } else {
      statusMap[id] = status;
    }
    saveStatusMap();
    renderCards();
    if (state.view === "map") renderMarkers();
    if (state.view === "compare") renderCompareTable();
  }

  const cardGrid = document.getElementById("card-grid");
  const resultCount = document.getElementById("result-count");
  const searchInput = document.getElementById("search-input");
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modalBody = document.getElementById("modal-body");
  const modalClose = document.getElementById("modal-close");

  let map = null;
  let markers = [];

  function matchesFilters(inst) {
    if (state.city !== "all" && inst.city !== state.city) return false;
    if (state.fields.size && ![...state.fields].some((f) => inst.fields[f] && inst.fields[f].length)) return false;
    if (state.type !== "all" && inst.type !== state.type) return false;
    if (state.status !== "all" && getStatus(inst.id) !== state.status) return false;
    if (state.query) {
      const q = state.query.toLowerCase();
      const haystack = [
        inst.name,
        inst.location,
        inst.description,
        ...Object.values(inst.fields).flat(),
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  }

  function getFilteredInstitutions() {
    return INSTITUTIONS.filter(matchesFilters);
  }

  function fieldTagsFor(inst) {
    return Object.keys(inst.fields).filter((f) => inst.fields[f] && inst.fields[f].length);
  }

  function renderCards() {
    const filtered = getFilteredInstitutions();
    resultCount.textContent = `${filtered.length} institution${filtered.length === 1 ? "" : "s"}`;

    if (!filtered.length) {
      cardGrid.innerHTML = '<p class="no-results">No institutions match these filters.</p>';
      return;
    }

    cardGrid.innerHTML = filtered
      .map((inst) => {
        const tags = fieldTagsFor(inst)
          .map((f) => `<span class="field-tag ${f}">${FIELD_LABELS[f]}</span>`)
          .join("");
        const hybridBadges = (inst.hybrid || [])
          .map((h) => `<span class="hybrid-tag">⬡ ${h.label}</span>`)
          .join("");
        const status = getStatus(inst.id);
        const cardClass = status === "not-interested" ? "card card-not-interested" : "card";
        const starClass = status === "starred" ? "status-btn star-btn active" : "status-btn star-btn";
        const dislikeClass = status === "not-interested" ? "status-btn dislike-btn active" : "status-btn dislike-btn";
        const ncea = inst.entryRequirements && inst.entryRequirements.ncealLevel;
        const nceaBadge = ncea
          ? `<span class="ncea-badge ncea-${ncea}" title="NZ English requirement: NCEA ${ncea === "L2" ? "Level 2" : "Level 3"}">NCEA ${ncea}</span>`
          : "";
        return `
        <article class="${cardClass}" tabindex="0" role="button" data-id="${inst.id}" aria-label="View details for ${inst.name}">
          <div class="card-top">
            <h3 class="card-name">${inst.name}</h3>
            <span class="card-badges">
              <span class="card-type">${inst.type}</span>
              ${nceaBadge}
            </span>
          </div>
          <p class="card-location">${locationLabel(inst)}</p>
          <p class="card-desc">${inst.description}</p>
          <div class="field-tags">${tags}${hybridBadges}</div>
          <div class="status-controls">
            <button type="button" class="${starClass}" data-action="star" data-id="${inst.id}" aria-pressed="${status === "starred"}" aria-label="Star ${inst.name}" title="Star">★</button>
            <button type="button" class="${dislikeClass}" data-action="dislike" data-id="${inst.id}" aria-pressed="${status === "not-interested"}" aria-label="Mark ${inst.name} as not interested" title="Not interested">✕</button>
          </div>
        </article>`;
      })
      .join("");

    cardGrid.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => openModal(card.dataset.id));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(card.dataset.id);
        }
      });
    });

    cardGrid.querySelectorAll(".status-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const newStatus = btn.dataset.action === "star" ? "starred" : "not-interested";
        setStatus(id, newStatus);
      });
    });
  }

  function renderVisitSection(visit) {
    const openDayLink =
      visit.openDayUrl && visit.openDayUrl.startsWith("http")
        ? `<a href="${visit.openDayUrl}" target="_blank" rel="noopener noreferrer">${visit.openDay}</a>`
        : visit.openDay;
    const toursLink =
      visit.toursUrl && visit.toursUrl.startsWith("http")
        ? `<a href="${visit.toursUrl}" target="_blank" rel="noopener noreferrer">${visit.tours}</a>`
        : visit.tours;
    const notes = visit.notes ? `<p class="visit-notes">${visit.notes}</p>` : "";

    return `
      <div class="modal-section-title">Visiting</div>
      <div class="visit-block">
        <p class="visit-row"><span class="visit-label">Open Day</span> ${openDayLink}</p>
        <p class="visit-row"><span class="visit-label">Tours</span> ${toursLink}</p>
        ${notes}
      </div>`;
  }

  function renderEntryRequirementsSection(entry) {
    const sourceNote = entry.sourceNote ? `<p class="entry-source-note">${entry.sourceNote}</p>` : "";
    const feeRow = entry.feeStatus
      ? `<p class="entry-row"><span class="entry-label">Fees</span> ${entry.feeStatus}</p>`
      : "";
    const subjectsRow = entry.subjectPrerequisites
      ? `<p class="entry-row"><span class="entry-label">Subjects</span> ${entry.subjectPrerequisites}</p>`
      : "";
    const portfolioRow = entry.portfolio
      ? `<p class="entry-row"><span class="entry-label">Portfolio</span> ${entry.portfolio}</p>`
      : "";
    return `
      <div class="modal-section-title">NZ entry requirements</div>
      <div class="entry-block">
        <p class="entry-row"><span class="entry-label">Academic</span> ${entry.academic}</p>
        <p class="entry-row"><span class="entry-label">English</span> ${entry.english}</p>
        ${subjectsRow}
        ${portfolioRow}
        ${feeRow}
        ${sourceNote}
      </div>`;
  }

  function renderHybridSection(hybrid) {
    const items = hybrid
      .map(
        (h) => `
        <div class="hybrid-block">
          <p class="hybrid-block-label">⬡ ${h.label}</p>
          <p class="hybrid-block-desc">${h.description}</p>
        </div>`
      )
      .join("");
    return `
      <div class="modal-section-title">Interdisciplinary programs</div>
      ${items}`;
  }

  function openModal(id) {
    const inst = INSTITUTIONS.find((i) => i.id === id);
    if (!inst) return;

    const sections = fieldTagsFor(inst)
      .map((f) => {
        const programs = inst.fields[f]
          .map((p) => `<li>${p}</li>`)
          .join("");
        return `
        <div class="program-field">
          <div class="program-field-name">
            <span class="program-field-dot" style="background: var(--field-${f})"></span>
            ${FIELD_LABELS[f]}
          </div>
          <ul class="program-list">${programs}</ul>
        </div>`;
      })
      .join("");

    const visitSection = inst.visit ? renderVisitSection(inst.visit) : "";
    const hybridSection = inst.hybrid && inst.hybrid.length ? renderHybridSection(inst.hybrid) : "";
    const entrySection = inst.entryRequirements ? renderEntryRequirementsSection(inst.entryRequirements) : "";
    const otherNotes = [
      inst.entrepreneurshipNote ? { label: "Entrepreneurship", text: inst.entrepreneurshipNote } : null,
      inst.biologyNote ? { label: "Biology", text: inst.biologyNote } : null,
      inst.medicalSciencesNote ? { label: "Medical Sciences", text: inst.medicalSciencesNote } : null,
    ].filter(Boolean);
    const otherNotesSection = otherNotes.length
      ? `
      <div class="modal-section-title">Also considered</div>
      <div class="other-notes-block">
        ${otherNotes
          .map((n) => `<p class="other-note"><span class="other-note-label">${n.label}:</span> ${n.text}</p>`)
          .join("")}
      </div>`
      : "";
    const status = getStatus(inst.id);

    modalBody.innerHTML = `
      <div class="modal-top-row">
        <h2 class="modal-title" id="modal-title">${inst.name}</h2>
        <div class="status-controls">
          <button type="button" class="status-btn star-btn${status === "starred" ? " active" : ""}" data-action="star" data-id="${inst.id}" aria-pressed="${status === "starred"}" title="Star">★</button>
          <button type="button" class="status-btn dislike-btn${status === "not-interested" ? " active" : ""}" data-action="dislike" data-id="${inst.id}" aria-pressed="${status === "not-interested"}" title="Not interested">✕</button>
        </div>
      </div>
      <p class="modal-meta">${inst.type} · ${locationLabel(inst)}</p>
      <p class="modal-desc">${inst.description}</p>
      <div class="modal-section-title">Relevant programs</div>
      ${sections}
      ${hybridSection}
      ${entrySection}
      ${otherNotesSection}
      ${visitSection}
      <a class="modal-website" href="${inst.website}" target="_blank" rel="noopener noreferrer">Visit website &rarr;</a>
    `;
    modalBody.querySelectorAll(".status-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const newStatus = btn.dataset.action === "star" ? "starred" : "not-interested";
        setStatus(btn.dataset.id, newStatus);
        openModal(id);
      });
    });
    modalBackdrop.hidden = false;
    modalClose.focus();
  }

  function closeModal() {
    modalBackdrop.hidden = true;
  }

  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalBackdrop.hidden) closeModal();
  });

  function initMap() {
    if (map) return;
    map = L.map("map").setView(CITY_CENTERS[state.city], 11);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 18,
    }).addTo(map);
    L.control.scale({ metric: true, imperial: false, position: "bottomleft" }).addTo(map);
    renderMarkers();
  }

  function markerIconFor(status) {
    const color = status === "starred" ? "#eda100" : status === "not-interested" ? "#e34948" : "#2a78d6";
    const html = status === "starred"
      ? `<div class="pin-marker pin-starred" style="background:${color}"><span>★</span></div>`
      : status === "not-interested"
      ? `<div class="pin-marker pin-not-interested" style="background:${color}"><span>✕</span></div>`
      : `<div class="pin-marker" style="background:${color}"></div>`;
    return L.divIcon({
      className: "pin-marker-wrap",
      html,
      iconSize: [26, 26],
      iconAnchor: [13, 26],
      popupAnchor: [0, -24],
    });
  }

  function renderMarkers() {
    if (!map) return;
    markers.forEach((m) => map.removeLayer(m));
    markers = [];

    const filtered = getFilteredInstitutions();
    filtered.forEach((inst) => {
      if (!inst.lat || !inst.lng) return;
      const tags = fieldTagsFor(inst)
        .map((f) => `<span class="field-tag ${f}">${FIELD_LABELS[f]}</span>`)
        .join(" ");
      const status = getStatus(inst.id);
      const marker = L.marker([inst.lat, inst.lng], { icon: markerIconFor(status) }).addTo(map);
      marker.bindPopup(`
        <p class="popup-name">${inst.name}</p>
        <p class="popup-location">${inst.type} · ${locationLabel(inst)}</p>
        <div class="field-tags">${tags}</div>
        <div class="status-controls">
          <button type="button" class="status-btn star-btn${status === "starred" ? " active" : ""}" data-action="star" data-id="${inst.id}" title="Star">★</button>
          <button type="button" class="status-btn dislike-btn${status === "not-interested" ? " active" : ""}" data-action="dislike" data-id="${inst.id}" title="Not interested">✕</button>
        </div>
        <p class="popup-link"><a href="#" data-id="${inst.id}" class="popup-details-link">View details</a></p>
      `);
      marker.on("popupopen", () => {
        const popupEl = marker.getPopup().getElement();
        const link = popupEl.querySelector(".popup-details-link");
        if (link) {
          link.addEventListener("click", (e) => {
            e.preventDefault();
            openModal(inst.id);
          });
        }
        popupEl.querySelectorAll(".status-btn").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const newStatus = btn.dataset.action === "star" ? "starred" : "not-interested";
            setStatus(btn.dataset.id, newStatus);
          });
        });
      });
      markers.push(marker);
    });

    if (markers.length) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.15));
    }
  }

  function renderCompareTable() {
    const table = document.getElementById("compare-table");
    const scored = getFilteredInstitutions().filter((i) => i.compare);

    if (!scored.length) {
      table.outerHTML =
        '<p class="no-results">No fit-scored institutions match these filters. Try a different field, type, or status filter.</p><table class="compare-table" id="compare-table"></table>';
      return;
    }

    scored.sort((a, b) => {
      const scoreOf = (i) => i.compare.fashion + i.compare.sciTech + i.compare.business;
      return scoreOf(b) - scoreOf(a);
    });

    const stars = (n) => {
      const full = Math.floor(n);
      const half = n - full >= 0.5;
      return "★".repeat(full) + (half ? "½" : "");
    };

    const rows = scored
      .map(
        (inst) => `
        <tr data-id="${inst.id}" class="compare-row" tabindex="0" role="button" aria-label="View details for ${inst.name}">
          <td class="compare-name">
            ${inst.name}
            <span class="compare-type">${inst.type} · ${locationLabel(inst)}</span>
          </td>
          <td class="compare-score"><span class="compare-stars">${stars(inst.compare.fashion)}</span></td>
          <td class="compare-score"><span class="compare-stars">${stars(inst.compare.sciTech)}</span></td>
          <td class="compare-score"><span class="compare-stars">${stars(inst.compare.business)}</span></td>
          <td class="compare-note">${inst.compare.note}</td>
        </tr>`
      )
      .join("");

    table.innerHTML = `
      <colgroup>
        <col class="compare-col-name">
        <col class="compare-col-score">
        <col class="compare-col-score">
        <col class="compare-col-score">
        <col class="compare-col-note">
      </colgroup>
      <thead>
        <tr>
          <th>Institution</th>
          <th>Fashion / industry</th>
          <th>Science &amp; tech crossover</th>
          <th>Business / entrepreneurship</th>
          <th>Take</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    `;

    table.querySelectorAll(".compare-row").forEach((row) => {
      row.addEventListener("click", () => openModal(row.dataset.id));
      row.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(row.dataset.id);
        }
      });
    });
  }

  function setView(view) {
    state.view = view;
    const listView = document.getElementById("list-view");
    const mapView = document.getElementById("map-view");
    const compareView = document.getElementById("compare-view");
    const listBtn = document.getElementById("view-list-btn");
    const mapBtn = document.getElementById("view-map-btn");
    const compareBtn = document.getElementById("view-compare-btn");

    listView.hidden = view !== "list";
    mapView.hidden = view !== "map";
    compareView.hidden = view !== "compare";
    listBtn.classList.toggle("active", view === "list");
    mapBtn.classList.toggle("active", view === "map");
    compareBtn.classList.toggle("active", view === "compare");
    listBtn.setAttribute("aria-pressed", String(view === "list"));
    mapBtn.setAttribute("aria-pressed", String(view === "map"));
    compareBtn.setAttribute("aria-pressed", String(view === "compare"));

    if (view === "map") {
      initMap();
      renderMarkers();
      requestAnimationFrame(() => map.invalidateSize());
    } else if (view === "compare") {
      renderCompareTable();
    }
  }

  document.getElementById("view-list-btn").addEventListener("click", () => setView("list"));
  document.getElementById("view-map-btn").addEventListener("click", () => setView("map"));
  document.getElementById("view-compare-btn").addEventListener("click", () => setView("compare"));

  function refreshViews() {
    renderCards();
    if (state.view === "map") renderMarkers();
    if (state.view === "compare") renderCompareTable();
  }

  function setupChipGroup(containerId, key) {
    const container = document.getElementById(containerId);
    container.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        container.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", "false"));
        chip.setAttribute("aria-pressed", "true");
        state[key] = chip.dataset[key];
        refreshViews();
      });
    });
  }

  function setupMultiChipGroup(containerId, key) {
    const container = document.getElementById(containerId);
    const allChip = container.querySelector(".chip-all");
    const optionChips = [...container.querySelectorAll(".chip:not(.chip-all)")];

    function syncAllChipState() {
      allChip.setAttribute("aria-pressed", String(state[key].size === 0));
    }

    allChip.addEventListener("click", () => {
      state[key].clear();
      optionChips.forEach((c) => c.setAttribute("aria-pressed", "false"));
      syncAllChipState();
      refreshViews();
    });

    optionChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const value = chip.dataset[key.slice(0, -1)] || chip.dataset[key];
        const nowSelected = chip.getAttribute("aria-pressed") !== "true";
        chip.setAttribute("aria-pressed", String(nowSelected));
        if (nowSelected) {
          state[key].add(value);
        } else {
          state[key].delete(value);
        }
        syncAllChipState();
        refreshViews();
      });
    });
  }

  setupChipGroup("city-filters", "city");
  setupMultiChipGroup("field-filters", "fields");
  setupChipGroup("type-filters", "type");
  setupChipGroup("status-filters", "status");

  searchInput.addEventListener("input", (e) => {
    state.query = e.target.value.trim();
    renderCards();
    if (state.view === "map") renderMarkers();
    if (state.view === "compare") renderCompareTable();
  });

  renderCards();
})();
