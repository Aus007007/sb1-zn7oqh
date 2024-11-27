import React from 'react';
import { useAuthStore } from '../store/authStore';
import Dashboard from '../pages/Dashboard';

function RoleDashboard() {
  const { user } = useAuthStore();

  if (!user) {
    return null;
  }

  return <Dashboard />;
}

export default RoleDashboard;