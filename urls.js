const express = require('express')

const userRouter = require('./routes/userRoute')
const dailyTaskRouter = require('./routes/dailyTaskRoute')

const commonRouter = express.Router()

commonRouter.use('/user', userRouter)
commonRouter.use('/dailyTask', dailyTaskRouter)

module.exports = commonRouter
