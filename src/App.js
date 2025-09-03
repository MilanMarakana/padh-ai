import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Welcome from './componets/Welcome';
import Login from './componets/Login';
import SignUp from './componets/SignUp';
import Dashboard from './page/deshboard';
import PlacementTest from './componets/PlacementTest';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Main App component
const AppContent = () => {
  const { user } = useAuth();

  // Global navigation prevention when user is authenticated
  useEffect(() => {
    if (user && window.location.pathname === '/dashboard') {
      // Completely disable browser navigation when on dashboard
      const preventBackNavigation = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Push current state again to prevent navigation
        window.history.pushState(null, null, window.location.href);
        return false;
      };

      // Push initial state to prevent back navigation
      window.history.pushState(null, null, window.location.href);
      window.addEventListener('popstate', preventBackNavigation);
      
      // Disable keyboard shortcuts
      const preventKeyboardNavigation = (e) => {
        if (e.key === 'Backspace' || e.key === 'Alt+Left' || e.key === 'ArrowLeft') {
          e.preventDefault();
          return false;
        }
      };
      
      document.addEventListener('keydown', preventKeyboardNavigation);
      
      return () => {
        window.removeEventListener('popstate', preventBackNavigation);
        document.removeEventListener('keydown', preventKeyboardNavigation);
      };
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/placement-test" element={<PlacementTest />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
