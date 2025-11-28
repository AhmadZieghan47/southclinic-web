import type { ReactNode, HTMLAttributes } from 'react';

export type DescriptionListLayout = 'horizontal' | 'vertical' | 'grid';
export type DescriptionListSize = 'sm' | 'md' | 'lg';

export interface DescriptionItem {
  /** Term/label */
  term: ReactNode;
  /** Description/value */
  description: ReactNode;
  /** Optional icon */
  icon?: ReactNode;
  /** Full width in grid layout */
  fullWidth?: boolean;
}

export interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {
  /** List items */
  items: DescriptionItem[];
  /** Layout variant */
  layout?: DescriptionListLayout;
  /** Size variant */
  size?: DescriptionListSize;
  /** Number of columns for grid layout */
  columns?: 1 | 2 | 3 | 4;
  /** Show dividers between items */
  dividers?: boolean;
  /** Striped rows (horizontal layout) */
  striped?: boolean;
}
