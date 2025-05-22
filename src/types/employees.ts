export type Role = 'admin' | 'employee' | 'supervisor';
export type Employee = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    department?: string;
    createdAt: string;
  };
  
  