/**
 * PatientHeader Component
 * Displays patient info, badges, balance, and action buttons
 */

import React from 'react';
import { Phone, Edit, Calendar, Stethoscope } from 'lucide-react';
import { Button } from '../../../../design-system/components/atoms/Button/Button';
import { Badge } from '../../../../design-system/components/atoms/Badge/Badge';
import { Card } from '../../../../design-system/components/molecules/Card/Card';
import { AlertBanner } from '../../../../design-system/components/molecules/AlertBanner/AlertBanner';
import type { PatientHeaderProps } from '../PatientDetailsPage.types';
import styles from './PatientHeader.module.css';

/**
 * Format date to readable string
 */
function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Calculate age from date of birth
 */
function calculateAge(dob: string): number {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export const PatientHeader: React.FC<PatientHeaderProps> = ({
  patient,
  lastVisitDate,
  onBookAppointment,
  onBeginTreatment,
  onEditPatient,
}) => {
  const age = calculateAge(patient.dob);
  const balanceNum = parseFloat(patient.balance);
  const isNegativeBalance = balanceNum < 0;

  return (
    <div className={styles.headerWrapper}>
      {/* Inactive Warning Banner */}
      {!patient.isActive && (
        <AlertBanner
          variant="warning"
          title="Inactive Patient"
          className={styles.inactiveWarning}
        >
          This patient is currently inactive. Begin a new treatment to reactivate.
        </AlertBanner>
      )}

      <Card className={styles.headerCard}>
        <div className={styles.headerContent}>
          {/* Left: Avatar and Info */}
          <div className={styles.patientInfo}>
            <div className={styles.avatar}>
              <span className={styles.avatarIcon}>👤</span>
            </div>

            <div className={styles.infoContent}>
              <p className={styles.patientId}>PID: {patient.id}</p>
              <h1 className={styles.patientName}>{patient.fullName}</h1>

              {/* Badges */}
              <div className={styles.badges}>
                {patient.hasInsurance && (
                  <Badge variant="success" size="sm">
                    Insurance
                  </Badge>
                )}
                {patient.extraCare && (
                  <Badge variant="info" size="sm">
                    Extra Care
                  </Badge>
                )}
                {!patient.isActive && (
                  <Badge variant="default" size="sm">
                    Inactive
                  </Badge>
                )}
              </div>

              {/* Contact */}
              <div className={styles.contact}>
                <Phone size={16} className={styles.phoneIcon} />
                <span>{patient.phone}</span>
              </div>

              {/* Quick Info */}
              <div className={styles.quickInfo}>
                <span>Age: {age} years</span>
                <span className={styles.separator}>•</span>
                <span>Gender: {patient.gender === 'M' ? 'Male' : patient.gender === 'F' ? 'Female' : 'Other'}</span>
                {patient.nationalId && (
                  <>
                    <span className={styles.separator}>•</span>
                    <span>ID: {patient.nationalId}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right: Stats and Actions */}
          <div className={styles.actions}>
            {/* Stat Cards */}
            <div className={styles.statCards}>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Last Visit</span>
                <span className={styles.statValue}>{formatDate(lastVisitDate)}</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Account Balance</span>
                <span className={`${styles.statValue} ${isNegativeBalance ? styles.negative : ''}`}>
                  {patient.balance} JOD
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.buttonGroup}>
              <Button
                variant="outline"
                size="sm"
                onClick={onEditPatient}
                className={styles.editButton}
              >
                <Edit size={16} />
                Edit
              </Button>

              {patient.isActive ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={onBookAppointment}
                >
                  <Calendar size={16} />
                  Book Appointment
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  onClick={onBeginTreatment}
                >
                  <Stethoscope size={16} />
                  Begin Treatment
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
