const joi = require('joi');

const subjectGradeValidationSchema = {
    addGrade: joi.object({
        subjectName: joi
            .string()
            .max(20)
            .min(3)
            .message({
                "string-min": "{#label} should be at least {#limit} characters",
                "string-max": "{#label} should be at most {#limit} characters",
            })
            .required(),
        examName: joi
            .string()
            .max(20)
            .min(3)
            .message({
                "string-min": "{#label} should be at least {#limit} characters",
                "string-max": "{#label} should be at most {#limit} characters",
            })
            .required(),
        subjectGrade: joi
            .number()
            .required(),
        maxMarks: joi
            .string()
            .required(),
    }).unknown(true),
};

module.exports = subjectGradeValidationSchema;
