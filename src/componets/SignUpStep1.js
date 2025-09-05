import React, { useState } from 'react';
import './SignUpStep1.css';
import { useLanguage } from '../context/LanguageContext';

const SignUpStep1 = ({ onNext }) => {
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const languages = ['English', 'Hindi', 'Gujarati', 'Spanish', 'French', 'Punjabi', 'Telugu'];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleContinue = () => {
    if (formData.password === formData.confirmPassword && formData.email && formData.password) {
      onNext({ email: formData.email, password: formData.password });
    }
  };

  const handleLanguageSelect = (language) => {
    changeLanguage(language);
    setShowLanguageDropdown(false);
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h1 className="signup-title">{t.signupTitle}</h1>
         {/* Language Selection Dropdown */}
         <div className="language-dropdown-container">
          <div 
            className="language-selector"
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
          >
            <span className="language-icon">🌐</span>
            <span className="selected-language">{currentLanguage}</span>
            <span className="dropdown-arrow">▼</span>
          </div>
          {showLanguageDropdown && (
            <div className="language-dropdown-menu">
              {languages.map((language) => (
                <div
                  key={language}
                  className={`language-option ${currentLanguage === language ? 'selected' : ''}`}
                  onClick={() => handleLanguageSelect(language)}
                >
                  {language}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="input-container">
          
          <input
            type="email"
            name="email"
            placeholder={t.emailPlaceholder}
            value={formData.email}
            onChange={handleInputChange}
            className="signup-input"
          />
          <input
            type="password"
            name="password"
            placeholder={t.passwordPlaceholder}
            value={formData.password}
            onChange={handleInputChange}
            className="signup-input"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder={t.confirmPasswordPlaceholder}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="signup-input"
          />
        </div>
        
       
        
        <button 
          className="signup-button"
          onClick={handleContinue}
        >
          {t.continueButton}
        </button>
      </div>
    </div>
  );
};

export default SignUpStep1;
