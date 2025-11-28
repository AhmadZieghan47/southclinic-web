/**
 * Enhanced API Client
 * Axios wrapper with retry logic, error handling, and request context
 */

import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import api from '../services/api';
import type { ApiRequestConfig, ApiResponse } from './types';
import { parseError, isNetworkError, isTimeoutError, logErrorWithContext } from './helpers';

// ============================================================================
// ENHANCED API CLIENT
// ============================================================================

export class EnhancedApiClient {
  private axios: AxiosInstance;
  private defaultConfig: Partial<ApiRequestConfig>;

  constructor(baseApi?: AxiosInstance, defaultConfig: Partial<ApiRequestConfig> = {}) {
    this.axios = baseApi ?? api;
    this.defaultConfig = {
      timeout: 10000,
      retryable: true,
      maxRetries: 3,
      retryDelay: 1000,
      showErrorToast: true,
      ...defaultConfig,
    };
  }

  // ============================================================================
  // HTTP METHODS
  // ============================================================================

  async get<T = unknown>(url: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'GET', url });
  }

  async post<T = unknown>(url: string, data?: unknown, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'POST', url, data });
  }

  async put<T = unknown>(url: string, data?: unknown, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'PUT', url, data });
  }

  async patch<T = unknown>(url: string, data?: unknown, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'PATCH', url, data });
  }

  async delete<T = unknown>(url: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'DELETE', url });
  }

  // ============================================================================
  // CORE REQUEST
  // ============================================================================

  private async request<T = unknown>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
    const finalConfig = { ...this.defaultConfig, ...config };
    const {
      skipErrorHandling,
      showErrorToast: _showErrorToast,
      context,
      retryable,
      maxRetries,
      retryDelay,
      ...axiosConfig
    } = finalConfig;

    let lastError: unknown = null;
    let attempt = 0;

    while (attempt <= (maxRetries ?? 0)) {
      try {
        const response = await this.axios.request<T>(axiosConfig as AxiosRequestConfig);

        // Dev logging
        if (context && import.meta.env.DEV) {
          console.log(`✅ API [${axiosConfig.method?.toUpperCase()}] ${axiosConfig.url}`, {
            status: response.status,
          });
        }

        return {
          data: response.data,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers as Record<string, string>,
        };
      } catch (error) {
        lastError = error;
        attempt++;

        const apiError = parseError(error);

        if (context) {
          logErrorWithContext(apiError, context);
        }

        // Check if should retry
        if (!retryable || !this.shouldRetry(error, attempt, maxRetries ?? 0)) {
          if (skipErrorHandling) {
            throw error;
          }
          throw apiError;
        }

        // Wait before retry
        if (attempt <= (maxRetries ?? 0)) {
          const delay = this.calculateRetryDelay(attempt, retryDelay ?? 1000);
          await this.sleep(delay);
        }
      }
    }

    // All retries exhausted
    if (skipErrorHandling) {
      throw lastError;
    }
    throw parseError(lastError);
  }

  // ============================================================================
  // RETRY LOGIC
  // ============================================================================

  private shouldRetry(error: unknown, attempt: number, maxRetries: number): boolean {
    if (attempt > maxRetries) return false;

    const axiosError = error as { response?: { status: number } };
    const status = axiosError?.response?.status;

    // Don't retry 4xx except rate limiting
    if (status && status >= 400 && status < 500) {
      return status === 429;
    }

    // Retry 5xx, network, timeout
    return !status || status >= 500 || isNetworkError(error) || isTimeoutError(error);
  }

  private calculateRetryDelay(attempt: number, baseDelay: number): number {
    // Exponential backoff with jitter
    const exponentialDelay = baseDelay * Math.pow(2, attempt - 1);
    const jitter = Math.random() * 0.1 * exponentialDelay;
    return Math.min(exponentialDelay + jitter, 10000);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // ============================================================================
  // CONVENIENCE METHODS
  // ============================================================================

  async uploadFile<T = unknown>(
    url: string,
    file: File,
    config?: ApiRequestConfig & {
      onUploadProgress?: (progressEvent: ProgressEvent) => void;
      fieldName?: string;
    }
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append(config?.fieldName ?? 'file', file);

    return this.post<T>(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    });
  }

  async downloadFile(url: string, config?: ApiRequestConfig): Promise<Blob> {
    const response = await this.get<Blob>(url, {
      ...config,
      responseType: 'blob',
    });
    return response.data;
  }

  // ============================================================================
  // CONFIG
  // ============================================================================

  setDefaultConfig(config: Partial<ApiRequestConfig>): void {
    this.defaultConfig = { ...this.defaultConfig, ...config };
  }

  getAxiosInstance(): AxiosInstance {
    return this.axios;
  }
}

// ============================================================================
// FACTORY FUNCTIONS
// ============================================================================

export function createEnhancedApi(
  baseApi?: AxiosInstance,
  defaultConfig?: Partial<ApiRequestConfig>
): EnhancedApiClient {
  return new EnhancedApiClient(baseApi, defaultConfig);
}

export function createModuleApi(
  moduleName: string,
  defaultConfig?: Partial<ApiRequestConfig>
): EnhancedApiClient {
  return new EnhancedApiClient(api, {
    context: { component: moduleName },
    ...defaultConfig,
  });
}

// ============================================================================
// DEFAULT INSTANCE
// ============================================================================

export const enhancedApi = createEnhancedApi();

export default enhancedApi;
