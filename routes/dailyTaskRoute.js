const express = require('express')


const dailyTaskController = require('../controllers/dailyTaskController')

const dailyTaskRouter = express.Router()

dailyTaskRouter.post('/createTask/:userId', dailyTaskController.createTask)

module.exports = dailyTaskRouter
