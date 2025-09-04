import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dashboardAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState({
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
    mentors: [
      {
        id: 1,
        name: 'Curious George',
        role: 'UI/UX Design',
        tasks: 40,
        rating: 4.7,
        reviews: 750,
        followed: false,
        image: 'https://via.placeholder.com/60x60/4A90E2/FFFFFF?text=CG'
      },
      {
        id: 2,
        name: 'Abraham Lincoln',
        role: '3D Design',
        tasks: 32,
        rating: 4.9,
        reviews: 510,
        followed: true,
        image: 'https://via.placeholder.com/60x60/4A90E2/FFFFFF?text=AL'
      }
    ],
    upcomingTasks: [
      {
        id: 1,
        title: 'Creating Mobile App Design',
        role: 'UI/UX Design',
        progress: 75,
        daysLeft: 3,
        image: 'https://placehold.co/300x150/4A90E2/FFFFFF?text=Mobile+App',
        team: [
          'https://placehold.co/30x30/4A90E2/FFFFFF?text=A',
          'https://placehold.co/30x30/4A90E2/FFFFFF?text=B',
          'https://placehold.co/30x30/4A90E2/FFFFFF?text=C'
        ]
      },
      {
        id: 2,
        title: 'Creating Perfect Website',
        role: 'Web Developer',
        progress: 85,
        daysLeft: 4,
        image: 'https://placehold.co/300x150/4A90E2/FFFFFF?text=Website',
        team: [
          'https://placehold.co/30x30/4A90E2/FFFFFF?text=D',
          'https://placehold.co/30x30/4A90E2/FFFFFF?text=E',
          'https://placehold.co/30x30/4A90E2/FFFFFF?text=F'
        ]
      }
    ],
    taskToday: {
      title: 'Creating Awesome Mobile Apps',
      role: 'UI/UX Designer',
      progress: 90,
      timeLeft: '1 Hour',
      image: 'https://placehold.co/300x150/4A90E2/FFFFFF?text=Mobile+Apps',
      team: [
        'https://placehold.co/30x30/4A90E2/FFFFFF?text=G',
        'https://placehold.co/30x30/4A90E2/FFFFFF?text=H',
        'https://placehold.co/30x30/4A90E2/FFFFFF?text=I',
        'https://placehold.co/30x30/4A90E2/FFFFFF?text=J',
        'https://placehold.co/30x30/4A90E2/FFFFFF?text=K'
      ],
      detailTasks: [
        'Understanding the tools in Figma',
        'Understand the basics of making designs',
        'Design a mobile application with figma'
      ]
    }
  });
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await dashboardAPI.getDashboardData();
        // Merge API data while preserving local-only fields like mentors
        setDashboardData(prev => ({
          ...prev,
          ...response.data,
          mentors: prev.mentors || []
        }));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  // Removed loading gate to always render UI immediately

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">D</div>
            <span className="logo-text">DNX</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/" className="nav-item active">
            <div className="nav-icon">⊞</div>
            <span>Overview</span>
          </Link>
          <Link to="/mentors" className="nav-item">
            <div className="nav-icon">📋</div>
            <span>Task</span>
          </Link>
          <Link to="/mentors" className="nav-item">
            <div className="nav-icon">👥</div>
            <span>Mentors</span>
          </Link>
          <div className="nav-item">
            <div className="nav-icon">💬</div>
            <span>Message</span>
          </div>
          <div className="nav-item">
            <div className="nav-icon">⚙️</div>
            <span>Settings</span>
          </div>
        </nav>
        
        <div className="help-center">
          <div className="help-icon">?</div>
          <h3>Help Center</h3>
          <p>Having Trouble in Learning. Please contact us for more questions.</p>
          <button className="help-button">Go To Help Center</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <button className="hamburger" onClick={toggleSidebar}>
            ☰
          </button>
          <div className="header-content">
            <div className="welcome">
              <h1>Hi, Dennis Nzioki</h1>
              <p>Let's finish your task today!</p>
            </div>
            <div className="header-actions">
              <div className="notification">
                🔔
                <span className="notification-badge"></span>
              </div>
              <div className="profile">
                <img src="/profile.jpg" alt="Profile" onError={(e)=>{e.currentTarget.src='https://placehold.co/40x40/4A90E2/FFFFFF?text=DN'}} />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="dashboard-main">
            {/* Running Task Card */}
            <div className="running-task-card">
              <h3>Running Task</h3>
              <div className="task-stats">
                <div className="task-number">{dashboardData.runningTasks}</div>
                <div className="task-progress">
                  <div className="circular-progress">
                    <div className="progress-circle">
                      <div className="progress-text">{dashboardData.progress}%</div>
                    </div>
                  </div>
                  <div className="total-tasks">{dashboardData.totalTasks} Task</div>
                </div>
              </div>
            </div>

            {/* Activity Graph */}
            <div className="activity-card">
              <div className="card-header">
                <h3>Activity</h3>
                <select className="time-selector">
                  <option>This Week</option>
                </select>
              </div>
              <div className="activity-chart">
                <div className="chart-container">
                  <div className="y-axis">
                    <span>3</span>
                    <span>2</span>
                    <span>1</span>
                  </div>
                  <div className="chart-line">
                    {dashboardData.activityData.map((data, index) => (
                      <div key={index} className="chart-point">
                        <div className={`point ${data.day === 'T' && data.tasks === 2 ? 'highlight' : ''}`}>
                          {data.day === 'T' && data.tasks === 2 && (
                            <div className="tooltip">2 Task</div>
                          )}
                        </div>
                        <span className="day-label">{data.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Mentors */}
            <div className="mentors-section">
              <div className="section-header">
                <h3>Monthly Mentors</h3>
                <div className="nav-arrows">
                  <button>‹</button>
                  <button>›</button>
                </div>
              </div>
              <div className="mentors-list">
                {dashboardData.mentors.map(mentor => (
                  <div key={mentor.id} className="mentor-card">
                    <img src={mentor.image} alt={mentor.name} className="mentor-avatar" onError={(e)=>{e.currentTarget.src='https://placehold.co/50x50/4A90E2/FFFFFF?text=' + (mentor.name?.[0]||'M')}} />
                    <div className="mentor-info">
                      <h4>{mentor.name}</h4>
                      <p>{mentor.role}</p>
                      <div className="mentor-stats">
                        <span>📋 {mentor.tasks} Task</span>
                        <span>⭐ {mentor.rating} ({mentor.reviews} reviews)</span>
                      </div>
                    </div>
                    <button className={`follow-button ${mentor.followed ? 'followed' : ''}`}>
                      {mentor.followed ? 'Followed' : '+ Follow'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="upcoming-tasks-section">
              <div className="section-header">
                <h3>Upcoming Task</h3>
                <div className="nav-arrows">
                  <button>‹</button>
                  <button>›</button>
                </div>
              </div>
              <div className="upcoming-tasks-list">
                {dashboardData.upcomingTasks.map(task => (
                  <div key={task.id} className="upcoming-task-card">
                    <img src={task.image} alt={task.title} className="task-image" onError={(e)=>{e.currentTarget.src='https://placehold.co/300x150/4A90E2/FFFFFF?text=Task'}} />
                    <div className="task-content">
                      <h4>{task.title}</h4>
                      <p>{task.role}</p>
                      <div className="task-progress-bar">
                        <span>Progress</span>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{width: `${task.progress}%`}}></div>
                        </div>
                        <span>{task.progress}%</span>
                      </div>
                      <div className="task-footer">
                        <span className="time-left">🕐 {task.daysLeft} Days Left</span>
                        <div className="team-avatars">
                          {task.team.map((avatar, index) => (
                            <img key={index} src={avatar} alt={`Team member ${index + 1}`} onError={(e)=>{e.currentTarget.src='https://placehold.co/30x30/4A90E2/FFFFFF?text=' + (index+1)}} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="right-sidebar">
            {/* Calendar */}
            <div className="calendar-card">
              <div className="calendar-header">
                <button>‹</button>
                <h3>July 2022</h3>
                <button>›</button>
              </div>
              <div className="calendar-grid">
                <div className="day-headers">
                  <span>S</span>
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
                  <span>S</span>
                </div>
                <div className="calendar-dates">
                  <span>10</span>
                  <span>11</span>
                  <span>12</span>
                  <span className="current-day">14</span>
                  <span>15</span>
                  <span>16</span>
                </div>
              </div>
            </div>

            {/* Task Today */}
            <div className="task-today-card">
              <div className="card-header">
                <h3>Task Today</h3>
                <button className="options-button">⋯</button>
              </div>
              <img src={dashboardData.taskToday.image} alt={dashboardData.taskToday.title} className="task-image" onError={(e)=>{e.currentTarget.src='https://placehold.co/300x150/4A90E2/FFFFFF?text=Task'}} />
              <div className="task-content">
                <h4>{dashboardData.taskToday.title}</h4>
                <p>{dashboardData.taskToday.role}</p>
                <div className="task-progress-bar">
                  <span>Progress</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: `${dashboardData.taskToday.progress}%`}}></div>
                  </div>
                  <span>{dashboardData.taskToday.progress}%</span>
                </div>
                <div className="task-footer">
                  <span className="time-left">🕐 {dashboardData.taskToday.timeLeft}</span>
                  <div className="team-avatars">
                    {dashboardData.taskToday.team.map((avatar, index) => (
                      <img key={index} src={avatar} alt={`Team member ${index + 1}`} onError={(e)=>{e.currentTarget.src='https://placehold.co/30x30/4A90E2/FFFFFF?text=' + (index+1)}} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Detail Task */}
            <div className="detail-task-card">
              <div className="card-header">
                <h3>Detail Task</h3>
                <span className="task-role">{dashboardData.taskToday.role}</span>
              </div>
              <div className="task-list">
                {dashboardData.taskToday.detailTasks.map((task, index) => (
                  <div key={index} className="task-item">
                    <span className="task-number">{index + 1}.</span>
                    <span className="task-text">{task}</span>
                  </div>
                ))}
              </div>
              <button className="go-to-detail-button">Go To Detail</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
