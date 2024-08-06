const joi = require('joi');

const dailyTaskValidationSchema = {
    createTask: joi.object({
        taskTitle: joi
            .string()
            .max(20)
            .min(3)
            .message({
                "string-min": "{#label} should be at least {#limit} characters",
                "string-max": "{#label} should be at most {#limit} characters",
            })
            .required(),
        taskDescription: joi
            .string()
            .max(170)
            .min(3)
            .message({
                "string-min": "{#label} should be at least {#limit} characters",
                "string-max": "{#label} should be at most {#limit} characters",
            }),
    }).unknown(true),
};

module.exports = dailyTaskValidationSchema;
