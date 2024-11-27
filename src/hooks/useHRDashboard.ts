import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

export function useHRDashboard() {
  const { user } = useAuthStore();

  const fetchDashboardStats = async () => {
    const response = await axios.get(`/api/hr/dashboard/${user?.id}`);
    return response.data;
  };

  return useQuery({
    queryKey: ['hr-dashboard', user?.id],
    queryFn: fetchDashboardStats,
    enabled: !!user?.id,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
}