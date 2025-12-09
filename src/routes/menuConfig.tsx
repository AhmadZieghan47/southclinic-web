/**
 * Menu Configuration for V1 and V2 Sidebars
 */

import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  UserPlus,
  FlaskConical,
  Calendar,
  ArrowLeftRight,
} from 'lucide-react';
import type { MenuItem } from '../design-system/layouts/MainLayout/MainLayout.types';

/**
 * V1 Menu Items - Legacy Features
 */
export const v1MenuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
    path: '/v1/dashboard',
  },
  {
    id: 'patients',
    label: 'Patients',
    icon: <UserPlus size={20} />,
    children: [
      { id: 'patients-list', label: 'Patient List', path: '/v1/patients' },
      { id: 'patients-add', label: 'Add Patient', path: '/v1/patients/create' },
    ],
  },
  {
    id: 'pages',
    label: 'Pages',
    icon: <FileText size={20} />,
    children: [{ id: 'profile', label: 'Profile', path: '/v1/profile' }],
  },
  {
    id: 'users',
    label: 'Users',
    icon: <Users size={20} />,
    children: [
      { id: 'users-list', label: 'User List', path: '/v1/users' },
      { id: 'users-add', label: 'Add User', path: '/v1/users/add' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings size={20} />,
    path: '/v1/settings',
  },
  {
    id: 'switch-version',
    label: 'Switch to V2',
    icon: <ArrowLeftRight size={20} />,
    path: '/v2/dashboard',
  },
];

/**
 * V2 Menu Items - Enhanced Features
 */
export const v2MenuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
    path: '/v2/dashboard',
  },
  {
    id: 'patients',
    label: 'Patients',
    icon: <UserPlus size={20} />,
    children: [
      { id: 'patients-list', label: 'Patient List', path: '/v2/patients' },
      { id: 'patients-add', label: 'Add Patient', path: '/v2/patients/create' },
    ],
  },
  {
    id: 'appointments',
    label: 'Appointments',
    icon: <Calendar size={20} />,
    path: '/v2/appointments',
  },
  {
    id: 'pages',
    label: 'Pages',
    icon: <FileText size={20} />,
    children: [{ id: 'profile', label: 'Profile', path: '/v2/profile' }],
  },
  {
    id: 'users',
    label: 'Users',
    icon: <Users size={20} />,
    children: [
      { id: 'users-list', label: 'User List', path: '/v2/users' },
      { id: 'users-add', label: 'Add User', path: '/v2/users/add' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings size={20} />,
    path: '/v2/settings',
  },
  {
    id: 'api-test',
    label: 'API Test',
    icon: <FlaskConical size={20} />,
    path: '/v2/api-test',
  },
  {
    id: 'switch-version',
    label: 'Switch to V1',
    icon: <ArrowLeftRight size={20} />,
    path: '/v1/dashboard',
  },
];
