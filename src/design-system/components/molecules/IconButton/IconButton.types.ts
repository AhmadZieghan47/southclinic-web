import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type IconButtonVariant = 'default' | 'primary' | 'secondary' | 'ghost' | 'danger';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon element */
  icon: ReactNode;
  /** Visual variant */
  variant?: IconButtonVariant;
  /** Size variant */
  size?: IconButtonSize;
  /** Rounded style */
  rounded?: boolean;
  /** Accessible label (required for accessibility) */
  'aria-label': string;
  /** Loading state */
  loading?: boolean;
}
