//import mongoose

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        required : true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required : true,
        type: String
    },
    phone:{
        type: Number,
    },
    department:{
        type: String,
        required: true,
    },
    designation:{
        type: String,
        required: true
    },
    role : {
        type : String,
        required: true,
        default : "Employee"
    },
    profileImage:{
        type:String
    },
    dateOfBirth:{
        type : Date
    }
})

// create model
const users = mongoose.model("users", userSchema)

// export model
module.exports = users