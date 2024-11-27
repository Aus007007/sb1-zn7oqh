import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Clock, Calendar, Save, Send, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'react-hot-toast';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addWeeks, subWeeks, isWeekend } from 'date-fns';

interface TimesheetEntry {
  date: string;
  hours: number;
  project: string;
  notes: string;
}

interface Timesheet {
  id: string;
  weekStarting: string;
  entries: TimesheetEntry[];
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  totalHours: number;
  userId: string;
}

const projects = [
  { id: 'LAM', name: 'LAM RESEARCH - MANAGED SERVICES' },
];

export default function EmployeeAttendance() {
  const { user } = useAuthStore();
  const [selectedWeek, setSelectedWeek] = React.useState(() => {
    const now = new Date();
    return format(startOfWeek(now, { weekStartsOn: 1 }), 'yyyy-MM-dd');
  });

  const { data: timesheet, isLoading } = useQuery({
    queryKey: ['timesheet', selectedWeek],
    queryFn: async () => {
      const weekStart = new Date(selectedWeek);
      const days = eachDayOfInterval({
        start: startOfWeek(weekStart, { weekStartsOn: 1 }),
        end: endOfWeek(weekStart, { weekStartsOn: 1 }),
      });

      return {
        id: `ts-${selectedWeek}`,
        weekStarting: selectedWeek,
        entries: days.map(day => ({
          date: format(day, 'yyyy-MM-dd'),
          hours: 0,
          project: 'LAM',
          notes: '',
        })),
        status: 'draft',
        totalHours: 0,
        userId: user?.id,
      } as Timesheet;
    },
    enabled: !!user?.id,
  });

  const [localTimesheet, setLocalTimesheet] = React.useState<Timesheet | null>(null);

  React.useEffect(() => {
    if (timesheet) {
      setLocalTimesheet(timesheet);
    }
  }, [timesheet]);

  const saveMutation = useMutation({
    mutationFn: async (data: Timesheet) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return data;
    },
    onSuccess: () => {
      toast.success('Timesheet saved successfully');
    },
    onError: () => {
      toast.error('Failed to save timesheet');
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: Timesheet) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { ...data, status: 'submitted' };
    },
    onSuccess: () => {
      toast.success('Timesheet submitted successfully');
    },
    onError: () => {
      toast.error('Failed to submit timesheet');
    },
  });

  const handleInputChange = (date: string, field: keyof TimesheetEntry, value: string | number) => {
    if (!localTimesheet) return;

    setLocalTimesheet(prev => {
      if (!prev) return prev;

      const newEntries = prev.entries.map(entry =>
        entry.date === date
          ? { ...entry, [field]: value }
          : entry
      );

      const totalHours = newEntries.reduce((sum, entry) => sum + (Number(entry.hours) || 0), 0);

      return {
        ...prev,
        entries: newEntries,
        totalHours,
      };
    });
  };

  const handleSave = () => {
    if (!localTimesheet) return;
    saveMutation.mutate(localTimesheet);
  };

  const handleSubmit = () => {
    if (!localTimesheet) return;
    submitMutation.mutate(localTimesheet);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const currentWeek = new Date(selectedWeek);
    const newWeek = direction === 'prev' 
      ? subWeeks(currentWeek, 1)
      : addWeeks(currentWeek, 1);
    setSelectedWeek(format(startOfWeek(newWeek, { weekStartsOn: 1 }), 'yyyy-MM-dd'));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Timesheet</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateWeek('prev')}
            className="p-2 rounded hover:bg-gray-100"
          >
            ←
          </button>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm font-medium">
              Week of {format(new Date(selectedWeek), 'MMM d, yyyy')}
            </span>
          </div>
          <button
            onClick={() => navigateWeek('next')}
            className="p-2 rounded hover:bg-gray-100"
          >
            →
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  {localTimesheet?.entries.map((entry) => (
                    <th
                      key={entry.date}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {format(new Date(entry.date), 'EEE (d)')}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => {
                  const projectTotal = localTimesheet?.entries.reduce(
                    (sum, entry) => sum + (entry.project === project.id ? Number(entry.hours) || 0 : 0),
                    0
                  );

                  return (
                    <tr key={project.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {project.name}
                      </td>
                      {localTimesheet?.entries.map((entry) => {
                        const isWeekendDay = isWeekend(new Date(entry.date));
                        return (
                          <td key={entry.date} className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              max="24"
                              step="0.5"
                              value={entry.project === project.id ? entry.hours : 0}
                              onChange={(e) =>
                                handleInputChange(
                                  entry.date,
                                  'hours',
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              disabled={isWeekendDay}
                              className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                            />
                          </td>
                        );
                      })}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {projectTotal?.toFixed(1)}
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-gray-50 font-medium">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Total Hours
                  </td>
                  {localTimesheet?.entries.map((entry) => {
                    const dayTotal = projects.reduce(
                      (sum, project) =>
                        sum + (entry.project === project.id ? Number(entry.hours) || 0 : 0),
                      0
                    );
                    return (
                      <td
                        key={entry.date}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {dayTotal.toFixed(1)}
                      </td>
                    );
                  })}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {localTimesheet?.totalHours.toFixed(1)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Add any additional notes..."
            ></textarea>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500">
            <AlertCircle className="h-4 w-4 mr-2" />
            Week-off days cannot be modified
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              disabled={saveMutation.isPending}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitMutation.isPending || !localTimesheet?.totalHours}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Timesheet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}