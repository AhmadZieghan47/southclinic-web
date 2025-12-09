/**
 * usePatientsTableV2 Hook
 * Enhanced hook with filtering, sorting, stats, and better error handling
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { getPatients, deletePatient } from '../../../../services/patientApi';
import { getPatientStats } from '../../../../api/patients';
import type { Patient } from '../../../../types/patient';
import type {
  PatientsFilters,
  PatientStats,
  PaginationState,
  UsePatientsTableV2Options,
  UsePatientsTableV2Return,
} from '../PatientsListV2.types';

// ============================================================================
// DEFAULT VALUES
// ============================================================================

const DEFAULT_FILTERS: PatientsFilters = {
  search: '',
  isActive: undefined,
  hasInsurance: undefined,
  gender: undefined,
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

// Pagination defaults are set in state initialization

// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================

export function usePatientsTableV2(
  options: UsePatientsTableV2Options = {},
): UsePatientsTableV2Return {
  const { initialPage = 1, initialPageSize = 10, initialFilters = {} } = options;

  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------

  const [patients, setPatients] = useState<Patient[]>([]);
  const [stats, setStats] = useState<PatientStats | null>(null);

  const [pagination, setPagination] = useState<PaginationState>({
    page: initialPage,
    pageSize: initialPageSize,
    total: 0,
  });

  const [filters, setFilters] = useState<PatientsFilters>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // ---------------------------------------------------------------------------
  // FETCH PATIENTS
  // ---------------------------------------------------------------------------

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Build query params - service supports page, pageSize, search
      const response = await getPatients({
        page: pagination.page,
        pageSize: pagination.pageSize,
        search: filters.search || undefined,
      });

      setPatients(response.data);
      setPagination((prev) => ({ ...prev, total: response.total }));
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch patients');
      setError(error);
      console.error('Error fetching patients:', err);
    } finally {
      setLoading(false);
    }
  }, [
    pagination.page,
    pagination.pageSize,
    filters.search,
    filters.isActive,
    filters.hasInsurance,
  ]);

  // ---------------------------------------------------------------------------
  // FETCH STATS
  // ---------------------------------------------------------------------------

  const fetchStats = useCallback(async () => {
    setStatsLoading(true);

    try {
      const statsData = await getPatientStats();
      // Map API response to our stats type
      setStats({
        total: statsData.total,
        active: statsData.active,
        inactive: statsData.inactive,
        withInsurance: statsData.withInsurance,
        withoutInsurance: statsData.total - statsData.withInsurance,
        newThisMonth: statsData.newThisMonth,
      });
    } catch (err) {
      console.error('Error fetching patient stats:', err);
      // Don't set error for stats - it's not critical
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // ---------------------------------------------------------------------------
  // EFFECTS
  // ---------------------------------------------------------------------------

  // Fetch patients when filters or pagination change
  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  // Fetch stats on mount
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Reset to page 1 when filters change (except page changes)
  useEffect(() => {
    if (pagination.page !== 1) {
      setPagination((prev) => ({ ...prev, page: 1 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search, filters.isActive, filters.hasInsurance, filters.gender]);

  // ---------------------------------------------------------------------------
  // SORTED PATIENTS (client-side sorting for displayed data)
  // ---------------------------------------------------------------------------

  const sortedPatients = useMemo(() => {
    const sorted = [...patients];

    sorted.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case 'fullName':
          comparison = a.fullName.localeCompare(b.fullName);
          break;
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'balance':
          comparison = parseFloat(a.balance) - parseFloat(b.balance);
          break;
        case 'dob':
          comparison = new Date(a.dob).getTime() - new Date(b.dob).getTime();
          break;
        default:
          comparison = 0;
      }

      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return sorted;
  }, [patients, filters.sortBy, filters.sortOrder]);

  // ---------------------------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------------------------

  const handlePageChange = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const handlePageSizeChange = useCallback((pageSize: number) => {
    setPagination((prev) => ({ ...prev, pageSize, page: 1 }));
  }, []);

  const handleDeletePatient = useCallback(
    async (patientId: string): Promise<boolean> => {
      try {
        await deletePatient(patientId);
        // Refresh both patients and stats after deletion
        await Promise.all([fetchPatients(), fetchStats()]);
        return true;
      } catch (err) {
        console.error('Error deleting patient:', err);
        setError(err instanceof Error ? err : new Error('Failed to delete patient'));
        return false;
      }
    },
    [fetchPatients, fetchStats],
  );

  const handleRetry = useCallback(() => {
    setError(null);
    fetchPatients();
  }, [fetchPatients]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const refresh = useCallback(async () => {
    await Promise.all([fetchPatients(), fetchStats()]);
  }, [fetchPatients, fetchStats]);

  // ---------------------------------------------------------------------------
  // RETURN
  // ---------------------------------------------------------------------------

  return {
    // Data
    patients: sortedPatients,
    stats,

    // Pagination
    pagination,

    // Filters
    filters,
    setFilters,
    resetFilters,

    // Loading & Error
    loading,
    statsLoading,
    error,

    // Actions
    handlePageChange,
    handlePageSizeChange,
    handleDeletePatient,
    handleRetry,
    clearError,
    refresh,
  };
}

export default usePatientsTableV2;
