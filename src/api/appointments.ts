/**
 * Appointments API Module
 * CRUD operations and scheduling endpoints
 */

import { createModuleApi } from './client';
import type { PaginatedResponse, SearchParams, BigIntStr, ISODateTime } from './types';
import type { Appointment, ApptStatusT, SessionTypeT, LocationT } from '../types/patient';

const appointmentsApi = createModuleApi('AppointmentsModule', {
  retryable: true,
  maxRetries: 2,
});

// ============================================================================
// TYPES
// ============================================================================

export interface GetAppointmentsParams extends SearchParams {
  patientId?: BigIntStr;
  planId?: BigIntStr;
  therapistId?: BigIntStr;
  status?: ApptStatusT;
  dateFrom?: ISODateTime;
  dateTo?: ISODateTime;
}

export interface CreateAppointmentData {
  planId: BigIntStr;
  therapistId: BigIntStr;
  sessionType: SessionTypeT;
  location: LocationT;
  startsAt: ISODateTime;
  endsAt: ISODateTime;
  noteEn?: string | null;
  noteAr?: string | null;
}

export interface UpdateAppointmentData extends Partial<CreateAppointmentData> {
  status?: ApptStatusT;
}

export interface RescheduleData {
  startsAt: ISODateTime;
  endsAt: ISODateTime;
  reason?: string;
}

export interface CancelData {
  reason: string;
}

export interface AppointmentWithPatient extends Appointment {
  patient?: {
    id: BigIntStr;
    fullName: string;
    phone: string;
  };
  therapist?: {
    id: BigIntStr;
    fullName: string;
  };
}

export interface SchedulerEvent {
  id: BigIntStr;
  title: string;
  start: ISODateTime;
  end: ISODateTime;
  patientId: BigIntStr;
  patientName: string;
  therapistId: BigIntStr;
  therapistName: string;
  status: ApptStatusT;
  sessionType: SessionTypeT;
  location: LocationT;
}

// ============================================================================
// CRUD
// ============================================================================

export async function getAppointments(
  params: GetAppointmentsParams = {},
): Promise<PaginatedResponse<AppointmentWithPatient>> {
  const query: Record<string, unknown> = {};

  if (params.page !== undefined) query.page = params.page;
  if (params.pageSize !== undefined) query.pageSize = params.pageSize;
  if (params.patientId) query.patientId = params.patientId;
  if (params.planId) query.planId = params.planId;
  if (params.therapistId) query.therapistId = params.therapistId;
  if (params.status) query.status = params.status;
  if (params.dateFrom) query.dateFrom = params.dateFrom;
  if (params.dateTo) query.dateTo = params.dateTo;

  const response = await appointmentsApi.get<PaginatedResponse<AppointmentWithPatient>>(
    '/appointments',
    {
      params: query,
      context: { action: 'get_appointments', additionalData: { params } },
    },
  );

  return response.data;
}

export async function getAppointmentById(id: BigIntStr): Promise<AppointmentWithPatient> {
  const response = await appointmentsApi.get<AppointmentWithPatient>(`/appointments/${id}`, {
    context: { action: 'get_appointment_by_id', additionalData: { appointmentId: id } },
  });
  return response.data;
}

export async function createAppointment(data: CreateAppointmentData): Promise<Appointment> {
  const response = await appointmentsApi.post<Appointment>('/appointments', data, {
    context: { action: 'create_appointment' },
  });
  return response.data;
}

export async function updateAppointment(
  id: BigIntStr,
  data: UpdateAppointmentData,
): Promise<Appointment> {
  const response = await appointmentsApi.patch<Appointment>(`/appointments/${id}`, data, {
    context: { action: 'update_appointment', additionalData: { appointmentId: id } },
  });
  return response.data;
}

export async function deleteAppointment(id: BigIntStr): Promise<void> {
  await appointmentsApi.delete(`/appointments/${id}`, {
    context: { action: 'delete_appointment', additionalData: { appointmentId: id } },
  });
}

// ============================================================================
// STATUS ACTIONS
// ============================================================================

export async function checkInAppointment(id: BigIntStr): Promise<Appointment> {
  const response = await appointmentsApi.post<Appointment>(`/appointments/${id}/check-in`, null, {
    context: { action: 'check_in_appointment', additionalData: { appointmentId: id } },
  });
  return response.data;
}

export async function completeAppointment(id: BigIntStr): Promise<Appointment> {
  const response = await appointmentsApi.post<Appointment>(`/appointments/${id}/complete`, null, {
    context: { action: 'complete_appointment', additionalData: { appointmentId: id } },
  });
  return response.data;
}

export async function cancelAppointment(id: BigIntStr, data: CancelData): Promise<Appointment> {
  const response = await appointmentsApi.post<Appointment>(`/appointments/${id}/cancel`, data, {
    context: { action: 'cancel_appointment', additionalData: { appointmentId: id } },
  });
  return response.data;
}

export async function rescheduleAppointment(
  id: BigIntStr,
  data: RescheduleData,
): Promise<Appointment> {
  const response = await appointmentsApi.post<Appointment>(`/appointments/${id}/reschedule`, data, {
    context: { action: 'reschedule_appointment', additionalData: { appointmentId: id } },
  });
  return response.data;
}

// ============================================================================
// SCHEDULER
// ============================================================================

export async function getSchedulerEvents(
  dateFrom: ISODateTime,
  dateTo: ISODateTime,
  therapistId?: BigIntStr,
): Promise<SchedulerEvent[]> {
  const params: Record<string, unknown> = { dateFrom, dateTo };
  if (therapistId) params.therapistId = therapistId;

  const response = await appointmentsApi.get<SchedulerEvent[]>('/appointments/scheduler', {
    params,
    context: { action: 'get_scheduler_events' },
  });
  return response.data;
}

export async function getTodayAppointments(): Promise<AppointmentWithPatient[]> {
  const response = await appointmentsApi.get<AppointmentWithPatient[]>('/appointments/today', {
    context: { action: 'get_today_appointments' },
  });
  return response.data;
}
