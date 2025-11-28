import type { HTMLAttributes } from 'react';

export type PaginationSize = 'sm' | 'md' | 'lg';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Current page (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Page change handler */
  onChange: (page: number) => void;
  /** Size variant */
  size?: PaginationSize;
  /** Show first/last buttons */
  showFirstLast?: boolean;
  /** Number of sibling pages to show */
  siblingCount?: number;
  /** Disabled state */
  disabled?: boolean;
}
