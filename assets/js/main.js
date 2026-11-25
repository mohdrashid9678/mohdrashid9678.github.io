/* =============================================================================
 * Rendering logic. Reads window.PORTFOLIO (assets/js/data.js) and fills the
 * page. Each render function is a no-op if its container isn't on the page,
 * so the same script powers index.html, projects.html and writing.html.
 * ========================================================================== */
(function () {
  "use strict";

  const D = window.PORTFOLIO;
  if (!D) return console.error("PORTFOLIO data missing — is assets/js/data.js loaded?");

  /* ------------------------------------------------------------ ICONS */
  const S = (body, fill = true) =>
    `<svg viewBox="0 0 24 24" aria-hidden="true" ${fill ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"'}>${body}</svg>`;

  const ICONS = {
    github: S('<path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"/>'),
    linkedin: S('<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/>'),
    x: S('<path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z"/>'),
    substack: S('<path d="M22.54 8.24H1.46V5.41h21.08v2.83ZM1.46 10.81V24L12 18.11 22.54 24V10.81H1.46ZM22.54 0H1.46v2.84h21.08V0Z"/>'),
    email: S('<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 7 9 6 9-6"/>', false),
    leetcode: S('<path d="M13.48 0a1.37 1.37 0 0 0-.96.44L7.12 6.23l-3.86 4.12a5.27 5.27 0 0 0-1.33 2.62 5.53 5.53 0 0 0 .06 2.36c.08.35.2.69.35 1.02.3.68.73 1.3 1.27 1.82l4.28 4.19.04.04c2.25 2.16 5.85 2.13 8.06-.08l2.4-2.39a1.38 1.38 0 0 0-1.95-1.96l-2.4 2.4a3.02 3.02 0 0 1-4.2.03l-.02-.02-4.28-4.19c-.65-.64-.97-1.47-.95-2.26.01-.18.03-.35.07-.52.1-.43.31-.83.62-1.17l3.85-4.12c1.06-1.13 3.2-1.27 4.43-.28l3.5 2.83a1.38 1.38 0 0 0 1.73-2.15l-3.5-2.83c-.8-.65-1.77-1.04-2.77-1.2l2.01-2.16A1.38 1.38 0 0 0 13.48 0Zm-2.86 12.82a1.38 1.38 0 0 0 0 2.76h10.17a1.38 1.38 0 0 0 0-2.76H10.62Z"/>'),
    codeforces: S('<path d="M4.5 7.5C5.33 7.5 6 8.17 6 9v10.5c0 .83-.67 1.5-1.5 1.5h-3C.67 21 0 20.33 0 19.5V9c0-.83.67-1.5 1.5-1.5h3Zm9-4.5c.83 0 1.5.67 1.5 1.5v15c0 .83-.67 1.5-1.5 1.5h-3c-.83 0-1.5-.67-1.5-1.5v-15c0-.83.67-1.5 1.5-1.5h3Zm9 7.5c.83 0 1.5.67 1.5 1.5v7.5c0 .83-.67 1.5-1.5 1.5h-3c-.83 0-1.5-.67-1.5-1.5V12c0-.83.67-1.5 1.5-1.5h3Z"/>'),
    atcoder: S('<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 3.2a6.8 6.8 0 1 1-6.8 6.8 6.8 6.8 0 0 1 6.8-6.8Zm0 3.6a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/>'),
    arrowRight: S('<path d="M5 12h14M13 6l6 6-6 6"/>', false),
    external: S('<path d="M7 17 17 7M8 7h9v9"/>', false),
    download: S('<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>', false),
    copy: S('<rect x="8.5" y="8.5" width="12" height="12" rx="2.5"/><path d="M15.5 8.5V6a2.5 2.5 0 0 0-2.5-2.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5"/>', false),
    check: S('<path d="m5 12.5 4.5 4.5L19 7.5"/>', false),
    trophy: S('<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4ZM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>', false),
    search: S('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', false),
    sun: S('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>', false),
    moon: S('<path d="M20.5 13.2A8.5 8.5 0 1 1 10.8 3.5a6.6 6.6 0 0 0 9.7 9.7Z"/>', false),
    menu: S('<path d="M4 8h16M4 16h16"/>', false),
    up: S('<path d="M12 19V5M6 11l6-6 6 6"/>', false),
  };

  /* ---------------------------------------------------------- HELPERS */
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function fmtDate(d, style = "short") {
    if (!d) return "Present";
    const [y, m, day] = String(d).split("-");
    if (!m) return y;
    const mon = MONTHS[+m - 1];
    if (day && style === "long") return `${mon} ${+day}, ${y}`;
    return `${mon} ${y}`;
  }
  const range = (a, b) => (a ? `${fmtDate(a)} – ${fmtDate(b)}` : fmtDate(b));
  const byDateDesc = (a, b) => String(b.date || "").localeCompare(String(a.date || ""));
  const isExternal = (url) => /^(https?:)?\/\//.test(url);
  const ext = (url) => (isExternal(url) ? ' target="_blank" rel="noopener noreferrer"' : "");
  const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const tagList = (tags = []) => (tags.length ? `<ul class="tags">${tags.map((t) => `<li class="tag">${esc(t)}</li>`).join("")}</ul>` : "");
  const link = (id) => D.links.find((l) => l.id === id);
  const socials = () => D.links.filter((l) => l.kind === "social");
  const initials = D.profile.name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  // GitHub's language colours, for the little dot on project cards.
  const LANG = { Go: "#00ADD8", "C++": "#f34b7d", C: "#555555", TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5", Rust: "#dea584" };

  // Pinned projects keep their data.js order (= GitHub pin order); the rest follow, newest first.
  const pinIndex = (p) => (p.pinned ? D.projects.indexOf(p) : Infinity);
  const projectOrder = (a, b) => pinIndex(a) - pinIndex(b) || byDateDesc(a, b);

  const page = document.body.dataset.page;
  const isHome = page === "home";
  const base = isHome ? "" : "index.html";

  // localStorage can throw (private mode, blocked site data) — never let that break rendering.
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } },
  };

  /* ----------------------------------------------------------- THEME */
  const root = document.documentElement;
  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "dark" ? "#121211" : "#f7f6f2");
  }
  applyTheme(store.get("theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

  /* -------------------------------------------------- EMPTY SECTIONS */
  // Remove home sections whose data is empty, so nav and layout stay honest.
  if (!D.hackathons?.length) $("#hackathons")?.remove();
  if (!D.links.some((l) => l.kind === "cp")) $("#problem-solving")?.remove();
  if (!D.updates?.length) $("#updates")?.remove();

  /* ---------------------------------------------------------- HEADER */
  function renderHeader() {
    const el = $("#site-header");
    if (!el) return;
    const nav = [
      ["Experience", "experience"],
      ["Work", "projects"],
      ["Writing", "writing"],
      D.hackathons?.length ? ["Hackathons", "hackathons"] : null,
      ["Contact", "contact"],
    ].filter(Boolean);
    el.innerHTML = `
      <div class="container header-inner">
        <a class="brand" href="${base || "#top"}" aria-label="${esc(D.profile.name)} — home">
          <span class="brand-mark" aria-hidden="true">${esc(initials)}</span><span class="brand-name">${esc(D.profile.name)}</span>
        </a>
        <div class="header-actions">
          <nav class="nav" id="site-nav" aria-label="Primary">
            ${nav.map(([l, id]) => `<a href="${base}#${id}" id="nav-${id}" data-section="${id}">${l}</a>`).join("")}
          </nav>
          <button class="icon-btn theme-toggle" id="theme-toggle" type="button" aria-label="Toggle dark mode" title="Toggle theme">
            <span class="i-moon">${ICONS.moon}</span><span class="i-sun">${ICONS.sun}</span>
          </button>
          <button class="icon-btn menu-toggle" id="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-nav">${ICONS.menu}</button>
        </div>
      </div>
      <div class="progress" aria-hidden="true"></div>`;

    $("#theme-toggle").addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      store.set("theme", next);
      applyTheme(next);
    });
    const navEl = $("#site-nav");
    const menuBtn = $("#menu-toggle");
    const setMenu = (open) => {
      navEl.classList.toggle("open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    menuBtn.addEventListener("click", () => setMenu(!navEl.classList.contains("open")));
    navEl.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));
    document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

    if (page === "projects") $("#nav-projects")?.classList.add("active");
    if (page === "writing") $("#nav-writing")?.classList.add("active");
  }

  /* ------------------------------------------------------------ HERO */
  function renderHero() {
    const el = $("#hero");
    if (!el) return;
    const p = D.profile;
    const email = link("email");
    const paras = (Array.isArray(p.intro) ? p.intro : [p.intro]).map((t) => `<p>${t}</p>`).join("");
    const company = p.company
      ? ` at ${p.companyUrl ? `<a href="${esc(p.companyUrl)}"${ext(p.companyUrl)}>${esc(p.company)}</a>` : esc(p.company)}`
      : "";

    const facts = [
      ["Based in", esc(p.location)],
      p.company ? ["Currently", `${esc(p.role)}, ${esc(p.company)}`] : null,
      p.openTo ? ["Open to", esc(p.openTo)] : null,
    ].filter(Boolean);

    el.innerHTML = `
      <div class="hero-text">
        <p class="eyebrow reveal">${esc(p.role)}${company}</p>
        <h1 class="reveal">${esc(p.name)}</h1>
        <p class="lede reveal">${esc(p.lede || "")}</p>
        <div class="hero-intro reveal">${paras}</div>
        <div class="hero-actions reveal">
          ${email ? `<a class="btn primary" href="${esc(email.url)}">${ICONS.email}Get in touch</a>` : ""}
          <a class="btn" href="${base}#projects">See my work ${ICONS.arrowRight}</a>
          ${p.resume ? `<a class="btn" href="${esc(p.resume)}" download>${ICONS.download}Résumé</a>` : ""}
        </div>
        <ul class="hero-links reveal" aria-label="Profiles">
          ${socials().filter((l) => l.id !== "email").map((l) => `<li><a href="${esc(l.url)}"${ext(l.url)} id="hero-${l.id}">${ICONS[l.id] || ""}<span>${esc(l.label)}</span></a></li>`).join("")}
        </ul>
      </div>
      <aside class="hero-aside reveal" aria-label="At a glance">
        <figure class="portrait">
          <img src="${esc(p.photo)}" alt="Portrait of ${esc(p.name)}" width="320" height="320" decoding="async"
               onerror="this.onerror=null;this.src='https://github.com/${esc(link("github")?.handle || "")}.png'">
        </figure>
        <dl class="facts">
          ${facts.map(([k, v], i) => `<div${i === facts.length - 1 && p.openTo ? ' class="open"' : ""}><dt>${k}</dt><dd>${v}</dd></div>`).join("")}
        </dl>
      </aside>`;
  }

  /* ------------------------------------------------------ HIGHLIGHTS */
  function renderHighlights() {
    const el = $("#highlights");
    if (!el) return;
    if (!D.highlights?.length) return el.remove();
    el.innerHTML = `<ul class="stats-strip">${D.highlights
      .map(
        (h) => `<li class="reveal">
          <span class="stat-value">${esc(h.value)}${h.unit ? `<small>${esc(h.unit)}</small>` : ""}</span>
          <span class="stat-label">${esc(h.label)}</span>
          ${h.source ? `<span class="stat-source">${esc(h.source)}</span>` : ""}
        </li>`
      )
      .join("")}</ul>`;
  }

  /* --------------------------------------------------------- UPDATES */
  function renderUpdates() {
    const el = $("#updates-list");
    if (!el) return;
    el.innerHTML = [...D.updates]
      .sort(byDateDesc)
      .map((u) => `<li class="reveal"><time datetime="${esc(u.date)}">${fmtDate(u.date)}</time><p>${u.text}</p></li>`)
      .join("");
  }

  /* ---------------------------------------------- EXPERIENCE + SKILLS */
  function renderExperience() {
    const el = $("#experience-list");
    if (!el) return;
    const roles = D.experience.map((x) => {
      const org = x.url ? `<a href="${esc(x.url)}"${ext(x.url)}>${esc(x.company)}</a>` : esc(x.company);
      const points = (x.points || []).filter(Boolean);
      return `<li class="entry reveal${x.end ? "" : " current"}">
        <span class="entry-when">${range(x.start, x.end)}</span>
        <div class="entry-body">
          <h3>${esc(x.role)} <span class="at">at</span> <span class="org">${org}</span></h3>
          ${x.summary || x.location ? `<p class="entry-sub">${[x.summary, x.location].filter(Boolean).map(esc).join(" · ")}</p>` : ""}
          ${points.length ? `<ul class="entry-points">${points.map((pt) => `<li>${pt}</li>`).join("")}</ul>` : ""}
          ${tagList(x.tags)}
        </div>
      </li>`;
    });
    const edu = (D.education || []).map((e) => {
      const school = e.school ? (e.url ? `<a href="${esc(e.url)}"${ext(e.url)}>${esc(e.school)}</a>` : esc(e.school)) : "";
      return `<li class="entry edu reveal">
        <span class="entry-when">${esc(e.start)} – ${esc(e.end)}</span>
        <div class="entry-body">
          <h3>${esc(e.degree)}</h3>
          ${school ? `<p class="entry-sub">${school}</p>` : ""}
          ${e.details ? `<p class="entry-sub">${esc(e.details)}</p>` : ""}
        </div>
      </li>`;
    });
    el.innerHTML =
      `<p class="list-label">Work</p><ol class="entries">${roles.join("")}</ol>` +
      (edu.length ? `<p class="list-label">Education</p><ol class="entries">${edu.join("")}</ol>` : "");

    const sk = $("#skills");
    if (sk && D.skills?.length) {
      sk.innerHTML = `<p class="list-label">Toolbox</p><dl class="toolbox">${D.skills
        .map((g) => `<div class="reveal"><dt>${esc(g.group)}</dt><dd>${g.items.map((i) => `<span>${esc(i)}</span>`).join("")}</dd></div>`)
        .join("")}</dl>`;
    }
  }

  /* ---------------------------------------------------------- PROJECTS */
  const lang = (p) =>
    p.language ? `<span class="lang"><i style="background:${LANG[p.language] || "var(--faint)"}"></i>${esc(p.language)}</span>` : "";

  const projectCard = (p) => `
    <article class="card reveal" id="project-${slug(p.title)}">
      <div class="card-top">${lang(p)}${p.status ? `<span class="status">${esc(p.status)}</span>` : ""}<span class="card-date">${fmtDate(p.date)}</span></div>
      <h3><a class="stretched" href="${esc(p.url)}"${ext(p.url)}>${esc(p.title)}</a><span class="arrow">${ICONS.external}</span></h3>
      ${p.tagline ? `<p class="tagline">${esc(p.tagline)}</p>` : ""}
      <p class="desc">${esc(p.description)}</p>
      <div class="card-foot">
        ${p.metric ? `<span class="metric">${esc(p.metric)}</span>` : ""}
        ${tagList(p.tags)}
      </div>
    </article>`;

  const featureCard = (p) => `
    <article class="feature reveal" id="project-${slug(p.title)}">
      <div class="feature-main">
        <div class="card-top"><span class="kicker">Featured</span>${lang(p)}<span class="card-date">${fmtDate(p.date)}</span></div>
        <h3><a class="stretched" href="${esc(p.url)}"${ext(p.url)}>${esc(p.title)}</a><span class="arrow">${ICONS.external}</span></h3>
        ${p.tagline ? `<p class="tagline">${esc(p.tagline)}</p>` : ""}
        <p class="desc">${esc(p.description)}</p>
        ${p.highlights?.length ? `<ul class="feature-points">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
        ${tagList(p.tags)}
      </div>
      ${
        p.stats?.length
          ? `<div class="feature-stats">
              <p class="list-label">Load test</p>
              <dl>${p.stats.map((s) => `<div><dt>${esc(s.label)}</dt><dd>${esc(s.value)}</dd></div>`).join("")}</dl>
              ${p.statsNote ? `<p class="stats-note">${esc(p.statsNote)}</p>` : ""}
            </div>`
          : ""
      }
    </article>`;

  /* ---------------------------------------------------------- WRITING */
  const postRow = (a) => `
    <li class="post reveal">
      <a class="post-link" href="${esc(a.url)}"${ext(a.url)}>
        <time datetime="${esc(a.date)}">${fmtDate(a.date, "long")}</time>
        <div>
          <h3>${esc(a.title)}</h3>
          ${a.description ? `<p>${esc(a.description)}</p>` : ""}
          ${tagList(a.tags)}
        </div>
        <span class="arrow">${ICONS.external}</span>
      </a>
    </li>`;

  function substackCard() {
    const s = link("substack");
    if (!s) return `<div class="empty">First article coming soon.</div>`;
    return `<div class="newsletter reveal">
      <span class="newsletter-icon">${ICONS.substack}</span>
      <div>
        <h3>Deep-dives on engineering, systems and AI</h3>
        <p>Long-form notes on the things I build: caching and load tests, kernel networking with eBPF, and what it takes to make AI agents dependable. Published on Substack.</p>
      </div>
      <a class="btn primary" href="${esc(s.url)}"${ext(s.url)}>Read on Substack ${ICONS.external}</a>
    </div>`;
  }

  function renderHomeLists() {
    const pg = $("#projects-grid");
    if (pg) {
      const all = [...D.projects].sort(projectOrder);
      const pinned = all.filter((p) => p.pinned);
      const shown = pinned.length ? pinned : all.slice(0, 5);
      const [first, ...rest] = shown;
      pg.innerHTML = (first ? featureCard(first) : "") + `<div class="card-grid">${rest.map(projectCard).join("")}</div>`;
      const more = $("#projects-all");
      if (more) {
        more.querySelector(".count").textContent = all.length;
        more.hidden = all.length <= shown.length;
      }
    }
    const pl = $("#writing-list");
    if (pl) {
      const all = [...D.articles].sort(byDateDesc);
      pl.innerHTML = all.length ? `<ul class="post-list">${all.slice(0, 5).map(postRow).join("")}</ul>` : substackCard();
      const more = $("#writing-all");
      if (more) {
        more.querySelector(".count").textContent = all.length;
        more.hidden = all.length <= 5;
      }
    }
  }

  /* --------------------------------------------------- PROBLEM SOLVING */
  function renderProblemSolving() {
    const el = $("#cp-grid");
    if (!el) return;
    const cp = D.links.filter((l) => l.kind === "cp");
    const repo = D.projects.find((p) => (p.tags || []).includes("Competitive Programming"));
    el.innerHTML =
      cp
        .map(
          (l) => `<a class="cp-card reveal" href="${esc(l.url)}"${ext(l.url)} id="cp-${l.id}">
            <span class="cp-icon">${ICONS[l.id] || ""}</span>
            <span class="cp-text"><strong>${esc(l.label)}</strong><span>${esc(l.stat || "@" + l.handle)}</span></span>
            <span class="arrow">${ICONS.external}</span>
          </a>`
        )
        .join("") +
      (repo
        ? `<a class="cp-card reveal" href="${esc(repo.url)}"${ext(repo.url)} id="cp-repo">
            <span class="cp-icon">${ICONS.github}</span>
            <span class="cp-text"><strong>${esc(repo.title)}</strong><span>DSA · CSES · contest solutions</span></span>
            <span class="arrow">${ICONS.external}</span>
          </a>`
        : "");
  }

  /* ------------------------------------------------------ HACKATHONS */
  function renderHackathons() {
    const el = $("#hackathon-list");
    if (!el) return;
    const cls = (r = "") => (/win|1st|first|champion/i.test(r) ? "win" : /final|runner|2nd|3rd|top/i.test(r) ? "final" : "");
    el.innerHTML = [...D.hackathons]
      .sort(byDateDesc)
      .map(
        (h) => `<li class="entry reveal">
          <span class="entry-when">${fmtDate(h.date)}</span>
          <div class="entry-body">
            <h3>${h.url ? `<a href="${esc(h.url)}"${ext(h.url)}>${esc(h.name)}</a>` : esc(h.name)}${h.organizer ? ` <span class="at">· ${esc(h.organizer)}</span>` : ""}</h3>
            <p class="entry-sub">${h.project ? `<strong>${esc(h.project)}</strong> — ` : ""}${esc(h.description)}</p>
            ${tagList(h.tags)}
          </div>
          ${h.result ? `<span class="badge ${cls(h.result)}">${ICONS.trophy}${esc(h.result)}</span>` : ""}
        </li>`
      )
      .join("");
  }

  /* ---------------------------------------------------------- CONTACT */
  function renderContact() {
    const el = $("#contact-card");
    if (!el) return;
    const email = link("email");
    const others = socials().filter((l) => l.id !== "email");
    el.innerHTML = `
      <p class="eyebrow">Contact</p>
      <h2 id="contact-title">Let's build something <em>reliable</em>.</h2>
      <p class="contact-copy">I'm always happy to talk about backend architecture, distributed systems, eBPF or AI agents, whether it's a role, a collaboration or just a good technical conversation.</p>
      ${
        email
          ? `<div class="email-row">
              <a class="email-big" id="contact-email" href="${esc(email.url)}">${esc(email.handle)}</a>
              <button class="icon-btn copy-btn" type="button" id="copy-email" data-copy="${esc(email.handle)}" aria-label="Copy email address" title="Copy email">${ICONS.copy}</button>
              <span class="copy-status" role="status" aria-live="polite"></span>
            </div>`
          : ""
      }
      <ul class="contact-links">
        ${others.map((l) => `<li><a href="${esc(l.url)}"${ext(l.url)} id="contact-${l.id}">${ICONS[l.id] || ""}<span>${esc(l.label)}</span><small>${esc(l.handle)}</small></a></li>`).join("")}
        ${D.profile.resume ? `<li><a href="${esc(D.profile.resume)}" id="contact-resume" download>${ICONS.download}<span>Résumé</span><small>PDF</small></a></li>` : ""}
      </ul>`;

    const btn = $("#copy-email");
    btn?.addEventListener("click", async () => {
      const status = $(".copy-status", el);
      const text = btn.dataset.copy;
      let ok = false;
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch (e) {
        const ta = Object.assign(document.createElement("textarea"), { value: text });
        ta.style.cssText = "position:fixed;opacity:0";
        document.body.appendChild(ta);
        ta.select();
        try { ok = document.execCommand("copy"); } catch (_) { ok = false; }
        ta.remove();
      }
      btn.innerHTML = ok ? ICONS.check : ICONS.copy;
      status.textContent = ok ? "Copied" : "Press Ctrl+C to copy";
      setTimeout(() => {
        btn.innerHTML = ICONS.copy;
        status.textContent = "";
      }, 2000);
    });
  }

  /* ----------------------------------------------------------- FOOTER */
  function renderFooter() {
    const el = $("#site-footer");
    if (!el) return;
    el.innerHTML = `
      <div class="container footer-inner">
        <p>© ${new Date().getFullYear()} ${esc(D.profile.name)} <span class="sep">·</span> ${esc(D.profile.location)}</p>
        <ul class="footer-icons" aria-label="Profiles">
          ${D.links.map((l) => `<li><a href="${esc(l.url)}"${ext(l.url)} aria-label="${esc(l.label)}" title="${esc(l.label)}">${ICONS[l.id] || ""}</a></li>`).join("")}
        </ul>
        <p class="footer-note">Hand-built with HTML, CSS &amp; JS · Hosted on <a href="https://pages.github.com" target="_blank" rel="noopener">GitHub Pages</a></p>
      </div>`;

    const top = document.createElement("button");
    top.className = "icon-btn to-top";
    top.id = "to-top";
    top.type = "button";
    top.setAttribute("aria-label", "Back to top");
    top.innerHTML = ICONS.up;
    top.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
    document.body.appendChild(top);
  }

  /* ------------------------------------------------------ LIST PAGES */
  function renderListPage(kind) {
    const listEl = $("#list");
    if (!listEl) return;
    const items = kind === "projects" ? [...D.projects].sort(projectOrder) : [...D.articles].sort(byDateDesc);
    const toolbar = $(".toolbar");

    if (!items.length) {
      if (toolbar) toolbar.hidden = true;
      listEl.innerHTML = kind === "writing" ? substackCard() : `<div class="empty">Nothing here yet.</div>`;
      return observeReveals();
    }

    const tagCounts = {};
    items.forEach((i) => (i.tags || []).forEach((t) => (tagCounts[t] = (tagCounts[t] || 0) + 1)));
    // Only offer tags shared by 2+ items (search covers the rest); keep all when the list is small.
    const minCount = items.length > 6 ? 2 : 1;
    const tags = Object.keys(tagCounts)
      .filter((t) => tagCounts[t] >= minCount)
      .sort((a, b) => tagCounts[b] - tagCounts[a] || a.localeCompare(b));

    const params = new URLSearchParams(location.search);
    let active = params.get("tag") || "";
    let query = params.get("q") || "";

    const search = $("#search");
    const tagBar = $("#tag-filter");
    const count = $("#result-count");
    search.value = query;

    tagBar.innerHTML =
      `<button class="tag" type="button" data-tag="">All <span>${items.length}</span></button>` +
      tags.map((t) => `<button class="tag" type="button" data-tag="${esc(t)}">${esc(t)} <span>${tagCounts[t]}</span></button>`).join("");

    function update() {
      const q = query.trim().toLowerCase();
      const filtered = items.filter((i) => {
        if (active && !(i.tags || []).includes(active)) return false;
        if (!q) return true;
        return [i.title, i.tagline, i.description, ...(i.tags || [])].join(" ").toLowerCase().includes(q);
      });
      tagBar.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.tag === active)));
      count.textContent = `${filtered.length} of ${items.length} ${kind === "projects" ? "projects" : "articles"}${active ? ` · ${active}` : ""}`;
      if (!filtered.length) {
        listEl.innerHTML = `<div class="empty">Nothing matches that filter.</div>`;
      } else if (kind === "projects") {
        listEl.innerHTML = `<div class="card-grid">${filtered.map(projectCard).join("")}</div>`;
      } else {
        listEl.innerHTML = `<ul class="post-list">${filtered.map(postRow).join("")}</ul>`;
      }
      const sp = new URLSearchParams();
      if (active) sp.set("tag", active);
      if (query) sp.set("q", query);
      history.replaceState(null, "", sp.toString() ? `?${sp}` : location.pathname);
      observeReveals();
    }

    tagBar.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      active = b.dataset.tag === active ? "" : b.dataset.tag;
      update();
    });
    search.addEventListener("input", () => {
      query = search.value;
      update();
    });
    update();
  }

  /* -------------------------------------------------- INTERACTIONS */
  let io;
  function observeReveals() {
    const els = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) return els.forEach((e) => e.classList.add("in"));
    io =
      io ||
      new IntersectionObserver(
        (entries) =>
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("in");
              io.unobserve(en.target);
            }
          }),
        { rootMargin: "0px 0px -40px 0px", threshold: 0.05 }
      );
    els.forEach((e) => io.observe(e));
  }

  function scrollEffects() {
    const header = $("#site-header");
    const top = $("#to-top");
    const sections = [...document.querySelectorAll("main section[id]")];
    const navLinks = document.querySelectorAll(".nav a[data-section]");
    let ticking = false;
    function onScroll() {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      header?.style.setProperty("--progress", p.toFixed(4));
      header?.classList.toggle("scrolled", h.scrollTop > 8);
      top?.classList.toggle("show", h.scrollTop > 700);
      if (isHome && sections.length) {
        let cur = "";
        for (const s of sections) if (s.getBoundingClientRect().top < 140) cur = s.id;
        navLinks.forEach((a) => a.classList.toggle("active", a.dataset.section === cur));
      }
      ticking = false;
    }
    addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(onScroll);
          ticking = true;
        }
      },
      { passive: true }
    );
    onScroll();
  }

  /* ------------------------------------------------------------ BOOT */
  renderHeader();
  renderHero();
  renderHighlights();
  renderUpdates();
  renderExperience();
  renderHomeLists();
  renderProblemSolving();
  renderHackathons();
  renderContact();
  renderFooter();
  if (page === "projects") renderListPage("projects");
  if (page === "writing") renderListPage("writing");
  observeReveals();
  scrollEffects();
})();
