/**
 * MedicalInfoStep Component
 * Step 2: Medical Information (history, implants, extra care)
 */

import { useCallback, useState } from 'react';
import { Stethoscope, Heart, AlertTriangle, Plus, X } from 'lucide-react';
import { Card, FormField, Badge, Button, Input } from '../../../../design-system';
import type { MedicalInfoData } from '../CreatePatientWizard.types';
import { MEDICAL_HISTORY_OPTIONS, ORTHOPEDIC_IMPLANTS_OPTIONS } from '../CreatePatientWizard.types';
import styles from './Steps.module.css';

interface MedicalInfoStepProps {
  medicalData: MedicalInfoData;
  onMedicalChange: (data: Partial<MedicalInfoData>) => void;
  errors?: Record<string, string>;
}

export function MedicalInfoStep({
  medicalData,
  onMedicalChange,
}: MedicalInfoStepProps) {
  const [customHistoryInput, setCustomHistoryInput] = useState('');
  const [customImplantInput, setCustomImplantInput] = useState('');

  // Toggle medical history item
  const toggleMedicalHistory = useCallback(
    (item: string) => {
      const current = medicalData.medicalHistory;
      const updated = current.includes(item)
        ? current.filter((i) => i !== item)
        : [...current, item];
      onMedicalChange({ medicalHistory: updated });
    },
    [medicalData.medicalHistory, onMedicalChange]
  );

  // Add custom medical history
  const addCustomHistory = useCallback(() => {
    if (customHistoryInput.trim()) {
      const updated = [...medicalData.medicalHistory, customHistoryInput.trim()];
      onMedicalChange({ medicalHistory: updated });
      setCustomHistoryInput('');
    }
  }, [customHistoryInput, medicalData.medicalHistory, onMedicalChange]);

  // Toggle implant item
  const toggleImplant = useCallback(
    (item: string) => {
      const current = medicalData.orthopedicImplants;
      const updated = current.includes(item)
        ? current.filter((i) => i !== item)
        : [...current, item];
      onMedicalChange({ orthopedicImplants: updated });
    },
    [medicalData.orthopedicImplants, onMedicalChange]
  );

  // Add custom implant
  const addCustomImplant = useCallback(() => {
    if (customImplantInput.trim()) {
      const updated = [...medicalData.orthopedicImplants, customImplantInput.trim()];
      onMedicalChange({ orthopedicImplants: updated });
      setCustomImplantInput('');
    }
  }, [customImplantInput, medicalData.orthopedicImplants, onMedicalChange]);

  // Toggle extra care
  const handleExtraCareToggle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onMedicalChange({ extraCare: e.target.checked });
    },
    [onMedicalChange]
  );

  // Handle notes change
  const handleNotesChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onMedicalChange({ notes: e.target.value });
    },
    [onMedicalChange]
  );

  return (
    <div className={styles.stepContainer}>
      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Medical Information</h2>
        <p className={styles.sectionDescription}>
          Please provide relevant medical history to help tailor treatment.
        </p>
      </div>

      {/* Medical History */}
      <Card className={styles.formCard}>
        <div className={styles.cardHeader}>
          <Stethoscope size={20} className={styles.cardIcon} />
          <h3 className={styles.cardTitle}>Medical History</h3>
        </div>
        <p className={styles.cardDescription}>
          Select any conditions that apply or add custom entries.
        </p>

        <div className={styles.tagContainer}>
          {MEDICAL_HISTORY_OPTIONS.map((option) => (
            <Badge
              key={option}
              variant={medicalData.medicalHistory.includes(option) ? 'primary' : 'default'}
              className={styles.selectableTag}
              onClick={() => toggleMedicalHistory(option)}
            >
              {option}
              {medicalData.medicalHistory.includes(option) && (
                <X size={14} className={styles.tagRemove} />
              )}
            </Badge>
          ))}
          {/* Custom entries */}
          {medicalData.medicalHistory
            .filter((item) => !MEDICAL_HISTORY_OPTIONS.includes(item as any))
            .map((item) => (
              <Badge
                key={item}
                variant="primary"
                className={styles.selectableTag}
                onClick={() => toggleMedicalHistory(item)}
              >
                {item}
                <X size={14} className={styles.tagRemove} />
              </Badge>
            ))}
        </div>

        {/* Add Custom */}
        <div className={styles.addCustomContainer}>
          <Input
            placeholder="Add custom condition..."
            value={customHistoryInput}
            onChange={(e) => setCustomHistoryInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCustomHistory()}
            size="sm"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={addCustomHistory}
            disabled={!customHistoryInput.trim()}
            leftIcon={<Plus size={14} />}
          >
            Add
          </Button>
        </div>
      </Card>

      {/* Orthopedic Implants */}
      <Card className={styles.formCard}>
        <div className={styles.cardHeader}>
          <Heart size={20} className={styles.cardIcon} />
          <h3 className={styles.cardTitle}>Orthopedic Implants</h3>
        </div>
        <p className={styles.cardDescription}>
          Select any implants or devices the patient has.
        </p>

        <div className={styles.tagContainer}>
          {ORTHOPEDIC_IMPLANTS_OPTIONS.map((option) => (
            <Badge
              key={option}
              variant={medicalData.orthopedicImplants.includes(option) ? 'primary' : 'default'}
              className={styles.selectableTag}
              onClick={() => toggleImplant(option)}
            >
              {option}
              {medicalData.orthopedicImplants.includes(option) && (
                <X size={14} className={styles.tagRemove} />
              )}
            </Badge>
          ))}
          {/* Custom entries */}
          {medicalData.orthopedicImplants
            .filter((item) => !ORTHOPEDIC_IMPLANTS_OPTIONS.includes(item as any))
            .map((item) => (
              <Badge
                key={item}
                variant="primary"
                className={styles.selectableTag}
                onClick={() => toggleImplant(item)}
              >
                {item}
                <X size={14} className={styles.tagRemove} />
              </Badge>
            ))}
        </div>

        {/* Add Custom */}
        <div className={styles.addCustomContainer}>
          <Input
            placeholder="Add custom implant..."
            value={customImplantInput}
            onChange={(e) => setCustomImplantInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCustomImplant()}
            size="sm"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={addCustomImplant}
            disabled={!customImplantInput.trim()}
            leftIcon={<Plus size={14} />}
          >
            Add
          </Button>
        </div>
      </Card>

      {/* Extra Care Toggle */}
      <Card className={styles.formCard}>
        <div className={styles.extraCareRow}>
          <div className={styles.extraCareInfo}>
            <div className={styles.cardHeader}>
              <AlertTriangle size={20} className={styles.cardIconWarning} />
              <h3 className={styles.cardTitle}>Requires Extra Care</h3>
            </div>
            <p className={styles.cardDescription}>
              Enable this if the patient needs special attention during treatment.
            </p>
          </div>
          <input
            type="checkbox"
            className={styles.toggleInput}
            checked={medicalData.extraCare}
            onChange={handleExtraCareToggle}
          />
        </div>
      </Card>

      {/* Additional Notes */}
      <Card className={styles.formCard}>
        <FormField
          label="Additional Notes"
          helperText="Any other relevant medical information"
        >
          <textarea
            className={styles.textarea}
            placeholder="Enter any additional notes about the patient's medical condition..."
            value={medicalData.notes || ''}
            onChange={handleNotesChange}
            rows={4}
          />
        </FormField>
      </Card>
    </div>
  );
}

export default MedicalInfoStep;
