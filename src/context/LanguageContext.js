import React, { createContext, useContext, useState } from 'react';

// Language translations for entire website
const translations = {
  'English': {
    // Welcome page
    welcomeTitle: 'Welcome to English Learning',
    welcomeSubtitle: 'Start your journey to master English',
    loginButton: 'Login',
    signupButton: 'Sign Up',
    
    // Login page
    loginTitle: 'Login',
    emailPlaceholder: 'Enter your email (any email works)',
    passwordPlaceholder: 'Enter your password (any password works)',
    loginButtonText: 'Login',
    backToWelcome: 'Back to Welcome',
    
    // SignUp pages
    signupTitle: 'Sign Up',
    confirmPasswordPlaceholder: 'Confirm Password',
    continueButton: 'Continue',
    
    // SignUpStep2
    namePlaceholder: 'Name (optional)',
    nativeLanguagePlaceholder: 'Native Language (optional)',
    gradePlaceholder: 'Grade (optional)',
    agePlaceholder: 'Age (optional)',
    takeTestButton: 'Take Placement Test (Goes to Next Page)',
    
    // Dashboard
    dashboardTitle: 'Dashboard',
    greetingSubtitle: 'Ready to improve your English?',
    menuTitle: 'Menu',
    progressButton: 'Progress',
    accountButton: 'My Account',
    logoutButton: 'Logout',
    
    // Placement Test
    testTitle: 'Placement Test',
    questionText: 'Question',
    nextButton: 'Next',
    submitButton: 'Submit Test',
    backButton: 'Back',
    
    // Test Results
    testResults: 'Test Results',
    questionDetails: 'Question Details',
    correct: 'Correct',
    incorrect: 'Incorrect',
    total: 'Total',
    yourAnswer: 'Your Answer',
    correctAnswer: 'Correct Answer',
    startLearning: 'Start Learning',
    noAnswer: 'No answer'
  },
  'Hindi': {
    // Welcome page
    welcomeTitle: 'अंग्रेजी सीखने में आपका स्वागत है',
    welcomeSubtitle: 'अंग्रेजी में महारत हासिल करने की अपनी यात्रा शुरू करें',
    loginButton: 'लॉगिन',
    signupButton: 'साइन अप',
    
    // Login page
    loginTitle: 'लॉगिन',
    emailPlaceholder: 'अपना ईमेल दर्ज करें (कोई भी ईमेल काम करता है)',
    passwordPlaceholder: 'अपना पासवर्ड दर्ज करें (कोई भी पासवर्ड काम करता है)',
    loginButtonText: 'लॉगिन (बैकएंड नहीं - कोई भी क्रेडेंशियल काम करता है)',
    backToWelcome: 'स्वागत पेज पर वापस जाएं',
    
    // SignUp pages
    signupTitle: 'साइन अप',
    confirmPasswordPlaceholder: 'पासवर्ड की पुष्टि करें',
    continueButton: 'जारी रखें',
    
    // SignUpStep2
    namePlaceholder: 'नाम (वैकल्पिक)',
    nativeLanguagePlaceholder: 'मातृभाषा (वैकल्पिक)',
    gradePlaceholder: 'कक्षा (वैकल्पिक)',
    agePlaceholder: 'उम्र (वैकल्पिक)',
    takeTestButton: 'प्लेसमेंट टेस्ट लें (अगला पेज जाता है)',
    
    // Dashboard
    dashboardTitle: 'डैशबोर्ड',
    greetingSubtitle: 'अंग्रेजी सुधारने के लिए तैयार हैं?',
    menuTitle: 'मेनू',
    progressButton: 'प्रगति',
    accountButton: 'मेरा खाता',
    logoutButton: 'लॉगआउट',
    
    // Placement Test
    testTitle: 'प्लेसमेंट टेस्ट',
    questionText: 'प्रश्न',
    nextButton: 'अगला',
    submitButton: 'टेस्ट सबमिट करें',
    backButton: 'वापस',
    
    // Test Results
    testResults: 'टेस्ट परिणाम',
    questionDetails: 'प्रश्न विवरण',
    correct: 'सही',
    incorrect: 'गलत',
    total: 'कुल',
    yourAnswer: 'आपका जवाब',
    correctAnswer: 'सही जवाब',
    startLearning: 'सीखना शुरू करें',
    noAnswer: 'कोई जवाब नहीं'
  },
  'Gujarati': {
    // Welcome page
    welcomeTitle: 'અંગ્રેજી શીખવામાં આપનું સ્વાગત છે',
    welcomeSubtitle: 'અંગ્રેજીમાં નિપુણતા મેળવવાની તમારી યાત્રા શરૂ કરો',
    loginButton: 'લૉગિન',
    signupButton: 'સાઇન અપ',
    
    // Login page
    loginTitle: 'લૉગિન',
    emailPlaceholder: 'તમારો ઈમેલ દાખલ કરો (કોઈપણ ઈમેલ કામ કરે છે)',
    passwordPlaceholder: 'તમારો પાસવર્ડ દાખલ કરો (કોઈપણ પાસવર્ડ કામ કરે છે)',
    loginButtonText: 'લૉગિન (બેકએન્ડ નહીં - કોઈપણ ક્રેડેન્શિયલ કામ કરે છે)',
    backToWelcome: 'સ્વાગત પેજ પર પાછા જાઓ',
    
    // SignUp pages
    signupTitle: 'સાઇન અપ',
    confirmPasswordPlaceholder: 'પાસવર્ડની પુષ્ટિ કરો',
    continueButton: 'જારી રાખો',
    
    // SignUpStep2
    namePlaceholder: 'નામ (વૈકલ્પિક)',
    nativeLanguagePlaceholder: 'માતૃભાષા (વૈકલ્પિક)',
    gradePlaceholder: 'કક્ષા (વૈકલ્પિક)',
    agePlaceholder: 'ઉંમર (વૈકલ્પિક)',
    takeTestButton: 'પ્લેસમેન્ટ ટેસ્ટ લો (આગળનું પેજ જાય છે)',
    
    // Dashboard
    dashboardTitle: 'ડેશબોર્ડ',
    greetingSubtitle: 'અંગ્રેજી સુધારવા માટે તૈયાર છો?',
    menuTitle: 'મેનૂ',
    progressButton: 'પ્રગતિ',
    accountButton: 'મારું ખાતું',
    logoutButton: 'લૉગઆઉટ',
    
    // Placement Test
    testTitle: 'પ્લેસમેન્ટ ટેસ્ટ',
    questionText: 'પ્રશ્ન',
    nextButton: 'આગળ',
    submitButton: 'ટેસ્ટ સબમિટ કરો',
    backButton: 'પાછળ',
    
    // Test Results
    testResults: 'ટેસ્ટ પરિણામ',
    questionDetails: 'પ્રશ્ન વિગતો',
    correct: 'સાચું',
    incorrect: 'ખોટું',
    total: 'કુલ',
    yourAnswer: 'તમારો જવાબ',
    correctAnswer: 'સાચો જવાબ',
    startLearning: 'સીખવાનું શરૂ કરો',
    noAnswer: 'કોઈ જવાબ નહીં'
  },
  'Spanish': {
    // Welcome page
    welcomeTitle: 'Bienvenido al Aprendizaje de Inglés',
    welcomeSubtitle: 'Comienza tu viaje para dominar el inglés',
    loginButton: 'Iniciar Sesión',
    signupButton: 'Registrarse',
    
    // Login page
    loginTitle: 'Iniciar Sesión',
    emailPlaceholder: 'Ingresa tu correo (cualquier correo funciona)',
    passwordPlaceholder: 'Ingresa tu contraseña (cualquier contraseña funciona)',
    loginButtonText: 'Iniciar Sesión (Sin Backend - Cualquier Credencial Funciona)',
    backToWelcome: 'Volver al Inicio',
    
    // SignUp pages
    signupTitle: 'Registrarse',
    confirmPasswordPlaceholder: 'Confirmar contraseña',
    continueButton: 'Continuar',
    
    // SignUpStep2
    namePlaceholder: 'Nombre (opcional)',
    nativeLanguagePlaceholder: 'Idioma nativo (opcional)',
    gradePlaceholder: 'Grado (opcional)',
    agePlaceholder: 'Edad (opcional)',
    takeTestButton: 'Tomar Prueba de Ubicación (Va a la Siguiente Página)',
    
    // Dashboard
    dashboardTitle: 'Panel de Control',
    greetingSubtitle: '¿Listo para mejorar tu inglés?',
    menuTitle: 'Menú',
    progressButton: 'Progreso',
    accountButton: 'Mi Cuenta',
    logoutButton: 'Cerrar Sesión',
    
    // Placement Test
    testTitle: 'Prueba de Ubicación',
    questionText: 'Pregunta',
    nextButton: 'Siguiente',
    submitButton: 'Enviar Prueba',
    backButton: 'Atrás',
    
    // Test Results
    testResults: 'Resultados de la Prueba',
    questionDetails: 'Detalles de Preguntas',
    correct: 'Correcto',
    incorrect: 'Incorrecto',
    total: 'Total',
    yourAnswer: 'Tu Respuesta',
    correctAnswer: 'Respuesta Correcta',
    startLearning: 'Comenzar a Aprender',
    noAnswer: 'Sin respuesta'
  },
  'French': {
    // Welcome page
    welcomeTitle: 'Bienvenue à l\'Apprentissage de l\'Anglais',
    welcomeSubtitle: 'Commencez votre voyage pour maîtriser l\'anglais',
    loginButton: 'Se Connecter',
    signupButton: 'S\'inscrire',
    
    // Login page
    loginTitle: 'Se Connecter',
    emailPlaceholder: 'Entrez votre e-mail (n\'importe quel e-mail fonctionne)',
    passwordPlaceholder: 'Entrez votre mot de passe (n\'importe quel mot de passe fonctionne)',
    loginButtonText: 'Se Connecter (Pas de Backend - N\'importe Quelles Identifiants Fonctionnent)',
    backToWelcome: 'Retour à l\'Accueil',
    
    // SignUp pages
    signupTitle: 'S\'inscrire',
    confirmPasswordPlaceholder: 'Confirmer le mot de passe',
    continueButton: 'Continuer',
    
    // SignUpStep2
    namePlaceholder: 'Nom (optionnel)',
    nativeLanguagePlaceholder: 'Langue maternelle (optionnel)',
    gradePlaceholder: 'Niveau (optionnel)',
    agePlaceholder: 'Âge (optionnel)',
    takeTestButton: 'Passer le Test de Placement (Va à la Page Suivante)',
    
    // Dashboard
    dashboardTitle: 'Tableau de Bord',
    greetingSubtitle: 'Prêt à améliorer votre anglais?',
    menuTitle: 'Menu',
    progressButton: 'Progrès',
    accountButton: 'Mon Compte',
    logoutButton: 'Se Déconnecter',
    
    // Placement Test
    testTitle: 'Test de Placement',
    questionText: 'Question',
    nextButton: 'Suivant',
    submitButton: 'Soumettre le Test',
    backButton: 'Retour',
    
    // Test Results
    testResults: 'Résultats du Test',
    questionDetails: 'Détails des Questions',
    correct: 'Correct',
    incorrect: 'Incorrect',
    total: 'Total',
    yourAnswer: 'Votre Réponse',
    correctAnswer: 'Réponse Correcte',
    startLearning: 'Commencer à Apprendre',
    noAnswer: 'Aucune réponse'
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'English';
  });

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  };

  const t = translations[currentLanguage] || translations['English'];

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
