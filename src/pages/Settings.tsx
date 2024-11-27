import React from 'react';
import { Settings, Bell, Lock, Building, DollarSign } from 'lucide-react';

function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              General Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Company Information
                    </p>
                    <p className="text-sm text-gray-500">
                      Update your company details and preferences
                    </p>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  Edit
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Notifications
                    </p>
                    <p className="text-sm text-gray-500">
                      Configure notification preferences
                    </p>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  Configure
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Security</p>
                    <p className="text-sm text-gray-500">
                      Manage security settings and permissions
                    </p>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  Manage
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              HR Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="workingDays"
                  className="block text-sm font-medium text-gray-700"
                >
                  Working Days
                </label>
                <select
                  id="workingDays"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option>Monday - Friday</option>
                  <option>Monday - Saturday</option>
                  <option>Custom</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="leavePolicy"
                  className="block text-sm font-medium text-gray-700"
                >
                  Leave Policy
                </label>
                <select
                  id="leavePolicy"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option>Standard</option>
                  <option>Custom</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="attendanceTracking"
                  className="block text-sm font-medium text-gray-700"
                >
                  Attendance Tracking
                </label>
                <select
                  id="attendanceTracking"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option>Flexible</option>
                  <option>Fixed</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Payroll Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Salary Components
                    </p>
                    <p className="text-sm text-gray-500">
                      Configure salary structure and components
                    </p>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  Configure
                </button>
              </div>

              <div>
                <label
                  htmlFor="payrollCycle"
                  className="block text-sm font-medium text-gray-700"
                >
                  Payroll Cycle
                </label>
                <select
                  id="payrollCycle"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option>Monthly</option>
                  <option>Bi-weekly</option>
                  <option>Weekly</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t text-right">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;