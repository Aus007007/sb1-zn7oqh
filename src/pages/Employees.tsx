import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Plus, Download, FileText } from 'lucide-react';
import { toast } from 'react-hot-toast';
import EmployeeForm from '../components/employees/EmployeeForm';
import EmployeeTable from '../components/employees/EmployeeTable';
import { employeeService } from '../services/employeeService';

export default function EmployeesPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const { data: employees, isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: employeeService.getEmployees
  });

  const handleRowClick = (employeeId: string) => {
    navigate(`/employee/profile/${employeeId}`);
  };

  // ... rest of the component remains the same

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
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <EmployeeTable 
        employees={employees || []} 
        isLoading={isLoading} 
        onRowClick={handleRowClick}
      />

      {/* Add Employee Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Add New Employee</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <Plus className="h-6 w-6 transform rotate-45" />
              </button>
            </div>
            <EmployeeForm 
              onSubmit={(data) => addEmployeeMutation.mutate(data)}
              isSubmitting={addEmployeeMutation.isPending}
              onCancel={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}