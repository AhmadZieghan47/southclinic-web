/**
 * API Test Page
 * Interactive page to test all API endpoints
 */

import { useState, useCallback } from 'react';
import { Card, Button, AlertBanner, Spinner } from '../../design-system';
import styles from './ApiTestPage.module.css';

// Import all API functions
import {
  // Patients
  getPatients,
  searchPatients,
  getPatientStats,
  // Appointments
  getAppointments,
  getTodayAppointments,
  // Payments
  getPayments,
  getPaymentStats,
  // Expenses
  getExpenses,
  getExpenseCategories,
  // Supporting
  getInsurers,
  getDiagnoses,
  getSessionTypes,
  getEnumLabels,
  getUsers,
  getTherapists,
  // Auth
  getCurrentUser,
  isAuthenticated,
  // Error handling
  isApiErrorResponse,
} from '../../api';

interface TestResult {
  name: string;
  status: 'pending' | 'success' | 'error';
  data?: unknown;
  error?: string;
  duration?: number;
}

export function ApiTestPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const updateResult = useCallback((name: string, update: Partial<TestResult>) => {
    setResults((prev) => prev.map((r) => (r.name === name ? { ...r, ...update } : r)));
  }, []);

  const runTest = useCallback(
    async (name: string, testFn: () => Promise<unknown>) => {
      const start = performance.now();
      try {
        const data = await testFn();
        const duration = Math.round(performance.now() - start);
        updateResult(name, { status: 'success', data, duration });
        return true;
      } catch (err) {
        const duration = Math.round(performance.now() - start);
        let errorMsg = 'Unknown error';
        if (isApiErrorResponse(err)) {
          errorMsg = `${err.error.code}: ${err.error.message}`;
        } else if (err instanceof Error) {
          errorMsg = err.message;
        }
        updateResult(name, { status: 'error', error: errorMsg, duration });
        return false;
      }
    },
    [updateResult],
  );

  const runAllTests = async () => {
    setIsRunning(true);

    // Define tests
    const tests: { name: string; fn: () => Promise<unknown> }[] = [
      // Auth
      { name: 'Check Auth Status', fn: async () => ({ isAuthenticated: isAuthenticated() }) },
      { name: 'Get Current User', fn: getCurrentUser },

      // Patients
      { name: 'Get Patients (page 1)', fn: () => getPatients({ page: 1, pageSize: 10 }) },
      { name: 'Search Patients', fn: () => searchPatients('test') },
      { name: 'Get Patient Stats', fn: getPatientStats },

      // Appointments
      { name: 'Get Appointments', fn: () => getAppointments({ page: 1, pageSize: 10 }) },
      { name: 'Get Today Appointments', fn: getTodayAppointments },

      // Payments
      { name: 'Get Payments', fn: () => getPayments({ page: 1, pageSize: 10 }) },
      { name: 'Get Payment Stats', fn: getPaymentStats },

      // Expenses
      { name: 'Get Expenses', fn: () => getExpenses({ page: 1, pageSize: 10 }) },
      { name: 'Get Expense Categories', fn: getExpenseCategories },

      // Supporting
      { name: 'Get Insurers', fn: getInsurers },
      { name: 'Get Diagnoses', fn: getDiagnoses },
      { name: 'Get Session Types', fn: getSessionTypes },
      { name: 'Get Enum Labels', fn: getEnumLabels },
      { name: 'Get Users', fn: () => getUsers({ page: 1, pageSize: 10 }) },
      { name: 'Get Therapists', fn: getTherapists },
    ];

    // Initialize results
    setResults(tests.map((t) => ({ name: t.name, status: 'pending' })));

    // Run tests sequentially
    let passed = 0;
    let failed = 0;

    for (const test of tests) {
      const success = await runTest(test.name, test.fn);
      if (success) passed++;
      else failed++;
    }

    console.log(`API Tests Complete: ${passed} passed, ${failed} failed`);
    setIsRunning(false);
  };

  const passedCount = results.filter((r) => r.status === 'success').length;
  const failedCount = results.filter((r) => r.status === 'error').length;
  const totalCount = results.length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>API Layer Test</h1>
        <p>Test all API endpoints against the backend</p>
      </div>

      <Card className={styles.controls}>
        <Button onClick={runAllTests} disabled={isRunning} variant="primary">
          {isRunning ? (
            <>
              <Spinner size="sm" /> Running Tests...
            </>
          ) : (
            'Run All Tests'
          )}
        </Button>

        {totalCount > 0 && (
          <div className={styles.summary}>
            <span className={styles.passed}>{passedCount} passed</span>
            <span className={styles.failed}>{failedCount} failed</span>
            <span className={styles.total}>{totalCount} total</span>
          </div>
        )}
      </Card>

      {results.length > 0 && (
        <div className={styles.results}>
          {results.map((result) => (
            <div key={result.name} className={styles.resultItem}>
              <div className={styles.resultHeader}>
                <span className={styles.resultName}>{result.name}</span>
                {result.duration !== undefined && (
                  <span className={styles.duration}>{result.duration}ms</span>
                )}
              </div>

              {result.status === 'pending' && <Spinner size="sm" />}

              {result.status === 'success' && (
                <AlertBanner variant="success" className={styles.resultBanner}>
                  <span>✓ Success</span>
                  {result.data !== undefined && (
                    <pre className={styles.resultData}>
                      {JSON.stringify(result.data, null, 2).slice(0, 500)}
                      {JSON.stringify(result.data).length > 500 ? '...' : ''}
                    </pre>
                  )}
                </AlertBanner>
              )}

              {result.status === 'error' && (
                <AlertBanner variant="error" className={styles.resultBanner}>
                  ✗ {result.error}
                </AlertBanner>
              )}
            </div>
          ))}
        </div>
      )}

      <Card className={styles.info}>
        <h3>API Layer Features</h3>
        <ul>
          <li>✓ Enhanced API client with retry logic</li>
          <li>✓ Automatic error parsing and handling</li>
          <li>✓ Request context logging (dev mode)</li>
          <li>✓ Type-safe responses</li>
          <li>✓ Modular architecture (patients, appointments, payments, etc.)</li>
          <li>✓ Auth token management</li>
          <li>✓ File upload/download support</li>
        </ul>
      </Card>
    </div>
  );
}

export default ApiTestPage;
