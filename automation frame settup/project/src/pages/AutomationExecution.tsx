import React, { useState } from 'react';
import { Play, FileText } from 'lucide-react';
import FileUpload from '../components/FileUpload';

function AutomationExecution() {
  const [showUpload, setShowUpload] = useState(false);

  const handleFileUpload = (files: File[]) => {
    // Handle test data file upload logic here
    console.log('Uploaded test data files:', files);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Automation Execution</h2>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FileText className="h-4 w-4 mr-2" />
          Upload Test Data
        </button>
      </div>

      {showUpload && (
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
          <FileUpload
            accept={{
              'application/json': ['.json'],
              'text/plain': ['.txt'],
              'application/x-yaml': ['.yml', '.yaml'],
              'text/csv': ['.csv']
            }}
            onUpload={handleFileUpload}
            title="Upload Test Data Files"
            description="Drag and drop your test data files here, or click to select files"
          />
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Test Execution Queue</h3>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Execution
            </button>
          </div>
          
          <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Test Case
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Framework
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    Sample Test Case
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Playwright
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AutomationExecution;