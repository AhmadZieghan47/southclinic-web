/**
 * Appointments List Page
 * Displays paginated list of appointments with filters and actions
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit2, X, Plus, RefreshCw } from 'lucide-react';
import { useAppointmentsTable } from '../../hooks/useAppointmentsTable';
import { Button, Card } from '../../design-system';
import type {
  ApptStatusT,
  SessionTypeT,
  CancelReasonT,
} from '../../types/patient';
import type { AppointmentWithPatient } from '../../api/appointments';
import { AppointmentsFilters } from './components/AppointmentsFilters';
import {
  AppointmentDetailsModal,
  CancelAppointmentModal,
  EditAppointmentModal,
} from './components/modals';
import styles from './AppointmentsList.module.css';

// ============================================================================
// STATUS HELPERS
// ============================================================================

const getStatusLabel = (status: ApptStatusT): string => {
  const labels: Record<ApptStatusT, string> = {
    BOOKED: 'Scheduled',
    CHECKED_IN: 'Checked In',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
    RESCHEDULED: 'Rescheduled',
  };
  return labels[status] || status;
};

const getStatusClass = (status: ApptStatusT): string => {
  const classes: Record<ApptStatusT, string> = {
    BOOKED: styles.statusBooked,
    CHECKED_IN: styles.statusCheckedIn,
    COMPLETED: styles.statusCompleted,
    CANCELLED: styles.statusCancelled,
    RESCHEDULED: styles.statusRescheduled,
  };
  return classes[status] || '';
};

const formatSessionType = (type: SessionTypeT): string => {
  return type.replace(/_/g, ' ');
};

const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  return {
    date: date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    time: date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
};

// ============================================================================
// COMPONENT
// ============================================================================

export const AppointmentsList = () => {
  // Filter state
  const [searchText, setSearchText] = useState<string>('');
  const [status, setStatus] = useState<ApptStatusT | undefined>(undefined);
  const [sessionType, setSessionType] = useState<SessionTypeT | undefined>(undefined);
  const [therapistId, setTherapistId] = useState<string | undefined>(undefined);
  const [dateFrom, setDateFrom] = useState<string | undefined>(undefined);
  const [dateTo, setDateTo] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<'createdAt' | 'startsAt'>('startsAt');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');

  // Modal state
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [appointmentToEdit, setAppointmentToEdit] = useState<AppointmentWithPatient | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<AppointmentWithPatient | null>(null);
  const [isCancelling, setIsCancelling] = useState<boolean>(false);

  // Hook
  const {
    appointments,
    totalCount,
    currentPage,
    currentPageSize,
    loading,
    error,
    handlePageChange,
    handleCancelAppointment,
    handleRetry,
    clearError,
    refresh,
  } = useAppointmentsTable({
    page: 1,
    pageSize: 10,
    status,
    sessionType,
    therapistId,
    dateFrom,
    dateTo,
    sortBy,
    sortOrder,
  });

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleViewDetails = (appointmentId: string) => {
    setSelectedAppointmentId(appointmentId);
  };

  const handleEditClick = (appointment: AppointmentWithPatient) => {
    setAppointmentToEdit(appointment);
    setIsEditModalOpen(true);
  };

  const handleCancelClick = (appointment: AppointmentWithPatient) => {
    setAppointmentToCancel(appointment);
    setIsCancelModalOpen(true);
  };

  const handleDetailsModalClose = () => {
    setSelectedAppointmentId(null);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setAppointmentToEdit(null);
  };

  const handleEditModalSaved = () => {
    refresh();
    handleEditModalClose();
  };

  const handleCancelModalClose = () => {
    setIsCancelModalOpen(false);
    setAppointmentToCancel(null);
  };

  const handleCancelConfirm = async (cancelReason: CancelReasonT) => {
    if (!appointmentToCancel) return;

    setIsCancelling(true);
    try {
      const success = await handleCancelAppointment(appointmentToCancel.id, cancelReason);
      if (success) {
        handleCancelModalClose();
      }
    } finally {
      setIsCancelling(false);
    }
  };

  const handleClearFilters = () => {
    setSearchText('');
    setStatus(undefined);
    setSessionType(undefined);
    setTherapistId(undefined);
    setDateFrom(undefined);
    setDateTo(undefined);
    setSortBy('startsAt');
    setSortOrder('DESC');
  };

  const canModifyAppointment = (apptStatus: ApptStatusT): boolean => {
    return apptStatus === 'BOOKED' || apptStatus === 'CHECKED_IN';
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Appointments</h1>
          <span className={styles.badge}>Total: {totalCount}</span>
        </div>
        <div className={styles.headerRight}>
          <Button variant="outline" size="sm" onClick={refresh} disabled={loading}>
            <RefreshCw size={16} />
          </Button>
          <Link to="/appointments/new">
            <Button variant="primary" leftIcon={<Plus size={16} />}>
              New Appointment
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <AppointmentsFilters
        searchText={searchText}
        setSearchText={setSearchText}
        status={status}
        setStatus={setStatus}
        sessionType={sessionType}
        setSessionType={setSessionType}
        therapistId={therapistId}
        setTherapistId={setTherapistId}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        onClearFilters={handleClearFilters}
      />

      {/* Error Display */}
      {error && (
        <Card className={styles.errorCard}>
          <div className={styles.errorContent}>
            <p className={styles.errorMessage}>{error.message}</p>
            <div className={styles.errorActions}>
              <Button variant="outlinePrimary" size="sm" onClick={handleRetry}>
                Retry
              </Button>
              <Button variant="outline" size="sm" onClick={clearError}>
                Dismiss
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Loading State */}
      {loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading appointments...</p>
        </div>
      )}

      {/* Appointments Table */}
      {!loading && !error && (
        <Card noPadding>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Patient</th>
                <th>Therapist</th>
                <th>Session Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.emptyState}>
                    No appointments found
                  </td>
                </tr>
              ) : (
                appointments.map((appointment) => {
                  const { date, time } = formatDateTime(appointment.startsAt);
                  const endTime = formatDateTime(appointment.endsAt).time;
                  const isCancelled = appointment.status === 'CANCELLED';

                  return (
                    <tr
                      key={appointment.id}
                      className={isCancelled ? styles.cancelledRow : ''}
                    >
                      {/* Date & Time */}
                      <td className={styles.dateTimeCell}>
                        <div className={styles.dateText}>{date}</div>
                        <div className={styles.timeText}>
                          {time} - {endTime}
                        </div>
                      </td>

                      {/* Patient */}
                      <td className={styles.patientCell}>
                        {appointment.patient ? (
                          <>
                            <Link
                              to={`/patients/${appointment.patient.id}`}
                              className={styles.patientLink}
                            >
                              {appointment.patient.fullName}
                            </Link>
                            <div className={styles.patientPhone}>
                              {appointment.patient.phone}
                            </div>
                          </>
                        ) : (
                          <span className={styles.patientPhone}>N/A</span>
                        )}
                      </td>

                      {/* Therapist */}
                      <td className={styles.therapistCell}>
                        <div className={styles.therapistName}>
                          {appointment.therapist?.fullName || 'N/A'}
                        </div>
                      </td>

                      {/* Session Type */}
                      <td>
                        <span className={styles.sessionTypeBadge}>
                          {formatSessionType(appointment.sessionType)}
                        </span>
                      </td>

                      {/* Status */}
                      <td>
                        <span
                          className={`${styles.statusBadge} ${getStatusClass(appointment.status)}`}
                        >
                          {getStatusLabel(appointment.status)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className={styles.actions}>
                          <button
                            className={`${styles.actionButton} ${styles.view}`}
                            title="View Details"
                            onClick={() => handleViewDetails(appointment.id)}
                          >
                            <Eye size={16} />
                          </button>
                          {canModifyAppointment(appointment.status) && (
                            <>
                              <button
                                className={`${styles.actionButton} ${styles.edit}`}
                                title="Edit Appointment"
                                onClick={() => handleEditClick(appointment)}
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                className={`${styles.actionButton} ${styles.cancel}`}
                                title="Cancel Appointment"
                                onClick={() => handleCancelClick(appointment)}
                              >
                                <X size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalCount > currentPageSize && (
            <div className={styles.pagination}>
              <Button
                variant="outline"
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
                variant="outline"
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

      {/* Modals */}
      <AppointmentDetailsModal
        isOpen={!!selectedAppointmentId}
        onClose={handleDetailsModalClose}
        appointmentId={selectedAppointmentId}
        onAppointmentUpdated={refresh}
      />

      <EditAppointmentModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        appointment={appointmentToEdit}
        onSaved={handleEditModalSaved}
      />

      <CancelAppointmentModal
        isOpen={isCancelModalOpen}
        onClose={handleCancelModalClose}
        onConfirm={handleCancelConfirm}
        appointment={appointmentToCancel}
        isLoading={isCancelling}
      />
    </div>
  );
};

export default AppointmentsList;
