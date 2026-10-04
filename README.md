# mohdrashid9678.github.io

Personal portfolio of **Mohd Rashid** — software engineer (backend, distributed systems, eBPF, agentic AI).
Plain HTML/CSS/JS, no build step, hosted on GitHub Pages.

## Structure

```
index.html            Home: intro, updates, about, experience, education, projects, writing, hackathons, CP, contact
projects.html         All projects (search + tag filter)
writing.html          All Substack articles (search + tag filter)
assets/js/data.js     ← ALL CONTENT LIVES HERE
assets/js/main.js     Rendering logic
assets/css/style.css  Styles (light/dark theme)
assets/img/           profile.jpg, favicon.svg
```

## Updating content

Edit `assets/js/data.js` — every section is driven from it. Search for `TODO` to find placeholders.

- **Add an article:** append to `articles` (`title`, `description`, `tags`, `date`, `url` → Substack link).
- **Add a project:** append to `projects`. `pinned: true` keeps it on top; `metric` shows a highlight.
- **Home page limit:** `site.homeLimit` (default 10) — the rest appear on the "View all" pages.
- **Photo:** save your picture as `assets/img/profile.jpg` (square works best). Falls back to your GitHub avatar.
- **Résumé:** drop the PDF in `assets/` and set `profile.resume`.

## Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy

Push to `main`, then **Settings → Pages → Source: Deploy from a branch → `main` / root**.
