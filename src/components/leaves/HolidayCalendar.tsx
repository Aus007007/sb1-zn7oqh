import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Upload } from 'lucide-react';

interface Holiday {
  id: string;
  date: string;
  name: string;
  type: 'national' | 'regional' | 'company';
  description?: string;
}

export default function HolidayCalendar() {
  const { data: holidays } = useQuery({
    queryKey: ['holidays'],
    queryFn: async () => {
      // Simulated API call
      return [
        {
          id: '1',
          date: '2024-01-01',
          name: 'New Year',
          type: 'national',
        },
        {
          id: '2',
          date: '2024-01-26',
          name: 'Republic Day',
          type: 'national',
        },
      ] as Holiday[];
    },
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'national':
        return 'bg-blue-100 text-blue-800';
      case 'regional':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-purple-100 text-purple-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Holiday Calendar</h2>
        <div className="flex space-x-2">
          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Upload className="h-4 w-4 mr-2" />
            Upload Calendar
          </button>
          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Download Template
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                National Holiday
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Regional Holiday
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Company Holiday
              </span>
            </div>
            <select className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {holidays?.map((holiday) => (
              <li key={holiday.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {holiday.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(holiday.date), 'EEEE, MMMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                      holiday.type
                    )}`}
                  >
                    {holiday.type}
                  </span>
                </div>
                {holiday.description && (
                  <p className="mt-2 text-sm text-gray-500">
                    {holiday.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}