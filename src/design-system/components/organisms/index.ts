/**
 * Organisms Index
 * Design System - South Physical Clinic
 * 
 * Export all organism components
 */

// Table
export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableWrapper,
} from './Table';
export type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
} from './Table';

// Modal
export { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';
export type { ModalProps, ModalHeaderProps, ModalBodyProps, ModalFooterProps, ModalSize } from './Modal';

// Wizard
export { Wizard, WizardHeader, WizardContent, WizardFooter } from './Wizard';
export type { WizardProps, WizardStep, WizardHeaderProps, WizardContentProps, WizardFooterProps } from './Wizard';

// ProfileHeader
export { ProfileHeader } from './ProfileHeader';
export type { ProfileHeaderProps, ProfileHeaderSize } from './ProfileHeader';

// EmptyState
export { EmptyState } from './EmptyState';
export type { EmptyStateProps, EmptyStateVariant, EmptyStateSize } from './EmptyState';

// DescriptionList
export { DescriptionList } from './DescriptionList';
export type { DescriptionListProps, DescriptionItem, DescriptionListLayout, DescriptionListSize } from './DescriptionList';
