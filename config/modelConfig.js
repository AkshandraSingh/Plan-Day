const mongoose = require('mongoose')

const mainLogger = require('../utils/mainLogger')

mongoose.connect(process.env.URL)

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB')
    mainLogger.info('Connected to MongoDB')
})

mongoose.connection.on('error', (error) => {
    console.log('Mongoose connection error:', error)
    mainLogger.error('Mongoose connection error:', error)
})
