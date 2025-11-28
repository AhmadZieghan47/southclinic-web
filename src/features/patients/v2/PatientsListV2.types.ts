/**
 * Patients List V2 - Type Definitions
 * Enhanced types for the patients listing page
 */

import type { Patient, GenderT } from '../../../types/patient';

// ============================================================================
// FILTER TYPES
// ============================================================================

export type SortField = 'fullName' | 'createdAt' | 'balance' | 'dob';
export type SortOrder = 'asc' | 'desc';

export interface PatientsFilters {
  search: string;
  isActive?: boolean;
  hasInsurance?: boolean;
  gender?: GenderT;
  sortBy: SortField;
  sortOrder: SortOrder;
}

export interface PatientsFilterOptions {
  statusOptions: { value: string; label: string }[];
  insuranceOptions: { value: string; label: string }[];
  genderOptions: { value: GenderT; label: string }[];
  sortOptions: { value: SortField; label: string }[];
}

// ============================================================================
// STATS TYPES
// ============================================================================

export interface PatientStats {
  total: number;
  active: number;
  inactive: number;
  withInsurance: number;
  withoutInsurance: number;
  newThisMonth: number;
}

export interface StatCardData {
  title: string;
  value: number | string;
  change?: string;
  isPositive?: boolean;
  variant?: 'default' | 'primary' | 'secondary';
  icon?: React.ReactNode;
}

// ============================================================================
// TABLE TYPES
// ============================================================================

export interface PatientsTableColumn {
  key: keyof Patient | 'actions';
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: unknown, patient: Patient) => React.ReactNode;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

// ============================================================================
// HOOK TYPES
// ============================================================================

export interface UsePatientsTableV2Options {
  initialPage?: number;
  initialPageSize?: number;
  initialFilters?: Partial<PatientsFilters>;
}

export interface UsePatientsTableV2Return {
  // Data
  patients: Patient[];
  stats: PatientStats | null;
  
  // Pagination
  pagination: PaginationState;
  
  // Filters
  filters: PatientsFilters;
  setFilters: React.Dispatch<React.SetStateAction<PatientsFilters>>;
  resetFilters: () => void;
  
  // Loading & Error states
  loading: boolean;
  statsLoading: boolean;
  error: Error | null;
  
  // Actions
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (pageSize: number) => void;
  handleDeletePatient: (patientId: string) => Promise<boolean>;
  handleRetry: () => void;
  clearError: () => void;
  refresh: () => Promise<void>;
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface PatientsStatsCardsProps {
  stats: PatientStats | null;
  loading?: boolean;
}

export interface PatientsFiltersProps {
  filters: PatientsFilters;
  onFiltersChange: (filters: Partial<PatientsFilters>) => void;
  onReset: () => void;
  loading?: boolean;
}

export interface PatientsTableProps {
  patients: Patient[];
  loading?: boolean;
  sortBy: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
  onView: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
  onBeginTreatment?: (patient: Patient) => void;
}

export interface DeletePatientModalProps {
  isOpen: boolean;
  patient: Patient | null;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}
