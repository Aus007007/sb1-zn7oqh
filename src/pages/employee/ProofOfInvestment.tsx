import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Plus, Upload, FileText } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const investmentSchema = z.object({
  type: z.enum(['80C', '80D', 'HRA', 'LTA', 'NPS', 'OTHER']),
  amount: z.number().min(1, 'Amount must be greater than 0'),
  financialYear: z.string().min(1, 'Financial year is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  attachments: z.any().optional(),
});

type InvestmentForm = z.infer<typeof investmentSchema>;

export default function ProofOfInvestment() {
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { data: investments, refetch } = useQuery({
    queryKey: ['investments', user?.id],
    queryFn: async () => {
      // Simulated API call
      return [
        {
          id: '1',
          type: '80C',
          amount: 150000,
          financialYear: '2023-24',
          description: 'PPF Investment',
          status: 'pending',
          attachments: ['ppf_receipt.pdf'],
          submittedOn: '2024-03-15',
        }
      ];
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InvestmentForm>({
    resolver: zodResolver(investmentSchema),
  });

  const submitInvestment = useMutation({
    mutationFn: async (data: InvestmentForm) => {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return data;
    },
    onSuccess: () => {
      toast.success('Investment proof submitted successfully');
      setIsModalOpen(false);
      reset();
      refetch();
    },
    onError: () => {
      toast.error('Failed to submit investment proof');
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Proof of Investments</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Investment
        </button>
      </div>

      {/* Investments List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Financial Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {investments?.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹{item.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.financialYear}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === 'approved' 
                      ? 'bg-green-100 text-green-800'
                      : item.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Investment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                Add Investment Proof
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <Plus className="h-6 w-6 transform rotate-45" />
              </button>
            </div>

            <form onSubmit={handleSubmit((data) => submitInvestment.mutate(data))} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Investment Type
                </label>
                <select
                  {...register('type')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="80C">80C - PPF, ELSS, LIC, etc.</option>
                  <option value="80D">80D - Medical Insurance</option>
                  <option value="HRA">House Rent Allowance</option>
                  <option value="LTA">Leave Travel Allowance</option>
                  <option value="NPS">National Pension Scheme</option>
                  <option value="OTHER">Other Deductions</option>
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  type="number"
                  {...register('amount', { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Financial Year
                </label>
                <select
                  {...register('financialYear')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="2023-24">2023-24</option>
                  <option value="2024-25">2024-25</option>
                </select>
                {errors.financialYear && (
                  <p className="mt-1 text-sm text-red-600">{errors.financialYear.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Proof
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload files</span>
                        <input
                          {...register('attachments')}
                          type="file"
                          multiple
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF files up to 10MB
                    </p>
                  </div>
                </div>
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
                  disabled={submitInvestment.isPending}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
                >
                  {submitInvestment.isPending ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}