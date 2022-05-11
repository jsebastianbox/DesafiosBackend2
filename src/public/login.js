console.log("login js")


/* LOGIN.HTML */

const registerForm = document.getElementById('registerForm')
const username = document.getElementById('username')
const password = document.getElementById('password')
/* const checkbox = document.getElementById('checkbox') */
const error = document.getElementById('error')
const cardBox = document.getElementById('cardBox')


registerForm.addEventListener('submit', (e) => {
    let messages = []
    if (username.value == '' || username.value == null) {
        messages.push('Name is required')
    }
    if (password.value == '' || password.length < 4) {
        messages.push('Password is required')
    }

    if (messages.length > 0) {
        e.preventDefault()
        error.innerText = messages.join(', ')
    }
    
})



/* LOGGED.HTML */



