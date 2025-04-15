import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Settings, Play, GitBranch, Moon, Sun } from 'lucide-react';
import TestCasesManagement from './pages/TestCasesManagement';
import AutomationExecution from './pages/AutomationExecution';
import PipelineConfig from './pages/PipelineConfig';

function App() {
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 min-h-screen relative overflow-hidden">
          {/* Futuristic Grid Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute w-full h-full bg-tech-grid opacity-30" />
            <div className="absolute w-full h-full bg-tech-grid opacity-20 transform scale-75 rotate-45" />
            {/* Glowing Particles */}
            <div className="absolute inset-0">
              <div className="absolute -inset-[10px] bg-repeat particle-effect opacity-40" />
              <div className="absolute -inset-[10px] bg-repeat particle-effect opacity-30 transform scale-150" />
              <div className="absolute -inset-[10px] bg-repeat particle-effect opacity-20 transform scale-200" />
            </div>
            {/* Radial Overlay */}
            <div className="absolute inset-0 bg-radial-overlay" />
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <nav className="bg-blue-900/50 shadow-lg backdrop-blur-sm border-b border-blue-700/50">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                      <Settings className="h-8 w-8 text-primary" />
                      <span className="ml-2 text-xl font-bold text-glow">
                        Automation Framework
                      </span>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                      <Link
                        to="/"
                        className="text-glow-blue hover:text-glow px-3 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        <Settings className="inline-block h-5 w-5 mr-1" />
                        Test Cases
                      </Link>
                      <Link
                        to="/execution"
                        className="text-glow-purple hover:text-glow px-3 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        <Play className="inline-block h-5 w-5 mr-1" />
                        Execution
                      </Link>
                      <Link
                        to="/pipeline"
                        className="text-glow-blue hover:text-glow px-3 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        <GitBranch className="inline-block h-5 w-5 mr-1" />
                        Pipeline
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={toggleDarkMode}
                      className="p-2 rounded-lg bg-blue-800/50 text-primary hover:text-glow transition-colors"
                    >
                      {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<TestCasesManagement />} />
                <Route path="/execution" element={<AutomationExecution />} />
                <Route path="/pipeline" element={<PipelineConfig />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;