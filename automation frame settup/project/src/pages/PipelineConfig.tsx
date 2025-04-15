import React, { useState } from 'react';
import { GitBranch, Upload } from 'lucide-react';
import FileUpload from '../components/FileUpload';

function PipelineConfig() {
  const [showUpload, setShowUpload] = useState(false);

  const handleFileUpload = (files: File[]) => {
    // Handle pipeline configuration file upload logic here
    console.log('Uploaded pipeline config files:', files);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pipeline Configuration</h2>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Config
        </button>
      </div>

      {showUpload && (
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
          <FileUpload
            accept={{
              'application/x-yaml': ['.yml', '.yaml'],
              'application/json': ['.json'],
              'text/plain': ['.txt']
            }}
            onUpload={handleFileUpload}
            title="Upload Pipeline Configuration"
            description="Drag and drop your pipeline configuration files here (YAML, JSON)"
          />
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">CI/CD Integration</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400">
                <div className="flex-shrink-0">
                  <GitBranch className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <a href="#" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">GitHub Actions</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">Configure GitHub Actions workflow</p>
                  </a>
                </div>
              </div>

              <div className="relative rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400">
                <div className="flex-shrink-0">
                  <GitBranch className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <a href="#" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Jenkins</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">Set up Jenkins pipeline</p>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Pipeline Triggers</h3>
            <div className="mt-4 space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  On Push to Main Branch
                </span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  On Pull Request
                </span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Scheduled (Daily)
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PipelineConfig;