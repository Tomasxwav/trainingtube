import { EmployeeFormData } from '@/types/employees';
import { fetchWithToken } from '@/utils/fetchWithToken';

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
  
  return {
    getEmployees,
    getEmployee,
    createEmployee,
  };
};