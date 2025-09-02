import React, { useState } from 'react';
import './SignUpStep2.css';

const SignUpStep2 = ({ onComplete, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    nativeLanguage: '',
    grade: '',
    age: ''
  });
  const [showDropdown, setShowDropdown] = useState(false);

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

  const handleTakeTest = () => {
    if (formData.name && formData.nativeLanguage && formData.grade && formData.age) {
      onComplete(formData);
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
            placeholder="Name"
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
                placeholder="Native Language"
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
              placeholder="Grade"
              value={formData.grade}
              onChange={handleInputChange}
              className="signup-input"
            />
            <div className="grade-subtitle">US Standard Grade Level</div>
          </div>
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleInputChange}
            className="signup-input"
            min="1"
            max="100"
          />
        </div>
        <button 
          className="signup-button"
          onClick={handleTakeTest}
        >
          Take Placement Test
        </button>
      </div>
    </div>
  );
};

export default SignUpStep2;
