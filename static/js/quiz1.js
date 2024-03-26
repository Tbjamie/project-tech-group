const filterMenu = document.querySelector(".filterMenu");
const filterButton = document.querySelector(
  "main section:first-of-type .flexdiv button"
);

// const pElement = document.querySelector("p")

const genreSelect = document.querySelector(".genreSelect");

const taalSelect = document.querySelector(".taalSelect");
const closeButtonFilter = document.querySelector(".cross");
const dropDown = document.querySelector(".select-dropdown");
const matchSection = document.querySelector("section:nth-of-type(4)");
const matchSection2 = document.querySelector("section:nth-of-type(3)");


function rangeSlide(value) {
    document.getElementById('rangeValue').innerHTML = value;
}


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
    taalSelect.append(dropDownOptions);
  });
});