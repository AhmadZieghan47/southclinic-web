import { forwardRef } from 'react';
import type { SpinnerProps } from './Spinner.types';
import styles from './Spinner.module.css';

/**
 * Spinner Component
 * 
 * Loading indicator with customizable size and color.
 */
export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = 'md',
      variant = 'primary',
      label = 'Loading...',
      className,
      ...props
    },
    ref
  ) => {
    const classes = [
      styles.spinner,
      styles[size],
      styles[variant],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} role="status" {...props}>
        <span className={styles.srOnly}>{label}</span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';
