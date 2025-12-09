/**
 * Appointments Filters Component
 * Filter bar for the appointments list
 */

import { Search, X } from 'lucide-react';
import { Card, Input, Select, Button } from '../../../design-system';
import type { ApptStatusT, SessionTypeT } from '../../../types/patient';
import styles from './AppointmentsFilters.module.css';

// ============================================================================
// TYPES
// ============================================================================

interface AppointmentsFiltersProps {
  searchText: string;
  setSearchText: (value: string) => void;
  status: ApptStatusT | undefined;
  setStatus: (value: ApptStatusT | undefined) => void;
  sessionType: SessionTypeT | undefined;
  setSessionType: (value: SessionTypeT | undefined) => void;
  therapistId: string | undefined;
  setTherapistId: (value: string | undefined) => void;
  dateFrom: string | undefined;
  setDateFrom: (value: string | undefined) => void;
  dateTo: string | undefined;
  setDateTo: (value: string | undefined) => void;
  sortBy: 'createdAt' | 'startsAt';
  setSortBy: (value: 'createdAt' | 'startsAt') => void;
  sortOrder: 'ASC' | 'DESC';
  setSortOrder: (value: 'ASC' | 'DESC') => void;
  onClearFilters: () => void;
}

// ============================================================================
// OPTIONS
// ============================================================================

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'BOOKED', label: 'Scheduled' },
  { value: 'CHECKED_IN', label: 'Checked In' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'RESCHEDULED', label: 'Rescheduled' },
];

const sessionTypeOptions = [
  { value: '', label: 'All Session Types' },
  { value: 'REGULAR', label: 'Regular' },
  { value: 'SHOCK_WAVE', label: 'Shock Wave' },
  { value: 'INDIBA', label: 'Indiba' },
  { value: 'HOME', label: 'Home' },
  { value: 'HOJAMA', label: 'Hojama' },
  { value: 'ELDER', label: 'Elder' },
  { value: 'HOSPITAL', label: 'Hospital' },
];

const sortByOptions = [
  { value: 'startsAt', label: 'Appointment Date' },
  { value: 'createdAt', label: 'Created Date' },
];

const sortOrderOptions = [
  { value: 'DESC', label: 'Newest First' },
  { value: 'ASC', label: 'Oldest First' },
];

// ============================================================================
// COMPONENT
// ============================================================================

export const AppointmentsFilters = ({
  searchText,
  setSearchText,
  status,
  setStatus,
  sessionType,
  setSessionType,
  therapistId,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  onClearFilters,
}: AppointmentsFiltersProps) => {
  const hasActiveFilters = searchText || status || sessionType || therapistId || dateFrom || dateTo;

  return (
    <Card className={styles.filtersCard}>
      <div className={styles.filtersContainer}>
        {/* Search */}
        <div className={`${styles.filterGroup} ${styles.wide}`}>
          <label className={styles.filterLabel}>Search</label>
          <Input
            type="text"
            placeholder="Search by patient, therapist, notes..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            leftElement={<Search size={16} />}
            rightElement={
              searchText ? (
                <button
                  className={styles.clearButton}
                  onClick={() => setSearchText('')}
                  type="button"
                >
                  <X size={14} />
                </button>
              ) : undefined
            }
          />
        </div>

        {/* Status Filter */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Status</label>
          <Select
            options={statusOptions}
            value={status || ''}
            onChange={(e) =>
              setStatus(e.target.value ? (e.target.value as ApptStatusT) : undefined)
            }
          />
        </div>

        {/* Session Type Filter */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Session Type</label>
          <Select
            options={sessionTypeOptions}
            value={sessionType || ''}
            onChange={(e) =>
              setSessionType(e.target.value ? (e.target.value as SessionTypeT) : undefined)
            }
          />
        </div>

        {/* Date From */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>From Date</label>
          <Input
            type="date"
            value={dateFrom || ''}
            onChange={(e) => setDateFrom(e.target.value || undefined)}
          />
        </div>

        {/* Date To */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>To Date</label>
          <Input
            type="date"
            value={dateTo || ''}
            onChange={(e) => setDateTo(e.target.value || undefined)}
          />
        </div>

        {/* Sort By */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Sort By</label>
          <Select
            options={sortByOptions}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'createdAt' | 'startsAt')}
          />
        </div>

        {/* Sort Order */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Order</label>
          <Select
            options={sortOrderOptions}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'ASC' | 'DESC')}
          />
        </div>

        {/* Clear Filters */}
        {hasActiveFilters ? (
          <div className={styles.filterActions}>
            <Button variant="ghost" size="sm" onClick={onClearFilters} leftIcon={<X size={14} />}>
              Clear
            </Button>
          </div>
        ) : null}
      </div>
    </Card>
  );
};

export default AppointmentsFilters;
