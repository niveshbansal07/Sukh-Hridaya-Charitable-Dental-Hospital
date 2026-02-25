document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const backToTop = document.querySelector(".back-to-top");
  const mobileToggle = document.querySelector("[data-nav-toggle]");
  const mobilePanel = document.querySelector("[data-nav-panel]");
  const reviewSection = document.querySelector("[data-reviews]");
  const statCounters = document.querySelectorAll("[data-counter]");
  const cookieBanner = document.querySelector("[data-cookie-banner]");

  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    if (header) {
      header.classList.toggle("site-header--scrolled", y > 10);
    }
    if (backToTop) {
      backToTop.classList.toggle("back-to-top--visible", y > 360);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (mobileToggle && mobilePanel) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mobilePanel.classList.toggle("nav__mobile-panel--open");
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    mobilePanel.addEventListener("click", (event) => {
      if (event.target.matches("a")) {
        mobilePanel.classList.remove("nav__mobile-panel--open");
        mobileToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  if (backToTop) {
    backToTop.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  if ("IntersectionObserver" in window && statCounters.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute("data-counter") || "0", 10);
            const duration = 1200;
            const startTime = performance.now();

            function tick(now) {
              const progress = Math.min((now - startTime) / duration, 1);
              const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
              const current = Math.floor(target * eased);
              el.textContent = current.toLocaleString("en-IN");
              if (progress < 1) {
                requestAnimationFrame(tick);
              } else {
                el.textContent = target.toLocaleString("en-IN");
              }
            }

            requestAnimationFrame(tick);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );

    statCounters.forEach((el) => counterObserver.observe(el));
  }

  if ("IntersectionObserver" in window && reviewSection) {
    const sliderObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const trackWrappers = reviewSection.querySelectorAll("[data-review-track-wrapper]");
            trackWrappers.forEach((wrapper) => wrapper.classList.add("slide-track-animate"));
            sliderObserver.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    sliderObserver.observe(reviewSection);
  }

  if (cookieBanner) {
    const storageKey = "shcdh-cookie-consent-v1";
    const existing = window.localStorage.getItem(storageKey);
    if (!existing) {
      cookieBanner.style.display = "block";
    }

    cookieBanner.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.matches("[data-cookie-accept]")) {
        window.localStorage.setItem(storageKey, "accepted");
        cookieBanner.style.display = "none";
      } else if (target.matches("[data-cookie-dismiss]")) {
        window.localStorage.setItem(storageKey, "dismissed");
        cookieBanner.style.display = "none";
      }
    });
  }
});

