/**
 * Payments API Module
 * Payment CRUD and financial operations
 */

import { createModuleApi } from './client';
import type { PaginatedResponse, SearchParams, BigIntStr, ISODateTime, Money } from './types';
import type { Payment, PaymentMethod } from '../types/patient';

const paymentsApi = createModuleApi('PaymentsModule', {
  retryable: true,
  maxRetries: 2,
});

// ============================================================================
// TYPES
// ============================================================================

export interface GetPaymentsParams extends SearchParams {
  patientId?: BigIntStr;
  planId?: BigIntStr;
  appointmentId?: BigIntStr;
  method?: PaymentMethod;
  dateFrom?: ISODateTime;
  dateTo?: ISODateTime;
}

export interface CreatePaymentData {
  patientId: BigIntStr;
  planId?: BigIntStr | null;
  appointmentId?: BigIntStr | null;
  amountJd: Money;
  method: PaymentMethod;
  paidAt?: ISODateTime;
  notes?: string | null;
}

export interface UpdatePaymentData extends Partial<Omit<CreatePaymentData, 'patientId'>> {}

export interface PaymentWithDetails extends Payment {
  patient?: {
    id: BigIntStr;
    fullName: string;
  };
  plan?: {
    id: BigIntStr;
    diagnosisEn: string | null;
  };
}

export interface PaymentStats {
  totalRevenue: Money;
  todayRevenue: Money;
  weekRevenue: Money;
  monthRevenue: Money;
  countToday: number;
  countWeek: number;
  countMonth: number;
  byMethod: Record<PaymentMethod, Money>;
}

export interface PatientBalance {
  patientId: BigIntStr;
  totalPaid: Money;
  totalDue: Money;
  balance: Money;
}

// ============================================================================
// CRUD
// ============================================================================

export async function getPayments(
  params: GetPaymentsParams = {}
): Promise<PaginatedResponse<PaymentWithDetails>> {
  const query: Record<string, unknown> = {};

  if (params.page !== undefined) query.page = params.page;
  if (params.pageSize !== undefined) query.pageSize = params.pageSize;
  if (params.patientId) query.patientId = params.patientId;
  if (params.planId) query.planId = params.planId;
  if (params.appointmentId) query.appointmentId = params.appointmentId;
  if (params.method) query.method = params.method;
  if (params.dateFrom) query.dateFrom = params.dateFrom;
  if (params.dateTo) query.dateTo = params.dateTo;

  const response = await paymentsApi.get<PaginatedResponse<PaymentWithDetails>>('/payments', {
    params: query,
    context: { action: 'get_payments', additionalData: { params } },
  });

  return response.data;
}

export async function getPaymentById(id: BigIntStr): Promise<PaymentWithDetails> {
  const response = await paymentsApi.get<PaymentWithDetails>(`/payments/${id}`, {
    context: { action: 'get_payment_by_id', additionalData: { paymentId: id } },
  });
  return response.data;
}

export async function createPayment(data: CreatePaymentData): Promise<Payment> {
  const response = await paymentsApi.post<Payment>('/payments', data, {
    context: { action: 'create_payment' },
  });
  return response.data;
}

export async function updatePayment(id: BigIntStr, data: UpdatePaymentData): Promise<Payment> {
  const response = await paymentsApi.patch<Payment>(`/payments/${id}`, data, {
    context: { action: 'update_payment', additionalData: { paymentId: id } },
  });
  return response.data;
}

export async function deletePayment(id: BigIntStr): Promise<void> {
  await paymentsApi.delete(`/payments/${id}`, {
    context: { action: 'delete_payment', additionalData: { paymentId: id } },
  });
}

// ============================================================================
// SPECIALIZED
// ============================================================================

export async function getPaymentStats(): Promise<PaymentStats> {
  const response = await paymentsApi.get<PaymentStats>('/payments/stats', {
    context: { action: 'get_payment_stats' },
  });
  return response.data;
}

export async function getPatientBalance(patientId: BigIntStr): Promise<PatientBalance> {
  const response = await paymentsApi.get<PatientBalance>(`/patients/${patientId}/balance`, {
    context: { action: 'get_patient_balance', additionalData: { patientId } },
  });
  return response.data;
}

export async function getPatientPayments(patientId: BigIntStr): Promise<Payment[]> {
  const response = await paymentsApi.get<Payment[]>(`/patients/${patientId}/payments`, {
    context: { action: 'get_patient_payments', additionalData: { patientId } },
  });
  return response.data;
}

// ============================================================================
// EXPORT
// ============================================================================

export async function exportPayments(
  format: 'csv' | 'excel' | 'pdf',
  params?: GetPaymentsParams
): Promise<Blob> {
  return await paymentsApi.downloadFile('/payments/export', {
    params: { format, ...params },
    context: { action: 'export_payments', additionalData: { format } },
  });
}
