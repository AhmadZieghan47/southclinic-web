import type { ReactNode } from 'react';

export interface FormFieldProps {
  /** Field label */
  label?: ReactNode;
  /** Required indicator */
  required?: boolean;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Field content (Input, Select, etc.) */
  children: ReactNode;
  /** HTML for attribute to link label to input */
  htmlFor?: string;
  /** Additional class */
  className?: string;
}
