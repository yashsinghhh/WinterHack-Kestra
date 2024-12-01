const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
  const { dueDate, dueTime } = req.body;
  
  // Check for existing tasks at the same time
  const existingTask = await Task.findOne({
    dueDate: new Date(dueDate),
    dueTime: dueTime
  });

  if (existingTask) {
    return res.status(409).json({ 
      success: false, 
      message: 'Task clash! Another task exists at this time.' 
    });
  }

  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
  res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndDelete({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
  res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const { dueDate, dueTime } = req.body;

  // Check for task clashes on update
  if (dueDate && dueTime) {
    const existingTask = await Task.findOne({
      _id: { $ne: taskID },
      dueDate: new Date(dueDate),
      dueTime: dueTime
    });

    if (existingTask) {
      return res.status(409).json({ 
        success: false, 
        message: 'Task clash! Another task exists at this time.' 
      });
    }
  }

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }

  res.status(200).json({ task })
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}