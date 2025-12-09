import { forwardRef } from 'react';
import { Spinner } from '../../atoms/Spinner';
import type { IconButtonProps } from './IconButton.types';
import styles from './IconButton.module.css';

/**
 * IconButton Component
 *
 * Button containing only an icon.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = 'default',
      size = 'md',
      rounded = false,
      loading = false,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const classes = [
      styles.iconButton,
      styles[variant],
      styles[size],
      rounded && styles.rounded,
      loading && styles.loading,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={classes} disabled={disabled || loading} {...props}>
        {icon}
        {loading ? (
          <span className={styles.spinner}>
            <Spinner size="sm" variant="current" />
          </span>
        ) : null}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
