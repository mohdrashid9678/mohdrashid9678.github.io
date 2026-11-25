/* =============================================================================
 * PORTFOLIO DATA — the single source of truth for the whole site.
 * -----------------------------------------------------------------------------
 * Edit this file to update anything on the site. No build step is required:
 * GitHub Pages serves it as a plain static file and every page reads from it.
 *
 * Conventions
 *  - Dates use "YYYY-MM" or "YYYY-MM-DD" (used for sorting + display).
 *  - Empty lists hide their section (e.g. `hackathons: []`, `articles: []`).
 *  - Anything marked `TODO` is optional detail you can fill in later.
 * ========================================================================== */

window.PORTFOLIO = {
  /* ---------------------------------------------------------------- SITE */
  site: {
    title: "Mohd Rashid — Software Engineer",
    url: "https://mohdrashid9678.github.io",
  },

  /* ------------------------------------------------------------- PROFILE */
  profile: {
    name: "Mohd Rashid",
    role: "Software Engineer",
    company: "Robonito",
    companyUrl: "https://robonito.com",
    location: "Aligarh, India",
    // Drop a square photo at assets/img/profile.jpg and point `photo` at it to override.
    photo: "https://avatars.githubusercontent.com/u/174307556?v=4&s=400",
    resume: "assets/Mohd_Rashid_Resume.pdf", // leave "" to hide the résumé buttons
    // Shown as a small "open to" note in the hero. Set to "" to hide.
    openTo: "Backend, Platform, Distributed Systems & AI Engineering roles",
    // Large opening line under the name.
    lede: "I build backend and distributed systems, and like to understand them all the way down to the kernel.",
    // Body paragraphs (HTML allowed).
    intro: [
      "I'm a software engineer focused on <strong>backend engineering, distributed systems and AI agents</strong>. Day to day I build scalable, observable services with <strong>Go, TypeScript, PostgreSQL, Redis and AWS</strong>, and I go to first principles with <strong>C and eBPF/XDP</strong> when I want to know what the machine is actually doing.",
      "At <strong>Robonito</strong> I architected a no-code mobile automation platform for Android and iOS, and built the <strong>LangGraph agents</strong> behind it that turn plain-English instructions into test workflows and recover from failed steps on their own. Outside work I write deep-dives on Substack and practise competitive programming.",
    ],
  },

  /* ------------------------------------------------------- HIGHLIGHTS */
  // The numbers strip under the hero. Each one should be backed by real work.
  highlights: [
    { value: "50K+", unit: "req/s", label: "sustained redirect throughput, validated with k6", source: "xlink" },
    { value: "50", unit: "%", label: "shorter average test-suite runtime from a distributed execution pipeline", source: "Robonito" },
    { value: "40", unit: "%", label: "less cross-platform test flakiness with a self-healing selector engine", source: "Robonito" },
    { value: "O(1)", unit: "", label: "packet routing inside the NIC driver with eBPF/XDP", source: "XDP-LB" },
  ],

  /* --------------------------------------------------------- UPDATES */
  updates: [
    { date: "2024-06", text: 'Joined <a href="https://robonito.com" target="_blank" rel="noopener">Robonito</a> as a Software Engineer, building no-code test automation and AI agents.' },
    { date: "2026-10", text: "Launched this portfolio: projects, writing and problem solving in one place." },
    { date: "2026-08", text: 'Released <a href="https://github.com/mohdrashid9678/xlink" target="_blank" rel="noopener">xlink</a>, a Go URL shortener sustaining <strong>50K+ req/s</strong> with p95 under 10 ms.' },
    { date: "2026-06", text: 'Built <a href="https://github.com/mohdrashid9678/xdb-lb" target="_blank" rel="noopener">XDP-LB</a>, a kernel-level Layer 4 load balancer on eBPF/XDP.' },
    { date: "2026-04", text: 'Open-sourced <a href="https://github.com/mohdrashid9678/io-profiler" target="_blank" rel="noopener">io-profiler</a>, an eBPF system I/O profiler with near-zero overhead.' },
  ],

  /* ------------------------------------------------------ EXPERIENCE */
  // Most recent first. `end: ""` means Present; `start` may be left "" if you'd rather not show it.
  experience: [
    {
      role: "Software Engineer",
      company: "Robonito",
      url: "https://robonito.com",
      location: "",
      start: "2024-06",
      end: "",
      summary: "No-code test automation for mobile, web and API, with AI agents at its core.",
      points: [
        "Architected a <strong>no-code mobile automation platform</strong> for Android and iOS, letting 10+ QA teams design, run and manage test workflows visually without writing code.",
        "Engineered <strong>LangGraph-based autonomous agents</strong> that turn natural-language instructions into executable workflows, adapt to UI changes, and recover from failed steps through LLM-driven reasoning.",
        "Designed a 4-stage <strong>distributed execution pipeline</strong> (scheduling, environment provisioning, execution, result aggregation) on stateless Redis/BullMQ workers, running web, mobile and API suites in parallel and cutting average suite <strong>runtime by 50%</strong>.",
        "Built an XML-based selector engine with a deterministic <strong>auto-healer</strong> that repairs broken selectors from spatial UI relationships, reducing cross-platform flakiness by <strong>40%</strong>.",
        "Designed a distributed notification system on <strong>WebSockets and Redis Pub/Sub</strong> that streams execution lifecycle events to Electron desktop clients in real time.",
        "Designed and implemented <strong>billing and subscription infrastructure</strong>: usage tracking, plan enforcement, subscription validation and customer plan management.",
        "Automated cross-platform build and release pipelines for macOS, Windows and Linux, cutting release time from <strong>over two hours to a few minutes</strong>.",
      ],
      tags: ["LangGraph", "Redis", "BullMQ", "WebSockets", "Electron", "CI/CD"],
    },
  ],

  /* ------------------------------------------------------- EDUCATION */
  education: [
    {
      degree: "B.Tech, Computer Science & Engineering",
      school: "Zakir Husain College of Engineering & Technology, Aligarh Muslim University",
      url: "https://www.amu.ac.in/",
      start: "2020",
      end: "2024",
      details: "",
    },
  ],

  /* --------------------------------------------------------- TOOLBOX */
  skills: [
    { group: "Languages", items: ["Go", "TypeScript", "JavaScript", "C", "C++", "Python", "SQL", "Bash"] },
    { group: "Backend", items: ["Gin", "Chi", "Node.js", "Express", "NestJS", "REST", "WebSockets", "BullMQ"] },
    { group: "Data", items: ["PostgreSQL", "MongoDB", "Redis", "Redis Streams", "Redis Pub/Sub"] },
    { group: "Infrastructure", items: ["AWS (VPC, EC2, ECS, ALB, IAM)", "Docker", "Kubernetes", "Nginx"] },
    { group: "Observability", items: ["Prometheus", "OpenTelemetry", "Jaeger", "pprof", "k6"] },
    { group: "Systems & AI", items: ["eBPF/XDP", "cilium/ebpf", "LangGraph", "LLM agents"] },
    { group: "Tools", items: ["Git", "GitHub Actions"] },
  ],

  /* -------------------------------------------------------- PROJECTS */
  // `pinned: true` = featured on the home page, in the order listed here
  // (matches the pinned repos on GitHub). The first pinned project gets the
  // large card; `stats` render as a small table on it.
  projects: [
    {
      title: "xlink",
      tagline: "URL shortener built for throughput",
      description:
        "A URL shortener and clickstream analytics engine in Go. Redirects are served from an in-memory TinyLFU cache backed by Redis, with singleflight to stop stampedes. Clicks flow through Redis Streams into PostgreSQL in batches, so analytics never add latency to a redirect.",
      highlights: [
        "Two-tier caching (TinyLFU + Redis) with Redis Pub/Sub cross-instance invalidation",
        "Async clickstream: Redis Streams → batch bulk-inserts into PostgreSQL",
        "Prometheus RED metrics, Jaeger tracing, pprof and deep /readyz probes",
        "Multi-AZ AWS: private subnets, NAT egress, ALB, Nginx pooling and kernel socket tuning",
      ],
      stats: [
        { label: "Throughput", value: "50,000+ req/s" },
        { label: "p50", value: "~1–2 ms" },
        { label: "p95", value: "< 10 ms" },
        { label: "p99", value: "< 50 ms" },
        { label: "Cache hit", value: "sub-ms" },
      ],
      statsNote: "k6 · 3× c6g.large behind an AWS ALB",
      metric: "50K+ req/s · p95 < 10 ms",
      language: "Go",
      tags: ["Go", "Redis", "PostgreSQL", "AWS", "OpenTelemetry"],
      date: "2026-08",
      url: "https://github.com/mohdrashid9678/xlink",
      pinned: true,
    },
    {
      title: "XDP-LB",
      tagline: "Layer 4 load balancer in the NIC driver",
      description:
        "A from-scratch L4 load balancer that routes packets inside the NIC driver with eBPF/XDP, bypassing the kernel network stack. The C data plane hashes the 5-tuple onto a consistent-hash ring for TCP stickiness; a Go control plane (cilium/ebpf) detects interfaces, orchestrates backends and polls kernel telemetry lock-free from BPF array maps.",
      metric: "O(1) in-kernel routing",
      language: "Go",
      tags: ["eBPF", "XDP", "C", "Go", "Networking"],
      date: "2026-06",
      url: "https://github.com/mohdrashid9678/xdb-lb",
      pinned: true,
    },
    {
      title: "io-profiler",
      tagline: "Real-time system I/O profiler",
      description:
        "Hooks syscall-exit tracepoints to count the bytes actually moved across disk and network, aggregated per process in kernel BPF maps. You get a unified view without strace's context-switch tax.",
      metric: "Near-zero overhead",
      language: "Go",
      tags: ["eBPF", "Go", "C", "Linux"],
      date: "2026-04",
      url: "https://github.com/mohdrashid9678/io-profiler",
      pinned: true,
    },
    {
      title: "rhttp",
      tagline: "HTTP/1.1 from raw TCP",
      description:
        "A minimal HTTP/1.1 implementation (RFC 9112) on raw TCP in Go: request parsing, a response builder over any io.Writer, and a radix-tree router with path parameters, all without net/http.",
      metric: "Zero net/http",
      language: "Go",
      tags: ["Go", "HTTP", "TCP", "Protocols"],
      date: "2025-09",
      url: "https://github.com/mohdrashid9678/rhttp",
      pinned: true,
    },
    {
      title: "dcore",
      tagline: "Distributed-systems primitives for Go",
      description:
        "Building blocks for distributed systems in Go, starting with consistent hashing with virtual nodes (chash).",
      language: "Go",
      tags: ["Go", "Distributed Systems", "Data Structures"],
      date: "2025-09",
      url: "https://github.com/mohdrashid9678/dcore",
      pinned: true,
    },
    {
      title: "TiRush",
      tagline: "Flash-sale event booking",
      description:
        "A high-concurrency booking system for flash-sale traffic. It uses optimistic locking in Postgres and Redis distributed locks against double-booking, singleflight and tiered caching against thundering herds, idempotency keys for exactly-once payments, and live seat availability over WebSockets.",
      status: "In progress",
      language: "Go",
      tags: ["Go", "PostgreSQL", "Redis", "WebSockets", "Docker"],
      date: "2026-07",
      url: "https://github.com/mohdrashid9678/tirush",
    },
    {
      title: "algorithms-by-rashid",
      tagline: "DSA and contest solutions",
      description:
        "My library of data-structure and algorithm implementations, CSES problem-set solutions, and contest solutions from LeetCode, CodeChef, Codeforces and AtCoder.",
      language: "C++",
      tags: ["C++", "Algorithms", "Competitive Programming"],
      date: "2026-11",
      url: "https://github.com/mohdrashid9678/algorithms-by-rashid",
    },
  ],

  /* -------------------------------------------------------- ARTICLES */
  // Each article links straight to Substack. Until this has entries the
  // Writing section shows a "Read on Substack" card instead of a list.
  // Example:
  // { title: "…", description: "…", tags: ["Go"], date: "2026-11-20", url: "https://rashidalam9678.substack.com/p/…" },
  articles: [],

  /* ------------------------------------------------------ HACKATHONS */
  // Leave empty to hide the section. Example:
  // { name: "…", organizer: "…", date: "2025-03", result: "Winner", project: "…", description: "…", url: "", tags: [] },
  hackathons: [],

  /* ---------------------------------------------------------- LINKS */
  // kind "social" → hero, contact & footer. kind "cp" → Problem solving section.
  // `stat` (optional) shows under a CP profile, e.g. "Rating 1650 · Knight".
  links: [
    { id: "github", label: "GitHub", handle: "mohdrashid9678", url: "https://github.com/mohdrashid9678", kind: "social" },
    { id: "linkedin", label: "LinkedIn", handle: "rashidalam9678", url: "https://www.linkedin.com/in/rashidalam9678/", kind: "social" },
    { id: "x", label: "X", handle: "@rashidalam9678", url: "https://x.com/rashidalam9678", kind: "social" },
    { id: "substack", label: "Substack", handle: "@rashidalam9678", url: "https://substack.com/@rashidalam9678", kind: "social" },
    { id: "email", label: "Email", handle: "mohdrashidalam786@gmail.com", url: "mailto:mohdrashidalam786@gmail.com", kind: "social" },
    { id: "leetcode", label: "LeetCode", handle: "rashidalam9678", url: "https://leetcode.com/u/rashidalam9678/", kind: "cp", stat: "" },
    { id: "atcoder", label: "AtCoder", handle: "mohdrashid9678", url: "https://atcoder.jp/users/mohdrashid9678", kind: "cp", stat: "" },
  ],
};
