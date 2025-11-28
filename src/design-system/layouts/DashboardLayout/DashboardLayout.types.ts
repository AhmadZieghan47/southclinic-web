import type { ReactNode } from 'react';

export interface DashboardLayoutProps {
  /** Page title */
  title: string;
  /** Page subtitle/description */
  subtitle?: string;
  /** Header action buttons */
  actions?: ReactNode;
  /** Stats cards section */
  stats?: ReactNode;
  /** Main content */
  children: ReactNode;
  /** Breadcrumbs */
  breadcrumbs?: ReactNode;
  /** Additional class */
  className?: string;
}
