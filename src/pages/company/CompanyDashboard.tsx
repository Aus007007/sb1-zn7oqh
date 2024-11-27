import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, Clock, Calendar, DollarSign, Award } from 'lucide-react';

export default function CompanyDashboard() {
  const { data: stats } = useQuery({
    queryKey: ['company-stats'],
    queryFn: async () => ({
      employees: {
        total: 150,
        active: 145,
        onLeave: 5,
        newJoining: 3,
      },
      attendance: {
        present: 140,
        absent: 5,
        late: 8,
        wfh: 12,
      },
      leaves: {
        pending: 8,
        approved: 15,
        rejected: 2,
      },
      payroll: {
        processed: 145,
        pending: 5,
        totalAmount: 15000000,
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
      <h1 className="text-2xl font-bold text-gray-900">Company Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value={stats?.employees.total}
          subValue={`${stats?.employees.newJoining} new this month`}
          icon={Users}
          color="text-blue-600"
        />
        <StatCard
          title="Present Today"
          value={stats?.attendance.present}
          subValue={`${stats?.attendance.wfh} working from home`}
          icon={Clock}
          color="text-green-600"
        />
        <StatCard
          title="Leave Requests"
          value={stats?.leaves.pending}
          subValue={`${stats?.leaves.approved} approved`}
          icon={Calendar}
          color="text-yellow-600"
        />
        <StatCard
          title="Payroll"
          value={`₹${(stats?.payroll.totalAmount || 0).toLocaleString()}`}
          subValue={`${stats?.payroll.pending} pending`}
          icon={DollarSign}
          color="text-purple-600"
        />
      </div>

      {/* Add more dashboard widgets as needed */}
    </div>
  );
}