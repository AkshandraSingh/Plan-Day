const subjectGradeModel = require('../models/subjectGradeModel')

//? Add Grade API
const addGrade = async (req, res) => {
    try {
        const { userId } = req.params
        const userGrade = new subjectGradeModel(req.body)
        userGrade.userId = userId
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

module.exports = {
    addGrade,
    updateGrade,
    deleteGrade,
    viewExamNames,
}
