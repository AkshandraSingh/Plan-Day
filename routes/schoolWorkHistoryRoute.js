const express = require('express')

const schoolWorkHistoryController = require('../controllers/schoolWorkHistoryController')

const schoolWorkHistoryRouter = express.Router()

schoolWorkHistoryRouter.post('/addSchoolWorkHistory/:userId', schoolWorkHistoryController.addSchoolWorkHistory)
schoolWorkHistoryRouter.patch('/updateSchoolWorkHistory/:workId', schoolWorkHistoryController.updateSchoolWorkHistory)

module.exports = schoolWorkHistoryRouter
