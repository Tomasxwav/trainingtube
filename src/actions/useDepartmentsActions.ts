import { Department } from '@/types/employees';
import { fetchWithToken } from '@/utils/fetchWithToken';

export const useDepartmentsActions = () => {
  const addDepartment = async (department: Omit<Department, 'id'>) => {
    const response = await fetchWithToken('/departments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(department),
    });
    const data = await response.data;
    return data;
  };

  const updateDepartment = async (department: Department) => {
    const response = await fetchWithToken(`/departments/${department.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(department),
    });
    const data = await response.data;
    return data;
  };

  const getActiveDepartments = async () => {
    const response = await fetchWithToken('/departments/active');
    const data = await response.data;
    return data;
  };

  const toggleDepartment = async (id: string) => {
    const response = await fetchWithToken(`/departments/${id}/toggle-status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.data;
    return data;
  }

  const deleteDepartment = async (id: string) => {
    const response = await fetchWithToken(`/departments/${id}`, {
      method: 'DELETE',
    });
    const data = await response.data;
    return data;
  };

  return {
    addDepartment,
    updateDepartment,
    deleteDepartment,
    getActiveDepartments,
    toggleDepartment,
  };
};