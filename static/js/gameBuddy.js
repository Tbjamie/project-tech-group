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

filterButton.addEventListener("click", () => {
    let stateChecker = "inactive";
    if (stateChecker == "inactive") {
      stateChecker = "active";
      filterMenu.classList.add("activeFilter");
      document.body.style.overflowY = "hidden";
      // filterMenu.style.display = "flex";
    }
    // else {
    //   stateChecker = "inactive";
    //   filterMenu.classList.remove("activeFilter");
    // }
  });
  
  closeButtonFilter.addEventListener("click", () => {
    // filterMenu.style.display = "none";
    // setTimeout(1000, () => {
    filterMenu.classList.remove("activeFilter");
    document.body.style.overflowY = "scroll";
    //   });
    // });
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
  });
});

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

fetch("/static/json/user.json")
.then((response) => {
  if (!response.ok) {
    console.log("ERROR");
  }

  return response.json();
})
.then((data) => {
  let users = data.users;
  console.log(users)
  users.forEach((user) => {
    let userArticle  = document.createElement('article')
    let username = document.createElement('h3')
    username.innerText = user.username
    matchSection.append(userArticle)
    userArticle.append(username)

    let pElement = document.createElement('p')
    pElement.innerText = "match based on:"
    userArticle.append(pElement)

    let genre = document.createElement('p')
    genre.innerText = user.genre
    userArticle.append(genre)

    let nationality = document.createElement('p')
    nationality.innerText = user.nationality
    userArticle.append(nationality)
  });
});

fetch("/static/json/user.json")
.then((response) => {
  if (!response.ok) {
    console.log("ERROR");
  }

  return response.json();
})
.then((data) => {
  let users = data.users;
  console.log(users)
  users.forEach((user) => {
    let userArticle1  = document.createElement('article')
    let username = document.createElement('h3')
    username.innerText = user.username
    matchSection2.append(userArticle1)
    userArticle1.append(username)

    let pElement = document.createElement('p')
    pElement.innerText = "match based on:"
    userArticle1.append(pElement)

    let genre = document.createElement('p')
    genre.innerText = user.genre
    userArticle1.append(genre)

    let nationality = document.createElement('p')
    nationality.innerText = user.nationality
    userArticle1.append(nationality)
  });
});




