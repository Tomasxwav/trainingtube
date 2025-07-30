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

  const getDepartmentEmployees = async (id: string) => {
    const response = await fetchWithToken(`/employees/departments`);
    const data = await response.data;
    return data;
  };

  const updateDepartmentEmployees = async (id: string, employees: EmployeeFormData[]) => {
    const response = await fetchWithToken(`/employees/departments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employees),
    });
    const data = await response.data;
    return data;
  };

  
  return {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getDepartmentEmployees,
    updateDepartmentEmployees,
  };
};