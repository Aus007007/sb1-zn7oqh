import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../store/authStore';

export default function EmployeeProfile() {
  const { user } = useAuthStore();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['employee-profile', user?.id],
    queryFn: async () => ({
      name: 'Aleemulla Shareef',
      employeeId: 'EMP3687',
      gender: 'Male',
      email: 'aleemulla.shareef@gspann.com',
      loginId: 'aleemulla.shareef',
      payrollId: 'EMP3687',
      employeeType: 'Full-time Employee',
      department: 'Technical',
      designation: 'Technical Manager',
      practice: 'Managed Services',
      subPractice: 'Applications Support',
      baseLocation: 'Hyderabad - Telangana - India',
      depotLocation: 'Hyderabad - Telangana - India',
      reportingManager: 'Santhosh Satkuri',
      reportingManagerEmail: 'santhosh.satkuri@gspann.com',
      onBoardingDate: '11 Mar, 2024',
      companyName: 'GSPANN Technologies (India) Pvt. Ltd.',
      skills: [
        {
          name: 'Azure Databricks, Azure Data Lake, Azure Synapse, Azure Data Factory',
          category: 'Miscellaneous',
          proficiency: 'NA',
          experience: 'NA',
          certified: false,
        }
      ],
      costingDetails: {
        currency: 'INR',
        salary: '₹1.00',
        effectiveDate: '11 Mar, 2024',
        commission: '₹0.00',
        annualBonus: '₹0.00',
        other: '₹0.00',
        costToCompany: '₹1.00',
      }
    }),
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex items-center">
          <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center mr-4">
            <span className="text-2xl font-medium text-gray-600">
              {profile?.name?.[0]}
            </span>
          </div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Resource Details
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {profile?.employeeId}
            </p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Active
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Gender</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile?.gender}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Email Id</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile?.email}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Login Id</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile?.loginId}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Payroll Id</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile?.payrollId}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Employee Type</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile?.employeeType}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Department</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile?.department}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Designation</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {profile?.designation}
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                  Technical
                </span>
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Practice</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile?.practice}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Sub-Practice</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile?.subPractice}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Base Location</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile?.baseLocation}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Depot Location</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile?.depotLocation}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Reporting Manager</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile?.reportingManager}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Reporting Manager Email</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile?.reportingManagerEmail}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">On Boarding Date</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile?.onBoardingDate}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Company Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile?.companyName}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Skills</h3>
        </div>
        <div className="border-t border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sr No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Skill Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proficiency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience (in years)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Certified
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {profile?.skills.map((skill, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {skill.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {skill.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {skill.proficiency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {skill.experience}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {skill.certified ? 'Yes' : 'No'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Costing Details */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Costing Details</h3>
        </div>
        <div className="border-t border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Currency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Effective Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Annual Bonus
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Other
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost To Company
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {profile?.costingDetails.currency}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {profile?.costingDetails.salary}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {profile?.costingDetails.effectiveDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {profile?.costingDetails.commission}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {profile?.costingDetails.annualBonus}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {profile?.costingDetails.other}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {profile?.costingDetails.costToCompany}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}