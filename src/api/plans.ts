/**
 * Treatment Plans API Module
 * Treatment plan CRUD and management
 */

import { createModuleApi } from './client';
import type { PaginatedResponse, SearchParams, BigIntStr, Money } from './types';
import type { TreatmentPlan, PlanTypeT, PlanStatusT, Appointment } from '../types/patient';

const plansApi = createModuleApi('PlansModule', {
  retryable: true,
  maxRetries: 2,
});

// ============================================================================
// TYPES
// ============================================================================

export interface GetPlansParams extends SearchParams {
  patientId?: BigIntStr;
  status?: PlanStatusT;
  planType?: PlanTypeT;
}

export interface CreatePlanData {
  patientId: BigIntStr;
  planType: PlanTypeT;
  diagnosisEn?: string | null;
  diagnosisAr?: string | null;
  totalSessions?: number | null;
  priceJd: Money;
}

export interface UpdatePlanData extends Partial<Omit<CreatePlanData, 'patientId'>> {}

export interface PlanWithAppointments extends TreatmentPlan {
  appointments?: Appointment[];
  patient?: {
    id: BigIntStr;
    fullName: string;
  };
}

// ============================================================================
// CRUD
// ============================================================================

export async function getPlans(
  params: GetPlansParams = {}
): Promise<PaginatedResponse<TreatmentPlan>> {
  const query: Record<string, unknown> = {};

  if (params.page !== undefined) query.page = params.page;
  if (params.pageSize !== undefined) query.pageSize = params.pageSize;
  if (params.patientId) query.patientId = params.patientId;
  if (params.status) query.status = params.status;
  if (params.planType) query.planType = params.planType;

  const response = await plansApi.get<PaginatedResponse<TreatmentPlan>>('/plans', {
    params: query,
    context: { action: 'get_plans', additionalData: { params } },
  });

  return response.data;
}

export async function getPlanById(id: BigIntStr): Promise<PlanWithAppointments> {
  const response = await plansApi.get<PlanWithAppointments>(`/plans/${id}`, {
    context: { action: 'get_plan_by_id', additionalData: { planId: id } },
  });
  return response.data;
}

export async function getPatientPlans(patientId: BigIntStr): Promise<TreatmentPlan[]> {
  const response = await plansApi.get<TreatmentPlan[]>(`/patients/${patientId}/plans`, {
    context: { action: 'get_patient_plans', additionalData: { patientId } },
  });
  return response.data;
}

export async function createPlan(data: CreatePlanData): Promise<TreatmentPlan> {
  const response = await plansApi.post<TreatmentPlan>('/plans', data, {
    context: { action: 'create_plan' },
  });
  return response.data;
}

export async function updatePlan(id: BigIntStr, data: UpdatePlanData): Promise<TreatmentPlan> {
  const response = await plansApi.patch<TreatmentPlan>(`/plans/${id}`, data, {
    context: { action: 'update_plan', additionalData: { planId: id } },
  });
  return response.data;
}

export async function deletePlan(id: BigIntStr): Promise<void> {
  await plansApi.delete(`/plans/${id}`, {
    context: { action: 'delete_plan', additionalData: { planId: id } },
  });
}

// ============================================================================
// STATUS ACTIONS
// ============================================================================

export async function dischargePlan(id: BigIntStr): Promise<TreatmentPlan> {
  const response = await plansApi.post<TreatmentPlan>(`/plans/${id}/discharge`, null, {
    context: { action: 'discharge_plan', additionalData: { planId: id } },
  });
  return response.data;
}

export async function reactivatePlan(id: BigIntStr): Promise<TreatmentPlan> {
  const response = await plansApi.post<TreatmentPlan>(`/plans/${id}/reactivate`, null, {
    context: { action: 'reactivate_plan', additionalData: { planId: id } },
  });
  return response.data;
}
