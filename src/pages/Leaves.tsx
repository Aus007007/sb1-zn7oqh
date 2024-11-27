import React from 'react';
import { Tab } from '@headlessui/react';
import { Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import LeaveForm from '../components/leaves/LeaveForm';
import LeaveHistory from '../components/leaves/LeaveHistory';
import HolidayCalendar from '../components/leaves/HolidayCalendar';
import LeaveDashboard from '../components/leaves/LeaveDashboard';
import { leaveService } from '../services/leaveService';
import { useAuthStore } from '../store/authStore';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function LeavesPage() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formType, setFormType] = React.useState<'leave' | 'compoff'>('leave');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleLeaveSubmit = async (data: any) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const leaveRequest = {
        employeeId: user.employeeId,
        employeeName: user.name,
        ...data,
      };

      await leaveService.submitLeaveRequest(leaveRequest);
      
      // Invalidate queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ['leave-history'] });
      queryClient.invalidateQueries({ queryKey: ['leave-balances'] });
      
      toast.success(
        formType === 'compoff' 
          ? 'Comp-off request submitted successfully' 
          : 'Leave request submitted successfully'
      );
      
      setIsModalOpen(false);
    } catch (error) {
      toast.error(
        formType === 'compoff'
          ? 'Failed to submit comp-off request'
          : 'Failed to submit leave request'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = (type: 'leave' | 'compoff') => {
    setFormType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => openModal('leave')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Apply Leaves
          </button>
          <button
            onClick={() => openModal('compoff')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Comp Off Apply
          </button>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      <div className="bg-white shadow">
        <Tab.Group>
          <Tab.List className="flex border-b border-gray-200">
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm font-medium leading-5 text-gray-700',
                  'focus:outline-none',
                  selected
                    ? 'border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )
              }
            >
              Dashboard
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm font-medium leading-5 text-gray-700',
                  'focus:outline-none',
                  selected
                    ? 'border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )
              }
            >
              Leave History
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm font-medium leading-5 text-gray-700',
                  'focus:outline-none',
                  selected
                    ? 'border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )
              }
            >
              Holiday Calendar
            </Tab>
          </Tab.List>
          <Tab.Panels className="p-6">
            <Tab.Panel>
              <LeaveDashboard />
            </Tab.Panel>
            <Tab.Panel>
              <LeaveHistory />
            </Tab.Panel>
            <Tab.Panel>
              <HolidayCalendar />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      {/* Leave/Comp-Off Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                {formType === 'compoff' ? (
                  <>
                    <div className="text-amber-600 mb-2">
                      Comp Off is additional leave granted as a compensation for working overtime or on an off day. It must be availed within 3 months.
                    </div>
                    Request Comp-Off
                  </>
                ) : (
                  'Apply for Leave'
                )}
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
              type={formType} 
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      )}
    </div>
  );
}