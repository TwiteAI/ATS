import { useState, useEffect } from 'react';
import { CircuitBoard } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import { CandidateProvider } from './context/CandidateContext';
import { getSession } from './utils/auth';
import toast from 'react-hot-toast';
import { supabase } from './utils/supabase';

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsAuthenticated(true);
        setShowHome(false);
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setShowHome(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkAuth = async () => {
    try {
      const session = await getSession();
      if (session) {
        setIsAuthenticated(true);
        setShowHome(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      toast.error('Authentication check failed. Please try logging in again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setShowHome(true);
      toast.success('Logged out successfully');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error('Logout failed: ' + (error.message || 'Unknown error'));
    }
  };

  const handleLoginSuccess = async () => {
    setIsAuthenticated(true);
    setShowHome(false);
  };

  const handleSignupSuccess = async () => {
    setIsAuthenticated(true);
    setShowHome(false);
  };

  const handleHomeClick = () => {
    setShowHome(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <CandidateProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900">
          <Navbar 
            onLogout={handleLogout} 
            isAuthenticated={isAuthenticated}
            onHomeClick={handleHomeClick}
          />
          {showHome ? <HomePage onGetStarted={() => setShowHome(false)} /> : <Dashboard />}
        </div>
        <Toaster position="top-right" />
      </CandidateProvider>
    );
  }

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900">
        <Navbar 
          isAuthenticated={isAuthenticated}
          onLoginClick={() => setShowHome(false)}
          onSignupClick={() => {
            setShowHome(false);
            setShowSignup(true);
          }}
        />
        <ForgotPassword onBack={() => setShowForgotPassword(false)} />
        <Toaster position="top-right" />
      </div>
    );
  }

  if (showHome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900">
        <Navbar 
          isAuthenticated={isAuthenticated}
          onLoginClick={() => setShowHome(false)}
          onSignupClick={() => {
            setShowHome(false);
            setShowSignup(true);
          }}
        />
        <HomePage 
          onGetStarted={() => {
            setShowHome(false);
            setShowSignup(true);
          }}
        />
        <Toaster position="top-right" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900">
      <Navbar 
        isAuthenticated={isAuthenticated}
        onLoginClick={() => setShowSignup(false)}
        onSignupClick={() => setShowSignup(true)}
      />
      
      <div className="container mx-auto px-4 py-8">
        {showSignup ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-6">
                <CircuitBoard className="h-12 w-12 text-cyan-400" />
                <h1 className="text-4xl font-bold tracking-wider">TWITE AI</h1>
              </div>
              <h2 className="text-3xl font-bold mb-6 leading-tight">
                Create your account to start managing candidates efficiently
              </h2>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" 
                alt="360 Recruitment Automation" 
                className="rounded-lg shadow-xl mb-8 max-w-md"
              />
            </div>
            <SignupForm 
              onSwitch={() => setShowSignup(false)}
              onSignupSuccess={handleSignupSuccess}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-6">
                <CircuitBoard className="h-12 w-12 text-cyan-400" />
                <h1 className="text-4xl font-bold tracking-wider">TWITE AI</h1>
              </div>
              <h2 className="text-3xl font-bold mb-6 leading-tight">
                ATS - An Application Tracking System (ATS) simplifies recruitment by automating job application screening, keyword matching, and candidate management.
              </h2>
              <button 
                onClick={() => setShowSignup(true)}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mt-6"
              >
                Create Account
              </button>
            </div>
            <LoginForm 
              onSwitch={() => setShowSignup(true)}
              onForgotPassword={() => setShowForgotPassword(true)}
              onLoginSuccess={handleLoginSuccess}
            />
          </div>
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
