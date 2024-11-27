import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Calendar, Upload, Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const holidaySchema = z.object({
  date: z.string().min(1, 'Date is required'),
  name: z.string().min(1, 'Holiday name is required'),
  type: z.enum(['national', 'regional', 'company']),
  description: z.string().optional(),
});

type HolidayForm = z.infer<typeof holidaySchema>;

export default function HolidayCalendarManagement() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { data: holidays, refetch } = useQuery({
    queryKey: ['company-holidays'],
    queryFn: async () => {
      // Simulated API call
      return [
        {
          id: '1',
          date: '2024-01-01',
          name: 'New Year',
          type: 'national',
          description: 'New Year Celebration',
        },
      ];
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HolidayForm>({
    resolver: zodResolver(holidaySchema),
  });

  const addHoliday = useMutation({
    mutationFn: async (data: HolidayForm) => {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return data;
    },
    onSuccess: () => {
      toast.success('Holiday added successfully');
      setIsModalOpen(false);
      reset();
      refetch();
    },
    onError: () => {
      toast.error('Failed to add holiday');
    },
  });

  const deleteHoliday = useMutation({
    mutationFn: async (id: string) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return id;
    },
    onSuccess: () => {
      toast.success('Holiday deleted successfully');
      refetch();
    },
    onError: () => {
      toast.error('Failed to delete holiday');
    },
  });

  const handleBulkUpload = async (file: File) => {
    try {
      // Handle CSV/Excel upload
      toast.success('Holidays uploaded successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to upload holidays');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Holiday Calendar Management</h1>
        <div className="flex space-x-4">
          <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
            <Upload className="h-4 w-4 mr-2" />
            Bulk Upload
            <input
              type="file"
              className="hidden"
              accept=".csv,.xlsx"
              onChange={(e) => e.target.files?.[0] && handleBulkUpload(e.target.files[0])}
            />
          </label>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Holiday
          </button>
        </div>
      </div>

      {/* Holiday List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Holiday Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {holidays?.map((holiday) => (
              <tr key={holiday.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(holiday.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {holiday.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    holiday.type === 'national'
                      ? 'bg-blue-100 text-blue-800'
                      : holiday.type === 'regional'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {holiday.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {holiday.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => deleteHoliday.mutate(holiday.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Holiday Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Add Holiday</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <Plus className="h-6 w-6 transform rotate-45" />
              </button>
            </div>

            <form onSubmit={handleSubmit((data) => addHoliday.mutate(data))} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  {...register('date')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Holiday Name</label>
                <input
                  type="text"
                  {...register('name')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  {...register('type')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="national">National Holiday</option>
                  <option value="regional">Regional Holiday</option>
                  <option value="company">Company Holiday</option>
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addHoliday.isPending}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
                >
                  {addHoliday.isPending ? 'Adding...' : 'Add Holiday'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}