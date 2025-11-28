/**
 * Patients V2 Module Index
 * Enhanced patients listing implementation
 */

// Main page component
export { PatientsListV2 } from './PatientsListV2';
export { default } from './PatientsListV2';

// Hook
export { usePatientsTableV2 } from './hooks/usePatientsTableV2';

// Components
export { PatientsStatsCards, PatientsFilters, PatientsTable } from './components';

// Types - export explicitly to avoid name collisions
export type {
  SortField,
  SortOrder,
  PatientsFilters as PatientsFiltersState,
  PatientsFilterOptions,
  PatientStats,
  StatCardData,
  PatientsTableColumn,
  PaginationState,
  UsePatientsTableV2Options,
  UsePatientsTableV2Return,
  PatientsStatsCardsProps,
  PatientsFiltersProps,
  PatientsTableProps,
  DeletePatientModalProps,
} from './PatientsListV2.types';
