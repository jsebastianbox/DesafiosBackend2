import mongoose from "mongoose"

mongoose.connect('mongodb://127.0.0.1:27017/usersPortfolio', {useNewUrlParser:true,useUnifiedTopology:true} )

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const userModel = mongoose.model('user', userSchema)

export default userModel