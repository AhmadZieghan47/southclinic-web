# South Physical Center - Project Context & Developer Guide

## 1. Project Overview
**South Physical Center** is a Physiotherapy Clinic Management System built with **React**, **TypeScript**, and **Vite**. It is a comprehensive web application for managing patients, appointments, treatments, billing, and clinic staff.

## 2. Tech Stack
- **Frontend Framework:** React 19.2.0
- **Language:** TypeScript 5.9.3
- **Build Tool:** Vite 7.2.4
- **State Management:**
  - **Zustand** (Global/Complex state)
  - **React Context** (UI state, e.g., Sidebar)
  - **React Query** (Server state - implied usage)
- **Forms:** React Hook Form + Zod validation
- **Styling:** CSS Modules + Custom Design System (Variables)
- **Icons:** Lucide React
- **Routing:** React Router DOM 7.9.6
- **HTTP Client:** Axios

## 3. Architecture & Directory Structure

The project follows a **Feature-Based** architecture combined with an **Atomic Design** system.

```
src/
├── api/                # API client and service definitions
├── assets/             # Static assets
├── contexts/           # Global React Contexts (e.g., SidebarContext)
├── design-system/      # CUSTOM ATOMIC DESIGN SYSTEM (Do not modify without strict adherence)
│   ├── atoms/          # Basic building blocks (Button, Input, Badge)
│   ├── molecules/      # Simple combinations (FormField, SearchInput)
│   ├── organisms/      # Complex structures (Table, Modal, Sidebar)
│   ├── layouts/        # Page wrappers (MainLayout, DashboardLayout)
│   ├── foundations/    # CSS Variables, Reset, Global styles
│   └── tokens/         # TS Token definitions (Colors, Spacing, Typography)
├── features/           # Business logic & Page components (grouped by domain)
│   ├── appointments/
│   ├── auth/
│   ├── dashboard/
│   └── patients/
├── hooks/              # Shared custom hooks
├── routes/             # App routing configuration
├── services/           # Service layer
├── types/              # Shared TypeScript definitions
└── App.tsx             # Root component
```

## 4. Development Workflow

### Scripts
- **Start Dev Server:** `npm run dev`
- **Build for Production:** `npm run build`
- **Lint Code:** `npm run lint`
- **Format Code:** `npm run format`
- **Preview Build:** `npm run preview`

### Git & Version Control
- **Branching:** Use descriptive branch names.
- **Commits:** Clear, concise messages focusing on *why* a change was made.

## 5. Coding Standards & Conventions

### General
- **Strict TypeScript:** No `any`. Define interfaces/types for all props and data.
- **Functional Components:** Use React functional components with hooks.
- **File Naming:**
  - Components: `PascalCase.tsx` (e.g., `PatientList.tsx`)
  - Hooks: `camelCase.ts` (e.g., `usePatient.ts`)
  - Utilities/Logic: `camelCase.ts`
  - Styles: `Component.module.css`

### Styling (CSS Modules)
- **Strictly use CSS Variables:** Never hardcode hex values. Use variables from the Design System.
  - `var(--color-primary)`, `var(--spacing-4)`, `var(--radius-sm)`, etc.
- **Class Naming:** `camelCase` for class names (e.g., `.submitButton`, `.hasError`).
- **No Inline Styles:** Use CSS modules for all styling needs.

### Component Pattern
```tsx
import styles from './MyComponent.module.css';
import { Button } from '@/design-system/components/atoms';

interface MyComponentProps {
  title: string;
  isActive?: boolean;
}

export const MyComponent = ({ title, isActive }: MyComponentProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <Button variant="primary" disabled={!isActive}>Action</Button>
    </div>
  );
};
```

### Forms
- Use **React Hook Form** for form state management.
- Use **Zod** for schema validation.
- Use `FormField` molecule from the design system for consistent labeling and error handling.

### Icons
- Use **Lucide React** icons.
- **Never** use emojis as icons.
- Import specific icons: `import { User, Calendar } from 'lucide-react';`

## 6. Design System Usage

The project utilizes a custom **Atomic Design System** located in `src/design-system`.

- **Atoms:** `Button`, `Input`, `Select`, `Badge`, `Spinner`, `Avatar`.
- **Molecules:** `FormField`, `SearchInput`, `StatCard`, `AlertBanner`.
- **Organisms:** `Modal`, `Table`, `Wizard`, `EmptyState`.
- **Layouts:** `MainLayout`, `DashboardLayout`.

**Key Rules:**
1. **Reuse First:** Always check `src/design-system` before building a new UI component.
2. **Tokens:** Use `src/design-system/tokens` for reference values, but implement them via CSS variables.
3. **Consistency:** Follow the visual patterns established in `src/design-system/foundations/variables.css`.

## 7. Backend Integration
- **API Base:** `/api/v1`
- **Authentication:** JWT stored in localStorage.
- **Data Fetching:** Use custom hooks in `src/hooks` or services in `src/api`.
- **Error Handling:** Global error handling via Axios interceptors and UI feedback via `AlertBanner` or Toasts.

---

# AI-Assisted Design & Development Specification Template

## Project Context

**Project:** South Physical Center (Physiotherapy Clinic Management System)

---

## Design System Reference

### Layout Architecture
- **Grid System:** Three-column layout with left sidebar navigation
- **Sidebar:** 256px width, collapsible, dark gradient background
- **Header:** 64px height with gradient background and breadcrumb navigation
- **Main Content:** Centered in middle column with max-width constraints
- **Sidebar Collapse:** Mobile-responsive with toggle functionality

### Color Tokens

**Primary Colors:**
- **Primary Brand:** #0D9488 (Teal-600) - Main actions, active states, primary buttons
- **Secondary:** #0EA5E9 (Sky-500) - Links, secondary accents
- **Destructive:** #E11D48 (Rose-600) - Error states, delete actions
- **Success:** #16A34A (Green-600) - Success states, confirmations
- **Warning:** #CA8A04 (Yellow-600) - Warning states, cautions

**Neutral Colors:**
- **Background:** #F3F4F6 (Gray-100) - Page background
- **Surface:** #FFFFFF - Cards, panels, modals
- **Border:** #D1D5DB (Gray-300) - Component borders

**Text Colors:**
- **Text Primary (Heading):** #1F2937 (Gray-800)
- **Text Body:** #4B5563 (Gray-600)
- **Text Muted:** #6B7280 (Gray-500)

**Semantic Colors:**
- **Info:** #3B82F6 (Blue-500)
- **Error Text:** #DC2626 (Red-600)
- **Success Text:** #059669 (Emerald-600)

### Typography
- **Font Family:** Inter (with system fallbacks: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell)
- **Headings:** Inter - Bold (700) / Semibold (600)
- **Body Text:** Inter - Regular (400)
- **Buttons/Labels:** Inter - Medium (500)

**Font Sizes:**
- **xs:** 12px (0.75rem)
- **sm:** 14px (0.875rem)
- **base:** 16px (1rem)
- **lg:** 18px (1.125rem)
- **xl:** 20px (1.25rem)
- **2xl:** 24px (1.5rem)
- **3xl:** 30px (1.875rem)
- **4xl:** 36px (2.25rem)

### Spacing System
Based on 4px grid:
- **xs:** 4px
- **sm:** 8px
- **md:** 16px
- **lg:** 24px
- **xl:** 32px
- **2xl:** 40px
- **3xl:** 48px
- **4xl:** 64px
- **5xl:** 80px

### Component Patterns

**Atomic Design Architecture:**
- **Atoms:** Button, Input, Select, Badge, Spinner, Checkbox, Radio, Toggle, Avatar, Divider
- **Molecules:** Card, FormField, StatCard, AlertBanner, Tabs, SearchInput, NavItem, Pagination, ProgressBar, IconButton
- **Organisms:** Table, Modal, Wizard, Sidebar, Header, ProfileHeader, EmptyState, DescriptionList
- **Layouts:** MainLayout, DashboardLayout, WizardLayout

**Forms:**
- Vertical layout with labels above inputs
- Consistent 16px spacing between fields
- FormField molecule for label + input + error message
- React Hook Form + Zod validation

**Tables:**
- Striped rows (alternating backgrounds)
- Sortable headers with icons
- Pagination controls with page size selector
- Action columns with icon buttons
- Empty state handling

**Buttons:**
- **Primary:** Solid fill (#0D9488), white text
- **Secondary:** Outlined border, teal text
- **Tertiary:** Text-only, no border
- **Destructive:** Red solid fill (#E11D48)
- **Sizes:** sm (32px), md (40px), lg (48px)

**Modals:**
- Centered overlay with backdrop blur
- Header with title and close button
- Body content area
- Footer with action buttons (Cancel + Primary action)
- Focus trap and ESC key support

**Cards:**
- White background (#FFFFFF)
- Subtle shadow (0 1px 3px rgba(0,0,0,0.1))
- 24px padding
- Optional header, content, footer sections
- Border-radius: 8px

**Badges:**
- Pill-shaped with rounded corners
- Status variants: success (green), warning (yellow), error (red), info (blue), neutral (gray)
- Small text (12px)

**Wizards:**
- Multi-step form pattern
- Progress indicator with step numbers
- Navigation: Previous/Next/Submit buttons
- Step validation before proceeding

---

## Feature Specification

### Overview
[Detailed description of what this feature accomplishes and why it matters in the context of South Physical Center's physiotherapy clinic operations]

### User Workflows
1. **Workflow Name:** [Description of primary user flow]
   - Step 1: [Action]
   - Step 2: [Action]
   - Step 3: [Action]

2. **Workflow Name:** [Secondary workflow if applicable]
   - Step 1: [Action]
   - Step 2: [Action]

### Key Screens/Views
- **Screen 1:** [Name] - [Purpose]
- **Screen 2:** [Name] - [Purpose]
- **Screen 3:** [Name] - [Purpose]

### Data Requirements
- **Primary Data Model:** [Field definitions]
- **Related Data:** [Connections to other modules - see Backend Models section]
- **State Management:** [Zustand for complex state, Context API for UI state, or local state]

---

## UI/UX Requirements

### Information Architecture
```
[Navigation Hierarchy - Based on existing menu structure]
Dashboard
├── Dashboard Overview
Patients
├── Patient List (V2)
├── Create Patient (Wizard)
└── Patient Details
    ├── Overview
    ├── Appointments
    ├── Medical History
    ├── Treatment Plans
    └── Billing/Payments
Appointments
├── Appointment List
├── Schedule Appointment
└── Appointment Details
Billing
├── Payments
├── Expenses
└── Invoices
Clinical
├── Treatment Plans
├── Session Notes
├── Diagnoses
└── Procedures
Settings
├── Users Management
├── Session Types
├── Insurers
└── System Settings
```

### Interaction Patterns
- **Primary Action:** [Describe main interaction - e.g., "Click 'Add Patient' button to open wizard"]
- **Secondary Actions:** [Other key interactions - filters, search, sorting]
- **Confirmations:** Required for destructive actions (delete, cancel appointment)
- **Error Handling:** AlertBanner component for inline errors, toast notifications for async operations
- **Loading States:** Spinner component for async operations, skeleton screens for initial loads

### Accessibility Requirements
- WCAG AA compliance minimum
- Keyboard navigation support (Tab, Enter, ESC, Arrow keys)
- Screen reader compatibility with ARIA labels
- Color contrast ratios: 4.5:1 minimum for text
- Focus indicators on interactive elements
- Form validation with descriptive error messages

### Responsive Behavior
- **Desktop (1920px+):** Full three-column layout with expanded sidebar
- **Tablet (768px-1024px):** Sidebar collapses to icon-only mode, content adjusts
- **Mobile (below 768px):** Sidebar hidden by default with hamburger toggle, single-column content

---

## Technical Requirements

### Frontend
- **Framework:** React 19.2.0 with TypeScript 5.9.3
- **Build Tool:** Vite 7.2.4
- **State Management:**
  - Zustand 5.0.8 (complex/global state)
  - React Context API (UI state like sidebar)
  - React Hook Form 7.66.1 (form state)
- **Routing:** React Router DOM 7.9.6
- **UI Library:** Custom design system (Atomic Design)
- **Validation:** Zod 4.1.13
- **HTTP Client:** Axios 1.13.2 with enhanced client wrapper
- **Icons:** Lucide React 0.554.0
- **Styling:** CSS Modules with CSS Custom Properties

### Backend
- **Runtime:** Node.js with TypeScript 5.9.2
- **Framework:** Express.js 5.1.0
- **Database:** PostgreSQL with Sequelize ORM 6.37.7
- **Authentication:** JWT (jsonwebtoken 9.0.2) + bcrypt 6.0.0
- **Validation:** Zod 4.0.17
- **File Upload:** Multer 2.0.2

### Integration Points
- **API Base URL:** `http://localhost:3000/api/v1`
- **Authentication:** JWT token in localStorage, auto-attached to requests via interceptor
- **API Endpoints:** RESTful endpoints (see Backend API Structure section)
- **Data Fetching:** Axios with retry logic and exponential backoff
- **Caching Strategy:** Client-side caching via React Query patterns (if implemented)

### Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

---

## Backend API Structure

### Base URL
`/api/v1`

### Available Endpoints by Module

**Authentication:**
- `POST /auth/login` - User login with JWT token

**Patients:**
- `GET /patients` - List patients (with filters, search, pagination)
- `GET /patients/stats` - Patient statistics
- `GET /patients/:id` - Get patient by ID
- `POST /patients` - Create new patient
- `PATCH /patients/:id` - Update patient
- `DELETE /patients/:id` - Soft delete patient

**Appointments:**
- `GET /appointments` - List appointments
- `POST /appointments` - Schedule appointment
- `PATCH /appointments/:id` - Update appointment
- `POST /appointments/:appointmentId/note` - Add session note

**Treatment Plans:**
- `GET /plans` - List treatment plans
- `POST /plans` - Create treatment plan
- `PATCH /plans/:id` - Update treatment plan
- `POST /begin-treatment` - Start new treatment workflow

**Payments:**
- `GET /payments` - List payments
- `POST /payments` - Record payment
- `GET /payments/stats` - Payment statistics

**Expenses:**
- `GET /expenses` - List expenses
- `POST /expenses` - Record expense

**Reference Data:**
- `GET /diagnoses` - List diagnoses
- `GET /procedures` - List procedures
- `GET /session-types` - List session types
- `GET /session-prices` - List session prices
- `GET /insurers` - List insurance companies
- `GET /referring-doctors` - List referring doctors

**System:**
- `GET /app-users` - List staff users
- `GET /audit-log` - Audit trail
- `GET /enum-labels` - Internationalized labels

### Authentication & Authorization
- **Method:** JWT Bearer token in Authorization header
- **Roles:** ADMIN, MANAGER, RECEPTION, THERAPIST
- **Middleware:** `authenticate` + `requireRole(...roles)`
- **Dev Mode:** `AUTH_DISABLED=true` bypasses authentication

### Common Request Patterns
- **Pagination:** `?page=1&pageSize=20`
- **Search:** `?search=query`
- **Filters:** Query parameters specific to entity
- **Sorting:** Via query parameters

---

## Backend Data Models

### Core Entities

**Patient:**
- id, fullName, dob, gender, phone, nationalId
- hasInsurance, balance, extraCare
- medicalHistory (array), orthopedicImplants (array)
- notes, isActive, soft delete support

**AppUser:**
- id, fullName, username, email, passwordHash
- role (ADMIN, MANAGER, RECEPTION, THERAPIST)
- whatsappNumber, isActive, lastLoginAt

**TreatmentPlan:**
- id, patientId, planType, packageCode, priceBasis
- primaryTherapistId, startDate, status
- totalSessions, remainingSessions, targetFreqPerWeek
- referringDoctorId, complaints (array)

**Appointment:**
- id, planId, therapistId, startsAt, endsAt
- sessionType, location, status
- noteEn/Ar, cancelReason

**SessionNote:**
- appointmentId (PK), summaryTextEn/Ar
- preferredNext, recommendationsEn/Ar

**Payment:**
- id, patientId, planId, appointmentId
- amountJd, method (CASH, CARD, INSURANCE)
- paidAt, recordedBy

**Expense:**
- id, categoryId, amountJd, method
- vendorName, notes, paidAt, recordedBy

**Insurance:**
- Insurer: id, nameEn/Ar, isActive
- InsuranceProfile: id, patientId, insurerId, coveragePercent, validityDate, referralAuth

**Clinical:**
- Diagnosis: id, code, nameEn/Ar, category, isActive
- Procedure: id, nameEn/Ar, isActive
- SessionType: id, code, labelEn/Ar
- SessionPrice: id, sessionTypeId, priceJd, effectiveFrom, effectiveTo

### Key Relationships
```
Patient 1:N TreatmentPlan
Patient 1:N Payment
Patient 1:N InsuranceProfile

TreatmentPlan N:1 Patient
TreatmentPlan 1:N Appointment
TreatmentPlan N:M Diagnosis
TreatmentPlan N:M SessionType

Appointment N:1 TreatmentPlan
Appointment 1:1 SessionNote
Appointment N:M Procedure
```

---

## Detailed Screen Specifications

### Screen Name: [Example: Enhanced Patient List]

**Purpose:** Display searchable, filterable list of all patients with statistics and bulk actions

**Layout:**
- Header with title ("Patients") and primary action button ("Add Patient")
- Statistics cards row (4 cards: Total Patients, Active, Inactive, With Insurance)
- Filter bar with search input and filter dropdowns
- Data table with sortable columns
- Pagination controls at bottom

**Components:**
- StatCard (molecule) × 4 for KPIs
- SearchInput (molecule) for patient search
- Table (organism) with patient data
- Pagination (molecule) for navigation
- Button (atom) for actions
- Badge (atom) for status indicators

**States:**
- **Idle:** Table shows paginated patient list with stats
- **Loading:** Spinner overlay on table, skeleton for stats
- **Empty:** EmptyState component with "No patients found" message
- **Error:** AlertBanner at top with error message and retry button
- **Filtered:** Table shows filtered results, stats update accordingly

**Interactions:**
- Click "Add Patient" → Navigate to Create Patient Wizard
- Click patient row → Navigate to Patient Details page
- Type in search → Debounced search triggers API call
- Select filter → Table refreshes with filtered data
- Click column header → Sort by that column
- Change page size → Reload with new page size
- Click pagination → Navigate to page

---

## Instructions for AI Tool

### What We Need
Generate [wireframes/UI designs/component code] for the feature described above. Focus on:
1. Adherence to the South Physical Center design system (colors, typography, layout patterns)
2. Bilingual support (English/Arabic) where applicable
3. Use existing Atomic Design components from design system
4. Clear information hierarchy and user flow
5. Accessibility best practices (WCAG AA)
6. Consistent component usage matching established patterns
7. Professional, polished appearance suitable for healthcare professionals
8. Integration with existing backend API endpoints

### Constraints
- Do NOT deviate from the three-column layout with left sidebar
- Do NOT use colors outside the specified color token palette
- Do NOT create custom component designs; use established Atomic Design components
- Maintain consistency with existing South Physical Center interfaces
- Support bilingual content (English and Arabic fields)
- Follow REST API conventions matching backend structure
- Use TypeScript with strict typing
- Use CSS Modules for styling
- Follow React Hook Form + Zod pattern for forms
- Use enhanced API client for all backend calls

### Deliverables
- [Specify format: React components with TypeScript, API integration code, etc.]
- Component files with `.tsx`, `.types.ts`, `.module.css` naming convention
- Type definitions matching backend models
- API service integration using enhanced client
- Form validation schemas using Zod
- [Any additional requirements]

---

## Reference Materials

**Design System:**
- Location: `C:\mig\southclinic-web\src\design-system\`
- Documentation: `C:\mig\southclinic-web\src\design-system\README.md`
- Tokens: `C:\mig\southclinic-web\src\design-system\tokens\`
- Components: `C:\mig\southclinic-web\src\design-system\components\`

**Similar Existing Modules:**
- **Patient List V2:** `C:\mig\southclinic-web\src\features\patients\v2\PatientsListV2.tsx` - Reference for list views with stats and filters
- **Create Patient Wizard:** `C:\mig\southclinic-web\src\features\patients\create\CreatePatientWizard.tsx` - Reference for multi-step forms
- **Patient Details:** `C:\mig\southclinic-web\src\features\patients\details\PatientDetailsPage.tsx` - Reference for tabbed detail views
- **Appointments List:** `C:\mig\southclinic-web\src\features\appointments\AppointmentsList.tsx` - Reference for appointment management
- **Dashboard:** `C:\mig\southclinic-web\src\features\dashboard\Dashboard.tsx` - Reference for dashboard layouts with KPIs

**Backend API:**
- Base: `C:\mig\south-physical-clinic-be\src\`
- Models: `C:\mig\south-physical-clinic-be\src\modules\[module]\[entity].model.ts`
- Controllers: `C:\mig\south-physical-clinic-be\src\modules\[module]\[entity].controller.ts`
- Types: `C:\mig\south-physical-clinic-be\src\types\typedefs.ts`

**Related Documentation:**
- Frontend README: `C:\mig\southclinic-web\README.md`
- Backend README: `C:\mig\south-physical-clinic-be\README.md`
- Design System README: `C:\mig\southclinic-web\src\design-system\README.md`

---

## Approval & Feedback

**Primary Reviewer:** [Name/Role]
**Secondary Reviewer:** [Name/Role]

**Review Checklist:**
- [ ] Follows South Physical Center design system
- [ ] Uses existing Atomic Design components
- [ ] All required information is present
- [ ] Interaction patterns are clear and consistent
- [ ] Accessible and responsive (WCAG AA)
- [ ] Aligns with user requirements
- [ ] Bilingual support implemented (EN/AR)
- [ ] TypeScript types are correct and match backend
- [ ] API integration follows enhanced client pattern
- [ ] Form validation uses Zod schemas
- [ ] Error handling is comprehensive
- [ ] Loading and empty states are handled

---

## Notes & Special Considerations

### Bilingual Support
- All user-facing labels, messages, and content should support English and Arabic
- Database models use `nameEn/nameAr`, `labelEn/labelAr` pattern
- Frontend should display appropriate language based on user preference
- Form fields for bilingual content should show both EN and AR inputs

### Currency & Localization
- All monetary values are in Jordanian Dinars (JD)
- Use numeric strings for money to avoid floating-point issues
- Display format: "XX.XX JD"

### Role-Based Access
- Components may need to conditionally render based on user role
- Available roles: ADMIN, MANAGER, RECEPTION, THERAPIST
- Use role-based permissions for destructive actions

### Soft Delete Pattern
- Patient records use soft delete (isActive flag)
- UI should allow filtering for active/inactive records
- Deleted records should be visually distinct

### Audit Trail
- All CRUD operations are automatically logged
- No special UI handling required unless viewing audit logs

### Development Mode
- `VITE_AUTH_DISABLED=true` bypasses authentication for frontend development
- `AUTH_DISABLED=true` bypasses authentication for backend development

### File Uploads
- Max file size: 25MB
- Upload directory: `./uploads`
- Supported via Multer on backend
- Use enhanced API client's upload helpers on frontend

### Session Types
Available session types: REGULAR, SHOCK_WAVE, INDIBA, HOME, POOL, SCHOOL, VIRTUAL, GROUP, EVALUATION

### Appointment Statuses
- BOOKED - Scheduled but not started
- CHECKED_IN - Patient has arrived
- IN_PROGRESS - Session in progress
- COMPLETED - Session finished
- CANCELLED - Cancelled by patient or clinic
- NO_SHOW - Patient did not arrive

### Payment Methods
- CASH - Cash payment
- CARD - Credit/debit card
- INSURANCE - Covered by insurance

---

## Development Rules & Standards

### Agent Behavior Rules

**Pre-Development Checks:**
- Index project structure before starting
- Run typecheck and build before making changes
- Verify existing patterns and conventions

**Planning Phase:**
- Required for multi-file edits
- Conduct risk assessment for major changes
- Document approach before implementation

**Execution:**
- Edit files one-by-one
- Verify compilation/functionality after each step
- Never use git commands (version control handled separately)

**Post-Development:**
- Run automated checks after accepting changes:
  - `npm run typecheck`
  - `npm run format`
  - `npm run lint`
  - `npm run build`
  - `npm run test`

---

### Backend Architecture Rules

**Module Structure:**
Every backend module MUST follow this exact structure:
```
src/modules/{module-name}/
├── {entity}.model.ts       # Sequelize model definition
├── {entity}.repo.ts        # Data access layer (Sequelize operations only)
├── {entity}.service.ts     # Business logic layer
├── {entity}.controller.ts  # Request/response handling (thin layer)
├── {entity}.routes.ts      # Express route definitions
├── {entity}.validators.ts  # Zod validation schemas
├── {entity}.types.ts       # TypeScript type definitions
└── {entity}.transformer.ts # Data transformation utilities (optional)
```

**Layer Responsibilities:**
- **Controllers:** Thin layer, only try/catch blocks → pass errors to next()
- **Services:** Business logic ONLY, no database or HTTP concerns
- **Repositories:** Sequelize operations ONLY, no business logic
- **Validators:** Zod schemas ONLY for request validation

**Example Controller Pattern:**
```typescript
export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.create(req.body, req.user);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
```

---

### Backend Code Standards

**Type Safety:**
- Use `interface` for entity definitions
- Use `type` for union types
- NO `any` type except in error handling middleware
- All function parameters and returns must be typed

**Database Operations:**
- Use UUID or BigInt for primary keys
- Transactions REQUIRED for multi-step database operations
- Audit logging REQUIRED for all CRUD operations

**Error Handling:**
- Extend `AppError` base class
- Use specific error subclasses:
  - `ValidationError` - Invalid input data
  - `AuthError` - Authentication failures
  - `ForbiddenError` - Authorization failures
  - `NotFoundError` - Resource not found
  - `ConflictError` - Data conflicts (unique constraints)
  - `BusinessLogicError` - Business rule violations
  - `DatabaseError` - Database operation failures
- Controllers: Use try/catch → next(error)
- Middleware automatically maps Zod/Sequelize/JWT errors to AppError

**Example Error Usage:**
```typescript
// Service layer
if (!patient) {
  throw new NotFoundError('Patient not found');
}

if (patient.balance < 0) {
  throw new BusinessLogicError('Patient has outstanding balance');
}
```

---

### Frontend Code Standards

**Technology Stack:**
- React 19.2.0 + TypeScript 5.9.3
- CSS Modules (NO inline styles except dynamic layout)
- Lucide React for icons (NO emoji icons)
- React Hook Form + Zod for forms

**Component Requirements:**
- Always define typed props with TypeScript interfaces
- Use CSS Modules for styling (`.module.css` files)
- Export type definitions alongside components
- Accessibility attributes REQUIRED (ARIA labels, keyboard navigation)

**Icon Usage:**
```typescript
// ✅ CORRECT
import { Eye, Edit2, Trash2 } from 'lucide-react';

<Button variant="ghost" size="icon" title="View">
  <Eye size={16} />
</Button>

// ❌ WRONG - emoji icons
<Button>👁️</Button>
```

**Form Pattern:**
```typescript
// Use React Hook Form + Zod
const schema = z.object({
  fullName: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
});
```

---

### Naming Conventions

**Backend:**
- Folders: `kebab-case` (e.g., `treatment-plans/`, `session-types/`)
- Files: `{entity}.{layer}.ts` (e.g., `patient.service.ts`, `appointment.controller.ts`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_FILE_SIZE`, `DEFAULT_PAGE_SIZE`)
- Variables/Functions: `camelCase` (e.g., `getUserById`, `patientData`)

**Frontend:**
- Components: `PascalCase.tsx` (e.g., `PatientsList.tsx`, `CreatePatientWizard.tsx`)
- Hooks: `use{Name}.ts` (e.g., `usePatients.ts`, `useAuth.ts`)
- Types: `{name}.types.ts` (e.g., `patient.types.ts`)
- Styles: `{Component}.module.css`
- Constants: `UPPER_SNAKE_CASE`
- Variables/Functions: `camelCase`

---

### UI Consistency Rules

**CSS Variables (MANDATORY):**
NEVER hardcode colors. ALWAYS use design system CSS variables:

| Use This | NOT This |
|----------|----------|
| `var(--color-heading)` | `var(--text-heading)`, `#1f2937` |
| `var(--color-body)` | `var(--text-body)`, `#4b5563` |
| `var(--color-muted)` | `#6b7280`, `gray` |
| `var(--color-primary)` | `#0d9488`, `teal` |
| `var(--color-destructive)` | `var(--color-danger)`, `#dc2626`, `red` |
| `var(--color-border)` | `var(--border-color)`, `#e5e7eb` |
| `var(--color-border-light)` | `#f3f3f3` |
| `var(--color-background)` | `#f9fafb` |

**Action Buttons in Tables:**
Use Lucide icons inside design system Button components:
```tsx
import { Eye, Edit2, Trash2 } from 'lucide-react';

<Button variant="ghost" size="icon" title="View">
  <Eye size={16} />
</Button>
<Button variant="ghost" size="icon" title="Edit">
  <Edit2 size={16} />
</Button>
<Button variant="ghostDanger" size="icon" title="Delete">
  <Trash2 size={16} />
</Button>
```

**Badge/Status Styling:**
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;  /* pill shape */
  font-size: 0.75rem;
  font-weight: 500;
}

.badgeSuccess {
  background-color: var(--color-success-light);
  color: var(--color-success);
}

.badgeDanger {
  background-color: var(--color-destructive-light);
  color: var(--color-destructive);
}
```

**Button Variant Naming:**
| Use This | NOT This |
|----------|----------|
| `variant="outline"` | `variant="outlineSecondary"` |
| `variant="outlinePrimary"` | - |
| `variant="outlineDanger"` | `variant="destructive"` (mixed) |
| `variant="ghost"` | custom button styles |

**Table Structure Standards:**
```css
.table {
  width: 100%;
  border-collapse: collapse;
}

.table thead {
  background-color: var(--color-background);
}

.table th {
  padding: 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-heading);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--color-border);
}

.table td {
  padding: 1rem;
  vertical-align: middle;
  border-bottom: 1px solid var(--color-border-light);
}

.table tbody tr:hover {
  background-color: var(--color-background);
}
```

**Spacing Standards:**
| Element | Value |
|---------|-------|
| Empty state padding | `3rem` |
| Card margin-bottom | `1.5rem` |
| Actions gap | `0.5rem` |
| Pagination padding | `1rem` |

**Before Creating New Pages:**
1. Reference existing pages (PatientsList.tsx, AppointmentsList.tsx)
2. Use shared styles from `src/styles/shared/` if patterns repeat
3. Follow structure: header → filters → error → loading → table → pagination
4. Verify all CSS uses design system variables

**Pre-PR Checklist:**
- [ ] No hardcoded color values in CSS
- [ ] Using Lucide icons (not emoji)
- [ ] Using design system Button/Input/Select components
- [ ] Table has explicit styling
- [ ] Consistent badge/status styling
- [ ] Responsive breakpoints included
- [ ] Matches visual style of existing listing pages
- [ ] All accessibility requirements met

---

### Code Quality Standards

**TypeScript:**
- Strict mode enabled
- No implicit any
- All imports/exports typed
- Use interface for objects, type for unions

**Error Handling:**
- All async operations wrapped in try/catch
- Meaningful error messages
- Proper error types used
- Never swallow errors silently

**Performance:**
- Debounce search inputs
- Pagination for large lists
- Lazy load components where appropriate
- Optimize re-renders with useMemo/useCallback

**Security:**
- Input validation on both frontend and backend
- SQL injection prevention via Sequelize parameterized queries
- XSS prevention via React's built-in escaping
- CSRF protection via JWT tokens
- Role-based access control enforced

---

### Testing Requirements

**Backend:**
- Unit tests for services and repositories
- Integration tests for API endpoints
- Test error handling paths
- Test authorization/authentication

**Frontend:**
- Component unit tests
- Integration tests for user flows
- Accessibility tests
- Responsive design tests

**Test Coverage:**
- Minimum 70% code coverage
- All critical paths tested
- Edge cases covered
- Error states validated

```