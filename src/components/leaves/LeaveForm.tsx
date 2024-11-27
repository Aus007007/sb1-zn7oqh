import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../store/authStore';

const leaveSchema = z.object({
  leaveType: z.string().min(1, 'Leave type is required'),
  project: z.string().min(1, 'Project is required'),
  applyingFor: z.enum(['Full Day', 'Half Day']),
  fromDate: z.string().min(1, 'From date is required'),
  toDate: z.string().min(1, 'To date is required'),
  approvingPerson: z.string().min(1, 'Approving person is required'),
  reportingManager: z.string().min(1, 'Reporting manager is required'),
  notifyOthers: z.string().optional(),
  contactNumber: z.string().min(10, 'Contact number is required'),
  reason: z.string().min(10, 'Reason must be at least 10 characters'),
  flexibleWeekend: z.boolean().optional(),
});

type LeaveFormData = z.infer<typeof leaveSchema>;

interface LeaveFormProps {
  onSubmit: (data: LeaveFormData) => void;
  isSubmitting?: boolean;
  onCancel: () => void;
}

export default function LeaveForm({ onSubmit, isSubmitting, onCancel }: LeaveFormProps) {
  const { user } = useAuthStore();

  const { data: userDetails } = useQuery({
    queryKey: ['user-details', user?.id],
    queryFn: async () => ({
      name: user?.name || '',
      employeeId: user?.employeeId || '',
      reportingManager: 'Santhosh Satkuri',
      approvingPerson: 'Satkuri Santhosh Kumar',
      project: 'LAM RESEARCH - MANAGED SERVICES',
    }),
    enabled: !!user?.id,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LeaveFormData>({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      reportingManager: userDetails?.reportingManager || '',
      approvingPerson: userDetails?.approvingPerson || '',
      project: userDetails?.project || '',
      applyingFor: 'Full Day',
      flexibleWeekend: false,
    },
  });

  const fromDate = watch('fromDate');
  const toDate = watch('toDate');

  const calculateDays = () => {
    if (!fromDate || !toDate) return 0;
    const start = new Date(fromDate);
    const end = new Date(toDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Leave Type*
        </label>
        <select
          {...register('leaveType')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select</option>
          <option value="annual">Annual Leave</option>
          <option value="wfh">Work From Home</option>
          <option value="lop">Loss of Pay</option>
          <option value="paternity">Paternity Leave</option>
          <option value="other">Other</option>
        </select>
        {errors.leaveType && (
          <p className="mt-1 text-sm text-red-600">{errors.leaveType.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Project Name*
        </label>
        <input
          type="text"
          {...register('project')}
          defaultValue={userDetails?.project}
          disabled
          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Applying For*
          </label>
          <select
            {...register('applyingFor')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Full Day">Full Day</option>
            <option value="Half Day">Half Day</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            From Date*
          </label>
          <input
            type="date"
            {...register('fromDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.fromDate && (
            <p className="mt-1 text-sm text-red-600">{errors.fromDate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            To Date*
          </label>
          <input
            type="date"
            {...register('toDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.toDate && (
            <p className="mt-1 text-sm text-red-600">{errors.toDate.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Approving Person*
          </label>
          <input
            type="text"
            {...register('approvingPerson')}
            defaultValue={userDetails?.approvingPerson}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.approvingPerson && (
            <p className="mt-1 text-sm text-red-600">{errors.approvingPerson.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reporting Manager*
          </label>
          <input
            type="text"
            {...register('reportingManager')}
            defaultValue={userDetails?.reportingManager}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.reportingManager && (
            <p className="mt-1 text-sm text-red-600">{errors.reportingManager.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contact Details*
          </label>
          <input
            type="tel"
            {...register('contactNumber')}
            placeholder="Phone Number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.contactNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.contactNumber.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Notify Other Persons
          </label>
          <input
            type="text"
            {...register('notifyOthers')}
            placeholder="Resources"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <p className="mt-1 text-xs text-gray-500">Only 2 persons allowed.</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Reason*
        </label>
        <textarea
          {...register('reason')}
          rows={3}
          placeholder="maximum 250 characters"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.reason && (
          <p className="mt-1 text-sm text-red-600">{errors.reason.message}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          {...register('flexibleWeekend')}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-900">
          Flexible Weekend
        </label>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <span>Applying For: {calculateDays()} Days</span>
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </form>
  );
}