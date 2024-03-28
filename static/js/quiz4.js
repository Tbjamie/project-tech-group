const gameSection = document.querySelector("section:nth-of-type(2)");

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

      // de game items verbergen
      gameItem.style.display = "none";

      // event listener toevoegen om zoeken op invoer te triggeren
      let searchInput = document.getElementById("searchbar");
      searchInput.addEventListener("input", function () {
        let searchTerm = this.value;
        filterGamesByTitle(searchTerm, gameItem);
      });
    });
  });

// Functie om spellen te filteren op titel (zoeken)
function filterGamesByTitle(searchTerm, gameItem) {
  // Zoekterm omzetten naar kleine letters voor hoofdlettergevoelig zoeken
  searchTerm = searchTerm.toLowerCase();

  // krijg de game title
  let gameTitle = gameItem.querySelector("h3").innerText.toLowerCase();

  if (gameTitle.includes(searchTerm)) {
    gameItem.style.display = "block"; // Show de game item als de title matches
  } else {
    gameItem.style.display = "none"; // Hide de game item als de title niet match
  }
}



