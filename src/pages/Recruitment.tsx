import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, Briefcase, Building, MapPin, Plus, Search } from 'lucide-react';

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  experience: string;
  salary: string;
  status: 'open' | 'closed' | 'draft';
  applicants: number;
  postedDate: string;
}

function RecruitmentPage() {
  const { data: jobPostings } = useQuery({
    queryKey: ['job-postings'],
    queryFn: async () => {
      // Simulated API call
      return [
        {
          id: '1',
          title: 'Senior Software Engineer',
          department: 'Engineering',
          location: 'Bangalore, India',
          type: 'full-time',
          experience: '5+ years',
          salary: '₹25L - ₹35L',
          status: 'open',
          applicants: 12,
          postedDate: '2024-03-01',
        },
        {
          id: '2',
          title: 'Product Manager',
          department: 'Product',
          location: 'Mumbai, India',
          type: 'full-time',
          experience: '3-5 years',
          salary: '₹20L - ₹30L',
          status: 'open',
          applicants: 8,
          postedDate: '2024-03-05',
        },
      ] as JobPosting[];
    },
  });

  const JobCard = ({ job }: { job: JobPosting }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
          <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Building className="h-4 w-4 mr-1" />
              {job.department}
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {job.location}
            </div>
          </div>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            job.status === 'open'
              ? 'bg-green-100 text-green-800'
              : job.status === 'closed'
              ? 'bg-red-100 text-red-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {job.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-500">
        <div>
          <span className="font-medium">Experience:</span> {job.experience}
        </div>
        <div>
          <span className="font-medium">Type:</span>{' '}
          {job.type.replace('-', ' ')}
        </div>
        <div>
          <span className="font-medium">Salary:</span> {job.salary}
        </div>
        <div>
          <span className="font-medium">Applicants:</span> {job.applicants}
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Posted on {job.postedDate}
        </span>
        <div className="flex space-x-2">
          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            View Details
          </button>
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            View Applicants
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Recruitment</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Post New Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Jobs</p>
              <p className="text-2xl font-semibold text-gray-900">
                {jobPostings?.filter((job) => job.status === 'open').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Applicants
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {jobPostings?.reduce((acc, job) => acc + job.applicants, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <Building className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-2xl font-semibold text-gray-900">
                {new Set(jobPostings?.map((job) => job.department)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <select className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Product</option>
            <option>Sales</option>
          </select>
          <select className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option>All Locations</option>
            <option>Bangalore</option>
            <option>Mumbai</option>
            <option>Delhi</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jobPostings?.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecruitmentPage;