/**
 * Shared API Types
 * Common types used across all API modules
 */

import type { AxiosRequestConfig } from 'axios';

// Re-export error types
export type { ApiError, ApiErrorCode, ApiErrorResponse, ValidationErrorDetail } from '../types/errors';

// ============================================================================
// REQUEST CONFIG
// ============================================================================

export interface ApiRequestConfig extends AxiosRequestConfig {
  /** Skip default error handling */
  skipErrorHandling?: boolean;
  /** Show toast on error */
  showErrorToast?: boolean;
  /** Request context for logging */
  context?: {
    component?: string;
    action?: string;
    userId?: string;
    additionalData?: Record<string, unknown>;
  };
  /** Enable retry on failure */
  retryable?: boolean;
  /** Max retry attempts */
  maxRetries?: number;
  /** Delay between retries (ms) */
  retryDelay?: number;
}

// ============================================================================
// RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

// ============================================================================
// PAGINATION
// ============================================================================

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page?: number;
  pageSize?: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface SearchParams extends PaginationParams {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ============================================================================
// COMMON PRIMITIVES
// ============================================================================

/** BigInt as string for JSON serialization */
export type BigIntStr = string;

/** ISO date string (YYYY-MM-DD) */
export type ISODate = string;

/** ISO datetime string */
export type ISODateTime = string;

/** Monetary value as string */
export type Money = string;

// ============================================================================
// EXPORT OPTIONS
// ============================================================================

export interface ExportOptions {
  format: 'csv' | 'excel' | 'pdf';
  filters?: Record<string, unknown>;
}
