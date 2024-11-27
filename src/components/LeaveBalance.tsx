import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Umbrella,
  Thermometer,
  Coffee,
  Plane,
  Baby,
} from 'lucide-react';

interface LeaveBalanceData {
  casual: LeaveType;
  sick: LeaveType;
  compOff: LeaveType;
  vacation: LeaveType;
  maternity: LeaveType;
}

interface LeaveType {
  total: number;
  used: number;
  pending: number;
}

function LeaveBalance() {
  const { data: balances } = useQuery<LeaveBalanceData>({
    queryKey: ['leave-balances'],
    queryFn: async () => ({
      casual: { total: 12, used: 4, pending: 1 },
      sick: { total: 12, used: 2, pending: 0 },
      compOff: { total: 5, used: 2, pending: 1 },
      vacation: { total: 15, used: 5, pending: 0 },
      maternity: { total: 180, used: 0, pending: 0 },
    }),
  });

  const LeaveCard = ({ 
    title, 
    icon: Icon, 
    data, 
    color 
  }: { 
    title: string; 
    icon: React.ElementType; 
    data?: LeaveType; 
    color: string; 
  }) => {
    // Early return with loading state if data is not available
    if (!data) {
      return (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-200 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Calculate available leaves
    const available = data.total - data.used - data.pending;
    
    // Calculate percentages for progress bar
    const usedPercentage = (data.used / data.total) * 100;
    const pendingPercentage = (data.pending / data.total) * 100;

    return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`p-2 rounded-full ${color} bg-opacity-10`}>
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <h3 className="ml-3 text-sm font-medium text-gray-900">{title}</h3>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold text-gray-900">
              {available}
            </p>
            <p className="text-sm text-gray-500">Available</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-gray-600">
                  {data.used} Used
                </span>
              </div>
              <div>
                <span className="text-xs font-semibold inline-block text-yellow-600">
                  {data.pending} Pending
                </span>
              </div>
              <div>
                <span className="text-xs font-semibold inline-block text-gray-600">
                  {data.total} Total
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
              <div
                style={{ width: `${usedPercentage}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              ></div>
              <div
                style={{ width: `${pendingPercentage}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      <LeaveCard
        title="Casual Leave"
        icon={Coffee}
        data={balances?.casual}
        color="text-blue-600"
      />
      <LeaveCard
        title="Sick Leave"
        icon={Thermometer}
        data={balances?.sick}
        color="text-red-600"
      />
      <LeaveCard
        title="Comp Off"
        icon={Umbrella}
        data={balances?.compOff}
        color="text-purple-600"
      />
      <LeaveCard
        title="Vacation"
        icon={Plane}
        data={balances?.vacation}
        color="text-green-600"
      />
      <LeaveCard
        title="Maternity"
        icon={Baby}
        data={balances?.maternity}
        color="text-pink-600"
      />
    </div>
  );
}

export default LeaveBalance;