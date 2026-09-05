document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();
  initNavbarScroll();
  initScrollProgress();
  initBackToTop();
  initRevealAnimations();
  initFlowDiagram();
  initLayoutDemo();
  initJsDemo();
});

// ---------------------------------------------------------
// Footer year
// ---------------------------------------------------------
function setCurrentYear() {
  const el = document.getElementById("currentYear");
  if (el) el.textContent = new Date().getFullYear();
}

// ---------------------------------------------------------
// Navbar: blur/background change on scroll
// ---------------------------------------------------------
function initNavbarScroll() {
  const navbar = document.getElementById("mainNavbar");
  if (!navbar) return;

  const updateNavbar = () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  // Close mobile menu after clicking a link
  const collapseEl = document.getElementById("navMenu");
  if (collapseEl && window.bootstrap) {
    const bsCollapse = new bootstrap.Collapse(collapseEl, { toggle: false });
    collapseEl.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        if (collapseEl.classList.contains("show")) bsCollapse.hide();
      });
    });
  }
}

// ---------------------------------------------------------
// Top scroll progress bar
// ---------------------------------------------------------
function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
}

// ---------------------------------------------------------
// Back to top button
// ---------------------------------------------------------
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 500) {
        btn.classList.add("visible");
      } else {
        btn.classList.remove("visible");
      }
    },
    { passive: true },
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ---------------------------------------------------------
// Reveal-on-scroll animations (IntersectionObserver)
// ---------------------------------------------------------
function initRevealAnimations() {
  const targets = document.querySelectorAll("[data-animate]");
  if (!targets.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
  );

  targets.forEach((el) => observer.observe(el));
}

function initFlowDiagram() {
  const diagram = document.getElementById("flowDiagram");
  if (!diagram) return;

  const nodes = diagram.querySelectorAll(".flow-node");
  if (!nodes.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const activateSequence = () => {
    nodes.forEach((node, index) => {
      setTimeout(
        () => node.classList.add("is-active"),
        prefersReducedMotion ? 0 : index * 350,
      );
    });
  };

  if (!("IntersectionObserver" in window)) {
    activateSequence();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activateSequence();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 },
  );

  observer.observe(diagram);
}

// ---------------------------------------------------------
// CSS demo: Flexbox <-> Grid toggle
// ---------------------------------------------------------
function initLayoutDemo() {
  const demo = document.getElementById("layoutDemo");
  const btnFlex = document.getElementById("btnFlex");
  const btnGrid = document.getElementById("btnGrid");
  const caption = document.getElementById("demoCaption");
  if (!demo || !btnFlex || !btnGrid || !caption) return;

  const setMode = (mode) => {
    if (mode === "grid") {
      demo.classList.add("mode-grid");
      caption.innerHTML = "Modo atual: <strong>display: grid;</strong>";
      btnGrid.classList.add("active");
      btnFlex.classList.remove("active");
    } else {
      demo.classList.remove("mode-grid");
      caption.innerHTML = "Modo atual: <strong>display: flex;</strong>";
      btnFlex.classList.add("active");
      btnGrid.classList.remove("active");
    }
  };

  btnFlex.addEventListener("click", () => setMode("flex"));
  btnGrid.addEventListener("click", () => setMode("grid"));
}

// ---------------------------------------------------------
// JavaScript interactive demo
// ---------------------------------------------------------
function initJsDemo() {
  const btn = document.getElementById("jsDemoBtn");
  const text = document.getElementById("jsDemoText");
  if (!btn || !text) return;

  let active = false;

  btn.addEventListener("click", () => {
    active = !active;
    if (active) {
      text.textContent = "JavaScript adicionou interatividade à página!";
      text.classList.add("js-active");
      btn.innerHTML =
        'Reverter interação <i class="bi bi-arrow-counterclockwise"></i>';
    } else {
      text.textContent = "Clique no botão para ver o JavaScript em ação.";
      text.classList.remove("js-active");
      btn.innerHTML =
        'Executar interação <i class="bi bi-lightning-charge-fill"></i>';
    }
  });
}
