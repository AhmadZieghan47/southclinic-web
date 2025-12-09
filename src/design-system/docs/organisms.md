# Organisms

Organisms are complex components composed of atoms, molecules, and other organisms that form distinct sections of an interface.

---

## Table

Data table with sorting, selection, and clickable rows.

### Import

```tsx
import {
  Table,
  TableWrapper,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/design-system';
```

### Component Props

#### TableWrapper

Wraps table with overflow handling and border styling.

| Prop       | Type        | Default | Required | Description   |
| ---------- | ----------- | ------- | -------- | ------------- |
| `children` | `ReactNode` | -       | Yes      | Table element |

#### Table

| Prop       | Type        | Default | Required | Description               |
| ---------- | ----------- | ------- | -------- | ------------------------- |
| `children` | `ReactNode` | -       | Yes      | TableHeader and TableBody |

#### TableHead

| Prop            | Type                      | Default | Required | Description            |
| --------------- | ------------------------- | ------- | -------- | ---------------------- |
| `children`      | `ReactNode`               | -       | No       | Header cell content    |
| `sortable`      | `boolean`                 | `false` | No       | Enable sorting         |
| `sortDirection` | `'asc' \| 'desc' \| null` | `null`  | No       | Current sort direction |
| `onSort`        | `() => void`              | -       | No       | Sort click handler     |

#### TableRow

| Prop       | Type         | Default | Required | Description       |
| ---------- | ------------ | ------- | -------- | ----------------- |
| `children` | `ReactNode`  | -       | Yes      | Table cells       |
| `onClick`  | `() => void` | -       | No       | Row click handler |
| `selected` | `boolean`    | `false` | No       | Selected state    |

#### TableCell

| Prop       | Type        | Default | Required | Description  |
| ---------- | ----------- | ------- | -------- | ------------ |
| `children` | `ReactNode` | -       | No       | Cell content |

### Examples

```tsx
// Basic table
<TableWrapper>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>John Doe</TableCell>
        <TableCell>john@example.com</TableCell>
        <TableCell><Badge variant="success">Active</Badge></TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Jane Smith</TableCell>
        <TableCell>jane@example.com</TableCell>
        <TableCell><Badge variant="warning">Pending</Badge></TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableWrapper>

// Sortable columns
const [sortColumn, setSortColumn] = useState<string | null>('name');
const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

const handleSort = (column: string) => {
  if (sortColumn === column) {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  } else {
    setSortColumn(column);
    setSortDirection('asc');
  }
};

<TableWrapper>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead
          sortable
          sortDirection={sortColumn === 'name' ? sortDirection : null}
          onSort={() => handleSort('name')}
        >
          Name
        </TableHead>
        <TableHead
          sortable
          sortDirection={sortColumn === 'email' ? sortDirection : null}
          onSort={() => handleSort('email')}
        >
          Email
        </TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {sortedData.map((row) => (
        <TableRow key={row.id}>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.email}</TableCell>
          <TableCell><Badge>{row.status}</Badge></TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableWrapper>

// Clickable rows
<TableWrapper>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Patient</TableHead>
        <TableHead>Appointment</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {patients.map((patient) => (
        <TableRow
          key={patient.id}
          onClick={() => navigate(`/patients/${patient.id}`)}
        >
          <TableCell>{patient.name}</TableCell>
          <TableCell>{patient.nextAppointment}</TableCell>
          <TableCell>
            <IconButton icon={<Eye size={14} />} aria-label="View" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableWrapper>

// Selected row
<TableRow selected onClick={() => setSelected(row.id)}>
  ...
</TableRow>

// Empty state
<TableWrapper>
  <Table>
    <TableHeader>...</TableHeader>
    <TableBody>
      {data.length === 0 ? (
        <TableRow>
          <TableCell colSpan={3}>
            <EmptyState
              variant="empty"
              title="No patients found"
              actions={<Button>Add Patient</Button>}
            />
          </TableCell>
        </TableRow>
      ) : (
        data.map(...)
      )}
    </TableBody>
  </Table>
</TableWrapper>
```

---

## Modal

Dialog modal with header, body, and footer sections.

### Import

```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/design-system';
```

### Modal Props

| Prop              | Type         | Default | Required | Description            |
| ----------------- | ------------ | ------- | -------- | ---------------------- |
| `isOpen`          | `boolean`    | -       | Yes      | Open state             |
| `onClose`         | `() => void` | -       | Yes      | Close handler          |
| `title`           | `ReactNode`  | -       | No       | Modal title            |
| `description`     | `string`     | -       | No       | Modal description      |
| `children`        | `ReactNode`  | -       | Yes      | Modal content          |
| `footer`          | `ReactNode`  | -       | No       | Footer content         |
| `size`            | `ModalSize`  | `'md'`  | No       | Size variant           |
| `closeOnOverlay`  | `boolean`    | `true`  | No       | Close on overlay click |
| `closeOnEscape`   | `boolean`    | `true`  | No       | Close on Escape key    |
| `showCloseButton` | `boolean`    | `true`  | No       | Show close button      |
| `className`       | `string`     | -       | No       | Additional CSS class   |

### ModalSize

```ts
type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
```

| Size   | Max Width    |
| ------ | ------------ |
| `sm`   | 400px        |
| `md`   | 500px        |
| `lg`   | 700px        |
| `xl`   | 900px        |
| `full` | 100vw - 32px |

### Examples

```tsx
const [isOpen, setIsOpen] = useState(false);

// Basic modal
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
>
  <p>Modal content goes here.</p>
</Modal>

// With description and footer
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  description="This action cannot be undone."
  footer={
    <>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleConfirm}>
        Confirm
      </Button>
    </>
  }
>
  <p>Are you sure you want to proceed?</p>
</Modal>

// Delete confirmation
<Modal
  isOpen={showDelete}
  onClose={() => setShowDelete(false)}
  title="Delete Patient"
  description="This will permanently delete the patient record."
  size="sm"
  footer={
    <>
      <Button variant="outline" onClick={() => setShowDelete(false)}>
        Cancel
      </Button>
      <Button variant="destructive" onClick={handleDelete}>
        Delete
      </Button>
    </>
  }
>
  <AlertBanner variant="warning">
    All associated appointments and records will also be deleted.
  </AlertBanner>
</Modal>

// Form modal
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Add Patient"
  size="lg"
  footer={
    <>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSubmit} loading={isSubmitting}>
        Save Patient
      </Button>
    </>
  }
>
  <form>
    <FormField label="Name" required>
      <Input placeholder="Patient name" />
    </FormField>
    <FormField label="Email">
      <Input type="email" placeholder="Email address" />
    </FormField>
    <FormField label="Phone">
      <Input type="tel" placeholder="Phone number" />
    </FormField>
  </form>
</Modal>

// Prevent close on overlay
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  closeOnOverlay={false}
  closeOnEscape={false}
  showCloseButton={false}
  title="Processing..."
>
  <div className="flex items-center gap-3">
    <Spinner />
    <span>Please wait...</span>
  </div>
</Modal>

// Composable modal
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <ModalHeader
    title="Custom Modal"
    description="With custom layout"
    onClose={() => setIsOpen(false)}
  />
  <ModalBody>
    <p>Custom body content</p>
  </ModalBody>
  <ModalFooter>
    <Button onClick={() => setIsOpen(false)}>Close</Button>
  </ModalFooter>
</Modal>
```

---

## Wizard

Multi-step form wizard with progress indicator.

### Import

```tsx
import { Wizard, WizardHeader, WizardContent, WizardFooter } from '@/design-system';
import type { WizardStep } from '@/design-system';
```

### Wizard Props

| Prop             | Type                     | Default | Required | Description                       |
| ---------------- | ------------------------ | ------- | -------- | --------------------------------- |
| `steps`          | `WizardStep[]`           | -       | Yes      | Step configuration                |
| `currentStep`    | `number`                 | -       | Yes      | Current step (0-indexed)          |
| `onStepChange`   | `(step: number) => void` | -       | Yes      | Step change handler               |
| `onComplete`     | `() => void`             | -       | No       | Complete handler                  |
| `showProgress`   | `boolean`                | `true`  | No       | Show progress indicator           |
| `allowStepClick` | `boolean`                | `false` | No       | Allow clicking on completed steps |
| `labels`         | `object`                 | -       | No       | Custom button labels              |
| `className`      | `string`                 | -       | No       | Additional CSS class              |

### WizardStep Interface

```ts
interface WizardStep {
  id: string;
  title: string;
  description?: string;
  content: ReactNode;
  validate?: () => boolean | Promise<boolean>;
  optional?: boolean;
}
```

### Examples

```tsx
const [currentStep, setCurrentStep] = useState(0);

const steps: WizardStep[] = [
  {
    id: 'personal',
    title: 'Personal Info',
    description: 'Basic information',
    content: <PersonalInfoForm />,
    validate: async () => {
      const isValid = await validatePersonalInfo();
      return isValid;
    },
  },
  {
    id: 'contact',
    title: 'Contact',
    content: <ContactForm />,
  },
  {
    id: 'medical',
    title: 'Medical History',
    description: 'Optional',
    content: <MedicalHistoryForm />,
    optional: true,
  },
  {
    id: 'review',
    title: 'Review',
    content: <ReviewStep />,
  },
];

// Basic wizard
<Wizard
  steps={steps}
  currentStep={currentStep}
  onStepChange={setCurrentStep}
  onComplete={handleComplete}
/>

// Allow clicking on completed steps
<Wizard
  steps={steps}
  currentStep={currentStep}
  onStepChange={setCurrentStep}
  onComplete={handleComplete}
  allowStepClick
/>

// Custom labels
<Wizard
  steps={steps}
  currentStep={currentStep}
  onStepChange={setCurrentStep}
  onComplete={handleComplete}
  labels={{
    next: 'Continue',
    previous: 'Back',
    complete: 'Submit Registration',
    skip: 'Skip this step',
  }}
/>

// Without progress indicator
<Wizard
  steps={steps}
  currentStep={currentStep}
  onStepChange={setCurrentStep}
  onComplete={handleComplete}
  showProgress={false}
/>

// Step content example
function PersonalInfoForm() {
  return (
    <div className="space-y-4">
      <FormField label="First Name" required>
        <Input placeholder="First name" />
      </FormField>
      <FormField label="Last Name" required>
        <Input placeholder="Last name" />
      </FormField>
      <FormField label="Date of Birth" required>
        <Input type="date" />
      </FormField>
    </div>
  );
}
```

---

## ProfileHeader

Header for patient/user profile pages.

### Import

```tsx
import { ProfileHeader } from '@/design-system';
```

### Props

| Prop          | Type                   | Default | Required | Description            |
| ------------- | ---------------------- | ------- | -------- | ---------------------- |
| `avatarSrc`   | `string`               | -       | No       | Avatar image URL       |
| `initials`    | `string`               | -       | No       | Fallback initials      |
| `name`        | `string`               | -       | Yes      | Display name           |
| `subtitle`    | `string`               | -       | No       | Subtitle/ID            |
| `badges`      | `ReactNode`            | -       | No       | Status badges          |
| `contactInfo` | `ReactNode`            | -       | No       | Contact information    |
| `actions`     | `ReactNode`            | -       | No       | Action buttons         |
| `warning`     | `ReactNode`            | -       | No       | Warning banner content |
| `stats`       | `ReactNode`            | -       | No       | Stats display          |
| `size`        | `'sm' \| 'md' \| 'lg'` | `'md'`  | No       | Size variant           |

### Examples

```tsx
// Basic profile header
<ProfileHeader
  name="John Doe"
  subtitle="Patient ID: PAT-001"
/>

// With avatar
<ProfileHeader
  avatarSrc="/patients/john-doe.jpg"
  name="John Doe"
  subtitle="Patient ID: PAT-001"
/>

// With initials fallback
<ProfileHeader
  initials="JD"
  name="John Doe"
  subtitle="Patient ID: PAT-001"
/>

// With badges
<ProfileHeader
  initials="JD"
  name="John Doe"
  subtitle="Patient ID: PAT-001"
  badges={
    <>
      <Badge variant="success">Active</Badge>
      <Badge variant="info">VIP</Badge>
      <Badge variant="warning">Allergies</Badge>
    </>
  }
/>

// With contact info
<ProfileHeader
  initials="JD"
  name="John Doe"
  subtitle="Patient ID: PAT-001"
  contactInfo={
    <>
      <span className="flex items-center gap-1">
        <Mail size={14} /> john@example.com
      </span>
      <span className="flex items-center gap-1">
        <Phone size={14} /> +1 (555) 123-4567
      </span>
      <span className="flex items-center gap-1">
        <MapPin size={14} /> New York, NY
      </span>
    </>
  }
/>

// With actions
<ProfileHeader
  initials="JD"
  name="John Doe"
  subtitle="Patient ID: PAT-001"
  actions={
    <>
      <Button variant="outline" leftIcon={<Edit size={16} />}>
        Edit Profile
      </Button>
      <Button variant="primary" leftIcon={<Calendar size={16} />}>
        Schedule Appointment
      </Button>
    </>
  }
/>

// With warning
<ProfileHeader
  initials="JD"
  name="John Doe"
  subtitle="Patient ID: PAT-001"
  warning={
    <>
      <AlertCircle size={16} />
      Outstanding balance: $150.00
    </>
  }
/>

// With stats
<ProfileHeader
  initials="JD"
  name="John Doe"
  subtitle="Patient ID: PAT-001"
  stats={
    <div className="text-right">
      <div className="text-2xl font-bold">12</div>
      <div className="text-sm text-muted">Total Visits</div>
    </div>
  }
/>

// Complete example
<ProfileHeader
  avatarSrc="/patients/john-doe.jpg"
  initials="JD"
  name="John Doe"
  subtitle="Patient ID: PAT-001"
  badges={
    <>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Allergies</Badge>
    </>
  }
  contactInfo={
    <>
      <span>john@example.com</span>
      <span>+1 (555) 123-4567</span>
    </>
  }
  actions={
    <>
      <Button variant="outline">Edit</Button>
      <Button variant="primary">Schedule</Button>
    </>
  }
  warning="Patient has known allergies to Penicillin"
/>
```

---

## EmptyState

Display for empty, error, or no results states.

### Import

```tsx
import { EmptyState } from '@/design-system';
```

### Props

| Prop          | Type                   | Default     | Required | Description      |
| ------------- | ---------------------- | ----------- | -------- | ---------------- |
| `variant`     | `EmptyStateVariant`    | `'default'` | No       | Visual variant   |
| `size`        | `'sm' \| 'md' \| 'lg'` | `'md'`      | No       | Size variant     |
| `icon`        | `ReactNode`            | -           | No       | Custom icon      |
| `title`       | `string`               | -           | Yes      | Title text       |
| `description` | `string`               | -           | No       | Description text |
| `actions`     | `ReactNode`            | -           | No       | Action buttons   |

### EmptyStateVariant

```ts
type EmptyStateVariant = 'default' | 'error' | 'search' | 'empty';
```

| Variant   | Icon        | Use Case            |
| --------- | ----------- | ------------------- |
| `default` | Inbox       | Generic empty state |
| `error`   | AlertCircle | Error states        |
| `search`  | Search      | No search results   |
| `empty`   | FolderOpen  | Empty data          |

### Examples

```tsx
// Default empty state
<EmptyState
  title="No data"
  description="There's nothing here yet."
/>

// Empty data
<EmptyState
  variant="empty"
  title="No patients found"
  description="Get started by adding your first patient."
  actions={
    <Button variant="primary" leftIcon={<Plus size={16} />}>
      Add Patient
    </Button>
  }
/>

// No search results
<EmptyState
  variant="search"
  title="No results found"
  description="Try adjusting your search or filter criteria."
  actions={
    <Button variant="outline" onClick={clearFilters}>
      Clear Filters
    </Button>
  }
/>

// Error state
<EmptyState
  variant="error"
  title="Something went wrong"
  description="We couldn't load the data. Please try again."
  actions={
    <>
      <Button variant="outline" onClick={() => navigate('/')}>
        Go Home
      </Button>
      <Button variant="primary" onClick={retry}>
        Retry
      </Button>
    </>
  }
/>

// Custom icon
import { FileX } from 'lucide-react';

<EmptyState
  icon={<FileX size={40} />}
  title="No documents"
  description="Upload documents to get started."
  actions={
    <Button variant="primary" leftIcon={<Upload size={16} />}>
      Upload Document
    </Button>
  }
/>

// Sizes
<EmptyState size="sm" title="No items" description="Add items to continue." />
<EmptyState size="md" title="No items" description="Add items to continue." />
<EmptyState size="lg" title="No items" description="Add items to continue." />

// In a card
<Card noPadding>
  <Table>...</Table>
  {data.length === 0 && (
    <EmptyState
      variant="empty"
      title="No appointments today"
      description="Schedule appointments to see them here."
    />
  )}
</Card>
```

---

## DescriptionList

Key-value pairs display with multiple layout options.

### Import

```tsx
import { DescriptionList } from '@/design-system';
import type { DescriptionItem } from '@/design-system';
```

### Props

| Prop       | Type                                   | Default        | Required | Description    |
| ---------- | -------------------------------------- | -------------- | -------- | -------------- |
| `items`    | `DescriptionItem[]`                    | -              | Yes      | List items     |
| `layout`   | `'horizontal' \| 'vertical' \| 'grid'` | `'horizontal'` | No       | Layout variant |
| `size`     | `'sm' \| 'md' \| 'lg'`                 | `'md'`         | No       | Size variant   |
| `columns`  | `1 \| 2 \| 3 \| 4`                     | `2`            | No       | Grid columns   |
| `dividers` | `boolean`                              | `false`        | No       | Show dividers  |
| `striped`  | `boolean`                              | `false`        | No       | Striped rows   |

### DescriptionItem Interface

```ts
interface DescriptionItem {
  term: ReactNode;
  description: ReactNode;
  icon?: ReactNode;
  fullWidth?: boolean; // For grid layout
}
```

### Examples

```tsx
const patientInfo: DescriptionItem[] = [
  { term: 'Full Name', description: 'John Doe' },
  { term: 'Date of Birth', description: 'January 15, 1985' },
  { term: 'Gender', description: 'Male' },
  { term: 'Email', description: 'john@example.com' },
  { term: 'Phone', description: '+1 (555) 123-4567' },
  { term: 'Address', description: '123 Main St, New York, NY 10001', fullWidth: true },
];

// Horizontal layout (default)
<DescriptionList items={patientInfo} />

// Vertical layout
<DescriptionList items={patientInfo} layout="vertical" />

// Grid layout
<DescriptionList
  items={patientInfo}
  layout="grid"
  columns={2}
/>

// Grid with more columns
<DescriptionList
  items={patientInfo}
  layout="grid"
  columns={3}
/>

// With dividers
<DescriptionList items={patientInfo} dividers />

// Striped rows
<DescriptionList items={patientInfo} striped />

// With icons
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';

const itemsWithIcons: DescriptionItem[] = [
  { term: 'Name', description: 'John Doe', icon: <User size={14} /> },
  { term: 'Email', description: 'john@example.com', icon: <Mail size={14} /> },
  { term: 'Phone', description: '+1 (555) 123-4567', icon: <Phone size={14} /> },
  { term: 'Address', description: '123 Main St', icon: <MapPin size={14} /> },
];

<DescriptionList items={itemsWithIcons} />

// Sizes
<DescriptionList items={patientInfo} size="sm" />
<DescriptionList items={patientInfo} size="md" />
<DescriptionList items={patientInfo} size="lg" />

// In a card
<Card title="Patient Details">
  <DescriptionList
    items={patientInfo}
    layout="grid"
    columns={2}
    dividers
  />
</Card>

// Medical information example
const medicalInfo: DescriptionItem[] = [
  { term: 'Blood Type', description: 'A+' },
  { term: 'Allergies', description: 'Penicillin, Peanuts' },
  { term: 'Chronic Conditions', description: 'Hypertension, Diabetes Type 2' },
  { term: 'Current Medications', description: 'Metformin 500mg, Lisinopril 10mg', fullWidth: true },
  { term: 'Emergency Contact', description: 'Jane Doe - +1 (555) 987-6543' },
  { term: 'Primary Physician', description: 'Dr. Sarah Smith' },
];

<Card title="Medical Information">
  <DescriptionList
    items={medicalInfo}
    layout="grid"
    columns={2}
  />
</Card>
```

---

## File Locations

| Component       | Path                                                      |
| --------------- | --------------------------------------------------------- |
| Table           | `src/design-system/components/organisms/Table/`           |
| Modal           | `src/design-system/components/organisms/Modal/`           |
| Wizard          | `src/design-system/components/organisms/Wizard/`          |
| ProfileHeader   | `src/design-system/components/organisms/ProfileHeader/`   |
| EmptyState      | `src/design-system/components/organisms/EmptyState/`      |
| DescriptionList | `src/design-system/components/organisms/DescriptionList/` |
