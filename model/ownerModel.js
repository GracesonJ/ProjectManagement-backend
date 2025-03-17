//import mongoose

const mongoose = require('mongoose')

const ownerSchema = new mongoose.Schema({
    companyName: {
        required : true,
        type: String
    },
    workspaceName: {
        required: true,
        type: String,
        
    },
    workspaceDescription: {
        type: String,
        required: true,
    },
    industryType:{
        type: String,
        required: true
    },
    ownerName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role : {
        type : String,
        required: true,
        default : "owner"
    },
    profileImage:{
        type:String
    },
    dateOfBirth:{
        type : Date
    },
    phone:{
        type : Number,
        required : true
    }
})

// create model
const owners = mongoose.model("owners", ownerSchema)

// export model
module.exports = owners