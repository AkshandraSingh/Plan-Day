const express = require('express')

const userRouter = require('./routes/userRoute')
const dailyTaskRouter = require('./routes/dailyTaskRoute')
const schoolWorkHistoryRouter = require('./routes/schoolWorkHistoryRoute')

const commonRouter = express.Router()

commonRouter.use('/user', userRouter)
commonRouter.use('/dailyTask', dailyTaskRouter)
commonRouter.use('/schoolWorkHistory', schoolWorkHistoryRouter)

module.exports = commonRouter
