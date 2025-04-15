import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, AlertCircle, CheckCircle2 } from 'lucide-react';

interface FileUploadProps {
  accept: Record<string, string[]>;
  onUpload: (files: File[]) => void;
  maxSize?: number;
  title: string;
  description: string;
}

function FileUpload({ accept, onUpload, maxSize = 5242880, title, description }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles);
  }, [onUpload]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    acceptedFiles,
    fileRejections
  } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: true
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
          ${isDragActive ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-300 dark:border-gray-600'}
          ${isDragReject ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : ''}
          hover:border-indigo-500 dark:hover:border-indigo-400
        `}
      >
        <input {...getInputProps()} />
        <Upload 
          className={`
            mx-auto h-12 w-12 mb-4
            ${isDragActive ? 'text-indigo-500' : 'text-gray-400'}
            ${isDragReject ? 'text-red-500' : ''}
          `}
        />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>

      {acceptedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
            <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
            Accepted Files
          </h4>
          {acceptedFiles.map(file => (
            <div
              key={file.name}
              className="flex items-center p-2 bg-green-50 dark:bg-green-900/20 rounded"
            >
              <File className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm text-green-700 dark:text-green-400">
                {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </span>
            </div>
          ))}
        </div>
      )}

      {fileRejections.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
            <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
            Rejected Files
          </h4>
          {fileRejections.map(({ file, errors }) => (
            <div
              key={file.name}
              className="flex items-center p-2 bg-red-50 dark:bg-red-900/20 rounded"
            >
              <File className="h-4 w-4 text-red-500 mr-2" />
              <span className="text-sm text-red-700 dark:text-red-400">
                {file.name} - {errors[0].message}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileUpload;