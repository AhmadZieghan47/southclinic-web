/**
 * OverviewTab Component
 * Patient summary, active plan info, and recent activity
 */

import React from 'react';
import { Calendar, Activity, FileText } from 'lucide-react';
import { Card } from '../../../../../design-system/components/molecules/Card/Card';
import { Badge } from '../../../../../design-system/components/atoms/Badge/Badge';
import { Button } from '../../../../../design-system/components/atoms/Button/Button';
import { EmptyState } from '../../../../../design-system/components/organisms/EmptyState/EmptyState';
import type { OverviewTabProps } from '../../PatientDetailsPage.types';
import styles from './Tabs.module.css';

/**
 * Format date to readable string
 */
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Format time
 */
function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  patient,
  activePlan,
  recentAppointments,
  onViewAllAppointments,
}) => {
  const upcomingAppointments = recentAppointments
    .filter((a) => a.status === 'BOOKED' || a.status === 'CHECKED_IN')
    .slice(0, 3);

  const recentCompleted = recentAppointments.filter((a) => a.status === 'COMPLETED').slice(0, 3);

  return (
    <div className={styles.tabContent}>
      <div className={styles.gridTwo}>
        {/* About Card */}
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>About</h3>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Date of Birth</span>
                <span className={styles.infoValue}>{formatDate(patient.dob)}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Gender</span>
                <span className={styles.infoValue}>
                  {patient.gender === 'M' ? 'Male' : patient.gender === 'F' ? 'Female' : 'Other'}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Phone</span>
                <span className={styles.infoValue}>{patient.phone}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>National ID</span>
                <span className={styles.infoValue}>{patient.nationalId || 'N/A'}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Insurance Card */}
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Insurance</h3>
            <Badge variant={patient.hasInsurance ? 'success' : 'default'} size="sm">
              {patient.hasInsurance ? 'Active' : 'None'}
            </Badge>
          </div>
          <div className={styles.cardBody}>
            {patient.hasInsurance ? (
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Provider</span>
                  <span className={styles.infoValue}>Insurance Provider</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Policy Status</span>
                  <span className={styles.infoValue}>Active</span>
                </div>
              </div>
            ) : (
              <p className={styles.mutedText}>No insurance information on file.</p>
            )}
          </div>
        </Card>
      </div>

      {/* Active Treatment Plan */}
      {activePlan ? (
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitleGroup}>
              <Activity size={20} className={styles.cardIcon} />
              <h3 className={styles.cardTitle}>Active Treatment Plan</h3>
            </div>
            <Badge variant={activePlan.status === 'ONGOING' ? 'success' : 'default'} size="sm">
              {activePlan.status}
            </Badge>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.planInfo}>
              <div className={styles.planDetail}>
                <span className={styles.infoLabel}>Plan Type</span>
                <span className={styles.infoValue}>
                  {activePlan.planType === 'PACKAGE' ? 'Package' : 'Pay Per Visit'}
                </span>
              </div>
              <div className={styles.planDetail}>
                <span className={styles.infoLabel}>Diagnosis</span>
                <span className={styles.infoValue}>
                  {activePlan.diagnosisEn || 'Not specified'}
                </span>
              </div>
              <div className={styles.planDetail}>
                <span className={styles.infoLabel}>Progress</span>
                <span className={styles.infoValue}>
                  {activePlan.completedSessions} / {activePlan.totalSessions || '∞'} sessions
                </span>
              </div>
              <div className={styles.planDetail}>
                <span className={styles.infoLabel}>Started</span>
                <span className={styles.infoValue}>{formatDate(activePlan.startedAt)}</span>
              </div>
            </div>
            {activePlan.totalSessions ? (
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${Math.min((activePlan.completedSessions / activePlan.totalSessions) * 100, 100)}%`,
                  }}
                />
              </div>
            ) : null}
          </div>
        </Card>
      ) : (
        <Card className={styles.card}>
          <EmptyState
            icon={<Activity size={48} />}
            title="No Active Treatment"
            description="This patient does not have an active treatment plan."
          />
        </Card>
      )}

      {/* Upcoming Appointments */}
      <Card className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitleGroup}>
            <Calendar size={20} className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Upcoming Appointments</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onViewAllAppointments}>
            View All
          </Button>
        </div>
        <div className={styles.cardBody}>
          {upcomingAppointments.length > 0 ? (
            <div className={styles.appointmentList}>
              {upcomingAppointments.map((appt) => (
                <div key={appt.id} className={styles.appointmentItem}>
                  <div className={styles.appointmentDate}>
                    <span className={styles.dateDay}>{new Date(appt.startsAt).getDate()}</span>
                    <span className={styles.dateMonth}>
                      {new Date(appt.startsAt).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  </div>
                  <div className={styles.appointmentInfo}>
                    <span className={styles.appointmentTitle}>{appt.sessionTypeLabel}</span>
                    <span className={styles.appointmentMeta}>
                      {formatTime(appt.startsAt)} • {appt.locationLabel}
                    </span>
                  </div>
                  <Badge variant={appt.statusVariant} size="sm">
                    {appt.statusLabel}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.mutedText}>No upcoming appointments scheduled.</p>
          )}
        </div>
      </Card>

      {/* Recent Sessions */}
      {recentCompleted.length > 0 && (
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitleGroup}>
              <FileText size={20} className={styles.cardIcon} />
              <h3 className={styles.cardTitle}>Recent Sessions</h3>
            </div>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.appointmentList}>
              {recentCompleted.map((appt) => (
                <div key={appt.id} className={styles.appointmentItem}>
                  <div className={styles.appointmentDate}>
                    <span className={styles.dateDay}>{new Date(appt.startsAt).getDate()}</span>
                    <span className={styles.dateMonth}>
                      {new Date(appt.startsAt).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  </div>
                  <div className={styles.appointmentInfo}>
                    <span className={styles.appointmentTitle}>{appt.sessionTypeLabel}</span>
                    <span className={styles.appointmentMeta}>
                      {appt.therapistName} • {appt.locationLabel}
                    </span>
                  </div>
                  <Badge variant="success" size="sm">
                    Completed
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
