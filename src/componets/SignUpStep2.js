import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpStep2.css';
import { useAuth } from '../context/AuthContext';

const SignUpStep2 = ({ onComplete, onBack }) => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    nativeLanguage: '',
    grade: '',
    age: ''
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const languages = [
    'Hindi', 'Italian', 'Spanish', 'Russian', 'English', 'French', 
    'German', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Portuguese'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLanguageSelect = (language) => {
    setFormData({
      ...formData,
      nativeLanguage: language
    });
    setShowDropdown(false);
  };

  const handleTakeTest = async () => {
    // Allow test to be taken with any input (or empty fields)
    setSubmitting(true);
    setError('');
    try {
      // Use default values if fields are empty
      const testData = {
        name: formData.name || 'Guest User',
        nativeLanguage: formData.nativeLanguage || 'English',
        grade: formData.grade || 'Grade 5',
        age: formData.age || '10'
      };
      
      // Store user data in localStorage for the test
      localStorage.setItem('userTestData', JSON.stringify(testData));
      
      // Navigate to placement test page
      navigate('/placement-test');
    } catch (e) {
      setError(e?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h1 className="signup-title">Sign Up</h1>
        <div className="input-container">
          <input
            type="text"
            name="name"
            placeholder="Name (optional)"
            value={formData.name}
            onChange={handleInputChange}
            className="signup-input"
          />
          <div className="dropdown-container">
            <div 
              className="language-input"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Native Language (optional)"
                value={formData.nativeLanguage}
                readOnly
                className="language-placeholder"
              />
              {formData.nativeLanguage && (
                <span 
                  className="clear-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormData({ ...formData, nativeLanguage: '' });
                  }}
                >
                  ✕
                </span>
              )}
            </div>
            {showDropdown && (
              <div className="dropdown-menu">
                {languages.map((language) => (
                  <div
                    key={language}
                    className="dropdown-item"
                    onClick={() => handleLanguageSelect(language)}
                  >
                    {language}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="input-group">
            {/* Grade */}
            <input
              type="text"
              name="grade"
              placeholder="Grade (optional)"
              value={formData.grade}
              onChange={handleInputChange}
              className="signup-input"
            />
            <div className="grade-subtitle">US Standard Grade Level</div>
          </div>
          <input
            type="number"
            name="age"
            placeholder="Age (optional)"
            value={formData.age}
            onChange={handleInputChange}
            className="signup-input"
            min="1"
            max="100"
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
        <button 
          className="signup-button"
          onClick={handleTakeTest}
          disabled={submitting}
        >
          {submitting ? 'Please wait...' : 'Take Placement Test (Goes to Next Page)'}
        </button>
      </div>
    </div>
  );
};

export default SignUpStep2;
