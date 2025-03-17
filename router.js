// import express
const express = require('express')
const ownerRegController = require('./controller/ownerRegController')
const userController = require('./controller/userController')

// instance router
const router = new express.Router()

// reg owner
router.post('/register-owner', ownerRegController.ownerRegister )

// reg user
router.post('/user-register', userController.userRegister)


module.exports = router