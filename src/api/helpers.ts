/**
 * API Helper Utilities
 * Error parsing, validation, and memory safety utilities
 */

import type { AxiosError } from 'axios';
import type { ApiErrorCode, ApiErrorResponse } from '../types/errors';
import { ERROR_MESSAGES, isApiErrorResponse } from '../types/errors';

// ============================================================================
// ERROR DETECTION
// ============================================================================

export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return error.message === 'Network Error' || !navigator.onLine;
  }
  return false;
}

export function isTimeoutError(error: unknown): boolean {
  if (error instanceof Error) {
    return error.message.includes('timeout');
  }
  const axiosError = error as AxiosError;
  return axiosError?.code === 'ECONNABORTED';
}

// ============================================================================
// ERROR PARSING
// ============================================================================

export function parseError(error: unknown): ApiErrorResponse {
  // Already parsed
  if (isApiErrorResponse(error)) {
    return error;
  }

  // Axios error with response
  const axiosError = error as AxiosError<ApiErrorResponse>;
  if (axiosError?.response?.data?.error) {
    return axiosError.response.data;
  }

  // Network or timeout error
  if (isNetworkError(error)) {
    return createErrorResponse('NETWORK_ERROR', 0);
  }
  if (isTimeoutError(error)) {
    return createErrorResponse('TIMEOUT_ERROR', 0);
  }

  // Axios error with status but no structured error
  if (axiosError?.response?.status) {
    const status = axiosError.response.status;
    const code = statusToErrorCode(status);
    return createErrorResponse(code, status);
  }

  // Unknown error
  return createErrorResponse('UNKNOWN_ERROR', 0);
}

function createErrorResponse(code: ApiErrorCode, statusCode: number): ApiErrorResponse {
  return {
    error: {
      message: ERROR_MESSAGES[code],
      code,
      statusCode,
      timestamp: new Date().toISOString(),
    },
  };
}

function statusToErrorCode(status: number): ApiErrorCode {
  switch (status) {
    case 400:
      return 'ZOD_VALIDATION_ERROR';
    case 401:
      return 'AUTH_ERROR';
    case 403:
      return 'FORBIDDEN_ERROR';
    case 404:
      return 'NOT_FOUND_ERROR';
    case 409:
      return 'CONFLICT_ERROR';
    case 422:
      return 'BUSINESS_LOGIC_ERROR';
    default:
      return status >= 500 ? 'INTERNAL_ERROR' : 'UNKNOWN_ERROR';
  }
}

// ============================================================================
// ERROR TYPE CHECKS
// ============================================================================

export function isNotFoundError(error: unknown): boolean {
  if (isApiErrorResponse(error)) {
    return error.error.code === 'NOT_FOUND_ERROR';
  }
  return false;
}

export function isValidationError(error: unknown): boolean {
  if (isApiErrorResponse(error)) {
    return error.error.code === 'ZOD_VALIDATION_ERROR';
  }
  return false;
}

export function isConflictError(error: unknown): boolean {
  if (isApiErrorResponse(error)) {
    return error.error.code === 'CONFLICT_ERROR';
  }
  return false;
}

export function isAuthError(error: unknown): boolean {
  if (isApiErrorResponse(error)) {
    return error.error.code === 'AUTH_ERROR' || error.error.code === 'FORBIDDEN_ERROR';
  }
  return false;
}

export function isBusinessLogicError(error: unknown): boolean {
  if (isApiErrorResponse(error)) {
    return error.error.code === 'BUSINESS_LOGIC_ERROR';
  }
  return false;
}

// ============================================================================
// DATA VALIDATION HELPERS
// ============================================================================

/**
 * Ensures API response is an array (prevents memory issues)
 */
export function ensureArray<T>(data: unknown): T[] {
  if (Array.isArray(data)) {
    return data as T[];
  }
  console.error('API returned non-array data:', typeof data, data);
  return [];
}

/**
 * Validates API response type
 */
export function validateResponse<T>(
  data: unknown,
  expectedType: 'array' | 'object'
): T | null {
  if (expectedType === 'array' && !Array.isArray(data)) {
    console.error('Expected array but got:', typeof data);
    return null;
  }

  if (expectedType === 'object' && (typeof data !== 'object' || data === null || Array.isArray(data))) {
    console.error('Expected object but got:', typeof data);
    return null;
  }

  return data as T;
}

/**
 * Limits array size to prevent memory issues
 */
export function limitArraySize<T>(array: T[], maxSize: number): T[] {
  if (!Array.isArray(array)) {
    console.error('limitArraySize: Expected array but got:', typeof array);
    return [];
  }

  if (array.length > maxSize) {
    console.warn(`Array truncated from ${array.length} to ${maxSize} items`);
    return array.slice(0, maxSize);
  }

  return array;
}

// ============================================================================
// LOGGING
// ============================================================================

export function logErrorWithContext(
  error: ApiErrorResponse,
  context: { component?: string; action?: string; additionalData?: Record<string, unknown> }
): void {
  if (import.meta.env.DEV) {
    console.error(`❌ API Error [${context.component}/${context.action}]`, {
      error: error.error,
      context,
    });
  }
}
