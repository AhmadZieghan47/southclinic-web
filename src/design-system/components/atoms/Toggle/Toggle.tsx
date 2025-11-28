import { forwardRef } from 'react';
import type { ToggleProps } from './Toggle.types';
import styles from './Toggle.module.css';

/**
 * Toggle Component
 * 
 * On/off switch toggle input.
 */
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      label,
      size = 'md',
      labelPosition = 'right',
      className,
      id,
      ...props
    },
    ref
  ) => {
    const wrapperClasses = [
      styles.wrapper,
      styles[size],
      labelPosition === 'left' && styles.labelLeft,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={wrapperClasses}>
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          className={styles.input}
          id={id}
          {...props}
        />
        <span className={styles.toggle}>
          <span className={styles.knob} />
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);

Toggle.displayName = 'Toggle';
