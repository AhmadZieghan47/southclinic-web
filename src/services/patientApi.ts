/**
 * Patient API Service
 * Handles all patient-related API calls
 */

import api from './api';
import type {
  Patient,
  GetPatientsParams,
  GetPatientsResponse,
  CreatePatientData,
  UpdatePatientData,
} from '../types/patient';

/**
 * Fetch paginated list of patients
 */
export async function getPatients(params: GetPatientsParams = {}): Promise<GetPatientsResponse> {
  const { page, pageSize, search } = params;
  const query: Record<string, any> = {};
  
  if (page !== undefined) query.page = page;
  if (pageSize !== undefined) query.pageSize = pageSize;
  if (search && search.trim().length > 0) query.search = search.trim();

  const response = await api.get<GetPatientsResponse>('/patients', { params: query });
  return response.data;
}

/**
 * Fetch a single patient by ID
 */
export async function getPatientById(id: string): Promise<Patient> {
  const response = await api.get<Patient>(`/patients/${id}`);
  return response.data;
}

/**
 * Create a new patient
 */
export async function createPatient(data: CreatePatientData): Promise<Patient> {
  const response = await api.post<Patient>('/patients', data);
  return response.data;
}

/**
 * Update an existing patient
 */
export async function updatePatient(id: string, data: UpdatePatientData): Promise<Patient> {
  const response = await api.patch<Patient>(`/patients/${id}`, data);
  return response.data;
}

/**
 * Delete a patient
 */
export async function deletePatient(id: string): Promise<void> {
  await api.delete(`/patients/${id}`);
}
