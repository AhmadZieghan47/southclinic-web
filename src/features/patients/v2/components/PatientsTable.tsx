/**
 * PatientsTable Component
 * Data table for displaying patients with sorting and actions
 */

import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash2, Stethoscope, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import {
  Table,
  TableWrapper,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
  IconButton,
  Spinner,
  EmptyState,
} from '../../../../design-system';
import type { Patient } from '../../../../types/patient';
import type { PatientsTableProps, SortField } from '../PatientsListV2.types';
import styles from './PatientsTable.module.css';

// Gender display mapping
const GENDER_LABELS: Record<string, string> = {
  M: 'Male',
  F: 'Female',
  O: 'Other',
};

export function PatientsTable({
  patients,
  loading,
  sortBy,
  sortOrder,
  onSort,
  onView,
  onEdit,
  onDelete,
  onBeginTreatment,
}: PatientsTableProps) {
  // Determine sort icon for a column
  const getSortIcon = useCallback(
    (field: SortField) => {
      if (sortBy !== field) {
        return <ArrowUpDown size={14} className={styles.sortIconInactive} />;
      }
      return sortOrder === 'asc' ? (
        <ArrowUp size={14} className={styles.sortIconActive} />
      ) : (
        <ArrowDown size={14} className={styles.sortIconActive} />
      );
    },
    [sortBy, sortOrder]
  );

  // Format date for display
  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  // Check if patient has active treatment plans
  const hasActivePlan = (patient: Patient) => {
    return patient.plans?.some((plan) => plan.status === 'ONGOING');
  };

  // Loading state
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="lg" />
        <p className={styles.loadingText}>Loading patients...</p>
      </div>
    );
  }

  // Empty state
  if (patients.length === 0) {
    return (
      <EmptyState
        variant="empty"
        title="No patients found"
        description="Try adjusting your search or filters, or add a new patient."
      />
    );
  }

  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              sortable
              sortDirection={sortBy === 'fullName' ? sortOrder : null}
              onSort={() => onSort('fullName')}
            >
              <span className={styles.sortableHeader}>
                Name {getSortIcon('fullName')}
              </span>
            </TableHead>
            <TableHead>Phone</TableHead>
            <TableHead
              sortable
              sortDirection={sortBy === 'dob' ? sortOrder : null}
              onSort={() => onSort('dob')}
            >
              <span className={styles.sortableHeader}>
                Date of Birth {getSortIcon('dob')}
              </span>
            </TableHead>
            <TableHead>Gender</TableHead>
            <TableHead
              sortable
              sortDirection={sortBy === 'balance' ? sortOrder : null}
              onSort={() => onSort('balance')}
            >
              <span className={styles.sortableHeader}>
                Balance {getSortIcon('balance')}
              </span>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Insurance</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => {
            const hasNoPlans = !patient.plans || patient.plans.length === 0;
            
            return (
              <TableRow
                key={patient.id}
                className={hasNoPlans ? styles.warningRow : ''}
                onClick={() => onView(patient)}
              >
                <TableCell>
                  <Link
                    to={`/patients/${patient.id}`}
                    className={styles.patientLink}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {patient.fullName}
                  </Link>
                  {patient.extraCare && (
                    <Badge variant="warning" size="sm" className={styles.extraCareBadge}>
                      Extra Care
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{formatDate(patient.dob)}</TableCell>
                <TableCell>{GENDER_LABELS[patient.gender] || patient.gender}</TableCell>
                <TableCell>
                  <Badge
                    variant={parseFloat(patient.balance) >= 0 ? 'success' : 'danger'}
                  >
                    {patient.balance} JD
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={patient.isActive ? 'success' : 'danger'}>
                    {patient.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={patient.hasInsurance ? 'info' : 'default'}>
                    {patient.hasInsurance ? 'Yes' : 'No'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
                    <IconButton
                      icon={<Eye size={16} />}
                      aria-label="View details"
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(patient)}
                    />
                    <IconButton
                      icon={<Edit size={16} />}
                      aria-label="Edit patient"
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(patient)}
                    />
                    {onBeginTreatment && !hasActivePlan(patient) && (
                      <IconButton
                        icon={<Stethoscope size={16} />}
                        aria-label="Begin treatment"
                        variant="primary"
                        size="sm"
                        onClick={() => onBeginTreatment(patient)}
                      />
                    )}
                    <IconButton
                      icon={<Trash2 size={16} />}
                      aria-label="Delete patient"
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(patient)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableWrapper>
  );
}

export default PatientsTable;
