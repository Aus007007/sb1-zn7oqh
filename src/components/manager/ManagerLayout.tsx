import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  CheckSquare,
  BarChart2,
  Settings 
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function ManagerLayout() {
  const location = useLocation();
  const { user } = useAuthStore();

  const navigation = [
    { name: 'Dashboard', href: '/manager', icon: BarChart2 },
    { name: 'Team', href: '/manager/team', icon: Users },
    { name: 'Approvals', href: '/manager/approvals', icon: CheckSquare },
    { name: 'Settings', href: '/manager/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm">
          <div className="h-16 flex items-center px-6 border-b">
            <h1 className="text-xl font-bold text-gray-900">Manager Portal</h1>
          </div>
          <nav className="mt-6 px-3 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  } group flex items-center px-3 py-2 text-sm font-medium rounded-md`}
                >
                  <item.icon
                    className={`${
                      isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                    } flex-shrink-0 -ml-1 mr-3 h-6 w-6`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}