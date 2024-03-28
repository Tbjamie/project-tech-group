const filterMenu = document.querySelector(".filterMenu");
const filterButton = document.querySelector(
  "main section:first-of-type .flexdiv button"
);

const genreSelect = document.querySelector(".genreselect");

const taalSelect = document.querySelector(".taalSelect");
const closeButtonFilter = document.querySelector(".cross");
const dropDown = document.querySelector(".select-dropdown");
const matchSection = document.querySelector("section:nth-of-type(4)");
const matchSection2 = document.querySelector("section:nth-of-type(3)");
const gameSection = document.querySelector("section:nth-of-type(2)");
const eersteSection = document.querySelector("section:nth-of-type(2)");
const button = document.querySelector('button');
const svgIcon = document.querySelector('.cross');
const peStatus = document.querySelector('section:nth-of-type(2) p');
const peAnswer = document.querySelector('.answers p');




// Verberg de SVG bij het laden van de pagina
svgIcon.style.display = 'none';


fetch("/static/json/taal.json")
.then((response) => {
  if (!response.ok) {
    console.log("ERROR");
  }

  return response.json();
})
.then((data) => {
  const taal = data.taal;
  taal.forEach((land) => {
    let nationality = land.nationality
    console.log(nationality)
    let dropDownOptions = document.createElement('option')
    dropDownOptions.innerText = nationality
    // let gameItem = document.createElement("option");
    taalSelect.append(dropDownOptions);// Functie om de tekst van de geselecteerde optie op de knop te zetten

    // Voeg een tekst toe aan het genreStatus element om aan te geven dat er nog geen genre is geselecteerd//
    peStatus.innerText = 'Choose a language';
    document.querySelector('article').appendChild(peStatus);

// Functie om de tekst van de geselecteerde optie op de knop te zetten
function updateButtonText() {
  button.innerText = taalSelect.value; // Zet de tekst van de geselecteerde optie op de knop
  svgIcon.style.display = 'block'; // Maak de SVG zichtbaar wanneer een genre is geselecteerd
  // peStatus.innerText = `Your language is: ${taalSelect.value}`; // Update de tekst van het genreStatus element
  peStatus.innerText = `Your language is:`; // Update de tekst van het genreStatus element
}

// Functie om de tekst op de knop te resetten en de SVG te verbergen
function resetButtonTextAndHideSVG() {
  button.innerText = ''; // Reset de tekst op de knop naar een lege string
  svgIcon.style.display = 'none'; // Verberg de SVG
  peStatus.innerText = 'Choose a language'; // Reset de tekst van het genreStatus element
}

// Voeg een event listener toe aan het genreSelect-select-element om wijzigingen te detecteren
taalSelect.addEventListener('change', updateButtonText);

// Voeg event listeners toe aan zowel de knop als de SVG om de tekst te resetten en de SVG te verbergen
button.addEventListener('click', resetButtonTextAndHideSVG);
svgIcon.addEventListener('click', resetButtonTextAndHideSVG);
  });
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
    let genre = game.genre
    console.log(genre)
    let dropDownOptions = document.createElement('option')
    dropDownOptions.innerText = genre
    // let gameItem = document.createElement("option");
   
    genreSelect.append(dropDownOptions);

    // Voeg een tekst toe aan het genreStatus element om aan te geven dat er nog geen genre is geselecteerd//
    peStatus.innerText = 'Choose a genre';
    document.querySelector('article').appendChild(peStatus);

// Functie om de tekst van de geselecteerde optie op de knop te zetten
function updateButtonText() {
  button.innerText = genreSelect.value; // Zet de tekst van de geselecteerde optie op de knop
  svgIcon.style.display = 'block'; // Maak de SVG zichtbaar wanneer een genre is geselecteerd
  // peStatus.innerText = `Your genre is: ${genreSelect.value}`; // Update de tekst van het genreStatus element
  peStatus.innerText = `Your genre is:`; // Update de tekst van het genreStatus element
}

// Functie om de tekst op de knop te resetten en de SVG te verbergen
function resetButtonTextAndHideSVG() {
  button.innerText = ''; // Reset de tekst op de knop naar een lege string
  svgIcon.style.display = 'none'; // Verberg de SVG
  peStatus.innerText = 'Choose a genre'; // Reset de tekst van het genreStatus element
}

// Voeg een event listener toe aan het genreSelect-select-element om wijzigingen te detecteren
genreSelect.addEventListener('change', updateButtonText);

// Voeg event listeners toe aan zowel de knop als de SVG om de tekst te resetten en de SVG te verbergen
button.addEventListener('click', resetButtonTextAndHideSVG);
svgIcon.addEventListener('click', resetButtonTextAndHideSVG);
  });
});
