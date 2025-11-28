import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import type { ModalProps, ModalHeaderProps, ModalBodyProps, ModalFooterProps } from './Modal.types';
import styles from './Modal.module.css';

/**
 * ModalHeader Component
 */
export const ModalHeader = ({
  title,
  description,
  showCloseButton = true,
  onClose,
  className,
  children,
  ...props
}: ModalHeaderProps) => {
  const classes = [styles.header, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <div className={styles.headerContent}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {description && <p className={styles.description}>{description}</p>}
        {children}
      </div>
      {showCloseButton && onClose && (
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>
      )}
    </div>
  );
};

/**
 * ModalBody Component
 */
export const ModalBody = ({ children, className, ...props }: ModalBodyProps) => {
  const classes = [styles.body, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

/**
 * ModalFooter Component
 */
export const ModalFooter = ({ children, className, ...props }: ModalFooterProps) => {
  const classes = [styles.footer, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

/**
 * Modal Component
 * 
 * Dialog modal with header, body, and footer sections.
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnOverlay = true,
  closeOnEscape = true,
  showCloseButton = true,
  className,
}: ModalProps) => {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlay && e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const modalClasses = [styles.modal, styles[size], className]
    .filter(Boolean)
    .join(' ');

  const modalContent = (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div
        className={modalClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {(title || description || showCloseButton) && (
          <ModalHeader
            title={title}
            description={description}
            showCloseButton={showCloseButton}
            onClose={onClose}
          />
        )}
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
