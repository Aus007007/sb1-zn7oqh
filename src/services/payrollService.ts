import axios from './api';

interface SalaryComponent {
  name: string;
  type: 'earning' | 'deduction';
  calculationType: 'fixed' | 'percentage';
  value: number;
  baseComponent?: string; // For percentage-based calculations
  isDefault: boolean;
}

interface SalaryStructure {
  employeeId: string;
  components: SalaryComponent[];
}

export const defaultSalaryStructure: SalaryComponent[] = [
  {
    name: 'Basic',
    type: 'earning',
    calculationType: 'percentage',
    value: 40, // 40% of CTC
    isDefault: true,
  },
  {
    name: 'HRA',
    type: 'earning',
    calculationType: 'percentage',
    value: 50, // 50% of Basic
    baseComponent: 'Basic',
    isDefault: true,
  },
  {
    name: 'Special Allowance',
    type: 'earning',
    calculationType: 'fixed',
    value: 0, // Will be calculated as remaining amount
    isDefault: true,
  },
  {
    name: 'LTA',
    type: 'earning',
    calculationType: 'fixed',
    value: 3500,
    isDefault: true,
  },
  {
    name: 'PF',
    type: 'deduction',
    calculationType: 'percentage',
    value: 12, // 12% of Basic
    baseComponent: 'Basic',
    isDefault: true,
  },
  {
    name: 'Professional Tax',
    type: 'deduction',
    calculationType: 'fixed',
    value: 200,
    isDefault: true,
  },
];

export const payrollService = {
  calculateSalaryBreakup: (ctc: number, components: SalaryComponent[] = defaultSalaryStructure) => {
    const breakup: Record<string, number> = {};
    let remainingAmount = ctc;

    // First pass: Calculate fixed components and percentage-based components
    components.forEach(component => {
      if (component.calculationType === 'fixed' && component.name !== 'Special Allowance') {
        breakup[component.name] = component.value;
        remainingAmount -= component.value;
      } else if (component.calculationType === 'percentage') {
        const baseValue = component.baseComponent 
          ? breakup[component.baseComponent] 
          : ctc;
        breakup[component.name] = Math.round((baseValue * component.value) / 100);
        if (!component.baseComponent) {
          remainingAmount -= breakup[component.name];
        }
      }
    });

    // Second pass: Calculate deductions
    components
      .filter(c => c.type === 'deduction')
      .forEach(component => {
        if (component.calculationType === 'percentage') {
          const baseValue = component.baseComponent 
            ? breakup[component.baseComponent] 
            : ctc;
          breakup[component.name] = Math.round((baseValue * component.value) / 100);
        }
      });

    // Assign remaining amount to Special Allowance
    breakup['Special Allowance'] = Math.max(0, remainingAmount);

    return breakup;
  },

  getSalaryStructure: async (employeeId: string) => {
    try {
      const response = await axios.get(`/api/payroll/structure/${employeeId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch salary structure:', error);
      return defaultSalaryStructure;
    }
  },

  updateSalaryStructure: async (employeeId: string, components: SalaryComponent[]) => {
    try {
      const response = await axios.put(`/api/payroll/structure/${employeeId}`, { components });
      return response.data;
    } catch (error) {
      console.error('Failed to update salary structure:', error);
      throw error;
    }
  },

  generatePayslip: async (employeeId: string, month: string) => {
    try {
      const response = await axios.get(`/api/payroll/payslip/${employeeId}/${month}`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Failed to generate payslip:', error);
      throw error;
    }
  },

  downloadPayslip: async (employeeId: string, month: string) => {
    try {
      const blob = await payrollService.generatePayslip(employeeId, month);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `payslip_${employeeId}_${month}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to download payslip:', error);
      throw error;
    }
  },

  viewPayslip: async (employeeId: string, month: string) => {
    try {
      const blob = await payrollService.generatePayslip(employeeId, month);
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Failed to view payslip:', error);
      throw error;
    }
  },
};