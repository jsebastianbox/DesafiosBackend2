import express from "express"
import session from "express-session"
import cookieParser from "cookie-parser"
import MongoStore from "connect-mongo"
import dotenv from "dotenv"
dotenv.config()
const app = express()

app.use(cookieParser())
app.use(session({
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

