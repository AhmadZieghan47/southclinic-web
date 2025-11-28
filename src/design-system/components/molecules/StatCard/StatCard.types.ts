import type { ReactNode, HTMLAttributes } from 'react';

export type StatCardVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card title */
  title: string;
  /** Main value */
  value: string | number;
  /** Change/trend indicator */
  change?: string;
  /** Is the change positive */
  isPositive?: boolean;
  /** Icon element */
  icon?: ReactNode;
  /** Color variant */
  variant?: StatCardVariant;
  /** Additional description */
  description?: string;
}
