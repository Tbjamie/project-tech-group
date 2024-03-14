var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
  autoplay: {
    delay: 10000, // Set the delay to 5000 milliseconds (5 seconds)
    disableOnInteraction: false, // Allow autoplay to continue even if the user interacts with the slider
  },
});
