import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { DollarSign, Plus, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const salaryComponentSchema = z.object({
  name: z.string().min(1, 'Component name is required'),
  type: z.enum(['earning', 'deduction']),
  percentage: z.number().min(0).max(100),
  baseComponent: z.string().optional(),
  description: z.string().optional(),
});

const salaryStructureSchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  annualCTC: z.number().min(1, 'Annual CTC is required'),
  components: z.array(salaryComponentSchema),
  effectiveDate: z.string().min(1, 'Effective date is required'),
});

type SalaryStructureForm = z.infer<typeof salaryStructureSchema>;

const defaultComponents = [
  {
    name: 'Basic',
    type: 'earning' as const,
    percentage: 40,
    description: '40% of CTC',
  },
  {
    name: 'HRA',
    type: 'earning' as const,
    percentage: 50,
    baseComponent: 'Basic',
    description: '50% of Basic',
  },
  {
    name: 'Special Allowance',
    type: 'earning' as const,
    percentage: 0,
    description: 'Balancing component',
  },
  {
    name: 'PF',
    type: 'deduction' as const,
    percentage: 12,
    baseComponent: 'Basic',
    description: '12% of Basic',
  },
];

export default function SalaryStructureManagement() {
  const [selectedEmployee, setSelectedEmployee] = React.useState<string | null>(null);

  const { data: employees } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      // Simulated API call
      return [
        {
          id: 'EMP001',
          name: 'John Doe',
          department: 'Engineering',
        },
      ];
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SalaryStructureForm>({
    resolver: zodResolver(salaryStructureSchema),
    defaultValues: {
      components: defaultComponents,
    },
  });

  const annualCTC = watch('annualCTC');
  const components = watch('components');

  // Calculate monthly salary components
  const calculateMonthlySalary = (annual: number, components: any[]) => {
    const monthly: Record<string, number> = {};
    let remainingAmount = annual;

    components.forEach((component) => {
      if (component.baseComponent) {
        const baseAmount = monthly[component.baseComponent] || 0;
        monthly[component.name] = (baseAmount * component.percentage) / 100;
      } else if (component.name === 'Special Allowance') {
        monthly[component.name] = remainingAmount;
      } else {
        monthly[component.name] = (annual * component.percentage) / 100;
        remainingAmount -= monthly[component.name];
      }
    });

    return monthly;
  };

  const monthlySalary = annualCTC ? calculateMonthlySalary(annualCTC / 12, components) : null;

  const saveSalaryStructure = useMutation({
    mutationFn: async (data: SalaryStructureForm) => {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return data;
    },
    onSuccess: () => {
      toast.success('Salary structure saved successfully');
    },
    onError: () => {
      toast.error('Failed to save salary structure');
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Salary Structure Management</h1>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmit((data) => saveSalaryStructure.mutate(data))} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Employee
                </label>
                <select
                  {...register('employeeId')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select an employee</option>
                  {employees?.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Annual CTC
                </label>
                <input
                  type="number"
                  {...register('annualCTC', { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Salary Components</h3>
              <div className="mt-4 space-y-4">
                {components.map((component, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Component Name
                      </label>
                      <input
                        type="text"
                        {...register(`components.${index}.name`)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Percentage
                      </label>
                      <input
                        type="number"
                        {...register(`components.${index}.percentage`, { valueAsNumber: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Monthly Amount
                      </label>
                      <input
                        type="text"
                        value={monthlySalary ? `₹${Math.round(monthlySalary[component.name]).toLocaleString()}` : '-'}
                        disabled
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Effective Date
              </label>
              <input
                type="date"
                {...register('effectiveDate')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saveSalaryStructure.isPending}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {saveSalaryStructure.isPending ? 'Saving...' : 'Save Structure'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}