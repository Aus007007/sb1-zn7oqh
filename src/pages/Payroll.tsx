import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Download, FileText, DollarSign, Settings, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { payrollService } from '../services/payrollService';
import SalaryStructureForm from '../components/payroll/SalaryStructureForm';

export default function PayrollPage() {
  const [selectedMonth, setSelectedMonth] = React.useState(
    new Date().toISOString().slice(0, 7)
  );
  const [showStructureModal, setShowStructureModal] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: payrollData, isLoading } = useQuery({
    queryKey: ['payroll', selectedMonth],
    queryFn: async () => {
      // Simulated API call
      return [
        {
          id: '1',
          employeeId: 'EMP001',
          name: 'John Doe',
          basicSalary: 50000,
          hra: 25000,
          specialAllowance: 15000,
          totalEarnings: 90000,
          pf: 6000,
          tax: 8000,
          totalDeductions: 14000,
          netPay: 76000,
        },
      ];
    },
  });

  const updateSalaryStructure = useMutation({
    mutationFn: async ({ employeeId, components }: any) => {
      await payrollService.updateSalaryStructure(employeeId, components);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payroll'] });
      setShowStructureModal(false);
      toast.success('Salary structure updated successfully');
    },
    onError: () => {
      toast.error('Failed to update salary structure');
    },
  });

  const handleViewPayslip = async (employeeId: string) => {
    try {
      await payrollService.viewPayslip(employeeId, selectedMonth);
    } catch (error) {
      toast.error('Failed to view payslip');
    }
  };

  const handleDownloadPayslip = async (employeeId: string) => {
    try {
      await payrollService.downloadPayslip(employeeId, selectedMonth);
      toast.success('Payslip downloaded successfully');
    } catch (error) {
      toast.error('Failed to download payslip');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
        <div className="flex items-center space-x-4">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Basic Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  HRA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Special Allowance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Earnings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deductions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Pay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payrollData?.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{employee.basicSalary.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{employee.hra.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{employee.specialAllowance.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{employee.totalEarnings.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{employee.totalDeductions.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{employee.netPay.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewPayslip(employee.employeeId)}
                        className="text-blue-600 hover:text-blue-800"
                        title="View Payslip"
                      >
                        <FileText className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDownloadPayslip(employee.employeeId)}
                        className="text-green-600 hover:text-green-800"
                        title="Download Payslip"
                      >
                        <Download className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedEmployee(employee.employeeId);
                          setShowStructureModal(true);
                        }}
                        className="text-purple-600 hover:text-purple-800"
                        title="Configure Salary Structure"
                      >
                        <Settings className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Salary Structure Modal */}
      {showStructureModal && selectedEmployee && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                Configure Salary Structure
              </h2>
              <button
                onClick={() => setShowStructureModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <X className="h-6 w-6" />
              </button>
            </div>
            <SalaryStructureForm
              employeeId={selectedEmployee}
              onSubmit={(data) =>
                updateSalaryStructure.mutate({
                  employeeId: selectedEmployee,
                  components: data.components,
                })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}