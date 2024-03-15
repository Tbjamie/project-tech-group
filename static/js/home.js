var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
  autoplay: {
    delay: 10000, 
    disableOnInteraction: false, 
  },
});

document.addEventListener("DOMContentLoaded", function () {
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const slides = document.querySelectorAll(".slider-slide");
  const slideWidth = slides[0].offsetWidth;

  let slideIndex = 0;
  let startX = 0;
  let endX = 0;

  function showSlide(index) {
    const offset = -slideWidth * index;
    sliderWrapper.style.transform = `translateX(${offset}px)`;
  }

  function showNextSlide() {
    slideIndex++;
    if (slideIndex >= slides.length) {
      slideIndex = 0;
    }
    showSlide(slideIndex);
  }

  function showPreviousSlide() {
    slideIndex--;
    if (slideIndex < 0) {
      slideIndex = slides.length - 1;
    }
    showSlide(slideIndex);
  }

  sliderWrapper.addEventListener("mousedown", (e) => {
    startX = e.clientX;
  });

  sliderWrapper.addEventListener("mouseup", (e) => {
    endX = e.clientX;
    if (startX - endX > 50) {
      showNextSlide();
    } else if (endX - startX > 50) {
      showPreviousSlide();
    }
  });

  sliderWrapper.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  sliderWrapper.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
      showNextSlide();
    } else if (endX - startX > 50) {
      showPreviousSlide();
    }
  });
});

