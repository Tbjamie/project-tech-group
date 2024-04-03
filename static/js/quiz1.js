const filterMenu = document.querySelector(".filterMenu");
const filterButton = document.querySelector(
  "main section:first-of-type .flexdiv button"
);

const genreSelect = document.querySelector(".genreselect");

const taalSelect = document.querySelector(".taalSelect");
const closeButtonFilter = document.querySelector(".cross");
const dropDown = document.querySelector(".select-dropdown");
const matchSection = document.querySelector("section:nth-of-type(4)");
const matchSection2 = document.querySelector("section:nth-of-type(3)");
const eersteSection = document.querySelector("section:nth-of-type(2)");
const button = document.querySelector('button');
const svgIcon = document.querySelector('.cross');
const peStatus = document.querySelector('section:nth-of-type(2) p');
const peAnswer = document.querySelector('.answers p');


const gameSection = document.querySelector("fieldset:nth-of-type(4) .gamesArticle");




fetch("/static/json/taal.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch language data.");
    }
    return response.json();
  })
  .then((data) => {
    const languages = data.taal;
    languages.forEach((language) => {
      const option = document.createElement("option");
      option.value = language.nationality;
      option.textContent = language.nationality;
      taalSelect.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Error fetching language data:", error);
  });



  
fetch("/static/json/games.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch genre data.");
    }
    return response.json();
  })
  .then((data) => {
    const genres = data.games;
    genres.forEach((game) => {
      const option = document.createElement("option");
      option.value = game.genre;
      option.textContent = game.genre;
      genreSelect.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Error fetching genre data:", error);
  });



  fetch("/static/json/games.json")
  .then((response) => {
    if (!response.ok) {
      console.log("ERROR");
    }

    return response.json();
  })
  .then((data) => {
    const games = data.games;
    games.forEach((game) => {
      let gameItem = document.createElement("article");
      gameSection.append(gameItem);
      let gameLink = document.createElement("a");
      let gameName = game.title;
      let hrefValue = `games/${gameName}`;
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

      // De game-items verbergen
      gameItem.style.display = "none";
    });
  });

// Event listener toevoegen om te filteren op zoekterm
let searchInput = document.getElementById("searchbar");
searchInput.addEventListener("input", function () {
  let searchTerm = this.value.toLowerCase();
  const gameItems = document.querySelectorAll(".gamesArticle article");

  // Controleren of de zoekterm niet leeg is
  if (searchTerm.trim() === "") {
    gameItems.forEach((gameItem) => {
      gameItem.style.display = "none"; // Verbergen als de zoekterm leeg is
    });
  } else {
    gameItems.forEach((gameItem) => {
      let gameTitle = gameItem.querySelector("h3").innerText.toLowerCase();
      if (gameTitle.includes(searchTerm)) {
        gameItem.style.display = "block"; // Weergeven als de titel overeenkomt met de zoekterm
      } else {
        gameItem.style.display = "none"; // Verbergen als de titel niet overeenkomt met de zoekterm
      }
    });
  }
});