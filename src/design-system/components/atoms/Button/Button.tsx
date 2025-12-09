import { forwardRef } from 'react';
import type { ButtonProps } from './Button.types';
import styles from './Button.module.css';

/**
 * Button Component
 *
 * Primary UI component for user interactions.
 * Supports multiple variants, sizes, and states.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      ...props
    },
    ref,
  ) => {
    const classes = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      loading && styles.loading,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={classes} disabled={disabled || loading} {...props}>
        {loading ? <span className={styles.spinner} /> : null}
        {leftIcon ? <span className={styles.icon}>{leftIcon}</span> : null}
        {children}
        {rightIcon ? <span className={styles.icon}>{rightIcon}</span> : null}
      </button>
    );
  },
);

Button.displayName = 'Button';
