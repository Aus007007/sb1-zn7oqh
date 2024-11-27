import React from 'react';
import { useTenant } from '../hooks/useTenant';

interface TenantContextType {
  tenant: {
    id: string;
    name: string;
    logo?: string;
    theme: {
      primaryColor: string;
      secondaryColor: string;
    };
    modules: {
      recruitment: boolean;
      training: boolean;
      expenses: boolean;
    };
  } | null;
  loading: boolean;
  error: string | null;
}

export const TenantContext = React.createContext<TenantContextType>({
  tenant: null,
  loading: true,
  error: null,
});

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const tenantData = useTenant();

  if (tenantData.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (tenantData.error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-gray-600">{tenantData.error}</p>
        </div>
      </div>
    );
  }

  return (
    <TenantContext.Provider value={tenantData}>
      {children}
    </TenantContext.Provider>
  );
}