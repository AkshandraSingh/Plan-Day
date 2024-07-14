const mongoose = require('mongoose')

const pendingWorkModel = new mongoose.Schema({
    workName: {
        type: String,
        required: true
    },
    workDescription: {
        type: String,
        default: "",
    },
    workDueDate: {
        type: Date,
    },
    workCategory: {
        type: String, //? WORK CATEGORY: IMPORTANT AND NOT IMPORTANT.
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    IsActive: {
        type: Boolean,
        default: true
    }
})

pendingWorkModel.set('timestamps', true)

module.exports = mongoose.model('pendingWork', pendingWorkModel)
