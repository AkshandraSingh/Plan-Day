const express = require('express')

const userController = require('../controllers/userController')

const userRoute = express.Router()

userRoute.post('/registerUser', userController.registerUser)
userRoute.post('/loginUser', userController.loginUser)
userRoute.post('/forgetPassword', userController.forgetPassword)

module.exports = userRoute
