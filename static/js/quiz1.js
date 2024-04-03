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
const button = document.querySelector("button");

const nxtButton = document.querySelector(".nxtButton");
const prvButton = document.querySelector(".prvButton");

const languageFieldset = document.getElementById("language");
const platformFieldset = document.getElementById("platform");
const genreFieldset = document.getElementById("genre");
const favoGameFieldset = document.getElementById("favoGame");

const svgIcon = document.querySelector(".cross");
const peStatus = document.querySelector("section:nth-of-type(2) p");
const peAnswer = document.querySelector(".answers p");

const gameSection = document.querySelector(
  "fieldset:nth-of-type(4) .gamesArticle"
);

document.addEventListener("DOMContentLoaded", function () {
  const fieldsets = document.querySelectorAll("fieldset");
  const nextButton = document.getElementById("nxtButton");
  const prevButton = document.getElementById("prvButton");
  const resultButton = document.querySelector(".resultButton");
  const answersSection = document.getElementById("answers");
  const pagination = document.getElementById("pagination");
  let currentFieldsetIndex = 0;

  // Function to show a specific fieldset
  function showFieldset(index) {
    for (let i = 0; i < fieldsets.length; i++) {
      if (i === index) {
        fieldsets[i].style.display = "block";
      } else {
        fieldsets[i].style.display = "none";
      }
    }
    updatePagination();
  }

  // Function to update pagination indicator
  function updatePagination() {
    pagination.textContent = `Page ${currentFieldsetIndex + 1} of ${
      fieldsets.length
    }`;
  }

  // Function to show the next fieldset
  function showNextFieldset() {
    if (currentFieldsetIndex < fieldsets.length - 1) {
      currentFieldsetIndex++;
      showFieldset(currentFieldsetIndex);
    }
    if (currentFieldsetIndex === fieldsets.length - 1) {
      nextButton.style.display = "none";
      resultButton.style.display = "block";
    }
  }

  // Function to show the previous fieldset
  function showPreviousFieldset() {
    if (currentFieldsetIndex > 0) {
      currentFieldsetIndex--;
      showFieldset(currentFieldsetIndex);
      nextButton.style.display = "block";
      resultButton.style.display = "none";
    }
  }

  // Event listener for the next button
  if (nextButton) {
    nextButton.addEventListener("click", function (event) {
      event.preventDefault();
      showNextFieldset();
    });
  }

  // Event listener for the previous button
  if (prevButton) {
    prevButton.addEventListener("click", function (event) {
      event.preventDefault();
      showPreviousFieldset();
    });
  }

  // Event listener for the result button
  if (resultButton) {
    resultButton.addEventListener("click", function (event) {
      event.preventDefault();
      // Show answers section
      answersSection.style.display = "block";
      // Hide next and previous buttons
      nextButton.style.display = "none";
      prevButton.style.display = "block";
      // Hide result button
      resultButton.style.display = "none";
    });
  }

  // Initially show the first fieldset
  showFieldset(currentFieldsetIndex);
});

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
