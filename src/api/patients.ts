/**
 * Patients API Module
 * CRUD operations and specialized patient endpoints
 */

import { createModuleApi } from './client';
import type { PaginatedResponse, SearchParams, BigIntStr } from './types';
import type { Patient, CreatePatientData, UpdatePatientData } from '../types/patient';

const patientsApi = createModuleApi('PatientsModule', {
  retryable: true,
  maxRetries: 2,
});

// ============================================================================
// TYPES
// ============================================================================

export interface GetPatientsParams extends SearchParams {
  isActive?: boolean;
  hasInsurance?: boolean;
}

export interface PatientStats {
  total: number;
  active: number;
  inactive: number;
  withInsurance: number;
  newThisMonth: number;
}

// ============================================================================
// CRUD
// ============================================================================

export async function getPatients(
  params: GetPatientsParams = {},
): Promise<PaginatedResponse<Patient>> {
  const query: Record<string, unknown> = {};

  if (params.page !== undefined) query.page = params.page;
  if (params.pageSize !== undefined) query.pageSize = params.pageSize;
  if (params.search?.trim()) query.search = params.search.trim();
  if (params.sortBy) query.sortBy = params.sortBy;
  if (params.sortOrder) query.sortOrder = params.sortOrder;
  if (params.isActive !== undefined) query.isActive = params.isActive;
  if (params.hasInsurance !== undefined) query.hasInsurance = params.hasInsurance;

  const response = await patientsApi.get<PaginatedResponse<Patient>>('/patients', {
    params: query,
    context: { action: 'get_patients', additionalData: { params } },
  });

  return response.data;
}

export async function getPatientById(id: BigIntStr): Promise<Patient> {
  const response = await patientsApi.get<Patient>(`/patients/${id}`, {
    context: { action: 'get_patient_by_id', additionalData: { patientId: id } },
  });
  return response.data;
}

export async function createPatient(data: CreatePatientData): Promise<Patient> {
  const response = await patientsApi.post<Patient>('/patients', data, {
    context: { action: 'create_patient' },
  });
  return response.data;
}

export async function updatePatient(id: BigIntStr, data: UpdatePatientData): Promise<Patient> {
  const response = await patientsApi.patch<Patient>(`/patients/${id}`, data, {
    context: { action: 'update_patient', additionalData: { patientId: id } },
  });
  return response.data;
}

export async function deletePatient(id: BigIntStr): Promise<void> {
  await patientsApi.delete(`/patients/${id}`, {
    context: { action: 'delete_patient', additionalData: { patientId: id } },
  });
}

// ============================================================================
// SPECIALIZED
// ============================================================================

export async function searchPatients(query: string): Promise<Patient[]> {
  // Use the list endpoint with search param (backend doesn't have /search route)
  const response = await patientsApi.get<PaginatedResponse<Patient>>('/patients', {
    params: { search: query, pageSize: 50 },
    context: { action: 'search_patients', additionalData: { query } },
  });
  return response.data.data;
}

export async function getPatientStats(): Promise<PatientStats> {
  const response = await patientsApi.get<PatientStats>('/patients/stats', {
    context: { action: 'get_patient_stats' },
  });
  return response.data;
}

// ============================================================================
// ERROR CHECKS
// ============================================================================

export function isPatientNotFoundError(error: unknown): boolean {
  const err = error as { error?: { code?: string; message?: string } };
  return (
    err?.error?.code === 'NOT_FOUND_ERROR' && (err?.error?.message?.includes('patient') ?? false)
  );
}

export function isPatientConflictError(error: unknown): boolean {
  const err = error as { error?: { code?: string; message?: string } };
  return (
    err?.error?.code === 'CONFLICT_ERROR' && (err?.error?.message?.includes('patient') ?? false)
  );
}
