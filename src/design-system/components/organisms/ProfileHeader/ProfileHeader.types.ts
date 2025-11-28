import type { ReactNode, HTMLAttributes } from 'react';

export type ProfileHeaderSize = 'sm' | 'md' | 'lg';

export interface ProfileHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Profile image URL */
  avatarSrc?: string;
  /** Fallback initials */
  initials?: string;
  /** Profile name */
  name: string;
  /** ID or subtitle */
  subtitle?: string;
  /** Status badges */
  badges?: ReactNode;
  /** Contact info items */
  contactInfo?: ReactNode;
  /** Action buttons */
  actions?: ReactNode;
  /** Warning banner */
  warning?: ReactNode;
  /** Additional stat/info display */
  stats?: ReactNode;
  /** Size variant */
  size?: ProfileHeaderSize;
}
