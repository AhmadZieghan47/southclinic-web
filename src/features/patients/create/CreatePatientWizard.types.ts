/**
 * CreatePatientWizard Types
 * Type definitions for the patient creation wizard
 */

import type { GenderT } from '../../../types/patient';

// ============================================================================
// FORM DATA TYPES
// ============================================================================

export interface PersonalInfoData {
  firstName: string;
  lastName: string;
  phone: string;
  dob: string;
  gender: GenderT;
  nationalId?: string;
}

export interface InsuranceData {
  hasInsurance: boolean;
  insurerId?: string;
  coveragePercent?: number;
  approvalNumber?: string;
  expiryDate?: string;
}

export interface MedicalInfoData {
  medicalHistory: string[];
  orthopedicImplants: string[];
  extraCare: boolean;
  notes?: string;
}

export interface AttachmentFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
  progress?: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
  error?: string;
}

export interface AttachmentsData {
  files: AttachmentFile[];
}

export interface CreatePatientFormData {
  personal: PersonalInfoData;
  insurance: InsuranceData;
  medical: MedicalInfoData;
  attachments: AttachmentsData;
}

// ============================================================================
// API TYPES
// ============================================================================

export interface CreatePatientPayload {
  fullName: string;
  dob: string;
  gender: GenderT;
  phone: string;
  hasInsurance: boolean;
  extraCare: boolean;
  nationalId?: string | null;
  notes?: string | null;
  medicalHistory: string[];
  orthopedicImplants: string[];
}

export interface CreateInsuranceProfilePayload {
  patientId: string;
  insurerId: string;
  coveragePercent: string;
  validityDate: string;
  referralAuth?: string | null;
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface StepProps {
  onValidate?: () => boolean | Promise<boolean>;
}

export interface PersonalInfoStepProps extends StepProps {
  // Additional props if needed
}

export interface MedicalInfoStepProps extends StepProps {
  // Additional props if needed
}

export interface AttachmentsStepProps extends StepProps {
  // Additional props if needed
}

export interface ReviewStepProps extends StepProps {
  onEditStep: (step: number) => void;
}

// ============================================================================
// HOOK TYPES
// ============================================================================

export interface UseCreatePatientOptions {
  onSuccess?: (patientId: string) => void;
  onError?: (error: Error) => void;
}

export interface UseCreatePatientReturn {
  // Form state
  formData: CreatePatientFormData;
  setFormData: React.Dispatch<React.SetStateAction<CreatePatientFormData>>;
  
  // Step management
  currentStep: number;
  setCurrentStep: (step: number) => void;
  
  // Validation
  validateStep: (step: number) => Promise<boolean>;
  errors: Record<string, string>;
  clearErrors: () => void;
  
  // Submission
  isSubmitting: boolean;
  submitError: Error | null;
  handleSubmit: () => Promise<void>;
  
  // Utilities
  resetForm: () => void;
  updatePersonalInfo: (data: Partial<PersonalInfoData>) => void;
  updateInsurance: (data: Partial<InsuranceData>) => void;
  updateMedicalInfo: (data: Partial<MedicalInfoData>) => void;
  addAttachment: (file: File) => void;
  removeAttachment: (id: string) => void;
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const WIZARD_STEPS = [
  { id: 'personal', title: 'Personal Information', description: 'Basic details and insurance' },
  { id: 'medical', title: 'Medical Information', description: 'Health history and conditions' },
  { id: 'attachments', title: 'Attachments', description: 'Upload documents', optional: true },
  { id: 'review', title: 'Review', description: 'Confirm and submit' },
] as const;

export const GENDER_OPTIONS = [
  { value: 'M' as GenderT, label: 'Male' },
  { value: 'F' as GenderT, label: 'Female' },
  { value: 'O' as GenderT, label: 'Other' },
] as const;

export const MEDICAL_HISTORY_OPTIONS = [
  'Arthritis',
  'Sciatica',
  'Osteoporosis',
  'Diabetes',
  'Hypertension',
  'Heart Disease',
  'Stroke',
  'Cancer',
  'Chronic Pain',
  'Fibromyalgia',
] as const;

export const ORTHOPEDIC_IMPLANTS_OPTIONS = [
  'Hip Replacement',
  'Knee Replacement',
  'Spinal Fusion',
  'Shoulder Replacement',
  'Ankle Replacement',
  'Pacemaker',
  'Metal Plates',
  'Screws/Pins',
] as const;

export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const DEFAULT_FORM_DATA: CreatePatientFormData = {
  personal: {
    firstName: '',
    lastName: '',
    phone: '',
    dob: '',
    gender: 'M',
    nationalId: '',
  },
  insurance: {
    hasInsurance: false,
    insurerId: '',
    coveragePercent: undefined,
    approvalNumber: '',
    expiryDate: '',
  },
  medical: {
    medicalHistory: [],
    orthopedicImplants: [],
    extraCare: false,
    notes: '',
  },
  attachments: {
    files: [],
  },
};
