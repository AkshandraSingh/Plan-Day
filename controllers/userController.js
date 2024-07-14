const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userModel = require('../models/userModel')
const emailService = require('../services/emailService')

module.exports = {

    //? Register User API
    registerUser: async (req, res) => {
        try {
            const userData = new userModel(req.body)
            const isUserExist = await userModel.findOne({ //* Check is user exist in database.
                userEmail: userData.userEmail,
            })
            if (isUserExist) {
                return res.status(400).send({
                    success: false,
                    message: 'User already exist',
                })
            }
            const bcryptPassword = await bcrypt.hash(userData.userPassword, 10) //* Bcrypt user password.
            userData.userPassword = bcryptPassword
            userData.usedPasswords.push(bcryptPassword) //* Push user password to usedPasswords array.
            await userData.save()
            return res.status(202).send({
                success: true,
                message: "User Resisted Successfully",
                userData: userData,
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: 'Server Error',
                error: error.message,
            })
        }
    },

    //? Login User API
    loginUser: async (req, res) => {
        try {
            const userData = req.body
            const isUserExist = await userModel.findOne({ //* Check is user exist in database.
                userEmail: userData.userEmail,
            })
            if (!isUserExist) {
                return res.status(404).send({
                    success: false,
                    message: 'User not found',
                })
            }
            const isPasswordValid = await bcrypt.compare(userData.userPassword, isUserExist.userPassword) //* Check is user password is correct.
            if (!isPasswordValid) {
                return res.status(401).send({
                    success: false,
                    message: 'Invalid Password',
                })
            }
            const token = jwt.sign({ isUserExist }, process.env.SECRET_KEY, { expiresIn: '1h' }); //* Generate the token.
            return res.status(200).send({
                success: true,
                message: 'User Logged In Successfully',
                token: token,
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: 'Server Error',
                error: error.message,
            })
        }
    },

    //? Forget Password API
    forgetPassword: async (req, res) => {
        try {
            const { userEmail } = req.body
            const isUserExist = await userModel.findOne({ //* Check is user exist in database.
                userEmail: userEmail,
            })
            if (!isUserExist) {
                return res.status(404).send({
                    success: false,
                    message: 'User not found',
                })
            }
            const resetToken = jwt.sign({ isUserExist }, process.env.SECRET_KEY, { expiresIn: '10m' }); //* Generate the reset token.
            await emailService.sendMail(userEmail, "forgetPassword")
            return res.status(200).send({
                success: true,
                message: 'Email Has Been Sended Successfully!',
                accessToken: resetToken,
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: 'Server Error',
                error: error.message,
            })
        }
    },
}
