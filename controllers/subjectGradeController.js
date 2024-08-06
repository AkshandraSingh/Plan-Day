const subjectGradeModel = require('../models/subjectGradeModel')
const subjectGradeLogger = require('../utils/subjectGradeLogger/subjectGradeLogger')

//? Add Grade API
const addGrade = async (req, res) => {
    try {
        const { userId } = req.params
        const userGrade = new subjectGradeModel(req.body)
        const calculatePercentage = userGrade.subjectGrade / userGrade.maxMarks * 100
        userGrade.userId = userId
        userGrade.percentage = calculatePercentage
        await userGrade.save()
        subjectGradeLogger.info(`Grade added successfully (API: Add Grade)`)
        res.status(201).send({
            success: true,
            message: "Grade added successfully",
        })
    } catch (error) {
        subjectGradeLogger.error("API: Add Grade")
        subjectGradeLogger.error(`Error: ${error.message}`)
        res.status(500).send({
            success: false,
            message: "Error!",
            error: error.message
        })
    }
}

//? Update Grade API
const updateGrade = async (req, res) => {
    try {
        const { gradeId } = req.params
        const updatedGrade = await subjectGradeModel.findByIdAndUpdate(gradeId, req.body, { new: true })
        subjectGradeLogger.info(`Grade updated successfully (API: Update Grade)`)
        res.status(200).send({
            success: true,
            message: "Grade updated successfully",
            updateGrade: updatedGrade,
        })
    } catch (error) {
        subjectGradeLogger.error("API: Update Grade")
        subjectGradeLogger.error(`Error: ${error.message}`)
        res.status(500).send({
            success: false,
            message: "Error!",
            error: error.message
        })
    }
}

//? Delete Grade API
const deleteGrade = async (req, res) => {
    try {
        const { gradeId } = req.params
        await subjectGradeModel.findByIdAndDelete(gradeId)
        subjectGradeLogger.info(`Grade deleted successfully (API: Delete Grade)`)
        res.status(200).send({
            success: true,
            message: "Grade deleted successfully",
        })
    } catch (error) {
        subjectGradeLogger.error("API: Delete Grade")
        subjectGradeLogger.error(`Error: ${error.message}`)
        res.status(500).send({
            success: false,
            message: "Error!",
            error: error.message
        })
    }
}

//? View Exam Names API
const viewExamNames = async (req, res) => {
    try {
        const examNamesData = await subjectGradeModel.distinct('examName', { userId: req.params.userId })
        if (examNamesData.length <= 0) { //* If there is no exam names.
            subjectGradeLogger.error("No exam names found for this user (API: View Exam Names)")
            return res.status(404).send({
                success: false,
                message: 'No exam names found for this user',
            })
        }
        res.status(200).send({
            success: true,
            message: "Exam names fetched successfully",
            examNamesData: examNamesData,
        })
    } catch (error) {
        subjectGradeLogger.error("API: View Exam Names")
        subjectGradeLogger.error(`Error: ${error.message}`)
        res.status(500).send({
            success: false,
            message: "Error!",
            error: error.message
        })
    }
}

//? Search By Exam Name API
const searchByExamName = async (req, res) => {
    try {
        const { userId, examName } = req.params
        const searchGradeData = await subjectGradeModel.find({
            userId: userId,
            examName: new RegExp(examName, 'i'),
        }).select("subjectName subjectGrade examName percentage")
        if (searchGradeData.length <= 0) {
            subjectGradeLogger.error("No grade found for this exam name (API: Search By Exam Name)")
            return res.status(404).send({
                success: false,
                message: 'No grade found for this exam name',
            })
        }
        subjectGradeLogger.info("Grade fetched successfully (API: Search By Exam Name)")
        res.status(200).send({
            success: true,
            message: "Grade fetched successfully",
            searchGradeData: searchGradeData,
        })
    } catch (error) {
        subjectGradeLogger.error("API: Search By Exam Name")
        subjectGradeLogger.error(`Error: ${error.message}`)
        res.status(500).send({
            success: false,
            message: "Error!",
            error: error.message
        })
    }
}

//? Search By Subject Name
const searchBySubjectName = async (req, res) => {
    try {
        const { userId, subjectName } = req.params
        const searchGradeData = await subjectGradeModel.find({
            userId: userId,
            subjectName: new RegExp(subjectName, 'i'),
        }).select("subjectName subjectGrade examName percentage")
        if (searchGradeData.length <= 0) {
            subjectGradeLogger.error("No grade found for this subject name (API: Search By Exam Name)")
            return res.status(404).send({
                success: false,
                message: 'No grade found for this subject name',
            })
        }
        subjectGradeLogger.info("Grade fetched successfully (API: Search By Subject Name)")
        res.status(200).send({
            success: true,
            message: "Grade fetched successfully",
            searchGradeData: searchGradeData,
        })
    } catch (error) {
        subjectGradeLogger.error("API: Search By Subject Name")
        subjectGradeLogger.error(`Error: ${error.message}`)
        res.status(500).send({
            success: false,
            message: "Error!",
            error: error.message
        })
    }
}

//? View Grade API
const viewGrade = async (req, res) => {
    try {
        const { userId } = req.params
        const { examName, subjectName } = req.body
        const viewGradeData = await subjectGradeModel.findOne({
            userId: userId,
            examName: examName,
            subjectName: subjectName,
        })
        if (!viewGradeData) {
            subjectGradeLogger.error("No grade found for this subject name and exam name (API: View Grade)")
            return res.status(404).send({
                success: false,
                message: 'No grade found for this subject name and exam name',
            })
        }
        subjectGradeLogger.log("Grade fetched successfully (API: View Grade)")
        res.status(200).send({
            success: true,
            message: "Grade fetched successfully",
            viewGradeData: viewGradeData,
        })
    } catch (error) {
        subjectGradeLogger.error("API: View Grade")
        subjectGradeLogger.error(`Error: ${error.message}`)
        res.status(500).send({
            success: false,
            message: "Error!",
            error: error.message
        })
    }
}


module.exports = {
    addGrade,
    updateGrade,
    deleteGrade,
    viewExamNames,
    searchByExamName,
    searchBySubjectName,
    viewGrade,
}
