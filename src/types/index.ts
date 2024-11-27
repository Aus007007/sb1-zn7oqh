export interface Employee {
  id?: string;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  email: string;
  loginId: string;
  payrollId: string;
  employeeId: string;
  employeeType: 'Full-time Employee' | 'Contract' | 'Part-time';
  department: string;
  designation: string;
  practice: string;
  subPractice: string;
  baseLocation: string;
  depotLocation?: string;
  contactNumber: string;
  reportingManager: string;
  reportingManagerEmail: string;
  hrPartner: string;
  joinDate: string;
  companyName: string;
  annualCtc: number;
  currency: 'INR' | 'USD' | 'EUR' | 'GBP';
  effectiveDate: string;
  commission: number;
  annualBonus: number;
  otherBenefits: number;
  skills: {
    name: string;
    category: string;
    proficiency: string;
    experience: number;
    certified: boolean;
  }[];
  status?: 'active' | 'inactive';
}