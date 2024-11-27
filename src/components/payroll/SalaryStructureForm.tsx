import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2 } from 'lucide-react';
import { defaultSalaryStructure } from '../../services/payrollService';

const salaryComponentSchema = z.object({
  name: z.string().min(1, 'Component name is required'),
  type: z.enum(['earning', 'deduction']),
  calculationType: z.enum(['fixed', 'percentage']),
  value: z.number().min(0),
  baseComponent: z.string().optional(),
  isDefault: z.boolean(),
});

const salaryStructureSchema = z.object({
  components: z.array(salaryComponentSchema),
});

interface SalaryStructureFormProps {
  employeeId: string;
  onSubmit: (data: z.infer<typeof salaryStructureSchema>) => void;
  initialData?: z.infer<typeof salaryStructureSchema>;
}

export default function SalaryStructureForm({
  employeeId,
  onSubmit,
  initialData = { components: defaultSalaryStructure },
}: SalaryStructureFormProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(salaryStructureSchema),
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'components',
  });

  const watchComponents = watch('components');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Salary Structure Configuration
          </h3>
          <div className="mt-5 space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-start space-x-4">
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                        Type
                      </label>
                      <select
                        {...register(`components.${index}.type`)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="earning">Earning</option>
                        <option value="deduction">Deduction</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Calculation Type
                      </label>
                      <select
                        {...register(`components.${index}.calculationType`)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="fixed">Fixed</option>
                        <option value="percentage">Percentage</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Value
                      </label>
                      <input
                        type="number"
                        {...register(`components.${index}.value`, { valueAsNumber: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {watchComponents[index]?.calculationType === 'percentage' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Base Component
                      </label>
                      <select
                        {...register(`components.${index}.baseComponent`)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select base component</option>
                        {watchComponents
                          .filter((c, i) => i !== index)
                          .map((component, i) => (
                            <option key={i} value={component.name}>
                              {component.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}
                </div>

                {!watchComponents[index]?.isDefault && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="mt-6 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                append({
                  name: '',
                  type: 'earning',
                  calculationType: 'fixed',
                  value: 0,
                  isDefault: false,
                })
              }
              className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Component
            </button>
          </div>
        </div>

        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Structure
          </button>
        </div>
      </div>
    </form>
  );
}