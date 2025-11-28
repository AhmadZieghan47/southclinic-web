import type { HTMLAttributes, ReactNode } from 'react';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Orientation */
  orientation?: DividerOrientation;
  /** Line style */
  variant?: DividerVariant;
  /** Optional label in the middle */
  label?: ReactNode;
  /** Label position */
  labelPosition?: 'left' | 'center' | 'right';
  /** Spacing around divider */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}
