import React from 'react';
import { CircuitBoard, LogOut, User } from 'lucide-react';

interface NavbarProps {
  onLogout?: () => void;
  isAuthenticated: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout, isAuthenticated }) => {
  return (
    <nav className="bg-gray-900 shadow-md border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <CircuitBoard className="h-6 w-6 text-cyan-400" />
            <span className="text-xl font-bold text-white">Twite AI</span>
          </div>
          
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#" className="text-white hover:text-cyan-400 border-b-2 border-cyan-400 pb-1">Dashboard</a>
                <a href="#" className="text-gray-300 hover:text-cyan-400">Candidates</a>
                <a href="#" className="text-gray-300 hover:text-cyan-400">Jobs</a>
                <a href="#" className="text-gray-300 hover:text-cyan-400">Reports</a>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-white">
                  <User size={20} className="text-cyan-400" />
                  <span>Twite AI</span>
                </div>
                
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="flex items-center gap-1 text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center">
              <a href="#" className="text-gray-300 hover:text-cyan-400 mr-6">Home</a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 mr-6">Features</a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 mr-6">Pricing</a>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
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