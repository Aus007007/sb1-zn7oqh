import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePermissions } from '../hooks/usePermissions';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
  requiredRole?: string;
}

export default function ProtectedRoute({ 
  children, 
  requiredPermissions = [], 
  requiredRole 
}: ProtectedRouteProps) {
  const { hasPermission, hasRole } = usePermissions();

  // Check role if specified
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check permissions if specified
  if (requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every(permission => 
      hasPermission(permission as keyof typeof PERMISSIONS)
    );
    
    if (!hasAllPermissions) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
}