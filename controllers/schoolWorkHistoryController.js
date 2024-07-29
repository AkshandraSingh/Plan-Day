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

    //? Update Work History API
    updateSchoolWorkHistory: async (req, res) => {
        try {
            const { workId } = req.params
            const updatedWorkData = await schoolWorkHistoryModel.findByIdAndUpdate(workId, {
                subjectName: req.body.subjectName || undefined,
                workName: req.body.workName || undefined,
                workDescription: req.body.workDescription || undefined,
            }, {
                new: true,
            })
            res.status(200).send({
                success: true,
                message: "Work updated successfully!",
                updatedWorkData: updatedWorkData
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message
            })
        }
    },

    //? Delete Work History API
    deleteSchoolWorkHistory: async (req, res) => {
        try {
            const { workId } = req.params
            const deletedWorkData = await schoolWorkHistoryModel.findByIdAndDelete(workId)
            res.status(200).send({
                success: true,
                message: "Work deleted successfully!",
                deletedWorkData: deletedWorkData
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message
            })
        }
    },

    //? View Full School Work History API
    viewFullSchoolWorkHistory: async (req, res) => {
        try {
            const { userId } = req.params
            const fullWorkHistoryData = await schoolWorkHistoryModel.find({ userId: userId }).select("subjectName workName")
            if (fullWorkHistoryData.length <= 0) {
                return res.status(404).send({
                    success: false,
                    message: 'No school work history found for this user',
                })
            }
            res.status(200).send({
                success: true,
                message: "School work history retrieved successfully!",
                fullWorkHistoryData: fullWorkHistoryData
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
