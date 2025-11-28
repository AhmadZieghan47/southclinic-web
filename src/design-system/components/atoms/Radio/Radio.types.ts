import type { InputHTMLAttributes, ReactNode } from 'react';

export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Label text */
  label?: ReactNode;
  /** Size variant */
  size?: RadioSize;
  /** Error state */
  error?: boolean;
}

export interface RadioGroupProps {
  /** Group name */
  name: string;
  /** Current value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Radio options */
  options: { value: string; label: ReactNode; disabled?: boolean }[];
  /** Size variant */
  size?: RadioSize;
  /** Error state */
  error?: boolean;
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
  /** Additional class */
  className?: string;
}
