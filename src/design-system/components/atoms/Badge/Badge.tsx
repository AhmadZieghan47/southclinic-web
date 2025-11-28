import { forwardRef } from 'react';
import type { BadgeProps } from './Badge.types';
import styles from './Badge.module.css';

/**
 * Badge Component
 * 
 * Status indicator or label badge.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      pill = false,
      dot = false,
      className,
      ...props
    },
    ref
  ) => {
    const classes = [
      styles.badge,
      styles[variant],
      styles[size],
      pill && styles.pill,
      dot && styles.dot,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classes} {...props}>
        {!dot && children}
        {dot && <span className={styles.srOnly}>{props['aria-label'] || 'Status indicator'}</span>}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
