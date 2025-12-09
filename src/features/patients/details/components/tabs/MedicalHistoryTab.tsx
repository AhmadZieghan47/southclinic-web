/**
 * MedicalHistoryTab Component
 * Displays patient medical conditions, implants, and notes
 */

import React from 'react';
import { Edit, Heart, Bone, FileText, AlertTriangle } from 'lucide-react';
import { Card } from '../../../../../design-system/components/molecules/Card/Card';
import { Badge } from '../../../../../design-system/components/atoms/Badge/Badge';
import { Button } from '../../../../../design-system/components/atoms/Button/Button';
import { AlertBanner } from '../../../../../design-system/components/molecules/AlertBanner/AlertBanner';
import type { MedicalHistoryTabProps } from '../../PatientDetailsPage.types';
import styles from './Tabs.module.css';

export const MedicalHistoryTab: React.FC<MedicalHistoryTabProps> = ({
  patient,
  onEditMedicalInfo,
}) => {
  const hasMedicalHistory = patient.medicalHistory && patient.medicalHistory.length > 0;
  const hasImplants = patient.orthopedicImplants && patient.orthopedicImplants.length > 0;

  return (
    <div className={styles.tabContent}>
      {/* Extra Care Warning */}
      {patient.extraCare ? (
        <AlertBanner variant="warning" title="Extra Care Required">
          This patient requires extra care and attention during treatments.
        </AlertBanner>
      ) : null}

      <div className={styles.gridTwo}>
        {/* Medical History Card */}
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitleGroup}>
              <Heart size={20} className={styles.cardIcon} />
              <h3 className={styles.cardTitle}>Medical History</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={onEditMedicalInfo}>
              <Edit size={16} />
            </Button>
          </div>
          <div className={styles.cardBody}>
            {hasMedicalHistory ? (
              <div className={styles.tagList}>
                {patient.medicalHistory.map((condition, index) => (
                  <Badge key={index} variant="default" size="md">
                    {condition}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className={styles.mutedText}>No medical history recorded.</p>
            )}
          </div>
        </Card>

        {/* Orthopedic Implants Card */}
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitleGroup}>
              <Bone size={20} className={styles.cardIcon} />
              <h3 className={styles.cardTitle}>Orthopedic Implants</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={onEditMedicalInfo}>
              <Edit size={16} />
            </Button>
          </div>
          <div className={styles.cardBody}>
            {hasImplants ? (
              <div className={styles.tagList}>
                {patient.orthopedicImplants.map((implant, index) => (
                  <Badge key={index} variant="info" size="md">
                    {implant}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className={styles.mutedText}>No orthopedic implants recorded.</p>
            )}
          </div>
        </Card>
      </div>

      {/* Notes Card */}
      <Card className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitleGroup}>
            <FileText size={20} className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Clinical Notes</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onEditMedicalInfo}>
            <Edit size={16} />
          </Button>
        </div>
        <div className={styles.cardBody}>
          {patient.notes ? (
            <div className={styles.notesContent}>
              <p>{patient.notes}</p>
            </div>
          ) : (
            <p className={styles.mutedText}>No clinical notes recorded.</p>
          )}
        </div>
      </Card>

      {/* Flags Summary */}
      <Card className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitleGroup}>
            <AlertTriangle size={20} className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Patient Flags</h3>
          </div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.flagsList}>
            <div className={styles.flagItem}>
              <span className={styles.flagLabel}>Insurance Status</span>
              <Badge variant={patient.hasInsurance ? 'success' : 'default'} size="sm">
                {patient.hasInsurance ? 'Insured' : 'No Insurance'}
              </Badge>
            </div>
            <div className={styles.flagItem}>
              <span className={styles.flagLabel}>Extra Care</span>
              <Badge variant={patient.extraCare ? 'warning' : 'default'} size="sm">
                {patient.extraCare ? 'Required' : 'Not Required'}
              </Badge>
            </div>
            <div className={styles.flagItem}>
              <span className={styles.flagLabel}>Patient Status</span>
              <Badge variant={patient.isActive ? 'success' : 'default'} size="sm">
                {patient.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
