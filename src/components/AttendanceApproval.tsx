import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import type { Attendance } from '../types';

function AttendanceApproval() {
  const { data: pendingApprovals } = useQuery({
    queryKey: ['pending-approvals'],
    queryFn: async () => {
      // Simulated API call
      return [
        {
          id: '1',
          userId: 'user1',
          date: '2024-02-28',
          checkIn: '09:00',
          checkOut: '18:00',
          status: 'pending',
          location: 'Remote',
        },
      ] as Attendance[];
    },
  });

  const handleApprove = (id: string) => {
    // TODO: Implement approval logic
    console.log('Approve:', id);
  };

  const handleReject = (id: string) => {
    // TODO: Implement rejection logic
    console.log('Reject:', id);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">
          Pending Approvals
        </h2>
      </div>
      <div className="divide-y divide-gray-200">
        {pendingApprovals?.map((approval) => (
          <div key={approval.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Employee ID: {approval.userId}
                  </p>
                  <p className="text-sm text-gray-500">
                    {approval.date} ({approval.checkIn} - {approval.checkOut})
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleApprove(approval.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </button>
                <button
                  onClick={() => handleReject(approval.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
        {!pendingApprovals?.length && (
          <div className="p-4 text-center text-gray-500">
            No pending approvals
          </div>
        )}
      </div>
    </div>
  );
}

export default AttendanceApproval;