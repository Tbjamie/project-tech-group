const gameSelect = document.getElementById("dropDown");

fetch("/json/games.json")
  .then((response) => {
    if (!response.ok) {
      console.log("ERROR");
    }
    return response.json();
  })
  .then((data) => {
    const games = data.games;
    console.log(data.games);
    games.forEach((game) => {
      let title = game.title;
      let gameNaam = document.createElement("option");
      gameNaam.innerText = title;
      gameSelect.append(gameNaam);
    });
  });
