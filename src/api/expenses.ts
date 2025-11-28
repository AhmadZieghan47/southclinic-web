/**
 * Expenses API Module
 * Expense tracking and reporting
 */

import { createModuleApi } from './client';
import type { PaginatedResponse, SearchParams, BigIntStr, ISODateTime, ISODate, Money } from './types';

const expensesApi = createModuleApi('ExpensesModule', {
  retryable: true,
  maxRetries: 2,
});

// ============================================================================
// TYPES
// ============================================================================

export interface ExpenseCategory {
  id: BigIntStr;
  nameEn: string;
  nameAr: string | null;
  isActive: boolean;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface Expense {
  id: BigIntStr;
  categoryId: BigIntStr;
  amountJd: Money;
  description: string | null;
  expenseDate: ISODate;
  createdById: BigIntStr;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
  category?: ExpenseCategory;
}

export interface GetExpensesParams extends SearchParams {
  categoryId?: BigIntStr;
  dateFrom?: ISODate;
  dateTo?: ISODate;
}

export interface CreateExpenseData {
  categoryId: BigIntStr;
  amountJd: Money;
  description?: string | null;
  expenseDate: ISODate;
}

export interface UpdateExpenseData extends Partial<CreateExpenseData> {}

export interface ExpenseStats {
  totalExpenses: Money;
  todayExpenses: Money;
  weekExpenses: Money;
  monthExpenses: Money;
  byCategory: Array<{
    categoryId: BigIntStr;
    categoryName: string;
    total: Money;
  }>;
}

// ============================================================================
// EXPENSE CRUD
// ============================================================================

export async function getExpenses(
  params: GetExpensesParams = {}
): Promise<PaginatedResponse<Expense>> {
  const query: Record<string, unknown> = {};

  if (params.page !== undefined) query.page = params.page;
  if (params.pageSize !== undefined) query.pageSize = params.pageSize;
  if (params.search?.trim()) query.search = params.search.trim();
  if (params.categoryId) query.categoryId = params.categoryId;
  if (params.dateFrom) query.dateFrom = params.dateFrom;
  if (params.dateTo) query.dateTo = params.dateTo;

  const response = await expensesApi.get<PaginatedResponse<Expense>>('/expenses', {
    params: query,
    context: { action: 'get_expenses', additionalData: { params } },
  });

  return response.data;
}

export async function getExpenseById(id: BigIntStr): Promise<Expense> {
  const response = await expensesApi.get<Expense>(`/expenses/${id}`, {
    context: { action: 'get_expense_by_id', additionalData: { expenseId: id } },
  });
  return response.data;
}

export async function createExpense(data: CreateExpenseData): Promise<Expense> {
  const response = await expensesApi.post<Expense>('/expenses', data, {
    context: { action: 'create_expense' },
  });
  return response.data;
}

export async function updateExpense(id: BigIntStr, data: UpdateExpenseData): Promise<Expense> {
  const response = await expensesApi.patch<Expense>(`/expenses/${id}`, data, {
    context: { action: 'update_expense', additionalData: { expenseId: id } },
  });
  return response.data;
}

export async function deleteExpense(id: BigIntStr): Promise<void> {
  await expensesApi.delete(`/expenses/${id}`, {
    context: { action: 'delete_expense', additionalData: { expenseId: id } },
  });
}

// ============================================================================
// STATS
// ============================================================================

// NOTE: Backend doesn't have /expenses/stats endpoint yet
// export async function getExpenseStats(): Promise<ExpenseStats> {
//   const response = await expensesApi.get<ExpenseStats>('/expenses/stats', {
//     context: { action: 'get_expense_stats' },
//   });
//   return response.data;
// }

// ============================================================================
// CATEGORIES
// ============================================================================

export async function getExpenseCategories(): Promise<ExpenseCategory[]> {
  // Backend has categories under /expenses/categories, not /expense-categories
  const response = await expensesApi.get<ExpenseCategory[]>('/expenses/categories', {
    context: { action: 'get_expense_categories' },
  });
  return response.data;
}

// NOTE: Backend only has GET /expenses/categories (list), no CRUD for categories yet
// export async function createExpenseCategory(data: {
//   nameEn: string;
//   nameAr?: string | null;
// }): Promise<ExpenseCategory> {
//   const response = await expensesApi.post<ExpenseCategory>('/expenses/categories', data, {
//     context: { action: 'create_expense_category' },
//   });
//   return response.data;
// }

// export async function updateExpenseCategory(
//   id: BigIntStr,
//   data: { nameEn?: string; nameAr?: string | null; isActive?: boolean }
// ): Promise<ExpenseCategory> {
//   const response = await expensesApi.patch<ExpenseCategory>(`/expenses/categories/${id}`, data, {
//     context: { action: 'update_expense_category', additionalData: { categoryId: id } },
//   });
//   return response.data;
// }

// export async function deleteExpenseCategory(id: BigIntStr): Promise<void> {
//   await expensesApi.delete(`/expenses/categories/${id}`, {
//     context: { action: 'delete_expense_category', additionalData: { categoryId: id } },
//   });
// }

// ============================================================================
// EXPORT
// ============================================================================

export async function exportExpenses(
  format: 'csv' | 'excel' | 'pdf',
  params?: GetExpensesParams
): Promise<Blob> {
  return await expensesApi.downloadFile('/expenses/export', {
    params: { format, ...params },
    context: { action: 'export_expenses', additionalData: { format } },
  });
}
