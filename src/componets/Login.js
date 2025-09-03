import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Login = () => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    // Skip backend validation - allow any login
    setSubmitting(true);
    setError('');
    
    // Simulate login delay
    setTimeout(() => {
      try {
        // Create a mock user object
        const mockUser = {
          id: 1,
          name: formData.email ? formData.email.split('@')[0] : 'Guest',
          email: formData.email || 'guest@example.com'
        };
        
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('token', 'mock-token-' + Date.now());
        
        // Update AuthContext state
        login(mockUser);
        
        // Navigate to dashboard on successful login
        navigate('/dashboard');
      } catch (err) {
        setError('Login failed. Please try again.');
      } finally {
        setSubmitting(false);
      }
    }, 500); // 500ms delay to simulate network request
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">{t.loginTitle}</h1>
        
        <div className="input-container">
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder={t.emailPlaceholder}
              value={formData.email}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="login-input"
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder={t.passwordPlaceholder}
              value={formData.password}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="login-input"
            />
          </div>
        </div>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <button 
          className="login-button"
          onClick={handleLogin}
          disabled={submitting}
        >
          {submitting ? 'Logging in...' : t.loginButtonText}
        </button>
        
        <button 
          className="back-button"
          onClick={handleBack}
        >
          {t.backToWelcome}
        </button>
      </div>
    </div>
  );
};

export default Login;
