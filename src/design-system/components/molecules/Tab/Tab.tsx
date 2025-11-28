import { forwardRef } from 'react';
import type { TabsProps, TabPanelProps } from './Tab.types';
import styles from './Tab.module.css';

/**
 * Tabs Component
 * 
 * Tab navigation with multiple style variants.
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      items,
      activeId,
      onChange,
      variant = 'underline',
      size = 'md',
      fullWidth = false,
      className,
      ...props
    },
    ref
  ) => {
    const classes = [
      styles.tabs,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} role="tablist" {...props}>
        {items.map((item) => (
          <button
            key={item.id}
            className={`${styles.tab} ${activeId === item.id ? styles.tabActive : ''}`}
            role="tab"
            aria-selected={activeId === item.id}
            aria-controls={`panel-${item.id}`}
            disabled={item.disabled}
            onClick={() => onChange(item.id)}
          >
            {item.icon}
            {item.label}
            {item.badge && <span className={styles.badge}>{item.badge}</span>}
          </button>
        ))}
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';

/**
 * TabPanel Component
 * 
 * Content panel for a tab.
 */
export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ id, activeId, children, className, ...props }, ref) => {
    const isActive = id === activeId;
    const classes = [
      styles.panel,
      !isActive && styles.panelHidden,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        id={`panel-${id}`}
        className={classes}
        role="tabpanel"
        aria-labelledby={id}
        hidden={!isActive}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabPanel.displayName = 'TabPanel';
