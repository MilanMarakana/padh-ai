import React, { useState } from 'react';
import SignUpStep1 from './SignUpStep1';
import SignUpStep2 from './SignUpStep2';
import './SignUp.css';

const SignUp = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleStep1Complete = (data) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(2);
  };

  const handleStep2Complete = (data) => {
    const completeData = { ...formData, ...data };
    console.log('Sign up completed:', completeData);
    // Here you would typically send the data to your backend
    alert('Sign up completed! Welcome to padhAI!');
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <SignUpStep1 onNext={handleStep1Complete} />;
      case 2:
        return <SignUpStep2 onComplete={handleStep2Complete} onBack={handleBack} />;
      default:
        return <SignUpStep1 onNext={handleStep1Complete} />;
    }
  };

  return (
    <div className="signup-flow">
      {renderCurrentStep()}
    </div>
  );
};

export default SignUp;
