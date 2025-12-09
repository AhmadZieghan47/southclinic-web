import { forwardRef } from 'react';
import type { DescriptionListProps } from './DescriptionList.types';
import styles from './DescriptionList.module.css';

/**
 * DescriptionList Component
 *
 * Key-value pairs display with multiple layout options.
 */
export const DescriptionList = forwardRef<HTMLDListElement, DescriptionListProps>(
  (
    {
      items,
      layout = 'horizontal',
      size = 'md',
      columns = 2,
      dividers = false,
      striped = false,
      className,
      ...props
    },
    ref,
  ) => {
    const colsClass = `cols${columns}` as keyof typeof styles;

    const classes = [
      styles.descriptionList,
      styles[layout],
      styles[size],
      layout === 'grid' && styles[colsClass],
      dividers && styles.dividers,
      striped && styles.striped,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    if (layout === 'horizontal') {
      return (
        <dl ref={ref} className={classes} {...props}>
          {items.map((item, index) => (
            <div key={index} className={styles.horizontalItem}>
              <dt className={styles.horizontalTerm}>
                {item.icon ? <span className={styles.icon}>{item.icon}</span> : null}
                {item.term}
              </dt>
              <dd className={styles.horizontalDescription}>{item.description}</dd>
            </div>
          ))}
        </dl>
      );
    }

    if (layout === 'vertical') {
      return (
        <dl ref={ref} className={classes} {...props}>
          {items.map((item, index) => (
            <div key={index} className={styles.verticalItem}>
              <dt className={styles.verticalTerm}>
                {item.icon ? <span className={styles.icon}>{item.icon}</span> : null}
                {item.term}
              </dt>
              <dd className={styles.verticalDescription}>{item.description}</dd>
            </div>
          ))}
        </dl>
      );
    }

    // Grid layout
    return (
      <dl ref={ref} className={classes} {...props}>
        {items.map((item, index) => (
          <div
            key={index}
            className={`${styles.gridItem} ${item.fullWidth ? styles.gridItemFull : ''}`}
          >
            <dt className={styles.gridTerm}>
              {item.icon ? <span className={styles.icon}>{item.icon}</span> : null}
              {item.term}
            </dt>
            <dd className={styles.gridDescription}>{item.description}</dd>
          </div>
        ))}
      </dl>
    );
  },
);

DescriptionList.displayName = 'DescriptionList';
