const dailyTaskValidationSchema = require('./dailyTaskValidationSchema')

module.exports = {
    createTaskValidation: async (req, res, next) => {
        const value = await dailyTaskValidationSchema.createTask.validate(req.body, { abortEarly: false })
        if (value.error) {
            return res.status(403).json({
                success: false,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    },
}
