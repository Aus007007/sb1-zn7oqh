import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Calendar,
  Clock,
  Home,
  DollarSign,
  Baby,
} from 'lucide-react';

interface LeaveBalances {
  annual: number;
  wfh: number;
  lop: number;
  compOff: number;
  paternity: number;
}

interface TeamLeave {
  date: string;
  employees: string[];
}

export default function LeaveDashboard() {
  const { data: leaveBalances } = useQuery({
    queryKey: ['leave-balances'],
    queryFn: async () => ({
      annual: 14.75,
      wfh: 2,
      lop: 0,
      compOff: 0,
      paternity: 3,
    } as LeaveBalances),
  });

  const { data: teamLeaves } = useQuery({
    queryKey: ['team-leaves'],
    queryFn: async () => {
      return [
        {
          date: '2024-03-11',
          employees: ['MK', 'VP'],
        },
        {
          date: '2024-03-12',
          employees: ['AD'],
        },
      ] as TeamLeave[];
    },
  });

  const LeaveCard = ({ 
    title, 
    value, 
    icon: Icon,
    color = 'blue',
  }: { 
    title: string;
    value: number;
    icon: React.ElementType;
    color?: string;
  }) => (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center space-x-3">
        <div className={`p-2 bg-${color}-100 rounded-lg`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Leave Balances (IN DAYS)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <LeaveCard
            title="Annual"
            value={leaveBalances?.annual || 0}
            icon={Calendar}
            color="blue"
          />
          <LeaveCard
            title="Loss of Pay"
            value={leaveBalances?.lop || 0}
            icon={DollarSign}
            color="red"
          />
          <LeaveCard
            title="Comp Off"
            value={leaveBalances?.compOff || 0}
            icon={Clock}
            color="green"
          />
          <LeaveCard
            title="Work From Home"
            value={leaveBalances?.wfh || 0}
            icon={Home}
            color="purple"
          />
          <LeaveCard
            title="Paternity"
            value={leaveBalances?.paternity || 0}
            icon={Baby}
            color="indigo"
          />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">
            Team Leave Calendar
          </h2>
          <div className="flex items-center space-x-2">
            <button className="p-1 rounded-full hover:bg-gray-100">
              <Calendar className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {teamLeaves?.map((leave) => (
            <div key={leave.date} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-4">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-900">
                  {new Date(leave.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {leave.employees.map((emp) => (
                  <span
                    key={emp}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {emp}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {!teamLeaves?.length && (
            <div className="text-center text-gray-500 py-4">
              No upcoming leaves
            </div>
          )}
        </div>
      </div>
    </div>
  );
}