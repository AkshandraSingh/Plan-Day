const moment = require('moment');
const cron = require('node-cron');

const emailService = require('../services/emailService');
const dailyTaskModel = require('../models/dailyTaskModel');

cron.schedule('* * * * *', async () => {
    const now = moment();
    const tasks = await dailyTaskModel.find({
        taskReminder: { $lte: now.toDate() },
        isCompleted: false,
        isTaskRemind: false,
        isActive: true,
    }).populate('userId');

    tasks.forEach(async (task) => {
        const userEmail = task.userId.userEmail;
        const userName = task.userId.userName;
        const taskTitle = task.taskTitle;
        const taskDescription = task.taskDescription;

        await emailService.taskNotification(userEmail, userName, taskTitle, taskDescription);
        task.isTaskRemind = true
        await task.save();
        console.log('Task is Reminded Successfully')
    });
});

console.log('Task reminder job is running!');
