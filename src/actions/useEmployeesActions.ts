import { EmployeeFormData } from '@/types/employees';
import { fetchWithToken } from '@/utils/fetchWithToken';
import { toast } from 'sonner';

export const useEmployeesActions = () => {
  const getEmployees = async () => {
    const response = await fetchWithToken('/employees');
    const data = await response.data;
    return data;
  };

  const getEmployee = async (id: string) => {
    const response = await fetchWithToken(`/employees/${id}`);
    const data = await response.data;
    return data;
  };

  const createEmployee = async (employee: EmployeeFormData ) => {
    const response = await fetchWithToken('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    const data = await response.data;
    return data;
  };

  const updateEmployee = async (id: string, employee: EmployeeFormData) => {
    const response = await fetchWithToken(`/employees/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    const data = await response.data;
    return data;
  };

  const deleteEmployee = async (id: string) => {
    const response = await fetchWithToken(`/employees/${id}`, {
      method: 'DELETE',
    });
    const data = await response.data;
    if (response.ok) {
      toast.success(`Employee deleted successfully`);
      return data;
    }
    toast.error(`Error deleting employee: ${response.error}`);
    return data;
  };

  const getDepartmentEmployees = async () => {
    const response = await fetchWithToken(`/employees/department`);
    const data = await response.data;
    return data;
  };

  const updateDepartmentEmployee = async (id: string, employee: EmployeeFormData) => {
    const response = await fetchWithToken(`/employees/department/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    const data = await response.data;
    return data;
  };

  const createDepartmentEmployee = async (employee: EmployeeFormData ) => {
    const response = await fetchWithToken('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    const data = await response.data;
    return data;
  };

  const deleteDepartmentEmployee = async (id: string) => {
    const response = await fetchWithToken(`/employees/department/${id}`, {
      method: 'DELETE',
    });
    const data = await response.data;
    if (response.ok) {
      toast.success(`Employee deleted successfully`);
      return data;
    }
    toast.error(`Error deleting employee: ${response.error}`);
    return data;
  };
  
  return {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getDepartmentEmployees,
    updateDepartmentEmployee,
    createDepartmentEmployee,
    deleteDepartmentEmployee
  };
};