/**
 * Custom hook for appointments table
 * Handles data fetching, pagination, filtering, and actions
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getAppointments,
  cancelAppointment,
  type AppointmentWithPatient,
} from '../api/appointments';
import type { ApptStatusT, SessionTypeT, LocationT, CancelReasonT } from '../types/patient';

// ============================================================================
// TYPES
// ============================================================================

export interface UseAppointmentsTableOptions {
  page?: number;
  pageSize?: number;
  search?: string;
  planId?: string;
  therapistId?: string;
  status?: ApptStatusT;
  sessionType?: SessionTypeT;
  location?: LocationT;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: 'createdAt' | 'startsAt';
  sortOrder?: 'ASC' | 'DESC';
}

export interface UseAppointmentsTableReturn {
  // Data
  appointments: AppointmentWithPatient[];
  totalCount: number;
  currentPage: number;
  currentPageSize: number;

  // Loading and error states
  loading: boolean;
  error: Error | null;

  // Event handlers
  handlePageChange: (page: number, pageSize?: number) => void;
  handleCancelAppointment: (id: string, reason: CancelReasonT) => Promise<boolean>;
  handleRetry: () => void;
  clearError: () => void;
  refresh: () => Promise<void>;
}

// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================

export function useAppointmentsTable(
  options: UseAppointmentsTableOptions = {}
): UseAppointmentsTableReturn {
  const {
    page = 1,
    pageSize = 10,
    search = '',
    planId,
    therapistId,
    status,
    sessionType,
    location,
    dateFrom,
    dateTo,
    sortBy = 'startsAt',
    sortOrder = 'DESC',
  } = options;

  // State management
  const [appointments, setAppointments] = useState<AppointmentWithPatient[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(page);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch appointments function
  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getAppointments({
        page: currentPage,
        pageSize: currentPageSize,
        planId,
        therapistId,
        status,
        dateFrom,
        dateTo,
      });

      setAppointments(response.data);
      setTotalCount(response.total);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to fetch appointments')
      );
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  }, [
    currentPage,
    currentPageSize,
    planId,
    therapistId,
    status,
    dateFrom,
    dateTo,
  ]);

  // Fetch appointments when dependencies change
  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, planId, therapistId, status, sessionType, location, dateFrom, dateTo, sortBy, sortOrder]);

  // Handle page change
  const handlePageChange = useCallback((page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setCurrentPageSize(pageSize);
    }
  }, []);

  // Handle cancel appointment
  const handleCancelAppointment = useCallback(
    async (id: string, reason: CancelReasonT): Promise<boolean> => {
      try {
        await cancelAppointment(id, { reason });
        // Refresh the appointments list after cancellation
        await fetchAppointments();
        return true;
      } catch (err) {
        console.error('Error cancelling appointment:', err);
        setError(
          err instanceof Error ? err : new Error('Failed to cancel appointment')
        );
        return false;
      }
    },
    [fetchAppointments]
  );

  // Retry on error
  const handleRetry = useCallback(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // Data
    appointments,
    totalCount,
    currentPage,
    currentPageSize,

    // Loading and error states
    loading,
    error,

    // Event handlers
    handlePageChange,
    handleCancelAppointment,
    handleRetry,
    clearError,
    refresh: fetchAppointments,
  };
}
