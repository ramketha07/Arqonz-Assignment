const express = require('express');
const router = express.Router();
const Mentor = require('../models/Mentor');

// Get all mentors
router.get('/', async (req, res) => {
  try {
    const { search, category, sortBy } = req.query;
    
    let query = {};
    
    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Category filter
    if (category && category !== 'All') {
      query.role = { $regex: category, $options: 'i' };
    }
    
    let sort = {};
    if (sortBy === 'Popular') {
      sort = { rating: -1, reviews: -1 };
    } else if (sortBy === 'Name') {
      sort = { name: 1 };
    } else if (sortBy === 'Tasks') {
      sort = { tasks: -1 };
    }
    
    const mentors = await Mentor.find(query).sort(sort);
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching mentors', error: error.message });
  }
});

// Get recent mentors
router.get('/recent', async (req, res) => {
  try {
    const recentMentors = await Mentor.find({ isRecent: true }).limit(4);
    res.json(recentMentors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent mentors', error: error.message });
  }
});

// Get mentor by ID
router.get('/:id', async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    res.json(mentor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching mentor', error: error.message });
  }
});

// Create new mentor
router.post('/', async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).json(mentor);
  } catch (error) {
    res.status(500).json({ message: 'Error creating mentor', error: error.message });
  }
});

// Update mentor
router.put('/:id', async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    res.json(mentor);
  } catch (error) {
    res.status(500).json({ message: 'Error updating mentor', error: error.message });
  }
});

// Toggle follow status
router.patch('/:id/follow', async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    
    mentor.followed = !mentor.followed;
    await mentor.save();
    
    res.json(mentor);
  } catch (error) {
    res.status(500).json({ message: 'Error updating follow status', error: error.message });
  }
});

// Delete mentor
router.delete('/:id', async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndDelete(req.params.id);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    res.json({ message: 'Mentor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting mentor', error: error.message });
  }
});

// Seed initial data
router.post('/seed', async (req, res) => {
  try {
    // Clear existing data
    await Mentor.deleteMany({});
    
    // Seed mentors data
    const mentorsData = [
      {
        name: 'Jessica Jane',
        role: 'Web Developer',
        tasks: 40,
        rating: 4.7,
        reviews: 750,
        followed: false,
        description: "Hi, I'm Jessica Jane. I am a doctoral student at Harvard University majoring in Web Development...",
        image: 'https://via.placeholder.com/60x60/4A90E2/FFFFFF?text=JJ',
        isRecent: true
      },
      {
        name: 'Abraham Lincoln',
        role: '3D Design',
        tasks: 32,
        rating: 4.9,
        reviews: 510,
        followed: true,
        description: "Hi, I'm Abraham Lincoln. I am a professional 3D Designer...",
        image: 'https://via.placeholder.com/60x60/4A90E2/FFFFFF?text=AL',
        isRecent: true
      },
      {
        name: 'Curious George',
        role: 'UI UX Design',
        tasks: 40,
        rating: 4.7,
        reviews: 750,
        followed: false,
        description: "Hi, I'm Curious George. I am a UI/UX Designer...",
        image: 'https://via.placeholder.com/60x60/4A90E2/FFFFFF?text=CG',
        isRecent: true
      },
      {
        name: 'Alex Stanton',
        role: 'UI/UX Designer',
        tasks: 60,
        rating: 4.9,
        reviews: 970,
        followed: true,
        description: "Hi, I'm Alex Stanton. I am a doctoral student at Oxford University majoring in UI/UX Design...",
        image: 'https://via.placeholder.com/60x60/4A90E2/FFFFFF?text=AS',
        isRecent: false
      },
      {
        name: 'Antoine Griezmann',
        role: 'Android Developer',
        tasks: 50,
        rating: 4.8,
        reviews: 830,
        followed: false,
        description: "Hi, I'm Antoine Griezmann. I'm an Android Developer at Google company...",
        image: 'https://via.placeholder.com/60x60/4A90E2/FFFFFF?text=AG',
        isRecent: false
      },
      {
        name: 'Anna White',
        role: '3D Design',
        tasks: 60,
        rating: 4.8,
        reviews: 870,
        followed: true,
        description: "Hi, I'm Anna White. I'm a professional 3D Designer at Blender company...",
        image: 'https://via.placeholder.com/60x60/4A90E2/FFFFFF?text=AW',
        isRecent: false
      },
      {
        name: 'Richard Kyle',
        role: '2D Design',
        tasks: 60,
        rating: 4.7,
        reviews: 730,
        followed: false,
        description: "Hi, I'm Richard Kyle. I'm a professional 2D Designer at Photoshop company...",
        image: 'https://via.placeholder.com/60x60/4A90E2/FFFFFF?text=RK',
        isRecent: false
      },
      {
        name: 'Julia Philips',
        role: 'IOS Developer',
        tasks: 60,
        rating: 4.9,
        reviews: 910,
        followed: false,
        description: "Hi, I'm Julia Philips. I'm a senior manager at Apple company...",
        image: 'https://via.placeholder.com/60x60/4A90E2/FFFFFF?text=JP',
        isRecent: false
      }
    ];
    
    const mentors = await Mentor.insertMany(mentorsData);
    res.json({ message: 'Mentors seeded successfully', count: mentors.length });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding mentors', error: error.message });
  }
});

module.exports = router;



