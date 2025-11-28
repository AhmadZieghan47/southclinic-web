/**
 * PersonalInfoStep Component
 * Step 1: Personal Information + Insurance (conditional)
 */

import { useCallback, useEffect, useState } from 'react';
import { User, Phone, Calendar, CreditCard } from 'lucide-react';
import { Input, Select, FormField, Card, Spinner, AlertBanner } from '../../../../design-system';
import type { PersonalInfoData, InsuranceData } from '../CreatePatientWizard.types';
import { GENDER_OPTIONS } from '../CreatePatientWizard.types';
import styles from './Steps.module.css';

// Insurer type (from API)
interface Insurer {
  id: string;
  nameEn: string;
  nameAr?: string;
}

interface PersonalInfoStepProps {
  personalData: PersonalInfoData;
  insuranceData: InsuranceData;
  onPersonalChange: (data: Partial<PersonalInfoData>) => void;
  onInsuranceChange: (data: Partial<InsuranceData>) => void;
  errors: Record<string, string>;
}

export function PersonalInfoStep({
  personalData,
  insuranceData,
  onPersonalChange,
  onInsuranceChange,
  errors,
}: PersonalInfoStepProps) {
  const [insurers, setInsurers] = useState<Insurer[]>([]);
  const [insurersLoading, setInsurersLoading] = useState(false);
  const [insurersError, setInsurersError] = useState<string | null>(null);

  // Fetch insurers when insurance is enabled
  useEffect(() => {
    if (insuranceData.hasInsurance && insurers.length === 0) {
      fetchInsurers();
    }
  }, [insuranceData.hasInsurance]);

  const fetchInsurers = async () => {
    setInsurersLoading(true);
    setInsurersError(null);
    try {
      const response = await fetch('/api/v1/insurers');
      if (!response.ok) throw new Error('Failed to fetch insurers');
      const data = await response.json();
      setInsurers(data.data || data || []);
    } catch (err) {
      setInsurersError('Unable to load insurers. Please try again.');
      console.error('Error fetching insurers:', err);
    } finally {
      setInsurersLoading(false);
    }
  };

  const insurerOptions = insurers.map((insurer) => ({
    value: insurer.id,
    label: insurer.nameEn,
  }));

  const handleInputChange = useCallback(
    (field: keyof PersonalInfoData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onPersonalChange({ [field]: e.target.value });
    },
    [onPersonalChange]
  );

  const handleGenderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onPersonalChange({ gender: e.target.value as PersonalInfoData['gender'] });
    },
    [onPersonalChange]
  );

  const handleInsuranceToggle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onInsuranceChange({ hasInsurance: e.target.checked });
    },
    [onInsuranceChange]
  );

  const handleInsuranceInputChange = useCallback(
    (field: keyof InsuranceData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = field === 'coveragePercent' ? Number(e.target.value) : e.target.value;
      onInsuranceChange({ [field]: value });
    },
    [onInsuranceChange]
  );

  return (
    <div className={styles.stepContainer}>
      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Personal Details</h2>
        <p className={styles.sectionDescription}>
          Please provide the patient's basic personal information.
        </p>
      </div>

      {/* Personal Info Form */}
      <Card className={styles.formCard}>
        <div className={styles.formGrid}>
          {/* First Name */}
          <FormField
            label="First Name"
            required
            error={errors['personal.firstName']}
          >
            <Input
              placeholder="Enter first name"
              value={personalData.firstName}
              onChange={handleInputChange('firstName')}
              error={!!errors['personal.firstName']}
              leftElement={<User size={18} />}
            />
          </FormField>

          {/* Last Name */}
          <FormField
            label="Last Name"
            required
            error={errors['personal.lastName']}
          >
            <Input
              placeholder="Enter last name"
              value={personalData.lastName}
              onChange={handleInputChange('lastName')}
              error={!!errors['personal.lastName']}
              leftElement={<User size={18} />}
            />
          </FormField>

          {/* Phone */}
          <FormField
            label="Phone Number"
            required
            error={errors['personal.phone']}
          >
            <Input
              type="tel"
              placeholder="Enter phone number"
              value={personalData.phone}
              onChange={handleInputChange('phone')}
              error={!!errors['personal.phone']}
              leftElement={<Phone size={18} />}
            />
          </FormField>

          {/* Date of Birth */}
          <FormField
            label="Date of Birth"
            required
            error={errors['personal.dob']}
          >
            <Input
              type="date"
              placeholder="YYYY-MM-DD"
              value={personalData.dob}
              onChange={handleInputChange('dob')}
              error={!!errors['personal.dob']}
              leftElement={<Calendar size={18} />}
            />
          </FormField>

          {/* Gender */}
          <FormField
            label="Gender"
            required
            error={errors['personal.gender']}
            className={styles.fullWidth}
          >
            <div className={styles.radioGroup}>
              {GENDER_OPTIONS.map((option) => (
                <label key={option.value} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="gender"
                    value={option.value}
                    checked={personalData.gender === option.value}
                    onChange={handleGenderChange}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioText}>{option.label}</span>
                </label>
              ))}
            </div>
          </FormField>

          {/* National ID */}
          <FormField
            label="National ID"
            helperText="Optional"
            error={errors['personal.nationalId']}
            className={styles.fullWidth}
          >
            <Input
              placeholder="Enter National ID"
              value={personalData.nationalId || ''}
              onChange={handleInputChange('nationalId')}
              error={!!errors['personal.nationalId']}
              leftElement={<CreditCard size={18} />}
            />
          </FormField>
        </div>
      </Card>

      {/* Insurance Section */}
      <div className={styles.sectionDivider} />

      <div className={styles.insuranceHeader}>
        <div>
          <h2 className={styles.sectionTitle}>Insurance</h2>
          <p className={styles.sectionDescription}>
            Toggle if the patient has insurance coverage.
          </p>
        </div>
        <input
          type="checkbox"
          className={styles.toggleInput}
          checked={insuranceData.hasInsurance}
          onChange={handleInsuranceToggle}
        />
      </div>

      {/* Insurance Details (Conditional) */}
      {insuranceData.hasInsurance && (
        <Card className={styles.formCard}>
          {insurersLoading ? (
            <div className={styles.loadingContainer}>
              <Spinner size="md" />
              <span>Loading insurers...</span>
            </div>
          ) : insurersError ? (
            <AlertBanner variant="warning" title="Unable to load insurers">
              {insurersError}
            </AlertBanner>
          ) : (
            <div className={styles.formGrid}>
              {/* Insurer Company */}
              <FormField
                label="Insurer Company"
                required
                error={errors['insurance.insurerId']}
                className={styles.fullWidth}
              >
                <Select
                  options={[{ value: '', label: 'Select insurer' }, ...insurerOptions]}
                  value={insuranceData.insurerId || ''}
                  onChange={handleInsuranceInputChange('insurerId')}
                  error={!!errors['insurance.insurerId']}
                  fullWidth
                />
                {insurerOptions.length === 0 && (
                  <small className={styles.helperText}>
                    No insurers available. Contact admin to add insurers.
                  </small>
                )}
              </FormField>

              {/* Coverage Percentage */}
              <FormField
                label="Coverage Percentage"
                required
                error={errors['insurance.coveragePercent']}
              >
                <div className={styles.inputWithSuffix}>
                  <Input
                    type="number"
                    min={1}
                    max={100}
                    placeholder="e.g., 80"
                    value={insuranceData.coveragePercent || ''}
                    onChange={handleInsuranceInputChange('coveragePercent')}
                    error={!!errors['insurance.coveragePercent']}
                  />
                  <span className={styles.inputSuffix}>%</span>
                </div>
              </FormField>

              {/* Approval Number */}
              <FormField
                label="Approval Number"
                helperText="Optional"
                error={errors['insurance.approvalNumber']}
              >
                <Input
                  placeholder="Enter approval number"
                  value={insuranceData.approvalNumber || ''}
                  onChange={handleInsuranceInputChange('approvalNumber')}
                  error={!!errors['insurance.approvalNumber']}
                />
              </FormField>

              {/* Expiry Date */}
              <FormField
                label="Insurance Expiry"
                helperText="Optional"
                error={errors['insurance.expiryDate']}
                className={styles.fullWidth}
              >
                <Input
                  type="date"
                  placeholder="YYYY-MM-DD"
                  value={insuranceData.expiryDate || ''}
                  onChange={handleInsuranceInputChange('expiryDate')}
                  error={!!errors['insurance.expiryDate']}
                  leftElement={<Calendar size={18} />}
                />
              </FormField>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

export default PersonalInfoStep;
