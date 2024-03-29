const mainElement = document.querySelector('main')
const loadingScreen = document.querySelector('#loadingScreen')

document.addEventListener('DOMContentLoaded', () => {
  loadingScreen.style.display = 'none'
  mainElement.style.overflowY = 'scroll'
})
