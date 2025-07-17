export type Role = {
    id: string;
    name: Roles;
    authorities: string[];
  };

export type Roles = 'ADMIN' | 'SUPERVISOR' | 'EMPLOYEE';

export type Employee = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    department?: string;
    createdAt: string;
  };

export type EmployeeFormData = {
    name: string;
    email: string;
    password: string;
    role: Roles;
    department: string;
  };
  
  