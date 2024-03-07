const filterMenu = document.querySelector(".filterMenu");
const filterButton = document.querySelector(
  "main section:first-of-type .flexdiv button"
);


const closeButtonFilter = document.querySelector(".cross");

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

