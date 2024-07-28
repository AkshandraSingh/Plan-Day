const express = require('express')


const dailyTaskController = require('../controllers/dailyTaskController')

const dailyTaskRouter = express.Router()

dailyTaskRouter.post('/createTask/:userId', dailyTaskController.createTask)
dailyTaskRouter.patch('/updateTask/:taskId', dailyTaskController.updateTask)
dailyTaskRouter.delete('/deleteTask/:taskId', dailyTaskController.deleteTask)
dailyTaskRouter.get('/viewAllTasks/:userId', dailyTaskController.viewAllTasks)
dailyTaskRouter.get('/viewTask/:taskId', dailyTaskController.viewTask)
dailyTaskRouter.get('/todayTask/:userId', dailyTaskController.todayTask)
dailyTaskRouter.get('/searchTaskByData/:userId', dailyTaskController.searchTaskByData)
dailyTaskRouter.get('/searchTaskByLetter/:userId/:letter', dailyTaskController.searchTaskByLetter)

module.exports = dailyTaskRouter
