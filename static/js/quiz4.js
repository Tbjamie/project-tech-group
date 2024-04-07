const gameSection = document.querySelector("fieldset:nth-of-type(4) .gamesArticle");

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


// // Verberg de SVG bij het laden van de pagina
// svgIcon.style.display = 'none';


// fetch("/static/json/taal.json")
// .then((response) => {
//   if (!response.ok) {
//     console.log("ERROR");
//   }

//   return response.json();
// })
// .then((data) => {
//   const taal = data.taal;
//   taal.forEach((land) => {
//     let nationality = land.nationality
//     console.log(nationality)
//     let dropDownOptions = document.createElement('option')
//     dropDownOptions.innerText = nationality
//     // let gameItem = document.createElement("option");
//     taalSelect.append(dropDownOptions);// Functie om de tekst van de geselecteerde optie op de knop te zetten

//     // Voeg een tekst toe aan het genreStatus element om aan te geven dat er nog geen genre is geselecteerd//
//     peStatus.innerText = 'Choose a language';
//     document.querySelector('article').appendChild(peStatus);

// // Functie om de tekst van de geselecteerde optie op de knop te zetten
// function updateButtonText() {
//   button.innerText = taalSelect.value; // Zet de tekst van de geselecteerde optie op de knop
//   svgIcon.style.display = 'block'; // Maak de SVG zichtbaar wanneer een genre is geselecteerd
//   // peStatus.innerText = `Your language is: ${taalSelect.value}`; // Update de tekst van het genreStatus element
//   peStatus.innerText = `Your language is:`; // Update de tekst van het genreStatus element
// }

// // Functie om de tekst op de knop te resetten en de SVG te verbergen
// function resetButtonTextAndHideSVG() {
//   button.innerText = ''; // Reset de tekst op de knop naar een lege string
//   svgIcon.style.display = 'none'; // Verberg de SVG
//   peStatus.innerText = 'Choose a language'; // Reset de tekst van het genreStatus element
// }

// // Voeg een event listener toe aan het genreSelect-select-element om wijzigingen te detecteren
// taalSelect.addEventListener('change', updateButtonText);

// // Voeg event listeners toe aan zowel de knop als de SVG om de tekst te resetten en de SVG te verbergen
// button.addEventListener('click', resetButtonTextAndHideSVG);
// svgIcon.addEventListener('click', resetButtonTextAndHideSVG);
//   });
// });


// fetch("/static/json/games.json")
// .then((response) => {
//   if (!response.ok) {
//     console.log("ERROR");
//   }

//   return response.json();
// })
// .then((data) => {
//   const games = data.games;
//   games.forEach((game) => {
//     let genre = game.genre
//     console.log(genre)
//     let dropDownOptions = document.createElement('option')
//     dropDownOptions.innerText = genre
//     // let gameItem = document.createElement("option");
   
//     genreSelect.append(dropDownOptions);

//     // Voeg een tekst toe aan het genreStatus element om aan te geven dat er nog geen genre is geselecteerd//
//     peStatus.innerText = 'Choose a genre';
//     document.querySelector('article').appendChild(peStatus);

// // Functie om de tekst van de geselecteerde optie op de knop te zetten
// function updateButtonText() {
//   button.innerText = genreSelect.value; // Zet de tekst van de geselecteerde optie op de knop
//   svgIcon.style.display = 'block'; // Maak de SVG zichtbaar wanneer een genre is geselecteerd
//   // peStatus.innerText = `Your genre is: ${genreSelect.value}`; // Update de tekst van het genreStatus element
//   peStatus.innerText = `Your genre is:`; // Update de tekst van het genreStatus element
// }

// // Functie om de tekst op de knop te resetten en de SVG te verbergen
// function resetButtonTextAndHideSVG() {
//   button.innerText = ''; // Reset de tekst op de knop naar een lege string
//   svgIcon.style.display = 'none'; // Verberg de SVG
//   peStatus.innerText = 'Choose a genre'; // Reset de tekst van het genreStatus element
// }

// // Voeg een event listener toe aan het genreSelect-select-element om wijzigingen te detecteren
// genreSelect.addEventListener('change', updateButtonText);

// // Voeg event listeners toe aan zowel de knop als de SVG om de tekst te resetten en de SVG te verbergen
// button.addEventListener('click', resetButtonTextAndHideSVG);
// svgIcon.addEventListener('click', resetButtonTextAndHideSVG);
//   });
// });



// document.addEventListener("DOMContentLoaded", function() {
//   const editButtons = document.querySelectorAll("#answers button");

//   editButtons.forEach((button, index) => {
//     button.addEventListener("click", function(event) {
//       // Voorkom standaardgedrag van knop (scrollen naar boven)
//       event.preventDefault(); 

//       const answerFieldsets = document.querySelectorAll("#language, #platform, #genre, #favoGame");
//       const answerFieldset = answerFieldsets[index];

//       const answerElement = answerFieldset.querySelector("select, input");
//       const originalAnswer = answerElement.value;

//       const newAnswer = prompt(`Bewerk antwoord op vraag ${index + 1}:`, originalAnswer);

//       if (newAnswer !== null) { 
//         // Als de gebruiker op "OK" klikt in de prompt
//         answerElement.value = newAnswer;
//       }
//     });
//   });
// });



// document.addEventListener("DOMContentLoaded", function() {
//   // Event listener voor het invullen van antwoorden in #language
//   const languageSelect = document.querySelector("#language select");
//   languageSelect.addEventListener("change", function() {
//     const newAnswer = languageSelect.value;
//     const answersDropdown = document.querySelector("#answers .taalSelect");
//     const option = document.createElement("option");
//     option.text = newAnswer;
//     answersDropdown.add(option);
//   });

//   // Event listener voor het invullen van antwoorden in #genre
//   const genreSelect = document.querySelector("#genre select");
//   genreSelect.addEventListener("change", function() {
//     const newAnswer = genreSelect.value;
//     const answersDropdown = document.querySelector("#answers .genreselect");
//     const option = document.createElement("option");
//     option.text = newAnswer;
//     answersDropdown.add(option);
//   });
// });







// fetch("/static/json/games.json")
//   .then((response) => {
//     if (!response.ok) {
//       console.log("ERROR");
//     }

//     return response.json();
//   })
//   .then((data) => {
//     const games = data.games;
//     games.forEach((game) => {
//       let gameItem = document.createElement("article");
//       gameSection2.append(gameItem);
//       let gameLink = document.createElement("a");
//       let gameName = game.title;
//       let hrefValue = `games/${gameName}`;
//       gameLink.setAttribute("href", hrefValue);
//       gameItem.append(gameLink);
//       let gameTitle = document.createElement("h3");
//       gameTitle.innerText = game.title;
//       gameItem.append(gameTitle);
//       let gameLauncher = document.createElement("img");
//       gameLauncher.setAttribute("src", game.launcher);
//       gameItem.append(gameLauncher);

//       let gameImage = document.createElement("img");
//       gameImage.setAttribute("src", game.url);
//       gameItem.append(gameImage);

//       // De game-items verbergen
//       gameItem.style.display = "none";
//     });
//   });

// // Event listener toevoegen om te filteren op zoekterm
// let searchInput2 = document.getElementById("searchbar");
// searchInput2.addEventListener("input", function () {
//   let searchTerm = this.value.toLowerCase();
//   const gameItems = document.querySelectorAll(".gamesArticle article");

//   // Controleren of de zoekterm niet leeg is
//   if (searchTerm.trim() === "") {
//     gameItems.forEach((gameItem) => {
//       // Verbergen als de zoekterm leeg is
//       gameItem.style.display = "none"; 
//     });
//   } else {
//     gameItems.forEach((gameItem) => {
//       let gameTitle = gameItem.querySelector("h3").innerText.toLowerCase();
//       if (gameTitle.includes(searchTerm)) {
//         // Weergeven als de titel overeenkomt met de zoekterm
//         gameItem.style.display = "block"; 
//       } else {
//         // Verbergen als de titel niet overeenkomt met de zoekterm
//         gameItem.style.display = "none"; 
//       }
//     });
//   }
// });



// document.addEventListener("DOMContentLoaded", function() {
//   // Array om de antwoorden bij te houden
//   const answers = ["", "", "", ""];

  // // Functie om het antwoord bij te werken en weer te geven
  // function updateAnswer(index, newAnswer) {
  //   const questionArticle = document.querySelector(`#answers article:nth-of-type(${index + 1})`);
  //   const answerContainer = questionArticle.querySelector("h3");
  //   if (answerContainer) {
  //     // Verwijder "Antwoord: " uit de tekst
  //     answerContainer.textContent = newAnswer; 
  //   } else {
  //     // Verwijder "Antwoord: " uit de tekst
  //     const newAnswerContainer = document.createElement("h3");
  //     newAnswerContainer.textContent = newAnswer; 
  //     questionArticle.appendChild(newAnswerContainer);
  //   }
  //   // Bijwerken van het antwoord in de array
  //   answers[index] = newAnswer;
  // }

  // // Event listener voor het klikken op een button in #platform
  // const platformButtons = document.querySelectorAll("#platform input[type='button']");
  // platformButtons.forEach((button, index) => {
  //   button.addEventListener("click", function() {
  //     const newAnswer = button.value;
  //     updateAnswer(1, newAnswer); // Stel hier het juiste vraagnummer in
  //   });
  // });

  // // Event listener voor het invullen van antwoorden in de #language, #platform, #genre, en #favoGame velden
  // const answerFieldsets = document.querySelectorAll("#language, #platform, #genre, #favoGame");
  // answerFieldsets.forEach(answerFieldset => {
  //   const answerElement = answerFieldset.querySelector("select, input");
  //   if (!answerElement) {
  //     console.error(`Element not found in: ${answerFieldset.id}`);
  //     return;
  //   }
  //   answerElement.addEventListener("input", function() {
  //     const newAnswer = answerElement.value;
  //     const index = Array.from(answerFieldsets).indexOf(answerFieldset);
  //     const questionArticle = document.querySelector(`#answers article:nth-of-type(${index + 1})`);
  //     const answerContainer = questionArticle.querySelector("h3");
  //     if (answerContainer) {
  //       // Verwijder "Antwoord: " uit de tekst
  //       answerContainer.textContent = newAnswer; 
  //     } else {
  //        // Verwijder "Antwoord: " uit de tekst
  //       const newAnswerContainer = document.createElement("h3");
  //       newAnswerContainer.textContent = newAnswer;
  //       questionArticle.appendChild(newAnswerContainer);
  //     }
  //   });
  // });

//   // Event listener voor het klikken op de Edit knoppen
//   const editButtons = document.querySelectorAll("#answers button");
//   editButtons.forEach((button, index) => {
//     button.addEventListener("click", function(event) {
//       // Voorkom standaardgedrag van knop (scrollen naar boven)
//       event.preventDefault(); 

//       const answerFieldsets = document.querySelectorAll("#language, #platform, #genre, #favoGame");
//       const answerFieldset = answerFieldsets[index];

//       const answerElement = answerFieldset.querySelector("select, input");
//       if (!answerElement) {
//         console.error(`Element not found in: ${answerFieldset.id}`);
//         return;
//       }
//       const originalAnswer = answerElement.value;

//       // const newAnswer = prompt(`Bewerk antwoord op vraag ${index + 1}:`, originalAnswer);

//       if (newAnswer !== null) { 
//         // Als de gebruiker op "OK" klikt in de prompt
//         answerElement.value = newAnswer;
//         // Trigger de input event om het antwoord automatisch bij te werken
//         answerElement.dispatchEvent(new Event("input"));
//       }
//     });
//   });
// });


// document.addEventListener("DOMContentLoaded", function() {
//   // Event listener voor het invullen van antwoorden in #language
//   const languageSelect = document.querySelector("#language select");
//   languageSelect.addEventListener("change", function() {
//     const newAnswer = languageSelect.value;
//     const answersDropdown = document.querySelector("#answers .taalSelect");
//     const option = document.createElement("option");
//     option.innerText = newAnswer;
//     answersDropdown.appendChild(option);
//   });

//   // Event listener voor het invullen van antwoorden in #genre
//   const genreSelect = document.querySelector("#genre select");
//   genreSelect.addEventListener("change", function() {
//     const newAnswer = genreSelect.value;
//     const answersDropdown2 = document.querySelector("#answers .genreselect");
//     const option = document.createElement("option");
//     option.innerText = newAnswer;
//     answersDropdown2.appendChild(option);
//   });
// });



// // Event listener voor het invullen van antwoorden in de #language, #platform, #genre, en #favoGame velden
  // const answerFieldsets = document.querySelectorAll("#language, #platform, #genre, #favoGame");
  // answerFieldsets.forEach(answerFieldset => {
  //   const answerElement = answerFieldset.querySelector("select, input");
  //   if (!answerElement) {
  //     console.error(`Element not found in: ${answerFieldset.id}`);
  //     return;
  //   }
  //   answerElement.addEventListener("input", function() {
  //     const newAnswer = answerElement.value;
  //     const index = Array.from(answerFieldsets).indexOf(answerFieldset);
  //     const questionArticle = document.querySelector(`#answers article:nth-of-type(${index + 1})`);
  //     const answerContainer = questionArticle.querySelector("h3");
  //     if (answerContainer) {
  //       // Verwijder "Antwoord: " uit de tekst
  //       answerContainer.textContent = newAnswer; 
  //     } else {
  //        // Verwijder "Antwoord: " uit de tekst
  //       const newAnswerContainer = document.createElement("h3");
  //       newAnswerContainer.textContent = newAnswer;
  //       questionArticle.appendChild(newAnswerContainer);
  //     }
  //   });
  // });


  // document.addEventListener("DOMContentLoaded", function() {
  //   // Array om de antwoorden bij te houden
  //   const answers = ["", "", "", ""];
  
  //   // Functie om het antwoord bij te werken en weer te geven
  //   function updateAnswer(index, newAnswer) {
  //     const questionArticle = document.querySelector(`#answers article:nth-of-type(${index + 1})`);
  //     const answerContainer = questionArticle.querySelector("h3");
  //     if (answerContainer) {
  //       answerContainer.textContent = ` ${newAnswer}`;
  //     } else {
  //       const newAnswerContainer = document.createElement("h3");
  //       newAnswerContainer.textContent = `Antwoord: ${newAnswer}`;
  //       questionArticle.appendChild(newAnswerContainer);
  //     }
  //     // Bijwerken van het antwoord in de array
  //     answers[index] = newAnswer;
  //   }
  
  //   // Event listener voor het klikken op een button in #platform
  //   const platformButtons = document.querySelectorAll("#platform input[type='button']");
  //   platformButtons.forEach((button, index) => {
  //     button.addEventListener("click", function() {
  //       const newAnswer = button.value;
  //       updateAnswer(1, newAnswer); // Stel hier het juiste vraagnummer in
  //     });
  //   });
  // });


