'use client';

import { useState } from 'react';
import { Employee, Role } from '@/types/employees';
import { EmployeeTable } from '@/partials/admin/Employees/EmployeeTable';
import { EmployeeModal } from '@/partials/admin/Employees/EmployeeModal';
import { Button } from '@/components/ui/button';
import { Plus, Users } from 'lucide-react';

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    password: 'hashedpassword',
    role: 'employee',
    department: 'Engineering',
    createdAt: '2023-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    password: 'hashedpassword',
    role: 'supervisor',
    department: 'Marketing',
    createdAt: '2023-02-20T10:00:00Z',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    password: 'hashedpassword',
    role: 'employee',
    department: 'Sales',
    createdAt: '2023-03-10T10:00:00Z',
  },
];

export function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const handleCreateEmployee = (employeeData: Omit<Employee, 'id' | 'createdAt'>) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    setEmployees(prev => [...prev, newEmployee]);
    setIsModalOpen(false);
  };

  const handleUpdateEmployee = (employeeData: Omit<Employee, 'id' | 'createdAt'>) => {
    if (!editingEmployee) return;
    
    setEmployees(prev => 
      prev.map(emp => 
        emp.id === editingEmployee.id 
          ? { ...emp, ...employeeData }
          : emp
      )
    );
    setEditingEmployee(null);
    setIsModalOpen(false);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleRoleChange = (id: string, newRole: Role) => {
    setEmployees(prev => 
      prev.map(emp => 
        emp.id === id 
          ? { ...emp, role: newRole }
          : emp
      )
    );
  };

  const openCreateModal = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Employee Management</h1>
            <p className="text-muted-foreground">Manage your team members and their roles</p>
          </div>
        </div>
        <Button onClick={openCreateModal} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Employee</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
              <p className="text-2xl font-bold text-foreground">{employees.length}</p>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Supervisors</p>
              <p className="text-2xl font-bold text-foreground">
                {employees.filter(emp => emp.role === 'supervisor').length}
              </p>
            </div>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Users className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Regular Employees</p>
              <p className="text-2xl font-bold text-foreground">
                {employees.filter(emp => emp.role === 'employee').length}
              </p>
            </div>
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Users className="h-5 w-5 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-card rounded-lg border">
        <EmployeeTable
          employees={employees}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
          onRoleChange={handleRoleChange}
        />
      </div>

      {/* Modal */}
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingEmployee ? handleUpdateEmployee : handleCreateEmployee}
        employee={editingEmployee}
      />
    </div>
  );
}
