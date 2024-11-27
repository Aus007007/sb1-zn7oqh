import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, X } from 'lucide-react';

const employeeSchema = z.object({
  // Personal Details
  name: z.string().min(2, 'Name is required'),
  gender: z.enum(['Male', 'Female', 'Other']),
  email: z.string().email('Valid email is required'),
  loginId: z.string().min(1, 'Login ID is required'),
  payrollId: z.string().min(1, 'Payroll ID is required'),

  // Employment Details
  employeeId: z.string().min(1, 'Employee ID is required'),
  employeeType: z.enum(['Full-time Employee', 'Contract', 'Part-time']),
  department: z.string().min(1, 'Department is required'),
  designation: z.string().min(1, 'Designation is required'),
  practice: z.string().min(1, 'Practice is required'),
  subPractice: z.string().min(1, 'Sub-Practice is required'),
  
  // Location & Contact
  baseLocation: z.string().min(1, 'Base location is required'),
  depotLocation: z.string().optional(),
  contactNumber: z.string().min(10, 'Valid phone number is required'),
  
  // Reporting Details
  reportingManager: z.string().min(1, 'Reporting manager is required'),
  reportingManagerEmail: z.string().email('Valid reporting manager email is required'),
  hrPartner: z.string().min(1, 'HR Partner name is required'),
  
  // Dates
  joinDate: z.string().min(1, 'Join date is required'),
  
  // Company Details
  companyName: z.string().min(1, 'Company name is required'),
  
  // Compensation
  annualCtc: z.number().min(0, 'Annual CTC must be a positive number'),
  currency: z.enum(['INR', 'USD', 'EUR', 'GBP']),
  effectiveDate: z.string().min(1, 'Effective date is required'),
  commission: z.number().default(0),
  annualBonus: z.number().default(0),
  otherBenefits: z.number().default(0),

  // Skills
  skills: z.array(z.object({
    name: z.string().min(1, 'Skill name is required'),
    category: z.string().min(1, 'Category is required'),
    proficiency: z.string().min(1, 'Proficiency is required'),
    experience: z.number().min(0, 'Experience must be a positive number'),
    certified: z.boolean().default(false),
  })).default([]),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

interface EmployeeFormProps {
  onSubmit: (data: EmployeeFormData) => void;
  isSubmitting?: boolean;
  onCancel: () => void;
  initialData?: Partial<EmployeeFormData>;
}

export default function EmployeeForm({ 
  onSubmit, 
  isSubmitting, 
  onCancel,
  initialData 
}: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      ...initialData,
      currency: 'INR',
      skills: [],
    },
  });

  const [showSkillForm, setShowSkillForm] = React.useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Personal Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
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
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              {...register('gender')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Employment Details */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Employment Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Employee ID</label>
            <input
              type="text"
              {...register('employeeId')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.employeeId && (
              <p className="mt-1 text-sm text-red-600">{errors.employeeId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Employee Type</label>
            <select
              {...register('employeeType')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="Full-time Employee">Full-time Employee</option>
              <option value="Contract">Contract</option>
              <option value="Part-time">Part-time</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Join Date</label>
            <input
              type="date"
              {...register('joinDate')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              {...register('department')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Designation</label>
            <input
              type="text"
              {...register('designation')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Practice</label>
            <input
              type="text"
              {...register('practice')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Location & Contact */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Location & Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Base Location</label>
            <input
              type="text"
              {...register('baseLocation')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input
              type="tel"
              {...register('contactNumber')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Reporting Details */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Reporting Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Reporting Manager</label>
            <input
              type="text"
              {...register('reportingManager')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Reporting Manager Email</label>
            <input
              type="email"
              {...register('reportingManagerEmail')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">HR Partner</label>
            <input
              type="text"
              {...register('hrPartner')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Compensation Details */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Compensation Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Annual CTC</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                {...register('annualCtc', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Currency</label>
            <select
              {...register('currency')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Effective Date</label>
            <input
              type="date"
              {...register('effectiveDate')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
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
          {isSubmitting ? 'Adding...' : 'Add Employee'}
        </button>
      </div>
    </form>
  );
}