// Add an event listener for when the page loads
window.addEventListener("load", function () {
  // Get the current page URL
  var url = window.location.href;

  // Check if the current page is the Discover page
  if (url.includes("/discover")) {
    // Get the Discover link in the navigation bar
    var discoverLink = document.querySelector("nav ul li a[href='/discover']");

    // Add the active class to the Discover link
    discoverLink.classList.add("active");
  } else if (url.includes("/account")) {
    // Get the Account link in the navigation bar
    var accountLink = document.querySelector("nav ul li a[href='/account']");

    // Add the active class to the Account link
    accountLink.classList.add("active");
  } else if (url.includes("/")) {
    // Get the Account link in the navigation bar
    var accountLink = document.querySelector("nav ul li a[href='/']");

    // Add the active class to the Account link
    accountLink.classList.add("active");
  }
});
