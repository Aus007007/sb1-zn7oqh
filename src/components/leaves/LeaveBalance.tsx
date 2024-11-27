import React from 'react';
import {
  Calendar,
  DollarSign,
  Clock,
  Home,
  Activity,
  Baby,
  Heart,
} from 'lucide-react';

interface LeaveBalanceProps {
  balances: {
    annual: number;
    lop: number;
    compOff: number;
    wfh: number;
    covid: number;
    paternity: number;
    bereavement: number;
  } | undefined;
}

export default function LeaveBalance({ balances }: LeaveBalanceProps) {
  const leaveTypes = [
    { key: 'annual', label: 'Annual', icon: Calendar, color: 'blue' },
    { key: 'lop', label: 'Loss of Pay', icon: DollarSign, color: 'red' },
    { key: 'compOff', label: 'Comp Off', icon: Clock, color: 'green' },
    { key: 'wfh', label: 'Work From Home', icon: Home, color: 'teal' },
    { key: 'covid', label: 'Covid-19', icon: Activity, color: 'yellow' }, // Changed from Virus to Activity
    { key: 'paternity', label: 'Paternity', icon: Baby, color: 'indigo' },
    { key: 'bereavement', label: 'Bereavement', icon: Heart, color: 'gray' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      {leaveTypes.map(({ key, label, icon: Icon, color }) => (
        <div key={key} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`p-2 bg-${color}-100 rounded-lg`}>
                <Icon className={`h-5 w-5 text-${color}-600`} />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{label}</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {balances?.[key] || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}