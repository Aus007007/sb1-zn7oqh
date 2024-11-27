import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Users,
  Clock,
  Calendar,
  AlertCircle,
  TrendingUp,
  GraduationCap,
  FileCheck,
  UserCheck,
  Briefcase,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

function Dashboard() {
  const { user } = useAuthStore();

  const { data: stats } = useQuery({
    queryKey: ['hr-dashboard-stats', user?.id],
    queryFn: async () => ({
      employeeStats: {
        total: 45,
        active: 42,
        onLeave: 3,
        newJoining: 2,
      },
      attendanceStats: {
        present: 40,
        absent: 2,
        late: 3,
        pendingApprovals: 5,
        averageWorkHours: 7.8,
      },
      leaveStats: {
        pendingRequests: 4,
        approved: 12,
        rejected: 2,
        upcomingLeaves: 3,
      },
      trainingStats: {
        inProgress: 15,
        completed: 28,
        pending: 8,
        compliance: 92,
      },
    }),
  });

  const { data: attendanceTrend } = useQuery({
    queryKey: ['attendance-trend', user?.id],
    queryFn: async () => [
      { date: 'Mon', onTime: 38, late: 4 },
      { date: 'Tue', onTime: 40, late: 2 },
      { date: 'Wed', onTime: 37, late: 5 },
      { date: 'Thu', onTime: 39, late: 3 },
      { date: 'Fri', onTime: 41, late: 1 },
    ],
  });

  const { data: trainingProgress } = useQuery({
    queryKey: ['training-progress', user?.id],
    queryFn: async () => [
      { name: 'Completed', value: 28 },
      { name: 'In Progress', value: 15 },
      { name: 'Pending', value: 8 },
    ],
  });

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B'];

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
        <h1 className="text-2xl font-bold text-gray-900">HR Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value={stats?.employeeStats.total}
          subValue={`${stats?.employeeStats.newJoining} new this month`}
          icon={Users}
          color="text-blue-600"
        />
        <StatCard
          title="Present Today"
          value={stats?.attendanceStats.present}
          subValue={`${stats?.attendanceStats.late} came late`}
          icon={UserCheck}
          color="text-green-600"
        />
        <StatCard
          title="Pending Approvals"
          value={stats?.attendanceStats.pendingApprovals}
          subValue="Needs your attention"
          icon={FileCheck}
          color="text-yellow-600"
        />
        <StatCard
          title="Training Compliance"
          value={`${stats?.trainingStats.compliance}%`}
          subValue={`${stats?.trainingStats.inProgress} in progress`}
          icon={GraduationCap}
          color="text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Weekly Attendance Trend
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="onTime" fill="#10B981" name="On Time" />
                <Bar dataKey="late" fill="#F59E0B" name="Late" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Training Status
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trainingProgress}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {trainingProgress?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Pending Actions
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm text-gray-600">Leave Requests</span>
              </div>
              <span className="text-sm font-medium text-yellow-600">
                {stats?.leaveStats.pendingRequests}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm text-gray-600">Timesheet Approvals</span>
              </div>
              <span className="text-sm font-medium text-yellow-600">
                {stats?.attendanceStats.pendingApprovals}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm text-gray-600">Document Verifications</span>
              </div>
              <span className="text-sm font-medium text-yellow-600">3</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Leave Overview
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pending Requests</span>
              <span className="text-sm font-medium text-yellow-600">
                {stats?.leaveStats.pendingRequests}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Approved This Month</span>
              <span className="text-sm font-medium text-green-600">
                {stats?.leaveStats.approved}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Upcoming Leaves</span>
              <span className="text-sm font-medium text-blue-600">
                {stats?.leaveStats.upcomingLeaves}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Quick Stats
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Average Work Hours</span>
              <span className="text-sm font-medium text-gray-900">
                {stats?.attendanceStats.averageWorkHours} hrs
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Training Completion Rate</span>
              <span className="text-sm font-medium text-gray-900">
                {stats?.trainingStats.compliance}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Employees</span>
              <span className="text-sm font-medium text-gray-900">
                {stats?.employeeStats.active}/{stats?.employeeStats.total}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;