const mongoose = require('mongoose')

const schoolWorkHistoryModel = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true
    },
    workName: {
        type: String,
        required: true
    },
    workDescription: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
})

schoolWorkHistoryModel.set('timestamps', true)

module.exports = mongoose.model('schoolWorkHistory', schoolWorkHistoryModel)
