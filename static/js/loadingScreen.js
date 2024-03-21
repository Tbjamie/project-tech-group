const bodyElement = document.body;

document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.querySelector(".loadingScreen");

  setTimeout(function () {
    loadingScreen.style.display = "none";
  }, 2000);
});
