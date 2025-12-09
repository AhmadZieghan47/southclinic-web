import { forwardRef } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { StatCardProps } from './StatCard.types';
import styles from './StatCard.module.css';

/**
 * StatCard Component
 *
 * KPI/Statistics display card.
 */
export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      title,
      value,
      change,
      isPositive = true,
      icon,
      variant = 'default',
      description,
      className,
      ...props
    },
    ref,
  ) => {
    const iconClass =
      `icon${variant.charAt(0).toUpperCase()}${variant.slice(1)}` as keyof typeof styles;

    const classes = [styles.statCard, className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {icon ? <div className={`${styles.iconWrapper} ${styles[iconClass]}`}>{icon}</div> : null}
        <div className={styles.content}>
          <p className={styles.title}>{title}</p>
          <h3 className={styles.value}>{value}</h3>
          {change ? (
            <span className={`${styles.change} ${isPositive ? styles.positive : styles.negative}`}>
              {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {change}
            </span>
          ) : null}
          {description ? <p className={styles.description}>{description}</p> : null}
        </div>
      </div>
    );
  },
);

StatCard.displayName = 'StatCard';
