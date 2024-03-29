const tutorial = document.querySelector('#tutorial')
const tutorialArticle = document.querySelector('#tutorial article')
const homeBody = document.querySelector('#home')
const nextButton = document.querySelector('#tutorial article button')

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
    } else if (tutorialSlide == 2) {
        console.log("DIT IS SLIDE 2")
        tutorialSlide = 3
    } else if (tutorialSlide == 3) {
        console.log("DIT IS SLIDE 3")
        tutorial.style.backgroundColor = 'transparent'
        tutorialArticle.style.transform = 'translateY(100rem)'
        setTimeout(() => {
            tutorial.style.display = 'none'
        }, 1000)
    }
})