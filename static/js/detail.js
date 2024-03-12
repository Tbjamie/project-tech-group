// Fetch JSON data
fetch("/static/json/games.json")
  .then((response) => response.json())
  .then((data) => {
    // Get the game ID from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get("id");

    // Find the game object with the corresponding ID
    const game = data.games.find((item) => item.id === gameId);

    if (game) {
      // Set the details of the game on the detail page
      document.getElementById("title").innerText = game.title;
      document.getElementById("description").innerText = game.description;
      document.getElementById("image").src = game.url;
      document.getElementById("devIcon").src = game.launcher;
      document.getElementById("age").innerText = game.age;
      document.getElementById(
        "developer"
      ).innerText = `Developer: ${game.developer}`;
    } else {
      // Handle case where game ID is not found
      document.body.innerHTML = "<h1>Game not found</h1>";
    }
  })
  .catch((error) => console.error("Error fetching data:", error));
