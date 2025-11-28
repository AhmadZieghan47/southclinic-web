import type { HTMLAttributes } from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarVariant = 'circle' | 'square';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Fallback initials (1-2 characters) */
  initials?: string;
  /** Size variant */
  size?: AvatarSize;
  /** Shape variant */
  variant?: AvatarVariant;
  /** Background color for initials */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'gray';
}
