let searchInput = document.getElementById('searchbar');
let commentCount = document.querySelectorAll('#forum #postsSection article div p:first-of-type')

searchInput.addEventListener("input", function () {
  let searchTerm = this.value.toLowerCase();
  const forumItems = document.querySelectorAll("#postsSection article");

  // Controleren of de zoekterm niet leeg is
  forumItems.forEach((forumItem) => {
    let forumTitle = forumItem.querySelector("h2").innerText.toLowerCase();
    if (forumTitle.includes(searchTerm)) {
      forumItem.style.display = "block"; // Weergeven als de titel overeenkomt met de zoekterm
    } else {
      forumItem.style.display = "none"; // Verbergen als de titel niet overeenkomt met de zoekterm
    }
  });
});

const commentCountTextChange = () => {
    commentCount.forEach(comment => {
        if(comment.innerText == 1) {
            comment.innerText = `${comment.innerText} Comment`
        } else if(comment) {
            comment.innerText = `${comment.innerText} Comments`
        }
    })
}

commentCountTextChange()
