import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Calendar, Clock, X, Check, AlertCircle } from 'lucide-react';

interface LeaveRequest {
  id: string;
  type: string;
  fromDate: string;
  toDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
  appliedOn: string;
  approver: string;
  days: number;
}

export default function LeaveHistory() {
  const { data: leaveHistory } = useQuery({
    queryKey: ['leave-history'],
    queryFn: async () => {
      // Simulated API call
      return [
        {
          id: '1',
          type: 'Casual Leave',
          fromDate: '2024-03-15',
          toDate: '2024-03-16',
          status: 'pending',
          reason: 'Personal work',
          appliedOn: '2024-03-10',
          approver: 'John Doe',
          days: 2,
        },
        {
          id: '2',
          type: 'Sick Leave',
          fromDate: '2024-03-01',
          toDate: '2024-03-02',
          status: 'approved',
          reason: 'Not feeling well',
          appliedOn: '2024-02-28',
          approver: 'John Doe',
          days: 2,
        },
      ] as LeaveRequest[];
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Leave History</h2>
        <div className="flex space-x-2">
          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Filter
          </button>
          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Export
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {leaveHistory?.map((leave) => (
            <li key={leave.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getStatusIcon(leave.status)}
                    <p className="ml-2 text-sm font-medium text-gray-900">
                      {leave.type}
                    </p>
                    <span
                      className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        leave.status
                      )}`}
                    >
                      {leave.status}
                    </span>
                  </div>
                  {leave.status === 'pending' && (
                    <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200">
                      Revoke Request
                    </button>
                  )}
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {format(new Date(leave.fromDate), 'MMM d, yyyy')} -{' '}
                      {format(new Date(leave.toDate), 'MMM d, yyyy')}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      <AlertCircle className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {leave.days} days
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      Applied on {format(new Date(leave.appliedOn), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Reason: {leave.reason}</p>
                  <p className="mt-1">Approver: {leave.approver}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}