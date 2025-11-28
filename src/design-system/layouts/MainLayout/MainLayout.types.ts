import type { ReactNode } from 'react';

export interface MenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  path?: string;
  children?: {
    id: string;
    label: string;
    path: string;
  }[];
}

export interface MainLayoutProps {
  /** Logo text */
  logoText?: string;
  /** Menu items for sidebar */
  menuItems: MenuItem[];
  /** User name to display */
  userName?: string;
  /** Notification count */
  notificationCount?: number;
  /** Logout handler */
  onLogout?: () => void;
}
