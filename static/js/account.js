const closeButton = document.querySelector('.closeButton')
const textArea = document.querySelector('#account main #addStatus fieldset textarea')
const characterCount = document.querySelector('#account main #addStatus fieldset p')
const addStatus = document.querySelector('#account main #addStatus')
const addStatusButton = document.querySelector('#account main section:nth-of-type(2) article:first-of-type button')
console.log(addStatusButton)
console.log(addStatus)

const characterCountCheck = () => {
    setInterval(() => {
        textArea.addEventListener('input', () => {
            const length = textArea.value.length
            const remaining = 100 - length
            characterCount.innerText = `${remaining}/100`
        })
    }, 100)
}

characterCountCheck()

addStatusButton.addEventListener('click', () => {
    addStatus.style.bottom = 0
}) 

closeButton.addEventListener('click', () => {
    addStatus.style.bottom = '-100%'
})