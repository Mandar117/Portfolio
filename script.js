// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Scroll-reveal using IntersectionObserver
const revealEls = Array.from(document.querySelectorAll(".reveal"));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      // Stagger list item reveals (like "bullets appearing slowly")
      const el = entry.target;
      const parentList = el.closest("ul, ol");

      if (parentList && el.tagName.toLowerCase() === "li") {
        const items = Array.from(parentList.querySelectorAll("li.reveal"));
        const idx = items.indexOf(el);
        el.style.transitionDelay = `${idx * 120}ms`;
      }

      el.classList.add("is-visible");
      io.unobserve(el);
    });
  },
  { threshold: 0.18 }
);

revealEls.forEach((el) => io.observe(el));

// Active nav link highlight
const sections = Array.from(document.querySelectorAll("main section[id]"));
const navLinks = Array.from(document.querySelectorAll(".nav__link"));

const navIO = new IntersectionObserver(
  (entries) => {
    // Pick the section most in view
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    const id = visible.target.id;
    navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
  },
  { threshold: [0.2, 0.35, 0.5, 0.65] }
);

sections.forEach((s) => navIO.observe(s));
