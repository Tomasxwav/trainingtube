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
    department: string;
  };
  
  