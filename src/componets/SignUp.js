import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpStep1 from './SignUpStep1';
import SignUpStep2 from './SignUpStep2';
import PlacementTest from './PlacementTest';
import './SignUp.css';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleStep1Complete = (data) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(2);
  };

  const handleStep2Complete = async (data) => {
    const payload = { name: data.name, email: formData.email, password: formData.password };
    await signup(payload);
    setFormData({ ...formData, ...data });
    setCurrentStep(3);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const handleFinishTest = () => {
    navigate('/dashboard');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <SignUpStep1 onNext={handleStep1Complete} />;
      case 2:
        return <SignUpStep2 onComplete={handleStep2Complete} onBack={handleBack} />;
      case 3:
        return <PlacementTest onFinishTest={handleFinishTest} onBack={handleBack} />;
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
