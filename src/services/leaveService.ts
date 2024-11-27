import api from './api';

export interface LeaveRequest {
  id?: string;
  employeeId: string;
  employeeName: string;
  leaveType: string;
  project: string;
  applyingFor: 'Full Day' | 'Half Day';
  fromDate: string;
  toDate: string;
  approvingPerson: string;
  reportingManager: string;
  notifyOthers?: string;
  contactNumber: string;
  reason: string;
  flexibleWeekend?: boolean;
  status?: 'pending' | 'approved' | 'rejected';
  appliedOn?: string;
  days?: number;
}

export const leaveService = {
  submitLeaveRequest: async (data: Omit<LeaveRequest, 'id' | 'status' | 'appliedOn' | 'days'>) => {
    try {
      // Calculate days
      const fromDate = new Date(data.fromDate);
      const toDate = new Date(data.toDate);
      const days = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      // Simulated API call
      const response = await new Promise(resolve => setTimeout(() => {
        resolve({
          data: {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            status: 'pending',
            appliedOn: new Date().toISOString(),
            days,
          }
        });
      }, 1000));
      
      return response.data;
    } catch (error) {
      console.error('Leave request submission failed:', error);
      throw new Error('Failed to submit leave request');
    }
  },

  getLeaveBalance: async (userId: string) => {
    try {
      // Simulated API call
      const response = await new Promise(resolve => setTimeout(() => {
        resolve({
          data: {
            annual: 12,
            wfh: 5,
            lop: 0,
            paternity: 5,
          }
        });
      }, 500));
      
      return response.data;
    } catch (error) {
      console.error('Failed to fetch leave balance:', error);
      throw error;
    }
  },
};