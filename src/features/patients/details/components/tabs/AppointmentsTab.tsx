/**
 * AppointmentsTab Component
 * Displays patient appointments with search and actions
 */

import React from 'react';
import { Calendar, Search } from 'lucide-react';
import { Card } from '../../../../../design-system/components/molecules/Card/Card';
import { Input } from '../../../../../design-system/components/atoms/Input/Input';
import { EmptyState } from '../../../../../design-system/components/organisms/EmptyState/EmptyState';
import { AppointmentsTable } from '../tables/AppointmentsTable';
import type { AppointmentsTabProps } from '../../PatientDetailsPage.types';
import styles from './Tabs.module.css';

export const AppointmentsTab: React.FC<AppointmentsTabProps> = ({
  appointments,
  loading,
  searchText,
  onSearch,
  onViewAppointment,
  onEditAppointment,
  onCancelAppointment,
}) => {
  return (
    <div className={styles.tabContent}>
      {/* Search Bar */}
      <div className={styles.searchBar}>
        <div className={styles.searchInputWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <Input
            type="text"
            placeholder="Search appointments..."
            value={searchText}
            onChange={(e) => onSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Appointments Table */}
      <Card className={styles.card}>
        {appointments.length > 0 || loading ? (
          <AppointmentsTable
            rows={appointments}
            loading={loading}
            onView={onViewAppointment}
            onEdit={onEditAppointment}
            onCancel={onCancelAppointment}
          />
        ) : (
          <EmptyState
            icon={<Calendar size={48} />}
            title="No Appointments"
            description={
              searchText
                ? 'No appointments match your search criteria.'
                : 'This patient has no appointments yet.'
            }
          />
        )}
      </Card>
    </div>
  );
};
