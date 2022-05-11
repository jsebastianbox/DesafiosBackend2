import express from "express"
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
    req.session.destroy( err => {
        if(err) return res.send({message:error, status: 'error'})
        res.redirect('/')
    } )
})

export default router