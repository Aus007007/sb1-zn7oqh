import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import LeaveForm from '../../components/leaves/LeaveForm';
import LeaveHistory from '../../components/leaves/LeaveHistory';
import HolidayCalendar from '../../components/leaves/HolidayCalendar';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'react-hot-toast';

const LeavePolicy = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-lg font-medium text-gray-900 mb-4">Leave Policy</h2>
    <div className="prose">
      <p>Our company leave policy guidelines...</p>
    </div>
  </div>
);

const CompOffRequest = () => (
  <div className="space-y-6">
    <h2 className="text-lg font-medium text-gray-900">Request Comp Off</h2>
    {/* Comp off request form would go here */}
  </div>
);

export default function EmployeeLeaves() {
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLeaveSubmit = async (data: any) => {
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Leave request submitted successfully');
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to submit leave request');
    }
  };

  const getView = () => {
    switch (currentPath) {
      case '/employee/leaves/history':
        return <LeaveHistory />;
      case '/employee/leaves/calendar':
        return <HolidayCalendar />;
      case '/employee/leaves/policy':
        return <LeavePolicy />;
      case '/employee/leaves/comp-off':
        return <CompOffRequest />;
      default:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Apply Leave
              </button>
            </div>

            {/* Leave Application Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Apply for Leave
                    </h2>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Close</span>
                      <Plus className="h-6 w-6 transform rotate-45" />
                    </button>
                  </div>
                  <LeaveForm
                    onSubmit={handleLeaveSubmit}
                    isSubmitting={false}
                    onCancel={() => setIsModalOpen(false)}
                  />
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return getView();
}