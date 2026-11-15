const header = document.querySelector("header");
const backToTop = document.querySelector(".back-to-top");

function updateHeader() {
  header.classList.toggle("scrolled", header.getBoundingClientRect().top <= 0);
}

function updateScroll() {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const threshold = scrollableHeight * 0.4;

  backToTop.classList.toggle("show", window.scrollY > threshold);
}

window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("scroll", updateScroll, { passive: true });
