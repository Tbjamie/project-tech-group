const genreSelect = document.querySelector(".genreselect");
const genreSelect2 = document.querySelector("#answers .genreselect");
const taalSelect = document.querySelector(".taalSelect");
const taalSelect2 = document.querySelector("#answers .taalSelect");
const dropDown = document.querySelector(".select-dropdown");
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

  // Function voor show een specific fieldset
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

// Function voor update pagination indicator
function updatePagination() {
  pagination.textContent = `Page ${currentFieldsetIndex + 1} of ${fieldsets.length}`;
  if (currentFieldsetIndex === 0) {
    prevButton.style.display = "none";
  } else {
    prevButton.style.display = "block";
  }
}

  // Function voor show de next fieldset
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

  // Function voor show de previous fieldset
  function showPreviousFieldset() {
    if (currentFieldsetIndex > 0) {
      currentFieldsetIndex--;
      showFieldset(currentFieldsetIndex);
      nextButton.style.display = "block";
      resultButton.style.display = "none";
    }
  }

  // Event listener voor de next button
  if (nextButton) {
    nextButton.addEventListener("click", function (event) {
      event.preventDefault();
      showNextFieldset();
    });
  }

  // Event listener voor de previous button
  if (prevButton) {
    prevButton.addEventListener("click", function (event) {
      event.preventDefault();
      showPreviousFieldset();
    });
  }

  // Event listener voor de result button
  if (resultButton) {
    resultButton.addEventListener("click", function (event) {
      event.preventDefault();
      // Show  de answers section
      answersSection.style.display = "block";
      // verberg next en previous buttons
      nextButton.style.display = "none";
      prevButton.style.display = "block";
      // verberg result button
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
      taalSelect2.appendChild(option);
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
      genreSelect2.appendChild(option);
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
      // Verbergen als de zoekterm leeg is
      gameItem.style.display = "none"; 
    });
  } else {
    gameItems.forEach((gameItem) => {
      let gameTitle = gameItem.querySelector("h3").innerText.toLowerCase();
      if (gameTitle.includes(searchTerm)) {
        // Weergeven als de titel overeenkomt met de zoekterm
        gameItem.style.display = "block"; 
      } else {
        // Verbergen als de titel niet overeenkomt met de zoekterm
        gameItem.style.display = "none"; 
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // Verberg de dropdowns van #answers
  const taalSelectAnswer = document.querySelector("#answers .taalSelect");
  const genreSelectAnswer = document.querySelector("#answers .genreselect");
  const platformSelectAnswer = document.querySelector("#answers .platformSelect");
  const searchbarAnswer = document.querySelector("#answers #searchbar");
  const searchIcon = document.querySelector("#answers svg"); // Selecteer de zoek-icoon SVG
  taalSelectAnswer.style.display = "none";
  genreSelectAnswer.style.display = "none";
  platformSelectAnswer.style.display = "none";
  searchbarAnswer.style.display = "none";
  searchIcon.style.display = "none"; 

  // Array om de antwoorden bij te houden
  const answers = ["", "", "", ""];

  // Functie om het antwoord bij te werken en weer te geven in de h3
  function updateAnswer(index, newAnswer) {
    const questionArticle = document.querySelector(`#answers article:nth-of-type(${index + 1})`);
    const answerContainer = questionArticle.querySelector("h3");
    if (answerContainer) {
      // Toon het nieuwe antwoord in de h3
      answerContainer.textContent = newAnswer; 
    } else {
      const newAnswerContainer = document.createElement("h3");
      newAnswerContainer.textContent = newAnswer;
      questionArticle.appendChild(newAnswerContainer);
    }
    // Bijwerken van het antwoord in de array
    answers[index] = newAnswer;
  }

  // Event listener voor het klikken op de Edit knoppen in #answers
  const editButtons = document.querySelectorAll("#answers button");
  editButtons.forEach((button, index) => {
    button.addEventListener("click", function(event) {
      // Voorkom standaardgedrag van knop (scrollen naar boven)
      event.preventDefault(); 

      // Toon het juiste antwoordveld van #answers op basis van de vraagindex
      if (index === 0) {
        taalSelectAnswer.style.display = "block";
        genreSelectAnswer.style.display = "none";
        platformSelectAnswer.style.display = "none";
        searchbarAnswer.style.display = "none";
        searchIcon.style.display = "none"; 
      } else if (index === 1) {
        platformSelectAnswer.style.display = "block";
        taalSelectAnswer.style.display = "none";
        genreSelectAnswer.style.display = "none";
        searchbarAnswer.style.display = "none";
        searchIcon.style.display = "none"; 
      } else if (index === 2) {
        genreSelectAnswer.style.display = "block";
        taalSelectAnswer.style.display = "none";
        platformSelectAnswer.style.display = "none";
        searchbarAnswer.style.display = "none";
        searchIcon.style.display = "none"; 
      } else if (index === 3) {
        searchbarAnswer.style.display = "block";
        taalSelectAnswer.style.display = "none";
        platformSelectAnswer.style.display = "none";
        genreSelectAnswer.style.display = "none";
        searchIcon.style.display = "block"; 
      }

      // Verberg de "Edit" knoppen in #answers
      editButtons.forEach(button => {
        button.style.display = "none";
      });
    });
  });

  // Event listener voor het wijzigen van de dropdowns in #answers
  taalSelectAnswer.addEventListener("change", function() {
    const newAnswer = taalSelectAnswer.value;
    updateAnswer(0, newAnswer); // Update het antwoord in de h3
    taalSelectAnswer.style.display = "none";
    // Toon de "Edit" knoppen in #answers
    editButtons.forEach(button => {
      button.style.display = "block";
    });
  });

  platformSelectAnswer.addEventListener("change", function() {
    const newAnswer = platformSelectAnswer.value;
    // Update het antwoord in de h3
    updateAnswer(1, newAnswer); 
    platformSelectAnswer.style.display = "none";
    // Toon de "Edit" knoppen in #answers
    editButtons.forEach(button => {
      button.style.display = "block";
    });
  });

  genreSelectAnswer.addEventListener("change", function() {
    const newAnswer = genreSelectAnswer.value;
    // Update het antwoord in de h3
    updateAnswer(2, newAnswer); 
    genreSelectAnswer.style.display = "none";
    // Toon de "Edit" knoppen in #answers
    editButtons.forEach(button => {
      button.style.display = "block";
    });
  });

  searchbarAnswer.addEventListener("change", function() {
    const newAnswer = searchbarAnswer.value;
    // Update het antwoord in de h3
    updateAnswer(3, newAnswer); 
    searchbarAnswer.style.display = "none";
    // Verberg de zoek-icoon SVG
    searchIcon.style.display = "none";
    // Toon de "Edit" knoppen in #answers
    editButtons.forEach(button => {
      button.style.display = "block";
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Array om de antwoorden bij te houden
  const answers = ["", "", "", ""];

  // Functie om het antwoord bij te werken en weer te geven
  function updateAnswer(index, newAnswer) {
    // Zoek het juiste artikel binnen #answers
    const questionArticle = document.querySelector(`#answers article:nth-of-type(${index + 1})`);
    // Zoek de h3-container binnen het artikel
    let answerContainer = questionArticle.querySelector("h3");
    // Als de container niet bestaat, maak er dan een aan
    if (!answerContainer) {
      answerContainer = document.createElement("h3");
      questionArticle.appendChild(answerContainer);
    }
    // Update de inhoud van de h3-container met het nieuwe antwoord
    // Zet het antwoord in de h3
    answerContainer.textContent = newAnswer ? newAnswer : ""; 
    // Bijwerken van het antwoord in de array
    answers[index] = newAnswer;
  }

  // Event listener voor het klikken op een button in #platform
  const platformButtons = document.querySelectorAll("#platform input[type='button']");
  platformButtons.forEach((button, index) => {
    button.addEventListener("click", function() {
      const newAnswer = button.value;
      // Stel hier het juiste vraagnummer in
      updateAnswer(1, newAnswer); 
    });
  });

  // Event listener voor het invullen van antwoorden in de #language, #platform, #genre, en #favoGame velden
  const answerFieldsets = document.querySelectorAll("#language, #platform, #genre, #favoGame");
  answerFieldsets.forEach(answerFieldset => {
    const answerElement = answerFieldset.querySelector("select, input");
    if (!answerElement) {
      console.error(`Element not found in: ${answerFieldset.id}`);
      return;
    }
    answerElement.addEventListener("input", function() {
      const newAnswer = answerElement.value;
      // Bepaal de index van het antwoordveld en werk het antwoord bij
      const index = Array.from(answerFieldsets).indexOf(answerFieldset);
      updateAnswer(index, newAnswer);
    });
  });
});
  