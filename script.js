const heroSlides = [
  {
    title: "商業空間照明代理",
    description: "依粉專公開介紹，品牌主力方向聚焦於商業空間照明，並結合門市選購與空間需求討論。",
    image: 'url("https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80")'
  },
  {
    title: "線性鋁條與 LED 光源",
    description: "公開介紹中列出線性鋁條照明與 LED 節能燈泡，網站已可據此整理成較完整的商品結構。",
    image: 'url("https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1800&q=80")'
  },
  {
    title: "規劃與專業施工安裝",
    description: "除了門市商品選購，也提供照明工程規劃，以及居家與商業燈飾的施工安裝支援。",
    image: 'url("https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=80")'
  }
];

const projectSlides = [
  {
    title: "商業空間照明｜主力方向",
    description: "依粉專公開介紹，品牌主打商業空間照明代理，並延伸到商品選購與工程規劃。",
    specs: [
      "南部商業空間照明代理商定位",
      "實體門市提供多款式樣選擇",
      "可延伸至居家與商業施工安裝"
    ],
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "多樣燈具｜門市可選品項",
    description: "公開介紹內容列出線性鋁條照明、LED 節能燈泡與室內美術型燈具，足以發展成商品型內容區塊。",
    specs: [
      "線性鋁條照明",
      "LED 節能燈泡",
      "室內美術型燈具"
    ],
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "專業服務｜規劃到安裝",
    description: "品牌不只賣燈，也把照明工程規劃與居家、商業燈飾的施工安裝納入服務內容。",
    specs: [
      "照明工程規劃",
      "居家燈飾施工安裝",
      "商業燈飾施工安裝"
    ],
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1400&q=80"
  }
];

const caseStudies = Array.isArray(window.caseStudiesData) ? window.caseStudiesData : [];

const root = document.documentElement;
const heroTitle = document.getElementById("hero-title");
const heroDescription = document.getElementById("hero-description");
const heroIndex = document.getElementById("hero-index");
const heroDots = document.querySelector(".hero-dots");
const projectTitle = document.getElementById("project-title");
const projectDescription = document.getElementById("project-description");
const projectImage = document.getElementById("project-image");
const projectSpecs = document.querySelector(".project-specs");
const projectPrev = document.getElementById("project-prev");
const projectNext = document.getElementById("project-next");
const caseSection = document.getElementById("case-studies");
const caseTag = document.getElementById("case-tag");
const caseTitle = document.getElementById("case-title");
const caseMeta = document.getElementById("case-meta");
const caseDescription = document.getElementById("case-description");
const caseHighlights = document.getElementById("case-highlights");
const caseImage = document.getElementById("case-image");
const caseLink = document.getElementById("case-link");
const caseDots = document.getElementById("case-dots");
const caseList = document.getElementById("case-list");
const casePrev = document.getElementById("case-prev");
const caseNext = document.getElementById("case-next");
const menuToggle = document.querySelector(".menu-toggle");
const siteHeader = document.querySelector(".site-header");
const siteMenu = document.getElementById("site-menu");

let heroCurrent = 0;
let projectCurrent = 0;
let caseCurrent = 0;
let heroTimer;

function renderHero(index) {
  const slide = heroSlides[index];
  root.style.setProperty("--hero-image", slide.image);
  heroTitle.textContent = slide.title;
  heroDescription.textContent = slide.description;
  heroIndex.textContent = String(index + 1).padStart(2, "0");

  document.querySelectorAll(".hero-dot").forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === index);
  });
}

function startHeroRotation() {
  window.clearInterval(heroTimer);
  heroTimer = window.setInterval(() => {
    heroCurrent = (heroCurrent + 1) % heroSlides.length;
    renderHero(heroCurrent);
  }, 5000);
}

function renderProject(index) {
  const slide = projectSlides[index];
  projectTitle.textContent = slide.title;
  projectDescription.textContent = slide.description;
  projectImage.src = slide.image;
  projectImage.alt = slide.title;
  projectSpecs.innerHTML = slide.specs.map((item) => `<li>${item}</li>`).join("");
}

function renderCaseStudy(index) {
  const study = caseStudies[index];
  caseTag.textContent = study.tag;
  caseTitle.textContent = study.title;
  caseMeta.textContent = study.meta;
  caseDescription.textContent = study.description;
  caseImage.src = study.image;
  caseImage.alt = study.title;
  caseHighlights.innerHTML = study.highlights.map((item) => `<li>${item}</li>`).join("");
  caseLink.href = study.link;
  caseLink.textContent = study.linkLabel;

  document.querySelectorAll(".case-dot").forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === index);
  });

  document.querySelectorAll(".case-list-item").forEach((item, itemIndex) => {
    const isActive = itemIndex === index;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-pressed", String(isActive));
  });
}

heroSlides.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.className = "hero-dot";
  dot.type = "button";
  dot.setAttribute("aria-label", `切換到第 ${index + 1} 張主視覺`);
  dot.addEventListener("click", () => {
    heroCurrent = index;
    renderHero(heroCurrent);
    startHeroRotation();
  });
  heroDots.appendChild(dot);
});

projectPrev.addEventListener("click", () => {
  projectCurrent = (projectCurrent - 1 + projectSlides.length) % projectSlides.length;
  renderProject(projectCurrent);
});

projectNext.addEventListener("click", () => {
  projectCurrent = (projectCurrent + 1) % projectSlides.length;
  renderProject(projectCurrent);
});

if (caseStudies.length > 0) {
  caseStudies.forEach((study, index) => {
    const dot = document.createElement("button");
    dot.className = "case-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `切換到案例 ${index + 1}`);
    dot.addEventListener("click", () => {
      caseCurrent = index;
      renderCaseStudy(caseCurrent);
    });
    caseDots.appendChild(dot);

    const item = document.createElement("button");
    item.className = "case-list-item";
    item.type = "button";
    item.innerHTML = `
      <span class="case-list-tag">${study.tag}</span>
      <h4>${study.title}</h4>
      <p class="case-list-meta">${study.meta}</p>
      <p class="case-list-description">${study.description}</p>
    `;
    item.addEventListener("click", () => {
      caseCurrent = index;
      renderCaseStudy(caseCurrent);
    });
    caseList.appendChild(item);
  });

  casePrev.addEventListener("click", () => {
    caseCurrent = (caseCurrent - 1 + caseStudies.length) % caseStudies.length;
    renderCaseStudy(caseCurrent);
  });

  caseNext.addEventListener("click", () => {
    caseCurrent = (caseCurrent + 1) % caseStudies.length;
    renderCaseStudy(caseCurrent);
  });
} else if (caseSection) {
  caseSection.hidden = true;
}

menuToggle.addEventListener("click", () => {
  const isOpen = siteHeader.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

siteMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteHeader.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -10% 0px"
  }
);

document.querySelectorAll("[data-reveal]").forEach((element) => {
  revealObserver.observe(element);
});

renderHero(heroCurrent);
renderProject(projectCurrent);
if (caseStudies.length > 0) {
  renderCaseStudy(caseCurrent);
}
startHeroRotation();
