const submitButton = document.querySelector("#welcome main form fieldset input[type=submit]")
const usernameInput = document.querySelector("#welcome main form fieldset:first-of-type input")
const passwordInput = document.querySelector("#welcome main form fieldset:nth-of-type(2) input")
const emailFieldset = document.querySelector("#welcome main form fieldset:nth-of-type(3)")
const allInputs = document.querySelectorAll("#welcome main form fieldset input")

console.log(allInputs)

const loginValidation = () => {
    allInputs.forEach(input => {
        input.addEventListener("focusout", () => {
            if((usernameInput == "") && (passwordInput == "")) {
                console.log("ICBWIBCIWBLCHBW")
            } else if((!usernameInput == "") && (!passwordInput == "")) {
                console.log("NOOOOO")
            }
        })
    })
}

loginValidation()