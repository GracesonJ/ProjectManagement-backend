//import mongoose

const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
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
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    profileImage:{
        type:String
    },
    designation : {
        type : String,
        required: true,
        default : "Company"
    }
})

// create model
const companies = mongoose.model("companies", companySchema)

// export model
module.exports = companies