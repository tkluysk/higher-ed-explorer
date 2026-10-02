# Melbourne Higher Ed Explorer

A personal reference tool for cataloguing and comparing Melbourne higher
education institutions — built to help research options in **fashion,
chemistry, business, and finance**.

Live at: https://tkluysk.github.io/higher-ed-explorer/

## Features

- **List and map views** of 16 Melbourne universities, TAFEs, and private
  colleges
- **Filter** by field of interest, institution type, and status
- **Search** across institution names, locations, and program names
- **Detail view** per institution: relevant programs, a short description,
  and Open Day / campus tour info
- **Star / not-interested** status per institution — set from the card, map
  pin, or detail view. Not-interested picks are shaded red; status is saved
  in the browser's `localStorage`, so it persists on the same device but
  doesn't sync across devices (this is a static site with no backend)
- **Student accommodation map** (`accommodation.html`): RMIT's 23 listed
  private residences plus UniMelb and Swinburne university-run housing, pinned
  by weekly price, with transit/bike/walk times to RMIT Brunswick, UniMelb
  Parkville and Swinburne Hawthorn, a sortable table, and what each interview
  taught us about housing
- **Site navigation**: one bar across every page (Institutions, Accommodation,
  Fees, Timeline, Interviews), rendered by `js/nav.js`
- **Full-page school view**: the ⤢ button expands a school's detail view to the
  whole window; the URL (`index.html#school=unimelb&full`) can be bookmarked or
  shared
- **Fees calculator** (`fees.html`): tuition by student-contribution band (2026
  government maximums, indexed to the study year), SSAF, housing from the
  accommodation data, living costs, flights and setup, per year and per
  semester, in A$ and NZ$. NZ citizens pay tuition upfront each semester (no
  HECS-HELP), so it also lists the payment schedule. Inputs persist in the browser
- **Interviews** (`interviews.html`): every staff interview's questions,
  answers, open gaps and follow-ups, with transcript and recording links
- **Milestones timeline** (`timeline.html`): application, housing and
  enrolment deadlines for a 2028 start, built from `data/milestones.json` with
  the `timeline` skill's generator. Rebuild after editing the data with
  `node scripts/build-timeline.js && python3 scripts/check-timeline.py timeline.html`

## Running locally

No build step — it's plain HTML/CSS/JS. Serve the directory with any static
file server, e.g.:

```
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Structure

```
index.html          Page shell and markup
css/styles.css       Styling (light/dark theme via CSS custom properties)
js/app.js            Filtering, rendering, map, and status logic
data/institutions.js Seed dataset — institutions, programs, and visit info
accommodation.html   Accommodation map page
js/accommodation.js  Map, filters and table for the accommodation page
data/accommodation.js Residences, prices, commute times to 3 campuses, housing notes
fees.html            Fees calculator (js/fees.js, data/fees.js)
interviews.html      Interview Q&A (js/interviews.js, from meetingQuestions in data/institutions.js)
js/nav.js            Site-wide navigation bar
timeline.html        Milestones timeline (generated; don't edit by hand)
data/milestones.json Milestones for the timeline
scripts/             build-timeline.js (generator) and check-timeline.py (geometry check)
transcripts/         Interview transcripts with sourced findings
```

## Meeting recordings and transcripts

Conversations with university staff are recorded, transcribed locally
(Whisper or WhisperX `medium`; WhisperX adds speaker labels), and summarised with each finding linked to the official
university or government page that backs it up. Transcripts are committed
under [`transcripts/`](transcripts/). The audio is too large for git and is
filed on Google Drive (private; owner access only).

| Date | Meeting | Transcript | Recording |
|---|---|---|---|
| 28 Sep 2026 | Swinburne — Student HQ conversation (Hawthorn) | [Transcript & findings](transcripts/2026-09-28-swinburne-student-hq.md) | [Swinburne student HQ.m4a](https://drive.google.com/file/d/1tM7sur7f_EgvRWHvl-MfjgrKI8Ej2gQQ/view) |
| 2 Oct 2026 | University of Melbourne — Prospective Students Q&A (Stop 1, Parkville) | [Transcript & findings](transcripts/2026-10-02-unimelb-prospective-students.md) | [UOM Q&A.m4a](https://drive.google.com/file/d/1lrd22IeKZDwsILx8hLW86atebWwBryg5/view) |

## Data

Institution details (programs, campus locations, Open Day dates) were
compiled from institution websites as of August 2026. Program names, fees,
and Open Day dates change yearly — verify directly with the institution
before visiting or applying.

## Deployment

Published via GitHub Pages, serving from the `main` branch root. Pushing to
`main` updates the live site automatically.
