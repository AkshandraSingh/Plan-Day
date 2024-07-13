const bcrypt = require('bcrypt')

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
}
