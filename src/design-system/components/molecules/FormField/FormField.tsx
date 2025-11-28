import type { FormFieldProps } from './FormField.types';
import styles from './FormField.module.css';

/**
 * FormField Component
 * 
 * Form field wrapper with label, helper text, and error message.
 */
export const FormField = ({
  label,
  required = false,
  error,
  helperText,
  children,
  htmlFor,
  className,
}: FormFieldProps) => {
  const classes = [styles.formField, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {label && (
        <label className={styles.label} htmlFor={htmlFor}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {children}
      {helperText && !error && (
        <span className={styles.helperText}>{helperText}</span>
      )}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
