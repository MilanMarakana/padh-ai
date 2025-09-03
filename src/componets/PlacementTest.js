import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlacementTest.css';
import questionsData from './data.json';
import api from '../api/client';
import { useLanguage } from '../context/LanguageContext';

const PlacementTest = ({ onFinishTest, onBack }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [remoteQuestions, setRemoteQuestions] = useState(null);

  const localQuestions = questionsData.questions;
  const questions = remoteQuestions || localQuestions;

  useEffect(() => {
    // Try fetching questions from backend (if authenticated)
    api.getQuestions().then((res) => {
      if (res?.questions?.length) {
        setRemoteQuestions(res.questions);
      }
    }).catch(() => {
      // silently fall back to local questions
    });
  }, []);

  const handleStartTest = () => {
    setIsTestStarted(true);
  };

  const handleAnswerChange = (value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  const handleMultipleChoiceChange = (option) => {
    const currentAnswers = answers[currentQuestion] || [];
    let newAnswers;
    
    if (currentAnswers.includes(option)) {
      newAnswers = currentAnswers.filter(item => item !== option);
    } else {
      newAnswers = [...currentAnswers, option];
    }
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: newAnswers
    }));
  };

  const isAnswerValid = () => {
    const currentAnswer = answers[currentQuestion];
    const question = questions[currentQuestion];
    
    if (!currentAnswer) return false;
    
    switch (question.type) {
      case 'fill_blank':
      case 'short_answer':
        return currentAnswer.trim().length > 0;
      case 'single_choice':
      case 'yes_no':
        return currentAnswer.length > 0;
      case 'multiple_choice':
        if (question.selectCount) {
          return currentAnswer.length === question.selectCount;
        }
        return currentAnswer.length > 0;
      default:
        return false;
    }
  };

  const getSelectionStatus = () => {
    const currentAnswer = answers[currentQuestion];
    const question = questions[currentQuestion];
    
    if (question.type === 'multiple_choice' && question.selectCount) {
      const selectedCount = currentAnswer ? currentAnswer.length : 0;
      return;
    }
    return null;
  };

  const checkAnswer = (userAnswer, correctAnswer, questionType) => {
    if (questionType === 'multiple_choice') {
      const correctAnswers = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
      const userAnswers = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
      
      return correctAnswers.every(answer => 
        userAnswers.some(userAns => 
          userAns?.toString().toLowerCase().trim() === answer?.toString().toLowerCase().trim()
        )
      ) && userAnswers.length === correctAnswers.length;
    } else {
      const userAns = Array.isArray(userAnswer) ? userAnswer[0] : userAnswer;
      const correctAns = Array.isArray(correctAnswer) ? correctAnswer[0] : correctAnswer;
      
      return userAns && userAns?.toString().toLowerCase().trim() === correctAns?.toString().toLowerCase().trim();
    }
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const results = {
        totalQuestions: questions.length,
        answeredQuestions: Object.keys(answers).length,
        correctAnswers: 0,
        answers: answers,
        questions: questions,
        score: 0,
        questionResults: []
      };
      
      questions.forEach((question, index) => {
        const userAnswer = answers[index];
        const isCorrect = checkAnswer(userAnswer, question.answer, question.type);
        
        if (isCorrect) results.correctAnswers++;
        
        results.questionResults.push({
          question: question.question,
          questionNumber: question.questionNumber,
          userAnswer: userAnswer,
          correctAnswer: question.answer,
          isCorrect: isCorrect,
          type: question.type,
          options: question.options
        });
      });
      
      results.score = Math.round((results.correctAnswers / results.totalQuestions) * 100);

      setTestResults(results);
      setShowResults(true);

      // Try submit to backend
      try {
        await api.submitTest({
          testType: 'placement',
          totalQuestions: results.totalQuestions,
          correctAnswers: results.correctAnswers,
          score: results.score,
          answers: results.answers,
          questionResults: results.questionResults,
          timeTaken: 0
        });
      } catch (e) {
        // ignore if not logged in
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      setIsTestStarted(false);
    }
  };

  const handleFinishTest = () => {
    if (onFinishTest) {
      onFinishTest();
    } else {
      navigate('/dashboard');
    }
  };

  const renderResults = () => {
    if (!testResults) return null;

    const correctCount = testResults.correctAnswers;
    const incorrectCount = testResults.totalQuestions - correctCount;
    const percentage = testResults.score;

    return (
      <div className="placement-container">
        <div className="airplane airplane-1"></div>
        <div className="airplane airplane-2"></div>
        <div className="results-content">
                     <h1 className="results-title">{t.testResults}</h1>
          
          {/* Score Summary */}
          <div className="score-summary">
            <div className="score-circle">
              <span className="score-percentage">{percentage}%</span>
            </div>
            <div className="score-details">
                             <div className="score-item correct">
                 <span className="score-label">{t.correct}:</span>
                 <span className="score-value">{correctCount}</span>
               </div>
               <div className="score-item incorrect">
                 <span className="score-label">{t.incorrect}:</span>
                 <span className="score-value">{incorrectCount}</span>
               </div>
               <div className="score-item total">
                 <span className="score-label">{t.total}:</span>
                 <span className="score-value">{testResults.totalQuestions}</span>
               </div>
            </div>
          </div>

          {/* Question Results */}
          <div className="question-results">
                         <h3 className="results-subtitle">{t.questionDetails}</h3>
            <div className="results-list">
              {testResults.questionResults.map((result, index) => (
                <div key={index} className={`result-item ${result.isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="result-header">
                    <span className="result-number">Q{result.questionNumber}</span>
                    <span className={`result-status ${result.isCorrect ? 'correct' : 'incorrect'}`}>
                      {result.isCorrect ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="result-question">{result.question}</div>
                                     <div className="result-answers">
                     <div className="result-answer">
                       <span className="answer-label">{t.yourAnswer}:</span>
                       <span className="answer-value">{Array.isArray(result.userAnswer) ? result.userAnswer.join(', ') : result.userAnswer || t.noAnswer}</span>
                     </div>
                     <div className="result-answer">
                       <span className="answer-label">{t.correctAnswer}:</span>
                       <span className="answer-value">{Array.isArray(result.correctAnswer) ? result.correctAnswer.join(', ') : result.correctAnswer}</span>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="results-actions">
                         <button className="placement-button" onClick={handleFinishTest}>
               {t.startLearning}
             </button>
          </div>
        </div>
      </div>
    );
  };

  if (showResults) {
    return renderResults();
  }

  if (!isTestStarted) {
    return (
      <div className="placement-container">
        <div className="airplane airplane-1"></div>
        <div className="airplane airplane-2"></div>
        <div className="placement-content">
          <h1 className="placement-title">{t.testTitle}</h1>
          <div className="placement-description">
            <p>
              This short test will help<br />
              us understand your<br />
              English skills so we can<br />
              create lessons just for<br />
              you. It takes about 5-7<br />
              minutes.
            </p>
          </div>
          <button 
            className="placement-button"
            onClick={handleStartTest}
          >
            {t.submitButton}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="placement-container">
      <div className="airplane airplane-1"></div>
      <div className="airplane airplane-2"></div>
      <div className="question-content">
        <h1 className="question-title">{t.questionText}</h1>
        <div className="question-card">
          <div className="question-header">
            <span className="question-number-display">Question {questions[currentQuestion].questionNumber}</span>
            {getSelectionStatus() && (
              <span className="selection-status">{getSelectionStatus()}</span>
            )}
          </div>
          <p className="question-text">{questions[currentQuestion].question}</p>
          {renderQuestionInput()}
        </div>
        <div className="question-actions">
          {currentQuestion > 0 && (
            <button className="question-button back-btn" onClick={handleBack}>
              {t.backButton}
            </button>
          )}
          <button 
            className="question-button next-btn" 
            onClick={handleNext}
          >
            {currentQuestion === questions.length - 1 ? t.submitButton : t.nextButton}
          </button>
        </div>
        <div className="progress-indicator">
          <span className="progress-text">
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>
      </div>
    </div>
  );

  function renderQuestionInput() {
    const question = questions[currentQuestion];
    const currentAnswer = answers[currentQuestion];

    switch (question.type) {
      case 'single_choice':
        return (
          <div className="options-container">
            {question.options.map((option, index) => (
              <label key={index} className="radio-option">
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={option}
                  checked={currentAnswer === option}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                />
                <span className="radio-custom"></span>
                {option}
              </label>
            ))}
          </div>
        );

      case 'multiple_choice':
        return (
          <div className="options-container">
            {question.options.map((option, index) => (
              <label key={index} className="checkbox-option">
                <input
                  type="checkbox"
                  value={option}
                  checked={currentAnswer && currentAnswer.includes(option)}
                  onChange={() => handleMultipleChoiceChange(option)}
                />
                <span className="checkbox-custom"></span>
                {option}
              </label>
            ))}
          </div>
        );

      case 'yes_no':
        return (
          <div className="options-container">
            <label className="radio-option">
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value="yes"
                checked={currentAnswer === "yes"}
                onChange={(e) => handleAnswerChange(e.target.value)}
              />
              <span className="radio-custom"></span>
              Yes
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value="no"
                checked={currentAnswer === "no"}
                onChange={(e) => handleAnswerChange(e.target.value)}
              />
              <span className="radio-custom"></span>
              No
            </label>
          </div>
        );

      case 'fill_blank':
      case 'short_answer':
      default:
        return (
          <input
            type="text"
            className="answer-input"
            placeholder={question.type === 'fill_blank' ? "Enter answer here" : "Type your answer here..."}
            value={currentAnswer || ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
          />
        );
    }
  }
};

export default PlacementTest;
