const mongoose = require('mongoose');
const Mentor = require('./server/models/Mentor');
const Dashboard = require('./server/models/Dashboard');
const config = require('./server/config');

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Mentor.deleteMany({});
    await Dashboard.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed mentors
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
    console.log(`👥 Seeded ${mentors.length} mentors`);

    // Seed dashboard data
    const dashboardData = new Dashboard({
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

    await dashboardData.save();
    console.log('📊 Seeded dashboard data');

    console.log('\n🎉 Database seeded successfully!');
    console.log('You can now start the application with: npm run dev');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

seedDatabase();
