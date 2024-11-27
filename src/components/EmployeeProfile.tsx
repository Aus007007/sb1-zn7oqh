import React from 'react';
import {
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  MapPin,
  Clock,
  Award,
} from 'lucide-react';
import type { User as UserType } from '../types';

interface EmployeeProfileProps {
  employee: UserType;
  stats: {
    attendance: number;
    leaves: number;
    projects: number;
    trainings: number;
  };
}

function EmployeeProfile({ employee, stats }: EmployeeProfileProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-2xl font-medium text-gray-600">
              {employee.name[0]}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{employee.name}</h2>
            <p className="text-sm text-gray-500">{employee.position}</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">{employee.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {employee.contactNumber}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Building className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">{employee.department}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              Joined: {employee.joinDate}
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">
                {stats.attendance}%
              </span>
            </div>
            <p className="mt-1 text-sm text-blue-600">Attendance</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <Calendar className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">
                {stats.leaves}
              </span>
            </div>
            <p className="mt-1 text-sm text-green-600">Leaves Balance</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <Building className="h-5 w-5 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">
                {stats.projects}
              </span>
            </div>
            <p className="mt-1 text-sm text-purple-600">Projects</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <Award className="h-5 w-5 text-yellow-600" />
              <span className="text-2xl font-bold text-yellow-600">
                {stats.trainings}
              </span>
            </div>
            <p className="mt-1 text-sm text-yellow-600">Trainings</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;