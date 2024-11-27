import { useAuthStore } from '../store/authStore';
import { PERMISSIONS, ROLE_PERMISSIONS } from '../types/auth';

export function usePermissions() {
  const { user } = useAuthStore();

  const hasPermission = (permission: keyof typeof PERMISSIONS) => {
    if (!user?.permissions) return false;
    return user.permissions.includes(PERMISSIONS[permission]);
  };

  const hasRole = (role: string) => {
    return user?.role === role;
  };

  const isCompanyAdmin = () => hasRole('COMPANY_ADMIN');
  const isHR = () => hasRole('HR');
  const isEmployee = () => hasRole('EMPLOYEE');

  const canManageHR = () => hasPermission('MANAGE_HR');
  const canManageEmployees = () => hasPermission('MANAGE_EMPLOYEES');
  const canManageSettings = () => hasPermission('MANAGE_COMPANY_SETTINGS');
  const canViewReports = () => hasPermission('VIEW_REPORTS');

  return {
    hasPermission,
    hasRole,
    isCompanyAdmin,
    isHR,
    isEmployee,
    canManageHR,
    canManageEmployees,
    canManageSettings,
    canViewReports,
  };
}