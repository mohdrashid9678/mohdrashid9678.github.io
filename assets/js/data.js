/* =============================================================================
 * PORTFOLIO DATA — the single source of truth for the whole site.
 * -----------------------------------------------------------------------------
 * Edit this file to update anything on the site. No build step is required:
 * GitHub Pages serves it as a plain static file and every page reads from it.
 *
 * Conventions
 *  - Dates use "YYYY-MM" or "YYYY-MM-DD" (used for sorting + display).
 *  - `pinned: true` keeps an item at the top of lists regardless of date.
 *  - Anything marked `TODO` is a placeholder — replace it with real data.
 * ========================================================================== */

window.PORTFOLIO = {
  /* ---------------------------------------------------------------- SITE */
  site: {
    title: "Mohd Rashid — Software Engineer",
    description:
      "Mohd Rashid — software engineer building backend & distributed systems, kernel-level networking with eBPF, and agentic AI.",
    url: "https://mohdrashid9678.github.io",
    homeLimit: 10, // how many projects / articles to show on the home page
  },

  /* ------------------------------------------------------------- PROFILE */
  profile: {
    name: "Mohd Rashid",
    role: "Software Engineer",
    headline: "Backend · Distributed Systems · Agentic AI",
    location: "India", // TODO: city, country
    // Put your photo at assets/img/profile.jpg — falls back to GitHub avatar.
    photo: "assets/img/profile.jpg",
    photoFallback: "https://avatars.githubusercontent.com/u/174307556?v=4",
    resume: "", // TODO: e.g. "assets/Mohd_Rashid_Resume.pdf" (leave "" to hide)
    available: true, // shows an "Open to opportunities" badge
    // Seamless prose paragraphs matching the reference style — covers intro, focus, stack, education, and interests:
    intro: [
      "I am a software engineer focused on <strong>backend engineering, distributed systems, and agentic AI</strong>. I build high-throughput, observable services primarily with <strong>Go, TypeScript, PostgreSQL, Redis, and AWS</strong>, and dive into first-principles systems work with <strong>C/C++ and eBPF/XDP</strong>.",
      "I completed my <strong>B.Tech in Computer Science & Engineering (2020–2024)</strong>. Lately, I spend my time engineering autonomous LLM agents that plan, use tools, and act reliably in production, writing technical deep-dives on Substack, and practicing competitive programming.",
    ],
  },

  /* --------------------------------------------------------- UPDATES */
  updates: [
    { date: "2026-10", text: "Launched this portfolio — writing, projects and hackathons in one place." },
    { date: "2026-08", text: 'Released <a href="https://github.com/mohdrashid9678/xlink" target="_blank" rel="noopener">xlink</a>, a Go URL shortener sustaining <strong>50K+ req/s</strong> with p95 &lt; 10ms.' },
    { date: "2026-06", text: 'Built <a href="https://github.com/mohdrashid9678/xdb-lb" target="_blank" rel="noopener">XDP-LB</a>, a kernel-level Layer 4 load balancer using eBPF/XDP.' },
    { date: "2026-04", text: 'Open-sourced <a href="https://github.com/mohdrashid9678/io-profiler" target="_blank" rel="noopener">io-profiler</a>, an eBPF system I/O profiler with near-zero overhead.' },
  ],

  /* ------------------------------------------------------ EXPERIENCE */
  // TODO: replace with entries from your resume (most recent first).
  experience: [
    {
      role: "Software Engineer",
      company: "Company Name", // TODO
      url: "",
      location: "Remote / City", // TODO
      start: "2024-01", // TODO
      end: "", // "" = Present
      points: [
        "TODO — what you built and the impact (numbers help: latency, throughput, cost, users).",
        "TODO — systems / AI agents you designed or owned.",
        "TODO — tooling, reliability or team contributions.",
      ],
      tags: ["Go", "TypeScript", "PostgreSQL", "AWS"],
    },
    {
      role: "Software Engineer Intern",
      company: "Company Name", // TODO
      url: "",
      location: "City", // TODO
      start: "2023-06",
      end: "2023-12",
      points: ["TODO — key contribution.", "TODO — key contribution."],
      tags: ["Node.js", "React"],
    },
  ],

  /* ------------------------------------------------------- EDUCATION */
  // Shown as a single compact line per entry in the hero. TODO: replace with your education.
  education: [
    {
      degree: "B.Tech in Computer Science & Engineering", // TODO
      school: "University Name", // TODO
      url: "",
      location: "City, India",
      start: "2020",
      end: "2024",
      details: "TODO — CGPA, relevant coursework (Operating Systems, Computer Networks, DBMS, Distributed Systems), honours.",
    },
  ],

  /* -------------------------------------------------------- PROJECTS */
  projects: [
    {
      title: "xlink",
      description:
        "A fast, scalable URL shortener in Go with L1 TinyLFU + L2 Redis caching, singleflight stampede protection, async click analytics via Redis Streams → PostgreSQL, and full Prometheus/OpenTelemetry observability.",
      metric: "50K+ req/s · p95 < 10ms",
      tags: ["Go", "Redis", "PostgreSQL", "AWS", "OpenTelemetry"],
      date: "2026-08",
      url: "https://github.com/mohdrashid9678/xlink",
      pinned: true,
    },
    {
      title: "XDP-LB",
      description:
        "A from-scratch Layer 4 load balancer that routes packets inside the NIC driver with eBPF/XDP. C data plane with 5-tuple consistent hashing for TCP stickiness; Go control plane with live kernel telemetry.",
      metric: "O(1) routing in kernel",
      tags: ["eBPF", "XDP", "C", "Go", "Networking"],
      date: "2026-06",
      url: "https://github.com/mohdrashid9678/xdb-lb",
      pinned: true,
    },
    {
      title: "io-profiler",
      description:
        "Real-time system I/O profiler that hooks syscall exit tracepoints to measure actual bytes moved across disk and network, aggregated per-process in kernel BPF maps — no strace-style context-switch tax.",
      metric: "Near-zero overhead",
      tags: ["eBPF", "Go", "C", "Linux"],
      date: "2026-04",
      url: "https://github.com/mohdrashid9678/io-profiler",
    },
    {
      title: "rhttp",
      description:
        "A minimal HTTP/1.1 implementation (RFC 9112) built directly on raw TCP in Go — request parsing, response building and routing without net/http.",
      metric: "Zero net/http",
      tags: ["Go", "HTTP", "TCP", "Protocols"],
      date: "2025-09",
      url: "https://github.com/mohdrashid9678/rhttp",
    },
    {
      title: "dcore",
      description:
        "High-performance distributed systems primitives and data structures for Go, including consistent hashing.",
      tags: ["Go", "Distributed Systems", "Data Structures"],
      date: "2025-09",
      url: "https://github.com/mohdrashid9678/dcore",
    },
    {
      title: "CSES Problem Set Solutions",
      description: "Solutions to the well-known CSES problem set in C++, covering DP, graphs, trees, range queries and more.",
      tags: ["C++", "Algorithms", "Competitive Programming"],
      date: "2026-07",
      url: "https://github.com/mohdrashid9678/cses-problemset-solution",
    },
    {
      title: "mr-algorithms",
      description: "A personal library of algorithm and data-structure implementations in C++ for contests and interviews.",
      tags: ["C++", "Algorithms"],
      date: "2026-03",
      url: "https://github.com/mohdrashid9678/mr-algorithms",
    },
  ],

  /* -------------------------------------------------------- ARTICLES */
  // Each article links straight to Substack. TODO: replace with real posts.
  articles: [
    {
      title: "Building a URL Shortener that Handles 50K req/s",
      description: "Multi-tier caching, singleflight and async analytics — the design decisions behind xlink and what the load tests taught me.",
      tags: ["Go", "System Design", "Performance"],
      date: "2026-08-20",
      url: "https://substack.com/", // TODO
    },
    {
      title: "Load Balancing at the NIC: A Practical Intro to XDP",
      description: "Why the Linux networking stack is slow for L4 routing, and how eBPF/XDP lets you route packets before the kernel even allocates an skb.",
      tags: ["eBPF", "Networking", "Linux"],
      date: "2026-06-28",
      url: "https://substack.com/", // TODO
    },
    {
      title: "What Makes an AI Agent Production-Ready?",
      description: "Tool design, evals, retries and observability — the unglamorous engineering that separates demos from agents you can trust.",
      tags: ["Agentic AI", "LLMs", "Engineering"],
      date: "2026-05-10",
      url: "https://substack.com/", // TODO
    },
    {
      title: "Writing HTTP/1.1 from Scratch in Go",
      description: "Parsing requests off a raw TCP socket and what RFC 9112 really asks of a server.",
      tags: ["Go", "HTTP", "Protocols"],
      date: "2025-09-15",
      url: "https://substack.com/", // TODO
    },
  ],

  /* ------------------------------------------------------ HACKATHONS */
  // TODO: replace with your hackathons.
  hackathons: [
    {
      name: "Hackathon Name", // TODO
      organizer: "Organizer", // TODO
      date: "2025-03",
      result: "Winner", // e.g. Winner, Finalist, Top 10, Participant
      project: "Project name",
      description: "TODO — one or two lines on what you built and the stack.",
      url: "",
      tags: ["Agentic AI", "TypeScript"],
    },
    {
      name: "Hackathon Name", // TODO
      organizer: "Organizer",
      date: "2024-10",
      result: "Finalist",
      project: "Project name",
      description: "TODO — one or two lines on what you built and the stack.",
      url: "",
      tags: ["Go", "Redis"],
    },
  ],

  /* ---------------------------------------------------------- SOCIAL */
  // All links show as icon chips in the hero. `kind: "cp"` links are grouped after the social ones;
  // only `kind: "social"` links appear in the Contact card.
  // TODO: replace URLs / handles marked below.
  links: [
    { id: "github", label: "GitHub", handle: "mohdrashid9678", url: "https://github.com/mohdrashid9678", kind: "social" },
    { id: "linkedin", label: "LinkedIn", handle: "rashidalam9678", url: "https://www.linkedin.com/in/rashidalam9678/", kind: "social" },
    { id: "x", label: "Twitter / X", handle: "@handle", url: "https://x.com/", kind: "social" }, // TODO
    { id: "substack", label: "Substack", handle: "Newsletter", url: "https://substack.com/", kind: "social" }, // TODO
    { id: "email", label: "Email", handle: "you@example.com", url: "mailto:you@example.com", kind: "social" }, // TODO
    { id: "leetcode", label: "LeetCode", handle: "handle", url: "https://leetcode.com/", kind: "cp", stat: "" }, // TODO e.g. stat: "Knight · 1900"
    { id: "codeforces", label: "Codeforces", handle: "handle", url: "https://codeforces.com/", kind: "cp", stat: "" }, // TODO
    { id: "codechef", label: "CodeChef", handle: "handle", url: "https://www.codechef.com/", kind: "cp", stat: "" }, // TODO
    { id: "atcoder", label: "AtCoder", handle: "handle", url: "https://atcoder.jp/", kind: "cp", stat: "" }, // TODO
  ],
};
