/**
 * Auth API Module
 * Authentication and session management
 */

import { createModuleApi } from './client';
import type { BigIntStr } from './types';
import type { RoleT } from '../types/patient';

const authApi = createModuleApi('AuthModule', {
  retryable: false, // Don't retry auth requests
  maxRetries: 0,
});

// Feature flag: bypass all authentication when VITE_AUTH_DISABLED=true
const AUTH_DISABLED = import.meta.env.VITE_AUTH_DISABLED === 'true';

// Mock user injected when auth is disabled
const MOCK_USER: AuthUser = {
  id: 'dev-user',
  email: 'dev@local',
  fullName: 'Dev Admin',
  role: 'ADMIN',
};

// ============================================================================
// TYPES
// ============================================================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export interface AuthUser {
  id: BigIntStr;
  email: string;
  fullName: string;
  role: RoleT;
}

export interface RefreshResponse {
  token: string;
}

// ============================================================================
// AUTH ENDPOINTS
// ============================================================================

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await authApi.post<LoginResponse>('/auth/login', credentials, {
    context: { action: 'login' },
    skipErrorHandling: true, // Let caller handle auth errors
  });
  return response.data;
}

export async function logout(): Promise<void> {
  try {
    await authApi.post('/auth/logout', null, {
      context: { action: 'logout' },
    });
  } catch {
    // Ignore logout errors - clear local state anyway
  } finally {
    localStorage.removeItem('auth-token');
  }
}

export async function getCurrentUser(): Promise<AuthUser> {
  // Return mock user when auth is disabled
  if (AUTH_DISABLED) {
    return MOCK_USER;
  }
  const response = await authApi.get<AuthUser>('/auth/me', {
    context: { action: 'get_current_user' },
  });
  return response.data;
}

export async function refreshToken(): Promise<RefreshResponse> {
  const response = await authApi.post<RefreshResponse>('/auth/refresh', null, {
    context: { action: 'refresh_token' },
  });
  return response.data;
}

// ============================================================================
// TOKEN MANAGEMENT
// ============================================================================

const TOKEN_KEY = 'auth-token';

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearStoredToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  // Always authenticated when auth is disabled
  if (AUTH_DISABLED) {
    return true;
  }
  return !!getStoredToken();
}

// Export auth disabled flag for other modules
export const isAuthDisabled = () => AUTH_DISABLED;
