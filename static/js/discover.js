// const { response } = require("express");

const priceValue = document.querySelector("#priceValue");
const filterMenu = document.querySelector(".filterMenu");
const filterButton = document.querySelector(
  "main section:first-of-type .flexdiv button"
);
const closeButtonFilter = document.querySelector(".cross");
const resultButton = document.querySelector(".resultButton");
const resetButton = document.querySelector(".resetButton");
const navButtonHome = document.querySelector("nav ul li a:first-of-type");
const navButtonDiscover = document.querySelector("nav ul li a:nth-of-type(2)");
const navButtonCommunity = document.querySelector("nav ul li a:nth-of-type(3)");
const navButtonForum = document.querySelector("nav ul li a:nth-of-type(4)");
const navButtonAccount = document.querySelector("nav ul li a:last-of-type");
const navButtons = document.querySelectorAll("nav ul li");

const gameSection = document.querySelector("section:nth-of-type(3)");
const activeFilterSection = document.querySelector("section:nth-of-type(2)");

const divFlexGenre = document.querySelector(".divFlexGenre");

let genreArray;

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

fetch("/json/games.json")
  .then((response) => {
    if (!response.ok) {
      console.log("ERROR");
    }

    return response.json();
  })
  .then((data) => {
    const games = data.games;
    const uniqueGenres = new Set(); // Een set om unieke genres bij te houden
    const selectedGenres = []; // Een array om geselecteerde genres bij te houden

    // Functie om games te filteren op basis van de geselecteerde genres
    function displayGamesByGenres(genres) {
      const gameItems = document.querySelectorAll(
        "main section:nth-of-type(3) article"
      );
      gameItems.forEach((gameItem) => {
        const gameGenre = gameItem.dataset.genre; // Haal het genre op van het game-item

        // Controleer of het genre van het game-item overeenkomt met een van de geselecteerde genres
        if (genres.length === 0) {
          gameItem.style.display = "block"; // Toon het game-item
        } else {
          // Controleer of het genre van het game-item overeenkomt met een van de geselecteerde genres
          if (genres.includes(gameGenre)) {
            gameItem.style.display = "block"; // Toon het game-item
          } else {
            gameItem.style.display = "none"; // Verberg het game-item
          }
        }
      });
    }

    // Functie om games te filteren op basis van de geselecteerde genres
    function filterGamesByGenres(genres) {
      const filteredGames = games.filter((game) => {
        return (
          Array.isArray(game.genre) &&
          genres.some((genre) => game.genre.includes(genre))
        );
      });
      // Voeg hier je eigen logica toe om de gefilterde games weer te geven
      console.log(filteredGames);
    }

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

      function filterGamesByTitle(searchTerm) {
        // Convert search term to lowercase for case-insensitive matching
        searchTerm = searchTerm.toLowerCase();

        // Loop through each game item and hide/show based on the search term
        games.forEach((game) => {
          let gameTitle = game.title.toLowerCase(); // Convert title to lowercase
          let gameItem = document.querySelector(`[data-id="${game.id}"]`);

          if (gameTitle.includes(searchTerm)) {
            gameItem.style.display = "block"; // Show the game item if title matches
          } else {
            gameItem.style.display = "none"; // Hide the game item if title doesn't match
          }
        });
      }

      // Example usage:
      // Assuming you have an input field with id="searchInput" for users to input their search query
      // Add event listener to trigger search on input
      let searchInput = document.getElementById("searchbar");

      // Add event listener to trigger search on input
      searchInput.addEventListener("input", function () {
        let searchTerm = this.value;
        filterGamesByTitle(searchTerm);
      });

      // Function to filter games by title (search)
      function filterGamesByTitle(searchTerm) {
        // Convert search term to lowercase for case-insensitive matching
        searchTerm = searchTerm.toLowerCase();

        // Loop through each game item and hide/show based on the search term
        const gameItems = document.querySelectorAll(
          "main section:nth-of-type(3) article"
        );
        gameItems.forEach((gameItem) => {
          const gameTitle = gameItem
            .querySelector("h3")
            .innerText.toLowerCase(); // Get the game title
          if (gameTitle.includes(searchTerm)) {
            gameItem.style.display = "block"; // Show the game item if title matches
          } else {
            gameItem.style.display = "none"; // Hide the game item if title doesn't match
          }
        });
      }


      let genre = game.genre; // Haal de genres op van de game

      // Als er meerdere genres zijn, pak dan alleen het eerste genre
      if (Array.isArray(genre) && genre.length > 0) {
        genre = genre[0].trim(); // Neem alleen het eerste genre
      }

      // Voeg het genre toe aan de set als het nog niet voorkomt
      uniqueGenres.add(genre);
      // Voeg het genre toe als een dataset-attribuut aan het game-item
      gameItem.dataset.genre = genre;
    });

    // Maak knoppen voor elk uniek genre en voeg eventlisteners toe
    uniqueGenres.forEach((genre) => {
      let genreFilterButton = document.createElement("button");
      genreFilterButton.innerText = genre;
      divFlexGenre.append(genreFilterButton);

      // Voeg een eventlistener toe aan de knop om te filteren op genre
      genreFilterButton.addEventListener("click", () => {
        // Markeer de geselecteerde knop en voeg toe aan/verwijder uit de lijst met geselecteerde genres
        genreFilterButton.classList.toggle("selected");

        if (selectedGenres.includes(genre)) {
          selectedGenres.splice(selectedGenres.indexOf(genre), 1);
          // Verwijder de bijbehorende filterknop als het genre wordt gedeselecteerd
          const filterButtons = Array.from(activeFilterSection.children);
          const selectedFilterButton = filterButtons.find(
            (button) => button.dataset.genre === genre
          );
          if (selectedFilterButton) {
            activeFilterSection.removeChild(selectedFilterButton);
          }
        } else {
          selectedGenres.push(genre);
          // Voeg een nieuwe filterknop toe voor het geselecteerde genre
          let filterItem = document.createElement("button");
          filterItem.innerText = genre;
          filterItem.dataset.genre = genre; // Voeg dataset-attribuut toe voor identificatie
          // Voeg de SVG icon toe aan de button
          const svgIcon = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          svgIcon.setAttribute("class", "cross");
          svgIcon.setAttribute("viewBox", "0 0 24 24");
          svgIcon.setAttribute("xml:space", "preserve");
          const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          path.setAttribute(
            "d",
            "M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z"
          );
          svgIcon.appendChild(path);
          filterItem.appendChild(svgIcon);
          filterItem.addEventListener("click", () => {
            // Deselecteer het genre wanneer de filterknop wordt geklikt
            genreFilterButton.classList.remove("selected");
            selectedGenres.splice(selectedGenres.indexOf(genre), 1);
            activeFilterSection.removeChild(filterItem); // Verwijder de filterknop
            displayGamesByGenres(selectedGenres); // Update de weergave van games
          });
          activeFilterSection.append(filterItem);
        }
        resetButton.addEventListener("click", () => {
          // Reset selected genres
          const genreButtons = document.querySelectorAll(
            ".divFlexGenre button"
          );
          genreButtons.forEach((button) => {
            if (button.classList.contains("selected")) {
              button.classList.remove("selected");
            }
          });

          // Clear active filter section
          activeFilterSection.innerHTML = "";

          // Reset selectedGenres array
          selectedGenres.length = 0;

          // Reset price range
          const priceInput = document.getElementById("priceValue");
          const priceLabel = document.getElementById("prijsLabel");
          priceInput.value = 75;
          priceLabel.textContent = "75"; // Update the label to default value

          // Reset display of all game items
          const gameItems = document.querySelectorAll(
            "main section:nth-of-type(3) article"
          );
          gameItems.forEach((item) => {
            item.style.display = "block";
          });
        });

        // Weergeef alleen de games van de geselecteerde genres
        displayGamesByGenres(selectedGenres);

        // Filter games op basis van de geselecteerde genres
        filterGamesByGenres(selectedGenres);
      });
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
  }
});

closeButtonFilter.addEventListener("click", () => {
  filterMenu.classList.remove("activeFilter");
  document.body.style.overflowY = "scroll";
});
resultButton.addEventListener("click", () => {
  filterMenu.classList.remove("activeFilter");
  document.body.style.overflowY = "scroll";
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
