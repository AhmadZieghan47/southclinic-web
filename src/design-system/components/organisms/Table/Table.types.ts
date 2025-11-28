import type { TableHTMLAttributes, ThHTMLAttributes, TdHTMLAttributes, ReactNode } from 'react';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

export interface TableHeaderProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export interface TableBodyProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export interface TableRowProps extends TableHTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
  /** Clickable row */
  onClick?: () => void;
  /** Selected state */
  selected?: boolean;
}

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
  /** Sortable column */
  sortable?: boolean;
  /** Sort direction */
  sortDirection?: 'asc' | 'desc' | null;
  /** On sort click */
  onSort?: () => void;
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
}
