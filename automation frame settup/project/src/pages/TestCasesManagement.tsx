import React, { useState } from 'react';
import { Check, X, Sparkles, Upload } from 'lucide-react';
import FileUpload from '../components/FileUpload';

interface TestCase {
  id: string;
  name: string;
  framework: string;
  languages: string[];
  utilities: string[];
}

const frameworks = ['Playwright', 'Cucumber', 'Selenium', 'Cypress'];
const languages = ['Python', 'JavaScript', 'Java'];
const utilities = ['Jira', 'Azure', 'Appium'];

function TestCasesManagement() {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [selectedFramework, setSelectedFramework] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedUtilities, setSelectedUtilities] = useState<string[]>([]);
  const [testCaseName, setTestCaseName] = useState('');
  const [showImport, setShowImport] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages(prev =>
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const handleUtilityToggle = (utility: string) => {
    setSelectedUtilities(prev =>
      prev.includes(utility)
        ? prev.filter(u => u !== utility)
        : [...prev, utility]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testCaseName || !selectedFramework) return;

    setIsGenerating(true);

    // Simulate generation process
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newTestCase: TestCase = {
      id: Date.now().toString(),
      name: testCaseName,
      framework: selectedFramework,
      languages: selectedLanguages,
      utilities: selectedUtilities
    };

    setTestCases(prev => [...prev, newTestCase]);
    setTestCaseName('');
    setSelectedFramework('');
    setSelectedLanguages([]);
    setSelectedUtilities([]);
    setIsGenerating(false);
  };

  const deleteTestCase = (id: string) => {
    setTestCases(prev => prev.filter(tc => tc.id !== id));
  };

  const handleFileUpload = (files: File[]) => {
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const importedTestCases = JSON.parse(content);
          if (Array.isArray(importedTestCases)) {
            setTestCases(prev => [...prev, ...importedTestCases]);
          }
        } catch (error) {
          console.error('Error parsing file:', error);
        }
      };
      reader.readAsText(file);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-glow">Test Cases Management</h2>
        <button
          onClick={() => setShowImport(!showImport)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600/30 hover:bg-blue-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 backdrop-blur-sm transition-all duration-200"
        >
          <Upload className="h-4 w-4 mr-2" />
          Import Test Cases
        </button>
      </div>

      {showImport && (
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
          <FileUpload
            accept={{
              'application/json': ['.json'],
              'text/csv': ['.csv'],
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
              'application/vnd.ms-excel': ['.xls']
            }}
            onUpload={handleFileUpload}
            title="Upload Test Cases"
            description="Drag and drop your test case files here, or click to select files"
          />
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-glow-blue mb-4">
            Create Test Case
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-glow-purple">
                Test Case Name
              </label>
              <input
                type="text"
                value={testCaseName}
                onChange={(e) => setTestCaseName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 bg-blue-950/30 text-glow shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 sm:text-sm backdrop-blur-sm"
                placeholder="Enter test case name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-glow-purple">
                Framework
              </label>
              <select
                value={selectedFramework}
                onChange={(e) => setSelectedFramework(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 bg-blue-950/30 text-glow shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 sm:text-sm backdrop-blur-sm"
              >
                <option value="">Select Framework</option>
                {frameworks.map(framework => (
                  <option key={framework} value={framework}>
                    {framework}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-glow-purple mb-2">
                Languages
              </label>
              <div className="flex flex-wrap gap-4">
                {languages.map(language => (
                  <label key={language} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedLanguages.includes(language)}
                      onChange={() => handleLanguageToggle(language)}
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-glow-blue">
                      {language}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-glow-purple mb-2">
                Utilities
              </label>
              <div className="flex flex-wrap gap-4">
                {utilities.map(utility => (
                  <label key={utility} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedUtilities.includes(utility)}
                      onChange={() => handleUtilityToggle(utility)}
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-glow-blue">
                      {utility}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isGenerating}
                className={`
                  inline-flex items-center px-6 py-3 border border-transparent rounded-md text-base font-medium
                  ${isGenerating 
                    ? 'bg-blue-600/30 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600/50 to-purple-600/50 hover:from-blue-500/60 hover:to-purple-500/60'
                  }
                  text-glow shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  backdrop-blur-sm transition-all duration-300 relative overflow-hidden
                `}
              >
                <Sparkles className={`h-5 w-5 mr-2 ${isGenerating ? 'animate-spin' : 'animate-pulse'}`} />
                {isGenerating ? 'Generating...' : 'Generate Test Case'}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-glow-blue">
            Test Cases
          </h3>
          <div className="mt-5">
            {testCases.length === 0 ? (
              <p className="text-glow-purple opacity-60">No test cases generated yet.</p>
            ) : (
              <div className="space-y-4">
                {testCases.map(testCase => (
                  <div
                    key={testCase.id}
                    className="border border-blue-500/20 rounded-lg p-4 bg-blue-950/20 backdrop-blur-sm hover:border-blue-400/30 transition-all duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-medium text-glow">
                          {testCase.name}
                        </h4>
                        <p className="text-sm text-glow-blue opacity-80">
                          Framework: {testCase.framework}
                        </p>
                        <p className="text-sm text-glow-purple opacity-80">
                          Languages: {testCase.languages.join(', ')}
                        </p>
                        <p className="text-sm text-glow-blue opacity-80">
                          Utilities: {testCase.utilities.join(', ')}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteTestCase(testCase.id)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-200"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestCasesManagement;