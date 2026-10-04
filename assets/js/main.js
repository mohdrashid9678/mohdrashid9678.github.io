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
  const S = (body, vb = "0 0 24 24", fill = true) =>
    `<svg viewBox="${vb}" aria-hidden="true" ${fill ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'}>${body}</svg>`;

  const ICONS = {
    github: S('<path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"/>'),
    linkedin: S('<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/>'),
    x: S('<path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z"/>'),
    substack: S('<path d="M22.54 8.24H1.46V5.41h21.08v2.83ZM1.46 10.81V24L12 18.11 22.54 24V10.81H1.46ZM22.54 0H1.46v2.84h21.08V0Z"/>'),
    email: S('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>', "0 0 24 24", false),
    leetcode: S('<path d="M13.48 0a1.37 1.37 0 0 0-.96.44L7.12 6.23l-3.86 4.12a5.27 5.27 0 0 0-1.33 2.62 5.53 5.53 0 0 0 .06 2.36c.08.35.2.69.35 1.02.3.68.73 1.3 1.27 1.82l4.28 4.19.04.04c2.25 2.16 5.85 2.13 8.06-.08l2.4-2.39a1.38 1.38 0 0 0-1.95-1.96l-2.4 2.4a3.02 3.02 0 0 1-4.2.03l-.02-.02-4.28-4.19c-.65-.64-.97-1.47-.95-2.26.01-.18.03-.35.07-.52.1-.43.31-.83.62-1.17l3.85-4.12c1.06-1.13 3.2-1.27 4.43-.28l3.5 2.83a1.38 1.38 0 0 0 1.73-2.15l-3.5-2.83c-.8-.65-1.77-1.04-2.77-1.2l2.01-2.16A1.38 1.38 0 0 0 13.48 0Zm-2.86 12.82a1.38 1.38 0 0 0 0 2.76h10.17a1.38 1.38 0 0 0 0-2.76H10.62Z"/>'),
    codeforces: S('<path d="M4.5 7.5C5.33 7.5 6 8.17 6 9v10.5c0 .83-.67 1.5-1.5 1.5h-3C.67 21 0 20.33 0 19.5V9c0-.83.67-1.5 1.5-1.5h3Zm9-4.5c.83 0 1.5.67 1.5 1.5v15c0 .83-.67 1.5-1.5 1.5h-3c-.83 0-1.5-.67-1.5-1.5v-15c0-.83.67-1.5 1.5-1.5h3Zm9 7.5c.83 0 1.5.67 1.5 1.5v7.5c0 .83-.67 1.5-1.5 1.5h-3c-.83 0-1.5-.67-1.5-1.5V12c0-.83.67-1.5 1.5-1.5h3Z"/>'),
    codechef: S('<path d="M18.8 9.5a4.8 4.8 0 0 0-2.3-4.1 5.3 5.3 0 0 0-9 0A4.8 4.8 0 0 0 5.2 9.5a4.7 4.7 0 0 0 .8 8.8v2.2a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5v-2.2a4.7 4.7 0 0 0 .8-8.8ZM12 4.5a3.3 3.3 0 0 1 3.2 2.6.8.8 0 0 0 .7.6 2.8 2.8 0 0 1 1.7 4.6.8.8 0 0 0-.1.9 2.7 2.7 0 0 1-2.5 1.9H9a2.7 2.7 0 0 1-2.5-1.9.8.8 0 0 0-.1-.9 2.8 2.8 0 0 1 1.7-4.6.8.8 0 0 0 .7-.6A3.3 3.3 0 0 1 12 4.5Z"/>'),
    atcoder: S('<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 3.2a6.8 6.8 0 1 1-6.8 6.8 6.8 6.8 0 0 1 6.8-6.8Zm0 3.6a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/>'),
    arrowRight: S('<path d="M5 12h14M13 6l6 6-6 6"/>', "0 0 24 24", false),
    arrowLeft: S('<path d="M19 12H5M11 6l-6 6 6 6"/>', "0 0 24 24", false),
    external: S('<path d="M7 17 17 7M8 7h9v9"/>', "0 0 24 24", false),
    pin: S('<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>', "0 0 24 24", false),
    download: S('<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>', "0 0 24 24", false),
    bolt: S('<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>'),
    trophy: S('<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4ZM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>', "0 0 24 24", false),
    repo: S('<path d="M4 19.5V5a2 2 0 0 1 2-2h14v15H6.5A2.5 2.5 0 0 0 4 20.5 2.5 2.5 0 0 0 6.5 23H20v-5"/>', "0 0 24 24", false),
    search: S('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', "0 0 24 24", false),
    sun: S('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>', "0 0 24 24", false),
    moon: S('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>', "0 0 24 24", false),
    menu: S('<path d="M4 7h16M4 12h16M4 17h16"/>', "0 0 24 24", false),
    up: S('<path d="M12 19V5M6 11l6-6 6 6"/>', "0 0 24 24", false),
  };
  window.ICONS = ICONS;

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
  const range = (a, b) => `${fmtDate(a)} — ${fmtDate(b)}`;
  const byDateDesc = (a, b) => String(b.date || "").localeCompare(String(a.date || ""));
  const pinnedFirst = (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || byDateDesc(a, b);
  const ext = (url) => (/^(https?:)?\/\//.test(url) ? ' target="_blank" rel="noopener noreferrer"' : "");
  const tagList = (tags = []) => (tags.length ? `<ul class="tags">${tags.map((t) => `<li class="tag">${esc(t)}</li>`).join("")}</ul>` : "");
  const link = (id) => D.links.find((l) => l.id === id);

  const isHome = document.body.dataset.page === "home";
  const base = isHome ? "" : "index.html";

  /* ----------------------------------------------------------- THEME */
  const root = document.documentElement;
  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "dark" ? "#0a0d14" : "#fbfbf9");
  }
  applyTheme(localStorage.getItem("theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

  /* ---------------------------------------------------------- HEADER */
  function renderHeader() {
    const el = $("#site-header");
    if (!el) return;
    const nav = [
      ["Experience", "#experience"],
      ["Projects", "#projects"],
      ["Writing", "#writing"],
      ["Hackathons", "#hackathons"],
      ["Contact", "#contact"],
    ];
    const initials = D.profile.name.split(" ").map((w) => w[0]).join("").slice(0, 2);
    el.innerHTML = `
      <div class="container header-inner">
        <a class="brand" href="${base || "#top"}" id="brand-link"><span class="brand-mark">${esc(initials)}</span>${esc(D.profile.name)}</a>
        <div class="header-actions">
          <nav class="nav" id="site-nav" aria-label="Primary">
            ${nav.map(([l, h]) => `<a href="${base}${h}" id="nav-${h.slice(1)}" data-section="${h.slice(1)}">${l}</a>`).join("")}
          </nav>
          <button class="icon-btn theme-toggle" id="theme-toggle" type="button" aria-label="Toggle dark mode" title="Toggle theme">
            <span class="i-moon">${ICONS.moon}</span><span class="i-sun">${ICONS.sun}</span>
          </button>
          <button class="icon-btn menu-toggle" id="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-nav">${ICONS.menu}</button>
        </div>
      </div>`;

    $("#theme-toggle").addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      applyTheme(next);
    });
    const navEl = $("#site-nav");
    const menuBtn = $("#menu-toggle");
    menuBtn.addEventListener("click", () => {
      const open = navEl.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    navEl.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        navEl.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });

    // mark active nav item on list pages
    const page = document.body.dataset.page;
    if (page === "projects") $("#nav-projects")?.classList.add("active");
    if (page === "writing") $("#nav-writing")?.classList.add("active");
  }

  /* ------------------------------------------------------------ HERO */
  // Top profile: photo, flowing bio paragraphs (intro + stack + education),
  // and all social / competitive programming links in one unified chip row.
  function renderHero() {
    const el = $("#hero");
    if (!el) return;
    const p = D.profile;
    const [first, ...rest] = p.name.split(" ");
    const email = link("email");

    const chip = (l) =>
      `<a class="chip-link" id="hero-${l.id}" href="${esc(l.url)}"${ext(l.url)} title="${esc(l.label)}${l.stat ? " · " + esc(l.stat) : ""}">${ICONS[l.id] || ""}<span>${esc(l.label)}</span></a>`;

    const paras = Array.isArray(p.intro) ? p.intro : [p.intro];
    const introHtml = paras.map((para) => `<p>${para}</p>`).join("");

    el.innerHTML = `
      <div class="photo-wrap">
        <img class="profile-photo" id="profile-photo" src="${esc(p.photo)}" alt="Portrait of ${esc(p.name)}" width="176" height="176"
             onerror="this.onerror=null;this.src='${esc(p.photoFallback)}'">
        ${p.available ? `<span class="status-pill"><span class="dot"></span>Open to opportunities</span>` : ""}
      </div>
      <div class="hero-body">
        <h1>${esc(first)} <span class="grad">${esc(rest.join(" "))}</span></h1>
        <p class="headline">${esc(p.role)}<span class="sep">·</span>${p.headline.split("·").map((s) => esc(s.trim())).join('<span class="sep">·</span>')}</p>
        <div class="hero-intro">${introHtml}</div>
        <div class="hero-meta">
          <span>${ICONS.pin}${esc(p.location)}</span>
          ${email ? `<span>${ICONS.email}<a href="${esc(email.url)}">${esc(email.handle)}</a></span>` : ""}
        </div>
        <div class="social-row">
          ${p.resume ? `<a class="chip-link primary" id="hero-resume" href="${esc(p.resume)}" download>${ICONS.download}<span>Résumé</span></a>` : ""}
          ${D.links.map(chip).join("")}
        </div>
      </div>`;
  }

  /* --------------------------------------------------------- UPDATES */
  function renderUpdates() {
    const el = $("#updates-list");
    if (!el) return;
    el.innerHTML = [...D.updates].sort(byDateDesc).map((u) => `<li><time datetime="${esc(u.date)}">${fmtDate(u.date)}</time><span>${u.text}</span></li>`).join("");
  }

  /* ------------------------------------------------------ EXPERIENCE */
  function renderExperience() {
    const el = $("#experience-list");
    if (!el) return;
    el.innerHTML = D.experience
      .map((x) => {
        const org = x.url ? `<a class="tl-org" href="${esc(x.url)}"${ext(x.url)}>${esc(x.company)}</a>` : `<span class="tl-org">${esc(x.company)}</span>`;
        return `<li class="tl-item reveal${x.end ? "" : " current"}">
          <div class="tl-head"><h3>${esc(x.role)}</h3><span class="tl-date">${range(x.start, x.end)}</span></div>
          <div class="tl-sub">${org}${x.location ? ` · ${esc(x.location)}` : ""}</div>
          ${x.points?.length ? `<ul>${x.points.map((p) => `<li>${p}</li>`).join("")}</ul>` : ""}
          ${tagList(x.tags)}
        </li>`;
      })
      .join("");
  }

  /* ---------------------------------------------- CARDS / ROWS */
  const projectCard = (p, showPin) => `
    <a class="project-card reveal" href="${esc(p.url)}"${ext(p.url)} id="project-${esc(p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"))}">
      <div class="pc-top">
        <h3>${ICONS.repo}${esc(p.title)}</h3>
        <span class="arrow">${ICONS.external}</span>
      </div>
      <p>${esc(p.description)}</p>
      ${tagList(p.tags)}
      <div class="pc-meta">
        ${p.metric ? `<span class="metric">${ICONS.bolt}${esc(p.metric)}</span>` : ""}
        ${showPin && p.pinned ? `<span class="pin">Featured</span>` : ""}
        <span class="pc-date">${fmtDate(p.date)}</span>
      </div>
    </a>`;

  const postRow = (a) => `
    <li class="post reveal">
      <a class="post-link" href="${esc(a.url)}"${ext(a.url)}>
        <time datetime="${esc(a.date)}">${fmtDate(a.date, "long")}</time>
        <div>
          <h3>${esc(a.title)}</h3>
          <p>${esc(a.description)}</p>
          ${tagList(a.tags)}
        </div>
        <span class="arrow">${ICONS.external}</span>
      </a>
    </li>`;

  function renderHomeLists() {
    const limit = D.site.homeLimit || 10;
    const pg = $("#projects-grid");
    if (pg) {
      const all = [...D.projects].sort(pinnedFirst);
      pg.innerHTML = all.slice(0, limit).map((p) => projectCard(p, true)).join("");
      const more = $("#projects-all");
      if (more) more.querySelector(".count").textContent = `(${all.length})`;
    }
    const pl = $("#writing-list");
    if (pl) {
      const all = [...D.articles].sort(pinnedFirst);
      pl.innerHTML = all.length ? all.slice(0, limit).map(postRow).join("") : `<li class="empty">First article coming soon.</li>`;
      const more = $("#writing-all");
      if (more) more.querySelector(".count").textContent = `(${all.length})`;
    }
  }

  /* ------------------------------------------------------ HACKATHONS */
  function renderHackathons() {
    const el = $("#hackathon-list");
    if (!el) return;
    const cls = (r = "") => (/win|1st|first|champion/i.test(r) ? "win" : /final|runner|2nd|3rd|top/i.test(r) ? "final" : "");
    el.innerHTML = [...D.hackathons]
      .sort(byDateDesc)
      .map(
        (h) => `<li class="hack reveal">
          <time datetime="${esc(h.date)}">${fmtDate(h.date)}</time>
          <div>
            <h3>${h.url ? `<a href="${esc(h.url)}"${ext(h.url)}>${esc(h.name)}</a>` : esc(h.name)} ${h.organizer ? `<span class="org">· ${esc(h.organizer)}</span>` : ""}</h3>
            <p>${h.project ? `<span class="proj">${esc(h.project)}</span> — ` : ""}${esc(h.description)}</p>
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
    const contactIds = ["email", "github", "linkedin", "x", "substack"];
    const list = D.links.filter((l) => contactIds.includes(l.id));
    el.innerHTML = `
      <div>
        <h2 id="contact-title">Let's build something.</h2>
        <p>I'm always happy to talk about backend architecture, distributed systems, eBPF or AI agents — whether it's a role, a collaboration or just a good technical conversation.</p>
        <div class="contact-actions">
          ${email ? `<a class="btn primary" id="contact-email" href="${esc(email.url)}">${ICONS.email}Say hello</a>` : ""}
          ${D.profile.resume ? `<a class="btn" id="contact-resume" href="${esc(D.profile.resume)}" download>${ICONS.download}Download résumé</a>` : ""}
        </div>
      </div>
      <ul class="contact-list">
        ${list.map((l) => `<li><a href="${esc(l.url)}"${ext(l.url)} id="contact-${l.id}">${ICONS[l.id] || ""}${esc(l.label)}<span class="handle">${esc(l.handle)}</span></a></li>`).join("")}
      </ul>`;
  }

  /* ----------------------------------------------------------- FOOTER */
  function renderFooter() {
    const el = $("#site-footer");
    if (!el) return;
    const year = new Date().getFullYear();
    el.innerHTML = `
      <div class="container footer-inner">
        <div>
          <a class="brand" href="${base || "#top"}"><span class="brand-mark">${esc(D.profile.name.split(" ").map((w) => w[0]).join(""))}</span>${esc(D.profile.name)}</a>
          <p>${esc(D.profile.role)} building backend systems, kernel-level tooling and agentic AI.</p>
          <div class="footer-icons">
            ${D.links.map((l) => `<a href="${esc(l.url)}"${ext(l.url)} aria-label="${esc(l.label)}" title="${esc(l.label)}">${ICONS[l.id] || ""}</a>`).join("")}
          </div>
        </div>
        <div>
          <h4>Explore</h4>
          <ul class="footer-links">
            <li><a href="${base}#experience">Experience</a></li>
            <li><a href="projects.html">Projects</a></li>
            <li><a href="writing.html">Writing</a></li>
            <li><a href="${base}#hackathons">Hackathons</a></li>
            <li><a href="${base}#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <ul class="footer-links">
            ${D.links.filter((l) => ["github", "linkedin", "x", "substack", "email"].includes(l.id)).map((l) => `<li><a href="${esc(l.url)}"${ext(l.url)}>${esc(l.label)}</a></li>`).join("")}
          </ul>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>© ${year} ${esc(D.profile.name)}. All rights reserved.</span>
        <span>Hand-built with HTML, CSS & JS · Hosted on <a href="https://pages.github.com" target="_blank" rel="noopener">GitHub Pages</a></span>
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
    const items = [...(kind === "projects" ? D.projects : D.articles)].sort(byDateDesc);
    const tagCounts = {};
    items.forEach((i) => (i.tags || []).forEach((t) => (tagCounts[t] = (tagCounts[t] || 0) + 1)));
    const tags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a] || a.localeCompare(b));

    const params = new URLSearchParams(location.search);
    let active = params.get("tag") || "";
    let query = params.get("q") || "";

    const search = $("#search");
    const tagBar = $("#tag-filter");
    const count = $("#result-count");
    search.value = query;

    tagBar.innerHTML =
      `<button class="tag" type="button" data-tag="" id="tag-all">All · ${items.length}</button>` +
      tags.map((t) => `<button class="tag" type="button" data-tag="${esc(t)}">${esc(t)} · ${tagCounts[t]}</button>`).join("");

    function update() {
      const q = query.trim().toLowerCase();
      const filtered = items.filter((i) => {
        if (active && !(i.tags || []).includes(active)) return false;
        if (!q) return true;
        return [i.title, i.description, ...(i.tags || [])].join(" ").toLowerCase().includes(q);
      });
      tagBar.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.tag === active)));
      count.textContent = `${filtered.length} of ${items.length} ${kind === "projects" ? "projects" : "articles"}`;
      if (!filtered.length) {
        listEl.innerHTML = `<div class="empty">Nothing matches that filter.</div>`;
      } else if (kind === "projects") {
        listEl.innerHTML = `<div class="project-grid">${filtered.map((p) => projectCard(p, true)).join("")}</div>`;
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
      top?.classList.toggle("show", h.scrollTop > 600);
      if (isHome && sections.length) {
        let cur = "";
        for (const s of sections) if (s.getBoundingClientRect().top < 120) cur = s.id;
        navLinks.forEach((a) => a.classList.toggle("active", a.dataset.section === cur));
      }
      ticking = false;
    }
    addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------ BOOT */
  renderHeader();
  renderHero();
  renderUpdates();
  renderExperience();
  renderHomeLists();
  renderHackathons();
  renderContact();
  renderFooter();
  if (document.body.dataset.page === "projects") renderListPage("projects");
  if (document.body.dataset.page === "writing") renderListPage("writing");
  observeReveals();
  scrollEffects();
})();
