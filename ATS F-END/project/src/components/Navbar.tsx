import React from 'react';
import { CircuitBoard, LogOut } from 'lucide-react';

interface NavbarProps {
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  return (
    <nav className="bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <CircuitBoard className="h-8 w-8 text-cyan-400" />
            <span className="text-2xl font-bold text-white">TWITE AI</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white hover:text-cyan-400">Home</a>
            <a href="#" className="text-white hover:text-cyan-400">Details</a>
            <a href="#" className="text-white hover:text-cyan-400">Contact Us</a>
            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-2 text-white hover:text-red-400 transition-colors"
              >
                <LogOut size={20} />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar