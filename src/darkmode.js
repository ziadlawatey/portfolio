const root = document.documentElement;
const buttons = document.querySelectorAll("[data-theme-choice]");
const media = window.matchMedia("(prefers-color-scheme: dark)");

const getTheme = () =>
  localStorage.getItem("theme") || (media.matches ? "dark" : "light");

const applyTheme = (theme) => {
  root.dataset.theme = theme;
  buttons.forEach((b) =>
    b.setAttribute("aria-pressed", b.dataset.themeChoice === theme),
  );
};

applyTheme(getTheme());

buttons.forEach((b) =>
  b.addEventListener("click", () => {
    localStorage.setItem("theme", b.dataset.themeChoice);
    applyTheme(b.dataset.themeChoice);
  }),
);

// Follow system changes only if the user hasn't chosen manually
media.addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) applyTheme(e.matches ? "dark" : "light");
});
