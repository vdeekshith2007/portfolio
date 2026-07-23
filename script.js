/* ============================================================
   DEEKSHITH VATAPARTHI — PORTFOLIO SCRIPT
   Animations · Particles · Typing · Scroll Reveals · Data
   ============================================================ */
(function () {
  "use strict";
  /* ───────── LOADER ───────── */
  const loader = document.getElementById("loader");
  const loaderFill = document.getElementById("loader-fill");
  let loadProgress = 0;
  function advanceLoader() {
    loadProgress += Math.random() * 25 + 10;
    if (loadProgress > 100) loadProgress = 100;
    loaderFill.style.width = loadProgress + "%";
    if (loadProgress < 100) {
      setTimeout(advanceLoader, 200 + Math.random() * 300);
    }
  }
  advanceLoader();
  window.addEventListener("load", function () {
    loaderFill.style.width = "100%";
    setTimeout(function () {
      loader.classList.add("hidden");
      document.body.style.overflow = "";
      initRevealObserver();
      startCounters();
    }, 600);
  });
  /* ───────── PARTICLE CANVAS ───────── */
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let mouse = { x: -1000, y: -1000 };
  let animFrameId;
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  document.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    // Cursor glow
    const glow = document.getElementById("cursor-glow");
    if (glow) {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    }
  });
  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.hue = Math.random() > 0.5 ? 185 : 275; // cyan or purple
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      // Mouse repulsion
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.x += (dx / dist) * force * 2;
        this.y += (dy / dist) * force * 2;
      }
      // Wrap around
      if (this.x < -10) this.x = canvas.width + 10;
      if (this.x > canvas.width + 10) this.x = -10;
      if (this.y < -10) this.y = canvas.height + 10;
      if (this.y > canvas.height + 10) this.y = -10;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, ${this.opacity})`;
      ctx.fill();
    }
  }
  function initParticles() {
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }
  initParticles();
  window.addEventListener("resize", initParticles);
  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const alpha = (1 - dist / 140) * 0.12;
          ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function (p) {
      p.update();
      p.draw();
    });
    drawLines();
    animFrameId = requestAnimationFrame(animateParticles);
  }
  animateParticles();
  /* ───────── NAVBAR ───────── */
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  const navLinkEls = document.querySelectorAll(".nav-link");
  // Scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    // Back to top
    const btt = document.getElementById("back-to-top");
    if (btt) {
      if (window.scrollY > 600) {
        btt.classList.add("visible");
      } else {
        btt.classList.remove("visible");
      }
    }
    // Active link tracking
    updateActiveLink();
  });
  // Mobile menu toggle
  navToggle.addEventListener("click", function () {
    navToggle.classList.toggle("active");
    navLinks.classList.toggle("open");
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
  });
  // Close mobile menu on link click
  navLinkEls.forEach(function (link) {
    link.addEventListener("click", function () {
      navToggle.classList.remove("active");
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
  // Active link tracking
  function updateActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    let current = "";
    sections.forEach(function (section) {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute("id");
      }
    });
    navLinkEls.forEach(function (link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }
  // Back to top button
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  /* ───────── TYPING ANIMATION ───────── */
  const typingEl = document.getElementById("typing-text");
  const roles = [
    "AI / ML Developer",
    "Full Stack Engineer",
    "Problem Solver",
    "Computer Science Student",
    "Open Source Enthusiast",
    "Aspiring Software Engineer",
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;
  function typeWriter() {
    const current = roles[roleIndex];
    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }
    if (!isDeleting && charIndex === current.length) {
      typingSpeed = 2000; // pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // pause before next word
    }
    setTimeout(typeWriter, typingSpeed);
  }
  typeWriter();
  /* ───────── SCROLL REVEAL ───────── */
  function initRevealObserver() {
    const reveals = document.querySelectorAll(
      ".reveal-up, .reveal-left, .reveal-right, .reveal-float"
    );
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }
  /* ───────── COUNTER ANIMATION ───────── */
  function startCounters() {
    const counters = document.querySelectorAll(".counter");
    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (c) {
      counterObserver.observe(c);
    });
  }
  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target"), 10);
    const duration = 2000;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out expo
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(update);
  }
  /* ───────── PROGRESS BAR ANIMATION ───────── */
  function initProgressBars() {
    const bars = document.querySelectorAll(".ach-progress-fill");
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const fill = entry.target;
            const progress = fill.getAttribute("data-progress");
            fill.style.width = progress + "%";
            observer.unobserve(fill);
          }
        });
      },
      { threshold: 0.3 }
    );
    bars.forEach(function (bar) {
      observer.observe(bar);
    });
  }
  initProgressBars();
  /* ───────── SKILLS DATA & TABS ───────── */
  const skillsData = {
    languages: [
      { name: "C", icon: "🔵", level: "Advanced" },
      { name: "C++", icon: "🟣", level: "Advanced" },
      { name: "Java", icon: "☕", level: "Advanced" },
      { name: "Python", icon: "🐍", level: "Expert" },
      { name: "JavaScript", icon: "⚡", level: "Advanced" },
    ],
    cs: [
      { name: "Data Structures", icon: "🏗️", level: "Advanced" },
      { name: "Algorithms", icon: "⚙️", level: "Advanced" },
      { name: "OOP", icon: "📦", level: "Advanced" },
      { name: "Operating Systems", icon: "🖥️", level: "Intermediate" },
      { name: "DBMS", icon: "🗄️", level: "Advanced" },
      { name: "Computer Networks", icon: "🌐", level: "Intermediate" },
      { name: "System Design", icon: "🏛️", level: "Intermediate" },
    ],
    frontend: [
      { name: "HTML5", icon: "🌐", level: "Expert" },
      { name: "CSS3", icon: "🎨", level: "Expert" },
      { name: "JavaScript", icon: "⚡", level: "Advanced" },
      { name: "React.js", icon: "⚛️", level: "Advanced" },
      { name: "Responsive Design", icon: "📱", level: "Expert" },
    ],
    backend: [
      { name: "Node.js", icon: "🟢", level: "Advanced" },
      { name: "Express.js", icon: "🚂", level: "Advanced" },
      { name: "Flask", icon: "🌶️", level: "Advanced" },
      { name: "Django", icon: "🎸", level: "Intermediate" },
      { name: "REST APIs", icon: "🔗", level: "Advanced" },
    ],
    databases: [
      { name: "PostgreSQL", icon: "🐘", level: "Advanced" },
      { name: "MongoDB", icon: "🍃", level: "Advanced" },
      { name: "MySQL", icon: "🐬", level: "Advanced" },
    ],
    aiml: [
      { name: "Machine Learning", icon: "🤖", level: "Advanced" },
      { name: "Deep Learning", icon: "🧠", level: "Advanced" },
      { name: "Generative AI", icon: "✨", level: "Advanced" },
      { name: "LLMs", icon: "💬", level: "Advanced" },
      { name: "RAG", icon: "📚", level: "Advanced" },
      { name: "LangChain", icon: "🔗", level: "Advanced" },
      { name: "LangGraph", icon: "📊", level: "Intermediate" },
      { name: "Transformers", icon: "🔄", level: "Intermediate" },
      { name: "TensorFlow", icon: "🔶", level: "Advanced" },
      { name: "PyTorch", icon: "🔥", level: "Intermediate" },
      { name: "Scikit-learn", icon: "📈", level: "Advanced" },
    ],
    tools: [
      { name: "Git", icon: "🔀", level: "Advanced" },
      { name: "GitHub", icon: "🐙", level: "Advanced" },
      { name: "VS Code", icon: "💻", level: "Expert" },
      { name: "Linux", icon: "🐧", level: "Advanced" },
      { name: "Docker", icon: "🐳", level: "Intermediate" },
      { name: "Streamlit", icon: "🚀", level: "Advanced" },
    ],
  };
  const skillsGrid = document.getElementById("skills-grid");
  const skillTabs = document.querySelectorAll(".skill-tab");
  function renderSkills(category) {
    const data = skillsData[category] || [];
    skillsGrid.innerHTML = "";
    data.forEach(function (skill, i) {
      const card = document.createElement("div");
      card.className = "skill-card";
      card.style.animationDelay = i * 0.06 + "s";
      card.innerHTML =
        '<span class="skill-icon">' + skill.icon + "</span>" +
        "<h4>" + skill.name + "</h4>" +
        '<span class="skill-level">' + skill.level + "</span>";
      skillsGrid.appendChild(card);
    });
  }
  renderSkills("languages");
  skillTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      skillTabs.forEach(function (t) {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      renderSkills(tab.getAttribute("data-tab"));
    });
  });
  /* ───────── PROJECTS DATA ───────── */
  const projectsData = [
    {
      num: "01",
      title: "AI Resume Analyzer",
      description:
        "An AI-powered resume analysis system that evaluates resumes, extracts skills using NLP, provides improvement suggestions, matches job descriptions, and helps candidates optimize their resumes for ATS systems.",
      tags: ["Python", "NLP", "Generative AI", "LangChain", "Streamlit"],
      icon: "📄",
      color: "var(--accent-cyan)",
      github: "#",
      demo: "#",
    },
    {
      num: "02",
      title: "RAG PDF Question Answering System",
      description:
        "An intelligent document chatbot that allows users to upload PDFs and ask natural-language questions using Retrieval Augmented Generation. Chunks documents, embeds them in a vector store, and retrieves contextual answers with LLMs.",
      tags: ["Python", "LangChain", "Vector DB", "LLMs", "RAG"],
      icon: "📚",
      color: "var(--accent-purple)",
      github: "#",
      demo: "#",
    },
    {
      num: "03",
      title: "Skin Infection Detection Using AI",
      description:
        "A computer vision application that analyzes skin images and detects dermatological conditions using deep learning CNN models. Provides disease-related information and severity assessments powered by generative AI.",
      tags: ["Python", "TensorFlow", "CNN", "Generative AI", "OpenCV"],
      icon: "🔬",
      color: "var(--accent-green)",
      github: "#",
      demo: "#",
    },
    {
      num: "04",
      title: "Secure Online Aptitude Exam System",
      description:
        "A comprehensive secure online examination platform featuring multi-factor authentication, real-time proctoring with ML-based monitoring, intelligent evaluation engine, and anti-cheating safeguards.",
      tags: ["Full Stack", "Machine Learning", "Cyber Security", "Node.js"],
      icon: "🛡️",
      color: "var(--accent-orange)",
      github: "#",
      demo: "#",
    },
    {
      num: "05",
      title: "House Price Prediction System",
      description:
        "A machine learning model that predicts house prices using multiple regression algorithms. Features comprehensive EDA, feature engineering, model comparison, and a user-friendly prediction interface.",
      tags: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
      icon: "🏠",
      color: "var(--accent-pink)",
      github: "#",
      demo: "#",
    },
  ];
  const projectsGrid = document.getElementById("projects-grid");
  function renderProjects() {
    projectsData.forEach(function (project) {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML =
        '<div class="project-image">' +
          '<span class="project-image-icon">' + project.icon + "</span>" +
          '<div class="project-image-overlay"></div>' +
          '<span class="project-number">' + project.num + "</span>" +
        "</div>" +
        '<div class="project-body">' +
          "<h3>" + project.title + "</h3>" +
          "<p>" + project.description + "</p>" +
          '<div class="project-tags">' +
            project.tags.map(function (t) { return '<span class="project-tag">' + t + "</span>"; }).join("") +
          "</div>" +
          '<div class="project-links">' +
            '<a href="' + project.github + '" class="project-link" target="_blank" rel="noopener noreferrer">' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>' +
              "GitHub" +
            "</a>" +
            '<a href="' + project.demo + '" class="project-link" target="_blank" rel="noopener noreferrer">' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>' +
              "Live Demo" +
            "</a>" +
          "</div>" +
        "</div>";
      projectsGrid.appendChild(card);
    });
    // Observe project cards for scroll reveal
    const projectCards = document.querySelectorAll(".project-card");
    const projObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, idx) {
          if (entry.isIntersecting) {
            setTimeout(function () {
              entry.target.classList.add("visible");
            }, idx * 100);
            projObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    projectCards.forEach(function (card) {
      projObserver.observe(card);
    });
  }
  renderProjects();
  /* ───────── CONTRIBUTION GRAPH ───────── */
  const contribGraph = document.getElementById("contribution-graph");
  function renderContribGraph() {
    if (!contribGraph) return;
    // Generate 52 weeks × 7 days = 364 cells (show as flat grid)
    const totalWeeks = window.innerWidth < 768 ? 26 : 52;
    const fragment = document.createDocumentFragment();
    for (let week = 0; week < totalWeeks; week++) {
      for (let day = 0; day < 7; day++) {
        const cell = document.createElement("div");
        cell.className = "contrib-cell";
        // Weighted random level
        const rand = Math.random();
        let level = 0;
        if (rand > 0.6) level = 1;
        if (rand > 0.75) level = 2;
        if (rand > 0.88) level = 3;
        if (rand > 0.95) level = 4;
        if (level > 0) cell.classList.add("level-" + level);
        // Staggered entrance animation
        cell.style.opacity = "0";
        cell.style.transition = "opacity 0.3s ease " + (week * 7 + day) * 3 + "ms";
        fragment.appendChild(cell);
      }
    }
    contribGraph.innerHTML = "";
    contribGraph.style.gridTemplateColumns = "repeat(" + totalWeeks + ", 1fr)";
    contribGraph.appendChild(fragment);
    // Trigger entrance
    requestAnimationFrame(function () {
      const cells = contribGraph.querySelectorAll(".contrib-cell");
      cells.forEach(function (c) {
        c.style.opacity = "1";
      });
    });
  }
  // Observe github section
  const ghSection = document.getElementById("github-section");
  if (ghSection) {
    const ghObserver = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          renderContribGraph();
          ghObserver.unobserve(ghSection);
        }
      },
      { threshold: 0.1 }
    );
    ghObserver.observe(ghSection);
  }
  // Resize handler for contribution graph
  window.addEventListener("resize", function () {
    if (contribGraph && contribGraph.children.length > 0) {
      renderContribGraph();
    }
  });
  /* ───────── REPO LIST ───────── */
  const repos = [
    {
      name: "AI-Resume-Analyzer",
      desc: "NLP-powered resume evaluation system",
      lang: "Python",
      langColor: "#3572A5",
      stars: 3,
    },
    {
      name: "RAG-PDF-QA",
      desc: "Retrieval Augmented Generation chatbot",
      lang: "Python",
      langColor: "#3572A5",
      stars: 2,
    },
    {
      name: "Skin-Infection-Detection",
      desc: "Computer vision for dermatology",
      lang: "Python",
      langColor: "#3572A5",
      stars: 1,
    },
    {
      name: "Online-Exam-System",
      desc: "Secure aptitude testing platform",
      lang: "JavaScript",
      langColor: "#f1e05a",
      stars: 2,
    },
    {
      name: "House-Price-Prediction",
      desc: "ML regression model for real estate",
      lang: "Python",
      langColor: "#3572A5",
      stars: 1,
    },
  ];
  const repoList = document.getElementById("repo-list");
  function renderRepos() {
    if (!repoList) return;
    repos.forEach(function (repo) {
      const item = document.createElement("div");
      item.className = "repo-item";
      item.innerHTML =
        '<div class="repo-info">' +
          "<h5>" + repo.name + "</h5>" +
          "<p>" + repo.desc + "</p>" +
        "</div>" +
        '<div class="repo-meta">' +
          '<span class="repo-meta-item">' +
            '<span class="repo-lang-dot" style="background:' + repo.langColor + '"></span>' +
            repo.lang +
          "</span>" +
          '<span class="repo-meta-item">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' +
            repo.stars +
          "</span>" +
        "</div>";
      repoList.appendChild(item);
    });
  }
  renderRepos();
  /* ───────── CONTACT FORM ───────── */
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("form-name").value.trim();
      const email = document.getElementById("form-email").value.trim();
      const message = document.getElementById("form-message").value.trim();
      if (!name || !email || !message) {
        formStatus.textContent = "Please fill in all required fields.";
        formStatus.className = "form-status error";
        return;
      }
      // Simulate sending
      const submitBtn = document.getElementById("form-submit");
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Sending...';
      setTimeout(function () {
        formStatus.textContent = "✓ Message sent successfully! I'll get back to you soon.";
        formStatus.className = "form-status success";
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML =
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message';
      }, 1500);
    });
  }
  /* ───────── SMOOTH SCROLL FOR ANCHOR LINKS ───────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
  /* ───────── TILT EFFECT ON PROJECT CARDS ───────── */
  function addTiltEffect() {
    const cards = document.querySelectorAll(".project-card, .achievement-card");
    cards.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        card.style.transform =
          "perspective(800px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-4px)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }
  // Initialize tilt after projects render
  setTimeout(addTiltEffect, 500);
  /* ───────── MAGNETIC BUTTONS ───────── */
  document.querySelectorAll(".btn-primary, .btn-glow").forEach(function (btn) {
    btn.addEventListener("mousemove", function (e) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = "translate(" + x * 0.15 + "px, " + y * 0.15 + "px) translateY(-2px)";
    });
    btn.addEventListener("mouseleave", function () {
      btn.style.transform = "";
    });
  });
  /* ───────── SPINNING ICON ANIMATION (for form submit) ───────── */
  const style = document.createElement("style");
  style.textContent =
    ".spin-icon { animation: spin 0.8s linear infinite; }" +
    "@keyframes spin { to { transform: rotate(360deg); } }";
  document.head.appendChild(style);
  /* ───────── PREFERS REDUCED MOTION CHECK ───────── */
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    cancelAnimationFrame(animFrameId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
})();
