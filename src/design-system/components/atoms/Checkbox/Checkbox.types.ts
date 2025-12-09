import type { InputHTMLAttributes, ReactNode } from 'react';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> {
  /** Label text */
  label?: ReactNode;
  /** Size variant */
  size?: CheckboxSize;
  /** Error state */
  error?: boolean;
  /** Indeterminate state */
  indeterminate?: boolean;
}
