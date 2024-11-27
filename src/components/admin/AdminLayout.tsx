import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Building, Users, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useAuth } from '../../hooks/useAuth';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { isSuperAdmin } = useAuth();

  const navigation = [
    { name: 'Companies', href: '/admin/companies', icon: Building },
    { name: 'HR Setup', href: '/admin/hr/setup', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isSuperAdmin()) {
    navigate('/unauthorized');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/admin" className="text-2xl font-bold text-blue-600">
                  HR System Admin
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="col-span-12 md:col-span-3">
              <nav className="space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        isActive
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      } group flex items-center px-3 py-2 text-sm font-medium border-l-4`}
                    >
                      <item.icon
                        className={`${
                          isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                        } flex-shrink-0 -ml-1 mr-3 h-6 w-6`}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Main content */}
            <div className="col-span-12 md:col-span-9">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}