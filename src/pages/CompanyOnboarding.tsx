import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Building, Upload, ArrowRight } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const companySchema = z.object({
  name: z.string().min(2, 'Company name is required'),
  domain: z.string().min(3, 'Domain is required'),
  address: z.string().min(5, 'Address is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  website: z.string().url().optional(),
  industry: z.string().min(2, 'Industry is required'),
  size: z.enum(['SMALL', 'MEDIUM', 'LARGE', 'ENTERPRISE']),
  logo: z.instanceof(FileList).optional(),
});

type CompanyForm = z.infer<typeof companySchema>;

function CompanyOnboarding() {
  const [step, setStep] = React.useState(1);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CompanyForm>({
    resolver: zodResolver(companySchema),
  });

  const createCompany = useMutation({
    mutationFn: async (data: CompanyForm) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      if (data.logo?.[0]) {
        formData.append('logo', data.logo[0]);
      }
      const response = await axios.post('/api/companies', formData);
      return response.data;
    },
  });

  const onSubmit = async (data: CompanyForm) => {
    try {
      await createCompany.mutateAsync(data);
      setStep(2);
    } catch (error) {
      console.error('Failed to create company:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Building className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Setup your company
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Let's get your HR system up and running
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {step === 1 ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  {...register('name')}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Domain
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    {...register('domain')}
                    type="text"
                    className="block w-full rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500">
                    .hrapp.com
                  </span>
                </div>
                {errors.domain && (
                  <p className="mt-1 text-sm text-red-600">{errors.domain.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company Logo
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload a file</span>
                        <input
                          {...register('logo')}
                          type="file"
                          className="sr-only"
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <textarea
                    {...register('address')}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Website
                  </label>
                  <input
                    {...register('website')}
                    type="url"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.website && (
                    <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Industry
                  </label>
                  <input
                    {...register('industry')}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.industry && (
                    <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Company Size
                  </label>
                  <select
                    {...register('size')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="SMALL">1-50 employees</option>
                    <option value="MEDIUM">51-200 employees</option>
                    <option value="LARGE">201-1000 employees</option>
                    <option value="ENTERPRISE">1000+ employees</option>
                  </select>
                  {errors.size && (
                    <p className="mt-1 text-sm text-red-600">{errors.size.message}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isSubmitting ? 'Setting up...' : 'Continue'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <Building className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Company setup complete!
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                You can now start adding your HR team and employees.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => window.location.href = '/hr/setup'}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Set up HR Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyOnboarding;