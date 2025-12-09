/**
 * Appointment Details Modal
 * Displays full appointment information
 */

import { useState, useEffect } from 'react';
import { X, Calendar, MapPin } from 'lucide-react';
import { Button } from '../../../../design-system';
import { getAppointmentById, type AppointmentWithPatient } from '../../../../api/appointments';
import type { ApptStatusT } from '../../../../types/patient';
import styles from './Modals.module.css';

// ============================================================================
// TYPES
// ============================================================================

interface AppointmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentId: string | null;
  onAppointmentUpdated?: () => void;
}

// ============================================================================
// HELPERS
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

const formatDateTime = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatSessionType = (type: string): string => {
  return type.replace(/_/g, ' ');
};

const formatLocation = (location: string): string => {
  return location.charAt(0) + location.slice(1).toLowerCase();
};

// ============================================================================
// COMPONENT
// ============================================================================

export const AppointmentDetailsModal = ({
  isOpen,
  onClose,
  appointmentId,
}: AppointmentDetailsModalProps) => {
  const [appointment, setAppointment] = useState<AppointmentWithPatient | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && appointmentId) {
      fetchAppointmentDetails();
    } else {
      setAppointment(null);
      setError(null);
    }
  }, [isOpen, appointmentId]);

  const fetchAppointmentDetails = async () => {
    if (!appointmentId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getAppointmentById(appointmentId);
      setAppointment(data);
    } catch (err) {
      console.error('Error fetching appointment details:', err);
      setError('Failed to load appointment details');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={`${styles.modal} ${styles.modalLarge}`} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Appointment Details</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
              <p>Loading appointment details...</p>
            </div>
          ) : null}

          {error ? (
            <div className={styles.warningBanner}>
              <div className={styles.warningIcon}>!</div>
              <p className={styles.warningText}>{error}</p>
            </div>
          ) : null}

          {appointment && !loading ? (
            <>
              {/* Description List */}
              <div className={styles.descriptionGrid}>
                {/* Patient Name */}
                <div className={styles.descriptionItem}>
                  <span className={styles.descriptionLabel}>Patient Name</span>
                  <span className={styles.descriptionValue}>
                    {appointment.patient?.fullName || 'N/A'}
                  </span>
                </div>

                {/* Therapist */}
                <div className={styles.descriptionItem}>
                  <span className={styles.descriptionLabel}>Assigned Therapist</span>
                  <span className={styles.descriptionValue}>
                    {appointment.therapist?.fullName || 'N/A'}
                  </span>
                </div>

                {/* Patient Phone */}
                <div className={styles.descriptionItem}>
                  <span className={styles.descriptionLabel}>Patient Phone</span>
                  <span className={styles.descriptionValue}>
                    {appointment.patient?.phone || 'N/A'}
                  </span>
                </div>

                {/* Session Type */}
                <div className={styles.descriptionItem}>
                  <span className={styles.descriptionLabel}>Session Type</span>
                  <span className={styles.descriptionValue}>
                    {formatSessionType(appointment.sessionType)}
                  </span>
                </div>

                {/* Date & Time */}
                <div className={`${styles.descriptionItem} ${styles.descriptionIcon}`}>
                  <div className={styles.iconWrapper}>
                    <Calendar size={18} />
                  </div>
                  <div>
                    <span className={styles.descriptionLabel}>Date & Time</span>
                    <span className={styles.descriptionValue}>
                      {formatDateTime(appointment.startsAt)}
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className={`${styles.descriptionItem} ${styles.descriptionIcon}`}>
                  <div className={styles.iconWrapper}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className={styles.descriptionLabel}>Location</span>
                    <span className={styles.descriptionValue}>
                      {formatLocation(appointment.location)}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className={styles.descriptionItem}>
                  <span className={styles.descriptionLabel}>Status</span>
                  <span className={`${styles.statusBadge} ${getStatusClass(appointment.status)}`}>
                    {getStatusLabel(appointment.status)}
                  </span>
                </div>
              </div>

              {/* Notes Section */}
              {appointment.noteEn || appointment.noteAr ? (
                <>
                  <h3 className={styles.sectionHeader}>Notes</h3>
                  <div className={styles.notesBox}>
                    <p className={styles.notesText}>
                      {appointment.noteEn || appointment.noteAr || 'No notes available.'}
                    </p>
                  </div>
                </>
              ) : null}
            </>
          ) : null}
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {appointment?.status === 'BOOKED' && <Button variant="primary">Mark as Completed</Button>}
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;
