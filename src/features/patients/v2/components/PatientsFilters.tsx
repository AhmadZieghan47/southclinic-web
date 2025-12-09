/**
 * PatientsFilters Component
 * Search bar and filter controls for the patients list
 */

import { useState, useCallback } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { Button, Input, Select } from '../../../../design-system';
import type { PatientsFiltersProps, SortField } from '../PatientsListV2.types';
import type { GenderT } from '../../../../types/patient';
import styles from './PatientsFilters.module.css';

// Filter options
const STATUS_OPTIONS = [
  { value: '', label: 'All Status' },
  { value: 'true', label: 'Active' },
  { value: 'false', label: 'Inactive' },
];

const INSURANCE_OPTIONS = [
  { value: '', label: 'All Insurance' },
  { value: 'true', label: 'With Insurance' },
  { value: 'false', label: 'Without Insurance' },
];

const GENDER_OPTIONS = [
  { value: '', label: 'All Genders' },
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
  { value: 'O', label: 'Other' },
];

const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Recent First' },
  { value: 'fullName', label: 'Name A-Z' },
  { value: 'balance', label: 'Balance' },
  { value: 'dob', label: 'Date of Birth' },
];

export function PatientsFilters({
  filters,
  onFiltersChange,
  onReset,
  loading,
}: PatientsFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFiltersChange({ search: e.target.value });
    },
    [onFiltersChange],
  );

  const handleStatusChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      onFiltersChange({
        isActive: value === '' ? undefined : value === 'true',
      });
    },
    [onFiltersChange],
  );

  const handleInsuranceChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      onFiltersChange({
        hasInsurance: value === '' ? undefined : value === 'true',
      });
    },
    [onFiltersChange],
  );

  const handleGenderChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value as GenderT | '';
      onFiltersChange({
        gender: value === '' ? undefined : value,
      });
    },
    [onFiltersChange],
  );

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value as SortField;
      onFiltersChange({ sortBy: value });
    },
    [onFiltersChange],
  );

  const handleSortOrderToggle = useCallback(() => {
    onFiltersChange({
      sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc',
    });
  }, [filters.sortOrder, onFiltersChange]);

  const hasActiveFilters =
    filters.isActive !== undefined ||
    filters.hasInsurance !== undefined ||
    filters.gender !== undefined;

  return (
    <div className={styles.container}>
      {/* Search Row */}
      <div className={styles.searchRow}>
        <div className={styles.searchWrapper}>
          <Input
            type="text"
            placeholder="Search patients by name, phone..."
            value={filters.search}
            onChange={handleSearchChange}
            leftElement={<Search size={18} />}
            disabled={loading}
            fullWidth
          />
        </div>

        <div className={styles.actions}>
          <Button
            variant={showFilters ? 'primary' : 'outline'}
            onClick={() => setShowFilters(!showFilters)}
            leftIcon={<Filter size={16} />}
            rightIcon={<ChevronDown size={16} className={showFilters ? styles.rotated : ''} />}
          >
            Filters
            {hasActiveFilters ? <span className={styles.filterBadge} /> : null}
          </Button>

          <div className={styles.sortWrapper}>
            <Select
              options={SORT_OPTIONS}
              value={filters.sortBy}
              onChange={handleSortChange}
              disabled={loading}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSortOrderToggle}
              title={filters.sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            >
              {filters.sortOrder === 'asc' ? '↑' : '↓'}
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters ? (
        <div className={styles.filtersPanel}>
          <div className={styles.filterGrid}>
            <div className={styles.filterItem}>
              <label className={styles.filterLabel}>Status</label>
              <Select
                options={STATUS_OPTIONS}
                value={filters.isActive === undefined ? '' : String(filters.isActive)}
                onChange={handleStatusChange}
                disabled={loading}
                fullWidth
              />
            </div>

            <div className={styles.filterItem}>
              <label className={styles.filterLabel}>Insurance</label>
              <Select
                options={INSURANCE_OPTIONS}
                value={filters.hasInsurance === undefined ? '' : String(filters.hasInsurance)}
                onChange={handleInsuranceChange}
                disabled={loading}
                fullWidth
              />
            </div>

            <div className={styles.filterItem}>
              <label className={styles.filterLabel}>Gender</label>
              <Select
                options={GENDER_OPTIONS}
                value={filters.gender || ''}
                onChange={handleGenderChange}
                disabled={loading}
                fullWidth
              />
            </div>
          </div>

          {hasActiveFilters ? (
            <div className={styles.filterActions}>
              <Button variant="ghost" size="sm" onClick={onReset} leftIcon={<X size={14} />}>
                Clear All Filters
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default PatientsFilters;
