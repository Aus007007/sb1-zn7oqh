import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../store/authStore';
import { Lock, Mail } from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { User } from '../types/auth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

const demoUsers = {
  superAdmin: {
    email: 'admin@hrsystem.com',
    password: 'admin123',
    userData: {
      id: 'admin1',
      email: 'admin@hrsystem.com',
      name: 'System Admin',
      role: 'SUPER_ADMIN',
      permissions: [
        'manage:companies',
        'manage:company_admins',
        'view:all_data',
      ],
      status: 'active',
    },
  },
  companyAdmin: {
    email: 'company@demo.com',
    password: 'company123',
    userData: {
      id: 'comp1',
      email: 'company@demo.com',
      name: 'Company Admin',
      role: 'COMPANY_ADMIN',
      companyId: 'demo-company',
      permissions: [
        'manage:company_settings',
        'manage:hr',
        'view:company_data',
      ],
      status: 'active',
    },
  },
  hr: {
    email: 'hr@demo.com',
    password: 'hr123',
    userData: {
      id: 'hr1',
      email: 'hr@demo.com',
      name: 'HR Manager',
      role: 'HR',
      companyId: 'demo-company',
      permissions: [
        'manage:employees',
        'manage:leaves',
        'manage:attendance',
        'manage:payroll',
        'manage:holidays',
        'manage_salary_structure',
        'view:employee_data',
      ],
      status: 'active',
    },
  },
  employee: {
    email: 'demo@example.com',
    password: 'demo123',
    userData: {
      id: 'emp1',
      email: 'demo@example.com',
      name: 'Demo Employee',
      role: 'EMPLOYEE',
      companyId: 'demo-company',
      employeeId: 'EMP001',
      permissions: [
        'view:self_data',
        'manage:self_leaves',
        'manage:self_attendance',
      ],
      status: 'active',
    },
  },
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuthStore();
  const [selectedRole, setSelectedRole] = React.useState('employee');
  const [error, setError] = React.useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setError('');
      // Find matching demo user
      const demoUser = Object.values(demoUsers).find(
        (user) => user.email.toLowerCase() === data.email.toLowerCase() && user.password === data.password
      );

      if (!demoUser) {
        setError('Invalid email or password');
        return;
      }

      setUser(demoUser.userData);
      toast.success('Login successful!');
      
      // Redirect based on role
      const returnUrl = location.state?.from?.pathname || getDefaultRoute(demoUser.userData.role);
      navigate(returnUrl);
    } catch (error) {
      console.error('Login failed:', error);
      setError('An error occurred during login');
    }
  };

  const getDefaultRoute = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return '/admin/companies';
      case 'COMPANY_ADMIN':
        return '/company';
      case 'HR':
        return '/hr';
      case 'EMPLOYEE':
        return '/employee';
      default:
        return '/app';
    }
  };

  const setDemoCredentials = (role: string) => {
    const user = demoUsers[role as keyof typeof demoUsers];
    if (user) {
      setValue('email', user.email);
      setValue('password', user.password);
      setSelectedRole(role);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to HR System
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Select a demo account to explore the system
          </p>
        </div>

        {/* Demo Account Selection */}
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(demoUsers).map(([role, user]) => (
            <button
              key={role}
              onClick={() => setDemoCredentials(role)}
              className={`p-4 rounded-lg border-2 text-left ${
                selectedRole === role
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-gray-900">
                {user.userData.role.replace('_', ' ')}
              </div>
              <div className="text-sm text-gray-500">{user.email}</div>
              <div className="text-xs text-gray-400">Password: {user.password}</div>
            </button>
          ))}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('email')}
                  id="email"
                  type="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('password')}
                  id="password"
                  type="password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}