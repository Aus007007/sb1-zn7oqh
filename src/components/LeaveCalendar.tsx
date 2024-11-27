import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';
import type { Leave } from '../types';

interface LeaveCalendarProps {
  leaves: Leave[];
}

function LeaveCalendar({ leaves }: LeaveCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const getLeaveStatus = (date: Date) => {
    return leaves.find(
      (leave) =>
        new Date(leave.startDate) <= date && new Date(leave.endDate) >= date
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() =>
              setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))
            }
            className="p-2 rounded hover:bg-gray-100"
          >
            ←
          </button>
          <button
            onClick={() =>
              setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))
            }
            className="p-2 rounded hover:bg-gray-100"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
        {days.map((day) => {
          const leave = getLeaveStatus(day);
          const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
          return (
            <div
              key={day.toString()}
              className={`aspect-square p-2 border rounded-lg ${
                !isCurrentMonth ? 'bg-gray-50 text-gray-400' : 
                leave
                  ? leave.status === 'approved'
                    ? 'bg-green-50 border-green-200'
                    : leave.status === 'rejected'
                    ? 'bg-red-50 border-red-200'
                    : 'bg-yellow-50 border-yellow-200'
                  : 'border-gray-200'
              }`}
            >
              <div className="text-sm font-medium text-gray-900">
                {format(day, 'd')}
              </div>
              {leave && isCurrentMonth && (
                <div
                  className={`text-xs mt-1 ${
                    leave.status === 'approved'
                      ? 'text-green-600'
                      : leave.status === 'rejected'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }`}
                >
                  {leave.type}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LeaveCalendar;