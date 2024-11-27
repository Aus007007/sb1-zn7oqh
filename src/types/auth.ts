export type UserRole = 'SUPER_ADMIN' | 'COMPANY_ADMIN' | 'HR' | 'MANAGER' | 'EMPLOYEE';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyId?: string;
  employeeId?: string;
  permissions: string[];
  status: 'active' | 'inactive';
}

export const PERMISSIONS = {
  // Super Admin permissions
  MANAGE_COMPANIES: 'manage:companies',
  MANAGE_COMPANY_ADMINS: 'manage:company_admins',
  VIEW_ALL_DATA: 'view:all_data',
  
  // Company Admin permissions
  MANAGE_COMPANY_SETTINGS: 'manage:company_settings',
  MANAGE_HR: 'manage:hr',
  VIEW_COMPANY_DATA: 'view:company_data',
  
  // HR permissions
  MANAGE_EMPLOYEES: 'manage:employees',
  MANAGE_LEAVES: 'manage:leaves',
  MANAGE_ATTENDANCE: 'manage:attendance',
  MANAGE_PAYROLL: 'manage:payroll',
  MANAGE_HOLIDAYS: 'manage:holidays',
  MANAGE_SALARY_STRUCTURE: 'manage:salary_structure',
  VIEW_EMPLOYEE_DATA: 'view:employee_data',
  
  // Manager permissions
  MANAGE_TEAM: 'manage:team',
  APPROVE_LEAVES: 'approve:leaves',
  APPROVE_ATTENDANCE: 'approve:attendance',
  APPROVE_REIMBURSEMENTS: 'approve:reimbursements',
  VIEW_TEAM_DATA: 'view:team_data',
  
  // Employee permissions
  VIEW_SELF_DATA: 'view:self_data',
  MANAGE_SELF_LEAVES: 'manage:self_leaves',
  MANAGE_SELF_ATTENDANCE: 'manage:self_attendance',
} as const;

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  SUPER_ADMIN: [
    PERMISSIONS.MANAGE_COMPANIES,
    PERMISSIONS.MANAGE_COMPANY_ADMINS,
    PERMISSIONS.VIEW_ALL_DATA,
  ],
  
  COMPANY_ADMIN: [
    PERMISSIONS.MANAGE_COMPANY_SETTINGS,
    PERMISSIONS.MANAGE_HR,
    PERMISSIONS.VIEW_COMPANY_DATA,
  ],
  
  HR: [
    PERMISSIONS.MANAGE_EMPLOYEES,
    PERMISSIONS.MANAGE_LEAVES,
    PERMISSIONS.MANAGE_ATTENDANCE,
    PERMISSIONS.MANAGE_PAYROLL,
    PERMISSIONS.MANAGE_HOLIDAYS,
    PERMISSIONS.MANAGE_SALARY_STRUCTURE,
    PERMISSIONS.VIEW_EMPLOYEE_DATA,
  ],
  
  MANAGER: [
    PERMISSIONS.MANAGE_TEAM,
    PERMISSIONS.APPROVE_LEAVES,
    PERMISSIONS.APPROVE_ATTENDANCE,
    PERMISSIONS.APPROVE_REIMBURSEMENTS,
    PERMISSIONS.VIEW_TEAM_DATA,
  ],
  
  EMPLOYEE: [
    PERMISSIONS.VIEW_SELF_DATA,
    PERMISSIONS.MANAGE_SELF_LEAVES,
    PERMISSIONS.MANAGE_SELF_ATTENDANCE,
  ],
};