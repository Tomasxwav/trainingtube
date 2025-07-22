'use client';

import { useEffect, useState } from 'react';
import { Plus, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Department } from '@/types/employees';
import { useDepartmentsActions } from '@/actions/useDepartmentsActions';
import { useDepartmentStore } from '@/stores/departmentStore'; 
import { toast } from 'sonner';
import { DepartmentsTable } from './DepartmentsTable';
import { DepartmentsModal } from './DepartmentsModal';

export type DepartmentFormData = {
  name: string;
  description: string;
  active: boolean;
};

export default function DepartmentsManagement() {
  const { departments, fetchDepartments } = useDepartmentStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

  const { addDepartment, updateDepartment, deleteDepartment, toggleDepartment } = useDepartmentsActions();

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const handleCreateDepartment = async (department: DepartmentFormData) => {
    try {
      const loadingToast = toast.loading('Creando departamento...');
      
      await addDepartment(department);
      
      await fetchDepartments(); 
      
      setIsModalOpen(false);
      
      toast.dismiss(loadingToast);
      toast.success(`Departamento ${department.name} creado exitosamente!`);
      
    } catch (error) {
      console.error('Error al crear departamento:', error);
      toast.error('No se pudo crear el departamento. Por favor, inténtalo de nuevo.');
    }
  };

  const handleUpdateDepartment = async (department: DepartmentFormData) => {
    if (!editingDepartment) return;
    
    try {
      const loadingToast = toast.loading('Actualizando departamento...');
      
      await updateDepartment({ ...editingDepartment, ...department });
      
      await fetchDepartments();
      
      setEditingDepartment(null);
      setIsModalOpen(false);
      
      toast.dismiss(loadingToast);
      toast.success(`Departamento ${department.name} actualizado exitosamente!`);
      
    } catch (error) {
      console.error('Error al actualizar departamento:', error);
      toast.error('No se pudo actualizar el departamento. Por favor, inténtalo de nuevo.');
    }
  };

  const handleDeleteDepartment = async (id: string) => {
    try {
      const loadingToast = toast.loading('Eliminando departamento...');
      
      await deleteDepartment(id);
      
      await fetchDepartments();
      
      toast.dismiss(loadingToast);
      toast.success('Departamento eliminado exitosamente!');
      
    } catch (error) {
      console.error('Error al eliminar departamento:', error);
      toast.error('No se pudo eliminar el departamento. Por favor, inténtalo de nuevo.');
    }
  };

  const handleToggleDepartment = async (id: string) => {
    try {
      const loadingToast = toast.loading('Cambiando estado del departamento...');
      
      await toggleDepartment(id);
      
      await fetchDepartments();
      
      toast.dismiss(loadingToast);
      toast.success('Estado del departamento actualizado exitosamente!');
      
    } catch (error) {
      console.error('Error al cambiar estado del departamento:', error);
      toast.error('No se pudo cambiar el estado del departamento. Por favor, inténtalo de nuevo.');
    }
  };

  const handleEditDepartment = (department: Department) => {
    setEditingDepartment(department);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingDepartment(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDepartment(null);
  };
  
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gestión de Departamentos</h1>
            <p className="text-muted-foreground">Administra los departamentos de tu organización</p>
          </div>
        </div>
        <Button onClick={openCreateModal} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Agregar Departamento</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total de Departamentos</p>
              <p className="text-2xl font-bold text-foreground">{departments.length}</p>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Building2 className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Departamentos Activos</p>
              <p className="text-2xl font-bold text-foreground">
                {departments.filter(dept => dept.active).length}
              </p>
            </div>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Building2 className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Departamentos Inactivos</p>
              <p className="text-2xl font-bold text-foreground">
                {departments.filter(dept => !dept.active).length}
              </p>
            </div>
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Building2 className="h-5 w-5 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

     {/*  <div className="bg-card rounded-lg border">
        <DepartmentsTable
          departments={departments}
          onEdit={handleEditDepartment}
          onDelete={handleDeleteDepartment}
          onToggle={handleToggleDepartment}
        />
      </div>

      <DepartmentsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingDepartment ? handleUpdateDepartment : handleCreateDepartment}
        department={editingDepartment}
      /> */}
    </div>
  );
}