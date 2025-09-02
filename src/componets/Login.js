import React, { useState } from 'react';
import './Login.css';

const Login = ({ onBack }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = () => {
    if (formData.username && formData.password) {
      // Here you would typically authenticate with your backend
      alert('Login functionality will be implemented soon!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">Login</h1>
        <div className="input-container">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className="login-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="login-input"
          />
        </div>
        <button 
          className="login-button"
          onClick={handleLogin}
        >
          Login
        </button>
        <button 
          className="back-button"
          onClick={onBack}
        >
          Back to Welcome
        </button>
      </div>
    </div>
  );
};

export default Login;
