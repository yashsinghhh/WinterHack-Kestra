const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
    required: [true, 'must provide due date']
  },
  dueTime: {
    type: String,
    required: [true, 'must provide due time']
  }
})

module.exports = mongoose.model('Task', TaskSchema)