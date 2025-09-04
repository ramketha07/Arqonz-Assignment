const express = require('express');
const router = express.Router();
const Dashboard = require('../models/Dashboard');

// Get dashboard data
router.get('/', async (req, res) => {
  try {
    let dashboard = await Dashboard.findOne();
    
    if (!dashboard) {
      // Create default dashboard data if none exists
      dashboard = new Dashboard({
        runningTasks: 65,
        totalTasks: 100,
        progress: 45,
        activityData: [
          { day: 'S', tasks: 1 },
          { day: 'M', tasks: 2 },
          { day: 'T', tasks: 2 },
          { day: 'W', tasks: 1 },
          { day: 'T', tasks: 3 },
          { day: 'F', tasks: 1 },
          { day: 'S', tasks: 2 }
        ],
        taskToday: {
          title: 'Creating Awesome Mobile Apps',
          role: 'UI/UX Designer',
          progress: 90,
          timeLeft: '1 Hour',
          image: 'https://via.placeholder.com/300x150/4A90E2/FFFFFF?text=Mobile+Apps',
          team: [
            'https://via.placeholder.com/30x30/4A90E2/FFFFFF?text=G',
            'https://via.placeholder.com/30x30/4A90E2/FFFFFF?text=H',
            'https://via.placeholder.com/30x30/4A90E2/FFFFFF?text=I',
            'https://via.placeholder.com/30x30/4A90E2/FFFFFF?text=J',
            'https://via.placeholder.com/30x30/4A90E2/FFFFFF?text=K'
          ],
          detailTasks: [
            'Understanding the tools in Figma',
            'Understand the basics of making designs',
            'Design a mobile application with figma'
          ]
        }
      });
      await dashboard.save();
    }
    
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
  }
});

// Update dashboard data
router.put('/', async (req, res) => {
  try {
    const dashboard = await Dashboard.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ message: 'Error updating dashboard data', error: error.message });
  }
});

module.exports = router;



