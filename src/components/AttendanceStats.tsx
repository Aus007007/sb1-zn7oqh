import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Clock, Calendar, TrendingUp } from 'lucide-react';

function AttendanceStats() {
  const { data: stats } = useQuery({
    queryKey: ['attendance-stats'],
    queryFn: async () => ({
      totalWorkHours: 160,
      averageCheckIn: '09:15',
      averageCheckOut: '18:30',
      presentDays: 22,
      absentDays: 1,
      overtime: 5,
    }),
  });

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center">
        <div className={`p-2 rounded-full ${color} bg-opacity-10 mr-3`}>
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-lg font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        title="Total Work Hours"
        value={`${stats?.totalWorkHours} hrs`}
        icon={Clock}
        color="text-blue-600"
      />
      <StatCard
        title="Present Days"
        value={stats?.presentDays}
        icon={Calendar}
        color="text-green-600"
      />
      <StatCard
        title="Overtime Hours"
        value={`${stats?.overtime} hrs`}
        icon={TrendingUp}
        color="text-purple-600"
      />
    </div>
  );
}

export default AttendanceStats;