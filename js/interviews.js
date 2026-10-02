// Interviews page: every institution's `meetingQuestions` (see
// data/institutions.js), newest first, at full width. The same data renders
// inside each school's detail view on the Institutions page.
(function () {
  const meetings = INSTITUTIONS.filter((i) => i.meetingQuestions)
    .map((inst) => ({ inst, m: inst.meetingQuestions }))
    .sort((a, b) => (b.m.date || "").localeCompare(a.m.date || ""));

  const fmtDate = (iso) =>
    iso ? new Date(iso + "T00:00:00").toLocaleDateString("en-NZ", { weekday: "short", day: "numeric", month: "long", year: "numeric" }) : "";

  const question = (item) => {
    const gap = item.gap ? ` <span class="question-gap" title="Not answered — still open">gap</span>` : "";
    const answer = item.answer ? `<span class="question-answer">${item.answer}</span>` : "";
    const links = (item.links || []).map((l) => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a>`).join("");
    return `<li>${item.q}${gap}${answer}${links ? `<span class="question-links">${links}</span>` : ""}</li>`;
  };

  const el = document.getElementById("interviews");
  if (!meetings.length) {
    el.innerHTML = `<p class="no-results">No interviews recorded yet.</p>`;
    return;
  }

  // Jump links for the page, then one card per meeting.
  const toc = meetings
    .map(({ inst, m }) => `<a href="#${inst.id}">${inst.name} · ${fmtDate(m.date)}</a>`)
    .join("");

  el.innerHTML =
    `<p class="question-links interview-toc">${toc}</p>` +
    meetings
      .map(({ inst, m }) => {
        const actions = [
          m.transcriptUrl && `<a href="${m.transcriptUrl}" target="_blank" rel="noopener noreferrer">Transcript &amp; sourced findings</a>`,
          m.recordingUrl && `<a href="${m.recordingUrl}" target="_blank" rel="noopener noreferrer">Recording (Google Drive)</a>`,
          `<a href="index.html#school=${inst.id}&full">Open ${inst.name} page</a>`,
        ].filter(Boolean).join("");
        const groups = m.groups
          .map((g) => `<p class="question-group-label">${g.label}</p><ol class="question-list">${g.questions.map(question).join("")}</ol>`)
          .join("");
        const followUps = m.followUps && m.followUps.length
          ? `<p class="question-group-label">Follow-ups</p><ul class="question-list">${m.followUps.map((f) => `<li>${f}</li>`).join("")}</ul>`
          : "";
        return `
        <article class="interview-card" id="${inst.id}">
          <p class="interview-meta">${fmtDate(m.date)}</p>
          <h2 class="interview-title">${inst.name}</h2>
          <p class="interview-sub">${m.title}</p>
          <p class="question-links interview-actions">${actions}</p>
          ${m.context ? `<p class="meeting-context">${m.context}</p>` : ""}
          <div class="question-block">${groups}${followUps}</div>
        </article>`;
      })
      .join("");
})();
