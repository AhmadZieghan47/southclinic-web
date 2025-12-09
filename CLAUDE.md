# AI-Assisted Frontend Development Specification Template

## Project Context

**Project:** South Physical Center (Physiotherapy Clinic Management System)
**Module:** [MODULE_NAME]
**Purpose:** [BRIEF_DESCRIPTION_OF_FEATURE]
**Priority:** [HIGH/MEDIUM/LOW]

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
- **Related Data:** [Connections to other modules - see API Endpoints section]
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

### Integration Points
- **API Base URL:** `http://localhost:3000/api/v1`
- **Authentication:** JWT token in localStorage, auto-attached to requests via interceptor
- **API Endpoints:** RESTful endpoints (see API Reference section)
- **Data Fetching:** Axios with retry logic and exponential backoff
- **Caching Strategy:** Client-side caching via React Query patterns (if implemented)

### Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

---

## API Reference

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
- `DELETE /appointments/:id` - Cancel appointment

**Billing:**
- `GET /payments` - List payments
- `POST /payments` - Record payment
- `GET /expenses` - List expenses
- `POST /expenses` - Record expense
- `GET /invoices` - List invoices
- `POST /invoices` - Create invoice

**Clinical:**
- `GET /treatment-plans` - List treatment plans
- `POST /treatment-plans` - Create treatment plan
- `GET /session-notes` - List session notes
- `POST /session-notes` - Create session note
- `GET /diagnoses` - List diagnoses
- `POST /diagnoses` - Record diagnosis

**Settings:**
- `GET /users` - List users
- `POST /users` - Create user
- `GET /session-types` - List session types
- `POST /session-types` - Create session type
- `GET /insurers` - List insurance companies
- `POST /insurers` - Add insurance company

### Standard Request Parameters

**Pagination:**
```typescript
interface PaginationParams {
  page?: number;      // Default: 1
  pageSize?: number;  // Default: 20, Max: 100
}
```

**Search:**
```typescript
interface SearchParams {
  search?: string;    // Full-text search across relevant fields
}
```

**Sorting:**
```typescript
interface SortParams {
  sortBy?: string;    // Field to sort by
  sortOrder?: 'asc' | 'desc';  // Default: 'desc'
}
```

**Filtering:**
```typescript
interface FilterParams {
  status?: string;    // Filter by status
  dateFrom?: string;  // ISO 8601 date
  dateTo?: string;    // ISO 8601 date
  [key: string]: any; // Module-specific filters
}
```

### Standard Response Format

**Success Response:**
```typescript
interface SuccessResponse<T> {
  success: true;
  data: T;
  meta?: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
  message?: string;
}
```

**Error Response:**
```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;      // Error code (e.g., 'VALIDATION_ERROR')
    message: string;   // Human-readable message
    details?: any;     // Additional error details
    field?: string;    // Field that caused error (for validation)
  };
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `204` - No Content (successful deletion)
- `400` - Bad Request (validation error)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `422` - Unprocessable Entity (business logic error)
- `500` - Internal Server Error

---

## Frontend Code Standards

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

## Naming Conventions

**Frontend:**
- Components: `PascalCase.tsx` (e.g., `PatientsList.tsx`, `CreatePatientWizard.tsx`)
- Hooks: `use{Name}.ts` (e.g., `usePatients.ts`, `useAuth.ts`)
- Types: `{name}.types.ts` (e.g., `patient.types.ts`)
- Styles: `{Component}.module.css`
- Constants: `UPPER_SNAKE_CASE`
- Variables/Functions: `camelCase`

---

## UI Consistency Rules

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

## Code Quality Standards

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
- Input validation on frontend (Zod schemas)
- XSS prevention via React's built-in escaping
- Never store sensitive data in localStorage
- Sanitize user input before display

---

## Component Development Patterns

### Standard Page Structure
```tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/atoms/Button';
import { Spinner } from '@/components/atoms/Spinner';
import { AlertBanner } from '@/components/molecules/AlertBanner';
import styles from './PageName.module.css';

export const PageName = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/endpoint');
      setData(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <AlertBanner type="error" message={error} />;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Page Title</h1>
        <Button onClick={handleAction}>Primary Action</Button>
      </header>

      {/* Content */}
    </div>
  );
};
```

### Form Component Pattern
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/atoms/Button';
import { FormField } from '@/components/molecules/FormField';
import styles from './FormName.module.css';

const schema = z.object({
  fullName: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

type FormData = z.infer<typeof schema>;

export const FormName = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      await apiClient.post('/endpoint', data);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <FormField
        label="Full Name"
        error={errors.fullName?.message}
        required
      >
        <input
          {...register('fullName')}
          className={styles.input}
        />
      </FormField>

      <FormField
        label="Email"
        error={errors.email?.message}
        required
      >
        <input
          type="email"
          {...register('email')}
          className={styles.input}
        />
      </FormField>

      <Button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
};
```

### Table Component Pattern
```tsx
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import styles from './TableName.module.css';

interface TableProps {
  data: Item[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TableName = ({ data, onView, onEdit, onDelete }: TableProps) => {
  if (data.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No items found</p>
      </div>
    );
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>
              <Badge variant={item.status === 'active' ? 'success' : 'default'}>
                {item.status}
              </Badge>
            </td>
            <td className={styles.actions}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onView(item.id)}
                title="View"
              >
                <Eye size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(item.id)}
                title="Edit"
              >
                <Edit2 size={16} />
              </Button>
              <Button
                variant="ghostDanger"
                size="icon"
                onClick={() => onDelete(item.id)}
                title="Delete"
              >
                <Trash2 size={16} />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
```

---

## Testing Requirements

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

**Testing Patterns:**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { PatientsList } from './PatientsList';

describe('PatientsList', () => {
  it('should render patient list', () => {
    render(<PatientsList />);
    expect(screen.getByText('Patients')).toBeInTheDocument();
  });

  it('should handle search input', () => {
    render(<PatientsList />);
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'John' } });
    expect(searchInput).toHaveValue('John');
  });

  it('should show loading state', () => {
    render(<PatientsList />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
```

---

## Frontend Development Checklist

**Before Creating New Components:**
- [ ] Check for existing similar components
- [ ] Review design system for applicable patterns
- [ ] Plan component hierarchy (atomic design)
- [ ] Define TypeScript interfaces
- [ ] Consider accessibility requirements

**Component Implementation:**
- [ ] Component with typed props interface
- [ ] CSS Module created and imported
- [ ] All colors use CSS variables
- [ ] Lucide icons used (not emoji)
- [ ] Accessibility attributes added
- [ ] Responsive styles included
- [ ] Loading states handled
- [ ] Error states handled
- [ ] Empty states handled

**Pre-Deployment Checklist:**
- [ ] Component tested (unit tests)
- [ ] Accessibility verified (keyboard nav, screen readers)
- [ ] Responsive design tested (desktop, tablet, mobile)
- [ ] Browser compatibility verified
- [ ] No console errors/warnings
- [ ] TypeScript compiles without errors
- [ ] Matches design system standards
- [ ] Code reviewed and approved
