import { forwardRef } from 'react';
import type { RadioProps, RadioGroupProps } from './Radio.types';
import styles from './Radio.module.css';

/**
 * Radio Component
 *
 * Single radio input with label support.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, size = 'md', error = false, className, id, ...props }, ref) => {
    const wrapperClasses = [styles.wrapper, styles[size], error && styles.error, className]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={wrapperClasses}>
        <input ref={ref} type="radio" className={styles.input} id={id} {...props} />
        <span className={styles.radio}>
          <span className={styles.dot} />
        </span>
        {label ? <span className={styles.label}>{label}</span> : null}
      </label>
    );
  },
);

Radio.displayName = 'Radio';

/**
 * RadioGroup Component
 *
 * Group of radio inputs with shared state.
 */
export const RadioGroup = ({
  name,
  value,
  onChange,
  options,
  size = 'md',
  error = false,
  direction = 'vertical',
  className,
}: RadioGroupProps) => {
  const groupClasses = [styles.group, styles[direction], className].filter(Boolean).join(' ');

  return (
    <div className={groupClasses} role="radiogroup">
      {options.map((option) => (
        <Radio
          key={option.value}
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={() => onChange?.(option.value)}
          label={option.label}
          size={size}
          error={error}
          disabled={option.disabled}
        />
      ))}
    </div>
  );
};
