/**
 * Cancel Appointment Modal
 * Allows user to select a reason and cancel an appointment
 */

import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from '../../../../design-system';
import type { CancelReasonT } from '../../../../types/patient';
import type { AppointmentWithPatient } from '../../../../api/appointments';
import styles from './Modals.module.css';

// ============================================================================
// TYPES
// ============================================================================

interface CancelAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: CancelReasonT) => Promise<void>;
  appointment: AppointmentWithPatient | null;
  isLoading?: boolean;
}

// ============================================================================
// CANCEL REASON OPTIONS
// ============================================================================

const cancelReasonOptions: { value: CancelReasonT; label: string }[] = [
  { value: 'PATIENT_REQUEST', label: 'Patient Request' },
  { value: 'THERAPIST_UNAVAILABLE', label: 'Therapist Unavailable' },
  { value: 'INSURANCE_ISSUE', label: 'Insurance Issue' },
  { value: 'WEATHER_TRANSPORT', label: 'Weather/Transport Issue' },
  { value: 'DUPLICATE_BOOKING', label: 'Duplicate Booking' },
  { value: 'CREATED_IN_ERROR', label: 'Created in Error' },
  { value: 'DOCTOR_ADVISED_HOLD', label: 'Doctor Advised Hold' },
];

// ============================================================================
// COMPONENT
// ============================================================================

export const CancelAppointmentModal = ({
  isOpen,
  onClose,
  onConfirm,
  appointment,
  isLoading = false,
}: CancelAppointmentModalProps) => {
  const [selectedReason, setSelectedReason] = useState<CancelReasonT | null>(null);

  const handleConfirm = async () => {
    if (!selectedReason) return;
    await onConfirm(selectedReason);
  };

  const handleClose = () => {
    setSelectedReason(null);
    onClose();
  };

  if (!isOpen || !appointment) return null;

  const patientName = appointment.patient?.fullName || 'Unknown Patient';
  const appointmentDate = new Date(appointment.startsAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Cancel Appointment</h2>
          <button className={styles.closeButton} onClick={handleClose} disabled={isLoading}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          {/* Warning Banner */}
          <div className={styles.warningBanner}>
            <AlertTriangle size={20} className={styles.warningIcon} />
            <p className={styles.warningText}>
              You are about to cancel the appointment for <strong>{patientName}</strong> scheduled
              on <strong>{appointmentDate}</strong>. This action cannot be undone.
            </p>
          </div>

          {/* Reason Selection */}
          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${styles.required}`}>
              Select Cancellation Reason
            </label>
            <div className={styles.reasonOptions}>
              {cancelReasonOptions.map((option) => (
                <label
                  key={option.value}
                  className={`${styles.reasonOption} ${
                    selectedReason === option.value ? styles.selected : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="cancelReason"
                    value={option.value}
                    checked={selectedReason === option.value}
                    onChange={() => setSelectedReason(option.value)}
                    disabled={isLoading}
                  />
                  <span className={styles.reasonLabel}>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Keep Appointment
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!selectedReason || isLoading}
            loading={isLoading}
          >
            Cancel Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CancelAppointmentModal;
