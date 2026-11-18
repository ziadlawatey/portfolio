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

add_filter("wpseo_opengraph_image", "custom_og_image");
function custom_og_image($img) {
  $custom_img = wp_get_attachment_image_src(get_post_thumbnail_id(), "large");
  if ($custom_img) {
    return $custom_img[0];
  }
  return $img;
}
add_filter("wpseo_opengraph_image_width", "custom_og_image_width");
function custom_og_image_width($width) {
  $thumbnail_id = get_post_thumbnail_id();
  if ($thumbnail_id) {
    $img_data = wp_get_attachment_image_src($thumbnail_id, "large");
    if ($img_data && isset($img_data[1])) {
      return $img_data[1];
    }
  }
  return $width;
}
add_filter("wpseo_opengraph_image_height", "custom_og_image_height");
function custom_og_image_height($height) {
  $thumbnail_id = get_post_thumbnail_id();
  if ($thumbnail_id) {
    $img_data = wp_get_attachment_image_src($thumbnail_id, "large");
    if ($img_data && isset($img_data[2])) {
      return $img_data[2];
    }
  }
  return $height;
}
