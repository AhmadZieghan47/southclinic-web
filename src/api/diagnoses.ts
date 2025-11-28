/**
 * Diagnoses API Module
 * ICD-10 and custom diagnosis lookup
 */

import { createModuleApi } from './client';
import type { BigIntStr, ISODateTime } from './types';

const diagnosesApi = createModuleApi('DiagnosesModule', {
  retryable: true,
  maxRetries: 2,
});

// ============================================================================
// TYPES
// ============================================================================

export interface Diagnosis {
  id: BigIntStr;
  code: string;
  nameEn: string;
  nameAr: string | null;
  category: string | null;
  isActive: boolean;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface CreateDiagnosisData {
  code: string;
  nameEn: string;
  nameAr?: string | null;
  category?: string | null;
}

export interface UpdateDiagnosisData extends Partial<CreateDiagnosisData> {
  isActive?: boolean;
}

// ============================================================================
// CRUD
// ============================================================================

export async function getDiagnoses(): Promise<Diagnosis[]> {
  const response = await diagnosesApi.get<Diagnosis[]>('/diagnoses', {
    context: { action: 'get_diagnoses' },
  });
  return response.data;
}

export async function searchDiagnoses(query: string): Promise<Diagnosis[]> {
  const response = await diagnosesApi.get<Diagnosis[]>('/diagnoses/search', {
    params: { q: query },
    context: { action: 'search_diagnoses', additionalData: { query } },
  });
  return response.data;
}

export async function getDiagnosisById(id: BigIntStr): Promise<Diagnosis> {
  const response = await diagnosesApi.get<Diagnosis>(`/diagnoses/${id}`, {
    context: { action: 'get_diagnosis_by_id', additionalData: { diagnosisId: id } },
  });
  return response.data;
}

export async function createDiagnosis(data: CreateDiagnosisData): Promise<Diagnosis> {
  const response = await diagnosesApi.post<Diagnosis>('/diagnoses', data, {
    context: { action: 'create_diagnosis' },
  });
  return response.data;
}

export async function updateDiagnosis(id: BigIntStr, data: UpdateDiagnosisData): Promise<Diagnosis> {
  const response = await diagnosesApi.patch<Diagnosis>(`/diagnoses/${id}`, data, {
    context: { action: 'update_diagnosis', additionalData: { diagnosisId: id } },
  });
  return response.data;
}

export async function deleteDiagnosis(id: BigIntStr): Promise<void> {
  await diagnosesApi.delete(`/diagnoses/${id}`, {
    context: { action: 'delete_diagnosis', additionalData: { diagnosisId: id } },
  });
}
