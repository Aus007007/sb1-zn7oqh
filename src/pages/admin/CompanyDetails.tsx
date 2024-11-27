import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Building, Users, Mail, Phone, Globe, Briefcase } from 'lucide-react';
import type { Company } from '../../types/auth';

export default function CompanyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: company, isLoading } = useQuery<Company>({
    queryKey: ['company', id],
    queryFn: async () => {
      // Fetch company details
      const response = await fetch(`/api/companies/${id}`);
      if (!response.ok) throw new Error('Failed to fetch company');
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Company not found</h3>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
        <button
          onClick={() => navigate(`/admin/companies/${id}/edit`)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Edit Company
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex items-center">
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="h-12 w-12 rounded-full"
              />
            ) : (
              <Building className="h-12 w-12 text-gray-400" />
            )}
            <div className="ml-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Company Details
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {company.domain}
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Industry</dt>
              <dd className="mt-1 text-sm text-gray-900 flex items-center">
                <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
                {company.industry}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Company Size</dt>
              <dd className="mt-1 text-sm text-gray-900 flex items-center">
                <Users className="h-5 w-5 text-gray-400 mr-2" />
                {company.size}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                {company.email}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 text-sm text-gray-900 flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                {company.phone}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Website</dt>
              <dd className="mt-1 text-sm text-gray-900 flex items-center">
                <Globe className="h-5 w-5 text-gray-400 mr-2" />
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-500"
                >
                  {company.website}
                </a>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900">{company.address}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}