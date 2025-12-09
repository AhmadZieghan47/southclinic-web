/**
 * TreatmentPlanTab Component
 * Displays treatment plan details, diagnoses, and session progress
 */

import React from 'react';
import { Activity, Target, Calendar, DollarSign, Stethoscope } from 'lucide-react';
import { Card } from '../../../../../design-system/components/molecules/Card/Card';
import { Badge } from '../../../../../design-system/components/atoms/Badge/Badge';
import { Button } from '../../../../../design-system/components/atoms/Button/Button';
import { EmptyState } from '../../../../../design-system/components/organisms/EmptyState/EmptyState';
import type { TreatmentPlanTabProps } from '../../PatientDetailsPage.types';
import styles from './Tabs.module.css';

/**
 * Format date
 */
function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export const TreatmentPlanTab: React.FC<TreatmentPlanTabProps> = ({
  patient,
  activePlan,
  onBeginTreatment,
}) => {
  const allPlans = patient.plans || [];
  const hasPlans = allPlans.length > 0;

  if (!hasPlans) {
    return (
      <div className={styles.tabContent}>
        <Card className={styles.card}>
          <EmptyState
            icon={<Activity size={48} />}
            title="No Treatment Plans"
            description="This patient does not have any treatment plans yet."
            actions={
              <Button variant="primary" onClick={onBeginTreatment}>
                <Stethoscope size={16} />
                Begin Treatment
              </Button>
            }
          />
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.tabContent}>
      {/* Active Plan Details */}
      {activePlan ? (
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitleGroup}>
              <Activity size={20} className={styles.cardIcon} />
              <h3 className={styles.cardTitle}>Active Treatment Plan</h3>
            </div>
            <Badge variant="success" size="sm">
              {activePlan.status}
            </Badge>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.planDetailsGrid}>
              {/* Plan Type */}
              <div className={styles.planDetailCard}>
                <div className={styles.planDetailIcon}>
                  <Target size={24} />
                </div>
                <div className={styles.planDetailContent}>
                  <span className={styles.planDetailLabel}>Plan Type</span>
                  <span className={styles.planDetailValue}>
                    {activePlan.planType === 'PACKAGE' ? 'Package Plan' : 'Pay Per Visit'}
                  </span>
                </div>
              </div>

              {/* Sessions Progress */}
              <div className={styles.planDetailCard}>
                <div className={styles.planDetailIcon}>
                  <Calendar size={24} />
                </div>
                <div className={styles.planDetailContent}>
                  <span className={styles.planDetailLabel}>Sessions</span>
                  <span className={styles.planDetailValue}>
                    {activePlan.completedSessions} / {activePlan.totalSessions || '∞'}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className={styles.planDetailCard}>
                <div className={styles.planDetailIcon}>
                  <DollarSign size={24} />
                </div>
                <div className={styles.planDetailContent}>
                  <span className={styles.planDetailLabel}>Plan Price</span>
                  <span className={styles.planDetailValue}>{activePlan.priceJd} JOD</span>
                </div>
              </div>

              {/* Start Date */}
              <div className={styles.planDetailCard}>
                <div className={styles.planDetailIcon}>
                  <Calendar size={24} />
                </div>
                <div className={styles.planDetailContent}>
                  <span className={styles.planDetailLabel}>Started</span>
                  <span className={styles.planDetailValue}>{formatDate(activePlan.startedAt)}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {activePlan.totalSessions ? (
              <div className={styles.progressSection}>
                <div className={styles.progressHeader}>
                  <span className={styles.progressLabel}>Session Progress</span>
                  <span className={styles.progressValue}>
                    {Math.round((activePlan.completedSessions / activePlan.totalSessions) * 100)}%
                  </span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width: `${Math.min((activePlan.completedSessions / activePlan.totalSessions) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ) : null}

            {/* Diagnosis */}
            {activePlan.diagnosisEn || activePlan.diagnosisAr ? (
              <div className={styles.diagnosisSection}>
                <h4 className={styles.sectionTitle}>Diagnosis</h4>
                <div className={styles.diagnosisList}>
                  {activePlan.diagnosisEn ? (
                    <div className={styles.diagnosisItem}>
                      <Badge variant="info" size="md">
                        {activePlan.diagnosisEn}
                      </Badge>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </Card>
      ) : null}

      {/* Plan History */}
      {allPlans.length > 1 && (
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Plan History</h3>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.planHistory}>
              {allPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`${styles.planHistoryItem} ${plan.id === activePlan?.id ? styles.active : ''}`}
                >
                  <div className={styles.planHistoryHeader}>
                    <span className={styles.planHistoryType}>
                      {plan.planType === 'PACKAGE' ? 'Package' : 'Pay Per Visit'}
                    </span>
                    <Badge variant={plan.status === 'ONGOING' ? 'success' : 'default'} size="sm">
                      {plan.status}
                    </Badge>
                  </div>
                  <div className={styles.planHistoryMeta}>
                    <span>Started: {formatDate(plan.startedAt)}</span>
                    {plan.dischargedAt ? <span>Ended: {formatDate(plan.dischargedAt)}</span> : null}
                  </div>
                  <div className={styles.planHistoryStats}>
                    <span>{plan.completedSessions} sessions completed</span>
                    <span>{plan.priceJd} JOD</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
