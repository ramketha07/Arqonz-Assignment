const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  runningTasks: {
    type: Number,
    default: 65
  },
  totalTasks: {
    type: Number,
    default: 100
  },
  progress: {
    type: Number,
    default: 45
  },
  activityData: [{
    day: String,
    tasks: Number
  }],
  taskToday: {
    title: String,
    role: String,
    progress: Number,
    timeLeft: String,
    image: String,
    team: [String],
    detailTasks: [String]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Dashboard', dashboardSchema);
