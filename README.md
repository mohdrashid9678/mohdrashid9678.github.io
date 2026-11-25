# mohdrashid9678.github.io

Personal portfolio of **Mohd Rashid**, software engineer (backend, distributed systems, eBPF, AI agents).
Plain HTML/CSS/JS, no build step, hosted on GitHub Pages.

## Structure

```
index.html            Home: intro, highlights, recent updates, selected work, experience + toolbox,
                      writing, problem solving, hackathons (hidden while empty), contact
projects.html         All projects (search + tag filter, state kept in the URL)
writing.html          All Substack articles (search + tag filter; Substack card while empty)
assets/js/data.js     ← ALL CONTENT LIVES HERE
assets/js/main.js     Rendering logic
assets/css/style.css  Styles (light/dark theme, responsive, reduced motion, print)
assets/img/           favicon.svg (add profile.jpg here to override the GitHub avatar)
```

## Updating content

Edit `assets/js/data.js`; every section is driven from it. Search for `TODO` to find optional details.

- **Featured projects:** `pinned: true` puts a project on the home page, in the order listed (keep it in sync with your GitHub pins). The first pinned project gets the large card; its `stats` render as the load-test table.
- **Add a project:** append to `projects` (`title`, `tagline`, `description`, `language`, `tags`, `date`, `url`, optional `metric` / `status`).
- **Add an article:** append to `articles` (`title`, `description`, `tags`, `date`, `url` → Substack post). While the list is empty, the Writing section shows a "Read on Substack" card.
- **Hackathons:** add entries to `hackathons` and the section and nav link appear automatically.
- **Competitive programming:** set `stat` on the LeetCode / AtCoder links (e.g. `"Rating 1650 · Knight"`) to show it on the cards.
- **Highlights strip:** `highlights` holds the four numbers under the hero; keep each one backed by a project.
- **Photo:** save a square picture as `assets/img/profile.jpg` and set `profile.photo` to that path.
- **Résumé:** drop the PDF in `assets/` and set `profile.resume`.

## Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy

Push to `main`, then **Settings → Pages → Source: Deploy from a branch → `main` / root**.
