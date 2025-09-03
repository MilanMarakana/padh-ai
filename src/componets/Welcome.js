import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

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
