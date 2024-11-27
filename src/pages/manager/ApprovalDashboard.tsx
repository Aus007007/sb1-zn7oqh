import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Check, X, Clock, Calendar, DollarSign } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'react-hot-toast';

export default function ApprovalDashboard() {
  const { user } = useAuthStore();

  const { data: pendingApprovals, refetch } = useQuery({
    queryKey: ['pending-approvals', user?.id],
    queryFn: async () => {
      // Simulated API call
      return {
        timesheets: [
          {
            id: '1',
            employeeName: 'John Doe',
            type: 'timesheet',
            weekStarting: '2024-03-11',
            totalHours: 40,
            submittedOn: '2024-03-15',
          }
        ],
        leaves: [
          {
            id: '2',
            employeeName: 'Jane Smith',
            type: 'leave',
            leaveType: 'Annual Leave',
            fromDate: '2024-03-20',
            toDate: '2024-03-22',
            reason: 'Personal work',
            submittedOn: '2024-03-15',
          }
        ],
        reimbursements: [
          {
            id: '3',
            employeeName: 'Mike Johnson',
            type: 'reimbursement',
            amount: 5000,
            expenseType: 'Travel',
            submittedOn: '2024-03-15',
          }
        ],
      };
    },
  });

  const approvalMutation = useMutation({
    mutationFn: async ({ id, type, action }: { id: string; type: string; action: 'approve' | 'reject' }) => {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { id, type, action };
    },
    onSuccess: (data) => {
      toast.success(`${data.type} ${data.action}d successfully`);
      refetch();
    },
    onError: () => {
      toast.error('Failed to process approval');
    },
  });

  const handleApproval = (id: string, type: string, action: 'approve' | 'reject') => {
    approvalMutation.mutate({ id, type, action });
  };

  const ApprovalCard = ({ item, type }: { item: any; type: string }) => {
    const getIcon = () => {
      switch (type) {
        case 'timesheet':
          return <Clock className="h-5 w-5 text-blue-500" />;
        case 'leave':
          return <Calendar className="h-5 w-5 text-green-500" />;
        case 'reimbursement':
          return <DollarSign className="h-5 w-5 text-yellow-500" />;
        default:
          return null;
      }
    };

    return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {getIcon()}
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{item.employeeName}</p>
              <p className="text-xs text-gray-500">Submitted on {item.submittedOn}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleApproval(item.id, type, 'approve')}
              className="inline-flex items-center p-1 border border-transparent rounded-full text-green-600 hover:bg-green-100"
            >
              <Check className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleApproval(item.id, type, 'reject')}
              className="inline-flex items-center p-1 border border-transparent rounded-full text-red-600 hover:bg-red-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="mt-2">
          {type === 'timesheet' && (
            <p className="text-sm text-gray-600">
              Week starting {item.weekStarting} - {item.totalHours} hours
            </p>
          )}
          {type === 'leave' && (
            <p className="text-sm text-gray-600">
              {item.leaveType}: {item.fromDate} to {item.toDate}
              <br />
              Reason: {item.reason}
            </p>
          )}
          {type === 'reimbursement' && (
            <p className="text-sm text-gray-600">
              {item.expenseType}: ₹{item.amount}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Pending Approvals</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Timesheets</h2>
          <div className="space-y-4">
            {pendingApprovals?.timesheets.map((item) => (
              <ApprovalCard key={item.id} item={item} type="timesheet" />
            ))}
            {pendingApprovals?.timesheets.length === 0 && (
              <p className="text-sm text-gray-500">No pending timesheet approvals</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Leave Requests</h2>
          <div className="space-y-4">
            {pendingApprovals?.leaves.map((item) => (
              <ApprovalCard key={item.id} item={item} type="leave" />
            ))}
            {pendingApprovals?.leaves.length === 0 && (
              <p className="text-sm text-gray-500">No pending leave approvals</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Reimbursements</h2>
          <div className="space-y-4">
            {pendingApprovals?.reimbursements.map((item) => (
              <ApprovalCard key={item.id} item={item} type="reimbursement" />
            ))}
            {pendingApprovals?.reimbursements.length === 0 && (
              <p className="text-sm text-gray-500">No pending reimbursement approvals</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}