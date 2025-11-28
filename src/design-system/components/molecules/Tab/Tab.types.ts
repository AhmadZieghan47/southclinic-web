import type { ReactNode, HTMLAttributes } from 'react';

export type TabVariant = 'underline' | 'pills' | 'boxed';
export type TabSize = 'sm' | 'md' | 'lg';

export interface TabItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  badge?: ReactNode;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Tab items */
  items: TabItem[];
  /** Active tab id */
  activeId: string;
  /** Tab change handler */
  onChange: (id: string) => void;
  /** Visual variant */
  variant?: TabVariant;
  /** Size */
  size?: TabSize;
  /** Full width tabs */
  fullWidth?: boolean;
}

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Tab id this panel belongs to */
  id: string;
  /** Active tab id */
  activeId: string;
  /** Panel content */
  children: ReactNode;
}
