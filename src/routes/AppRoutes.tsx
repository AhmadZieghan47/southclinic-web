/**
 * App Routes Configuration
 * React Router v6 setup with versioned routes (V1 and V2)
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../design-system';
import { Dashboard } from '../features/dashboard/Dashboard';
import { Login } from '../features/auth/Login';

// V1 Patient Components (Legacy)
import { PatientsList } from '../features/patients/PatientsList';
import { PatientDetails } from '../features/patients/PatientDetails';
import { EditPatient } from '../features/patients/EditPatient';

// V2 Patient Components (Enhanced)
import { PatientsListV2 } from '../features/patients/v2';
import { CreatePatientWizard } from '../features/patients/create';
import { PatientDetailsPage } from '../features/patients/details';

// V2 Appointments
import { AppointmentsList } from '../features/appointments';

// Shared
import { ApiTestPage } from '../features/api-test';
import { isAuthenticated } from '../api';

// Menu Configurations
import { v1MenuItems, v2MenuItems } from './menuConfig';

// Re-export for backwards compatibility
export { v1MenuItems, v2MenuItems };
export const menuItems = v2MenuItems; // Default to v2

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Public Route wrapper (redirect to dashboard if authenticated)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  if (isAuthenticated()) {
    return <Navigate to="/v2/dashboard" replace />;
  }
  return <>{children}</>;
};

export const AppRoutes = () => {
  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    window.location.href = '/login';
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* ========================================
          V1 Routes - Legacy Features
          ======================================== */}
      <Route
        path="/v1"
        element={
          <ProtectedRoute>
            <MainLayout
              logoText="South Center (V1)"
              menuItems={v1MenuItems}
              userName="John Doe"
              notificationCount={0}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/v1/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* V1 Patient Routes (Legacy) */}
        <Route path="patients" element={<PatientsList />} />
        <Route path="patients/create" element={<EditPatient />} />
        <Route path="patients/:id" element={<PatientDetails />} />
        <Route path="patients/:id/edit" element={<EditPatient />} />

        {/* V1 Other Routes */}
        <Route path="profile" element={<div>Profile Page (V1)</div>} />
        <Route path="users" element={<div>Users List (V1)</div>} />
        <Route path="users/add" element={<div>Add User (V1)</div>} />
        <Route path="settings" element={<div>Settings Page (V1)</div>} />
      </Route>

      {/* ========================================
          V2 Routes - Enhanced Features
          ======================================== */}
      <Route
        path="/v2"
        element={
          <ProtectedRoute>
            <MainLayout
              logoText="South Center"
              menuItems={v2MenuItems}
              userName="John Doe"
              notificationCount={5}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/v2/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* V2 Patient Routes (Enhanced) */}
        <Route path="patients" element={<PatientsListV2 />} />
        <Route path="patients/create" element={<CreatePatientWizard />} />
        <Route path="patients/:id" element={<PatientDetailsPage />} />
        <Route path="patients/:id/edit" element={<CreatePatientWizard />} />

        {/* V2 Appointments */}
        <Route path="appointments" element={<AppointmentsList />} />

        {/* V2 Other Routes */}
        <Route path="profile" element={<div>Profile Page</div>} />
        <Route path="users" element={<div>Users List</div>} />
        <Route path="users/add" element={<div>Add User</div>} />
        <Route path="settings" element={<div>Settings Page</div>} />
        <Route path="api-test" element={<ApiTestPage />} />
      </Route>

      {/* Root redirect to V2 (default version) */}
      <Route path="/" element={<Navigate to="/v2/dashboard" replace />} />

      {/* Legacy route redirects to V2 equivalents */}
      <Route path="/dashboard" element={<Navigate to="/v2/dashboard" replace />} />
      <Route path="/patients" element={<Navigate to="/v2/patients" replace />} />
      <Route path="/patients-v2" element={<Navigate to="/v2/patients" replace />} />
      <Route path="/appointments" element={<Navigate to="/v2/appointments" replace />} />

      {/* 404 - Redirect to V2 dashboard */}
      <Route path="*" element={<Navigate to="/v2/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
