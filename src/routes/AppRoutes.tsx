/**
 * App Routes Configuration
 * React Router v6 setup with protected routes
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../design-system';
import { Dashboard } from '../features/dashboard/Dashboard';
import { Login } from '../features/auth/Login';
import { Register } from '../features/auth/Register';
import { PatientsList } from '../features/patients/PatientsList';
import { PatientsListV2 } from '../features/patients/v2';
import { CreatePatientWizard } from '../features/patients/create';
import { PatientDetails } from '../features/patients/PatientDetails';
import { PatientDetailsPage } from '../features/patients/details';
import { EditPatient } from '../features/patients/EditPatient';
import { LayoutDashboard, Users, Settings, FileText, UserPlus, FlaskConical, Calendar } from 'lucide-react';
import { AppointmentsList } from '../features/appointments';
import { ApiTestPage } from '../features/api-test';
import { isAuthenticated } from '../api';

// Menu configuration
export const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
    path: '/dashboard',
  },
  {
    id: 'patients',
    label: 'Patients',
    icon: <UserPlus size={20} />,
    children: [
      { id: 'patients-list', label: 'Patient List', path: '/patients' },
      { id: 'patients-list-v2', label: 'Patients (V2)', path: '/patients-v2' },
      { id: 'patients-add', label: 'Add Patient', path: '/patients/create' },
    ],
  },
  {
    id: 'appointments',
    label: 'Appointments',
    icon: <Calendar size={20} />,
    path: '/appointments',
  },
  {
    id: 'pages',
    label: 'Pages',
    icon: <FileText size={20} />,
    children: [
      { id: 'home', label: 'Home', path: '/' },
      { id: 'profile', label: 'Profile', path: '/profile' },
    ],
  },
  {
    id: 'users',
    label: 'Users',
    icon: <Users size={20} />,
    children: [
      { id: 'users-list', label: 'User List', path: '/users' },
      { id: 'users-add', label: 'Add User', path: '/users/add' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings size={20} />,
    path: '/settings',
  },
  {
    id: 'api-test',
    label: 'API Test',
    icon: <FlaskConical size={20} />,
    path: '/api-test',
  },
];

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
    return <Navigate to="/dashboard" replace />;
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
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout
              logoText="South Center"
              menuItems={menuItems}
              userName="John Doe"
              notificationCount={5}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        
        {/* Patient Routes */}
        <Route path="patients" element={<PatientsList />} />
        <Route path="patients-v2" element={<PatientsListV2 />} />
        <Route path="patients/create" element={<CreatePatientWizard />} />
        <Route path="patients/:id" element={<PatientDetails />} />
        <Route path="patients/:id/details" element={<PatientDetailsPage />} />
        <Route path="patients/:id/edit" element={<EditPatient />} />
        
        {/* Appointment Routes */}
        <Route path="appointments" element={<AppointmentsList />} />
        
        <Route path="profile" element={<div>Profile Page</div>} />
        <Route path="users" element={<div>Users List</div>} />
        <Route path="users/add" element={<div>Add User</div>} />
        <Route path="settings" element={<div>Settings Page</div>} />
        <Route path="api-test" element={<ApiTestPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
