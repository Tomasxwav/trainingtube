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
      const loadingToast = toast.loading('Creando empleado...');
      
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
        department: {
          id: crypto.randomUUID(),
          description: '',
          name: employeeData.department,
          active: true,
        },
      };
      
      setEmployees(prev => [...prev, employeeToAdd]);
      
      setIsModalOpen(false);
      
      toast.dismiss(loadingToast);
      toast.success(`${employeeData.role.toLowerCase()} ${employeeData.name} creado exitosamente!`);
      
    } catch (error) {
      console.error('Error al crear empleado:', error);
      toast.error('No se pudo crear el empleado. Por favor, inténtalo de nuevo.');
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
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gestión de Empleados</h1>
            <p className="text-muted-foreground">Administra los miembros de tu equipo y sus roles</p>
          </div>
        </div>
        <Button onClick={openCreateModal} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Agregar Empleado</span>
        </Button>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total de Empleados</p>
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
              <p className="text-sm font-medium text-muted-foreground">Supervisores</p>
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
              <p className="text-sm font-medium text-muted-foreground">Empleados Regulares</p>
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

      {/* Tabla de Empleados */}
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
