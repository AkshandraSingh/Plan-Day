const express = require('express')

const subjectGradeController = require('../controllers/subjectGradeController')

const subjectGradeRouter = express.Router()

//* Subject Grade Routes (Ending Points)
subjectGradeRouter.post('/addGrade/:userId', subjectGradeController.addGrade)
subjectGradeRouter.patch('/updateGrade/:gradeId', subjectGradeController.updateGrade)
subjectGradeRouter.delete('/deleteGrade/:gradeId', subjectGradeController.deleteGrade)

module.exports = subjectGradeRouter
