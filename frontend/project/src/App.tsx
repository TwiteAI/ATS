import { useState } from 'react';
import { CircuitBoard } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { CandidateProvider } from './context/CandidateContext';
import { login, signup } from './utils/api'; // Importing API functions

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle user login
  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      const response = await login(credentials);
      if (response.success) {
        setIsAuthenticated(true);
      } else {
        console.error('Login failed:', response.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Handle user signup
  const handleSignup = async (userData: {
    name: string;  // Expecting 'name' from SignupForm
    email: string;
    company_name: string;
    job_title: string;
    phone: string;
    password: string;
    confirm_password: string;
  }) => {
    try {
      const response = await signup({
        username: userData.name,  // Map 'name' to 'username'
        email: userData.email,
        company_name: userData.company_name,
        role: userData.job_title,  // Map 'job_title' to 'role'
        phone: userData.phone,
        password: userData.password,
        confirm_password: userData.confirm_password,
      });
  
      if (response.success) {
        setIsAuthenticated(true);
      } else {
        console.error('Signup failed:', response.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };
  

  if (isAuthenticated) {
    return (
      <CandidateProvider>
        <div className="min-h-screen bg-[#020817] relative overflow-hidden">
          {/* Wave Background */}
          <div
            className="absolute inset-0 z-0 opacity-30"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557264322-b44d383a2906?auto=format&fit=crop&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(3px)',
            }}
          />
          <div className="relative z-10">
            <Navbar onLogout={() => setIsAuthenticated(false)} />
            <Dashboard />
          </div>
        </div>
        <Toaster position="top-right" />
      </CandidateProvider>
    );
  }

  return (
    <div className="min-h-screen bg-[#020817] relative overflow-hidden">
      {/* Wave Background */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1557264322-b44d383a2906?auto=format&fit=crop&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(3px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {showSignup ? (
          <>
            <Navbar />
            <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <div className="flex items-center gap-2 mb-6">
                  <CircuitBoard className="h-12 w-12 text-cyan-400" />
                  <h1 className="text-4xl font-bold tracking-wider">TWITE AI</h1>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
                  alt="360 Recruitment Automation"
                  className="rounded-lg shadow-xl mb-8 max-w-md"
                />
              </div>
              <SignupForm onSwitch={() => setShowSignup(false)} onSignupSuccess={handleSignup} />
            </div>
          </>
        ) : (
          <div className="min-h-screen flex flex-col">
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center gap-2">
                <CircuitBoard className="h-8 w-8 text-cyan-400" />
                <h1 className="text-3xl font-bold tracking-wider text-white">TWITE AI TECHNOLOGIES</h1>
              </div>
              <button
                onClick={() => setShowSignup(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                SIGN UP
              </button>
            </div>

            <div className="flex-1 container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <h2 className="text-4xl font-bold mb-6 leading-tight">
                  ATS - An Application Tracking System (ATS) simplifies recruitment by automating job
                  application screening, keyword matching, and candidate management, ensuring efficiency.
                </h2>
              </div>
              <LoginForm onSwitch={() => setShowSignup(true)} onLoginSuccess={handleLogin} />
            </div>
          </div>
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
