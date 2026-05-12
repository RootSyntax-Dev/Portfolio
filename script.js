// ── Init Lucide icons ──────────────────────────────────────
lucide.createIcons();

// ── THEME TOGGLE ───────────────────────────────────────────
const html      = document.documentElement;
const toggleBtn = document.getElementById("theme-toggle");
const iconSun   = document.getElementById("theme-icon-sun");
const iconMoon  = document.getElementById("theme-icon-moon");

function applyTheme(t) {
  html.setAttribute("data-theme", t);
  localStorage.setItem("vs-theme", t);
  if (t === "light") {
    iconSun.classList.add("hidden");
    iconMoon.classList.remove("hidden");
  } else {
    iconMoon.classList.add("hidden");
    iconSun.classList.remove("hidden");
  }
}
toggleBtn.addEventListener("click", () =>
  applyTheme(html.getAttribute("data-theme") === "dark" ? "light" : "dark")
);
applyTheme(localStorage.getItem("vs-theme") || "dark");

// ── MOBILE MENU ────────────────────────────────────────────
const hamburger  = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
hamburger.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
document.querySelectorAll("#mobile-menu a").forEach(a =>
  a.addEventListener("click", () => mobileMenu.classList.add("hidden"))
);

// ── ACTIVE NAV ON SCROLL ───────────────────────────────────
const navLinks = document.querySelectorAll(".nav-link");
new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove("active"));
      document.querySelectorAll(`.nav-link[href="#${e.target.id}"]`)
              .forEach(l => l.classList.add("active"));
    }
  });
}, { rootMargin: "-38% 0px -55% 0px" })
.observe && document.querySelectorAll("section[id]")
  .forEach(s => new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      navLinks.forEach(l => l.classList.remove("active"));
      document.querySelectorAll(`.nav-link[href="#${s.id}"]`)
              .forEach(l => l.classList.add("active"));
    }
  }, { rootMargin:"-38% 0px -55% 0px" }).observe(s));

// ── SCROLL-REVEAL ──────────────────────────────────────────
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.07 });

document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.04}s`;
  ro.observe(el);
});
// stagger groups
document.querySelectorAll(".stagger").forEach(g => ro.observe(g));

// ── TYPING ANIMATION ──────────────────────────────────────
const typedEl   = document.getElementById("typed-name");
const titleEl   = document.getElementById("hero-title");

// Roles to type out
const typedRoles = [
  "Python Developer",
  "Web Developer",
  "Data Analyst",
];
let roleIdx = 0, cIdx = 0, del = false;

function typeLoop() {
  const text = typedRoles[roleIdx];
  if (del) {
    cIdx--;
    typedEl.textContent = text.slice(0, cIdx);
    if (cIdx === 0) {
      del  = false;
      roleIdx = (roleIdx + 1) % typedRoles.length;
      setTimeout(typeLoop, 380);
      return;
    }
    setTimeout(typeLoop, 48);
  } else {
    cIdx++;
    typedEl.textContent = text.slice(0, cIdx);
    if (cIdx === text.length) {
      setTimeout(() => { del = true; typeLoop(); }, 2200);
      return;
    }
    setTimeout(typeLoop, 85);
  }
}
setTimeout(typeLoop, 800);

// ── ROLE ROTATOR ───────────────────────────────────────────
const roles  = ["CSE-AIML Student", "Passout year 2026"];
let rIdx = 0;
const roleEl = document.getElementById("role-text");
setInterval(() => {
  roleEl.style.opacity = "0";
  roleEl.style.transform = "translateY(-5px)";
  setTimeout(() => {
    rIdx = (rIdx + 1) % roles.length;
    roleEl.textContent = roles[rIdx];
    roleEl.style.transition = "all 0.38s ease";
    roleEl.style.opacity = "1";
    roleEl.style.transform = "translateY(0)";
  }, 280);
  roleEl.style.transition = "all 0.25s ease";
}, 2600);

// ── CERT MODAL ─────────────────────────────────────────────
const certOverlay = document.getElementById("portfolio-modal");
const mImg  = document.getElementById("modal-img");
const mTitle= document.getElementById("modal-title");
const mIss  = document.getElementById("modal-issuer");
const mDesc = document.getElementById("modal-description");
const mDate = document.getElementById("modal-date");

function openModal(title, issuer, desc, date, src) {
  mTitle.textContent = title; mIss.textContent = issuer;
  mDesc.textContent  = desc;  mDate.textContent = date;
  mImg.src = src;
  certOverlay.classList.remove("hidden");
  requestAnimationFrame(() => certOverlay.classList.add("open"));
  document.body.style.overflow = "hidden";
}
function closeModal() {
  certOverlay.classList.remove("open");
  setTimeout(() => { certOverlay.classList.add("hidden"); document.body.style.overflow = ""; }, 320);
}

// ── PROJECT MODAL ──────────────────────────────────────────
const projOverlay   = document.getElementById("project-modal");
const projTitle     = document.getElementById("project-modal-title");
const projVideoCont = document.getElementById("project-modal-video-container");
const projVideo     = document.getElementById("project-modal-video");
const projShots     = document.getElementById("project-modal-screenshots");

function openProjectModal(title, shots, videoSrc) {
  projTitle.textContent = title;
  videoSrc ? (projVideo.src = videoSrc, projVideoCont.classList.remove("hidden"))
           : projVideoCont.classList.add("hidden");

  projShots.innerHTML = "";
  const pc  = shots.filter(s => s.includes("PC-Dashboard"));
  const mob = shots.filter(s => s.includes("Mobile-Dashboard"));
  const oth = shots.filter(s => !s.includes("PC-Dashboard") && !s.includes("Mobile-Dashboard"));

  function addImgs(list) {
    list.forEach(src => {
      const img = document.createElement("img");
      img.src = src; img.alt = title;
      img.className = "w-full h-auto rounded-xl border border-white/10 cursor-pointer hover:border-indigo-500 transition";
      img.onclick = () => window.open(src, "_blank");
      projShots.appendChild(img);
    });
  }
  if (pc.length || mob.length) {
    if (pc.length)  { addLabel("🖥️ PC Dashboard");  addImgs(pc); }
    if (mob.length) { addLabel("📱 Mobile Dashboard"); addImgs(mob); }
  } else { addImgs(oth); }

  projOverlay.classList.remove("hidden");
  requestAnimationFrame(() => projOverlay.classList.add("open"));
  document.body.style.overflow = "hidden";
}
function addLabel(txt) {
  const p = document.createElement("p");
  p.className = "col-span-full text-xs font-bold uppercase tracking-widest text-indigo-400 mt-2 mb-2";
  p.textContent = txt; projShots.appendChild(p);
}
function closeProjectModal() {
  projOverlay.classList.remove("open");
  projVideo.pause(); projVideo.currentTime = 0;
  setTimeout(() => { projOverlay.classList.add("hidden"); document.body.style.overflow = ""; }, 320);
}

// ── ESC TO CLOSE ───────────────────────────────────────────
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (!certOverlay.classList.contains("hidden")) closeModal();
    if (!projOverlay.classList.contains("hidden")) closeProjectModal();
  }
});

// ── RE-INIT ICONS AFTER THEME CHANGE ──────────────────────
new MutationObserver(() => lucide.createIcons())
  .observe(html, { attributes: true, attributeFilter: ["data-theme"] });