/**
 * Users API Module
 * App user (staff) management
 */

import { createModuleApi } from './client';
import type { PaginatedResponse, SearchParams, BigIntStr, ISODateTime } from './types';
import type { RoleT } from '../types/patient';

const usersApi = createModuleApi('UsersModule', {
  retryable: true,
  maxRetries: 2,
});

// ============================================================================
// TYPES
// ============================================================================

export interface AppUser {
  id: BigIntStr;
  email: string;
  fullName: string;
  role: RoleT;
  isActive: boolean;
  lastLoginAt: ISODateTime | null;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface GetUsersParams extends SearchParams {
  role?: RoleT;
  isActive?: boolean;
}

export interface CreateUserData {
  email: string;
  password: string;
  fullName: string;
  role: RoleT;
}

export interface UpdateUserData {
  email?: string;
  fullName?: string;
  role?: RoleT;
  isActive?: boolean;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

// ============================================================================
// CRUD
// ============================================================================

export async function getUsers(
  params: GetUsersParams = {}
): Promise<PaginatedResponse<AppUser>> {
  const query: Record<string, unknown> = {};

  if (params.page !== undefined) query.page = params.page;
  if (params.pageSize !== undefined) query.pageSize = params.pageSize;
  if (params.search?.trim()) query.search = params.search.trim();
  if (params.role) query.role = params.role;
  if (params.isActive !== undefined) query.isActive = params.isActive;

  const response = await usersApi.get<PaginatedResponse<AppUser>>('/app-users', {
    params: query,
    context: { action: 'get_users', additionalData: { params } },
  });

  return response.data;
}

export async function getUserById(id: BigIntStr): Promise<AppUser> {
  const response = await usersApi.get<AppUser>(`/app-users/${id}`, {
    context: { action: 'get_user_by_id', additionalData: { userId: id } },
  });
  return response.data;
}

export async function createUser(data: CreateUserData): Promise<AppUser> {
  const response = await usersApi.post<AppUser>('/app-users', data, {
    context: { action: 'create_user' },
  });
  return response.data;
}

export async function updateUser(id: BigIntStr, data: UpdateUserData): Promise<AppUser> {
  const response = await usersApi.patch<AppUser>(`/app-users/${id}`, data, {
    context: { action: 'update_user', additionalData: { userId: id } },
  });
  return response.data;
}

export async function deleteUser(id: BigIntStr): Promise<void> {
  await usersApi.delete(`/app-users/${id}`, {
    context: { action: 'delete_user', additionalData: { userId: id } },
  });
}

// ============================================================================
// SPECIALIZED
// ============================================================================

export async function getTherapists(): Promise<AppUser[]> {
  const response = await usersApi.get<AppUser[]>('/app-users', {
    params: { role: 'THERAPIST', isActive: true },
    context: { action: 'get_therapists' },
  });
  // Handle paginated response
  const data = response.data as unknown as PaginatedResponse<AppUser>;
  return data.data ?? (response.data as unknown as AppUser[]);
}

export async function changePassword(data: ChangePasswordData): Promise<void> {
  await usersApi.post('/app-users/change-password', data, {
    context: { action: 'change_password' },
  });
}

export async function resetUserPassword(id: BigIntStr, newPassword: string): Promise<void> {
  await usersApi.post(`/app-users/${id}/reset-password`, { newPassword }, {
    context: { action: 'reset_user_password', additionalData: { userId: id } },
  });
}
