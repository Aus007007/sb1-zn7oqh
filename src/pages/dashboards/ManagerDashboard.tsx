import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Users,
  Clock,
  Calendar,
  TrendingUp,
  Award,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

function ManagerDashboard() {
  const { user } = useAuthStore();

  const { data: stats } = useQuery({
    queryKey: ['manager-dashboard', user?.id],
    queryFn: async () => ({
      teamStats: {
        totalMembers: 12,
        presentToday: 11,
        onLeave: 1,
        performance: 87,
      },
      approvals: {
        leaves: 3,
        timesheets: 2,
        expenses: 1,
      },
      teamPerformance: {
        averageRating: 4.2,
        completedGoals: 15,
        pendingGoals: 5,
      },
    }),
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
        <h1 className="text-2xl font-bold text-gray-900">Team Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Team Members"
          value={stats?.teamStats.totalMembers}
          icon={Users}
          color="text-blue-600"
        />
        <StatCard
          title="Present Today"
          value={stats?.teamStats.presentToday}
          subValue={`${stats?.teamStats.onLeave} on leave`}
          icon={Clock}
          color="text-green-600"
        />
        <StatCard
          title="Pending Approvals"
          value={
            (stats?.approvals.leaves || 0) +
            (stats?.approvals.timesheets || 0) +
            (stats?.approvals.expenses || 0)
          }
          icon={Calendar}
          color="text-yellow-600"
        />
        <StatCard
          title="Team Performance"
          value={`${stats?.teamStats.performance}%`}
          icon={TrendingUp}
          color="text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Pending Approvals
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm text-gray-600">Leave Requests</span>
              </div>
              <span className="text-sm font-medium text-yellow-600">
                {stats?.approvals.leaves}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm text-gray-600">Timesheets</span>
              </div>
              <span className="text-sm font-medium text-yellow-600">
                {stats?.approvals.timesheets}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Award className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm text-gray-600">Expenses</span>
              </div>
              <span className="text-sm font-medium text-yellow-600">
                {stats?.approvals.expenses}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Team Performance
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Average Rating</span>
              <span className="text-sm font-medium text-gray-900">
                {stats?.teamPerformance.averageRating}/5
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Completed Goals</span>
              <span className="text-sm font-medium text-green-600">
                {stats?.teamPerformance.completedGoals}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pending Goals</span>
              <span className="text-sm font-medium text-yellow-600">
                {stats?.teamPerformance.pendingGoals}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;