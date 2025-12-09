import { forwardRef, useState } from 'react';
import type { AvatarProps } from './Avatar.types';
import styles from './Avatar.module.css';

/**
 * Avatar Component
 *
 * User profile image or initials display.
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = '',
      initials,
      size = 'md',
      variant = 'circle',
      color = 'primary',
      className,
      ...props
    },
    ref,
  ) => {
    const [imgError, setImgError] = useState(false);

    const showImage = src && !imgError;
    const showInitials = !showImage && initials;

    const colorClass =
      `color${color.charAt(0).toUpperCase()}${color.slice(1)}` as keyof typeof styles;

    const classes = [
      styles.avatar,
      styles[size],
      styles[variant],
      !showImage && styles[colorClass],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {showImage ? (
          <img src={src} alt={alt} className={styles.image} onError={() => setImgError(true)} />
        ) : null}
        {showInitials ? initials.slice(0, 2) : null}
      </div>
    );
  },
);

Avatar.displayName = 'Avatar';
