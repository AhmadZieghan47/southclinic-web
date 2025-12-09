/**
 * CreatePatientWizard Validation Schemas
 * Zod schemas for form validation
 */

import { z } from 'zod';

// ============================================================================
// PERSONAL INFO SCHEMA
// ============================================================================

export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(100, 'First name must be at most 100 characters'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(100, 'Last name must be at most 100 characters'),
  phone: z
    .string()
    .min(4, 'Phone number must be at least 4 characters')
    .max(50, 'Phone number must be at most 50 characters'),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date (YYYY-MM-DD)'),
  gender: z.enum(['M', 'F', 'O'], { message: 'Please select a gender' }),
  nationalId: z
    .string()
    .max(64, 'National ID must be at most 64 characters')
    .optional()
    .or(z.literal('')),
});

// ============================================================================
// INSURANCE SCHEMA
// ============================================================================

export const insuranceSchema = z.object({
  hasInsurance: z.boolean(),
  insurerId: z.string().optional(),
  coveragePercent: z
    .number()
    .min(1, 'Coverage must be at least 1%')
    .max(100, 'Coverage must be at most 100%')
    .optional()
    .or(z.nan()),
  approvalNumber: z
    .string()
    .max(64, 'Approval number must be at most 64 characters')
    .optional()
    .or(z.literal('')),
  expiryDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date (YYYY-MM-DD)')
    .optional()
    .or(z.literal('')),
});

// Conditional insurance validation
export const insuranceConditionalSchema = insuranceSchema.superRefine((data, ctx) => {
  if (!data.hasInsurance) return;

  if (!data.insurerId) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['insurerId'],
      message: 'Please select an insurance company',
    });
  }

  if (data.coveragePercent === undefined || Number.isNaN(data.coveragePercent)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['coveragePercent'],
      message: 'Coverage percentage is required',
    });
  } else if (data.coveragePercent < 1 || data.coveragePercent > 100) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['coveragePercent'],
      message: 'Coverage must be between 1 and 100',
    });
  }
});

// ============================================================================
// MEDICAL INFO SCHEMA
// ============================================================================

export const medicalInfoSchema = z.object({
  medicalHistory: z.array(z.string()).default([]),
  orthopedicImplants: z.array(z.string()).default([]),
  extraCare: z.boolean().default(false),
  notes: z.string().optional().or(z.literal('')),
});

// ============================================================================
// ATTACHMENTS SCHEMA
// ============================================================================

export const attachmentFileSchema = z.object({
  id: z.string(),
  name: z.string(),
  size: z.number().max(10 * 1024 * 1024, 'File size must be less than 10MB'),
  type: z.string(),
  file: z.any(),
  progress: z.number().optional(),
  status: z.enum(['pending', 'uploading', 'complete', 'error']),
  error: z.string().optional(),
});

export const attachmentsSchema = z.object({
  files: z.array(attachmentFileSchema).optional().default([]),
});

// ============================================================================
// FULL FORM SCHEMA
// ============================================================================

export const createPatientFormSchema = z.object({
  personal: personalInfoSchema,
  insurance: insuranceConditionalSchema,
  medical: medicalInfoSchema,
  attachments: attachmentsSchema,
});

// ============================================================================
// STEP VALIDATION FUNCTIONS
// ============================================================================

export function validatePersonalInfo(data: unknown) {
  return personalInfoSchema.safeParse(data);
}

export function validateInsurance(data: unknown, hasInsurance: boolean) {
  if (!hasInsurance) {
    return { success: true, data };
  }
  return insuranceConditionalSchema.safeParse(data);
}

export function validateMedicalInfo(data: unknown) {
  return medicalInfoSchema.safeParse(data);
}

export function validateAttachments(data: unknown) {
  return attachmentsSchema.safeParse(data);
}

export function validateFullForm(data: unknown) {
  return createPatientFormSchema.safeParse(data);
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type InsuranceFormData = z.infer<typeof insuranceSchema>;
export type MedicalInfoFormData = z.infer<typeof medicalInfoSchema>;
export type AttachmentsFormData = z.infer<typeof attachmentsSchema>;
export type CreatePatientFormSchema = z.infer<typeof createPatientFormSchema>;
