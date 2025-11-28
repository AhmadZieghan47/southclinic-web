/**
 * Error Type Definitions
 * Standardized error handling types for API layer
 */

// Backend error codes
export type ApiErrorCode =
  | 'NETWORK_ERROR'
  | 'TIMEOUT_ERROR'
  | 'UNKNOWN_ERROR'
  | 'NOT_FOUND_ERROR'
  | 'ZOD_VALIDATION_ERROR'
  | 'CONFLICT_ERROR'
  | 'AUTH_ERROR'
  | 'FORBIDDEN_ERROR'
  | 'BUSINESS_LOGIC_ERROR'
  | 'INTERNAL_ERROR';

// Validation error detail from Zod
export interface ValidationErrorDetail {
  field: string;
  message: string;
  code?: string;
}

// Standard API error response structure (matches backend)
export interface ApiError {
  message: string;
  code: ApiErrorCode;
  statusCode: number;
  timestamp: string;
  details?: {
    validationErrors?: ValidationErrorDetail[];
    originalError?: string;
    [key: string]: unknown;
  };
}

// Full error response wrapper
export interface ApiErrorResponse {
  error: ApiError;
}

// Type guard
export function isApiErrorResponse(error: unknown): error is ApiErrorResponse {
  return (
    typeof error === 'object' &&
    error !== null &&
    'error' in error &&
    typeof (error as ApiErrorResponse).error === 'object' &&
    'code' in (error as ApiErrorResponse).error
  );
}

// User-friendly error messages
export const ERROR_MESSAGES: Record<ApiErrorCode, string> = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
  NOT_FOUND_ERROR: 'The requested resource was not found.',
  ZOD_VALIDATION_ERROR: 'Please check your input and try again.',
  CONFLICT_ERROR: 'This operation conflicts with existing data.',
  AUTH_ERROR: 'Authentication required. Please log in.',
  FORBIDDEN_ERROR: 'You do not have permission for this action.',
  BUSINESS_LOGIC_ERROR: 'Operation cannot be completed.',
  INTERNAL_ERROR: 'Server error. Please try again later.',
};
