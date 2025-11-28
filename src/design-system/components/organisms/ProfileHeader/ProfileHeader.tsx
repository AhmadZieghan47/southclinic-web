import { forwardRef } from 'react';
import type { ProfileHeaderProps } from './ProfileHeader.types';
import styles from './ProfileHeader.module.css';

/**
 * ProfileHeader Component
 * 
 * Header for patient/user profile pages with avatar, info, and actions.
 */
export const ProfileHeader = forwardRef<HTMLDivElement, ProfileHeaderProps>(
  (
    {
      avatarSrc,
      initials,
      name,
      subtitle,
      badges,
      contactInfo,
      actions,
      warning,
      stats,
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const classes = [styles.profileHeader, styles[size], className]
      .filter(Boolean)
      .join(' ');

    const displayInitials = initials || name.charAt(0).toUpperCase();

    return (
      <div ref={ref} className={classes} {...props}>
        {warning && <div className={styles.warning}>{warning}</div>}
        
        <div className={styles.content}>
          <div className={styles.avatar}>
            <div className={styles.avatarInner}>
              {avatarSrc ? (
                <img src={avatarSrc} alt={name} className={styles.avatarImage} />
              ) : (
                displayInitials
              )}
            </div>
          </div>

          <div className={styles.info}>
            {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
            <h1 className={styles.name}>{name}</h1>
            {badges && <div className={styles.badges}>{badges}</div>}
            {contactInfo && <div className={styles.contactInfo}>{contactInfo}</div>}
          </div>

          {(actions || stats) && (
            <div className={styles.actionsSection}>
              {stats && <div className={styles.stats}>{stats}</div>}
              {actions && <div className={styles.actions}>{actions}</div>}
            </div>
          )}
        </div>
      </div>
    );
  }
);

ProfileHeader.displayName = 'ProfileHeader';
