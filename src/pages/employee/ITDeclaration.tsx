import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Plus, Upload, FileText, Save } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const declarationSchema = z.object({
  regime: z.enum(['old', 'new']),
  financialYear: z.string().min(1, 'Financial year is required'),
  sections: z.array(z.object({
    section: z.string(),
    amount: z.number().min(0),
    description: z.string(),
  })),
  rentDetails: z.object({
    monthlyRent: z.number().min(0),
    landlordName: z.string().optional(),
    landlordPan: z.string().optional(),
    address: z.string().optional(),
  }).optional(),
});

type DeclarationForm = z.infer<typeof declarationSchema>;

export default function ITDeclaration() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = React.useState(false);

  const { data: declaration, refetch } = useQuery({
    queryKey: ['it-declaration', user?.id],
    queryFn: async () => {
      // Simulated API call
      return {
        regime: 'old',
        financialYear: '2023-24',
        sections: [
          {
            section: '80C',
            amount: 150000,
            description: 'PPF, ELSS, LIC',
          },
          {
            section: '80D',
            amount: 25000,
            description: 'Medical Insurance',
          },
        ],
        rentDetails: {
          monthlyRent: 25000,
          landlordName: 'John Doe',
          landlordPan: 'ABCDE1234F',
          address: '123, Main Street, City',
        },
      };
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DeclarationForm>({
    resolver: zodResolver(declarationSchema),
    defaultValues: declaration,
  });

  const saveMutation = useMutation({
    mutationFn: async (data: DeclarationForm) => {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return data;
    },
    onSuccess: () => {
      toast.success('IT Declaration saved successfully');
      setIsEditing(false);
      refetch();
    },
    onError: () => {
      toast.error('Failed to save IT Declaration');
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">IT Declaration</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            {isEditing ? 'Cancel' : 'Edit Declaration'}
          </button>
          {isEditing && (
            <button
              onClick={handleSubmit((data) => saveMutation.mutate(data))}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          )}
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tax Regime
              </label>
              <div className="mt-2 space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('regime')}
                    value="old"
                    disabled={!isEditing}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Old Regime</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('regime')}
                    value="new"
                    disabled={!isEditing}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">New Regime</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Financial Year
              </label>
              <select
                {...register('financialYear')}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="2023-24">2023-24</option>
                <option value="2024-25">2024-25</option>
              </select>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900">Deductions</h3>
              <div className="mt-4 space-y-4">
                {declaration?.sections.map((section, index) => (
                  <div key={section.section} className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Section
                      </label>
                      <input
                        type="text"
                        value={section.section}
                        disabled
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Amount
                      </label>
                      <input
                        type="number"
                        {...register(`sections.${index}.amount` as const, { valueAsNumber: true })}
                        disabled={!isEditing}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <input
                        type="text"
                        {...register(`sections.${index}.description` as const)}
                        disabled={!isEditing}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900">House Rent Details</h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Monthly Rent
                  </label>
                  <input
                    type="number"
                    {...register('rentDetails.monthlyRent', { valueAsNumber: true })}
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Landlord Name
                  </label>
                  <input
                    type="text"
                    {...register('rentDetails.landlordName')}
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Landlord PAN
                  </label>
                  <input
                    type="text"
                    {...register('rentDetails.landlordPan')}
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    {...register('rentDetails.address')}
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}