import { fetchWithToken } from '@/utils/fetchWithToken';

export const useMetricsActions = () => {
  const getMyMetrics = async () => {
    const response = await fetchWithToken('/metrics/info');
    const data = await response.data;
    return data;
  };

  const getDepartmentMetrics = async (id: string) => {
    const response = await fetchWithToken(`/metrics/department/${id}`);
    const data = await response.data;
    return data;
  };

  const getAdminMetrics = async () => {
    const response = await fetchWithToken('/metrics/admin');
    const data = await response.data;
    return data;
  };

  const getSuperAdminMetrics = async () => {
    const response = await fetchWithToken('/metrics/superadmin');
    const data = await response.data;
    return data;
  };

  return {
    getMyMetrics,
    getDepartmentMetrics,
    getAdminMetrics,
    getSuperAdminMetrics,
  };
}