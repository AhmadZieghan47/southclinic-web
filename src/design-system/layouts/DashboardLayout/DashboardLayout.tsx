import type { DashboardLayoutProps } from './DashboardLayout.types';
import styles from './DashboardLayout.module.css';

/**
 * DashboardLayout Component
 *
 * Layout for dashboard pages with header, stats, and content sections.
 */
export const DashboardLayout = ({
  title,
  subtitle,
  actions,
  stats,
  children,
  breadcrumbs,
  className,
}: DashboardLayoutProps) => {
  const classes = [styles.dashboard, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {breadcrumbs ? <div className={styles.breadcrumbs}>{breadcrumbs}</div> : null}

      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </div>
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>

      {stats ? <div className={styles.stats}>{stats}</div> : null}

      <div className={styles.content}>{children}</div>
    </div>
  );
};
