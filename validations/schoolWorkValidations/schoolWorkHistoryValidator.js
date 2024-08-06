const schoolWorkHistoryValidationSchema = require('./schoolWorkHistoryValidationSchema')

module.exports = {
    addSchoolWorkHistoryValidation: async (req, res, next) => {
        const value = await schoolWorkHistoryValidationSchema.addSchoolWorkHistory.validate(req.body, { abortEarly: false })
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
