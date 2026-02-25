document.addEventListener("DOMContentLoaded", () => {
  const srElements = document.querySelectorAll("[data-sr]");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("sr-hidden");
            entry.target.classList.add("sr-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    srElements.forEach((el) => {
      el.classList.add("sr-hidden");
      observer.observe(el);
    });
  } else {
    srElements.forEach((el) => el.classList.add("sr-visible"));
  }

  const parallaxEls = document.querySelectorAll("[data-parallax]");
  if ("IntersectionObserver" in window && parallaxEls.length > 0) {
    const parallaxObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("parallax");
          }
        });
      },
      { threshold: 0.05 }
    );

    parallaxEls.forEach((el) => parallaxObserver.observe(el));

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY || window.pageYOffset;
      parallaxEls.forEach((el) => {
        const depth = parseFloat(el.getAttribute("data-parallax")) || 0.2;
        const offset = -(scrollY * depth);
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    });
  }
});

