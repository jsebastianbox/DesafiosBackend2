import express from "express"
import loginRouter from "./routes/login.js"
import loggedRouter from "./routes/logged.js"
import logoutRouter from "./routes/logout.js"
import { Server } from "socket.io"
import { dirname } from 'path'
import { fileURLToPath } from 'url'



const app = express()
const server = app.listen(8080, () => console.log('Escuchando en puerto 8080'))
/* MIDDLEWARES AND SESSION */
export const __dirname = dirname(fileURLToPath(import.meta.url));
export const io = new Server(server)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))


app.use('/login', loginRouter )
app.use('/logged', loggedRouter )
app.use('/logout', logoutRouter)
