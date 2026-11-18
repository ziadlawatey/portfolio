(() => {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const el = document.createElement("div");
  el.className = "glass-cursor";
  el.dataset.state = "default";
  el.setAttribute("aria-hidden", "true");
  el.innerHTML =
    '<span class="gc-glass"></span><span class="gc-outline"></span>';
  document.body.appendChild(el);

  const HOTSPOT = {
    default: [5.5, 3],
    pointer: [12.5, 2.5],
    text: [14, 14],
    grabbing: [14, 14],
    "not-allowed": [4.5, 3],
  };

  const BLOCKED = ':disabled, [aria-disabled="true"], .cursor-not-allowed';
  const GRAB = '[draggable="true"]';
  const TEXT =
    'input:not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]';
  const POINTER =
    'a, button, [role="button"], summary, select, label[for], input[type="submit"], input[type="button"]';

  let x = 0;
  let y = 0;
  let target = null;
  let pressed = false;
  let state = "default";
  let frame = 0;

  function pick(t) {
    if (!(t instanceof Element)) return "default";
    if (t.closest(BLOCKED)) return "not-allowed";
    if (t.closest(".cursor-grabbing") || (pressed && t.closest(GRAB)))
      return "grabbing";
    if (t.closest(TEXT)) return "text";
    if (t.closest(POINTER)) return "pointer";
    return "default";
  }

  function draw() {
    frame = 0;
    const [hx, hy] = HOTSPOT[state];
    el.style.transform = `translate3d(${x - hx}px, ${y - hy}px, 0)`;
  }

  function update() {
    const next = pick(target);
    if (next !== state) {
      state = next;
      el.dataset.state = next;
    }
    if (!frame) frame = requestAnimationFrame(draw);
  }

  document.addEventListener(
    "mousemove",
    (e) => {
      x = e.clientX;
      y = e.clientY;
      target = e.target;
      document.documentElement.classList.add("has-glass-cursor");
      el.classList.add("visible");
      update();
    },
    { passive: true },
  );

  document.addEventListener("mousedown", () => {
    pressed = true;
    update();
  });

  document.addEventListener("mouseup", () => {
    pressed = false;
    update();
  });

  document.documentElement.addEventListener("mouseleave", () => {
    el.classList.remove("visible");
  });
})();
