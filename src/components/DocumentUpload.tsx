import React from 'react';
import { Upload, File, X } from 'lucide-react';

interface DocumentUploadProps {
  onUpload: (files: FileList) => void;
  acceptedTypes?: string;
  maxSize?: number;
  multiple?: boolean;
}

function DocumentUpload({
  onUpload,
  acceptedTypes = '.pdf,.doc,.docx',
  maxSize = 5242880, // 5MB
  multiple = false,
}: DocumentUploadProps) {
  const [dragActive, setDragActive] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const validFiles = Array.from(fileList).filter(
      (file) => file.size <= maxSize
    );
    setFiles(validFiles);
    onUpload(fileList);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={acceptedTypes}
          onChange={handleChange}
          className="hidden"
        />

        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Click to upload
            </button>{' '}
            or drag and drop
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {acceptedTypes.split(',').join(', ')} up to{' '}
            {Math.round(maxSize / 1024 / 1024)}MB
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-2">
                <File className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-700">{file.name}</span>
                <span className="text-xs text-gray-500">
                  ({Math.round(file.size / 1024)} KB)
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DocumentUpload;