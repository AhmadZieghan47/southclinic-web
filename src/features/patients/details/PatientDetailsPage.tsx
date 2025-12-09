/**
 * PatientDetailsPage Component
 * Main page for viewing patient details with tabbed interface
 */

import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../design-system/components/atoms/Button/Button';
import { Spinner } from '../../../design-system/components/atoms/Spinner/Spinner';
import { AlertBanner } from '../../../design-system/components/molecules/AlertBanner/AlertBanner';
import { Card } from '../../../design-system/components/molecules/Card/Card';
import { EmptyState } from '../../../design-system/components/organisms/EmptyState/EmptyState';
import { usePatientDetails } from './hooks/usePatientDetails';
import {
  PatientHeader,
  PatientTabs,
  OverviewTab,
  MedicalHistoryTab,
  TreatmentPlanTab,
  AppointmentsTab,
  BillingTab,
} from './components';
import type { PatientTab, AppointmentRow } from './PatientDetailsPage.types';
import styles from './PatientDetailsPage.module.css';

export const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<PatientTab>('overview');

  const {
    patient,
    loading,
    error,
    activePlan,
    insuranceProfile,
    appointments,
    filteredAppointments,
    filteredPayments,
    lastVisitDate,
    searchText,
    setSearchText,
    refresh,
    clearError,
  } = usePatientDetails(id);

  // Navigation handlers
  const handleBack = useCallback(() => {
    navigate('/patients');
  }, [navigate]);

  const handleBookAppointment = useCallback(() => {
    if (patient?.id) {
      navigate(`/appointments/new?patientId=${patient.id}`);
    }
  }, [navigate, patient?.id]);

  const handleBeginTreatment = useCallback(() => {
    if (patient?.id) {
      navigate(`/patients/${patient.id}/begin-treatment`);
    }
  }, [navigate, patient?.id]);

  const handleEditPatient = useCallback(() => {
    if (patient?.id) {
      navigate(`/patients/${patient.id}/edit`);
    }
  }, [navigate, patient?.id]);

  const handleEditMedicalInfo = useCallback(() => {
    if (patient?.id) {
      navigate(`/patients/${patient.id}/edit?section=medical`);
    }
  }, [navigate, patient?.id]);

  // Tab change handler
  const handleTabChange = useCallback(
    (tab: PatientTab) => {
      setActiveTab(tab);
      setSearchText(''); // Clear search when switching tabs
    },
    [setSearchText],
  );

  // Appointment handlers (placeholders for modals)
  const handleViewAppointment = useCallback((appointment: AppointmentRow) => {
    console.log('View appointment:', appointment.id);
    // TODO: Open appointment details modal
  }, []);

  const handleEditAppointment = useCallback((appointment: AppointmentRow) => {
    console.log('Edit appointment:', appointment.id);
    // TODO: Open edit appointment modal
  }, []);

  const handleCancelAppointment = useCallback((appointment: AppointmentRow) => {
    console.log('Cancel appointment:', appointment.id);
    // TODO: Open cancel appointment modal
  }, []);

  const handleAddPayment = useCallback(() => {
    console.log('Add payment');
    // TODO: Open add payment modal
  }, []);

  const handleViewAllAppointments = useCallback(() => {
    setActiveTab('appointments');
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingState}>
          <Spinner size="lg" />
          <span>Loading patient details...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft size={16} />
            Back to Patients
          </Button>
        </div>
        <AlertBanner
          variant="error"
          title="Error Loading Patient"
          dismissible
          onDismiss={clearError}
        >
          {error}
        </AlertBanner>
        <div className={styles.errorActions}>
          <Button variant="primary" onClick={refresh}>
            Try Again
          </Button>
          <Button variant="outline" onClick={handleBack}>
            Back to Patients
          </Button>
        </div>
      </div>
    );
  }

  // Not found state
  if (!patient) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft size={16} />
            Back to Patients
          </Button>
        </div>
        <Card className={styles.notFoundCard}>
          <EmptyState
            variant="error"
            title="Patient Not Found"
            description="The patient you're looking for doesn't exist or has been removed."
            actions={
              <Button variant="primary" onClick={handleBack}>
                Back to Patients
              </Button>
            }
          />
        </Card>
      </div>
    );
  }

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewTab
            patient={patient}
            activePlan={activePlan}
            recentAppointments={appointments.slice(0, 10)}
            onViewAllAppointments={handleViewAllAppointments}
          />
        );
      case 'medical':
        return <MedicalHistoryTab patient={patient} onEditMedicalInfo={handleEditMedicalInfo} />;
      case 'plan':
        return (
          <TreatmentPlanTab
            patient={patient}
            activePlan={activePlan}
            onBeginTreatment={handleBeginTreatment}
          />
        );
      case 'appointments':
        return (
          <AppointmentsTab
            appointments={filteredAppointments}
            loading={false}
            searchText={searchText}
            onSearch={setSearchText}
            onViewAppointment={handleViewAppointment}
            onEditAppointment={handleEditAppointment}
            onCancelAppointment={handleCancelAppointment}
          />
        );
      case 'billing':
        return (
          <BillingTab
            patient={patient}
            payments={filteredPayments}
            insuranceProfile={insuranceProfile}
            loading={false}
            searchText={searchText}
            onSearch={setSearchText}
            onAddPayment={handleAddPayment}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.page}>
      {/* Back Button */}
      <div className={styles.header}>
        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeft size={16} />
          Back to Patients
        </Button>
      </div>

      {/* Page Title */}
      <div className={styles.titleSection}>
        <h1 className={styles.pageTitle}>Patient Details</h1>
        <p className={styles.pageSubtitle}>Comprehensive record for the selected patient</p>
      </div>

      {/* Patient Header */}
      <PatientHeader
        patient={patient}
        lastVisitDate={lastVisitDate || undefined}
        onBookAppointment={handleBookAppointment}
        onBeginTreatment={handleBeginTreatment}
        onEditPatient={handleEditPatient}
      />

      {/* Tabs */}
      <PatientTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Tab Content */}
      <div className={styles.tabContent}>{renderTabContent()}</div>
    </div>
  );
};
