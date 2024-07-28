const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userModel = require('../models/userModel')
const emailService = require('../services/emailService')
const usersLogger = require('../utils/usersLogger/usersLogger')

module.exports = {

    //? Register User API
    registerUser: async (req, res) => {
        try {
            const userData = new userModel(req.body)
            const isUserExist = await userModel.findOne({ //* Check is user exist in database.
                userEmail: userData.userEmail,
            })
            if (isUserExist) {
                usersLogger.error("User already exist (API: Register User)")
                return res.status(400).send({
                    success: false,
                    message: 'User already exist',
                })
            }
            const bcryptPassword = await bcrypt.hash(userData.userPassword, 10) //* Bcrypt user password.
            userData.userPassword = bcryptPassword
            userData.usedPasswords.push(bcryptPassword) //* Push user password to usedPasswords array.
            await userData.save()
            usersLogger.info("User registered successfully (API: Register User)")
            return res.status(202).send({
                success: true,
                message: "User Resisted Successfully",
                userData: userData,
            })
        } catch (error) {
            usersLogger.error(`API: Register User`)
            usersLogger.error(`Server Error: ${error.message}`)
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
                usersLogger.error("User not found (API: Login User)")
                return res.status(404).send({
                    success: false,
                    message: 'User not found',
                })
            }
            const isPasswordValid = await bcrypt.compare(userData.userPassword, isUserExist.userPassword) //* Check is user password is correct.
            if (!isPasswordValid) {
                usersLogger.error("Invalid Password (API: Login User)")
                return res.status(401).send({
                    success: false,
                    message: 'Invalid Password',
                })
            }
            const token = jwt.sign({ isUserExist }, process.env.SECRET_KEY, { expiresIn: '1h' }); //* Generate the token.
            usersLogger.info("User Logged In Successfully")
            return res.status(200).send({
                success: true,
                message: 'User Logged In Successfully',
                token: token,
            })
        } catch (error) {
            usersLogger.error("API: Login User")
            usersLogger.error(`Server Error: ${error.message}`)
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
                usersLogger.error("User not found (API: Forget Password)")
                return res.status(404).send({
                    success: false,
                    message: 'User not found',
                })
            }
            const resetToken = jwt.sign({ isUserExist }, process.env.SECRET_KEY, { expiresIn: '10m' }); //* Generate the reset token.
            await emailService.forgetPassword(userEmail) //* Sending Email to user using nodemailer.
            usersLogger.info("Email Has Been Sended Successfully (API: Forget Password)")
            return res.status(200).send({
                success: true,
                message: 'Email Has Been Sended Successfully!',
                accessToken: resetToken,
            })
        } catch (error) {
            usersLogger.error("API: Forget Password")
            usersLogger.error(`Server Error: ${error.message}`)
            res.status(500).send({
                success: false,
                message: 'Server Error',
                error: error.message,
            })
        }
    },

    //? Reset Password API
    resetPassword: async (req, res) => {
        let isPasswordExist = false
        try {
            const { accessToken, userId } = req.params
            const { newPassword, confirmPassword } = req.body
            const isTokenCorrect = jwt.verify(accessToken, process.env.SECRET_KEY); //* Verify the token.
            if (isTokenCorrect) {
                if (newPassword === confirmPassword) { //* Check is New Password and Confirm Password Match.
                    const userData = await userModel.findById(userId)
                    for (const oldPassword of userData.usedPasswords) { //* Check is user already use the password before.
                        if (await bcrypt.compare(newPassword, oldPassword)) {
                            isPasswordExist = true;
                            break;
                        }
                    }
                    if (isPasswordExist) {
                        usersLogger.error('API: Reset Password')
                        usersLogger.error("Don't use old passwords, try another password")
                        return res.status(401).json({
                            success: false,
                            message: "Don't use old passwords, try another password",
                        });
                    }
                    const bcryptPassword = await bcrypt.hash(newPassword, 10) //* Hash the new password.
                    userData.userPassword = bcryptPassword
                    userData.usedPasswords.push(bcryptPassword) //* Push new password in array.
                    await userData.save();
                    usersLogger.info("Password Reset Successfully")
                    res.status(201).json({
                        success: true,
                        message: "Password Updated",
                    });
                } else {
                    usersLogger.error('API: Reset Password')
                    usersLogger.error("New password and confirm password do not match")
                    res.status(401).send({
                        success: false,
                        message: "New password or confirm password is incorrect"
                    })
                }
            } else {
                usersLogger.error('API: Reset Password')
                usersLogger.error("Token is incorrect or expire")
                res.status(401).send({
                    success: false,
                    message: "Token is incorrect or expire"
                })
            }
        } catch (error) {
            usersLogger.error('API: Reset Password')
            usersLogger.error(`Server Error: ${error.message}`)
            res.status(500).send({
                success: false,
                message: 'Server Error',
                error: error.message,
            })
        }
    },

    //? Set New Password API
    setNewPassword: async (req, res) => {
        let isPasswordExist = false
        try {
            const { oldPassword, newPassword, confirmPassword } = req.body
            const { userId } = req.params
            const userData = await userModel.findById(userId)
            if (newPassword != confirmPassword) { //* Check is New Password and Confirm Password Match.
                usersLogger.error('API: Set New Password')
                usersLogger.error("New password and confirm password do not match")
                return res.status(401).json({
                    success: false,
                    message: "New password and confirm password do not match"
                });
            }
            const isPasswordCorrect = await bcrypt.compare(oldPassword, userData.userPassword) //* Check is Password is correct or not.
            if (!isPasswordCorrect) {
                usersLogger.error('API: Set New Password')
                usersLogger.error("Old Password is incorrect!")
                return res.status(401).json({
                    success: false,
                    message: "Old Password is incorrect!"
                });
            }
            for (const oldPassword of userData.usedPasswords) { //* Check is user already use the password before.
                if (await bcrypt.compare(newPassword, oldPassword)) {
                    isPasswordExist = true;
                    break;
                }
            }
            if (isPasswordExist) {
                usersLogger.error('API: Set New Password')
                usersLogger.error("Don't use old passwords, try another password")
                return res.status(401).json({
                    success: false,
                    message: "Don't use old passwords, try another password",
                });
            }
            const bcryptPassword = await bcrypt.hash(newPassword, 10) //* Bcrypt the new password.
            userData.userPassword = bcryptPassword
            userData.usedPasswords.push(bcryptPassword) //* Push new password in array.
            await userData.save()
            usersLogger.info("Password Reset Successfully")
            res.status(201).json({
                success: true,
                message: "Password Updated",
            });
        } catch (error) {
            usersLogger.error('API: Set New Password')
            usersLogger.error(`Server Error: ${error.message}`)
            res.status(500).send({
                success: false,
                message: 'Server Error',
                error: error.message,
            })
        }
    }
}
