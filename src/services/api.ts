import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add company ID to requests for multi-tenancy
api.interceptors.request.use((config) => {
  const user = useAuthStore.getState().user;
  
  // Add auth token
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Add company ID for company-specific requests
  if (user?.companyId && !user?.role.includes('SUPER_ADMIN')) {
    config.headers['X-Company-ID'] = user.companyId;
  }

  return config;
});

// Handle unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;