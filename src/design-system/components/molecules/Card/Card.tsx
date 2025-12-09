import { forwardRef } from 'react';
import type { CardProps, CardHeaderProps, CardContentProps, CardFooterProps } from './Card.types';
import styles from './Card.module.css';

/**
 * Card Component
 *
 * Container component for grouping related content.
 * Supports title, description, header actions, and footer.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      title,
      description,
      noPadding = false,
      headerActions,
      footer,
      className = '',
      ...props
    },
    ref,
  ) => {
    const hasHeader = title || description || headerActions;

    const cardClasses = [styles.card, !hasHeader && !noPadding && styles.padded, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={cardClasses} {...props}>
        {hasHeader ? (
          <div className={styles.header}>
            <div className={styles.headerContent}>
              {title ? <h3 className={styles.title}>{title}</h3> : null}
              {description ? <p className={styles.description}>{description}</p> : null}
            </div>
            {headerActions ? <div className={styles.headerActions}>{headerActions}</div> : null}
          </div>
        ) : null}
        <div className={noPadding ? '' : styles.content}>{children}</div>
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    );
  },
);

Card.displayName = 'Card';

/**
 * Card Header - Standalone header component
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={`${styles.header} ${className}`} {...props}>
      {children}
    </div>
  ),
);

CardHeader.displayName = 'CardHeader';

/**
 * Card Content - Standalone content component
 */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={`${styles.content} ${className}`} {...props}>
      {children}
    </div>
  ),
);

CardContent.displayName = 'CardContent';

/**
 * Card Footer - Standalone footer component
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={`${styles.footer} ${className}`} {...props}>
      {children}
    </div>
  ),
);

CardFooter.displayName = 'CardFooter';
