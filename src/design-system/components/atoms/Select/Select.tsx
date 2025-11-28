import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import type { SelectProps } from './Select.types';
import styles from './Select.module.css';

/**
 * Select Component
 * 
 * Dropdown select input with customizable options.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      placeholder,
      size = 'md',
      error = false,
      fullWidth = false,
      leftElement,
      className,
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

    const selectClasses = [
      styles.select,
      styles[size],
      error && styles.error,
      leftElement && styles.hasLeftElement,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        {leftElement && (
          <span className={styles.leftElement}>{leftElement}</span>
        )}
        <select ref={ref} className={selectClasses} {...props}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <span className={styles.chevron}>
          <ChevronDown size={16} />
        </span>
      </div>
    );
  }
);

Select.displayName = 'Select';
