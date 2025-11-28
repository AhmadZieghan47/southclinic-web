# South Physical Clinic - Design System

A comprehensive React + TypeScript design system built with CSS Modules, following atomic design principles.

## Table of Contents

- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Tokens](#tokens)
- [Components](#components)
- [Layouts](#layouts)
- [Best Practices](#best-practices)

---

## Quick Start

### Installation

The design system is already integrated into the project. Import components from the main entry point:

```tsx
import {
  // Atoms
  Button, Input, Select, Badge, Spinner, Checkbox, Radio, Toggle, Avatar, Divider,
  
  // Molecules
  Card, FormField, StatCard, AlertBanner, Tabs, SearchInput, NavItem, Pagination,
  ProgressBar, IconButton,
  
  // Organisms
  Table, Modal, Wizard, ProfileHeader, EmptyState, DescriptionList,
  
  // Layouts
  MainLayout, DashboardLayout, WizardLayout,
  
  // Tokens
  colors, typography, spacing, shadows, radii, zIndex,
} from '@/design-system';
```

### Basic Example

```tsx
import { Button, Card, Input, FormField } from '@/design-system';

function LoginForm() {
  return (
    <Card title="Login" description="Enter your credentials">
      <FormField label="Email" required>
        <Input type="email" placeholder="you@example.com" />
      </FormField>
      <FormField label="Password" required>
        <Input type="password" placeholder="••••••••" />
      </FormField>
      <Button variant="primary" fullWidth>
        Sign In
      </Button>
    </Card>
  );
}
```

---

## Architecture

```
src/design-system/
├── tokens/                 # Design tokens (colors, typography, spacing, etc.)
├── foundations/            # CSS variables, reset, global styles
├── components/
│   ├── atoms/              # Basic building blocks (Button, Input, etc.)
│   ├── molecules/          # Composite components (Card, FormField, etc.)
│   └── organisms/          # Complex components (Table, Modal, etc.)
├── layouts/                # Page layouts (MainLayout, DashboardLayout, etc.)
└── index.ts                # Main export file
```

### Component Structure

Each component follows a consistent file structure:

```
ComponentName/
├── ComponentName.types.ts    # TypeScript interfaces and types
├── ComponentName.module.css  # CSS Module styles
├── ComponentName.tsx         # React component implementation
└── index.ts                  # Public exports
```

---

## Tokens

Design tokens are the foundational values that define the visual language of the design system.

### Colors

| Category | Token | Value | Usage |
|----------|-------|-------|-------|
| **Primary** | `--color-primary` | `#0D9488` (Teal-600) | Primary actions, links |
| | `--color-primary-hover` | `#0F766E` | Primary hover state |
| | `--color-primary-light` | `#CCFBF1` | Primary backgrounds |
| **Secondary** | `--color-secondary` | `#0EA5E9` (Sky-500) | Secondary actions |
| | `--color-secondary-hover` | `#0284C7` | Secondary hover |
| | `--color-secondary-light` | `#E0F2FE` | Secondary backgrounds |
| **Destructive** | `--color-destructive` | `#E11D48` (Rose-600) | Destructive actions |
| | `--color-destructive-hover` | `#BE123C` | Destructive hover |
| | `--color-destructive-light` | `#FFE4E6` | Error backgrounds |
| **Success** | `--color-success` | `#16A34A` | Success states |
| **Warning** | `--color-warning` | `#CA8A04` | Warning states |
| **Info** | `--color-info` | `#0EA5E9` | Info states |
| **Text** | `--color-heading` | `#1F2937` | Headings |
| | `--color-body` | `#4B5563` | Body text |
| | `--color-muted` | `#6B7280` | Muted text |
| **Surface** | `--color-background` | `#F3F4F6` | Page background |
| | `--color-surface` | `#FFFFFF` | Card/component background |
| **Border** | `--color-border` | `#D1D5DB` | Default borders |
| | `--color-border-light` | `#E5E7EB` | Light borders |

### Typography

| Token | Value | Pixels |
|-------|-------|--------|
| `--font-size-xs` | `0.75rem` | 12px |
| `--font-size-sm` | `0.875rem` | 14px |
| `--font-size-base` | `1rem` | 16px |
| `--font-size-lg` | `1.125rem` | 18px |
| `--font-size-xl` | `1.25rem` | 20px |
| `--font-size-2xl` | `1.5rem` | 24px |
| `--font-size-3xl` | `1.875rem` | 30px |
| `--font-size-4xl` | `2.25rem` | 36px |

**Font Weights:**
- `--font-weight-normal`: 400
- `--font-weight-medium`: 500
- `--font-weight-semibold`: 600
- `--font-weight-bold`: 700

**Font Family:** Inter (with system fallbacks)

### Spacing

Based on a 4px grid system:

| Token | Value | Pixels |
|-------|-------|--------|
| `--spacing-1` | `0.25rem` | 4px |
| `--spacing-2` | `0.5rem` | 8px |
| `--spacing-3` | `0.75rem` | 12px |
| `--spacing-4` | `1rem` | 16px |
| `--spacing-5` | `1.25rem` | 20px |
| `--spacing-6` | `1.5rem` | 24px |
| `--spacing-8` | `2rem` | 32px |
| `--spacing-10` | `2.5rem` | 40px |
| `--spacing-12` | `3rem` | 48px |

### Shadows

| Token | Usage |
|-------|-------|
| `--shadow-sm` | Subtle elevation (inputs, small cards) |
| `--shadow` | Default elevation (cards) |
| `--shadow-md` | Medium elevation (dropdowns) |
| `--shadow-lg` | High elevation (modals) |
| `--shadow-xl` | Highest elevation (overlays) |

### Border Radius

| Token | Value | Pixels |
|-------|-------|--------|
| `--radius-sm` | `0.25rem` | 4px |
| `--radius` | `0.5rem` | 8px (default) |
| `--radius-lg` | `0.75rem` | 12px |
| `--radius-xl` | `1rem` | 16px |
| `--radius-full` | `9999px` | Circular |

### Z-Index

| Token | Value | Usage |
|-------|-------|-------|
| `--z-dropdown` | 1000 | Dropdowns |
| `--z-sticky` | 1020 | Sticky elements |
| `--z-fixed` | 1030 | Fixed elements |
| `--z-modal-backdrop` | 1040 | Modal backdrop |
| `--z-modal` | 1050 | Modals |
| `--z-popover` | 1060 | Popovers |
| `--z-tooltip` | 1070 | Tooltips |
| `--z-toast` | 1080 | Toast notifications |

---

## Components

### Atoms

#### Button

Primary action component with multiple variants.

```tsx
import { Button } from '@/design-system';

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outlinePrimary">Outline Primary</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With icons
<Button leftIcon={<Plus size={16} />}>Add Item</Button>
<Button rightIcon={<ArrowRight size={16} />}>Continue</Button>

// States
<Button loading>Saving...</Button>
<Button disabled>Disabled</Button>
<Button fullWidth>Full Width</Button>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive' \| 'outlinePrimary' \| 'outlineSecondary' \| 'outlineDanger' \| 'warning' \| 'danger'` | `'primary'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `fullWidth` | `boolean` | `false` | Full width button |
| `loading` | `boolean` | `false` | Loading state with spinner |
| `leftIcon` | `ReactNode` | - | Icon on the left |
| `rightIcon` | `ReactNode` | - | Icon on the right |

---

#### Input

Text input with support for icons and error states.

```tsx
import { Input } from '@/design-system';
import { Mail, Eye } from 'lucide-react';

// Basic
<Input placeholder="Enter text..." />

// With icons
<Input leftElement={<Mail size={16} />} placeholder="Email" />
<Input rightElement={<Eye size={16} />} type="password" />

// Error state
<Input error errorMessage="This field is required" />

// Sizes
<Input size="sm" />
<Input size="md" />
<Input size="lg" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `error` | `boolean` | `false` | Error state |
| `errorMessage` | `string` | - | Error message text |
| `leftElement` | `ReactNode` | - | Left icon/element |
| `rightElement` | `ReactNode` | - | Right icon/element |
| `fullWidth` | `boolean` | `false` | Full width input |

---

#### Select

Dropdown select component.

```tsx
import { Select } from '@/design-system';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3', disabled: true },
];

<Select options={options} placeholder="Select an option" />
<Select options={options} size="sm" />
<Select options={options} error />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOption[]` | Required | Array of options |
| `placeholder` | `string` | - | Placeholder text |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `error` | `boolean` | `false` | Error state |
| `fullWidth` | `boolean` | `false` | Full width select |
| `leftElement` | `ReactNode` | - | Left icon/element |

---

#### Badge

Status indicators and labels.

```tsx
import { Badge } from '@/design-system';

// Variants
<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Error</Badge>

// Sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>

// Styles
<Badge pill>Rounded</Badge>
<Badge dot variant="success" /> {/* Dot indicator */}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` | Color variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `pill` | `boolean` | `false` | Rounded pill style |
| `dot` | `boolean` | `false` | Dot indicator (no text) |

---

#### Spinner

Loading indicator.

```tsx
import { Spinner } from '@/design-system';

<Spinner />
<Spinner size="sm" />
<Spinner size="lg" />
<Spinner variant="primary" />
<Spinner variant="white" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `variant` | `'default' \| 'primary' \| 'white' \| 'current'` | `'default'` | Color variant |
| `label` | `string` | `'Loading'` | Accessibility label |

---

#### Checkbox

Single checkbox with label.

```tsx
import { Checkbox } from '@/design-system';

<Checkbox label="Accept terms" />
<Checkbox label="Subscribe" checked />
<Checkbox label="Indeterminate" indeterminate />
<Checkbox label="Error" error />
<Checkbox size="sm" label="Small" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Checkbox label |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `error` | `boolean` | `false` | Error state |
| `indeterminate` | `boolean` | `false` | Indeterminate state |

---

#### Radio

Radio button group.

```tsx
import { Radio, RadioGroup } from '@/design-system';

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

<RadioGroup
  name="example"
  options={options}
  value={selected}
  onChange={setSelected}
/>

// Direction
<RadioGroup direction="horizontal" ... />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | Required | Radio group name |
| `options` | `RadioOption[]` | Required | Array of options |
| `value` | `string` | - | Selected value |
| `onChange` | `(value: string) => void` | - | Change handler |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | Layout direction |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `error` | `boolean` | `false` | Error state |

---

#### Toggle

On/off switch.

```tsx
import { Toggle } from '@/design-system';

<Toggle label="Enable notifications" />
<Toggle label="Dark mode" labelPosition="left" />
<Toggle size="sm" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Toggle label |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Label position |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |

---

#### Avatar

User profile images.

```tsx
import { Avatar } from '@/design-system';

<Avatar src="/user.jpg" alt="John Doe" />
<Avatar initials="JD" />
<Avatar initials="AB" color="primary" />
<Avatar size="sm" />
<Avatar size="lg" variant="rounded" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Image URL |
| `alt` | `string` | - | Alt text |
| `initials` | `string` | - | Fallback initials |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size variant |
| `variant` | `'circle' \| 'rounded'` | `'circle'` | Shape variant |
| `color` | `'gray' \| 'primary' \| 'secondary'` | `'gray'` | Background color |

---

#### Divider

Separator line.

```tsx
import { Divider } from '@/design-system';

<Divider />
<Divider orientation="vertical" />
<Divider label="OR" />
<Divider variant="dashed" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation |
| `variant` | `'solid' \| 'dashed'` | `'solid'` | Line style |
| `label` | `string` | - | Center label |
| `labelPosition` | `'left' \| 'center' \| 'right'` | `'center'` | Label position |
| `spacing` | `'sm' \| 'md' \| 'lg'` | `'md'` | Vertical spacing |

---

### Molecules

#### Card

Content container.

```tsx
import { Card, CardHeader, CardContent, CardFooter } from '@/design-system';

// Simple card
<Card title="Card Title" description="Card description">
  Content here
</Card>

// With header actions
<Card
  title="Patients"
  headerActions={<Button size="sm">Add New</Button>}
>
  Content
</Card>

// Composable card
<Card>
  <CardHeader>Custom Header</CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>

// No padding (for tables)
<Card noPadding>
  <Table>...</Table>
</Card>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Card title |
| `description` | `string` | - | Card description |
| `headerActions` | `ReactNode` | - | Header action buttons |
| `footer` | `ReactNode` | - | Footer content |
| `noPadding` | `boolean` | `false` | Remove padding |

---

#### FormField

Form field wrapper with label and error handling.

```tsx
import { FormField, Input, Select } from '@/design-system';

<FormField label="Email" required error="Email is required">
  <Input type="email" error />
</FormField>

<FormField label="Name" helperText="Enter your full name">
  <Input />
</FormField>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Field label |
| `required` | `boolean` | `false` | Show required indicator |
| `error` | `string` | - | Error message |
| `helperText` | `string` | - | Helper text |
| `htmlFor` | `string` | - | Associated input ID |

---

#### StatCard

KPI/statistics display card.

```tsx
import { StatCard } from '@/design-system';
import { Users, TrendingUp } from 'lucide-react';

<StatCard
  title="Total Patients"
  value="1,234"
  change="+12%"
  isPositive
  icon={<Users />}
  variant="primary"
/>

<StatCard
  title="Revenue"
  value="$45,678"
  change="-5%"
  isPositive={false}
  description="vs last month"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | Required | Stat title |
| `value` | `string \| number` | Required | Stat value |
| `change` | `string` | - | Change indicator |
| `isPositive` | `boolean` | `true` | Positive/negative change |
| `icon` | `ReactNode` | - | Stat icon |
| `variant` | `'default' \| 'primary' \| 'secondary'` | `'default'` | Color variant |
| `description` | `string` | - | Additional description |

---

#### AlertBanner

Alert/notification banners.

```tsx
import { AlertBanner } from '@/design-system';

<AlertBanner variant="info" title="Information">
  This is an info message.
</AlertBanner>

<AlertBanner variant="success" title="Success" dismissible>
  Operation completed successfully.
</AlertBanner>

<AlertBanner variant="warning" title="Warning">
  Please review your changes.
</AlertBanner>

<AlertBanner variant="error" title="Error">
  Something went wrong.
</AlertBanner>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Alert variant |
| `title` | `string` | - | Alert title |
| `dismissible` | `boolean` | `false` | Show dismiss button |
| `onDismiss` | `() => void` | - | Dismiss handler |
| `icon` | `ReactNode` | - | Custom icon |
| `action` | `ReactNode` | - | Action button |

---

#### Tabs

Tab navigation.

```tsx
import { Tabs, TabPanel } from '@/design-system';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details', badge: '3' },
  { id: 'history', label: 'History' },
];

<Tabs items={tabs} activeId={activeTab} onChange={setActiveTab} />

<TabPanel id="overview" activeId={activeTab}>
  Overview content
</TabPanel>

// Variants
<Tabs variant="underline" ... />
<Tabs variant="pills" ... />
<Tabs variant="boxed" ... />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TabItem[]` | Required | Tab items |
| `activeId` | `string` | Required | Active tab ID |
| `onChange` | `(id: string) => void` | Required | Change handler |
| `variant` | `'underline' \| 'pills' \| 'boxed'` | `'underline'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `fullWidth` | `boolean` | `false` | Full width tabs |

---

#### SearchInput

Search input with icon and clear button.

```tsx
import { SearchInput } from '@/design-system';

<SearchInput
  placeholder="Search patients..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onClear={() => setQuery('')}
/>

<SearchInput loading />
<SearchInput size="sm" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `clearable` | `boolean` | `true` | Show clear button |
| `onClear` | `() => void` | - | Clear handler |
| `loading` | `boolean` | `false` | Loading state |
| `fullWidth` | `boolean` | `false` | Full width |

---

#### NavItem

Sidebar navigation item.

```tsx
import { NavItem, NavGroup } from '@/design-system';
import { Home, Users } from 'lucide-react';

<NavItem icon={<Home />} label="Dashboard" href="/" active />
<NavItem icon={<Users />} label="Patients" href="/patients" badge="12" />

// Grouped items
<NavGroup icon={<Settings />} label="Settings">
  <NavItem label="Profile" href="/settings/profile" />
  <NavItem label="Security" href="/settings/security" />
</NavGroup>

// Collapsed sidebar
<NavItem icon={<Home />} label="Dashboard" collapsed />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | Required | Item label |
| `icon` | `ReactNode` | - | Item icon |
| `href` | `string` | - | Link URL |
| `active` | `boolean` | `false` | Active state |
| `badge` | `ReactNode` | - | Badge content |
| `collapsed` | `boolean` | `false` | Collapsed mode |
| `disabled` | `boolean` | `false` | Disabled state |
| `onClick` | `() => void` | - | Click handler |

---

#### Pagination

Page navigation.

```tsx
import { Pagination } from '@/design-system';

<Pagination
  currentPage={1}
  totalPages={10}
  onChange={setPage}
/>

<Pagination
  currentPage={5}
  totalPages={20}
  showFirstLast
  siblingCount={2}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | `number` | Required | Current page (1-indexed) |
| `totalPages` | `number` | Required | Total number of pages |
| `onChange` | `(page: number) => void` | Required | Page change handler |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `showFirstLast` | `boolean` | `true` | Show first/last buttons |
| `siblingCount` | `number` | `1` | Pages to show on each side |
| `disabled` | `boolean` | `false` | Disabled state |

---

#### ProgressBar

Progress indicators.

```tsx
import { ProgressBar, StepProgress } from '@/design-system';

// Linear progress
<ProgressBar value={60} max={100} />
<ProgressBar value={75} showLabel />
<ProgressBar value={50} variant="success" striped animated />

// Step progress
<StepProgress
  currentStep={2}
  totalSteps={4}
  labels={['Info', 'Details', 'Review', 'Complete']}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | Required | Current value |
| `max` | `number` | `100` | Maximum value |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `variant` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Color variant |
| `showLabel` | `boolean` | `false` | Show percentage |
| `label` | `string` | - | Custom label |
| `striped` | `boolean` | `false` | Striped style |
| `animated` | `boolean` | `false` | Animated stripes |

---

#### IconButton

Icon-only button.

```tsx
import { IconButton } from '@/design-system';
import { Edit, Trash, MoreHorizontal } from 'lucide-react';

<IconButton icon={<Edit size={16} />} aria-label="Edit" />
<IconButton icon={<Trash size={16} />} variant="danger" aria-label="Delete" />
<IconButton icon={<MoreHorizontal size={16} />} variant="ghost" aria-label="More" />
<IconButton icon={<Plus size={16} />} rounded aria-label="Add" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | Required | Icon element |
| `aria-label` | `string` | Required | Accessibility label |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'default'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `rounded` | `boolean` | `false` | Circular shape |
| `loading` | `boolean` | `false` | Loading state |

---

### Organisms

#### Table

Data table with sorting support.

```tsx
import {
  Table, TableWrapper, TableHeader, TableBody,
  TableRow, TableHead, TableCell
} from '@/design-system';

<TableWrapper>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead sortable sortDirection="asc" onSort={handleSort}>
          Name
        </TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((row) => (
        <TableRow key={row.id} onClick={() => handleClick(row)}>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.email}</TableCell>
          <TableCell>
            <Badge variant="success">{row.status}</Badge>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableWrapper>
```

**TableHead Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sortable` | `boolean` | `false` | Enable sorting |
| `sortDirection` | `'asc' \| 'desc' \| null` | `null` | Sort direction |
| `onSort` | `() => void` | - | Sort click handler |

**TableRow Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `() => void` | - | Row click handler |
| `selected` | `boolean` | `false` | Selected state |

---

#### Modal

Dialog modal.

```tsx
import { Modal, Button } from '@/design-system';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  description="Are you sure you want to proceed?"
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
  <p>Modal content goes here.</p>
</Modal>

// Sizes
<Modal size="sm" ... />
<Modal size="lg" ... />
<Modal size="xl" ... />
<Modal size="full" ... />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | Required | Open state |
| `onClose` | `() => void` | Required | Close handler |
| `title` | `ReactNode` | - | Modal title |
| `description` | `string` | - | Modal description |
| `footer` | `ReactNode` | - | Footer content |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Size variant |
| `closeOnOverlay` | `boolean` | `true` | Close on overlay click |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |
| `showCloseButton` | `boolean` | `true` | Show close button |

---

#### Wizard

Multi-step form wizard.

```tsx
import { Wizard } from '@/design-system';

const steps = [
  {
    id: 'personal',
    title: 'Personal Info',
    content: <PersonalInfoForm />,
    validate: () => validatePersonalInfo(),
  },
  {
    id: 'contact',
    title: 'Contact',
    content: <ContactForm />,
    optional: true,
  },
  {
    id: 'review',
    title: 'Review',
    content: <ReviewStep />,
  },
];

<Wizard
  steps={steps}
  currentStep={step}
  onStepChange={setStep}
  onComplete={handleComplete}
  allowStepClick
  labels={{
    next: 'Continue',
    previous: 'Back',
    complete: 'Submit',
  }}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `WizardStep[]` | Required | Step configuration |
| `currentStep` | `number` | Required | Current step (0-indexed) |
| `onStepChange` | `(step: number) => void` | Required | Step change handler |
| `onComplete` | `() => void` | - | Complete handler |
| `showProgress` | `boolean` | `true` | Show progress indicator |
| `allowStepClick` | `boolean` | `false` | Allow clicking steps |
| `labels` | `object` | - | Custom button labels |

---

#### ProfileHeader

User/patient profile header.

```tsx
import { ProfileHeader, Badge, Button } from '@/design-system';

<ProfileHeader
  avatarSrc="/patient.jpg"
  initials="JD"
  name="John Doe"
  subtitle="Patient ID: PAT-001"
  badges={
    <>
      <Badge variant="success">Active</Badge>
      <Badge variant="info">VIP</Badge>
    </>
  }
  contactInfo={
    <>
      <span>john@example.com</span>
      <span>+1 234 567 890</span>
    </>
  }
  actions={
    <>
      <Button variant="outline">Edit</Button>
      <Button variant="primary">Schedule</Button>
    </>
  }
  warning="Outstanding balance: $150"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `avatarSrc` | `string` | - | Avatar image URL |
| `initials` | `string` | - | Fallback initials |
| `name` | `string` | Required | Display name |
| `subtitle` | `string` | - | Subtitle/ID |
| `badges` | `ReactNode` | - | Status badges |
| `contactInfo` | `ReactNode` | - | Contact info items |
| `actions` | `ReactNode` | - | Action buttons |
| `warning` | `ReactNode` | - | Warning banner |
| `stats` | `ReactNode` | - | Stats display |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |

---

#### EmptyState

Empty/error state display.

```tsx
import { EmptyState, Button } from '@/design-system';

<EmptyState
  variant="empty"
  title="No patients found"
  description="Get started by adding your first patient."
  actions={
    <Button variant="primary">Add Patient</Button>
  }
/>

<EmptyState
  variant="search"
  title="No results"
  description="Try adjusting your search criteria."
/>

<EmptyState
  variant="error"
  title="Something went wrong"
  description="Please try again later."
  actions={<Button variant="outline">Retry</Button>}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'error' \| 'search' \| 'empty'` | `'default'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `icon` | `ReactNode` | - | Custom icon |
| `title` | `string` | Required | Title text |
| `description` | `string` | - | Description text |
| `actions` | `ReactNode` | - | Action buttons |

---

#### DescriptionList

Key-value pairs display.

```tsx
import { DescriptionList } from '@/design-system';
import { Mail, Phone } from 'lucide-react';

const items = [
  { term: 'Full Name', description: 'John Doe' },
  { term: 'Email', description: 'john@example.com', icon: <Mail size={14} /> },
  { term: 'Phone', description: '+1 234 567 890', icon: <Phone size={14} /> },
  { term: 'Address', description: '123 Main St, City', fullWidth: true },
];

// Horizontal layout
<DescriptionList items={items} layout="horizontal" />

// Grid layout
<DescriptionList items={items} layout="grid" columns={2} />

// With dividers
<DescriptionList items={items} dividers />

// Striped rows
<DescriptionList items={items} striped />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `DescriptionItem[]` | Required | List items |
| `layout` | `'horizontal' \| 'vertical' \| 'grid'` | `'horizontal'` | Layout variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `columns` | `1 \| 2 \| 3 \| 4` | `2` | Grid columns |
| `dividers` | `boolean` | `false` | Show dividers |
| `striped` | `boolean` | `false` | Striped rows |

---

## Layouts

### MainLayout

Application shell with sidebar and header.

```tsx
import { MainLayout } from '@/design-system';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard />, path: '/' },
  { id: 'patients', label: 'Patients', icon: <Users />, path: '/patients' },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings />,
    children: [
      { id: 'profile', label: 'Profile', path: '/settings/profile' },
      { id: 'security', label: 'Security', path: '/settings/security' },
    ],
  },
];

<MainLayout
  logoText="South Clinic"
  menuItems={menuItems}
  userName="Dr. Smith"
  notificationCount={3}
  onLogout={handleLogout}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logoText` | `string` | `'South Clinic'` | Logo text |
| `menuItems` | `MenuItem[]` | Required | Sidebar menu items |
| `userName` | `string` | - | User display name |
| `notificationCount` | `number` | - | Notification badge count |
| `onLogout` | `() => void` | - | Logout handler |

---

### DashboardLayout

Dashboard page layout with stats grid.

```tsx
import { DashboardLayout, StatCard, Button } from '@/design-system';

<DashboardLayout
  title="Dashboard"
  subtitle="Welcome back, Dr. Smith"
  breadcrumbs={<Breadcrumbs items={[...]} />}
  actions={
    <>
      <Button variant="outline">Export</Button>
      <Button variant="primary">New Patient</Button>
    </>
  }
  stats={
    <>
      <StatCard title="Patients" value="1,234" />
      <StatCard title="Appointments" value="56" />
      <StatCard title="Revenue" value="$12,345" />
      <StatCard title="Pending" value="8" />
    </>
  }
>
  {/* Main content */}
  <Card title="Recent Activity">
    ...
  </Card>
</DashboardLayout>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | Required | Page title |
| `subtitle` | `string` | - | Page subtitle |
| `breadcrumbs` | `ReactNode` | - | Breadcrumb navigation |
| `actions` | `ReactNode` | - | Header action buttons |
| `stats` | `ReactNode` | - | Stats cards (4-column grid) |
| `children` | `ReactNode` | Required | Main content |

---

### WizardLayout

Multi-step wizard page layout.

```tsx
import { WizardLayout, Card, Button } from '@/design-system';

const steps = [
  { id: 'info', title: 'Patient Info' },
  { id: 'medical', title: 'Medical History' },
  { id: 'insurance', title: 'Insurance' },
  { id: 'review', title: 'Review' },
];

<WizardLayout
  title="New Patient Registration"
  steps={steps}
  currentStep={1}
  backLink={<Button variant="ghost" leftIcon={<ArrowLeft />}>Back to Patients</Button>}
  error={error}
>
  <Card>
    {/* Step content */}
  </Card>
</WizardLayout>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | Required | Page title |
| `steps` | `WizardLayoutStep[]` | Required | Step configuration |
| `currentStep` | `number` | Required | Current step (0-indexed) |
| `backLink` | `ReactNode` | - | Back navigation |
| `error` | `string` | - | Error message |
| `children` | `ReactNode` | Required | Step content |

---

## Best Practices

### 1. Import from the Design System

Always import from the main design system entry point:

```tsx
// ✅ Good
import { Button, Card, Input } from '@/design-system';

// ❌ Avoid
import { Button } from '@/design-system/components/atoms/Button';
```

### 2. Use CSS Variables for Custom Styling

When extending styles, use design tokens:

```css
/* ✅ Good */
.customCard {
  padding: var(--spacing-4);
  border-radius: var(--radius);
  background-color: var(--color-surface);
}

/* ❌ Avoid */
.customCard {
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;
}
```

### 3. Composition over Configuration

Prefer composing components over complex props:

```tsx
// ✅ Good - Composable
<Card>
  <CardHeader>
    <h3>Title</h3>
    <Button size="sm">Action</Button>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// ❌ Avoid - Too many props
<Card
  title="Title"
  titleSize="lg"
  headerAction={<Button>Action</Button>}
  headerActionPosition="right"
  content="Content"
/>
```

### 4. Accessibility

- Always provide `aria-label` for icon-only buttons
- Use semantic HTML elements
- Ensure proper color contrast
- Support keyboard navigation

```tsx
// ✅ Good
<IconButton icon={<Edit />} aria-label="Edit patient" />

// ❌ Avoid
<IconButton icon={<Edit />} />
```

### 5. Consistent Sizing

Use the same size variant across related components:

```tsx
// ✅ Good - Consistent sizing
<FormField label="Search">
  <SearchInput size="sm" />
</FormField>
<Button size="sm">Search</Button>

// ❌ Avoid - Mixed sizes
<FormField label="Search">
  <SearchInput size="lg" />
</FormField>
<Button size="sm">Search</Button>
```

---

## Icons

The design system uses [Lucide React](https://lucide.dev/icons/) for icons.

```tsx
import { Plus, Edit, Trash, Search, ChevronDown } from 'lucide-react';

// Usage in buttons
<Button leftIcon={<Plus size={16} />}>Add</Button>

// Usage in inputs
<Input leftElement={<Search size={16} />} />

// Standalone
<Edit size={20} className="text-muted" />
```

**Recommended icon sizes:**
- Small components (`size="sm"`): 14-16px
- Medium components (`size="md"`): 16-18px
- Large components (`size="lg"`): 18-20px

---

## TypeScript

All components are fully typed. Import types when needed:

```tsx
import type {
  ButtonProps,
  ButtonVariant,
  InputProps,
  ModalProps,
  TableRowProps,
} from '@/design-system';
```

---

## Version

Design System v1.0.0

**Last Updated:** November 2025
