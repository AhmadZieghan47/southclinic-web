import type { InputHTMLAttributes, ReactNode } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Size variant */
  size?: InputSize;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Left icon/element */
  leftElement?: ReactNode;
  /** Right icon/element */
  rightElement?: ReactNode;
  /** Full width */
  fullWidth?: boolean;
}
