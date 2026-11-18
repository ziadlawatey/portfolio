const header = document.querySelector("header");
const backToTop = document.querySelector(".back-to-top");
const footer = document.querySelector("footer");

function updateHeader() {
  header.classList.toggle("scrolled", header.getBoundingClientRect().top <= 0);
}

function updateScroll() {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const threshold = scrollableHeight * 0.4;

  backToTop.classList.toggle("show", window.scrollY > threshold);

  const footerRect = footer.getBoundingClientRect();
  const buttonHeight = backToTop.offsetHeight;
  const bottomGap = 20;

  const overlap = window.innerHeight - footerRect.top;

  backToTop.style.bottom =
    overlap > buttonHeight + bottomGap ? `${overlap + bottomGap}px` : "30px";
}

window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("scroll", updateScroll, { passive: true });

updateHeader();
updateScroll();
