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

module.exports = {
    addGrade,
}
