const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/planDay')

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB')
})

mongoose.connection.on('error', (error) => {
    console.log('Mongoose connection error:', error)
})
