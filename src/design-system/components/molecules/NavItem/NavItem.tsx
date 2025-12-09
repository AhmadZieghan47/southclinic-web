import { useState, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import type { NavItemProps, NavGroupProps } from './NavItem.types';
import styles from './NavItem.module.css';

/**
 * NavItem Component
 *
 * Navigation menu item with icon and badge support.
 */
export const NavItem = forwardRef<HTMLElement, NavItemProps>(
  (
    {
      label,
      icon,
      href,
      active = false,
      collapsed = false,
      badge,
      onClick,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const classes = [
      styles.navItem,
      active && styles.active,
      collapsed && styles.collapsed,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {icon ? <span className={styles.icon}>{icon}</span> : null}
        <span className={styles.label}>{label}</span>
        {badge ? <span className={styles.badge}>{badge}</span> : null}
      </>
    );

    if (href && !disabled) {
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={classes} {...props}>
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {content}
      </button>
    );
  },
);

NavItem.displayName = 'NavItem';

/**
 * NavGroup Component
 *
 * Collapsible navigation group with child items.
 */
export const NavGroup = ({
  label,
  icon,
  children,
  defaultExpanded = false,
  collapsed = false,
  className,
}: NavGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const groupClasses = [styles.navGroup, collapsed && styles.navGroupCollapsed, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={groupClasses}>
      <button
        className={styles.navGroupHeader}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        {icon ? <span className={styles.icon}>{icon}</span> : null}
        <span className={styles.label}>{label}</span>
        <ChevronDown
          size={16}
          className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`}
        />
      </button>
      {isExpanded && !collapsed ? <div className={styles.navGroupChildren}>{children}</div> : null}
    </div>
  );
};
