const tutorial = document.querySelector('#tutorial')
const tutorialArticle = document.querySelector('#tutorial article')
const homeBody = document.querySelector('#home')
const nextButton = document.querySelector('#tutorial article button')
const startButton = document.querySelector('#tutorial article input')
const headerText = document.querySelector('#tutorial article h2')
const regularText = document.querySelector('#tutorial article p')

console.log(homeBody)

let tutorialState = true
let tutorialSlide = 1

if (tutorialState == true) {
    // setTimeout(5000, () => {
    //   homeBody.style.overflowY = 'hidden !important'
    // })
    tutorialState = false
} else {
    tutorialState = true
}

nextButton.addEventListener('click', () => {
    if (tutorialSlide == 1) {
        console.log("DIT IS SLIDE 1")
        tutorialSlide = 2
        headerText.innerHTML = `Find players, <span>with the same interest as you</span>`
        regularText.innerHTML = `Find players with the same interest as you`
    } else if (tutorialSlide == 2) {
        console.log("DIT IS SLIDE 2")
        tutorialSlide = 3
        nextButton.style.display = 'none'
        startButton.style.display = 'block'
        headerText.innerHTML = `Start your Journey, <span>Right here, right now</span>`
        regularText.innerHTML = `Discover all the features of this app to find your favorite game or to find a gamebuddy to play with!`
    } else if (tutorialSlide == 3) {
        console.log("DIT IS SLIDE 3")
        tutorial.style.backgroundColor = 'transparent'
        tutorialArticle.style.transform = 'translateY(100rem)'
        setTimeout(() => {
            tutorial.style.display = 'none'
        }, 1000)
    }
})