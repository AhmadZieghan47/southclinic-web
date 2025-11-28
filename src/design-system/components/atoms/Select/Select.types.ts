import type { SelectHTMLAttributes, ReactNode } from 'react';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Select options */
  options: SelectOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Size variant */
  size?: SelectSize;
  /** Error state */
  error?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Left icon/element */
  leftElement?: ReactNode;
}
