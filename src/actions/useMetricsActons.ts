import { fetchWithToken } from '@/utils/fetchWithToken';

export const useMetricsActions = () => {
  const getMyMetrics = async () => {
    const response = await fetchWithToken('/metrics/employee');
    const data = await response.data;
    return data;
  };

  const getMyActivity = async () => {
    const response = await fetchWithToken('/metrics/employee/activity');
    const data = await response.data;
    return data;
  };

  const getDepartmentMetrics = async () => {
    const response = await fetchWithToken(`/metrics/supervisor`);
    const data = await response.data;
    return data;
  };

  const getDepartmentProgress = async () => {
    const response = await fetchWithToken(`/metrics/supervisor/progress`);
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
    getMyActivity,
    getDepartmentMetrics,
    getDepartmentProgress,
    getAdminMetrics,
    getSuperAdminMetrics,
  };
}