fetch("/static/json/games.json")
  .then((response) => response.json())
  .then((data) => {
    const games = data.games;

    // Add random games to Swiper
    const randomGames = getRandomGames(games, 5);
    randomGames.forEach((game) => {
      const li = document.createElement("li");
      li.classList.add("swiper-slide");
      li.style.backgroundImage = `url(${game.url})`;
      li.setAttribute("id", "game-image");
      li.innerHTML = `
        <h4>${game.title}</h4>
        <p>${game.description}</p>
        <p>${game.price}</p>
        <a href="#">Buy now</a>
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
    games.forEach((game) => {
      const li = document.createElement("li");
      li.classList.add("slider-slide");
      li.innerHTML = `
        <img src="${game.url}" alt="${game.title}" id="nr-image" />
        <h3>${game.genre}</h3>
        <h4>${game.title}</h4>
      `;
      sliderWrapper.append(li);
    });

    const popularWrapper = document.querySelector(".popular-wrapper");
    games.forEach((game) => {
      const li = document.createElement("li");
      li.classList.add("popular-slide");
      li.innerHTML = `
        <img src="${game.url}" alt="${game.title}" id="popular-image"/>
        <h3>${game.genre}</h3>
        <h4>${game.title}</h4>
      `;
      popularWrapper.append(li);
    });
  })
  .catch((error) => console.error("Error fetching JSON:", error));

function getRandomGames(array, n) {
  const shuffled = array.sort(() => 0.5 - Math.random()); // Shuffle array
  return shuffled.slice(0, n); // Get sub-array of first n elements after shuffle
}

function getNewReleases(array, n) {
  const sortedByReleaseDate = array.sort(
    (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
  ); // Sort by release date
  return sortedByReleaseDate.slice(0, n); // Get sub-array of first n elements
}
