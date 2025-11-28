import { forwardRef } from 'react';
import type { DividerProps } from './Divider.types';
import styles from './Divider.module.css';

/**
 * Divider Component
 * 
 * Horizontal or vertical separator with optional label.
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'solid',
      label,
      labelPosition = 'center',
      spacing = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const spacingClass = `spacing${spacing.charAt(0).toUpperCase()}${spacing.slice(1)}` as keyof typeof styles;
    const labelPosClass = `label${labelPosition.charAt(0).toUpperCase()}${labelPosition.slice(1)}` as keyof typeof styles;

    const classes = [
      styles.divider,
      styles[orientation],
      styles[variant],
      styles[spacingClass],
      label && styles[labelPosClass],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        role="separator"
        aria-orientation={orientation}
        {...props}
      >
        {label && <span className={styles.label}>{label}</span>}
      </div>
    );
  }
);

Divider.displayName = 'Divider';
