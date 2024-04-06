document.addEventListener("DOMContentLoaded", function () {
  fetch("/json/games.json")
    .then((response) => response.json())
    .then((data) => {
      const games = data.games;

      // Function to generate a random integer between min (inclusive) and max (inclusive)
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      // Function to shuffle an array
      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      // Select random games for swiper
      const randomGamesForSwiper = [];
      const numGamesForSwiper = Math.min(5, games.length); // Ensure we don't exceed the number of available games

      while (randomGamesForSwiper.length < numGamesForSwiper) {
        const randomIndex = getRandomInt(0, games.length - 1);
        const randomGame = games[randomIndex];

        // Check if the game is not already selected
        if (!randomGamesForSwiper.includes(randomGame)) {
          randomGamesForSwiper.push(randomGame);
        }
      }

      randomGamesForSwiper.forEach((game) => {
        const li = document.createElement("li");
        let gameName = game.title;
        let hrefValue = `games/${gameName}`;

        li.classList.add("swiper-slide");
        li.style.backgroundImage = `url(${game.url})`; // Set background image
        li.setAttribute("id", "game-image");
        li.innerHTML = `
                <a href="${hrefValue}">
                <h4>${game.title}</h4>
                <p>${game.genre}</p>
                <p>${game.description}</p>
                <p>${game.price}</p>
                <button>Get the game</button>
                </a>
            `;
        document.querySelector(".swiper-wrapper").appendChild(li);
      });

      // Initialize Swiper after adding the slides dynamically
      let swiper = new Swiper(".mySwiper", {
        autoplay: {
          delay: 10000,
          disableOnInteraction: false,
        },
      });

      const sliderWrapper = document.querySelector(".slider-wrapper");

      // Sort games by release date in descending order
      games.sort((a, b) => parseInt(b.release) - parseInt(a.release));

      // Display the 8 most recent games
      const numberOfGamesToDisplayForSlider = 8;
      for (
        let i = 0;
        i < numberOfGamesToDisplayForSlider && i < games.length;
        i++
      ) {
        const game = games[i];
        const li = document.createElement("li");
        li.classList.add("slider-slide");

        let gameName = game.title;
        let hrefValue = `games/${gameName}`;

        li.innerHTML = `
                <a href="${hrefValue}">
                <img src="${game.url}" alt="${game.title}" />
                <h3>${game.genre}</h3>
                <h4>${game.title}</h4>
                <p>${game.price}</p>
                </a>
            `;
        sliderWrapper.append(li);
      }

      // Select random games for popular section
      const randomGamesForPopular = shuffle([...games]); // Shuffle the entire games array
      const numberOfGamesToDisplayForPopular = Math.min(
        8,
        randomGamesForPopular.length
      );
      for (let i = 0; i < numberOfGamesToDisplayForPopular; i++) {
        const game = randomGamesForPopular[i];
        const li = document.createElement("li");
        li.classList.add("popular-slide");
        let gameName = game.title;
        let hrefValue = `games/${gameName}`;
        li.innerHTML = `
                <a href="${hrefValue}">
                <img src="${game.url}" alt="${game.title}" />
                <h3>${game.genre}</h3>
                <h4>${game.title}</h4>
                </a>
            `;
        document.querySelector(".popular-wrapper").appendChild(li);
      }

      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      // Function to shuffle an array
      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      // Filter out free games
      const pricedGames = games.filter((game) => game.price !== "Free");

      const randomGamesForDiscount = shuffle([...pricedGames]);
      const numberOfGamesToDisplayForDiscount = Math.min(
        8,
        randomGamesForDiscount.length
      );

      for (let i = 0; i < numberOfGamesToDisplayForDiscount; i++) {
        const game = randomGamesForDiscount[i];
        // Ensure that game.price is parsed as a number
        const price = parseFloat(game.price);
        if (isNaN(price)) {
          console.error(`Invalid price for game ${game.title}`);
          continue; // Skip this game and continue to the next iteration
        }

        const discountRate = 0.3; // 30% discount
        const discountedPrice = `€${(price * (1 - discountRate)).toFixed(2)}`;
        const discountAmount = `€${(price * discountRate).toFixed(2)}`;

        const li = document.createElement("li");
        li.classList.add("discount-slide");
        let gameName = game.title;
        let hrefValue = `games/${gameName}`;
        li.innerHTML = `
          <a href="${hrefValue}">
            <img src="${game.url}" alt="${game.title}" />
            <h3>${game.genre}</h3>
            <h4>${game.title}</h4>
            <div id="price-discount">
              <p id="oPrice">€${price.toFixed(2)}</p>
              <p id="nPrice">${discountedPrice} <span>${Math.round(
          (parseFloat(discountAmount.replace("€", "")) /
            parseFloat(price.toFixed(2))) *
            100
        )}% off</span></p>
            </div>     
          </a>
        `;
        document.querySelector(".discount-wrapper").append(li);
      }
    })
    .catch((error) => console.error("Error fetching JSON:", error));
});