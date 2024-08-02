const express = require('express')

const subjectGradeController = require('../controllers/subjectGradeController')

const subjectGradeRouter = express.Router()

//* Subject Grade Routes (Ending Points)
subjectGradeRouter.post('/addGrade/:userId', subjectGradeController.addGrade)

module.exports = subjectGradeRouter
