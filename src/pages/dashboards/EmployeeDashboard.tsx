import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Clock,
  Calendar,
  FileText,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function EmployeeDashboard() {
  const { user } = useAuthStore();

  const { data: stats } = useQuery({
    queryKey: ['employee-dashboard', user?.id],
    queryFn: async () => ({
      attendance: {
        status: 'Present',
        checkIn: '09:00',
        totalHours: 7.5,
        pendingApprovals: 0,
      },
      leaves: {
        balance: 12,
        pending: 1,
        approved: 5,
      },
      performance: {
        rating: 4.2,
        completedGoals: 5,
        pendingGoals: 2,
      },
    }),
    enabled: !!user?.id,
  });

  const StatCard = ({ title, value, subValue, icon: Icon, color }: any) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {subValue && (
            <p className="text-sm text-gray-500 mt-1">{subValue}</p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Today's Status"
          value={stats?.attendance.status}
          subValue={`Check in: ${stats?.attendance.checkIn}`}
          icon={Clock}
          color="text-green-600"
        />
        <StatCard
          title="Leave Balance"
          value={`${stats?.leaves.balance} days`}
          subValue={`${stats?.leaves.pending} pending`}
          icon={Calendar}
          color="text-blue-600"
        />
        <StatCard
          title="Performance"
          value={`${stats?.performance.rating}/5`}
          subValue={`${stats?.performance.completedGoals} goals completed`}
          icon={TrendingUp}
          color="text-purple-600"
        />
        <StatCard
          title="Pending Actions"
          value={stats?.attendance.pendingApprovals}
          subValue="Requires attention"
          icon={AlertCircle}
          color="text-yellow-600"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Leave Request</p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Pending
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Timesheet Submitted</p>
                <p className="text-xs text-gray-500">1 week ago</p>
              </div>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Approved
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}