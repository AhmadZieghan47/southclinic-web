/**
 * CreatePatientWizard Page
 * Multi-step wizard for creating a new patient
 */

import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Wizard, Button, AlertBanner, Card } from '../../../design-system';
import type { WizardStep } from '../../../design-system/components/organisms/Wizard/Wizard.types';
import { useCreatePatient } from './hooks/useCreatePatient';
import { PersonalInfoStep, MedicalInfoStep, AttachmentsStep, ReviewStep } from './components';
import styles from './CreatePatientWizard.module.css';

export function CreatePatientWizard() {
  const navigate = useNavigate();

  const {
    formData,
    currentStep,
    setCurrentStep,
    validateStep,
    errors,
    isSubmitting,
    submitError,
    handleSubmit,
    updatePersonalInfo,
    updateInsurance,
    updateMedicalInfo,
    addAttachment,
    removeAttachment,
  } = useCreatePatient({
    onSuccess: (patientId) => {
      navigate(`/patients/${patientId}`);
    },
  });

  // Handle edit step from review
  const handleEditStep = useCallback(
    (step: number) => {
      setCurrentStep(step);
    },
    [setCurrentStep],
  );

  // Build wizard steps with content
  const wizardSteps: WizardStep[] = useMemo(
    () => [
      {
        id: 'personal',
        title: 'Personal Info',
        description: 'Basic details & insurance',
        content: (
          <PersonalInfoStep
            personalData={formData.personal}
            insuranceData={formData.insurance}
            onPersonalChange={updatePersonalInfo}
            onInsuranceChange={updateInsurance}
            errors={errors}
          />
        ),
        validate: () => validateStep(0),
      },
      {
        id: 'medical',
        title: 'Medical Info',
        description: 'Health history',
        content: (
          <MedicalInfoStep medicalData={formData.medical} onMedicalChange={updateMedicalInfo} />
        ),
        validate: () => validateStep(1),
      },
      {
        id: 'attachments',
        title: 'Attachments',
        description: 'Upload documents',
        optional: true,
        content: (
          <AttachmentsStep
            attachmentsData={formData.attachments}
            onAddFile={addAttachment}
            onRemoveFile={removeAttachment}
          />
        ),
        validate: () => validateStep(2),
      },
      {
        id: 'review',
        title: 'Review',
        description: 'Confirm & submit',
        content: <ReviewStep formData={formData} onEditStep={handleEditStep} errors={errors} />,
        validate: () => validateStep(3),
      },
    ],
    [
      formData,
      errors,
      validateStep,
      updatePersonalInfo,
      updateInsurance,
      updateMedicalInfo,
      addAttachment,
      removeAttachment,
      handleEditStep,
    ],
  );

  return (
    <div className={styles.pageContainer}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <Button
          variant="ghost"
          onClick={() => navigate('/patients')}
          leftIcon={<ArrowLeft size={18} />}
          className={styles.backButton}
        >
          Back to Patients
        </Button>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Add New Patient</h1>
          <p className={styles.pageSubtitle}>
            Fill in the patient's information to create a new record.
          </p>
        </div>
      </div>

      {/* Submit Error */}
      {submitError ? (
        <div className={styles.errorContainer}>
          <AlertBanner variant="error" title="Error creating patient" dismissible>
            {submitError.message}
          </AlertBanner>
        </div>
      ) : null}

      {/* Wizard */}
      <Card className={styles.wizardCard}>
        <Wizard
          steps={wizardSteps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          onComplete={handleSubmit}
          allowStepClick={true}
          labels={{
            next: 'Next Step',
            previous: 'Back',
            complete: isSubmitting ? 'Creating...' : 'Create Patient',
            skip: 'Skip',
          }}
        />
      </Card>
    </div>
  );
}

export default CreatePatientWizard;
