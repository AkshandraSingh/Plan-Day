const express = require('express')


const dailyTaskController = require('../controllers/dailyTaskController')

const dailyTaskRouter = express.Router()

dailyTaskRouter.post('/createTask/:userId', dailyTaskController.createTask)
dailyTaskRouter.patch('/updateTask/:taskId', dailyTaskController.updateTask)

module.exports = dailyTaskRouter
