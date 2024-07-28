const schoolWorkHistoryModel = require('../models/schoolWorkHistoryModel')

module.exports = {
    //? Add Work History API
    addSchoolWorkHistory: async (req, res) => {
        try {
            const { userId } = req.params
            const workData = new schoolWorkHistoryModel(req.body)
            workData.userId = userId
            await workData.save()
            res.status(202).send({
                success: true,
                message: "Work added successfully!",
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message
            })
        }
    },
}
