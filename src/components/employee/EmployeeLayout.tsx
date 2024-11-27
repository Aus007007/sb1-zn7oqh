import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  User, 
  Home, 
  MessageSquare, 
  Briefcase, 
  CheckSquare, 
  DollarSign,
  Calendar,
  FileText,
  Settings,
  LogOut 
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

function EmployeeLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [openMenus, setOpenMenus] = React.useState<string[]>([]);

  const navigation = [
    { name: 'Home', href: '/employee', icon: Home },
    { name: 'Engage', href: '/employee/engage', icon: MessageSquare },
    { 
      name: 'My Worklife', 
      href: '/employee/worklife',
      icon: Briefcase,
      children: [
        { name: 'Timesheet', href: '/employee/attendance' },
        { name: 'Performance', href: '/employee/performance' },
        { name: 'Training', href: '/employee/training' },
      ]
    },
    { 
      name: 'To do', 
      href: '/employee/todo',
      icon: CheckSquare,
      children: [
        { name: 'Tasks', href: '/employee/tasks' },
        { name: 'Approvals', href: '/employee/approvals' },
      ]
    },
    { 
      name: 'Leave', 
      href: '/employee/leaves',
      icon: Calendar,
      children: [
        { name: 'Apply Leave', href: '/employee/leaves' },
        { name: 'Holiday Calendar', href: '/employee/leaves/calendar' },
        { name: 'Leave History', href: '/employee/leaves/history' },
        { name: 'Leave Policy', href: '/employee/leaves/policy' },
        { name: 'Request Comp-Off', href: '/employee/leaves/comp-off' },
      ]
    },
    { 
      name: 'Documents', 
      href: '/employee/documents',
      icon: FileText,
      children: [
        { name: 'My Documents', href: '/employee/documents/my' },
        { name: 'Company Documents', href: '/employee/documents/company' },
      ]
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = (name: string) => {
    setOpenMenus(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navigation */}
      <nav className="bg-[#2D3E50] text-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img src="/gspann-logo.png" alt="GSPANN" className="h-8" />
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-sm">Mobile App</button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gray-200">
                  <img 
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`}
                    alt={user?.name}
                    className="h-8 w-8 rounded-full"
                  />
                </div>
                <span className="text-sm">{user?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-gray-200">
                  <img 
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`}
                    alt={user?.name}
                    className="h-12 w-12 rounded-full"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium">Hi {user?.name?.split(' ')[0]}</div>
                  <Link to="/employee/profile" className="text-sm text-blue-600">
                    View My Info
                  </Link>
                </div>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={`${
                      location.pathname.startsWith(item.href)
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    } group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                    {item.children && (
                      <svg
                        className={`ml-auto h-5 w-5 transform ${
                          openMenus.includes(item.name) ? 'rotate-180' : ''
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                  {item.children && openMenus.includes(item.name) && (
                    <div className="ml-8 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className={`${
                            location.pathname === child.href
                              ? 'text-blue-600'
                              : 'text-gray-600 hover:text-gray-900'
                          } group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="p-4 border-t">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeLayout;