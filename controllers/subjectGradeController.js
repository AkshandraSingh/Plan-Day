const subjectGradeModel = require('../models/subjectGradeModel')

//? Add Grade API
const addGrade = async (req, res) => {
    try {
        const { userId } = req.params
        const userGrade = new subjectGradeModel(req.body)
        const calculatePercentage = userGrade.subjectGrade / userGrade.maxMarks * 100
        userGrade.userId = userId
        userGrade.percentage = calculatePercentage
        await userGrade.save()
        res.status(201).send({
            success: true,
            message: "Grade added successfully",
        })
    } catch (error) {
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
        res.status(200).send({
            success: true,
            message: "Grade updated successfully",
            updateGrade: updatedGrade,
        })
    } catch (error) {
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
        res.status(200).send({
            success: true,
            message: "Grade deleted successfully",
        })
    } catch (error) {
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
            return res.status(404).send({
                success: false,
                message: 'No grade found for this exam name',
            })
        }
        res.status(200).send({
            success: true,
            message: "Grade fetched successfully",
            searchGradeData: searchGradeData,
        })
    } catch (error) {
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
            return res.status(404).send({
                success: false,
                message: 'No grade found for this subject name',
            })
        }
        res.status(200).send({
            success: true,
            message: "Grade fetched successfully",
            searchGradeData: searchGradeData,
        })
    } catch (error) {
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
            return res.status(404).send({
                success: false,
                message: 'No grade found for this subject name and exam name',
            })
        }
        res.status(200).send({
            success: true,
            message: "Grade fetched successfully",
            viewGradeData: viewGradeData,
        })
    } catch (error) {
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
