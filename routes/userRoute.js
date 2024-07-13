const express = require('express')

const userController = require('../controllers/userController')

const userRoute = express.Router()

userRoute.post('/registerUser', userController.registerUser)

module.exports = userRoute
