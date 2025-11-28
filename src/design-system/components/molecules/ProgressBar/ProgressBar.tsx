import { forwardRef } from 'react';
import { Check } from 'lucide-react';
import type { ProgressBarProps, StepProgressProps } from './ProgressBar.types';
import styles from './ProgressBar.module.css';

/**
 * ProgressBar Component
 * 
 * Linear progress indicator.
 */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value,
      max = 100,
      size = 'md',
      variant = 'primary',
      showLabel = false,
      label,
      striped = false,
      animated = false,
      className,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const wrapperClasses = [styles.progressWrapper, className]
      .filter(Boolean)
      .join(' ');

    const progressClasses = [
      styles.progress,
      styles[size],
      styles[variant],
      striped && styles.striped,
      animated && styles.animated,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={wrapperClasses} {...props}>
        {(showLabel || label) && (
          <div className={styles.labelRow}>
            <span>{label}</span>
            {showLabel && <span>{Math.round(percentage)}%</span>}
          </div>
        )}
        <div
          className={progressClasses}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          <div className={styles.bar} style={{ width: `${percentage}%` }} />
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

/**
 * StepProgress Component
 * 
 * Multi-step progress indicator for wizards.
 */
export const StepProgress = forwardRef<HTMLDivElement, StepProgressProps>(
  (
    {
      currentStep,
      totalSteps,
      labels,
      size = 'md',
      variant = 'primary',
      className,
      ...props
    },
    ref
  ) => {
    const sizeClass = `step${size.charAt(0).toUpperCase()}${size.slice(1)}` as keyof typeof styles;

    const classes = [styles.stepProgress, styles[sizeClass], className]
      .filter(Boolean)
      .join(' ');

    const iconSize = size === 'sm' ? 12 : size === 'lg' ? 20 : 16;

    return (
      <div ref={ref} className={classes} {...props}>
        {Array.from({ length: totalSteps }, (_, index) => {
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
            <div key={index} className={stepClasses}>
              <div className={styles.stepIndicator}>
                {isCompleted ? <Check size={iconSize} /> : index + 1}
              </div>
              {labels?.[index] && (
                <span className={styles.stepLabel}>{labels[index]}</span>
              )}
              <div className={styles.stepConnector} />
            </div>
          );
        })}
      </div>
    );
  }
);

StepProgress.displayName = 'StepProgress';
