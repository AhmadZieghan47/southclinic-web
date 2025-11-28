/**
 * Custom hook for patient details
 * Handles fetching and managing patient details with related data
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { getPatientById } from '../services/patientApi';
import type { Patient, Appointment } from '../types/patient';

export interface UsePatientDetailsOptions {
  patientId: string | undefined;
}

export function usePatientDetails({ patientId }: UsePatientDetailsOptions) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchText, setSearchText] = useState<string>('');

  // Fetch patient function
  const fetchPatient = useCallback(async () => {
    if (!patientId) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getPatientById(patientId);
      setPatient(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch patient details'));
      console.error('Error fetching patient:', err);
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  // Fetch patient when patientId changes
  useEffect(() => {
    if (patientId) {
      fetchPatient();
    }
  }, [patientId, fetchPatient]);

  // Get all appointments from plans
  const allAppointments = useMemo(() => {
    if (!patient?.plans) return [];
    
    const appointments: Appointment[] = [];
    for (const plan of patient.plans) {
      if (plan.appointments) {
        appointments.push(...plan.appointments);
      }
    }
    
    // Sort by date (newest first)
    return appointments.sort(
      (a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime()
    );
  }, [patient]);

  // Get all payments
  const allPayments = useMemo(() => {
    if (!patient?.payments) return [];
    
    // Sort by date (newest first)
    return [...patient.payments].sort(
      (a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime()
    );
  }, [patient]);

  // Get all files
  const allFiles = useMemo(() => {
    if (!patient?.files) return [];
    
    // Sort by date (newest first)
    return [...patient.files].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [patient]);

  // Filter appointments by search text
  const filteredAppointments = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    if (!q) return allAppointments;
    
    return allAppointments.filter((appointment) =>
      appointment.sessionType.toLowerCase().includes(q) ||
      appointment.location.toLowerCase().includes(q) ||
      appointment.status.toLowerCase().includes(q) ||
      appointment.noteEn?.toLowerCase().includes(q) ||
      appointment.noteAr?.toLowerCase().includes(q)
    );
  }, [allAppointments, searchText]);

  // Filter payments by search text
  const filteredPayments = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    if (!q) return allPayments;
    
    return allPayments.filter((payment) =>
      payment.id.toLowerCase().includes(q) ||
      payment.method.toLowerCase().includes(q) ||
      String(payment.amountJd).toLowerCase().includes(q)
    );
  }, [allPayments, searchText]);

  // Filter files by search text
  const filteredFiles = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    if (!q) return allFiles;
    
    return allFiles.filter((file) =>
      file.id.toLowerCase().includes(q) ||
      file.labelEn?.toLowerCase().includes(q) ||
      file.labelAr?.toLowerCase().includes(q) ||
      file.mimeType.toLowerCase().includes(q)
    );
  }, [allFiles, searchText]);

  // Handle search
  const handleSearch = useCallback((value: string) => {
    setSearchText(value);
  }, []);

  // Retry on error
  const handleRetry = useCallback(() => {
    fetchPatient();
  }, [fetchPatient]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    patient,
    loading,
    error,
    searchText,

    // Handlers
    handleSearch,
    refresh: fetchPatient,
    handleRetry,
    clearError,

    // Filtered data
    filteredAppointments,
    filteredPayments,
    filteredFiles,
  };
}
