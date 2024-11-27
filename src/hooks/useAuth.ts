import { useAuthStore } from '../store/authStore';
import { PERMISSIONS, UserRole } from '../types/auth';

export function useAuth() {
  const { user } = useAuthStore();

  const hasPermission = (permission: keyof typeof PERMISSIONS) => {
    if (!user?.permissions) return false;
    return user.permissions.includes(PERMISSIONS[permission]);
  };

  const hasRole = (role: UserRole) => {
    if (!user?.role) return false;
    return user.role === role;
  };

  const isSuperAdmin = () => hasRole('SUPER_ADMIN');
  const isCompanyAdmin = () => hasRole('COMPANY_ADMIN');
  const isHR = () => hasRole('HR');
  const isEmployee = () => hasRole('EMPLOYEE');

  const getCompanyId = () => user?.companyId;

  return {
    user,
    hasPermission,
    hasRole,
    isSuperAdmin,
    isCompanyAdmin,
    isHR,
    isEmployee,
    getCompanyId,
  };
}