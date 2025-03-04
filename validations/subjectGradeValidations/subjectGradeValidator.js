const subjectGradeValidationSchema = require('./subjectGradeValidationSchema')

module.exports = {
    addGradeValidation: async (req, res, next) => {
        const value = await subjectGradeValidationSchema.addGrade.validate(req.body, { abortEarly: false })
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
