import type { ReactNode, HTMLAttributes } from 'react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertBannerProps extends HTMLAttributes<HTMLDivElement> {
  /** Alert variant */
  variant?: AlertVariant;
  /** Alert title */
  title?: string;
  /** Alert message */
  children: ReactNode;
  /** Dismissible */
  dismissible?: boolean;
  /** Dismiss handler */
  onDismiss?: () => void;
  /** Custom icon */
  icon?: ReactNode;
  /** Action button */
  action?: ReactNode;
}
