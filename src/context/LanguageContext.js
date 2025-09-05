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
    emailPlaceholder: 'Enter your email',
    passwordPlaceholder: 'Enter your password',
    loginButtonText: 'Login',
    backToWelcome: 'Back to Welcome',

    // SignUp pages
    signupTitle: 'Sign Up',
    confirmPasswordPlaceholder: 'Confirm Password',
    continueButton: 'Continue',

    // SignUpStep2
    namePlaceholder: 'Name (optional)',
    nativeLanguagePlaceholder: 'Native Language',
    gradePlaceholder: 'Grade',
    agePlaceholder: 'Age (optional)',
    takeTestButton: 'Take Placement Test',

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
    emailPlaceholder: 'अपना ईमेल दर्ज करें',
    passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
    loginButtonText: 'लॉगिन',
    backToWelcome: 'स्वागत पेज पर वापस जाएं',

    // SignUp pages
    signupTitle: 'साइन अप',
    confirmPasswordPlaceholder: 'पासवर्ड की पुष्टि करें',
    continueButton: 'जारी रखें',

    // SignUpStep2
    namePlaceholder: 'नाम',
    nativeLanguagePlaceholder: 'मातृभाषा',
    gradePlaceholder: 'कक्षा',
    agePlaceholder: 'उम्र',
    takeTestButton: 'प्लेसमेंट टेस्ट लें',

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
    emailPlaceholder: 'તમારો ઈમેલ દાખલ કરો',
    passwordPlaceholder: 'તમારો પાસવર્ડ દાખલ કરો',
    loginButtonText: 'લૉગિન',
    backToWelcome: 'સ્વાગત પેજ પર પાછા જાઓ',

    // SignUp pages
    signupTitle: 'સાઇન અપ',
    confirmPasswordPlaceholder: 'પાસવર્ડની પુષ્ટિ કરો',
    continueButton: 'જારી રાખો',

    // SignUpStep2
    namePlaceholder: 'નામ (વૈકલ્પિક)',
    nativeLanguagePlaceholder: 'માતૃભાષા',
    gradePlaceholder: 'કક્ષા',
    agePlaceholder: 'ઉંમર',
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
    emailPlaceholder: 'Ingresa tu correo',
    passwordPlaceholder: 'Ingresa tu contraseña',
    loginButtonText: 'Iniciar Sesión',
    backToWelcome: 'Volver al Inicio',

    // SignUp pages
    signupTitle: 'Registrarse',
    confirmPasswordPlaceholder: 'Confirmar contraseña',
    continueButton: 'Continuar',

    // SignUpStep2
    namePlaceholder: 'Nombre',
    nativeLanguagePlaceholder: 'Idioma nativo',
    gradePlaceholder: 'Grado',
    agePlaceholder: 'Edad',
    takeTestButton: 'Tomar Prueba de Ubicación',

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
    emailPlaceholder: 'Entrez votre e-mail',
    passwordPlaceholder: 'Entrez votre mot de passe',
    loginButtonText: 'Se Connecter',
    backToWelcome: 'Retour à l\'Accueil',

    // SignUp pages
    signupTitle: 'S\'inscrire',
    confirmPasswordPlaceholder: 'Confirmer le mot de passe',
    continueButton: 'Continuer',

    // SignUpStep2
    namePlaceholder: 'Nom',
    nativeLanguagePlaceholder: 'Langue maternelle',
    gradePlaceholder: 'Niveau',
    agePlaceholder: 'Âge',
    takeTestButton: 'Passer le Test de Placement',

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
  },
  'Punjabi': {
    // Welcome page
    welcomeTitle: 'ਅੰਗਰੇਜ਼ੀ ਸਿੱਖਣ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ',
    welcomeSubtitle: 'ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਮੁਹਾਰਤ ਹਾਸਲ ਕਰਨ ਦੀ ਆਪਣੀ ਯਾਤਰਾ ਸ਼ੁਰੂ ਕਰੋ',
    loginButton: 'ਲੌਗ ਇਨ',
    signupButton: 'ਸਾਈਨ ਅੱਪ',

    // Login page
    loginTitle: 'ਲੌਗ ਇਨ',
    emailPlaceholder: 'ਆਪਣਾ ਈਮੇਲ ਦਰਜ ਕਰੋ',
    passwordPlaceholder: 'ਆਪਣਾ ਪਾਸਵਰਡ ਦਰਜ ਕਰੋ',
    loginButtonText: 'ਲੌਗ ਇਨ',
    backToWelcome: 'ਸਵਾਗਤ ਪੰਨੇ ਤੇ ਵਾਪਸ ਜਾਓ',

    // SignUp pages
    signupTitle: 'ਸਾਈਨ ਅੱਪ',
    confirmPasswordPlaceholder: 'ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ',
    continueButton: 'ਜਾਰੀ ਰੱਖੋ',

    // SignUpStep2
    namePlaceholder: 'ਨਾਮ (ਵਿਕਲਪਿਕ)',
    nativeLanguagePlaceholder: 'ਮਾਤ ਭਾਸ਼ਾ',
    gradePlaceholder: 'ਕਲਾਸ',
    agePlaceholder: 'ਉਮਰ',
    takeTestButton: 'ਪਲੇਸਮੈਂਟ ਟੈਸਟ ਲਓ',

    // Dashboard
    dashboardTitle: 'ਡੈਸ਼ਬੋਰਡ',
    greetingSubtitle: 'ਅੰਗਰੇਜ਼ੀ ਸੁਧਾਰਨ ਲਈ ਤਿਆਰ ਹੋ?',
    menuTitle: 'ਮੀਨੂ',
    progressButton: 'ਤਰੱਕੀ',
    accountButton: 'ਮੇਰਾ ਖਾਤਾ',
    logoutButton: 'ਲੌਗ ਆਉਟ',

    // Placement Test
    testTitle: 'ਪਲੇਸਮੈਂਟ ਟੈਸਟ',
    questionText: 'ਸਵਾਲ',
    nextButton: 'ਅਗਲਾ',
    submitButton: 'ਟੈਸਟ ਜਮ੍ਹਾ ਕਰੋ',
    backButton: 'ਵਾਪਸ',

    // Test Results
    testResults: 'ਟੈਸਟ ਨਤੀਜੇ',
    questionDetails: 'ਸਵਾਲ ਦੇ ਵੇਰਵੇ',
    correct: 'ਸਹੀ',
    incorrect: 'ਗਲਤ',
    total: 'ਕੁੱਲ',
    yourAnswer: 'ਤੁਹਾਡਾ ਜਵਾਬ',
    correctAnswer: 'ਸਹੀ ਜਵਾਬ',
    startLearning: 'ਸਿੱਖਣਾ ਸ਼ੁਰੂ ਕਰੋ',
    noAnswer: 'ਕੋਈ ਜਵਾਬ ਨਹੀਂ'
  },
  'Telugu': {
    // Welcome page
    welcomeTitle: 'ఇంగ్లీష్ నేర్చుకోవడానికి స్వాగతం',
    welcomeSubtitle: 'ఇంగ్లీష్‌లో నిపుణత సాధించే మీ ప్రయాణాన్ని ప్రారంభించండి',
    loginButton: 'లాగిన్',
    signupButton: 'సైన్ అప్',

    // Login page
    loginTitle: 'లాగిన్',
    emailPlaceholder: 'మీ ఇమెయిల్‌ను నమోదు చేయండి',
    passwordPlaceholder: 'మీ పాస్‌వర్డ్‌ను నమోదు చేయండి',
    loginButtonText: 'లాగిన్',
    backToWelcome: 'స్వాగత పేజీకి తిరిగి వెళ్లండి',

    // SignUp pages
    signupTitle: 'సైన్ అప్',
    confirmPasswordPlaceholder: 'పాస్‌వర్డ్‌ను నిర్ధారించండి',
    continueButton: 'కొనసాగించండి',

    // SignUpStep2
    namePlaceholder: 'పేరు (ఐచ్ఛికం)',
    nativeLanguagePlaceholder: 'మాతృభాష',
    gradePlaceholder: 'తరగతి',
    agePlaceholder: 'వయస్సు',
    takeTestButton: 'ప్లేస్‌మెంట్ టెస్ట్ తీసుకోండి',

    // Dashboard
    dashboardTitle: 'డాష్‌బోర్డ్',
    greetingSubtitle: 'మీ ఇంగ్లీష్‌ను మెరుగుపరచడానికి సిద్ధంగా ఉన్నారా?',
    menuTitle: 'మెనూ',
    progressButton: 'పురోగతి',
    accountButton: 'నా ఖాతా',
    logoutButton: 'లాగ్‌అవుట్',

    // Placement Test
    testTitle: 'ప్లేస్‌మెంట్ టెస్ట్',
    questionText: 'ప్రశ్న',
    nextButton: 'తదుపరి',
    submitButton: 'టెస్ట్‌ను సమర్పించండి',
    backButton: 'వెనుకకు',

    // Test Results
    testResults: 'టెస్ట్ ఫలితాలు',
    questionDetails: 'ప్రశ్న వివరాలు',
    correct: 'సరైనది',
    incorrect: 'తప్పు',
    total: 'మొత్తం',
    yourAnswer: 'మీ సమాధానం',
    correctAnswer: 'సరైన సమాధానం',
    startLearning: 'నేర్చుకోవడం ప్రారంభించండి',
    noAnswer: 'సమాధానం లేదు'
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
