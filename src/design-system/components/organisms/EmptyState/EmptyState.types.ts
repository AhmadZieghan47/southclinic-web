import type { ReactNode, HTMLAttributes } from 'react';

export type EmptyStateVariant = 'default' | 'error' | 'search' | 'empty';
export type EmptyStateSize = 'sm' | 'md' | 'lg';

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: EmptyStateVariant;
  /** Size variant */
  size?: EmptyStateSize;
  /** Icon element */
  icon?: ReactNode;
  /** Title text */
  title: string;
  /** Description text */
  description?: string;
  /** Action buttons */
  actions?: ReactNode;
}
