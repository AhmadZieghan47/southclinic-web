/**
 * API Layer - Barrel Export
 * Centralized export of all API modules and utilities
 */

// ============================================================================
// CORE
// ============================================================================

export {
  EnhancedApiClient,
  enhancedApi,
  createEnhancedApi,
  createModuleApi,
} from './client';

export type {
  ApiRequestConfig,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  SearchParams,
  ExportOptions,
  BigIntStr,
  ISODate,
  ISODateTime,
  Money,
} from './types';

// ============================================================================
// HELPERS
// ============================================================================

export {
  parseError,
  isNetworkError,
  isTimeoutError,
  isNotFoundError,
  isValidationError,
  isConflictError,
  isAuthError,
  isBusinessLogicError,
  ensureArray,
  validateResponse,
  limitArraySize,
  logErrorWithContext,
} from './helpers';

// ============================================================================
// ERROR TYPES
// ============================================================================

export type {
  ApiError,
  ApiErrorCode,
  ApiErrorResponse,
  ValidationErrorDetail,
} from '../types/errors';

export { isApiErrorResponse, ERROR_MESSAGES } from '../types/errors';

// ============================================================================
// PATIENTS
// ============================================================================

export {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
  searchPatients,
  getPatientStats,
  isPatientNotFoundError,
  isPatientConflictError,
} from './patients';

export type { GetPatientsParams, PatientStats } from './patients';

// ============================================================================
// APPOINTMENTS
// ============================================================================

export {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  checkInAppointment,
  completeAppointment,
  cancelAppointment,
  rescheduleAppointment,
  getSchedulerEvents,
  getTodayAppointments,
} from './appointments';

export type {
  GetAppointmentsParams,
  CreateAppointmentData,
  UpdateAppointmentData,
  RescheduleData,
  CancelData,
  AppointmentWithPatient,
  SchedulerEvent,
} from './appointments';

// ============================================================================
// PAYMENTS
// ============================================================================

export {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
  getPaymentStats,
  getPatientBalance,
  getPatientPayments,
  exportPayments,
} from './payments';

export type {
  GetPaymentsParams,
  CreatePaymentData,
  UpdatePaymentData,
  PaymentWithDetails,
  PaymentStats,
  PatientBalance,
} from './payments';

// ============================================================================
// EXPENSES
// ============================================================================

export {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  // getExpenseStats, // Backend doesn't have this endpoint yet
  getExpenseCategories,
  // createExpenseCategory, // Backend doesn't have CRUD for categories yet
  // updateExpenseCategory,
  // deleteExpenseCategory,
  exportExpenses,
} from './expenses';

export type {
  Expense,
  ExpenseCategory,
  GetExpensesParams,
  CreateExpenseData,
  UpdateExpenseData,
  ExpenseStats,
} from './expenses';

// ============================================================================
// TREATMENT PLANS
// ============================================================================

export {
  getPlans,
  getPlanById,
  getPatientPlans,
  createPlan,
  updatePlan,
  deletePlan,
  dischargePlan,
  reactivatePlan,
} from './plans';

export type {
  GetPlansParams,
  CreatePlanData,
  UpdatePlanData,
  PlanWithAppointments,
} from './plans';

// ============================================================================
// INSURERS
// ============================================================================

export {
  getInsurers,
  getActiveInsurers,
  getInsurerById,
  createInsurer,
  updateInsurer,
  deleteInsurer,
} from './insurers';

export type { Insurer, CreateInsurerData, UpdateInsurerData } from './insurers';

// ============================================================================
// DIAGNOSES
// ============================================================================

export {
  getDiagnoses,
  searchDiagnoses,
  getDiagnosisById,
  createDiagnosis,
  updateDiagnosis,
  deleteDiagnosis,
} from './diagnoses';

export type { Diagnosis, CreateDiagnosisData, UpdateDiagnosisData } from './diagnoses';

// ============================================================================
// SESSION TYPES
// ============================================================================

export {
  getSessionTypes,
  getActiveSessionTypes,
  getSessionTypeById,
  createSessionType,
  updateSessionType,
  deleteSessionType,
} from './session-types';

export type {
  SessionType,
  CreateSessionTypeData,
  UpdateSessionTypeData,
} from './session-types';

// ============================================================================
// USERS
// ============================================================================

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getTherapists,
  changePassword,
  resetUserPassword,
} from './users';

export type {
  AppUser,
  GetUsersParams,
  CreateUserData,
  UpdateUserData,
  ChangePasswordData,
} from './users';

// ============================================================================
// ENUM LABELS
// ============================================================================

export {
  getEnumLabels,
  getEnumLabelsByGroup,
  createEnumLabel,
  updateEnumLabel,
  deleteEnumLabel,
  groupEnumLabels,
  getDisplayLabel,
} from './enum-labels';

export type {
  EnumGroup,
  EnumLabel,
  CreateEnumLabelData,
  UpdateEnumLabelData,
  EnumLabelsMap,
} from './enum-labels';

// ============================================================================
// AUTH
// ============================================================================

export {
  login,
  logout,
  getCurrentUser,
  refreshToken,
  getStoredToken,
  setStoredToken,
  clearStoredToken,
  isAuthenticated,
  isAuthDisabled,
} from './auth';

export type {
  LoginCredentials,
  LoginResponse,
  AuthUser,
  RefreshResponse,
} from './auth';

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export { enhancedApi as default } from './client';
