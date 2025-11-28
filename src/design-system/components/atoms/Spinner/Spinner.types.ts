import type { HTMLAttributes } from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'primary' | 'secondary' | 'white' | 'current';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  /** Size variant */
  size?: SpinnerSize;
  /** Color variant */
  variant?: SpinnerVariant;
  /** Accessible label */
  label?: string;
}
