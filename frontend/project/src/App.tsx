import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import { CandidateProvider } from './context/CandidateContext';
import { getSession, logout } from './utils/auth';
import toast from 'react-hot-toast';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // ✅ Use `useNavigate` for redirection

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking authentication status...");
        const session = await getSession(); // ✅ Decode token for session check
        console.log("Session data:", session);

        if (session && session.email) {
          console.log("User is authenticated:", session.email);
          setIsAuthenticated(true);
          setShowHome(false);
        } else {
          console.log("No active session found");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        toast.error('Authentication check failed. Please log in again.');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      console.log("Attempting to sign out...");
      await logout();
      console.log("User signed out successfully");
      setIsAuthenticated(false);
      setShowHome(true);
      toast.success('Logged out successfully');
      navigate('/'); // ✅ Redirect to Home after logout
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <CandidateProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900">
        <Navbar
          isAuthenticated={isAuthenticated}
          onLoginClick={() => {
            setShowSignup(false);
            setShowHome(false);
          }}
          onSignupClick={() => setShowSignup(true)}
          onLogout={isAuthenticated ? handleLogout : undefined}
        />

        {isAuthenticated ? (
          <Dashboard />
        ) : showForgotPassword ? (
          <ForgotPassword onBack={() => setShowForgotPassword(false)} />
        ) : showHome ? (
          <HomePage onGetStarted={() => setShowSignup(true)} />
        ) : showSignup ? (
          <SignupForm
            onSwitch={() => setShowSignup(false)}
            onSignupSuccess={() => {
              setIsAuthenticated(true);
              navigate('/dashboard'); // ✅ Redirect after signup
            }}
          />
        ) : (
          <LoginForm
            onSwitch={() => setShowSignup(true)}
            onForgotPassword={() => setShowForgotPassword(true)}
            onLoginSuccess={() => {
              setIsAuthenticated(true);
              navigate('/dashboard'); // ✅ Redirect after login
            }}
          />
        )}
      </div>
      <Toaster position="top-right" />
    </CandidateProvider>
  );
}

export default App;
