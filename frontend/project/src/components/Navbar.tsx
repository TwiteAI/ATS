import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure correct import
import { CircuitBoard, LogOut, User } from 'lucide-react';

interface NavbarProps {
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogout?: () => Promise<void>;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLoginClick, onLogout }) => {
  const navigate = useNavigate(); // Use react-router-dom navigation

  return (
    <nav className="bg-gray-900 shadow-md border-b border-gray-800 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <CircuitBoard className="h-8 w-8 text-cyan-400" />
            <span className="text-2xl font-bold text-white">Twite AI</span>
          </div>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-8">
              <a href="#" className="text-white hover:text-cyan-400 border-b-2 border-cyan-400 pb-1">Dashboard</a>
              <a href="#" className="text-gray-300 hover:text-cyan-400">Candidates</a>
              <a href="#" className="text-gray-300 hover:text-cyan-400">Jobs</a>
              <a href="#" className="text-gray-300 hover:text-cyan-400">Reports</a>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-white">
                  <User size={20} className="text-cyan-400" />
                  <span>Twite AI</span>
                </div>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              {/* ✅ Clicking Home navigates back to the homepage */}
              <button
                onClick={() => navigate('/')}
                className="text-gray-300 hover:text-cyan-400"
              >
                Home
              </button>
              <a href="#" className="text-gray-300 hover:text-cyan-400">Features</a>
              <a href="#" className="text-gray-300 hover:text-cyan-400">Pricing</a>
              <a href="#" className="text-gray-300 hover:text-cyan-400">Contact Us</a>

              {/* ✅ Single Login/Signup button that navigates to login */}
              <button
                onClick={onLoginClick}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login/Signup
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
