//import mongoose

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    phone: {
        type: Number,
    },
    department: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    dateOfBirth: {
        type: Date
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companies',
        required: true
    }

})

// create model
const users = mongoose.model("users", userSchema)

// export model
module.exports = users