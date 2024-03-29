const cancelButton = document.querySelector('#cancelButton')
const mainEl = document.querySelector('main')
const okButton = document.querySelector('#account .cancelChangeMessage div button:first-of-type')
const dontCancelButton = document.querySelector('#account .cancelChangeMessage div button:last-of-type')
const cancelMessage = document.querySelector('#account .cancelChangeMessage')

cancelButton.addEventListener('click', () => {
    cancelMessage.style.transform = 'translateY(0)'
})

okButton.addEventListener('click', () => {
    history.back()
})

dontCancelButton.addEventListener('click', () => {
    cancelMessage.style.transform = 'translateY(100rem)'
})