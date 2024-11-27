import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getTenantFromSubdomain } from '../utils/tenant';

interface TenantConfig {
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
}

export const useTenant = () => {
  const [tenant, setTenant] = useState<TenantConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTenant = async () => {
      try {
        const tenantId = getTenantFromSubdomain();
        if (!tenantId) {
          throw new Error('Invalid tenant');
        }

        const tenantDoc = await getDoc(doc(db, 'tenants', tenantId));
        if (!tenantDoc.exists()) {
          throw new Error('Tenant not found');
        }

        setTenant(tenantDoc.data() as TenantConfig);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tenant');
      } finally {
        setLoading(false);
      }
    };

    loadTenant();
  }, []);

  return { tenant, loading, error };
};