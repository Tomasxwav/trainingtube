'use client';

import { useEffect, useState } from 'react';
import { Employee, EmployeeFormData, Role, Roles } from '@/types/employees';
import { EmployeeTable } from '@/partials/admin/Employees/EmployeeTable';
import { EmployeeModal } from '@/partials/admin/Employees/EmployeeModal';
import { Button } from '@/components/ui/button';
import { Plus, Users } from 'lucide-react';
import { useEmployeesActions } from '@/actions/useEmployeesActions';
import { toast } from 'sonner';

export function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const { getEmployees, createEmployee } = useEmployeesActions();
  useEffect(() => {
    getEmployees().then(data => setEmployees(data));
  }, []);

  const handleCreateEmployee = async (employeeData: EmployeeFormData) => {
    try {
      const loadingToast = toast.loading('Creating employee...');
      
      await createEmployee(employeeData);
      
      const employeeToAdd: Employee = {
        ...employeeData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        role: {
          id: crypto.randomUUID(),
          name: employeeData.role as Roles,
          authorities: [],
        },
      };
      
      setEmployees(prev => [...prev, employeeToAdd]);
      
      setIsModalOpen(false);
      
      toast.dismiss(loadingToast);
      toast.success(`${employeeData.role.toLowerCase()} ${employeeData.name} created successfully!`);
      
    } catch (error) {
      console.error('Error creating employee:', error);
      toast.error('Failed to create employee. Please try again.');
    }
  };

  const handleUpdateEmployee = (employeeData: EmployeeFormData) => {
    if (!editingEmployee) return;

    // TODO
    console.log('handleUpdateEmployee', employeeData);

    setEditingEmployee(null);
    setIsModalOpen(false);
  };

  const handleDeleteEmployee = (id: string) => {
    // TODO
    console.log('handleDeleteEmployee', id);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleRoleChange = (id: string, newRole: Roles) => {
    // TODO
    console.log('handleRoleChange', id, newRole);
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
                {employees.filter(emp => emp.role.name === 'SUPERVISOR').length}
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
                {employees.filter(emp => emp.role.name === 'EMPLOYEE').length}
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
