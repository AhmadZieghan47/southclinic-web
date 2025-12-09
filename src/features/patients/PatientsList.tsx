/**
 * Patients List Page
 * Displays paginated list of patients with search and actions
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePatientsTable } from '../../hooks/usePatientsTable';
import { Button, Input, Card } from '../../design-system';
import type { Patient } from '../../types/patient';
import styles from './PatientsList.module.css';

export const PatientsList = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);

  const {
    patients,
    totalCount,
    currentPage,
    currentPageSize,
    loading,
    error,
    handlePageChange,
    handleDeletePatient,
    handleRetry,
    clearError,
  } = usePatientsTable({
    page: 1,
    pageSize: 10,
    search: searchText,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleDeleteClick = (patient: Patient) => {
    setPatientToDelete(patient);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!patientToDelete) return;

    const success = await handleDeletePatient(patientToDelete.id);
    if (success) {
      setDeleteModalOpen(false);
      setPatientToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setPatientToDelete(null);
  };

  const getStatusBadge = (isActive: boolean) => {
    return (
      <span className={isActive ? styles.badgeSuccess : styles.badgeDanger}>
        {isActive ? 'Active' : 'Inactive'}
      </span>
    );
  };

  const getBalanceBadge = (balance: string) => {
    const balanceNum = parseFloat(balance);
    return (
      <span className={balanceNum >= 0 ? styles.badgeSuccess : styles.badgeDanger}>
        {balance} JD
      </span>
    );
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Patients List</h1>
          <span className={styles.badge}>Total Patients: {totalCount}</span>
        </div>
        <div className={styles.headerRight}>
          <Link to="/patients/create">
            <Button variant="primary">+ New Patient</Button>
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className={styles.searchCard}>
        <div className={styles.searchContainer}>
          <Input
            type="text"
            placeholder="Search patients by name, phone..."
            value={searchText}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </div>
      </Card>

      {/* Error Display */}
      {error ? (
        <Card className={styles.errorCard}>
          <div className={styles.errorContent}>
            <p className={styles.errorMessage}>{error.message}</p>
            <div className={styles.errorActions}>
              <Button variant="outlinePrimary" size="sm" onClick={handleRetry}>
                Retry
              </Button>
              <Button variant="outlineSecondary" size="sm" onClick={clearError}>
                Dismiss
              </Button>
            </div>
          </div>
        </Card>
      ) : null}

      {/* Loading State */}
      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading patients...</p>
        </div>
      ) : null}

      {/* Patients Table */}
      {!loading && !error && (
        <Card noPadding>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Date of Birth</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.emptyState}>
                    No patients found
                  </td>
                </tr>
              ) : (
                patients.map((patient) => (
                  <tr
                    key={patient.id}
                    className={patient.plans && patient.plans.length > 0 ? '' : styles.warningRow}
                  >
                    <td>
                      <Link to={`/patients/${patient.id}`} className={styles.patientLink}>
                        {patient.fullName}
                      </Link>
                    </td>
                    <td>{patient.phone}</td>
                    <td>{patient.dob}</td>
                    <td>{getBalanceBadge(patient.balance)}</td>
                    <td>{getStatusBadge(patient.isActive)}</td>
                    <td>
                      <div className={styles.actions}>
                        <Link to={`/patients/${patient.id}`}>
                          <Button variant="outlinePrimary" size="sm" title="View Details">
                            👁️
                          </Button>
                        </Link>
                        <Link to={`/patients/${patient.id}/edit`}>
                          <Button variant="outlineSecondary" size="sm" title="Edit Patient">
                            ✏️
                          </Button>
                        </Link>
                        <Button
                          variant="outlineDanger"
                          size="sm"
                          title="Delete Patient"
                          onClick={() => handleDeleteClick(patient)}
                        >
                          🗑️
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalCount > currentPageSize && (
            <div className={styles.pagination}>
              <Button
                variant="outlineSecondary"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </Button>
              <span className={styles.pageInfo}>
                Page {currentPage} of {Math.ceil(totalCount / currentPageSize)}
              </span>
              <Button
                variant="outlineSecondary"
                size="sm"
                disabled={currentPage >= Math.ceil(totalCount / currentPageSize)}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </Card>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen ? (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Delete Patient</h3>
            <p>
              Are you sure you want to delete <strong>{patientToDelete?.fullName}</strong>? This
              action cannot be undone.
            </p>
            <div className={styles.modalActions}>
              <Button variant="secondary" onClick={handleDeleteCancel}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteConfirm}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PatientsList;
