import api from './api';
import type { Employee } from '../types';
import { useAuth } from '../hooks/useAuth';

export const employeeService = {
  getEmployees: async () => {
    try {
      const response = await api.get('/api/employees');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      throw error;
    }
  },

  addEmployee: async (data: Partial<Employee>) => {
    try {
      // Ensure company ID is included for multi-tenancy
      const { getCompanyId } = useAuth();
      const employeeData = {
        ...data,
        companyId: getCompanyId(),
      };

      const response = await api.post('/api/employees', employeeData);
      return response.data;
    } catch (error) {
      console.error('Failed to add employee:', error);
      throw error;
    }
  },

  updateEmployee: async (id: string, data: Partial<Employee>) => {
    try {
      const response = await api.put(`/api/employees/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to update employee:', error);
      throw error;
    }
  },

  deleteEmployee: async (id: string) => {
    try {
      await api.delete(`/api/employees/${id}`);
    } catch (error) {
      console.error('Failed to delete employee:', error);
      throw error;
    }
  },

  // Function to get employee by ID - includes permission check
  getEmployeeById: async (id: string) => {
    try {
      const { user, hasPermission } = useAuth();
      
      // Only allow access if user has permission or is viewing their own data
      if (!hasPermission('VIEW_EMPLOYEE_DATA') && user?.employeeId !== id) {
        throw new Error('Unauthorized');
      }

      const response = await api.get(`/api/employees/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch employee:', error);
      throw error;
    }
  },
};