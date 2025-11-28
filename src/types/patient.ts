/**
 * Patient Type Definitions
 * Migrated from old UI with necessary types for patient management
 */

// Common primitives
export type BigIntStr = string;
export type ISODate = string;
export type ISODateTime = string;
export type Money = string;

// Enums
export type GenderT = "M" | "F" | "O";
export type RoleT = "ADMIN" | "MANAGER" | "RECEPTION" | "THERAPIST";
export type PlanTypeT = "PAY_PER_VISIT" | "PACKAGE";
export type PlanStatusT = "ONGOING" | "DISCHARGED";
export type SessionTypeT =
  | "REGULAR"
  | "SHOCK_WAVE"
  | "INDIBA"
  | "HOME"
  | "HOJAMA"
  | "ELDER"
  | "HOSPITAL";
export type LocationT = "CLINIC" | "HOME" | "HOSPITAL";
export type ApptStatusT = "BOOKED" | "CHECKED_IN" | "COMPLETED" | "CANCELLED" | "RESCHEDULED";
export type PaymentMethod = "CASH" | "CARD" | "INSURANCE";
export type CancelReasonT =
  | "PATIENT_REQUEST"
  | "THERAPIST_UNAVAILABLE"
  | "INSURANCE_ISSUE"
  | "WEATHER_TRANSPORT"
  | "DUPLICATE_BOOKING"
  | "CREATED_IN_ERROR"
  | "DOCTOR_ADVISED_HOLD";

// Patient Interface
export interface Patient {
  id: BigIntStr;
  fullName: string;
  dob: ISODate;
  gender: GenderT;
  phone: string;
  hasInsurance: boolean;
  balance: Money;
  extraCare: boolean;
  nationalId: string | null;
  notes: string | null;
  isActive: boolean;
  medicalHistory: string[];
  orthopedicImplants: string[];
  deletedAt: ISODateTime | null;
  isDeleted: boolean;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
  plans?: TreatmentPlan[];
  payments?: Payment[];
  files?: FileBlob[];
  insuranceProfiles?: InsuranceProfile[];
}

// Treatment Plan
export interface TreatmentPlan {
  id: BigIntStr;
  patientId: BigIntStr;
  planType: PlanTypeT;
  status: PlanStatusT;
  diagnosisEn: string | null;
  diagnosisAr: string | null;
  startedAt: ISODateTime;
  dischargedAt: ISODateTime | null;
  totalSessions: number | null;
  completedSessions: number;
  priceJd: Money;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
  appointments?: Appointment[];
}

// Appointment
export interface Appointment {
  id: BigIntStr;
  planId: BigIntStr;
  therapistId: BigIntStr;
  sessionType: SessionTypeT;
  location: LocationT;
  status: ApptStatusT;
  startsAt: ISODateTime;
  endsAt: ISODateTime;
  noteEn: string | null;
  noteAr: string | null;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

// Payment
export interface Payment {
  id: BigIntStr;
  patientId: BigIntStr;
  planId: BigIntStr | null;
  appointmentId: BigIntStr | null;
  amountJd: Money;
  method: PaymentMethod;
  paidAt: ISODateTime;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

// File Blob
export interface FileBlob {
  id: BigIntStr;
  patientId: BigIntStr;
  mimeType: string;
  sizeBytes: number;
  labelEn: string | null;
  labelAr: string | null;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

// Insurance Profile
export interface InsuranceProfile {
  id: BigIntStr;
  patientId: BigIntStr;
  insurerId: BigIntStr;
  policyNumber: string;
  expiresAt: ISODate | null;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

// API Request/Response types
export interface GetPatientsParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface GetPatientsResponse {
  data: Patient[];
  total: number;
}

export interface CreatePatientData {
  fullName: string;
  dob: ISODate;
  gender: GenderT;
  phone: string;
  hasInsurance?: boolean;
  extraCare?: boolean;
  nationalId?: string | null;
  notes?: string | null;
  medicalHistory?: string[];
  orthopedicImplants?: string[];
}

export interface UpdatePatientData extends Partial<CreatePatientData> {
  isActive?: boolean;
}
