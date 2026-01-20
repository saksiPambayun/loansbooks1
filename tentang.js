console.log("LoansBooks - Tentang Page loaded");

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const isDecimal = target.toString().includes(".");

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = isDecimal
        ? target.toFixed(1)
        : target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = isDecimal
        ? start.toFixed(1)
        : Math.floor(start).toLocaleString();
    }
  }, 16);
}

const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px",
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.classList.contains("animated")) {
      entry.target.classList.add("animated");

      const statNumbers = entry.target.querySelectorAll(".stat-number");
      statNumbers.forEach((stat) => {
        const text = stat.textContent;
        let target;

        if (text.includes("/")) {
          target = parseFloat(text.split("/")[0]);
          animateCounter(stat, target, 1500);
          setTimeout(() => {
            stat.textContent = text; // Kembalikan format asli
          }, 1500);
        } else if (text.includes("+")) {
          target = parseInt(text.replace(/[,+]/g, ""));
          animateCounter(stat, target, 2000);
          setTimeout(() => {
            stat.textContent = target.toLocaleString() + "+";
          }, 2000);
        } else {
          target = parseInt(text.replace(/,/g, ""));
          animateCounter(stat, target, 2000);
        }
      });
    }
  });
}, observerOptions);

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.1,
  },
);

document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.querySelector(".stats-section");
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  const sections = document.querySelectorAll(
    ".feature-card, .vm-card, .reason-item",
  );
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "all 0.6s ease";
    fadeObserver.observe(section);
  });

  const revealSections = document.querySelectorAll(
    ".about-section, .features-section, .why-choose, .cta-section",
  );
  revealSections.forEach((section, index) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = `all 0.8s ease ${index * 0.1}s`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(section);
  });
});

window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero-about");
  if (hero) {
    const scrolled = window.pageYOffset;
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

const ctaBtn = document.querySelector(".cta-btn");
if (ctaBtn) {
  ctaBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Terima kasih! Fitur pendaftaran akan segera hadir. 🎉");
  });
}

const featureCards = document.querySelectorAll(".feature-card");
featureCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.borderColor = "#640ef1";
  });

  card.addEventListener("mouseleave", function () {
    this.style.borderColor = "transparent";
  });
});

console.log("📚 Welcome to LoansBooks About Page!");
console.log("🎯 Visi: Menjadi platform peminjaman buku digital terdepan");
console.log("🚀 Misi: Memudahkan akses literasi untuk semua");

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    animateCounter,
  };
}
