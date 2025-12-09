import { forwardRef } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
} from './Table.types';
import styles from './Table.module.css';

/**
 * Table Component
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ children, className = '', ...props }, ref) => (
    <table ref={ref} className={`${styles.table} ${className}`} {...props}>
      {children}
    </table>
  ),
);

Table.displayName = 'Table';

/**
 * Table Header
 */
export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ children, className = '', ...props }, ref) => (
    <thead ref={ref} className={`${styles.header} ${className}`} {...props}>
      {children}
    </thead>
  ),
);

TableHeader.displayName = 'TableHeader';

/**
 * Table Body
 */
export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className = '', ...props }, ref) => (
    <tbody ref={ref} className={`${styles.body} ${className}`} {...props}>
      {children}
    </tbody>
  ),
);

TableBody.displayName = 'TableBody';

/**
 * Table Row
 */
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, onClick, selected, className = '', ...props }, ref) => {
    const rowClasses = [
      styles.row,
      onClick && styles.rowClickable,
      selected && styles.rowSelected,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <tr ref={ref} className={rowClasses} onClick={onClick} {...props}>
        {children}
      </tr>
    );
  },
);

TableRow.displayName = 'TableRow';

/**
 * Table Head Cell
 */
export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ children, sortable, sortDirection, onSort, className = '', ...props }, ref) => {
    const headClasses = [styles.head, sortable && styles.headSortable, className]
      .filter(Boolean)
      .join(' ');

    const SortIcon = () => {
      if (!sortable) return null;
      if (sortDirection === 'asc') return <ChevronUp size={14} />;
      if (sortDirection === 'desc') return <ChevronDown size={14} />;
      return <ChevronsUpDown size={14} />;
    };

    return (
      <th ref={ref} className={headClasses} onClick={sortable ? onSort : undefined} {...props}>
        {children}
        {sortable ? (
          <span className={styles.sortIcon}>
            <SortIcon />
          </span>
        ) : null}
      </th>
    );
  },
);

TableHead.displayName = 'TableHead';

/**
 * Table Cell
 */
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, className = '', ...props }, ref) => (
    <td ref={ref} className={`${styles.cell} ${className}`} {...props}>
      {children}
    </td>
  ),
);

TableCell.displayName = 'TableCell';

/**
 * Table Wrapper - Optional bordered container
 */
export const TableWrapper = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string }
>(({ children, className = '' }, ref) => (
  <div ref={ref} className={`${styles.wrapper} ${className}`}>
    {children}
  </div>
));

TableWrapper.displayName = 'TableWrapper';
