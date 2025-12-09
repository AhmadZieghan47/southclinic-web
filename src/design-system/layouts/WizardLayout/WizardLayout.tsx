import { useState } from 'react';
import { Check, AlertCircle, X } from 'lucide-react';
import type { WizardLayoutProps } from './WizardLayout.types';
import styles from './WizardLayout.module.css';

/**
 * WizardLayout Component
 *
 * Page layout for multi-step wizards/forms with progress indicator.
 */
export const WizardLayout = ({
  title,
  steps,
  currentStep,
  children,
  error,
  backLink,
  className,
}: WizardLayoutProps) => {
  const [showError, setShowError] = useState(true);

  const classes = [styles.wizardLayout, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {backLink ? <div className={styles.backLink}>{backLink}</div> : null}

      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.progress}>
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;

            const stepClasses = [
              styles.step,
              isCompleted && styles.stepCompleted,
              isActive && styles.stepActive,
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <div key={step.id} className={stepClasses}>
                <span className={styles.stepIndicator}>
                  {isCompleted ? <Check size={18} /> : index + 1}
                </span>
                <div className={styles.stepInfo}>
                  <span className={styles.stepTitle}>{step.title}</span>
                  {step.description ? (
                    <span className={styles.stepDescription}>{step.description}</span>
                  ) : null}
                </div>
                <div className={styles.stepConnector} />
              </div>
            );
          })}
        </div>
      </div>

      {error && showError ? (
        <div className={styles.error}>
          <AlertCircle size={20} className={styles.errorIcon} />
          <div className={styles.errorContent}>
            <h4 className={styles.errorTitle}>Error</h4>
            <p className={styles.errorMessage}>{error}</p>
          </div>
          <button
            className={styles.errorClose}
            onClick={() => setShowError(false)}
            aria-label="Dismiss error"
          >
            <X size={16} />
          </button>
        </div>
      ) : null}

      <div className={styles.content}>{children}</div>
    </div>
  );
};
