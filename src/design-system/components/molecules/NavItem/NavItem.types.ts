import type { ReactNode, HTMLAttributes } from 'react';

export interface NavItemProps extends HTMLAttributes<HTMLElement> {
  /** Nav item label */
  label: string;
  /** Icon element */
  icon?: ReactNode;
  /** Link href */
  href?: string;
  /** Active state */
  active?: boolean;
  /** Collapsed state (icon only) */
  collapsed?: boolean;
  /** Badge content */
  badge?: ReactNode;
  /** Click handler (for non-link items) */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
}

export interface NavGroupProps {
  /** Group label */
  label: string;
  /** Icon element */
  icon?: ReactNode;
  /** Child nav items */
  children: ReactNode;
  /** Default expanded state */
  defaultExpanded?: boolean;
  /** Collapsed state (icon only) */
  collapsed?: boolean;
  /** Additional class */
  className?: string;
}
