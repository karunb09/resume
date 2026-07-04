// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
});

// Close the mobile menu after choosing a section
navMenu.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
    }
});

// Fade sections in as they scroll into view
const revealObserver = new IntersectionObserver(
    (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        }
    },
    { threshold: 0.1 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Highlight the nav link for the section currently in view
const navLinks = [...document.querySelectorAll(".nav-menu a")];
const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

const sectionObserver = new IntersectionObserver(
    (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                navLinks.forEach((link) =>
                    link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`)
                );
            }
        }
    },
    { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

// Keep the footer year current
document.getElementById("year").textContent = new Date().getFullYear();
