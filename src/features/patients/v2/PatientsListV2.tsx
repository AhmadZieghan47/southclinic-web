/**
 * PatientsListV2 Page
 * Enhanced patients listing page with statistics, filtering, and improved UX
 */

import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Download } from 'lucide-react';
import { Button, Card, Modal, AlertBanner, Pagination, Select } from '../../../design-system';
import { usePatientsTableV2 } from './hooks/usePatientsTableV2';
import { PatientsStatsCards, PatientsFilters, PatientsTable } from './components';
import type { Patient } from '../../../types/patient';
import type { SortField, PatientsFilters as FiltersType } from './PatientsListV2.types';
import styles from './PatientsListV2.module.css';

// Page size options
const PAGE_SIZE_OPTIONS = [
  { value: '10', label: '10 per page' },
  { value: '25', label: '25 per page' },
  { value: '50', label: '50 per page' },
];

export function PatientsListV2() {
  const navigate = useNavigate();

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Hook for data management
  const {
    patients,
    stats,
    pagination,
    filters,
    setFilters,
    resetFilters,
    loading,
    statsLoading,
    error,
    handlePageChange,
    handlePageSizeChange,
    handleDeletePatient,
    handleRetry,
    clearError,
  } = usePatientsTableV2();

  // ---------------------------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------------------------

  const handleFiltersChange = useCallback(
    (newFilters: Partial<FiltersType>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
    },
    [setFilters],
  );

  const handleSort = useCallback(
    (field: SortField) => {
      setFilters((prev) => ({
        ...prev,
        sortBy: field,
        sortOrder: prev.sortBy === field && prev.sortOrder === 'asc' ? 'desc' : 'asc',
      }));
    },
    [setFilters],
  );

  const handleViewPatient = useCallback(
    (patient: Patient) => {
      navigate(`/patients/${patient.id}`);
    },
    [navigate],
  );

  const handleEditPatient = useCallback(
    (patient: Patient) => {
      navigate(`/patients/${patient.id}/edit`);
    },
    [navigate],
  );

  const handleBeginTreatment = useCallback(
    (patient: Patient) => {
      navigate(`/treatments/begin/${patient.id}`);
    },
    [navigate],
  );

  const handleDeleteClick = useCallback((patient: Patient) => {
    setPatientToDelete(patient);
    setDeleteModalOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!patientToDelete) return;

    setIsDeleting(true);
    const success = await handleDeletePatient(patientToDelete.id);
    setIsDeleting(false);

    if (success) {
      setDeleteModalOpen(false);
      setPatientToDelete(null);
    }
  }, [patientToDelete, handleDeletePatient]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteModalOpen(false);
    setPatientToDelete(null);
  }, []);

  const handlePageSizeSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      handlePageSizeChange(parseInt(e.target.value, 10));
    },
    [handlePageSizeChange],
  );

  const handleExport = useCallback(() => {
    // TODO: Implement export functionality
    console.log('Export patients');
  }, []);

  // ---------------------------------------------------------------------------
  // COMPUTED VALUES
  // ---------------------------------------------------------------------------

  const totalPages = Math.ceil(pagination.total / pagination.pageSize);
  const startItem = (pagination.page - 1) * pagination.pageSize + 1;
  const endItem = Math.min(pagination.page * pagination.pageSize, pagination.total);

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Patients</h1>
          <p className={styles.subtitle}>Manage your patient records and information</p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="outline" leftIcon={<Download size={16} />} onClick={handleExport}>
            Export
          </Button>
          <Link to="/patients/create">
            <Button variant="primary" leftIcon={<Plus size={16} />}>
              New Patient
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <PatientsStatsCards stats={stats} loading={statsLoading} />

      {/* Error Alert */}
      {error ? (
        <div className={styles.errorContainer}>
          <AlertBanner
            variant="error"
            title="Error loading patients"
            dismissible
            onDismiss={clearError}
            action={
              <Button variant="outline" size="sm" onClick={handleRetry}>
                Retry
              </Button>
            }
          >
            {error.message}
          </AlertBanner>
        </div>
      ) : null}

      {/* Filters */}
      <PatientsFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onReset={resetFilters}
        loading={loading}
      />

      {/* Table Card */}
      <Card noPadding className={styles.tableCard}>
        <PatientsTable
          patients={patients}
          loading={loading}
          sortBy={filters.sortBy}
          sortOrder={filters.sortOrder}
          onSort={handleSort}
          onView={handleViewPatient}
          onEdit={handleEditPatient}
          onDelete={handleDeleteClick}
          onBeginTreatment={handleBeginTreatment}
        />

        {/* Pagination Footer */}
        {!loading && patients.length > 0 && (
          <div className={styles.paginationContainer}>
            <div className={styles.paginationInfo}>
              <span className={styles.paginationText}>
                Showing {startItem} - {endItem} of {pagination.total} patients
              </span>
              <div className={styles.pageSizeSelect}>
                <span className={styles.pageSizeLabel}>Show:</span>
                <Select
                  options={PAGE_SIZE_OPTIONS}
                  value={String(pagination.pageSize)}
                  onChange={handlePageSizeSelectChange}
                  size="sm"
                />
              </div>
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={pagination.page}
                totalPages={totalPages}
                onChange={handlePageChange}
                size="sm"
              />
            )}
          </div>
        )}
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        title="Delete Patient"
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={handleDeleteCancel} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} loading={isDeleting}>
              Delete Patient
            </Button>
          </>
        }
      >
        <div className={styles.deleteModalContent}>
          <p className={styles.deleteWarning}>Are you sure you want to delete this patient?</p>
          {patientToDelete ? (
            <p className={styles.deletePatientName}>{patientToDelete.fullName}</p>
          ) : null}
          <p className={styles.deleteNote}>
            This action will permanently remove the patient and all associated data. This cannot be
            undone.
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default PatientsListV2;
