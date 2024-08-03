const mongoose = require('mongoose')

const subjectGradeModel = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true
    },
    subjectGrade: {
        type: Number,
        required: true
    },
    maxMarks: {
        type: Number,
        required: true
    },
    examName: {
        type: String,
        required: true
    },
    percentage: {
        type: Number,
        default: 0,
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

subjectGradeModel.set('timestamps', true)

module.exports = mongoose.model('subjectGrade', subjectGradeModel)
