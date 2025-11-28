/**
 * PatientsStatsCards Component
 * Displays patient statistics in a row of cards
 */

import { Users, UserCheck, UserX, Shield, UserPlus } from 'lucide-react';
import { StatCard } from '../../../../design-system';
import type { PatientsStatsCardsProps } from '../PatientsListV2.types';
import styles from './PatientsStatsCards.module.css';

export function PatientsStatsCards({ stats, loading }: PatientsStatsCardsProps) {
  if (loading) {
    return (
      <div className={styles.container}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={styles.skeleton} />
        ))}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className={styles.container}>
      <StatCard
        title="Total Patients"
        value={stats.total.toLocaleString()}
        icon={<Users size={20} />}
        variant="primary"
      />
      <StatCard
        title="Active"
        value={stats.active.toLocaleString()}
        icon={<UserCheck size={20} />}
        variant="default"
      />
      <StatCard
        title="Inactive"
        value={stats.inactive.toLocaleString()}
        icon={<UserX size={20} />}
        variant="default"
      />
      <StatCard
        title="With Insurance"
        value={stats.withInsurance.toLocaleString()}
        icon={<Shield size={20} />}
        variant="default"
      />
      <StatCard
        title="New This Month"
        value={stats.newThisMonth.toLocaleString()}
        icon={<UserPlus size={20} />}
        variant="default"
      />
    </div>
  );
}

export default PatientsStatsCards;
