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
    },

    //? Update Daily Task API
    updateTask: async (req, res) => {
        try {
            const { taskId } = req.params
            if (req.body.isCompleted === true) {
                await dailyTaskModel.findByIdAndDelete(taskId)
                return res.status(200).send({
                    success: true,
                    message: "Task has been removed!",
                })
            }
            const taskData = await dailyTaskModel.findByIdAndUpdate(taskId, { //* Find task data by id and update.
                taskTitle: req.body.taskTitle || undefined,
                taskDescription: req.body.taskDescription || undefined,
                isCompleted: req.body.isCompleted || undefined,
                taskReminder: req.body.taskReminder || undefined,
            }, {
                new: true,
            })
            res.status(200).send({
                success: true,
                message: 'Task updated successfully',
                data: taskData,
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: 'Server Error',
                error: error.message,
            })
        }
    },

    //? Delete Daily Task API
    deleteTask: async (req, res) => {
        try {
            const { taskId } = req.params
            await dailyTaskModel.findByIdAndDelete(taskId) //* Find task data by id and delete.
            res.status(200).send({
                success: true,
                message: 'Task deleted successfully',
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: 'Server Error',
                error: error.message,
            })
        }
    },

    //? View All Daily Tasks API
    viewAllTasks: async (req, res) => {
        try {
            const { userId } = req.params
            const tasksData = await dailyTaskModel.find({ userId: userId }).select('taskTitle') //* Find all tasks related to userId and filter the response.
            if (tasksData.length <= 0) {
                return res.status(404).send({
                    success: false,
                    message: 'No tasks found for this user',
                })
            }
            res.status(200).send({
                success: true,
                message: 'Tasks fetched successfully',
                tasksData: tasksData,
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: 'Server Error',
                error: error.message,
            })
        }
    },

    //? View Daily Task API
    viewTask: async (req, res) => {
        try {
            const { taskId } = req.params
            const taskData = await dailyTaskModel.findById(taskId) //* Find task data by id.
            if (!taskData) {
                return res.status(404).send({
                    success: false,
                    message: 'Task not found',
                })
            }
            res.status(200).send({
                success: true,
                message: 'Task fetched successfully',
                taskData: taskData,
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: 'Server Error',
                error: error.message,
            })
        }
    },
}
