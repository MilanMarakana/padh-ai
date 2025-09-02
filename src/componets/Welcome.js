import React, { useState } from 'react';
import SignUp from './SignUp';
import Login from './Login';
import './Welcome.css';

const Welcome = () => {
  const [currentView, setCurrentView] = useState('welcome');

  const handleSignUp = () => {
    setCurrentView('signup');
  };

  const handleLogin = () => {
    setCurrentView('login');
  };

  const handleBackToWelcome = () => {
    setCurrentView('welcome');
  };

  if (currentView === 'signup') {
    return <SignUp onBack={handleBackToWelcome} />;
  }

  if (currentView === 'login') {
    return <Login onBack={handleBackToWelcome} />;
  }

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">Welcome to padhAI</h1>
        <div className="button-container">
          <button className="welcome-button" onClick={handleSignUp}>Sign Up</button>
          <button className="welcome-button" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
