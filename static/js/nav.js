// Add an event listener for when the page loads
window.addEventListener("load", function () {
  // Get the current page URL
  var url = window.location.href;

  // Check if the current page is the Discover page
  if (url.includes("/discover")) {
    // Get the Discover link in the navigation bar
    let discoverLink = document.querySelector("nav ul li a[href='/discover']");

    // Add the active class to the Discover link
    discoverLink.classList.add("active");
  } else if (url.includes("/account")) {
    // Get the Account link in the navigation bar
    let accountLink = document.querySelector("nav ul li a[href='/account']");

    // Add the active class to the Account link
    accountLink.classList.add("active");
  } else if (url.includes("/give")) {
    // Get the Give link in the navigation bar
    let giveLink = document.querySelector("nav ul li a[href='/give']");

    // Add the active class to the Give link
    giveLink.classList.add("active");
  } else if (url.includes("/forum")) {
    // Get the Forum link in the navigation bar
    let forumLink = document.querySelector("nav ul li a[href='/forum']");

    // Add the active class to the Forum link
    forumLink.classList.add("active");
  } else {
    // Get the Home link in the navigation bar
    let homeLink = document.querySelector("nav ul li a[href='/']");

    // Add the active class to the Home link
    homeLink.classList.add("active");
  }
});
