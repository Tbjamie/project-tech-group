const gameSection = document.querySelector("section:nth-of-type(2) .gamesArticle");

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