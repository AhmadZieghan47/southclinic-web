/**
 * PaymentsTable Component
 * Displays payment history in a table
 */

import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../../../../design-system/components/organisms/Table/Table';
import { Badge } from '../../../../../design-system/components/atoms/Badge/Badge';
import { Spinner } from '../../../../../design-system/components/atoms/Spinner/Spinner';
import type { PaymentsTableProps } from '../../PatientDetailsPage.types';
import styles from './Tables.module.css';

/**
 * Format date
 */
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Format time
 */
function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Get method badge variant
 */
function getMethodVariant(method: string): 'success' | 'info' | 'warning' | 'default' {
  switch (method) {
    case 'CASH':
      return 'success';
    case 'CARD':
      return 'info';
    case 'INSURANCE':
      return 'warning';
    default:
      return 'default';
  }
}

export const PaymentsTable: React.FC<PaymentsTableProps> = ({ rows, loading }) => {
  if (loading) {
    return (
      <div className={styles.loadingState}>
        <Spinner size="lg" />
        <span>Loading payments...</span>
      </div>
    );
  }

  const columns = [
    { key: 'date', header: 'Date' },
    { key: 'description', header: 'Description' },
    { key: 'method', header: 'Method' },
    { key: 'amount', header: 'Amount' },
    { key: 'status', header: 'Status' },
  ];

  return (
    <div className={styles.tableWrapper}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <div className={styles.dateCell}>
                  <span className={styles.date}>{formatDate(row.paidAt)}</span>
                  <span className={styles.time}>{formatTime(row.paidAt)}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className={styles.description}>{row.description}</span>
              </TableCell>
              <TableCell>
                <Badge variant={getMethodVariant(row.method)} size="sm">
                  {row.methodLabel}
                </Badge>
              </TableCell>
              <TableCell>
                <span className={styles.amount}>{row.amountJd} JOD</span>
              </TableCell>
              <TableCell>
                <Badge variant="success" size="sm">
                  {row.statusLabel}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
