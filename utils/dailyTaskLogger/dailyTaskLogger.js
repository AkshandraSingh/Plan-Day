const { createLogger, transports, format } = require('winston')
require('winston-mongodb')

const dailyTaskLogger = createLogger({
    transports: [
        new transports.Console({
            level: "info",
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.Console({
            level: "error",
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.File({
            filename: 'logs/dailyTaskLogger/dailyTaskLogger.log',
            level: "info",
            maxsize: 5242880,
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(info => `level ${info.level}: ${info.timestamp} ${info.message}`)
            ),
        }),
        new transports.MongoDB({
            level: "info",
            db: process.env.URL,
            options: {
                useUnifiedTopology: true,
            },
            collection: 'dailyTaskLogData',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

module.exports = dailyTaskLogger
