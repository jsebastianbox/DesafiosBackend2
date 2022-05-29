import passport from "passport"
import userModel from "../configs/MongoDB/UserSchema.js"
import bcrypt from 'bcrypt'
import { Strategy as LocalStrategy } from "passport-local"

passport.serializeUser((user, done) => {
    return done(null, user)
})
passport.deserializeUser((user, done) => {
    /* userModel.findById(id,(err, user) => {
        return done(err, user)
    }) */
    return done(null, user)
})

const createHash = (password) => {
    return bcrypt.hashSync(
        password,
        bcrypt.genSaltSync(10)
    )
}
/* SIGNUP */
passport.use('signup', new LocalStrategy(
    {
        passReqToCallback:true //habilita el uso de req
    },
    (req, username, password, done) => {
        //busco si el usuario existe
        userModel.findOne({username}, (err, user)=>{
            if(err) return done(err)
            if(user) return done(null, false, {message:'user already exists'})
            const newUser = {
                email:req.body.email,
                username:username,
                password:createHash(password),
            }
            userModel.create(newUser,(err, userCreated)=> {
                if(err) return done(err)
                return done(null, userCreated)
            })   
        })
    }
))
/* LOGIN */
passport.use('login', new LocalStrategy(
    async (username, password, done) => {
        //busco si el usuario existe
        try {
            const [userFound] = await userModel.find({username})
            const [passFound] = await userModel.find({password})
            if(!bcrypt.compare(password, userFound.password)) return done(null, false, {error:'error en contraseña'})
            if(userFound && passFound) {
                done(null, userFound)
            } else {
                done(null, false, {message:'no llegó'})
            }
        } catch (error) {
            done(error);
        }
    }
))