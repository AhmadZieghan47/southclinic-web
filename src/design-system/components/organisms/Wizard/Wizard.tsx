import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '../../atoms/Button';
import type {
  WizardProps,
  WizardHeaderProps,
  WizardContentProps,
  WizardFooterProps,
} from './Wizard.types';
import styles from './Wizard.module.css';

/**
 * WizardHeader Component
 */
export const WizardHeader = ({
  steps,
  currentStep,
  onStepClick,
  allowClick = false,
}: WizardHeaderProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.steps}>
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

          const buttonClasses = [
            styles.stepButton,
            allowClick && isCompleted && styles.stepClickable,
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <div key={step.id} className={stepClasses}>
              <button
                className={buttonClasses}
                onClick={() => allowClick && isCompleted && onStepClick?.(index)}
                disabled={!allowClick || !isCompleted}
                type="button"
              >
                <span className={styles.stepIndicator}>
                  {isCompleted ? <Check size={18} /> : index + 1}
                </span>
                <div className={styles.stepInfo}>
                  <span className={styles.stepTitle}>{step.title}</span>
                  {step.description ? (
                    <span className={styles.stepDescription}>{step.description}</span>
                  ) : null}
                  {step.optional ? <span className={styles.stepOptional}>Optional</span> : null}
                </div>
              </button>
              <div className={styles.stepConnector} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * WizardContent Component
 */
export const WizardContent = ({ children }: WizardContentProps) => {
  return <div className={styles.content}>{children}</div>;
};

/**
 * WizardFooter Component
 */
export const WizardFooter = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onComplete,
  onSkip,
  isOptional = false,
  isLoading = false,
  labels = {},
}: WizardFooterProps) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  const { next = 'Next', previous = 'Previous', complete = 'Complete', skip = 'Skip' } = labels;

  return (
    <div className={styles.footer}>
      <div className={styles.footerLeft}>
        <Button variant="outline" onClick={onPrevious} disabled={isFirstStep || isLoading}>
          {previous}
        </Button>
      </div>
      <div className={styles.footerRight}>
        {isOptional && onSkip ? (
          <Button variant="ghost" onClick={onSkip} disabled={isLoading}>
            {skip}
          </Button>
        ) : null}
        {isLastStep ? (
          <Button variant="primary" onClick={onComplete} loading={isLoading}>
            {complete}
          </Button>
        ) : (
          <Button variant="primary" onClick={onNext} loading={isLoading}>
            {next}
          </Button>
        )}
      </div>
    </div>
  );
};

/**
 * Wizard Component
 *
 * Multi-step form wizard with progress indicator.
 */
export const Wizard = ({
  steps,
  currentStep,
  onStepChange,
  onComplete,
  showProgress = true,
  allowStepClick = false,
  labels,
  className,
}: WizardProps) => {
  const [isValidating, setIsValidating] = useState(false);

  const currentStepData = steps[currentStep];

  const handleNext = async () => {
    if (currentStepData?.validate) {
      setIsValidating(true);
      const isValid = await currentStepData.validate();
      setIsValidating(false);
      if (!isValid) return;
    }

    if (currentStep < steps.length - 1) {
      onStepChange(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    if (currentStepData?.validate) {
      setIsValidating(true);
      const isValid = await currentStepData.validate();
      setIsValidating(false);
      if (!isValid) return;
    }

    onComplete?.();
  };

  const handleSkip = () => {
    if (currentStep < steps.length - 1) {
      onStepChange(currentStep + 1);
    }
  };

  const classes = [styles.wizard, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {showProgress ? (
        <WizardHeader
          steps={steps}
          currentStep={currentStep}
          onStepClick={onStepChange}
          allowClick={allowStepClick}
        />
      ) : null}
      <WizardContent>{currentStepData?.content}</WizardContent>
      <WizardFooter
        currentStep={currentStep}
        totalSteps={steps.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onComplete={handleComplete}
        onSkip={currentStepData?.optional ? handleSkip : undefined}
        isOptional={currentStepData?.optional}
        isLoading={isValidating}
        labels={labels}
      />
    </div>
  );
};
