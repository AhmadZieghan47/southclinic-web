/**
 * Enum Labels API Module
 * Dynamic label management for dropdowns and displays
 */

import { createModuleApi } from './client';
import type { BigIntStr, ISODateTime } from './types';

const enumLabelsApi = createModuleApi('EnumLabelsModule', {
  retryable: true,
  maxRetries: 2,
});

// ============================================================================
// TYPES
// ============================================================================

export type EnumGroup =
  | 'GENDER'
  | 'ROLE'
  | 'PLAN_TYPE'
  | 'PLAN_STATUS'
  | 'SESSION_TYPE'
  | 'LOCATION'
  | 'APPT_STATUS'
  | 'PAYMENT_METHOD'
  | 'CANCEL_REASON';

export interface EnumLabel {
  id: BigIntStr;
  group: EnumGroup;
  value: string;
  labelEn: string;
  labelAr: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface CreateEnumLabelData {
  group: EnumGroup;
  value: string;
  labelEn: string;
  labelAr?: string | null;
  sortOrder?: number;
}

export interface UpdateEnumLabelData extends Partial<Omit<CreateEnumLabelData, 'group' | 'value'>> {
  isActive?: boolean;
}

// Grouped labels for easy access
export interface EnumLabelsMap {
  GENDER: EnumLabel[];
  ROLE: EnumLabel[];
  PLAN_TYPE: EnumLabel[];
  PLAN_STATUS: EnumLabel[];
  SESSION_TYPE: EnumLabel[];
  LOCATION: EnumLabel[];
  APPT_STATUS: EnumLabel[];
  PAYMENT_METHOD: EnumLabel[];
  CANCEL_REASON: EnumLabel[];
}

// ============================================================================
// CRUD
// ============================================================================

export async function getEnumLabels(): Promise<EnumLabel[]> {
  const response = await enumLabelsApi.get<EnumLabel[]>('/enum-labels', {
    context: { action: 'get_enum_labels' },
  });
  return response.data;
}

export async function getEnumLabelsByGroup(group: EnumGroup): Promise<EnumLabel[]> {
  const response = await enumLabelsApi.get<EnumLabel[]>('/enum-labels', {
    params: { group },
    context: { action: 'get_enum_labels_by_group', additionalData: { group } },
  });
  return response.data;
}

export async function createEnumLabel(data: CreateEnumLabelData): Promise<EnumLabel> {
  const response = await enumLabelsApi.post<EnumLabel>('/enum-labels', data, {
    context: { action: 'create_enum_label' },
  });
  return response.data;
}

export async function updateEnumLabel(
  id: BigIntStr,
  data: UpdateEnumLabelData,
): Promise<EnumLabel> {
  const response = await enumLabelsApi.patch<EnumLabel>(`/enum-labels/${id}`, data, {
    context: { action: 'update_enum_label', additionalData: { enumLabelId: id } },
  });
  return response.data;
}

export async function deleteEnumLabel(id: BigIntStr): Promise<void> {
  await enumLabelsApi.delete(`/enum-labels/${id}`, {
    context: { action: 'delete_enum_label', additionalData: { enumLabelId: id } },
  });
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Group enum labels by their group for easy access
 */
export function groupEnumLabels(labels: EnumLabel[]): Partial<EnumLabelsMap> {
  return labels.reduce((acc, label) => {
    if (!acc[label.group]) {
      acc[label.group] = [];
    }
    acc[label.group]!.push(label);
    return acc;
  }, {} as Partial<EnumLabelsMap>);
}

/**
 * Get display label for a value
 */
export function getDisplayLabel(
  labels: EnumLabel[],
  value: string,
  lang: 'en' | 'ar' = 'en',
): string {
  const label = labels.find((l) => l.value === value);
  if (!label) return value;
  return lang === 'ar' ? (label.labelAr ?? label.labelEn) : label.labelEn;
}
