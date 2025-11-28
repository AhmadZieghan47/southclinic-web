import { forwardRef } from 'react';
import { Inbox, AlertCircle, Search, FolderOpen } from 'lucide-react';
import type { EmptyStateProps } from './EmptyState.types';
import styles from './EmptyState.module.css';

const variantIcons = {
  default: Inbox,
  error: AlertCircle,
  search: Search,
  empty: FolderOpen,
};

/**
 * EmptyState Component
 * 
 * Display for empty, error, or no results states.
 */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      variant = 'default',
      size = 'md',
      icon,
      title,
      description,
      actions,
      className,
      ...props
    },
    ref
  ) => {
    const Icon = variantIcons[variant];
    const iconSize = size === 'sm' ? 24 : size === 'lg' ? 40 : 32;
    const displayIcon = icon ?? <Icon size={iconSize} />;

    const classes = [styles.emptyState, styles[variant], styles[size], className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        <div className={styles.iconWrapper}>{displayIcon}</div>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
