import express from "express"
import loginRouter from "./routes/login.js"
import loggedRouter from "./routes/logged.js"
import logoutRouter from "./routes/logout.js"
import signupRouter from "./routes/signup.js"
import passport from "passport"
import { Server } from "socket.io"
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import './middlewares/passport.js'
import './middlewares/session.js'
import parsedArgs from "minimist"

const app = express()
const argumentos = parsedArgs(process.argv.slice(2))
const PORT = parseInt(argumentos.PORT) || 8080
const server = app.listen(PORT, () => console.log(`Escuchando en puerto ${PORT}`))
/* MIDDLEWARES AND SESSION */
export const __dirname = dirname(fileURLToPath(import.meta.url));
export const io = new Server(server)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))
/* PASSPORT CONFIG */
app.use(passport.initialize())
//app.use(passport.session())

app.use('/login', loginRouter )
app.use('/logged', loggedRouter )
app.use('/logout', logoutRouter)
app.use('/signup', signupRouter)
console.log(process);

app.get('/info', (req, res) => {
    res.json({
        path:process.execPath,
        nodeVersion:process.version,
        platform:process.platform,
        memoria:process.memoryUsage().rss,
        processId:process.pid,
        title:process.title,
        random:process.uptime()
    })
})
