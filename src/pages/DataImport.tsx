import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const importSchema = z.object({
  type: z.enum(['employees', 'attendance', 'leaves', 'payroll']),
  fileType: z.enum(['csv', 'excel', 'json']),
  file: z.instanceof(FileList),
  dateFormat: z.string().optional(),
  skipRows: z.number().optional(),
});

type ImportForm = z.infer<typeof importSchema>;

function DataImport() {
  const [importStatus, setImportStatus] = React.useState<{
    status: 'idle' | 'processing' | 'success' | 'error';
    message?: string;
    progress?: number;
  }>({ status: 'idle' });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ImportForm>({
    resolver: zodResolver(importSchema),
  });

  const selectedType = watch('type');

  const onSubmit = async (data: ImportForm) => {
    setImportStatus({ status: 'processing', progress: 0 });
    
    // Simulated import process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setImportStatus({ status: 'processing', progress: i });
    }

    setImportStatus({
      status: 'success',
      message: 'Data imported successfully!',
    });
  };

  const getFieldMapping = (type: string) => {
    switch (type) {
      case 'employees':
        return [
          'Employee ID',
          'Name',
          'Email',
          'Department',
          'Position',
          'Join Date',
          'Reporting To',
          'Contact Number',
        ];
      case 'attendance':
        return [
          'Employee ID',
          'Date',
          'Check In',
          'Check Out',
          'Status',
          'Location',
        ];
      case 'leaves':
        return [
          'Employee ID',
          'Leave Type',
          'Start Date',
          'End Date',
          'Reason',
          'Status',
        ];
      case 'payroll':
        return [
          'Employee ID',
          'Basic Salary',
          'HRA',
          'DA',
          'Special Allowance',
          'PF',
          'Professional Tax',
          'TDS',
        ];
      default:
        return [];
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Import Data
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Data Type
              </label>
              <select
                {...register('type')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="employees">Employees</option>
                <option value="attendance">Attendance</option>
                <option value="leaves">Leaves</option>
                <option value="payroll">Payroll</option>
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                File Type
              </label>
              <select
                {...register('fileType')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="csv">CSV</option>
                <option value="excel">Excel</option>
                <option value="json">JSON</option>
              </select>
              {errors.fileType && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.fileType.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload File
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
                      accept=".csv,.xlsx,.json"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  CSV, Excel, or JSON up to 10MB
                </p>
              </div>
            </div>
            {errors.file && (
              <p className="mt-1 text-sm text-red-600">{errors.file.message}</p>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Expected Fields
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {getFieldMapping(selectedType).map((field) => (
                <div
                  key={field}
                  className="flex items-center text-sm text-gray-600"
                >
                  <FileText className="h-4 w-4 mr-2 text-gray-400" />
                  {field}
                </div>
              ))}
            </div>
          </div>

          {importStatus.status !== 'idle' && (
            <div
              className={`p-4 rounded-md ${
                importStatus.status === 'processing'
                  ? 'bg-blue-50'
                  : importStatus.status === 'success'
                  ? 'bg-green-50'
                  : 'bg-red-50'
              }`}
            >
              {importStatus.status === 'processing' ? (
                <div>
                  <div className="flex items-center">
                    <div className="mr-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    </div>
                    <div>Processing... {importStatus.progress}%</div>
                  </div>
                  <div className="mt-2 h-2 bg-blue-200 rounded-full">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${importStatus.progress}%` }}
                    ></div>
                  </div>
                </div>
              ) : importStatus.status === 'success' ? (
                <div className="flex items-center text-green-800">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  {importStatus.message}
                </div>
              ) : (
                <div className="flex items-center text-red-800">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  {importStatus.message}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={importStatus.status === 'processing'}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Import
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DataImport;