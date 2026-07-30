(function () {
  "use strict";
  const D = document,
    H = D.documentElement;

  /* ══ 1. BOOT SCREEN ═══════════════════════════════════════════ */
  const bootEl = D.getElementById("boot"),
    bbar = D.getElementById("bbar"),
    btxt = D.getElementById("btxt");
  const bootMsgs = [
    "Initializing runtime...",
    "Loading PyTorch & TensorFlow...",
    "Connecting LangChain & RAG...",
    "Compiling model_weights.py...",
    "Initializing Deekshith's Profile...",
    "Portfolio ready.",
  ];
  let bi = 0,
    bp = 0;
  function bootStep() {
    if (bi >= bootMsgs.length) {
      setTimeout(() => {
        bootEl.classList.add("done");
      }, 400);
      return;
    }
    btxt.textContent = bootMsgs[bi++];
    bp = Math.min(bp + Math.floor(100 / bootMsgs.length) + 1, 100);
    bbar.style.width = bp + "%";
    setTimeout(bootStep, bi === bootMsgs.length ? 600 : 320);
  }
  setTimeout(bootStep, 200);

  /* ══ 2. THEME ══════════════════════════════════════════════════ */
  const stored = localStorage.getItem("dv_theme");
  const sysDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
  H.setAttribute("data-theme", stored || (sysDark ? "dark" : "light"));
  D.getElementById("tgl").addEventListener("click", () => {
    const n = H.getAttribute("data-theme") === "dark" ? "light" : "dark";
    H.setAttribute("data-theme", n);
    localStorage.setItem("dv_theme", n);
  });

  /* ══ 3. CANVAS — VS Code & AI/ML syntax snippets ══════════════ */
  const cv = D.getElementById("cv"),
    cx = cv.getContext("2d");
  let W,
    Ht,
    pts = [];

  /* VS Code Dark+ colour palette */
  const C = {
    kw: "#569cd6" /* keyword     — blue   */,
    fn: "#dcdcaa" /* function    — yellow */,
    st: "#ce9178" /* string      — orange */,
    nm: "#b5cea8" /* number      — green  */,
    cm: "#6a9955" /* comment     — green  */,
    tp: "#4ec9b0" /* type/class  — teal   */,
    vr: "#9cdcfe" /* variable    — cyan   */,
    op: "#d4d4d4" /* operator    — white  */,
    pm: "#c586c0" /* param       — violet */,
    gr: "#00ff88" /* accent      — matrix */,
    cy: "#00e5ff" /* cyan        — accent */,
  };

  /* Real AI/ML & Code Snippets */
  const SNIPS = [
    [
      [" import ", " kw"],
      ["torch", " tp"],
      [" as ", " kw"],
      ["nn", " vr"],
    ],
    [
      [" model ", " vr"],
      [" = ", " op"],
      ["LangChain", " tp"],
      [".RAG()", " fn"],
    ],
    [
      [" def ", " kw"],
      ["analyze_resume", " fn"],
      ["(pdf)", " pm"],
      [":", " op"],
    ],
    [
      [" tf", " tp"],
      [".keras", " vr"],
      [".Sequential", " fn"],
      ["([", " op"],
    ],
    [
      [" const ", " kw"],
      ["app", " vr"],
      [" = ", " op"],
      ["express()", " fn"],
    ],
    [
      [" embeddings ", " vr"],
      [" = ", " op"],
      ["OpenAIEmbeddings", " tp"],
      ["()", " op"],
    ],
    [
      [" class ", " kw"],
      ["SkinCNN", " tp"],
      ["(", " op"],
      ["nn.Module", " tp"],
      ["):", " op"],
    ],
    [
      [" vectorstore", " vr"],
      [".similarity_search", " fn"],
      ["(query)", " pm"],
    ],
    [
      [" #include", " kw"],
      ["<vector>", " st"],
      [" // DSA", " cm"],
    ],
    [
      [" predictions ", " vr"],
      [" = ", " op"],
      ["model", " vr"],
      [".predict", " fn"],
      ["(X_test)", " pm"],
    ],
    [
      [" async ", " kw"],
      ["function ", " kw"],
      ["evaluateExam", " fn"],
      ["()", " op"],
    ],
    [
      [" import ", " kw"],
      ["{", " op"],
      ["useState", " tp"],
      ["}", " op"],
      [" from ", " kw"],
      ["'react'", " st"],
    ],
    [
      [" SELECT ", " kw"],
      ["*", " op"],
      [" FROM ", " kw"],
      ["candidates", " vr"],
      [" WHERE ", " kw"],
      ["ats_score ", " vr"],
      ["> 85", " nm"],
    ],
    [
      [" df ", " vr"],
      [" = ", " op"],
      ["pd", " tp"],
      [".read_csv", " fn"],
      ["('data.csv')", " st"],
    ],
    [
      [" std", " tp"],
      ["::cout << ", " fn"],
      ['"Hello Tech Giants"', " st"],
    ],
    [
      [" O(N log N)", " gr"],
      [" // Merge Sort", " cm"],
    ],
  ];

  function mkSnip() {
    const snip = SNIPS[Math.floor(Math.random() * SNIPS.length)];
    return {
      x: Math.random() * W,
      y: Ht + 20,
      vy: -(Math.random() * 0.4 + 0.12),
      vx: (Math.random() - 0.5) * 0.08,
      snip: snip,
      sz: Math.random() * 3 + 12,
      al: Math.random() * 0.28 + 0.14,
      born: null,
    };
  }

  function res() {
    W = cv.width = innerWidth;
    Ht = cv.height = innerHeight;
    pts = [];
    const n = Math.max(40, Math.floor((W * Ht) / 8000));
    for (let i = 0; i < n; i++) {
      const p = mkSnip();
      p.y = Math.random() * (Ht + 200) - 100;
      pts.push(p);
    }
  }

  function drw() {
    cx.clearRect(0, 0, W, Ht);
    const dk = H.getAttribute("data-theme") === "dark";
    const alpha_scale = dk ? 1 : 0.45;

    pts.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.y < -60) {
        Object.assign(p, mkSnip());
        p.x = Math.random() * W;
        return;
      }

      const fadeIn = Math.min(1, (Ht - p.y) / 120);
      const fadeOut = Math.min(1, (p.y + 60) / 120);
      const fade = Math.min(fadeIn, fadeOut);
      const baseA = p.al * fade * alpha_scale;
      if (baseA <= 0.01) return;

      cx.save();
      cx.font = `${p.sz}px "JetBrains Mono",monospace`;
      cx.textBaseline = "alphabetic";

      let curX = p.x;
      p.snip.forEach(([txt, ckey]) => {
        let hex = C[ckey.trim()] || C.op;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        cx.fillStyle = `rgba(${r},${g},${b},${baseA})`;
        cx.fillText(txt, curX, p.y);
        curX += cx.measureText(txt).width;
      });
      cx.restore();
    });
    requestAnimationFrame(drw);
  }
  addEventListener("resize", res, { passive: true });
  res();
  drw();

  /* ══ SPOTLIGHT — cursor radial glow ══════════════════════════ */
  const spl = D.getElementById("spotlight");
  if (spl) {
    addEventListener(
      "mousemove",
      (e) => {
        spl.style.setProperty("--sx", e.clientX + "px");
        spl.style.setProperty("--sy", e.clientY + "px");
      },
      { passive: true },
    );
  }

  /* ══ 4. SCROLL PROGRESS + BACK TO TOP ═════════════════════════ */
  const prog = D.getElementById("progress"),
    btt = D.getElementById("btt");
  const nav = D.getElementById("nav");
  function onScroll() {
    const scrolled = (scrollY / (D.body.scrollHeight - innerHeight)) * 100;
    if (prog) prog.style.width = scrolled + "%";
    if (btt) btt.classList.toggle("show", scrollY > 400);
    if (nav) nav.classList.toggle("sticky", scrollY > 28);
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ══ 5. ACTIVE NAV ═════════════════════════════════════════════ */
  const secs = [...D.querySelectorAll("section[id]")];
  const lks = [...D.querySelectorAll(".nav-links a")];
  secs.forEach((s) => {
    new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          lks.forEach((a) => a.classList.remove("act"));
          const a = D.querySelector(`.nav-links a[href="#${s.id}"]`);
          if (a) a.classList.add("act");
        }
      },
      { threshold: 0.45 },
    ).observe(s);
  });

  /* ══ 6. BURGER ═════════════════════════════════════════════════ */
  const burg = D.getElementById("burg"),
    mdrw = D.getElementById("mdrw"),
    mscrim = D.getElementById("mscrim");
  function openM() {
    if (!burg || !mdrw) return;
    burg.classList.add("open");
    burg.setAttribute("aria-expanded", "true");
    mdrw.classList.add("open");
    mdrw.setAttribute("aria-hidden", "false");
    D.body.style.overflow = "hidden";
  }
  function closeM() {
    if (!burg || !mdrw) return;
    burg.classList.remove("open");
    burg.setAttribute("aria-expanded", "false");
    mdrw.classList.remove("open");
    mdrw.setAttribute("aria-hidden", "true");
    D.body.style.overflow = "";
  }
  if (burg) {
    burg.addEventListener("click", () =>
      mdrw.classList.contains("open") ? closeM() : openM(),
    );
  }
  if (mscrim) mscrim.addEventListener("click", closeM);
  D.querySelectorAll(".mpnl a").forEach((a) =>
    a.addEventListener("click", closeM),
  );
  addEventListener("resize", () => {
    if (innerWidth > 768) closeM();
  });

  /* ══ 7. REVEAL ═════════════════════════════════════════════════ */
  const rvIO = new IntersectionObserver(
    (es, o) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("on");
          o.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -16px 0px" },
  );
  D.querySelectorAll(".rv").forEach((el) => rvIO.observe(el));

  /* ══ 8. TYPED.JS ═══════════════════════════════════════════════ */
  if (D.getElementById("typed-el") && window.Typed) {
    new window.Typed("#typed-el", {
      strings: [
        "python train_resume_ai.py",
        "import langchain, torch, tensorflow",
        "from rag import VectorRetriever",
        "git commit -m 'feat: ATS AI Analyzer'",
        "g++ -O3 main.cpp -o solution",
        "npm run dev"
      ],
      typeSpeed: 48,
      backSpeed: 24,
      backDelay: 1400,
      loop: true,
      showCursor: false,
    });
  }

  /* ══ 9. PHOTO 3D TILT ════════════════════════════════════════ */
  const pc = D.getElementById("pcard"),
    ps = D.getElementById("psh");
  if (pc && !("ontouchstart" in window)) {
    pc.parentElement.style.perspective = "1100px";
    let tX = 0,
      tY = 0,
      cX = 0,
      cY = 0,
      raf = null,
      on = false;
    const lr = (a, b, t) => a + (b - a) * t;
    function loop() {
      cX = lr(cX, tX, on ? 0.13 : 0.07);
      cY = lr(cY, tY, on ? 0.13 : 0.07);
      const sc = on ? 1.04 : 1;
      pc.style.transform = `rotateX(${cX}deg) rotateY(${cY}deg) scale3d(${sc},${sc},${sc})`;
      if (Math.abs(cX - tX) > 0.007 || Math.abs(cY - tY) > 0.007 || on)
        raf = requestAnimationFrame(loop);
      else {
        pc.style.transform = "";
        raf = null;
      }
    }
    function go() {
      if (!raf) raf = requestAnimationFrame(loop);
    }
    pc.addEventListener("mouseenter", () => {
      on = true;
      pc.classList.add("ton");
      pc.classList.remove("toff");
      if (ps) ps.style.setProperty("--sop", "1");
      go();
    });
    pc.addEventListener("mousemove", (e) => {
      const r = pc.getBoundingClientRect();
      tY = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 13;
      tX = (-(e.clientY - r.top - r.height / 2) / (r.height / 2)) * 13;
      if (ps) {
        ps.style.setProperty(
          "--mx",
          (((e.clientX - r.left) / r.width) * 100).toFixed(1) + "%",
        );
        ps.style.setProperty(
          "--my",
          (((e.clientY - r.top) / r.height) * 100).toFixed(1) + "%",
        );
      }
    });
    pc.addEventListener("mouseleave", () => {
      on = false;
      tX = 0;
      tY = 0;
      pc.classList.remove("ton");
      pc.classList.add("toff");
      if (ps) ps.style.setProperty("--sop", "0");
      go();
      setTimeout(() => pc.classList.remove("toff"), 700);
    });
  }

  /* ══ 10. MAGNETIC SKILL CARDS ═════════════════════════════════ */
  if (!("ontouchstart" in window)) {
    D.querySelectorAll(".sk").forEach((card) => {
      const strength = 10;
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left - r.width / 2) / r.width) * strength;
        const y = ((e.clientY - r.top - r.height / 2) / r.height) * strength;
        card.style.transform = `translate(${x}px,${y}px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ══ 11. COPY EMAIL ════════════════════════════════════════════ */
  function copyEmail() {
    const emailStr = "deekshith@example.com";
    navigator.clipboard
      .writeText(emailStr)
      .then(() => {
        const btn = D.getElementById("copy-btn");
        const ico = D.getElementById("copy-icon");
        const txt = D.getElementById("copy-txt");
        if (btn) btn.classList.add("copied");
        if (ico) ico.className = "bx bx-check";
        if (txt) txt.textContent = "Copied!";
        setTimeout(() => {
          if (btn) btn.classList.remove("copied");
          if (ico) ico.className = "bx bx-copy";
          if (txt) txt.textContent = "Copy";
        }, 2500);
      })
      .catch(() => {
        const el = D.createElement("textarea");
        el.value = emailStr;
        D.body.appendChild(el);
        el.select();
        D.execCommand("copy");
        D.body.removeChild(el);
        const btn = D.getElementById("copy-btn");
        const ico = D.getElementById("copy-icon");
        const txt = D.getElementById("copy-txt");
        if (btn) btn.classList.add("copied");
        if (ico) ico.className = "bx bx-check";
        if (txt) txt.textContent = "Copied!";
        setTimeout(() => {
          if (btn) btn.classList.remove("copied");
          if (ico) ico.className = "bx bx-copy";
          if (txt) txt.textContent = "Copy";
        }, 2500);
      });
  }
  window.copyEmail = copyEmail;
})();

/* ══ 12. SKILL NETWORK GRAPH ════════════════════════════════ */
(function initSkillGraph() {
  const cv = document.getElementById('sk-graph-cv');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  let DPR = Math.min(devicePixelRatio, 2);
  let LW = 0, LH = 0;

  function resize() {
    const rect = cv.getBoundingClientRect();
    LW = rect.width; LH = rect.height;
    DPR = Math.min(devicePixelRatio, 2);
    cv.width  = LW * DPR;
    cv.height = LH * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();

  const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';

  /* ── CATEGORIES ── */
  const CATS = {
    aiml:     { c: '#00e5ff', l: 'AI & GenAI'      },
    lang:     { c: '#ffab40', l: 'Languages'      },
    backend:  { c: '#4a90d9', l: 'Backend'        },
    frontend: { c: '#d4b84a', l: 'Frontend'       },
    data:     { c: '#00e676', l: 'Databases'      },
    cs:       { c: '#ab47bc', l: 'CS Core'        },
    tools:    { c: '#ef5350', l: 'Tools & Env'    },
  };

  /* ── NODES ── */
  const NODES = [
    { id:'python',    l:'Python',       cat:'lang',     r:28 },
    { id:'genai',     l:'GenAI & LLMs', cat:'aiml',     r:26 },
    { id:'rag',       l:'RAG',          cat:'aiml',     r:24 },
    { id:'langchain', l:'LangChain',    cat:'aiml',     r:22 },
    { id:'tensorflow',l:'TensorFlow',   cat:'aiml',     r:24 },
    { id:'pytorch',   l:'PyTorch',      cat:'aiml',     r:22 },
    { id:'sklearn',   l:'Scikit-Learn', cat:'aiml',     r:20 },
    { id:'cpp',       l:'C++',          cat:'lang',     r:24 },
    { id:'java',      l:'Java',         cat:'lang',     r:20 },
    { id:'c',         l:'C',            cat:'lang',     r:18 },
    { id:'js',        l:'JavaScript',   cat:'lang',     r:24 },
    { id:'nodejs',    l:'Node.js',      cat:'backend',  r:22 },
    { id:'express',   l:'Express.js',   cat:'backend',  r:19 },
    { id:'flask',     l:'Flask',        cat:'backend',  r:18 },
    { id:'django',    l:'Django',       cat:'backend',  r:18 },
    { id:'rest',      l:'REST APIs',    cat:'backend',  r:19 },
    { id:'react',     l:'React.js',     cat:'frontend', r:22 },
    { id:'html',      l:'HTML5/CSS3',   cat:'frontend', r:18 },
    { id:'postgres',  l:'PostgreSQL',   cat:'data',     r:20 },
    { id:'mongo',     l:'MongoDB',      cat:'data',     r:20 },
    { id:'mysql',     l:'MySQL',        cat:'data',     r:18 },
    { id:'dsa',       l:'DSA',          cat:'cs',       r:28 },
    { id:'sysdes',    l:'System Design',cat:'cs',       r:26 },
    { id:'oop',       l:'OOP',          cat:'cs',       r:20 },
    { id:'os',        l:'OS & DBMS',    cat:'cs',       r:20 },
    { id:'git',       l:'Git & GitHub', cat:'tools',    r:20 },
    { id:'docker',    l:'Docker',       cat:'tools',    r:20 },
    { id:'streamlit', l:'Streamlit',    cat:'tools',    r:18 },
  ];

  const EDGES = [
    ['python','genai'],['python','rag'],['python','langchain'],['python','tensorflow'],
    ['python','pytorch'],['python','sklearn'],['rag','langchain'],['genai','rag'],
    ['tensorflow','pytorch'],['python','flask'],['python','django'],['js','react'],
    ['js','nodejs'],['nodejs','express'],['nodejs','rest'],['express','mongo'],
    ['flask','postgres'],['dsa','cpp'],['dsa','java'],['dsa','python'],
    ['dsa','sysdes'],['sysdes','rest'],['oop','cpp'],['oop','java'],
    ['git','python'],['docker','nodejs'],['streamlit','python'],['streamlit','genai'],
    ['postgres','mysql'],['mongo','express'],
  ];

  /* ── VIEWPORT ── */
  let vpX = 0, vpY = 0, vpZ = 1;

  function toWorld(sx, sy) {
    return { x: (sx - vpX) / vpZ, y: (sy - vpY) / vpZ };
  }

  function initPos() {
    const cx = LW / 2, cy = LH / 2;
    const R  = Math.min(LW, LH) * 0.38;
    NODES.forEach((n, i) => {
      const a  = (i / NODES.length) * Math.PI * 2;
      const rr = R * (0.4 + Math.random() * 0.6);
      n.x  = cx + Math.cos(a) * rr;
      n.y  = cy + Math.sin(a) * rr;
      n.vx = 0; n.vy = 0;
    });
    vpX = 0; vpY = 0; vpZ = 1;
  }
  initPos();

  let hovered  = null;
  let dragging = null;
  let panning  = false;
  let pinned   = new Set();
  let time     = 0;
  let lastPanX = 0, lastPanY = 0;
  let dragOffX = 0, dragOffY = 0;

  function simulate() {
    const cx = LW / 2, cy = LH / 2;
    for (let i = 0; i < NODES.length; i++) {
      if (NODES[i] === dragging) continue;
      for (let j = i + 1; j < NODES.length; j++) {
        if (NODES[j] === dragging) continue;
        const dx = NODES[i].x - NODES[j].x;
        const dy = NODES[i].y - NODES[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy) || 1;
        const f  = 780 / (d * d);
        NODES[i].vx += f*dx/d; NODES[i].vy += f*dy/d;
        NODES[j].vx -= f*dx/d; NODES[j].vy -= f*dy/d;
      }
    }
    EDGES.forEach(([a, b]) => {
      const na = NODES.find(n => n.id === a);
      const nb = NODES.find(n => n.id === b);
      if (!na || !nb) return;
      const dx = nb.x - na.x, dy = nb.y - na.y;
      const d  = Math.sqrt(dx*dx + dy*dy) || 1;
      const ideal = (na.r + nb.r) * 2.6;
      const f  = (d - ideal) * 0.018;
      if (na !== dragging && !pinned.has(na.id)) { na.vx += f*dx/d; na.vy += f*dy/d; }
      if (nb !== dragging && !pinned.has(nb.id)) { nb.vx -= f*dx/d; nb.vy -= f*dy/d; }
    });
    NODES.forEach(n => {
      if (n === dragging || pinned.has(n.id)) return;
      n.vx += (cx - n.x) * 0.002;
      n.vy += (cy - n.y) * 0.002;
      n.vx *= 0.85; n.vy *= 0.85;
      n.x  += n.vx;  n.y  += n.vy;
    });
  }

  function connectedIds(id) {
    const s = new Set();
    EDGES.forEach(([a,b]) => { if (a===id) s.add(b); if (b===id) s.add(a); });
    return s;
  }

  function draw() {
    ctx.clearRect(0, 0, LW, LH);
    const dark = isDark();
    const connected = hovered ? connectedIds(hovered.id) : null;

    ctx.save();
    ctx.translate(vpX, vpY);
    ctx.scale(vpZ, vpZ);

    /* Grid background */
    ctx.fillStyle = dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.035)';
    const gStep = 36;
    const startX = Math.floor(-vpX / vpZ / gStep) * gStep;
    const startY = Math.floor(-vpY / vpZ / gStep) * gStep;
    const endX   = startX + LW / vpZ + gStep;
    const endY   = startY + LH / vpZ + gStep;
    for (let gx = startX; gx < endX; gx += gStep) {
      for (let gy = startY; gy < endY; gy += gStep) {
        ctx.beginPath(); ctx.arc(gx, gy, 1, 0, Math.PI*2); ctx.fill();
      }
    }

    /* Edges */
    EDGES.forEach(([a, b]) => {
      const na = NODES.find(n => n.id === a);
      const nb = NODES.find(n => n.id === b);
      if (!na || !nb) return;
      const isHov = hovered && (hovered.id === a || hovered.id === b);
      const dimEdge = hovered && !isHov;

      if (dimEdge) {
        ctx.lineWidth = 0.4;
        ctx.strokeStyle = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)';
        ctx.beginPath(); ctx.moveTo(na.x, na.y); ctx.lineTo(nb.x, nb.y); ctx.stroke();
      } else if (isHov) {
        const g = ctx.createLinearGradient(na.x, na.y, nb.x, nb.y);
        g.addColorStop(0, CATS[na.cat].c + 'ee');
        g.addColorStop(1, CATS[nb.cat].c + 'ee');
        ctx.save();
        ctx.lineWidth   = 2.5;
        ctx.strokeStyle = g;
        ctx.shadowColor = CATS[na.cat].c;
        ctx.shadowBlur  = 10;
        ctx.beginPath(); ctx.moveTo(na.x, na.y); ctx.lineTo(nb.x, nb.y); ctx.stroke();
        ctx.restore();
      } else {
        const g2 = ctx.createLinearGradient(na.x, na.y, nb.x, nb.y);
        g2.addColorStop(0, CATS[na.cat].c + '50');
        g2.addColorStop(1, CATS[nb.cat].c + '50');
        ctx.lineWidth   = 1;
        ctx.strokeStyle = g2;
        ctx.beginPath(); ctx.moveTo(na.x, na.y); ctx.lineTo(nb.x, nb.y); ctx.stroke();
      }
    });

    /* Nodes */
    const drawOrder = hovered
      ? [...NODES].sort((a, b) => {
          const aActive = a === hovered || (connected && connected.has(a.id));
          const bActive = b === hovered || (connected && connected.has(b.id));
          return aActive - bActive;
        })
      : NODES;

    drawOrder.forEach(n => {
      const cat    = CATS[n.cat];
      const isHov  = hovered === n;
      const isDrag = dragging === n;
      const isPinned = pinned.has(n.id);
      const isConn = connected && connected.has(n.id);
      const dimmed = hovered && !isHov && !isConn;
      const active = isHov || isDrag || isConn;
      const r      = (isHov || isDrag) ? n.r + 5 : n.r;
      const col    = cat.c;

      if (isHov || isDrag) {
        const pulse = 0.5 + 0.5 * Math.sin(time * 4);
        const gR    = r + 12 + pulse * 5;
        const grd   = ctx.createRadialGradient(n.x, n.y, r * 0.5, n.x, n.y, gR);
        grd.addColorStop(0,   col + '44');
        grd.addColorStop(0.6, col + '18');
        grd.addColorStop(1,  'transparent');
        ctx.beginPath(); ctx.arc(n.x, n.y, gR, 0, Math.PI*2);
        ctx.fillStyle = grd; ctx.fill();
      } else if (isConn) {
        const grd2 = ctx.createRadialGradient(n.x, n.y, r*0.5, n.x, n.y, r+9);
        grd2.addColorStop(0, col+'2a'); grd2.addColorStop(1,'transparent');
        ctx.beginPath(); ctx.arc(n.x, n.y, r+9, 0, Math.PI*2);
        ctx.fillStyle = grd2; ctx.fill();
      }

      const bg = ctx.createRadialGradient(n.x - r*0.3, n.y - r*0.35, 0, n.x, n.y, r);
      if (dark) {
        bg.addColorStop(0, active ? '#1c2438' : '#161c2a');
        bg.addColorStop(1, active ? '#0e1117' : '#0a0d14');
      } else {
        bg.addColorStop(0, active ? '#ffffff' : '#f0f4ff');
        bg.addColorStop(1, active ? '#e8eeff' : '#dde4f5');
      }
      ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI*2);
      ctx.fillStyle = bg; ctx.fill();

      ctx.lineWidth   = isHov||isDrag ? 2.5 : (isConn ? 2 : 1.5);
      ctx.strokeStyle = dimmed ? col+'22' : (active ? col : col+'75');
      ctx.stroke();

      if (isPinned && !isHov && !isDrag) {
        ctx.beginPath(); ctx.arc(n.x + r*0.66, n.y - r*0.66, 4, 0, Math.PI*2);
        ctx.fillStyle = col; ctx.fill();
      }

      /* Label */
      const maxFontW  = r * 1.55;
      let   fontSize  = isHov ? 12 : 11;
      ctx.font        = `600 ${fontSize}px "JetBrains Mono",monospace`;
      let   tw = ctx.measureText(n.l).width;
      if (tw > maxFontW) {
        fontSize = Math.max(8, fontSize * maxFontW / tw);
        ctx.font = `600 ${fontSize}px "JetBrains Mono",monospace`;
        tw       = ctx.measureText(n.l).width;
      }
      const th = fontSize;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';

      const pillPadX = 5, pillPadY = 3;
      const pillW = tw + pillPadX * 2;
      const pillH = th + pillPadY * 2;

      ctx.save();
      ctx.beginPath(); ctx.arc(n.x, n.y, r - 1, 0, Math.PI*2); ctx.clip();

      ctx.fillStyle = dark
        ? (dimmed ? 'rgba(10,13,20,0.7)' : 'rgba(10,13,20,0.88)')
        : (dimmed ? 'rgba(240,244,255,0.65)' : 'rgba(240,244,255,0.92)');
      ctx.beginPath();
      ctx.roundRect(n.x - pillW/2, n.y - pillH/2, pillW, pillH, 3);
      ctx.fill();

      if (dimmed) {
        ctx.fillStyle = dark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.22)';
      } else if (isHov || isDrag) {
        ctx.fillStyle = col;
      } else if (isConn) {
        ctx.fillStyle = dark ? '#d8e0ec' : '#0d1626';
      } else {
        ctx.fillStyle = dark ? 'rgba(216,224,236,0.9)' : 'rgba(13,22,38,0.9)';
      }
      ctx.fillText(n.l, n.x, n.y);
      ctx.restore();
    });

    ctx.restore();
  }

  function loop() { time += 0.016; simulate(); draw(); requestAnimationFrame(loop); }
  loop();

  /* Tooltip */
  let tipEl = null;
  function showTip(n, clientX, clientY) {
    if (!tipEl) {
      tipEl = document.createElement('div');
      tipEl.style.cssText = 'position:fixed;z-index:200;pointer-events:none;font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.04em;border-radius:7px;padding:8px 14px;white-space:nowrap;border:1px solid;backdrop-filter:blur(12px);transition:opacity .15s,transform .15s;line-height:1.7;box-shadow:0 4px 20px rgba(0,0,0,0.25)';
      document.body.appendChild(tipEl);
    }
    const dark = isDark();
    const cat  = CATS[n.cat];
    const conns = connectedIds(n.id).size;
    tipEl.style.background  = dark ? 'rgba(12,16,24,0.97)' : 'rgba(255,255,255,0.97)';
    tipEl.style.borderColor = cat.c + '70';
    tipEl.style.color       = dark ? '#d8e0ec' : '#0d1626';
    tipEl.innerHTML =
      `<span style="color:${cat.c};font-weight:700;letter-spacing:.02em">${n.l}</span>` +
      `<span style="color:rgba(128,140,160,0.6);margin:0 6px">//</span>` +
      `<span style="opacity:.65">${cat.l}</span>` +
      `<span style="display:block;margin-top:3px;font-size:9px;opacity:.45;letter-spacing:.08em">${conns} connection${conns!==1?'s':''} &bull; drag to move &bull; dbl-click to unpin</span>`;
    tipEl.style.opacity = '1';
    const tw = tipEl.offsetWidth  || 200;
    const th = tipEl.offsetHeight || 48;
    let   tx = clientX + 18;
    let   ty = clientY - th / 2;
    if (tx + tw + 8 > innerWidth)  tx = clientX - tw - 18;
    if (ty < 8)                     ty = 8;
    if (ty + th + 8 > innerHeight)  ty = innerHeight - th - 8;
    tipEl.style.left = tx + 'px';
    tipEl.style.top  = ty + 'px';
  }
  function hideTip() { if (tipEl) tipEl.style.opacity = '0'; }

  function getNode(sx, sy) {
    const w = toWorld(sx, sy);
    for (const n of NODES) {
      const dx = n.x - w.x, dy = n.y - w.y;
      if (dx*dx + dy*dy < (n.r + 6)*(n.r + 6)) return n;
    }
    return null;
  }

  cv.addEventListener('mousemove', e => {
    const rect = cv.getBoundingClientRect();
    const sx   = e.clientX - rect.left;
    const sy   = e.clientY - rect.top;

    if (dragging) {
      const w   = toWorld(sx, sy);
      dragging.x = w.x + dragOffX;
      dragging.y = w.y + dragOffY;
      dragging.vx = 0; dragging.vy = 0;
      cv.style.cursor = 'grabbing';
      showTip(dragging, e.clientX, e.clientY);
      return;
    }
    if (panning) {
      vpX += e.clientX - lastPanX;
      vpY += e.clientY - lastPanY;
      lastPanX = e.clientX;
      lastPanY = e.clientY;
      cv.style.cursor = 'grabbing';
      return;
    }
    const hit = getNode(sx, sy);
    hovered = hit;
    cv.style.cursor = hit ? 'grab' : 'crosshair';
    if (hit) showTip(hit, e.clientX, e.clientY);
    else hideTip();
  });

  cv.addEventListener('mousedown', e => {
    const rect = cv.getBoundingClientRect();
    const sx   = e.clientX - rect.left;
    const sy   = e.clientY - rect.top;
    const hit  = getNode(sx, sy);
    if (hit) {
      dragging = hit;
      const w  = toWorld(sx, sy);
      dragOffX = hit.x - w.x;
      dragOffY = hit.y - w.y;
      hit.vx   = 0; hit.vy = 0;
      cv.style.cursor = 'grabbing';
    } else {
      panning  = true;
      lastPanX = e.clientX;
      lastPanY = e.clientY;
      cv.style.cursor = 'grabbing';
    }
    e.preventDefault();
  });

  cv.addEventListener('mouseup', () => {
    if (dragging) { pinned.add(dragging.id); dragging = null; }
    panning = false;
    cv.style.cursor = hovered ? 'grab' : 'crosshair';
  });

  cv.addEventListener('dblclick', e => {
    const rect = cv.getBoundingClientRect();
    const hit  = getNode(e.clientX - rect.left, e.clientY - rect.top);
    if (hit) { pinned.delete(hit.id); hit.vx = 0; hit.vy = 0; }
    else { vpX = 0; vpY = 0; vpZ = 1; }
  });

  cv.addEventListener('wheel', e => {
    e.preventDefault();
    const rect   = cv.getBoundingClientRect();
    const sx     = e.clientX - rect.left;
    const sy     = e.clientY - rect.top;
    const factor = e.deltaY < 0 ? 1.12 : 0.9;
    const newZ   = Math.max(0.35, Math.min(3, vpZ * factor));
    vpX = sx - (sx - vpX) * (newZ / vpZ);
    vpY = sy - (sy - vpY) * (newZ / vpZ);
    vpZ = newZ;
  }, { passive: false });

  cv.addEventListener('mouseleave', () => { hovered = null; dragging = null; panning = false; hideTip(); cv.style.cursor = 'crosshair'; });
  addEventListener('resize', () => { resize(); initPos(); pinned.clear(); }, { passive: true });
  const tglBtn = document.getElementById('tgl');
  if (tglBtn) tglBtn.addEventListener('click', () => setTimeout(draw, 60));
})();
