const express = require('express')

const userController = require('../controllers/userController')
const userValidator = require('../validations/userValidations/userValidator')

const userRoute = express.Router()

userRoute.post('/registerUser', userValidator.registerUserValidation, userController.registerUser)
userRoute.post('/loginUser', userValidator.userLoginValidation, userController.loginUser)
userRoute.post('/forgetPassword', userController.forgetPassword)
userRoute.post('/resetPassword/:userId/:accessToken', userValidator.resetPasswordValidation, userController.resetPassword)
userRoute.post('/setNewPassword/:userId', userValidator.setNewPasswordValidation, userController.setNewPassword)

module.exports = userRoute
