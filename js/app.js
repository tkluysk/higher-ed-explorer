(function () {
  const FIELD_LABELS = {
    fashion: "Fashion",
    chemistry: "Chemistry",
    business: "Business",
    finance: "Finance",
  };

  const state = {
    field: "all",
    type: "all",
    query: "",
    view: "list",
  };

  const cardGrid = document.getElementById("card-grid");
  const resultCount = document.getElementById("result-count");
  const searchInput = document.getElementById("search-input");
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modalBody = document.getElementById("modal-body");
  const modalClose = document.getElementById("modal-close");

  let map = null;
  let markers = [];

  function matchesFilters(inst) {
    if (state.field !== "all" && !inst.fields[state.field]) return false;
    if (state.type !== "all" && inst.type !== state.type) return false;
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
        return `
        <article class="card" tabindex="0" role="button" data-id="${inst.id}" aria-label="View details for ${inst.name}">
          <div class="card-top">
            <h3 class="card-name">${inst.name}</h3>
            <span class="card-type">${inst.type}</span>
          </div>
          <p class="card-location">${inst.location}</p>
          <p class="card-desc">${inst.description}</p>
          <div class="field-tags">${tags}</div>
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

    modalBody.innerHTML = `
      <h2 class="modal-title" id="modal-title">${inst.name}</h2>
      <p class="modal-meta">${inst.type} · ${inst.location}</p>
      <p class="modal-desc">${inst.description}</p>
      <div class="modal-section-title">Relevant programs</div>
      ${sections}
      <a class="modal-website" href="${inst.website}" target="_blank" rel="noopener noreferrer">Visit website &rarr;</a>
    `;
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
    map = L.map("map").setView([-37.8136, 144.9631], 11);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 18,
    }).addTo(map);
    renderMarkers();
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
      const marker = L.marker([inst.lat, inst.lng]).addTo(map);
      marker.bindPopup(`
        <p class="popup-name">${inst.name}</p>
        <p class="popup-location">${inst.type} · ${inst.location}</p>
        <div class="field-tags">${tags}</div>
        <p class="popup-link"><a href="#" data-id="${inst.id}" class="popup-details-link">View details</a></p>
      `);
      marker.on("popupopen", () => {
        const link = document.querySelector(".popup-details-link");
        if (link) {
          link.addEventListener("click", (e) => {
            e.preventDefault();
            openModal(inst.id);
          });
        }
      });
      markers.push(marker);
    });

    if (markers.length) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.15));
    }
  }

  function setView(view) {
    state.view = view;
    const listView = document.getElementById("list-view");
    const mapView = document.getElementById("map-view");
    const listBtn = document.getElementById("view-list-btn");
    const mapBtn = document.getElementById("view-map-btn");

    if (view === "list") {
      listView.hidden = false;
      mapView.hidden = true;
      listBtn.classList.add("active");
      mapBtn.classList.remove("active");
      listBtn.setAttribute("aria-pressed", "true");
      mapBtn.setAttribute("aria-pressed", "false");
    } else {
      listView.hidden = true;
      mapView.hidden = false;
      listBtn.classList.remove("active");
      mapBtn.classList.add("active");
      listBtn.setAttribute("aria-pressed", "false");
      mapBtn.setAttribute("aria-pressed", "true");
      initMap();
      renderMarkers();
      requestAnimationFrame(() => map.invalidateSize());
    }
  }

  document.getElementById("view-list-btn").addEventListener("click", () => setView("list"));
  document.getElementById("view-map-btn").addEventListener("click", () => setView("map"));

  function setupChipGroup(containerId, key) {
    const container = document.getElementById(containerId);
    container.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        container.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", "false"));
        chip.setAttribute("aria-pressed", "true");
        state[key] = chip.dataset[key];
        renderCards();
        if (state.view === "map") renderMarkers();
      });
    });
  }

  setupChipGroup("field-filters", "field");
  setupChipGroup("type-filters", "type");

  searchInput.addEventListener("input", (e) => {
    state.query = e.target.value.trim();
    renderCards();
    if (state.view === "map") renderMarkers();
  });

  renderCards();
})();
