const mongoose = require('mongoose')
const moment = require('moment');

const dailyTaskModel = new mongoose.Schema({
    taskTitle: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        default: "",
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    taskReminder: {
        type: Date,
        required: true,
        set: (v) => moment(v, 'YYYY-MM-DD hh:mm A').toDate() //* Format of date: YYYY-MM-DD hh:mm A.
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

dailyTaskModel.set('timestamps', true)

module.exports = mongoose.model('dailyTask', dailyTaskModel)
