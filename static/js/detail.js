// Fetch JSON data
fetch("/json/games.json")
  .then((response) => {
    if (!response.ok) {
      console.log("ERROR");
    }

    return response.json();
  })
  .then((data) => {
    // Get the game ID from the URL parameter
    const gameId = decodeURIComponent(window.location.pathname.split("/")[2]);

    // Find the game object with the corresponding ID
    const game = data.games.find((item) => item.title === gameId);

    if (game) {
      // Set the details of the game on the detail page

      document.getElementById("title").innerText = game.title;
      document.getElementById("description").innerText = game.description;
      document.getElementById("image").src = game.url;
      document.getElementById("devIcon").src = game.launcher;
      document.getElementById("age").innerText = game.age;
      let developerSpan = document.getElementById("developerSpan").innerHTML = game.developer
      document.getElementById(
        "developer"
      ).innerText = `Developer: ${developerSpan}`;
    } else {
      // Handle case where game ID is not found
      document.body.innerHTML = "<h1>Game not found</h1>";
    }
  })
  .catch((error) => console.error("Error fetching data:", error));
