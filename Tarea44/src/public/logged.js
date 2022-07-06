const socket = io()

console.log("logged js")
const welcome = document.getElementById('welcome')


let user

socket.on('user', data => {
    console.log(data)
    user = data
    welcome.innerHTML = `<h3> Username: ${user.username} </h3>
    <p class='my-3'> Your password is <strong>${user.password}</strong>  </p>`
})