import { forwardRef } from 'react';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import type { AlertBannerProps } from './AlertBanner.types';
import styles from './AlertBanner.module.css';

const variantIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

/**
 * AlertBanner Component
 * 
 * Notification banner for info, success, warning, or error messages.
 */
export const AlertBanner = forwardRef<HTMLDivElement, AlertBannerProps>(
  (
    {
      variant = 'info',
      title,
      children,
      dismissible = false,
      onDismiss,
      icon,
      action,
      className,
      ...props
    },
    ref
  ) => {
    const Icon = variantIcons[variant];
    const displayIcon = icon ?? <Icon size={20} />;

    const classes = [styles.alert, styles[variant], className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} role="alert" {...props}>
        <span className={styles.iconWrapper}>{displayIcon}</span>
        <div className={styles.content}>
          {title && <h4 className={styles.title}>{title}</h4>}
          <div className={styles.message}>{children}</div>
        </div>
        <div className={styles.actions}>
          {action}
          {dismissible && (
            <button
              className={styles.dismissBtn}
              onClick={onDismiss}
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    );
  }
);

AlertBanner.displayName = 'AlertBanner';
