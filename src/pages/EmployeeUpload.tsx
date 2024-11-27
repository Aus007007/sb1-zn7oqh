import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, Download, AlertCircle, CheckCircle } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const uploadSchema = z.object({
  file: z.instanceof(FileList),
  sendInvites: z.boolean().default(true),
});

type UploadForm = z.infer<typeof uploadSchema>;

function EmployeeUpload() {
  const [uploadStatus, setUploadStatus] = React.useState<{
    status: 'idle' | 'processing' | 'success' | 'error';
    message?: string;
    progress?: number;
  }>({ status: 'idle' });

  const { register, handleSubmit, formState: { errors } } = useForm<UploadForm>({
    resolver: zodResolver(uploadSchema),
  });

  const uploadEmployees = useMutation({
    mutationFn: async (data: UploadForm) => {
      const formData = new FormData();
      if (data.file[0]) {
        formData.append('file', data.file[0]);
      }
      formData.append('sendInvites', String(data.sendInvites));

      const response = await axios.post('/api/employees/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadStatus({ status: 'processing', progress });
        },
      });
      return response.data;
    },
  });

  const onSubmit = async (data: UploadForm) => {
    try {
      setUploadStatus({ status: 'processing', progress: 0 });
      await uploadEmployees.mutateAsync(data);
      setUploadStatus({
        status: 'success',
        message: 'Employees uploaded successfully! Invitations will be sent shortly.',
      });
    } catch (error) {
      setUploadStatus({
        status: 'error',
        message: 'Failed to upload employees. Please try again.',
      });
    }
  };

  const downloadTemplate = () => {
    window.location.href = '/api/employees/template';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Upload className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Upload Employees
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Upload your employee data using our template
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-6">
            <button
              onClick={downloadTemplate}
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Template
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Employee Data
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 hover:text-blue-500">
                      <span>Upload a file</span>
                      <input
                        {...register('file')}
                        type="file"
                        className="sr-only"
                        accept=".csv,.xlsx"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    CSV or Excel files only
                  </p>
                </div>
              </div>
              {errors.file && (
                <p className="mt-1 text-sm text-red-600">{errors.file.message}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                {...register('sendInvites')}
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Send email invitations to employees
              </label>
            </div>

            {uploadStatus.status !== 'idle' && (
              <div
                className={`p-4 rounded-md ${
                  uploadStatus.status === 'processing'
                    ? 'bg-blue-50'
                    : uploadStatus.status === 'success'
                    ? 'bg-green-50'
                    : 'bg-red-50'
                }`}
              >
                {uploadStatus.status === 'processing' ? (
                  <div>
                    <div className="flex items-center">
                      <div className="mr-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                      </div>
                      <div>Processing... {uploadStatus.progress}%</div>
                    </div>
                    <div className="mt-2 h-2 bg-blue-200 rounded-full">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${uploadStatus.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ) : uploadStatus.status === 'success' ? (
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    <span className="text-green-800">{uploadStatus.message}</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                    <span className="text-red-800">{uploadStatus.message}</span>
                  </div>
                )}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={uploadStatus.status === 'processing'}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                Upload Employees
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmployeeUpload;