/**
 * Insurers API Module
 * Insurance provider management
 */

import { createModuleApi } from './client';
import type { BigIntStr, ISODateTime } from './types';

const insurersApi = createModuleApi('InsurersModule', {
  retryable: true,
  maxRetries: 2,
});

// ============================================================================
// TYPES
// ============================================================================

export interface Insurer {
  id: BigIntStr;
  nameEn: string;
  nameAr: string | null;
  code: string;
  isActive: boolean;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface CreateInsurerData {
  nameEn: string;
  nameAr?: string | null;
  code: string;
}

export interface UpdateInsurerData extends Partial<CreateInsurerData> {
  isActive?: boolean;
}

// ============================================================================
// CRUD
// ============================================================================

export async function getInsurers(): Promise<Insurer[]> {
  const response = await insurersApi.get<Insurer[]>('/insurers', {
    context: { action: 'get_insurers' },
  });
  return response.data;
}

export async function getActiveInsurers(): Promise<Insurer[]> {
  const response = await insurersApi.get<Insurer[]>('/insurers', {
    params: { isActive: true },
    context: { action: 'get_active_insurers' },
  });
  return response.data;
}

export async function getInsurerById(id: BigIntStr): Promise<Insurer> {
  const response = await insurersApi.get<Insurer>(`/insurers/${id}`, {
    context: { action: 'get_insurer_by_id', additionalData: { insurerId: id } },
  });
  return response.data;
}

export async function createInsurer(data: CreateInsurerData): Promise<Insurer> {
  const response = await insurersApi.post<Insurer>('/insurers', data, {
    context: { action: 'create_insurer' },
  });
  return response.data;
}

export async function updateInsurer(id: BigIntStr, data: UpdateInsurerData): Promise<Insurer> {
  const response = await insurersApi.patch<Insurer>(`/insurers/${id}`, data, {
    context: { action: 'update_insurer', additionalData: { insurerId: id } },
  });
  return response.data;
}

export async function deleteInsurer(id: BigIntStr): Promise<void> {
  await insurersApi.delete(`/insurers/${id}`, {
    context: { action: 'delete_insurer', additionalData: { insurerId: id } },
  });
}
