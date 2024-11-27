import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe } from 'lucide-react';

const regions = [
  { 
    code: 'in', 
    name: 'India', 
    path: '/in',
    flag: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80&w=50&h=50'
  },
  { 
    code: 'us', 
    name: 'United States', 
    path: '/us',
    flag: 'https://images.unsplash.com/photo-1508433957232-3107f5fd5995?auto=format&fit=crop&q=80&w=50&h=50'
  },
  { 
    code: 'ca', 
    name: 'Canada', 
    path: '/ca',
    flag: 'https://images.unsplash.com/photo-1535041422672-8c3254ab9de9?auto=format&fit=crop&q=80&w=50&h=50'
  },
  { 
    code: 'ae', 
    name: 'UAE', 
    path: '/ae',
    flag: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&q=80&w=50&h=50'
  }
];

function RegionSelector() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const currentRegion = regions.find(r => location.pathname === r.path) || regions.find(r => location.pathname === '/') || regions[1]; // Default to US

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
      >
        <img 
          src={currentRegion.flag} 
          alt={currentRegion.name} 
          className="w-5 h-5 rounded-full object-cover"
        />
        <span>{currentRegion.name}</span>
        <Globe className="h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-2" role="menu">
            {regions.map((region) => (
              <Link
                key={region.code}
                to={region.path}
                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <img 
                  src={region.flag} 
                  alt={region.name} 
                  className="w-6 h-6 rounded-full object-cover mr-3"
                />
                <span>{region.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RegionSelector;