import type { ReactNode } from 'react';

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  content: ReactNode;
  /** Validation function, return true if valid */
  validate?: () => boolean | Promise<boolean>;
  /** Optional flag to mark as optional step */
  optional?: boolean;
}

export interface WizardProps {
  /** Wizard steps */
  steps: WizardStep[];
  /** Current step index (0-indexed) */
  currentStep: number;
  /** Step change handler */
  onStepChange: (step: number) => void;
  /** Complete handler */
  onComplete?: () => void;
  /** Show step progress indicator */
  showProgress?: boolean;
  /** Allow clicking on progress steps to navigate */
  allowStepClick?: boolean;
  /** Custom labels */
  labels?: {
    next?: string;
    previous?: string;
    complete?: string;
    skip?: string;
  };
  /** Additional class */
  className?: string;
}

export interface WizardHeaderProps {
  /** Steps configuration */
  steps: WizardStep[];
  /** Current step index */
  currentStep: number;
  /** Step click handler */
  onStepClick?: (step: number) => void;
  /** Allow clicking on steps */
  allowClick?: boolean;
}

export interface WizardContentProps {
  /** Step content */
  children: ReactNode;
}

export interface WizardFooterProps {
  /** Current step index */
  currentStep: number;
  /** Total steps */
  totalSteps: number;
  /** Previous handler */
  onPrevious: () => void;
  /** Next handler */
  onNext: () => void;
  /** Complete handler */
  onComplete?: () => void;
  /** Skip handler (for optional steps) */
  onSkip?: () => void;
  /** Is current step optional */
  isOptional?: boolean;
  /** Is loading/validating */
  isLoading?: boolean;
  /** Custom labels */
  labels?: {
    next?: string;
    previous?: string;
    complete?: string;
    skip?: string;
  };
}
