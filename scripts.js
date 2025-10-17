// ====== Mobile Hamburger Toggle ======
const hamburger = document.querySelector(".hamburger");
const mobileHeader = document.querySelector(".header.mobile");

if (hamburger && mobileHeader) {
  hamburger.addEventListener("click", () => {
    mobileHeader.classList.toggle("active");
    hamburger.classList.toggle("active");
  });
}