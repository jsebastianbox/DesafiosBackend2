const signupForm = document.getElementById('signupForm')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const errors = document.getElementById('errors')


signupForm.addEventListener('submit', (e) => {
    let messages = []
    if (username.value == '' || username.value.length < 4) {
        messages.push('Username require more than 4 characters')
    }
    if (email.value == '' || email.value.length < 4) {
        messages.push('Email require more than 4 characters')
    }
    if (password.value == '' || password.value.length < 4) {
        messages.push('Password require more than 4 characters')
    }
    if(messages.length > 0) {
        e.preventDefault()
        errors.innerText = messages.join(', ')
    }
})