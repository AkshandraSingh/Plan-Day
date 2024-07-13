const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userPassword: {
        type: String,
        required: true
    },
    usedPasswords: {
        type: [String],
        default: [],
    },
    isActive: {
        type: Boolean,
        default: true
    },
})

userModel.set('timestamps', true)

module.exports = mongoose.model('user', userModel)
