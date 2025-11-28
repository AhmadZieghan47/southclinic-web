/**
 * Edit Appointment Modal
 * Form to edit appointment details
 */

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button, Input, Select } from '../../../../design-system';
import { updateAppointment } from '../../../../api/appointments';
import type { AppointmentWithPatient } from '../../../../api/appointments';
import type { SessionTypeT, LocationT } from '../../../../types/patient';
import styles from './Modals.module.css';

// ============================================================================
// TYPES
// ============================================================================

interface EditAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: AppointmentWithPatient | null;
  onSaved: () => void;
}

interface FormData {
  startsAt: string;
  endsAt: string;
  sessionType: SessionTypeT;
  location: LocationT;
  noteEn: string;
}

// ============================================================================
// OPTIONS
// ============================================================================

const sessionTypeOptions = [
  { value: 'REGULAR', label: 'Regular' },
  { value: 'SHOCK_WAVE', label: 'Shock Wave' },
  { value: 'INDIBA', label: 'Indiba' },
  { value: 'HOME', label: 'Home' },
  { value: 'HOJAMA', label: 'Hojama' },
  { value: 'ELDER', label: 'Elder' },
  { value: 'HOSPITAL', label: 'Hospital' },
];

const locationOptions = [
  { value: 'CLINIC', label: 'Clinic' },
  { value: 'HOME', label: 'Home' },
  { value: 'HOSPITAL', label: 'Hospital' },
];

// ============================================================================
// HELPERS
// ============================================================================

const formatDateTimeLocal = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toISOString().slice(0, 16);
};

// ============================================================================
// COMPONENT
// ============================================================================

export const EditAppointmentModal = ({
  isOpen,
  onClose,
  appointment,
  onSaved,
}: EditAppointmentModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    startsAt: '',
    endsAt: '',
    sessionType: 'REGULAR',
    location: 'CLINIC',
    noteEn: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form with appointment data
  useEffect(() => {
    if (appointment) {
      setFormData({
        startsAt: formatDateTimeLocal(appointment.startsAt),
        endsAt: formatDateTimeLocal(appointment.endsAt),
        sessionType: appointment.sessionType,
        location: appointment.location,
        noteEn: appointment.noteEn || '',
      });
    }
  }, [appointment]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointment) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await updateAppointment(appointment.id, {
        startsAt: new Date(formData.startsAt).toISOString(),
        endsAt: new Date(formData.endsAt).toISOString(),
        sessionType: formData.sessionType,
        location: formData.location,
        noteEn: formData.noteEn || null,
      });
      onSaved();
    } catch (err) {
      console.error('Error updating appointment:', err);
      setError('Failed to update appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setError(null);
    onClose();
  };

  if (!isOpen || !appointment) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div
        className={`${styles.modal} ${styles.modalLarge}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Edit Appointment</h2>
          <button className={styles.closeButton} onClick={handleClose} disabled={isSubmitting}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            {error && (
              <div className={styles.warningBanner}>
                <p className={styles.warningText}>{error}</p>
              </div>
            )}

            {/* Patient Info (Read-only) */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Patient</label>
              <Input
                value={appointment.patient?.fullName || 'N/A'}
                disabled
              />
            </div>

            {/* Start Date/Time */}
            <div className={styles.formGroup}>
              <label className={`${styles.formLabel} ${styles.required}`}>Start Date & Time</label>
              <Input
                type="datetime-local"
                name="startsAt"
                value={formData.startsAt}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* End Date/Time */}
            <div className={styles.formGroup}>
              <label className={`${styles.formLabel} ${styles.required}`}>End Date & Time</label>
              <Input
                type="datetime-local"
                name="endsAt"
                value={formData.endsAt}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Session Type */}
            <div className={styles.formGroup}>
              <label className={`${styles.formLabel} ${styles.required}`}>Session Type</label>
              <Select
                name="sessionType"
                options={sessionTypeOptions}
                value={formData.sessionType}
                onChange={handleInputChange}
              />
            </div>

            {/* Location */}
            <div className={styles.formGroup}>
              <label className={`${styles.formLabel} ${styles.required}`}>Location</label>
              <Select
                name="location"
                options={locationOptions}
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>

            {/* Notes */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Notes</label>
              <textarea
                name="noteEn"
                value={formData.noteEn}
                onChange={handleInputChange}
                placeholder="Add any notes about this appointment..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  resize: 'vertical',
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className={styles.modalFooter}>
            <Button variant="outline" type="button" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" loading={isSubmitting}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAppointmentModal;
