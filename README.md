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
```

## Data

Institution details (programs, campus locations, Open Day dates) were
compiled from institution websites as of August 2026. Program names, fees,
and Open Day dates change yearly — verify directly with the institution
before visiting or applying.

## Deployment

Published via GitHub Pages, serving from the `main` branch root. Pushing to
`main` updates the live site automatically.
