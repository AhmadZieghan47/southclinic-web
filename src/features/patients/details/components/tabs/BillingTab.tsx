/**
 * BillingTab Component
 * Displays payments, billing history, and insurance information
 */

import React from 'react';
import { CreditCard, Shield, Plus, Search } from 'lucide-react';
import { Card } from '../../../../../design-system/components/molecules/Card/Card';
import { Badge } from '../../../../../design-system/components/atoms/Badge/Badge';
import { Button } from '../../../../../design-system/components/atoms/Button/Button';
import { Input } from '../../../../../design-system/components/atoms/Input/Input';
import { EmptyState } from '../../../../../design-system/components/organisms/EmptyState/EmptyState';
import { PaymentsTable } from '../tables/PaymentsTable';
import type { BillingTabProps } from '../../PatientDetailsPage.types';
import styles from './Tabs.module.css';

export const BillingTab: React.FC<BillingTabProps> = ({
  patient,
  payments,
  insuranceProfile,
  loading,
  searchText,
  onSearch,
  onAddPayment,
}) => {
  const balanceNum = parseFloat(patient.balance);
  const isNegativeBalance = balanceNum < 0;

  return (
    <div className={styles.tabContent}>
      {/* Summary Cards */}
      <div className={styles.gridThree}>
        {/* Account Balance */}
        <Card className={styles.statCard}>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Account Balance</span>
            <span className={`${styles.statValue} ${isNegativeBalance ? styles.negative : ''}`}>
              {patient.balance} JOD
            </span>
          </div>
        </Card>

        {/* Total Payments */}
        <Card className={styles.statCard}>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Total Payments</span>
            <span className={styles.statValue}>{payments.length}</span>
          </div>
        </Card>

        {/* Insurance Status */}
        <Card className={styles.statCard}>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Insurance</span>
            <Badge variant={patient.hasInsurance ? 'success' : 'default'} size="md">
              {patient.hasInsurance ? 'Active' : 'None'}
            </Badge>
          </div>
        </Card>
      </div>

      {/* Insurance Details */}
      {patient.hasInsurance ? (
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitleGroup}>
              <Shield size={20} className={styles.cardIcon} />
              <h3 className={styles.cardTitle}>Insurance Information</h3>
            </div>
          </div>
          <div className={styles.cardBody}>
            {insuranceProfile ? (
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Provider</span>
                  <span className={styles.infoValue}>
                    Insurance Provider #{insuranceProfile.insurerId}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Policy Number</span>
                  <span className={styles.infoValue}>{insuranceProfile.policyNumber}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Expiry Date</span>
                  <span className={styles.infoValue}>
                    {insuranceProfile.expiresAt
                      ? new Date(insuranceProfile.expiresAt).toLocaleDateString()
                      : 'N/A'}
                  </span>
                </div>
              </div>
            ) : (
              <p className={styles.mutedText}>Insurance profile details not available.</p>
            )}
          </div>
        </Card>
      ) : null}

      {/* Payments Section */}
      <Card className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitleGroup}>
            <CreditCard size={20} className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Payment History</h3>
          </div>
          <Button variant="primary" size="sm" onClick={onAddPayment}>
            <Plus size={16} />
            Add Payment
          </Button>
        </div>
        <div className={styles.cardBody}>
          {/* Search */}
          <div className={styles.searchBar}>
            <div className={styles.searchInputWrapper}>
              <Search size={18} className={styles.searchIcon} />
              <Input
                type="text"
                placeholder="Search payments..."
                value={searchText}
                onChange={(e) => onSearch(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          {/* Payments Table */}
          {payments.length > 0 || loading ? (
            <PaymentsTable rows={payments} loading={loading} />
          ) : (
            <EmptyState
              icon={<CreditCard size={48} />}
              title="No Payments"
              description={
                searchText
                  ? 'No payments match your search criteria.'
                  : 'No payment records found for this patient.'
              }
            />
          )}
        </div>
      </Card>
    </div>
  );
};
