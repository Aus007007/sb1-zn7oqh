import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Download, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmployeeTable from '../../components/employees/EmployeeTable';

export default function CompanyEmployees() {
  const { data: employees, isLoading } = useQuery({
    queryKey: ['company-employees'],
    queryFn: async () => {
      // Simulated API call
      return [
        {
          id: 'EMP001',
          name: 'John Doe',
          email: 'john@example.com',
          department: 'Engineering',
          position: 'Senior Developer',
          joinDate: '2024-01-15',
          status: 'active',
        },
      ];
    },
  });

  const handleExport = (format: 'excel' | 'pdf') => {
    // Handle export functionality
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => handleExport('excel')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <FileText className="h-4 w-4 mr-2" />
            Export PDF
          </button>
          <Link
            to="/company/employees/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
          </Link>
        </div>
      </div>

      <EmployeeTable 
        employees={employees || []} 
        isLoading={isLoading}
      />
    </div>
  );
}