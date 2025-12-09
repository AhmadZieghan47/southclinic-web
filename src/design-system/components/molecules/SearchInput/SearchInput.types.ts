import type { InputHTMLAttributes } from 'react';

export type SearchInputSize = 'sm' | 'md' | 'lg';

export interface SearchInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> {
  /** Size variant */
  size?: SearchInputSize;
  /** Show clear button when has value */
  clearable?: boolean;
  /** Clear handler */
  onClear?: () => void;
  /** Loading state */
  loading?: boolean;
  /** Full width */
  fullWidth?: boolean;
}
