// const { response } = require("express");

const priceValue = document.querySelector("#priceValue");
const filterMenu = document.querySelector(".filterMenu");
const filterButton = document.querySelector(
  "main section:first-of-type .flexdiv button"
);
const closeButtonFilter = document.querySelector(".cross");
const navButtonHome = document.querySelector("nav ul li a:first-of-type");
const navButtonDiscover = document.querySelector("nav ul li a:nth-of-type(2)");
const navButtonCommunity = document.querySelector("nav ul li a:nth-of-type(3)");
const navButtonForum = document.querySelector("nav ul li a:nth-of-type(4)");
const navButtonAccount = document.querySelector("nav ul li a:last-of-type");
const navButtons = document.querySelectorAll("nav ul li");

const gameSection = document.querySelector("section:nth-of-type(3)");

for (input of document.querySelectorAll("input[type=range]")) {
  actualizarInput(input);
}

// const gameList = async () => {
//   const response = await fetch("/static/json/games.json");
//   const data = response.json();

//   const games = data.games;

//   console.log(games);
// };

// gameList();

fetch("/static/json/games.json")
  .then((response) => {
    if (!response.ok) {
      console.log("ERROR");
    }

    return response.json();
  })
  .then((data) => {
    const games = data.games;
    console.log(games);
    games.forEach((game) => {
      let gameItem = document.createElement("article");
      gameSection.append(gameItem);
      let gameLink = document.createElement("a");
      let gameId = game.id;
      let hrefValue = `detail.html?id=${gameId}`;
      gameLink.setAttribute("href", hrefValue);
      gameItem.append(gameLink);
      let gameTitle = document.createElement("h3");
      gameTitle.innerText = game.title;
      gameItem.append(gameTitle);
      let gameLauncher = document.createElement("img");
      gameLauncher.setAttribute("src", game.launcher);
      gameItem.append(gameLauncher);
      let gameImage = document.createElement("img");
      gameImage.setAttribute("src", game.url);
      gameItem.append(gameImage);
    });
  });

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
  navButtons.forEach((button) => {
    console.log(button);
    button.addEventListener("click", () => {
      button.classList.add("activeNavPage");
    });
    button.classList.remove("activeNavPage");
  });
};

activeNavPage();
