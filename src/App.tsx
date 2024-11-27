import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeeLayout from './components/employee/EmployeeLayout';
import EmployeeDashboard from './pages/dashboards/EmployeeDashboard';
import EmployeeProfile from './pages/employee/EmployeeProfile';
import EmployeeLeaves from './pages/employee/EmployeeLeaves';
import EmployeeAttendance from './pages/employee/EmployeeAttendance';
import LandingPage from './pages/landing/LandingPage';
import PrivateRoute from './components/PrivateRoute';
import UnauthorizedPage from './pages/UnauthorizedPage';
import NotFoundPage from './pages/NotFoundPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* Employee Routes */}
            <Route path="/employee" element={
              <PrivateRoute requiredRole="EMPLOYEE">
                <EmployeeLayout />
              </PrivateRoute>
            }>
              <Route index element={<EmployeeDashboard />} />
              <Route path="profile" element={<EmployeeProfile />} />
              <Route path="attendance" element={<EmployeeAttendance />} />
              <Route path="leaves" element={<EmployeeLeaves />} />
              <Route path="leaves/history" element={<EmployeeLeaves />} />
              <Route path="leaves/calendar" element={<EmployeeLeaves />} />
              <Route path="leaves/policy" element={<EmployeeLeaves />} />
              <Route path="leaves/comp-off" element={<EmployeeLeaves />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Toaster position="top-right" />
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}