/**
 * PatientTabs Component
 * Tab navigation for patient details sections
 */

import React from 'react';
import type { PatientTabsProps } from '../PatientDetailsPage.types';
import { PATIENT_TABS } from '../PatientDetailsPage.types';
import styles from './PatientTabs.module.css';

export const PatientTabs: React.FC<PatientTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className={styles.tabsWrapper}>
      <nav className={styles.tabList} role="tablist" aria-label="Patient Details Tabs">
        {PATIENT_TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};
