const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userModel = require('../models/userModel')

module.exports = {
    registerUser: async (req, res) => {
        try {
            const userData = new userModel(req.body)
            const isUserExist = await userModel.findOne({
                userEmail: userData.userEmail,
            })
            if (isUserExist) {
                return res.status(400).send({
                    success: false,
                    message: 'User already exist',
                })
            }
            const bcryptPassword = await bcrypt.hash(userData.userPassword, 10)
            userData.userPassword = bcryptPassword
            userData.usedPasswords.push(bcryptPassword)
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

    loginUser: async (req, res) => {
        try {
            const userData = req.body
            const isUserExist = await userModel.findOne({
                userEmail: userData.userEmail,
            })
            if (!isUserExist) {
                return res.status(404).send({
                    success: false,
                    message: 'User not found',
                })
            }
            const isPasswordValid = await bcrypt.compare(userData.userPassword, isUserExist.userPassword)
            if (!isPasswordValid) {
                return res.status(401).send({
                    success: false,
                    message: 'Invalid Password',
                })
            }
            const token = jwt.sign({ isUserExist }, process.env.SECRET_KEY, { expiresIn: '1h' });
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
    }
}
