/**
 * Custom hook for patients table
 * Handles data fetching, pagination, search, and delete functionality
 */

import { useState, useEffect, useCallback } from "react";
import { getPatients, deletePatient } from "../services/patientApi";
import type { Patient } from "../types/patient";

export interface UsePatientsTableOptions {
  page?: number;
  pageSize?: number;
  search?: string;
}

export function usePatientsTable(options: UsePatientsTableOptions = {}) {
  const { page = 1, pageSize = 10, search = "" } = options;

  // State management
  const [patients, setPatients] = useState<Patient[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(page);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch patients function
  const fetchPatients = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getPatients({
        page: currentPage,
        pageSize: currentPageSize,
        search,
      });

      setPatients(response.data);
      setTotalCount(response.total);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch patients")
      );
      console.error("Error fetching patients:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, currentPageSize, search]);

  // Fetch patients when dependencies change
  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  // Reset to page 1 when search changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [search]);

  // Handle page change
  const handlePageChange = useCallback((page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setCurrentPageSize(pageSize);
    }
  }, []);

  // Handle delete patient
  const handleDeletePatient = useCallback(
    async (patientId: string) => {
      try {
        await deletePatient(patientId);
        // Refresh the patients list after deletion
        await fetchPatients();
        return true;
      } catch (err) {
        console.error("Error deleting patient:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to delete patient")
        );
        return false;
      }
    },
    [fetchPatients]
  );

  // Retry on error
  const handleRetry = useCallback(() => {
    fetchPatients();
  }, [fetchPatients]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // Data
    patients,
    totalCount,
    currentPage,
    currentPageSize,

    // Loading and error states
    loading,
    error,

    // Event handlers
    handlePageChange,
    handleDeletePatient,
    handleRetry,
    clearError,
    refresh: fetchPatients,
  };
}
