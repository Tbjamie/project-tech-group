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
  });
});








