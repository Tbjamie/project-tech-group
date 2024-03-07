const priceValue = document.querySelector("#priceValue");
const filterMenu = document.querySelector(".filterMenu");
const filterButton = document.querySelector(
  "main section:first-of-type .flexdiv button"
);
const closeButtonFilter = document.querySelector(".cross");
const navButtonHome = document.querySelector("nav ul li a:first-of-type")
const navButtonDiscover = document.querySelector("nav ul li a:nth-of-type(2)")
const navButtonCommunity = document.querySelector("nav ul li a:nth-of-type(3)")
const navButtonForum = document.querySelector("nav ul li a:nth-of-type(4)")
const navButtonAccount = document.querySelector("nav ul li a:last-of-type")
const navButtons = document.querySelectorAll("nav ul li")

for (input of document.querySelectorAll("input[type=range]")) {
  actualizarInput(input);
}

document.addEventListener("input", function (evt) {
  let input = evt.target;
  actualizarInput(input);
});

function actualizarInput(input) {
  let label = input.parentElement.querySelector("label");
  label.innerHTML = input.value;
  let inputMin = input.getAttribute("min");
  let inputMax = input.getAttribute("max");
  let unidad = (inputMax - inputMin) / 100;
  input.style.setProperty("--value", (input.value - inputMin) / unidad);
  if (priceValue.value == 0) {
    document.getElementById("prijsLabel").innerHTML = "Free";
  } else {
    return;
  }
}

filterButton.addEventListener("click", () => {
  let stateChecker = "inactive";
  if (stateChecker == "inactive") {
    stateChecker = "active";
    filterMenu.classList.add("activeFilter");
    document.body.style.overflowY = "hidden";
    // filterMenu.style.display = "flex";
  }
  // else {
  //   stateChecker = "inactive";
  //   filterMenu.classList.remove("activeFilter");
  // }
});

closeButtonFilter.addEventListener("click", () => {
  // filterMenu.style.display = "none";
  // setTimeout(1000, () => {
  filterMenu.classList.remove("activeFilter");
  document.body.style.overflowY = "scroll";
  //   });
  // });
});

const activeNavPage = () => {

  // navButtonHome.addEventListener("click", () => {
  //   navButtonHome.classList.add("activeNavPage")
  //   navButtonDiscover.classList.remove("activeNavPage")
  //   navButtonCommunity.classList.remove("activeNavPage")
  //   navButtonForum.classList.remove("activeNavPage")
  //   navButtonAccount.classList.remove("activeNavPage")
  // })

  // navButtonDiscover.addEventListener("click", () => {
  //   navButtonHome.classList.remove("activeNavPage")
  //   navButtonDiscover.classList.add("activeNavPage")
  //   navButtonCommunity.classList.remove("activeNavPage")
  //   navButtonForum.classList.remove("activeNavPage")
  //   navButtonAccount.classList.remove("activeNavPage")
  // })

  // navButtonCommunity.addEventListener("click", () => {
  //   navButtonHome.classList.remove("activeNavPage")
  //   navButtonDiscover.classList.remove("activeNavPage")
  //   navButtonCommunity.classList.add("activeNavPage")
  //   navButtonForum.classList.remove("activeNavPage")
  //   navButtonAccount.classList.remove("activeNavPage")
  // })

  // navButtonForum.addEventListener("click", () => {
  //   navButtonHome.classList.remove("activeNavPage")
  //   navButtonDiscover.classList.remove("activeNavPage")
  //   navButtonCommunity.classList.remove("activeNavPage")
  //   navButtonForum.classList.add("activeNavPage")
  //   navButtonAccount.classList.remove("activeNavPage")
  // })

  // navButtonAccount.addEventListener("click", () => {
  //   navButtonHome.classList.remove("activeNavPage")
  //   navButtonDiscover.classList.remove("activeNavPage")
  //   navButtonCommunity.classList.remove("activeNavPage")
  //   navButtonForum.classList.remove("activeNavPage")
  //   navButtonAccount.classList.add("activeNavPage")
  // })

  navButtons.forEach(button => {
    console.log(button)
      button.addEventListener("click", () => {
        button.classList.add("activeNavPage")
      })
      button.classList.remove("activeNavPage")
  })
}

activeNavPage();