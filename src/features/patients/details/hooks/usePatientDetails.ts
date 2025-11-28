/**
 * usePatientDetails Hook
 * Manages patient details fetching, state, and derived data
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { getPatientById } from '../../../../services/patientApi';
import type { Patient, TreatmentPlan, Appointment, Payment, InsuranceProfile } from '../../../../types/patient';
import type {
  UsePatientDetailsOptions,
  UsePatientDetailsReturn,
  AppointmentRow,
  PaymentRow,
  FileRow,
} from '../PatientDetailsPage.types';
import {
  SESSION_TYPE_LABELS,
  LOCATION_LABELS,
  STATUS_CONFIG,
  PAYMENT_METHOD_LABELS,
} from '../PatientDetailsPage.types';

// Memory limits to prevent unbounded growth
const MAX_ITEMS = 500;

/**
 * Format file size to human-readable string
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Get file type label from MIME type
 */
function getFileTypeLabel(mimeType: string): string {
  if (mimeType.startsWith('image/')) return 'Image';
  if (mimeType.startsWith('application/pdf')) return 'PDF';
  if (mimeType.includes('word')) return 'Document';
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return 'Spreadsheet';
  return 'File';
}

/**
 * Generate payment description
 */
function generatePaymentDescription(payment: Payment): string {
  if (payment.appointmentId) {
    return `Payment for Appointment #${payment.appointmentId}`;
  }
  if (payment.planId) {
    return `Payment for Treatment Plan #${payment.planId}`;
  }
  return 'General Payment';
}

export function usePatientDetails(
  patientId: string | undefined,
  options: UsePatientDetailsOptions = {}
): UsePatientDetailsReturn {
  const { autoRefresh = false, refreshInterval = 60000 } = options;

  // State
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>('');

  // Fetch patient data
  const fetchPatient = useCallback(async () => {
    if (!patientId) {
      setLoading(false);
      setError('Patient ID is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getPatientById(patientId);
      setPatient(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load patient details';
      setError(message);
      setPatient(null);
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  // Initial fetch
  useEffect(() => {
    fetchPatient();
  }, [fetchPatient]);

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh || !patientId) return;

    const interval = setInterval(fetchPatient, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchPatient, patientId]);

  // Computed: Active treatment plan
  const activePlan = useMemo<TreatmentPlan | null>(() => {
    if (!patient?.plans?.length) return null;
    return patient.plans.find((p) => p.status === 'ONGOING') || patient.plans[0];
  }, [patient]);

  // Computed: Insurance profile
  const insuranceProfile = useMemo<InsuranceProfile | null>(() => {
    if (!patient?.insuranceProfiles?.length) return null;
    return patient.insuranceProfiles[0];
  }, [patient]);

  // Computed: Last visit date
  const lastVisitDate = useMemo<string | null>(() => {
    if (!patient?.plans?.length) return null;

    const allAppointments: Appointment[] = [];
    for (const plan of patient.plans) {
      if (plan.appointments) {
        allAppointments.push(...plan.appointments);
      }
    }

    const completed = allAppointments
      .filter((a) => a.status === 'COMPLETED')
      .sort((a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime());

    return completed[0]?.startsAt || null;
  }, [patient]);

  // Transform appointments to rows
  const appointments = useMemo<AppointmentRow[]>(() => {
    if (!patient?.plans?.length) return [];

    const rows: AppointmentRow[] = [];

    for (const plan of patient.plans) {
      if (rows.length >= MAX_ITEMS) break;
      if (!plan.appointments) continue;

      for (const appt of plan.appointments) {
        if (rows.length >= MAX_ITEMS) break;

        const config = STATUS_CONFIG[appt.status];
        rows.push({
          ...appt,
          therapistName: `Therapist #${appt.therapistId}`,
          sessionTypeLabel: SESSION_TYPE_LABELS[appt.sessionType] || appt.sessionType,
          locationLabel: LOCATION_LABELS[appt.location] || appt.location,
          statusLabel: config.label,
          statusVariant: config.variant,
        });
      }
    }

    return rows.sort(
      (a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime()
    );
  }, [patient]);

  // Transform payments to rows
  const payments = useMemo<PaymentRow[]>(() => {
    if (!patient?.payments?.length) return [];

    return patient.payments
      .slice(0, MAX_ITEMS)
      .map((payment) => ({
        ...payment,
        description: generatePaymentDescription(payment),
        methodLabel: PAYMENT_METHOD_LABELS[payment.method] || payment.method,
        statusLabel: 'Completed',
      }))
      .sort((a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime());
  }, [patient]);

  // Transform files to rows
  const files = useMemo<FileRow[]>(() => {
    if (!patient?.files?.length) return [];

    return patient.files
      .slice(0, MAX_ITEMS)
      .map((file) => ({
        ...file,
        fileTypeLabel: getFileTypeLabel(file.mimeType),
        sizeLabel: formatFileSize(file.sizeBytes),
        downloadUrl: `/api/file-blobs/${file.id}/download`,
      }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [patient]);

  // Filtered appointments
  const filteredAppointments = useMemo<AppointmentRow[]>(() => {
    const q = searchText.trim().toLowerCase();
    if (!q) return appointments;

    return appointments.filter(
      (appt) =>
        appt.therapistName?.toLowerCase().includes(q) ||
        appt.sessionTypeLabel.toLowerCase().includes(q) ||
        appt.locationLabel.toLowerCase().includes(q) ||
        appt.statusLabel.toLowerCase().includes(q) ||
        appt.noteEn?.toLowerCase().includes(q)
    );
  }, [appointments, searchText]);

  // Filtered payments
  const filteredPayments = useMemo<PaymentRow[]>(() => {
    const q = searchText.trim().toLowerCase();
    if (!q) return payments;

    return payments.filter(
      (payment) =>
        payment.id.toLowerCase().includes(q) ||
        payment.description.toLowerCase().includes(q) ||
        payment.methodLabel.toLowerCase().includes(q) ||
        payment.amountJd.includes(q)
    );
  }, [payments, searchText]);

  // Filtered files
  const filteredFiles = useMemo<FileRow[]>(() => {
    const q = searchText.trim().toLowerCase();
    if (!q) return files;

    return files.filter(
      (file) =>
        file.id.toLowerCase().includes(q) ||
        file.labelEn?.toLowerCase().includes(q) ||
        file.labelAr?.toLowerCase().includes(q) ||
        file.fileTypeLabel.toLowerCase().includes(q)
    );
  }, [files, searchText]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    patient,
    loading,
    error,

    // Computed
    activePlan,
    insuranceProfile,
    appointments,
    payments,
    files,
    lastVisitDate,

    // Filtered data
    filteredAppointments,
    filteredPayments,
    filteredFiles,

    // Search
    searchText,
    setSearchText,

    // Actions
    refresh: fetchPatient,
    clearError,
  };
}
