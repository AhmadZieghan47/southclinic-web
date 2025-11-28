/**
 * Session Types API Module
 * Session type configuration
 */

import { createModuleApi } from './client';
import type { BigIntStr, ISODateTime, Money } from './types';

const sessionTypesApi = createModuleApi('SessionTypesModule', {
  retryable: true,
  maxRetries: 2,
});

// ============================================================================
// TYPES
// ============================================================================

export interface SessionType {
  id: BigIntStr;
  code: string;
  nameEn: string;
  nameAr: string | null;
  defaultPriceJd: Money;
  durationMinutes: number;
  isActive: boolean;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface CreateSessionTypeData {
  code: string;
  nameEn: string;
  nameAr?: string | null;
  defaultPriceJd: Money;
  durationMinutes: number;
}

export interface UpdateSessionTypeData extends Partial<CreateSessionTypeData> {
  isActive?: boolean;
}

// ============================================================================
// CRUD
// ============================================================================

export async function getSessionTypes(): Promise<SessionType[]> {
  const response = await sessionTypesApi.get<SessionType[]>('/session-types', {
    context: { action: 'get_session_types' },
  });
  return response.data;
}

export async function getActiveSessionTypes(): Promise<SessionType[]> {
  const response = await sessionTypesApi.get<SessionType[]>('/session-types', {
    params: { isActive: true },
    context: { action: 'get_active_session_types' },
  });
  return response.data;
}

export async function getSessionTypeById(id: BigIntStr): Promise<SessionType> {
  const response = await sessionTypesApi.get<SessionType>(`/session-types/${id}`, {
    context: { action: 'get_session_type_by_id', additionalData: { sessionTypeId: id } },
  });
  return response.data;
}

export async function createSessionType(data: CreateSessionTypeData): Promise<SessionType> {
  const response = await sessionTypesApi.post<SessionType>('/session-types', data, {
    context: { action: 'create_session_type' },
  });
  return response.data;
}

export async function updateSessionType(
  id: BigIntStr,
  data: UpdateSessionTypeData
): Promise<SessionType> {
  const response = await sessionTypesApi.patch<SessionType>(`/session-types/${id}`, data, {
    context: { action: 'update_session_type', additionalData: { sessionTypeId: id } },
  });
  return response.data;
}

export async function deleteSessionType(id: BigIntStr): Promise<void> {
  await sessionTypesApi.delete(`/session-types/${id}`, {
    context: { action: 'delete_session_type', additionalData: { sessionTypeId: id } },
  });
}
