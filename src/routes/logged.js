import express from "express";
import {__dirname} from "../app.js"
import session from "express-session"
import cookieParser from "cookie-parser"
import MongoStore from "connect-mongo"

const router = express.Router()

router.use(cookieParser())
router.use(session({
    saveUninitialized:false,
    resave:false,
    secret:"12345",
    store: MongoStore.create({
        mongoUrl:process.env.CONNECT_MONGO_URL,
        ttl:10
    }),
    cookie: { 
        maxAge : 10000
    }
}))

router.get('/', (req, res) => {
    const {user} = req.session
    console.log(user)
    if(user === undefined) {
        res.redirect('/login')
    } else {
        res.sendFile('/public/logged.html', { root: __dirname })
    }
})

export default router