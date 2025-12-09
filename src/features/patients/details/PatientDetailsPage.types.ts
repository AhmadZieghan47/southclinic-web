/**
 * Patient Details Page Type Definitions
 */

import type {
  Patient,
  TreatmentPlan,
  Appointment,
  Payment,
  FileBlob,
  InsuranceProfile,
  ApptStatusT,
  PaymentMethod,
  SessionTypeT,
  LocationT,
} from '../../../types/patient';

// ==================== Tab Types ====================

export type PatientTab = 'overview' | 'medical' | 'plan' | 'appointments' | 'billing';

export const PATIENT_TABS: { id: PatientTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'medical', label: 'Medical History' },
  { id: 'plan', label: 'Treatment Plan' },
  { id: 'appointments', label: 'Appointments' },
  { id: 'billing', label: 'Billing & Insurance' },
];

// ==================== Table Row Types ====================

export interface AppointmentRow extends Appointment {
  therapistName?: string;
  sessionTypeLabel: string;
  locationLabel: string;
  statusLabel: string;
  statusVariant: 'success' | 'warning' | 'danger' | 'info' | 'default';
}

export interface PaymentRow extends Payment {
  description: string;
  methodLabel: string;
  statusLabel: string;
}

export interface FileRow extends FileBlob {
  fileTypeLabel: string;
  sizeLabel: string;
  downloadUrl: string;
}

// ==================== Component Props ====================

export interface PatientHeaderProps {
  patient: Patient;
  lastVisitDate?: string;
  onBookAppointment: () => void;
  onBeginTreatment: () => void;
  onEditPatient: () => void;
}

export interface PatientTabsProps {
  activeTab: PatientTab;
  onTabChange: (tab: PatientTab) => void;
}

export interface OverviewTabProps {
  patient: Patient;
  activePlan: TreatmentPlan | null;
  recentAppointments: AppointmentRow[];
  onViewAllAppointments: () => void;
}

export interface MedicalHistoryTabProps {
  patient: Patient;
  onEditMedicalInfo: () => void;
}

export interface TreatmentPlanTabProps {
  patient: Patient;
  activePlan: TreatmentPlan | null;
  onBeginTreatment: () => void;
}

export interface AppointmentsTabProps {
  appointments: AppointmentRow[];
  loading: boolean;
  searchText: string;
  onSearch: (value: string) => void;
  onViewAppointment: (appointment: AppointmentRow) => void;
  onEditAppointment: (appointment: AppointmentRow) => void;
  onCancelAppointment: (appointment: AppointmentRow) => void;
}

export interface BillingTabProps {
  patient: Patient;
  payments: PaymentRow[];
  insuranceProfile: InsuranceProfile | null;
  loading: boolean;
  searchText: string;
  onSearch: (value: string) => void;
  onAddPayment: () => void;
}

// ==================== Table Props ====================

export interface AppointmentsTableProps {
  rows: AppointmentRow[];
  loading: boolean;
  onView: (appointment: AppointmentRow) => void;
  onEdit: (appointment: AppointmentRow) => void;
  onCancel: (appointment: AppointmentRow) => void;
}

export interface PaymentsTableProps {
  rows: PaymentRow[];
  loading: boolean;
}

export interface FilesTableProps {
  rows: FileRow[];
  loading: boolean;
  onDownload: (file: FileRow) => void;
  onDelete: (file: FileRow) => void;
}

// ==================== Modal Props ====================

export interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PaymentFormData) => Promise<void>;
  patientId: string;
  patientName: string;
  plans: TreatmentPlan[];
  loading: boolean;
}

export interface PaymentFormData {
  planId: string | null;
  appointmentId: string | null;
  amountJd: string;
  method: PaymentMethod;
}

export interface AppointmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: AppointmentRow | null;
  patient: Patient;
  onSessionCompleted: () => void;
}

// ==================== Hook Types ====================

export interface UsePatientDetailsOptions {
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export interface UsePatientDetailsReturn {
  // State
  patient: Patient | null;
  loading: boolean;
  error: string | null;

  // Computed
  activePlan: TreatmentPlan | null;
  insuranceProfile: InsuranceProfile | null;
  appointments: AppointmentRow[];
  payments: PaymentRow[];
  files: FileRow[];
  lastVisitDate: string | null;

  // Filtered data
  filteredAppointments: AppointmentRow[];
  filteredPayments: PaymentRow[];
  filteredFiles: FileRow[];

  // Search
  searchText: string;
  setSearchText: (text: string) => void;

  // Actions
  refresh: () => Promise<void>;
  clearError: () => void;
}

// ==================== Utility Types ====================

export const SESSION_TYPE_LABELS: Record<SessionTypeT, string> = {
  REGULAR: 'Regular',
  SHOCK_WAVE: 'Shock Wave',
  INDIBA: 'Indiba',
  HOME: 'Home Visit',
  HOJAMA: 'Hojama',
  ELDER: 'Elder Care',
  HOSPITAL: 'Hospital',
};

export const LOCATION_LABELS: Record<LocationT, string> = {
  CLINIC: 'Clinic',
  HOME: 'Home',
  HOSPITAL: 'Hospital',
};

export const STATUS_CONFIG: Record<
  ApptStatusT,
  { label: string; variant: AppointmentRow['statusVariant'] }
> = {
  BOOKED: { label: 'Booked', variant: 'info' },
  CHECKED_IN: { label: 'Checked In', variant: 'warning' },
  COMPLETED: { label: 'Completed', variant: 'success' },
  CANCELLED: { label: 'Cancelled', variant: 'danger' },
  RESCHEDULED: { label: 'Rescheduled', variant: 'default' },
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  CASH: 'Cash',
  CARD: 'Card',
  INSURANCE: 'Insurance',
};
