export type Role = {
    id: string;
    name: Roles;
    authorities: string[];
  };

export type Roles = 'ADMIN' | 'SUPERVISOR' | 'EMPLOYEE';

export type Department = {
    id: string;
    name: string;
    description: string;
    active: boolean;
  };

export type Employee = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    department: Department;
    createdAt: string;
  };

export type EmployeeFormData = {
    name: string;
    email: string;
    password: string;
    role: Roles;
    department_id: number;
  };

export type GeneralMetrics = {
    totalEmployees?: number;
    totalVideos?: number;
    totalComments?: number;
    totalFavorites?: number;
    totalInteractions?: number;
  };
  
export type SupervisorMetrics = {
      departmentName: string;
      totalEmployees: number;
      totalFinalized: number;
      averageCompletionRate: number;
    };