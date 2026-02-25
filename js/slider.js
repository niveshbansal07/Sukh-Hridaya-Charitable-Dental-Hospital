document.addEventListener("DOMContentLoaded", () => {
  const sliderTrack = document.querySelector("[data-review-track]");
  if (!sliderTrack) return;

  const cards = Array.from(sliderTrack.children);
  if (cards.length === 0) return;

  const clone = sliderTrack.cloneNode(true);
  sliderTrack.parentElement.appendChild(clone);

  let isHovered = false;
  sliderTrack.parentElement.addEventListener("mouseenter", () => {
    isHovered = true;
    sliderTrack.parentElement.style.animationPlayState = "paused";
  });
  sliderTrack.parentElement.addEventListener("mouseleave", () => {
    isHovered = false;
    sliderTrack.parentElement.style.animationPlayState = "running";
  });
});

