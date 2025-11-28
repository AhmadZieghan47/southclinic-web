import { forwardRef } from 'react';
import type { InputProps } from './Input.types';
import styles from './Input.module.css';

/**
 * Input Component
 * 
 * Base input field component with support for icons,
 * error states, and multiple sizes.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      error = false,
      errorMessage,
      leftElement,
      rightElement,
      fullWidth = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const wrapperClasses = [
      styles.wrapper,
      fullWidth && styles.fullWidth,
    ]
      .filter(Boolean)
      .join(' ');

    const inputClasses = [
      styles.input,
      styles[size],
      error && styles.error,
      leftElement && styles.hasLeftElement,
      rightElement && styles.hasRightElement,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        {leftElement && (
          <span className={styles.leftElement}>{leftElement}</span>
        )}
        <input ref={ref} className={inputClasses} {...props} />
        {rightElement && (
          <span className={styles.rightElement}>{rightElement}</span>
        )}
        {errorMessage && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
