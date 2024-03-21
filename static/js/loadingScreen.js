const bodyElement = document.body;

document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.querySelector(".loadingScreen");

  setTimeout(function () {
    loadingScreen.style.display = "none";
    bodyElement.style.overflowY = "scroll";
  }, 2000);
});
