import type { InputHTMLAttributes, ReactNode } from 'react';

export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Label text */
  label?: ReactNode;
  /** Size variant */
  size?: ToggleSize;
  /** Label position */
  labelPosition?: 'left' | 'right';
}
