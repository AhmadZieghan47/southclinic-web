import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card content */
  children: ReactNode;
  /** Card title */
  title?: string;
  /** Card description/subtitle */
  description?: string;
  /** Remove padding */
  noPadding?: boolean;
  /** Header actions (buttons, etc.) */
  headerActions?: ReactNode;
  /** Footer content */
  footer?: ReactNode;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
