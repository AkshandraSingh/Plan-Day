const express = require('express')

const schoolWorkHistoryController = require('../controllers/schoolWorkHistoryController')

const schoolWorkHistoryRouter = express.Router()

schoolWorkHistoryRouter.post('/addSchoolWorkHistory/:userId', schoolWorkHistoryController.addSchoolWorkHistory)
schoolWorkHistoryRouter.patch('/updateSchoolWorkHistory/:workId', schoolWorkHistoryController.updateSchoolWorkHistory)
schoolWorkHistoryRouter.delete('/deleteSchoolWorkHistory/:workId', schoolWorkHistoryController.deleteSchoolWorkHistory)
schoolWorkHistoryRouter.get('/viewFullSchoolWorkHistory/:userId', schoolWorkHistoryController.viewFullSchoolWorkHistory)
schoolWorkHistoryRouter.get('/viewSchoolWork/:workId', schoolWorkHistoryController.viewSchoolWork)
schoolWorkHistoryRouter.get('/searchSchoolWorkBySubjectName/:userId/:subjectName', schoolWorkHistoryController.searchSchoolWorkBySubjectName)
schoolWorkHistoryRouter.get('/searchSchoolWorkByWorkName/:userId/:workName', schoolWorkHistoryController.searchSchoolWorkByWorkName)
schoolWorkHistoryRouter.post('/searchWorkByDate/:userId', schoolWorkHistoryController.searchWorkByDate)

module.exports = schoolWorkHistoryRouter
