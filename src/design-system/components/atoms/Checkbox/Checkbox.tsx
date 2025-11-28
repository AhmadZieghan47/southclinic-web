import { forwardRef, useEffect, useRef } from 'react';
import { Check, Minus } from 'lucide-react';
import type { CheckboxProps } from './Checkbox.types';
import styles from './Checkbox.module.css';

/**
 * Checkbox Component
 * 
 * Checkbox input with label support.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      size = 'md',
      error = false,
      indeterminate = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const checkboxRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

    useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, checkboxRef]);

    const wrapperClasses = [
      styles.wrapper,
      styles[size],
      error && styles.error,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const iconSize = size === 'sm' ? 10 : size === 'lg' ? 14 : 12;

    return (
      <label className={wrapperClasses}>
        <input
          ref={checkboxRef}
          type="checkbox"
          className={styles.input}
          id={id}
          {...props}
        />
        <span className={styles.checkbox}>
          {indeterminate ? (
            <Minus size={iconSize} className={styles.icon} />
          ) : (
            <Check size={iconSize} className={styles.icon} />
          )}
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
