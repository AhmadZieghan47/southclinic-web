/**
 * useCreatePatient Hook
 * Manages form state, validation, and submission for patient creation wizard
 */

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPatient } from '../../../../services/patientApi';
import api from '../../../../services/api';
import {
  validatePersonalInfo,
  validateInsurance,
  validateMedicalInfo,
  validateAttachments,
} from '../CreatePatientWizard.schema';
import type {
  CreatePatientFormData,
  PersonalInfoData,
  InsuranceData,
  MedicalInfoData,
  AttachmentFile,
  UseCreatePatientOptions,
  UseCreatePatientReturn,
  CreatePatientPayload,
} from '../CreatePatientWizard.types';
import { DEFAULT_FORM_DATA } from '../CreatePatientWizard.types';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function generateFileId(): string {
  return `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function mapGenderToApi(gender: string): 'M' | 'F' | 'O' {
  return gender as 'M' | 'F' | 'O';
}

// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================

export function useCreatePatient(options: UseCreatePatientOptions = {}): UseCreatePatientReturn {
  const { onSuccess, onError } = options;
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState<CreatePatientFormData>(DEFAULT_FORM_DATA);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<Error | null>(null);

  // ---------------------------------------------------------------------------
  // VALIDATION
  // ---------------------------------------------------------------------------

  const validateStep = useCallback(
    async (step: number): Promise<boolean> => {
      setErrors({});

      switch (step) {
        case 0: {
          // Validate personal info
          const personalResult = validatePersonalInfo(formData.personal);
          if (!personalResult.success) {
            const newErrors: Record<string, string> = {};
            personalResult.error.issues.forEach((issue) => {
              const path = `personal.${issue.path.join('.')}`;
              newErrors[path] = issue.message;
            });
            setErrors(newErrors);
            return false;
          }

          // Validate insurance if enabled
          const insuranceResult = validateInsurance(
            formData.insurance,
            formData.insurance.hasInsurance,
          );
          if (!insuranceResult.success && 'error' in insuranceResult) {
            const newErrors: Record<string, string> = {};
            insuranceResult.error.issues.forEach((issue) => {
              const path = `insurance.${issue.path.join('.')}`;
              newErrors[path] = issue.message;
            });
            setErrors((prev) => ({ ...prev, ...newErrors }));
            return false;
          }
          return true;
        }

        case 1: {
          const result = validateMedicalInfo(formData.medical);
          if (!result.success) {
            const newErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
              const path = `medical.${issue.path.join('.')}`;
              newErrors[path] = issue.message;
            });
            setErrors(newErrors);
            return false;
          }
          return true;
        }

        case 2: {
          const result = validateAttachments(formData.attachments);
          if (!result.success) {
            const newErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
              const path = `attachments.${issue.path.join('.')}`;
              newErrors[path] = issue.message;
            });
            setErrors(newErrors);
            return false;
          }
          return true;
        }

        case 3: {
          // Full validation on review step
          const personalResult = validatePersonalInfo(formData.personal);
          const insuranceResult = validateInsurance(
            formData.insurance,
            formData.insurance.hasInsurance,
          );
          const medicalResult = validateMedicalInfo(formData.medical);

          const allErrors: Record<string, string> = {};
          let hasErrors = false;

          if (!personalResult.success) {
            hasErrors = true;
            personalResult.error.issues.forEach((issue) => {
              allErrors[`personal.${issue.path.join('.')}`] = issue.message;
            });
          }

          if (!insuranceResult.success && 'error' in insuranceResult) {
            hasErrors = true;
            insuranceResult.error.issues.forEach((issue) => {
              allErrors[`insurance.${issue.path.join('.')}`] = issue.message;
            });
          }

          if (!medicalResult.success) {
            hasErrors = true;
            medicalResult.error.issues.forEach((issue) => {
              allErrors[`medical.${issue.path.join('.')}`] = issue.message;
            });
          }

          if (hasErrors) {
            setErrors(allErrors);
            return false;
          }
          return true;
        }

        default:
          return true;
      }
    },
    [formData],
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  // ---------------------------------------------------------------------------
  // UPDATE FUNCTIONS
  // ---------------------------------------------------------------------------

  const updatePersonalInfo = useCallback((data: Partial<PersonalInfoData>) => {
    setFormData((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...data },
    }));
  }, []);

  const updateInsurance = useCallback((data: Partial<InsuranceData>) => {
    setFormData((prev) => ({
      ...prev,
      insurance: { ...prev.insurance, ...data },
    }));
  }, []);

  const updateMedicalInfo = useCallback((data: Partial<MedicalInfoData>) => {
    setFormData((prev) => ({
      ...prev,
      medical: { ...prev.medical, ...data },
    }));
  }, []);

  const addAttachment = useCallback((file: File) => {
    const newFile: AttachmentFile = {
      id: generateFileId(),
      name: file.name,
      size: file.size,
      type: file.type,
      file,
      status: 'pending',
    };

    setFormData((prev) => ({
      ...prev,
      attachments: {
        files: [...prev.attachments.files, newFile],
      },
    }));
  }, []);

  const removeAttachment = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      attachments: {
        files: prev.attachments.files.filter((f) => f.id !== id),
      },
    }));
  }, []);

  // ---------------------------------------------------------------------------
  // SUBMISSION
  // ---------------------------------------------------------------------------

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Validate all steps
      const isValid = await validateStep(3);
      if (!isValid) {
        setIsSubmitting(false);
        return;
      }

      // Build patient payload
      const payload: CreatePatientPayload = {
        fullName: `${formData.personal.firstName.trim()} ${formData.personal.lastName.trim()}`,
        dob: formData.personal.dob,
        gender: mapGenderToApi(formData.personal.gender),
        phone: formData.personal.phone,
        hasInsurance: formData.insurance.hasInsurance,
        extraCare: formData.medical.extraCare,
        nationalId: formData.personal.nationalId?.trim() || null,
        notes: formData.medical.notes?.trim() || null,
        medicalHistory: formData.medical.medicalHistory,
        orthopedicImplants: formData.medical.orthopedicImplants,
      };

      // Create patient
      const patient = await createPatient(payload);
      const patientId = patient.id;

      // Create insurance profile if enabled
      if (formData.insurance.hasInsurance && formData.insurance.insurerId) {
        const insurancePayload = {
          patientId,
          insurerId: formData.insurance.insurerId,
          coveragePercent: formData.insurance.coveragePercent?.toString() ?? '0',
          validityDate: formData.insurance.expiryDate || new Date().toISOString().split('T')[0],
          referralAuth: formData.insurance.approvalNumber || null,
        };
        await api.post('/insurance-profiles', insurancePayload);
      }

      // Upload attachments
      if (formData.attachments.files.length > 0) {
        for (const attachment of formData.attachments.files) {
          const form = new FormData();
          form.append('file', attachment.file);
          form.append('ownerPatientId', patientId);
          form.append('labelEn', attachment.name);

          await api.post('/file-blobs/upload', form, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        }
      }

      // Success callback
      if (onSuccess) {
        onSuccess(patientId);
      } else {
        navigate(`/patients/${patientId}`);
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to create patient');
      setSubmitError(err);
      if (onError) {
        onError(err);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateStep, navigate, onSuccess, onError]);

  // ---------------------------------------------------------------------------
  // RESET
  // ---------------------------------------------------------------------------

  const resetForm = useCallback(() => {
    setFormData(DEFAULT_FORM_DATA);
    setCurrentStep(0);
    setErrors({});
    setSubmitError(null);
  }, []);

  // ---------------------------------------------------------------------------
  // RETURN
  // ---------------------------------------------------------------------------

  return {
    formData,
    setFormData,
    currentStep,
    setCurrentStep,
    validateStep,
    errors,
    clearErrors,
    isSubmitting,
    submitError,
    handleSubmit,
    resetForm,
    updatePersonalInfo,
    updateInsurance,
    updateMedicalInfo,
    addAttachment,
    removeAttachment,
  };
}

export default useCreatePatient;
