const express = require('express')

const subjectGradeController = require('../controllers/subjectGradeController')
const subjectGradeValidator = require('../validations/subjectGradeValidations/subjectGradeValidator')

const subjectGradeRouter = express.Router()

//* Subject Grade Routes (Ending Points)
subjectGradeRouter.post('/addGrade/:userId', subjectGradeValidator.addGradeValidation, subjectGradeController.addGrade)
subjectGradeRouter.patch('/updateGrade/:gradeId', subjectGradeController.updateGrade)
subjectGradeRouter.delete('/deleteGrade/:gradeId', subjectGradeController.deleteGrade)
subjectGradeRouter.get('/viewExamNames/:userId', subjectGradeController.viewExamNames)
subjectGradeRouter.get('/searchByExamName/:userId/:examName', subjectGradeController.searchByExamName)
subjectGradeRouter.get('/searchBySubjectName/:userId/:subjectName', subjectGradeController.searchBySubjectName)
subjectGradeRouter.get('/viewGrade/:userId', subjectGradeController.viewGrade)

module.exports = subjectGradeRouter
