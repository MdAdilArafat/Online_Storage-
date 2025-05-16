
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minLength:[3,'username should be atleast 3 characters long'],
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true, 
        trim:true,
        minLength:[5,'email should be at least 5 characters long']
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:[5,'password should be atleast 5 characters long']

    }
})

userModel = mongoose.model('user',userSchema)

module.exports= userModel