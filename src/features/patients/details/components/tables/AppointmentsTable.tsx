/**
 * AppointmentsTable Component
 * Displays appointments in a sortable table
 */

import React from 'react';
import { Eye, Edit, X } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../../../../design-system/components/organisms/Table/Table';
import { Badge } from '../../../../../design-system/components/atoms/Badge/Badge';
import { IconButton } from '../../../../../design-system/components/molecules/IconButton/IconButton';
import { Spinner } from '../../../../../design-system/components/atoms/Spinner/Spinner';
import type { AppointmentsTableProps } from '../../PatientDetailsPage.types';
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

export const AppointmentsTable: React.FC<AppointmentsTableProps> = ({
  rows,
  loading,
  onView,
  onEdit,
  onCancel,
}) => {
  if (loading) {
    return (
      <div className={styles.loadingState}>
        <Spinner size="lg" />
        <span>Loading appointments...</span>
      </div>
    );
  }

  const columns = [
    { key: 'date', header: 'Date & Time' },
    { key: 'sessionType', header: 'Session Type' },
    { key: 'therapist', header: 'Therapist' },
    { key: 'location', header: 'Location' },
    { key: 'status', header: 'Status' },
    { key: 'actions', header: 'Actions' },
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
                  <span className={styles.date}>{formatDate(row.startsAt)}</span>
                  <span className={styles.time}>{formatTime(row.startsAt)}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="default" size="sm">
                  {row.sessionTypeLabel}
                </Badge>
              </TableCell>
              <TableCell>{row.therapistName}</TableCell>
              <TableCell>{row.locationLabel}</TableCell>
              <TableCell>
                <Badge variant={row.statusVariant} size="sm">
                  {row.statusLabel}
                </Badge>
              </TableCell>
              <TableCell>
                <div className={styles.actions}>
                  <IconButton
                    icon={<Eye size={16} />}
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(row)}
                    aria-label="View details"
                  />
                  {row.status === 'BOOKED' && (
                    <>
                      <IconButton
                        icon={<Edit size={16} />}
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(row)}
                        aria-label="Edit appointment"
                      />
                      <IconButton
                        icon={<X size={16} />}
                        variant="ghost"
                        size="sm"
                        onClick={() => onCancel(row)}
                        aria-label="Cancel appointment"
                        className={styles.cancelButton}
                      />
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
