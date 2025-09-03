import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const userName = user?.name || user?.email || "User";
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  const lessonData = [
    {
      skill: "Vocabulary",
      lesson: "Lesson 5",
      buttonText: "Continue",
      progress: 5
    },
    {
      skill: "Grammar",
      lesson: "Lesson 8",
      buttonText: "Continue",
      progress: 33
    },
    {
      skill: "Reading",
      lesson: "Lesson 4",
      buttonText: "Continue",
      progress: 66
    },
    {
      skill: "Listening",
      lesson: "Lesson 2",
      buttonText: "Continue",
      progress: 75
    },
    {
      skill: "Writing",
      lesson: "Lesson 1",
      buttonText: "Start",
      progress: 0
    }
  ];

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarItemClick = (page) => {
    setActivePage(page);
    setIsSidebarOpen(false);
    
    // Handle navigation logic
    switch (page) {
      case 'dashboard':
        // Already on dashboard
        break;
      case 'progress':
        // Navigate to progress page or show progress modal
        console.log('Navigate to Progress page');
        break;
      case 'account':
        // Navigate to account page or show account modal
        console.log('Navigate to My Account page');
        break;
      case 'logout':
        // Handle logout
        logout();
        navigate('/');
        break;
      default:
        break;
    }
  };

  const handleLessonClick = (skill) => {
    // Handle lesson button click
    console.log(`${skill} lesson clicked`);
    // Navigate to specific lesson or show lesson modal
  };

  const handleOverlayClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={handleOverlayClick}></div>
      )}

      {/* Sidebar Navigation */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3 className="sidebar-title">Menu</h3>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`sidebar-item ${activePage === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleSidebarItemClick('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`sidebar-item ${activePage === 'progress' ? 'active' : ''}`}
            onClick={() => handleSidebarItemClick('progress')}
          >
            Progress
          </button>
          <button 
            className={`sidebar-item ${activePage === 'account' ? 'active' : ''}`}
            onClick={() => handleSidebarItemClick('account')}
          >
            My Account
          </button>
          <button 
            className="sidebar-item logout-button"
            onClick={() => handleSidebarItemClick('logout')}
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="dashboard-header">
          <button className="menu-button" onClick={handleMenuClick}>
            <div className="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          <h1 className="dashboard-title">Dashboard</h1>
        </div>

        {/* Greeting Section */}
        <div className="greeting-section">
          <h2 className="greeting-title">Hi {userName}!</h2>
          <p className="greeting-subtitle">Ready to improve your English?</p>
        </div>

        {/* Lesson Progress Cards */}
        <div className="lessons-container">
          {lessonData.map((lesson, index) => (
            <div key={index} className="lesson-card">
              <div className="lesson-info">
                <h3 className="lesson-skill">{lesson.skill}</h3>
                <p className="lesson-number">{lesson.lesson}</p>
              </div>
              <div className="lesson-actions">
                <button 
                  className={`lesson-button ${lesson.progress === 0 ? 'start' : 'continue'}`}
                  onClick={() => handleLessonClick(lesson.skill)}
                >
                  {lesson.buttonText}
                </button>
                <div className="progress-circle">
                  <svg className="progress-svg" viewBox="0 0 36 36">
                    <path
                      className="progress-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="progress-fill"
                      strokeDasharray={`${lesson.progress}, 100`}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
