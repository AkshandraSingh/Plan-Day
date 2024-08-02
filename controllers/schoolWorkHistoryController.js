const schoolWorkHistoryModel = require('../models/schoolWorkHistoryModel')
const schoolWorkHistoryLogger = require('../utils/schoolWorkHistoryLogger/schoolWorkHistoryLogger')

module.exports = {
    //? Add Work History API
    addSchoolWorkHistory: async (req, res) => {
        try {
            const { userId } = req.params
            const workData = new schoolWorkHistoryModel(req.body)
            workData.userId = userId
            await workData.save()
            schoolWorkHistoryLogger.info("Work added successfully (API: Add Work History)")
            res.status(202).send({
                success: true,
                message: "Work added successfully!",
            })
        } catch (error) {
            schoolWorkHistoryLogger.error("API: Add Work History")
            schoolWorkHistoryLogger.error(`Error: ${error.message}`)
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
            schoolWorkHistoryLogger.info("Task updated successfully (API: Update Work History)")
            res.status(200).send({
                success: true,
                message: "Work updated successfully!",
                updatedWorkData: updatedWorkData
            })
        } catch (error) {
            schoolWorkHistoryLogger.error("API: Update Work History")
            schoolWorkHistoryLogger.error(`Error: ${error.message}`)
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
            schoolWorkHistoryLogger.info("Task deleted successfully (API: Delete Work History)")
            res.status(200).send({
                success: true,
                message: "Work deleted successfully!",
                deletedWorkData: deletedWorkData
            })
        } catch (error) {
            schoolWorkHistoryLogger.error("API: Delete Work History")
            schoolWorkHistoryLogger.error(`Error: ${error.message}`)
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
                schoolWorkHistoryLogger.error("No tasks found for this user (API: View Full School Work History)")
                return res.status(404).send({
                    success: false,
                    message: 'No school work history found for this user',
                })
            }
            schoolWorkHistoryLogger.info("School work history fetched successfully (API: View Full School Work History)")
            res.status(200).send({
                success: true,
                message: "School work history retrieved successfully!",
                fullWorkHistoryData: fullWorkHistoryData
            })
        } catch (error) {
            schoolWorkHistoryLogger.error("API: View Full School Work History")
            schoolWorkHistoryLogger.error(`Error: ${error.message}`)
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message
            })
        }
    },

    //? View Specific School Work History API
    viewSchoolWork: async (req, res) => {
        try {
            const { workId } = req.params
            const workData = await schoolWorkHistoryModel.findById(workId)
            schoolWorkHistoryLogger.info("School work retrieved successfully! (API: View School Work)")
            res.status(200).send({
                success: true,
                message: "School work retrieved successfully!",
                workData: workData,
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message
            })
        }
    },

    //? Search Work By Subject Name API
    searchSchoolWorkBySubjectName: async (req, res) => {
        try {
            const { userId, subjectName } = req.params
            const searchWorkData = await schoolWorkHistoryModel.find({
                userId: userId,
                subjectName: new RegExp(subjectName, 'i')
            }).select("subjectName workName")
            if (searchWorkData.length <= 0) {
                schoolWorkHistoryLogger.error("No school work history found for this subject (API: Search School Work By Subject Name)")
                return res.status(404).send({
                    success: false,
                    message: 'No school work history found for this subject',
                })
            }
            schoolWorkHistoryLogger.info("School work history retrieved successfully (API: Search School Work By Subject Name)")
            res.status(200).send({
                success: true,
                message: "School work history retrieved successfully!",
                searchWorkData: searchWorkData,
            })
        } catch (error) {
            schoolWorkHistoryLogger.error("API: Search School Work By Subject Name")
            schoolWorkHistoryLogger.error(`Error: ${error.message}`)
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message
            })
        }
    },

    //? Search Work By Work Name API
    searchSchoolWorkByWorkName: async (req, res) => {
        try {
            const { userId, workName } = req.params
            const searchWorkData = await schoolWorkHistoryModel.find({
                userId: userId,
                workName: new RegExp(workName, 'i')
            }).select("subjectName workName")
            if (searchWorkData.length <= 0) {
                schoolWorkHistoryLogger.error("No school work history found for this work (API: Search School Work By Work Name)")
                return res.status(404).send({
                    success: false,
                    message: 'No school work history found for this work',
                })
            }
            schoolWorkHistoryLogger.info("School work history retrieved successfully (API: Search School Work By Work Name)")
            res.status(200).send({
                success: true,
                message: "School work history retrieved successfully!",
                searchWorkData: searchWorkData,
            })
        } catch (error) {
            schoolWorkHistoryLogger.error("API: Search School Work By Work Name")
            schoolWorkHistoryLogger.error(`Error: ${error.message}`)
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message
            })
        }
    },

    //? Search Work By Date API
    searchWorkByDate: async (req, res) => {
        try {
            const { userId } = req.params
            const { startDate, endDate } = req.body
            const searchWorkData = await schoolWorkHistoryModel.find({ //* Format YYYY-MM-DD
                userId: userId,
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            }).select("subjectName workName")
            if (searchWorkData.length <= 0) {
                schoolWorkHistoryLogger.error("No school work history found for this date range (API: Search School Work By Date)")
                return res.status(404).send({
                    success: false,
                    message: 'No school work history found for this date range',
                })
            }
            schoolWorkHistoryLogger.info("School work history retrieved successfully (API: Search School Work By Date)")
            res.status(200).send({
                success: true,
                message: "School work history retrieved successfully!",
                searchWorkData: searchWorkData,
            })
        } catch (error) {
            schoolWorkHistoryLogger.error("API: Search School Work By Date")
            schoolWorkHistoryLogger.error(`Error: ${error.message}`)
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message
            })
        }
    },
}
