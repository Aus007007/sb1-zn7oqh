import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Clock,
  Calendar,
  DollarSign,
  Award,
  BookOpen,
  Briefcase,
  FileText,
  Settings,
} from 'lucide-react';

const modules = [
  {
    id: 'employees',
    title: 'Core HR',
    description: 'Manage employee data, documents, and organizational structure',
    icon: Users,
    color: 'blue',
    path: '/app/employees',
    features: [
      'Employee profiles',
      'Document management',
      'Organization chart',
      'Asset tracking',
    ],
  },
  {
    id: 'attendance',
    title: 'Attendance',
    description: 'Track time, shifts, and attendance with advanced reporting',
    icon: Clock,
    color: 'green',
    path: '/app/attendance',
    features: [
      'Time tracking',
      'Shift management',
      'Overtime calculation',
      'Attendance reports',
    ],
  },
  {
    id: 'leaves',
    title: 'Leave Management',
    description: 'Streamline leave requests and approvals',
    icon: Calendar,
    color: 'purple',
    path: '/app/leaves',
    features: [
      'Leave requests',
      'Holiday calendar',
      'Leave balance tracking',
      'Approval workflows',
    ],
  },
  {
    id: 'payroll',
    title: 'Payroll',
    description: 'Automated payroll processing and compliance',
    icon: DollarSign,
    color: 'yellow',
    path: '/app/payroll',
    features: [
      'Salary processing',
      'Tax calculations',
      'Statutory compliance',
      'Pay slip generation',
    ],
  },
  {
    id: 'performance',
    title: 'Performance',
    description: 'Track and improve employee performance',
    icon: Award,
    color: 'red',
    path: '/app/performance',
    features: [
      'Performance reviews',
      'Goal tracking',
      'Feedback system',
      'Development plans',
    ],
  },
  {
    id: 'training',
    title: 'Training',
    description: 'Manage employee learning and development',
    icon: BookOpen,
    color: 'indigo',
    path: '/app/training',
    features: [
      'Course management',
      'Training schedules',
      'Progress tracking',
      'Certifications',
    ],
  },
  {
    id: 'recruitment',
    title: 'Recruitment',
    description: 'Streamline your hiring process',
    icon: Briefcase,
    color: 'pink',
    path: '/app/recruitment',
    features: [
      'Job postings',
      'Candidate tracking',
      'Interview scheduling',
      'Onboarding',
    ],
  },
  {
    id: 'expenses',
    title: 'Expenses',
    description: 'Track and manage employee expenses',
    icon: FileText,
    color: 'teal',
    path: '/app/expenses',
    features: [
      'Expense claims',
      'Approval workflow',
      'Receipt management',
      'Reimbursement',
    ],
  },
];

function ModulesPage() {
  const navigate = useNavigate();

  const handleModuleClick = (path: string) => {
    // Redirect to login first
    navigate('/login', { state: { returnUrl: path } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                HR System
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            HR System Modules
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Sign in to access these comprehensive HR modules
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => handleModuleClick(module.path)}
              className="relative group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 text-left w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-8">
                <div className={`text-${module.color}-600 group-hover:text-white`}>
                  <module.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-white">
                  {module.title}
                </h3>
                <p className="mt-2 text-gray-500 group-hover:text-white">
                  {module.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {module.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-gray-600 group-hover:text-white"
                    >
                      <svg
                        className="h-4 w-4 mr-2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModulesPage;