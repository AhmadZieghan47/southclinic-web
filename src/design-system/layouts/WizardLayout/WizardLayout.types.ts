import type { ReactNode } from 'react';

export interface WizardLayoutStep {
  id: string;
  title: string;
  description?: string;
}

export interface WizardLayoutProps {
  /** Page title */
  title: string;
  /** Steps configuration */
  steps: WizardLayoutStep[];
  /** Current step index (0-indexed) */
  currentStep: number;
  /** Main content */
  children: ReactNode;
  /** Error message to display */
  error?: string;
  /** Back link/button */
  backLink?: ReactNode;
  /** Additional class */
  className?: string;
}
