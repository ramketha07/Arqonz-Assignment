// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { mentorsAPI } from '../services/api';
// import './Mentors.css';

// const Mentors = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [sortBy, setSortBy] = useState('Popular');
//   const [mentorsData, setMentorsData] = useState({
//     recentMentors: [],
//     mentors: []
//   });
//   const [loading, setLoading] = useState(true);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   useEffect(() => {
//     const fetchMentorsData = async () => {
//       try {
//         const [recentResponse, mentorsResponse] = await Promise.all([
//           mentorsAPI.getRecentMentors(),
//           mentorsAPI.getMentors({ search: searchTerm, category: selectedCategory, sortBy })
//         ]);
        
//         setMentorsData({
//           recentMentors: recentResponse.data,
//           mentors: mentorsResponse.data
//         });
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching mentors data:', error);
//         setLoading(false);
//       }
//     };

//     fetchMentorsData();
//   }, [searchTerm, selectedCategory, sortBy]);

//   const handleFollow = async (mentorId, isRecent = false) => {
//     try {
//       await mentorsAPI.toggleFollow(mentorId);
      
//       if (isRecent) {
//         setMentorsData(prev => ({
//           ...prev,
//           recentMentors: prev.recentMentors.map(mentor =>
//             mentor._id === mentorId ? { ...mentor, followed: !mentor.followed } : mentor
//           )
//         }));
//       } else {
//         setMentorsData(prev => ({
//           ...prev,
//           mentors: prev.mentors.map(mentor =>
//             mentor._id === mentorId ? { ...mentor, followed: !mentor.followed } : mentor
//           )
//         }));
//       }
//     } catch (error) {
//       console.error('Error toggling follow status:', error);
//     }
//   };

//   // Removed loading gate to always render UI immediately

//   return (
//     <div className="mentors-page">
//       {/* Sidebar */}
//       <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
//         <div className="sidebar-header">
//           <div className="logo">
//             <div className="logo-icon">D</div>
//             <span className="logo-text">DNX</span>
//           </div>
//         </div>
        
//         <nav className="sidebar-nav">
//           <Link to="/" className="nav-item">
//             <div className="nav-icon">⊞</div>
//             <span>Overview</span>
//           </Link>
//           <Link to="/mentors" className="nav-item">
//             <div className="mentors-page">
//               {/* Sidebar */}
//               <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
//                 <div className="sidebar-header">
//                   <div className="logo">
//                     <div className="logo-icon">D</div>
//                     <span className="logo-text">DNX</span>
//                   </div>
//                 </div>
//                 <nav className="sidebar-nav">
//                   <Link to="/" className="nav-item">
//                     <div className="nav-icon">⊞</div>
//                     <span>Overview</span>
//                   </Link>
//                   <Link to="/mentors" className="nav-item">
//                     <div className="nav-icon">�</div>
//                     <span>Task</span>
//                   </Link>
//                   <Link to="/mentors" className="nav-item active">
//                     <div className="nav-icon">👥</div>
//                     <span>Mentors</span>
//                   </Link>
//                   <div className="nav-item">
//                     <div className="nav-icon">💬</div>
//                     <span>Message</span>
//                   </div>
//                   <div className="nav-item">
//                     <div className="nav-icon">⚙️</div>
//                     <span>Settings</span>
//                   </div>
//                 </nav>
//               </div>

//               {/* Main Content */}
//               <div className="main-content">
//                 {/* Header */}
//                 <header className="header">
//                   <button className="hamburger" onClick={toggleSidebar}>
//                     ☰
//                   </button>
//                   <div className="header-content">
//                     <h1>Explore Mentors</h1>
//                     <div className="header-actions">
//                       <div className="search-container">
//                         <input
//                           type="text"
//                           placeholder="Search Mentors"
//                           value={searchTerm}
//                           onChange={(e) => setSearchTerm(e.target.value)}
//                           className="search-input"
//                         />
//                         <span className="search-icon">🔍</span>
//                       </div>
//                       <div className="filters">
//                         <button className="filter-button">
//                           <span className="filter-icon">⊞</span>
//                           Category
//                         </button>
//                         <button className="filter-button">
//                           <span className="filter-icon">▼</span>
//                           Sort By: {sortBy}
//                         </button>
//                       </div>
//                       <div className="user-actions">
//                         <div className="notification">
//                           🔔
//                           <span className="notification-badge"></span>
//                         </div>
//                         <div className="profile">
//                           <img src="/profile.jpg" alt="Profile" onError={(e)=>{e.currentTarget.src='https://placehold.co/40x40/4A90E2/FFFFFF?text=DN'}} />
//                           <span className="profile-badge"></span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </header>

//                 {/* Mentors Content */}
//                 <div className="mentors-content">
//                 <div className="mentors-page">
//                   {/* Sidebar */}
//                   <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
//                     <div className="sidebar-header">
//                       <div className="logo">
//                         <div className="logo-icon">D</div>
//                         <span className="logo-text">DNX</span>
//                       </div>
//                     </div>
//                     <nav className="sidebar-nav">
//                       <Link to="/" className="nav-item">
//                         <div className="nav-icon">⊞</div>
//                         <span>Overview</span>
//                       </Link>
//                       <Link to="/mentors" className="nav-item">
//                         <div className="nav-icon">📋</div>
//                         <span>Task</span>
//                       </Link>
//                       <Link to="/mentors" className="nav-item active">
//                         <div className="nav-icon">👥</div>
//                         <span>Mentors</span>
//                       </Link>
//                       <div className="nav-item">
//                         <div className="nav-icon">💬</div>
//                         <span>Message</span>
//                       </div>
//                       <div className="nav-item">
//                         <div className="nav-icon">⚙️</div>
//                         <span>Settings</span>
//                       </div>
//                     </nav>
//                   </div>

//                   {/* Main Content */}
//                   <div className="main-content">
//                     {/* Header */}
//                     <header className="header">
//                       <button className="hamburger" onClick={toggleSidebar}>
//                         ☰
//                       </button>
//                       <div className="header-content">
//                         <h1>Explore Mentors</h1>
//                         <div className="header-actions">
//                           <div className="search-container">
//                             <input
//                               type="text"
//                               placeholder="Search Mentors"
//                               value={searchTerm}
//                               onChange={(e) => setSearchTerm(e.target.value)}
//                               className="search-input"
//                             />
//                             <span className="search-icon">🔍</span>
//                           </div>
//                           <div className="filters">
//                             <button className="filter-button">
//                               <span className="filter-icon">⊞</span>
//                               Category
//                             </button>
//                             <button className="filter-button">
//                               <span className="filter-icon">▼</span>
//                               Sort By: {sortBy}
//                             </button>
//                           </div>
//                           <div className="user-actions">
//                             <div className="notification">
//                               🔔
//                               <span className="notification-badge"></span>
//                             </div>
//                             <div className="profile">
//                               <img src="/profile.jpg" alt="Profile" onError={(e)=>{e.currentTarget.src='https://placehold.co/40x40/4A90E2/FFFFFF?text=DN'}} />
//                               <span className="profile-badge"></span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </header>

//                     {/* Mentors Content */}
//                     <div className="mentors-content">
//                       {/* Recent Mentors Section */}
//                       <div className="recent-mentors-section">
//                         <div className="section-header">
//                           <h2>Recent Mentors</h2>
//                           <div className="nav-arrows">
//                             <button>‹</button>
//                             <button>›</button>
//                           </div>
//                         </div>
//                         <div className="recent-mentors">
//                           <div className="recent-mentors-container">
//                             {mentorsData.recentMentors.map(mentor => (
//                               <div key={mentor._id} className="recent-mentor-card">
//                                 <img src={mentor.image} alt={mentor.name} className="mentor-avatar" onError={(e)=>{e.currentTarget.src='https://placehold.co/60x60/4A90E2/FFFFFF?text=' + (mentor.name?.[0]||'M')}} />
//                                 <div className="mentor-info">
//                                   <h3>{mentor.name}</h3>
//                                   <p>{mentor.role}</p>
//                                   <div className="mentor-stats">
//                                     <span>📋 {mentor.tasks} Task</span>
//                                     <span>⭐ {mentor.rating} ({mentor.reviews} Reviews)</span>
//                                   </div>
//                                 </div>
//                                 <button 
//                                   className={`follow-button ${mentor.followed ? 'followed' : ''}`}
//                                   onClick={() => handleFollow(mentor._id, true)}
//                                 >
//                                   {mentor.followed ? 'Followed' : '+ Follow'}
//                                 </button>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>

//                       {/* Mentors Section */}
//                       <div className="mentors-section">
//                         <div className="section-header">
//                           <h2>Mentors</h2>
//                         </div>
//                         <div className="mentors-grid">
//                           {mentorsData.mentors.map(mentor => (
//                             <div key={mentor._id} className="mentor-card">
//                               <img src={mentor.image} alt={mentor.name} className="mentor-avatar" onError={(e)=>{e.currentTarget.src='https://placehold.co/70x70/4A90E2/FFFFFF?text=' + (mentor.name?.[0]||'M')}} />
//                               <div className="mentor-info">
//                                 <h3>{mentor.name}</h3>
//                                 <p>{mentor.role}</p>
//                                 <p className="mentor-description">{mentor.description}</p>
//                                 <div className="mentor-stats">
//                                   <span>📋 {mentor.tasks} Task</span>
//                                   <span>⭐ {mentor.rating} ({mentor.reviews} Reviews)</span>
//                                 </div>
//                               </div>
//                               <button 
//                                 className={`follow-button ${mentor.followed ? 'followed' : ''}`}
//                                 onClick={() => handleFollow(mentor._id, false)}
//                               >
//                                 {mentor.followed ? 'Followed' : '+ Follow'}
//                               </button>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { mentorsAPI } from '../services/api';
// import './Mentors.css';

// const Mentors = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [sortBy, setSortBy] = useState('Popular');
//   const [mentorsData, setMentorsData] = useState({
//     recentMentors: [],
//     mentors: []
//   });
//   const [loading, setLoading] = useState(true);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   useEffect(() => {
//     const fetchMentorsData = async () => {
//       try {
//         const [recentResponse, mentorsResponse] = await Promise.all([
//           mentorsAPI.getRecentMentors(),
//           mentorsAPI.getMentors({ search: searchTerm, category: selectedCategory, sortBy })
//         ]);
        
//         setMentorsData({
//           recentMentors: recentResponse.data,
//           mentors: mentorsResponse.data
//         });
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching mentors data:', error);
//         setLoading(false);
//       }
//     };

//     fetchMentorsData();
//   }, [searchTerm, selectedCategory, sortBy]);

//   const handleFollow = async (mentorId, isRecent = false) => {
//     try {
//       await mentorsAPI.toggleFollow(mentorId);
      
//       if (isRecent) {
//         setMentorsData(prev => ({
//           ...prev,
//           recentMentors: prev.recentMentors.map(mentor =>
//             mentor._id === mentorId ? { ...mentor, followed: !mentor.followed } : mentor
//           )
//         }));
//       } else {
//         setMentorsData(prev => ({
//           ...prev,
//           mentors: prev.mentors.map(mentor =>
//             mentor._id === mentorId ? { ...mentor, followed: !mentor.followed } : mentor
//           )
//         }));
//       }
//     } catch (error) {
//       console.error('Error toggling follow status:', error);
//     }
//   };

//   return (
//     <div className="mentors-page">
//       {/* Sidebar */}
//       <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
//         <div className="sidebar-header">
//           <div className="logo">
//             <div className="logo-icon">D</div>
//             <span className="logo-text">DNX</span>
//           </div>
//             <div className="help-center">
//               <div className="help-icon">?</div>
//               <h3>Help Center</h3>
//               <p>Having Trouble in Learning. Please contact us for more questions.</p>
//               <button className="help-button">Go To Help Center</button>
//             </div>
//         </div>
        
//         <nav className="sidebar-nav">
//           <Link to="/" className="nav-item">
//             <div className="nav-icon">⊞</div>
//             <span>Overview</span>
//           </Link>
//           <Link to="/tasks" className="nav-item">
//             <div className="nav-icon">📋</div>
//             <span>Task</span>
//           </Link>
//           <Link to="/mentors" className="nav-item active">
//             <div className="nav-icon">👥</div>
//             <span>Mentors</span>
//           </Link>
//           <Link to="/messages" className="nav-item">
//             <div className="nav-icon">💬</div>
//             <span>Message</span>
//           </Link>
//           <Link to="/settings" className="nav-item">
//             <div className="nav-icon">⚙️</div>
//             <span>Settings</span>
//           </Link>
//         </nav>
//       <div className="help-center">
//         <div className="help-icon">?</div>
//         <h3>Help Center</h3>
//         <p>Having Trouble in Learning. Please contact us for more questions.</p>
//         <button className="help-button">Go To Help Center</button>
//       </div>
//     </div>

//       {/* Main Content */}
//       <div className="main-content">
//         {/* Header */}
//         <header className="header">
//           <button className="hamburger" onClick={toggleSidebar}>
//             ☰
//           </button>
//           <div className="header-content">
//             <h1>Explore Mentors</h1>
//             <div className="header-actions">
//               <div className="search-container">
//                 <input
//                   type="text"
//                   placeholder="Search Mentors"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="search-input"
//                 />
//                 <span className="search-icon">🔍</span>
//               </div>
//               <div className="filters">
//                 <select 
//                   className="filter-button"
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                 >
//                   <option value="All">All Categories</option>
//                   <option value="Technology">Technology</option>
//                   <option value="Business">Business</option>
//                   <option value="Design">Design</option>
//                   <option value="Marketing">Marketing</option>
//                 </select>
//                 <select 
//                   className="filter-button"
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                 >
//                   <option value="Popular">Sort By: Popular</option>
//                   <option value="Rating">Sort By: Rating</option>
//                   <option value="Recent">Sort By: Recent</option>
//                   <option value="Name">Sort By: Name</option>
//                 </select>
//               </div>
//               <div className="user-actions">
//                 <div className="notification">
//                   🔔
//                   <span className="notification-badge"></span>
//                 </div>
//                 <div className="profile">
//                   <img 
//                     src="/profile.jpg" 
//                     alt="Profile" 
//                     onError={(e) => {
//                       e.currentTarget.src = 'https://placehold.co/40x40/4A90E2/FFFFFF?text=DN'
//                     }} 
//                   />
//                   <span className="profile-badge"></span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Mentors Content */}
//         <div className="mentors-content">
//           {/* Loading State */}
//           {loading && (
//             <div className="loading-state">
//               <p>Loading mentors...</p>
//             </div>
//           )}

//           {/* Recent Mentors Section */}
//           {!loading && mentorsData.recentMentors.length > 0 && (
//             <div className="recent-mentors-section">
//               <div className="section-header">
//                 <h2>Recent Mentors</h2>
//                 <div className="nav-arrows">
//                   <button>‹</button>
//                   <button>›</button>
//                 </div>
//               </div>
//               <div className="recent-mentors">
//                 <div className="recent-mentors-container">
//                   {mentorsData.recentMentors.map(mentor => (
//                     <div key={mentor._id} className="recent-mentor-card">
//                       <img 
//                         src={mentor.image} 
//                         alt={mentor.name} 
//                         className="mentor-avatar" 
//                         onError={(e) => {
//                           e.currentTarget.src = `https://placehold.co/60x60/4A90E2/FFFFFF?text=${mentor.name?.[0] || 'M'}`
//                         }} 
//                       />
//                       <div className="mentor-info">
//                         <h3>{mentor.name}</h3>
//                         <p>{mentor.role}</p>
//                         <div className="mentor-stats">
//                           <span>📋 {mentor.tasks} Task{mentor.tasks !== 1 ? 's' : ''}</span>
//                           <span>⭐ {mentor.rating} ({mentor.reviews} Reviews)</span>
//                         </div>
//                       </div>
//                       <button 
//                         className={`follow-button ${mentor.followed ? 'followed' : ''}`}
//                         onClick={() => handleFollow(mentor._id, true)}
//                       >
//                         {mentor.followed ? 'Followed' : '+ Follow'}
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Mentors Section */}
//           {!loading && (
//             <div className="mentors-section">
//               <div className="section-header">
//                 <h2>Mentors</h2>
//               </div>
//               {mentorsData.mentors.length > 0 ? (
//                 <div className="mentors-grid">
//                   {mentorsData.mentors.map(mentor => (
//                     <div key={mentor._id} className="mentor-card">
//                       <img 
//                         src={mentor.image} 
//                         alt={mentor.name} 
//                         className="mentor-avatar" 
//                         onError={(e) => {
//                           e.currentTarget.src = `https://placehold.co/70x70/4A90E2/FFFFFF?text=${mentor.name?.[0] || 'M'}`
//                         }} 
//                       />
//                       <div className="mentor-info">
//                         <h3>{mentor.name}</h3>
//                         <p>{mentor.role}</p>
//                         <p className="mentor-description">{mentor.description}</p>
//                         <div className="mentor-stats">
//                           <span>📋 {mentor.tasks} Task{mentor.tasks !== 1 ? 's' : ''}</span>
//                           <span>⭐ {mentor.rating} ({mentor.reviews} Reviews)</span>
//                         </div>
//                       </div>
//                       <button 
//                         className={`follow-button ${mentor.followed ? 'followed' : ''}`}
//                         onClick={() => handleFollow(mentor._id, false)}
//                       >
//                         {mentor.followed ? 'Followed' : '+ Follow'}
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="no-mentors">
//                   <p>No mentors found. Try adjusting your search or filters.</p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Mentors;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mentorsAPI } from '../services/api';
import './Mentors.css';

const Mentors = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Popular');
  const [mentorsData, setMentorsData] = useState({
    recentMentors: [],
    mentors: []
  });
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchMentorsData = async () => {
      try {
        const [recentResponse, mentorsResponse] = await Promise.all([
          mentorsAPI.getRecentMentors(),
          mentorsAPI.getMentors({ search: searchTerm, category: selectedCategory, sortBy })
        ]);
        
        setMentorsData({
          recentMentors: recentResponse.data,
          mentors: mentorsResponse.data
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching mentors data:', error);
        setLoading(false);
      }
    };

    fetchMentorsData();
  }, [searchTerm, selectedCategory, sortBy]);

  const handleFollow = async (mentorId, isRecent = false) => {
    try {
      await mentorsAPI.toggleFollow(mentorId);
      
      if (isRecent) {
        setMentorsData(prev => ({
          ...prev,
          recentMentors: prev.recentMentors.map(mentor =>
            mentor._id === mentorId ? { ...mentor, followed: !mentor.followed } : mentor
          )
        }));
      } else {
        setMentorsData(prev => ({
          ...prev,
          mentors: prev.mentors.map(mentor =>
            mentor._id === mentorId ? { ...mentor, followed: !mentor.followed } : mentor
          )
        }));
      }
    } catch (error) {
      console.error('Error toggling follow status:', error);
    }
  };

  return (
    <div className="mentors-page">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">D</div>
            <span className="logo-text">DNX</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/" className="nav-item">
            <div className="nav-icon">⊞</div>
            <span>Overview</span>
          </Link>
          <Link to="/mentors" className="nav-item">
            <div className="nav-icon">📋</div>
            <span>Task</span>
          </Link>
          <Link to="/mentors" className="nav-item active">
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
            <h1>Explore Mentors</h1>
            <div className="header-actions">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search Mentors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <span className="search-icon">🔍</span>
              </div>
              <div className="filters">
                <select 
                  className="filter-button"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Technology">Technology</option>
                  <option value="Business">Business</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                </select>
                <select 
                  className="filter-button"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="Popular">Sort By: Popular</option>
                  <option value="Rating">Sort By: Rating</option>
                  <option value="Recent">Sort By: Recent</option>
                  <option value="Name">Sort By: Name</option>
                </select>
              </div>
              <div className="user-actions">
                <div className="notification">
                  🔔
                  <span className="notification-badge"></span>
                </div>
                <div className="profile">
                  <img 
                    src="/profile.jpg" 
                    alt="Profile" 
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/40x40/4A90E2/FFFFFF?text=DN'
                    }} 
                  />
                  <span className="profile-badge"></span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mentors Content */}
        <div className="mentors-content">
          {/* Loading State */}
          {loading && (
            <div className="loading-state">
              <p>Loading mentors...</p>
            </div>
          )}

          {/* Recent Mentors Section */}
          {!loading && mentorsData.recentMentors.length > 0 && (
            <div className="recent-mentors-section">
              <div className="section-header">
                <h2>Recent Mentors</h2>
                <div className="nav-arrows">
                  <button>‹</button>
                  <button>›</button>
                </div>
              </div>
              <div className="recent-mentors">
                <div className="recent-mentors-container">
                  {mentorsData.recentMentors.map(mentor => (
                    <div key={mentor._id} className="recent-mentor-card">
                      <img 
                        src={mentor.image} 
                        alt={mentor.name} 
                        className="mentor-avatar" 
                        onError={(e) => {
                          e.currentTarget.src = `https://placehold.co/60x60/4A90E2/FFFFFF?text=${mentor.name?.[0] || 'M'}`
                        }} 
                      />
                      <div className="mentor-info">
                        <h3>{mentor.name}</h3>
                        <p>{mentor.role}</p>
                        <div className="mentor-stats">
                          <span>📋 {mentor.tasks} Task{mentor.tasks !== 1 ? 's' : ''}</span>
                          <span>⭐ {mentor.rating} ({mentor.reviews} Reviews)</span>
                        </div>
                      </div>
                      <button 
                        className={`follow-button ${mentor.followed ? 'followed' : ''}`}
                        onClick={() => handleFollow(mentor._id, true)}
                      >
                        {mentor.followed ? 'Followed' : '+ Follow'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mentors Section */}
          {!loading && (
            <div className="mentors-section">
              <div className="section-header">
                <h2>Mentors</h2>
              </div>
              {mentorsData.mentors.length > 0 ? (
                <div className="mentors-grid">
                  {mentorsData.mentors.map(mentor => (
                    <div key={mentor._id} className="mentor-card">
                      <img 
                        src={mentor.image} 
                        alt={mentor.name} 
                        className="mentor-avatar" 
                        onError={(e) => {
                          e.currentTarget.src = `https://placehold.co/70x70/4A90E2/FFFFFF?text=${mentor.name?.[0] || 'M'}`
                        }} 
                      />
                      <div className="mentor-info">
                        <h3>{mentor.name}</h3>
                        <p>{mentor.role}</p>
                        <p className="mentor-description">{mentor.description}</p>
                        <div className="mentor-stats">
                          <span>📋 {mentor.tasks} Task{mentor.tasks !== 1 ? 's' : ''}</span>
                          <span>⭐ {mentor.rating} ({mentor.reviews} Reviews)</span>
                        </div>
                      </div>
                      <button 
                        className={`follow-button ${mentor.followed ? 'followed' : ''}`}
                        onClick={() => handleFollow(mentor._id, false)}
                      >
                        {mentor.followed ? 'Followed' : '+ Follow'}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-mentors">
                  <p>No mentors found. Try adjusting your search or filters.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mentors;
