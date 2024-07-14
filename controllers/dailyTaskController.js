const dailyTaskModel = require('../models/dailyTaskModel')

module.exports = {
    //? Create Daily Task API
    createTask: async (req, res) => {
        try {
            const { userId } = req.params
            const dailyTaskData = new dailyTaskModel(req.body)
            dailyTaskData.userId = userId //* Declare userId to main userId.
            await dailyTaskData.save()
            res.status(201).json({
                success: true,
                message: 'Task added successfully',
                data: dailyTaskData,
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: 'Server Error',
                error: error.message,
            })
        }
    }
}
