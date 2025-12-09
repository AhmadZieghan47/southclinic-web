/**
 * ReviewStep Component
 * Step 4: Review and confirm all patient information
 */

import { useMemo } from 'react';
import { User, Stethoscope, Shield, Paperclip, Check, X, Edit } from 'lucide-react';
import { Card, Badge, Button } from '../../../../design-system';
import type { CreatePatientFormData } from '../CreatePatientWizard.types';
import { GENDER_OPTIONS } from '../CreatePatientWizard.types';
import styles from './Steps.module.css';

interface ReviewStepProps {
  formData: CreatePatientFormData;
  onEditStep: (step: number) => void;
  errors: Record<string, string>;
}

// Format date for display
function formatDate(dateString: string): string {
  if (!dateString) return 'Not provided';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

// Get gender label
function getGenderLabel(gender: string): string {
  const option = GENDER_OPTIONS.find((g) => g.value === gender);
  return option?.label || gender;
}

export function ReviewStep({ formData, onEditStep, errors }: ReviewStepProps) {
  const { personal, insurance, medical, attachments } = formData;

  // Validation checks
  const validationChecks = useMemo(
    () => [
      {
        label: 'Personal Details Complete',
        valid: !!(
          personal.firstName &&
          personal.lastName &&
          personal.phone &&
          personal.dob &&
          personal.gender
        ),
      },
      {
        label: 'Medical History Recorded',
        valid: true, // Medical history is optional
      },
      {
        label: insurance.hasInsurance ? 'Insurance Information Complete' : 'Insurance Not Required',
        valid: !insurance.hasInsurance || !!(insurance.insurerId && insurance.coveragePercent),
      },
      {
        label: attachments.files.length > 0 ? 'Attachments Uploaded' : 'Attachments Optional',
        valid: true, // Attachments are optional
      },
    ],
    [personal, insurance, medical, attachments],
  );

  const allValid = validationChecks.every((check) => check.valid);

  return (
    <div className={styles.stepContainer}>
      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Review Patient Information</h2>
        <p className={styles.sectionDescription}>
          Please review the patient information before creating the record.
        </p>
      </div>

      {/* Summary Card */}
      <Card className={styles.reviewCard}>
        {/* Personal Information Section */}
        <div className={styles.reviewSection}>
          <div className={styles.reviewSectionHeader}>
            <div className={styles.reviewSectionTitle}>
              <User size={18} className={styles.reviewSectionIcon} />
              <h3>Personal Information</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditStep(0)}
              leftIcon={<Edit size={14} />}
            >
              Edit
            </Button>
          </div>
          <div className={styles.reviewGrid}>
            <div className={styles.reviewItem}>
              <span className={styles.reviewLabel}>Full Name</span>
              <span className={styles.reviewValue}>
                {personal.firstName && personal.lastName
                  ? `${personal.firstName} ${personal.lastName}`
                  : 'Not provided'}
              </span>
            </div>
            <div className={styles.reviewItem}>
              <span className={styles.reviewLabel}>Phone</span>
              <span className={styles.reviewValue}>{personal.phone || 'Not provided'}</span>
            </div>
            <div className={styles.reviewItem}>
              <span className={styles.reviewLabel}>Date of Birth</span>
              <span className={styles.reviewValue}>{formatDate(personal.dob)}</span>
            </div>
            <div className={styles.reviewItem}>
              <span className={styles.reviewLabel}>Gender</span>
              <span className={styles.reviewValue}>{getGenderLabel(personal.gender)}</span>
            </div>
            {personal.nationalId ? (
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>National ID</span>
                <span className={styles.reviewValue}>{personal.nationalId}</span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Medical Information Section */}
        <div className={styles.reviewSection}>
          <div className={styles.reviewSectionHeader}>
            <div className={styles.reviewSectionTitle}>
              <Stethoscope size={18} className={styles.reviewSectionIcon} />
              <h3>Medical Information</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditStep(1)}
              leftIcon={<Edit size={14} />}
            >
              Edit
            </Button>
          </div>
          <div className={styles.reviewGrid}>
            <div className={styles.reviewItemFull}>
              <span className={styles.reviewLabel}>Medical History</span>
              <span className={styles.reviewValue}>
                {medical.medicalHistory.length > 0
                  ? medical.medicalHistory.join(', ')
                  : 'None recorded'}
              </span>
            </div>
            <div className={styles.reviewItemFull}>
              <span className={styles.reviewLabel}>Orthopedic Implants</span>
              <span className={styles.reviewValue}>
                {medical.orthopedicImplants.length > 0
                  ? medical.orthopedicImplants.join(', ')
                  : 'None recorded'}
              </span>
            </div>
            <div className={styles.reviewItem}>
              <span className={styles.reviewLabel}>Extra Care Required</span>
              <Badge variant={medical.extraCare ? 'warning' : 'default'}>
                {medical.extraCare ? 'Yes' : 'No'}
              </Badge>
            </div>
            {medical.notes ? (
              <div className={styles.reviewItemFull}>
                <span className={styles.reviewLabel}>Additional Notes</span>
                <span className={styles.reviewValue}>{medical.notes}</span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Insurance Information Section (Conditional) */}
        {insurance.hasInsurance ? (
          <div className={styles.reviewSection}>
            <div className={styles.reviewSectionHeader}>
              <div className={styles.reviewSectionTitle}>
                <Shield size={18} className={styles.reviewSectionIcon} />
                <h3>Insurance Information</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditStep(0)}
                leftIcon={<Edit size={14} />}
              >
                Edit
              </Button>
            </div>
            <div className={styles.reviewGrid}>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Insurer Company</span>
                <span className={styles.reviewValue}>{insurance.insurerId || 'Not selected'}</span>
              </div>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Coverage</span>
                <span className={styles.reviewValue}>
                  {insurance.coveragePercent !== undefined
                    ? `${insurance.coveragePercent}%`
                    : 'Not provided'}
                </span>
              </div>
              {insurance.approvalNumber ? (
                <div className={styles.reviewItem}>
                  <span className={styles.reviewLabel}>Approval Number</span>
                  <span className={styles.reviewValue}>{insurance.approvalNumber}</span>
                </div>
              ) : null}
              {insurance.expiryDate ? (
                <div className={styles.reviewItem}>
                  <span className={styles.reviewLabel}>Expiry Date</span>
                  <span className={styles.reviewValue}>{formatDate(insurance.expiryDate)}</span>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {/* Attachments Section (Conditional) */}
        {attachments.files.length > 0 && (
          <div className={styles.reviewSection}>
            <div className={styles.reviewSectionHeader}>
              <div className={styles.reviewSectionTitle}>
                <Paperclip size={18} className={styles.reviewSectionIcon} />
                <h3>Attachments</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditStep(2)}
                leftIcon={<Edit size={14} />}
              >
                Edit
              </Button>
            </div>
            <div className={styles.attachmentTags}>
              {attachments.files.map((file) => (
                <Badge key={file.id} variant="primary">
                  {file.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Validation Checklist */}
      <Card className={styles.formCard}>
        <h3 className={styles.cardTitle}>Validation Checklist</h3>
        <ul className={styles.validationList}>
          {validationChecks.map((check, index) => (
            <li
              key={index}
              className={`${styles.validationItem} ${check.valid ? styles.validationValid : styles.validationInvalid}`}
            >
              {check.valid ? (
                <Check size={18} className={styles.validationIcon} />
              ) : (
                <X size={18} className={styles.validationIcon} />
              )}
              {check.label}
            </li>
          ))}
        </ul>

        {!allValid && (
          <p className={styles.validationWarning}>
            Please complete all required fields before submitting.
          </p>
        )}

        {Object.keys(errors).length > 0 && (
          <div className={styles.errorList}>
            <p className={styles.errorListTitle}>Please fix the following errors:</p>
            <ul>
              {Object.entries(errors).map(([key, message]) => (
                <li key={key} className={styles.errorItem}>
                  {message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </div>
  );
}

export default ReviewStep;
