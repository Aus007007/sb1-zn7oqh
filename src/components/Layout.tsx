import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Clock,
  CreditCard,
  LogOut,
  Menu,
  Upload,
  Settings,
  BarChart2,
  GraduationCap,
  Briefcase,
  DollarSign,
} from 'lucide-react';

export default function Layout() {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/app', icon: LayoutDashboard },
    { name: 'Employees', href: '/app/employees', icon: Users },
    { name: 'Attendance', href: '/app/attendance', icon: Clock },
    { name: 'Leaves', href: '/app/leaves', icon: Calendar },
    { name: 'Payroll', href: '/app/payroll', icon: CreditCard },
    { name: 'Performance', href: '/app/performance', icon: BarChart2 },
    { name: 'Training', href: '/app/training', icon: GraduationCap },
    { name: 'Recruitment', href: '/app/recruitment', icon: Briefcase },
    { name: 'Expenses', href: '/app/expenses', icon: DollarSign },
    { name: 'Import Data', href: '/app/import', icon: Upload },
    { name: 'Settings', href: '/app/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEmployeePortal = () => {
    navigate('/employee');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b px-4 py-2">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-screen`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <h1 className="text-xl font-bold text-gray-900">HR System</h1>
            <button
              onClick={handleEmployeePortal}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Employee Portal
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <nav className="px-2 py-4 space-y-1">
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
                    onClick={() => setIsMobileMenuOpen(false)}
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

          <div className="p-4 border-t">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {user?.name?.[0]}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-auto p-2 text-gray-400 hover:text-gray-500"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 mt-14 lg:mt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}