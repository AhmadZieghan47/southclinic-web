import type { ReactNode, HTMLAttributes } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  /** Open state */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Modal title */
  title?: ReactNode;
  /** Modal description */
  description?: string;
  /** Modal content */
  children: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Size variant */
  size?: ModalSize;
  /** Close on overlay click */
  closeOnOverlay?: boolean;
  /** Close on Escape key */
  closeOnEscape?: boolean;
  /** Show close button */
  showCloseButton?: boolean;
  /** Additional class for modal */
  className?: string;
}

export interface ModalHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Header title */
  title?: ReactNode;
  /** Header description */
  description?: string;
  /** Show close button */
  showCloseButton?: boolean;
  /** Close handler */
  onClose?: () => void;
}

export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  /** Body content */
  children: ReactNode;
}

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Footer content */
  children: ReactNode;
}
