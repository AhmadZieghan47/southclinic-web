# Molecules

Molecules are combinations of atoms that form more complex, reusable components.

---

## Card

Content container with optional header, content, and footer sections.

### Import

```tsx
import { Card, CardHeader, CardContent, CardFooter } from '@/design-system';
```

### Card Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `ReactNode` | - | Yes | Card content |
| `title` | `string` | - | No | Card title |
| `description` | `string` | - | No | Card description/subtitle |
| `headerActions` | `ReactNode` | - | No | Header action buttons |
| `footer` | `ReactNode` | - | No | Footer content |
| `noPadding` | `boolean` | `false` | No | Remove content padding |

### Examples

```tsx
// Simple card with title
<Card title="Patient Information">
  <p>Patient details go here.</p>
</Card>

// Card with description
<Card 
  title="Appointments" 
  description="Today's schedule"
>
  <p>Appointment list...</p>
</Card>

// Card with header actions
<Card 
  title="Patients"
  headerActions={
    <Button size="sm" leftIcon={<Plus size={14} />}>
      Add New
    </Button>
  }
>
  <p>Patient table...</p>
</Card>

// Card with footer
<Card 
  title="Form"
  footer={
    <div className="flex gap-2 justify-end">
      <Button variant="outline">Cancel</Button>
      <Button variant="primary">Save</Button>
    </div>
  }
>
  <p>Form fields...</p>
</Card>

// No padding (for tables)
<Card title="Data Table" noPadding>
  <Table>...</Table>
</Card>

// Composable card
<Card>
  <CardHeader>
    <div className="flex justify-between items-center">
      <h3>Custom Header</h3>
      <Badge variant="success">Active</Badge>
    </div>
  </CardHeader>
  <CardContent>
    <p>Custom content layout</p>
  </CardContent>
  <CardFooter>
    <Button fullWidth>Action</Button>
  </CardFooter>
</Card>
```

---

## FormField

Form field wrapper with label, helper text, and error handling.

### Import

```tsx
import { FormField } from '@/design-system';
```

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | - | No | Field label |
| `required` | `boolean` | `false` | No | Show required indicator (*) |
| `error` | `string` | - | No | Error message |
| `helperText` | `string` | - | No | Helper text below input |
| `htmlFor` | `string` | - | No | Associated input ID |
| `children` | `ReactNode` | - | Yes | Form control (Input, Select, etc.) |
| `className` | `string` | - | No | Additional CSS class |

### Examples

```tsx
// Basic usage
<FormField label="Email" htmlFor="email">
  <Input id="email" type="email" placeholder="you@example.com" />
</FormField>

// Required field
<FormField label="Full Name" required htmlFor="name">
  <Input id="name" placeholder="John Doe" />
</FormField>

// With helper text
<FormField 
  label="Password" 
  helperText="Must be at least 8 characters"
  htmlFor="password"
>
  <Input id="password" type="password" />
</FormField>

// With error
<FormField 
  label="Email" 
  required 
  error="Please enter a valid email address"
  htmlFor="email"
>
  <Input id="email" type="email" error />
</FormField>

// With Select
<FormField label="Status" htmlFor="status">
  <Select 
    id="status"
    options={[
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ]}
  />
</FormField>

// Complete form example
<form onSubmit={handleSubmit}>
  <FormField label="First Name" required error={errors.firstName}>
    <Input {...register('firstName')} error={!!errors.firstName} />
  </FormField>
  
  <FormField label="Last Name" required error={errors.lastName}>
    <Input {...register('lastName')} error={!!errors.lastName} />
  </FormField>
  
  <FormField label="Email" required error={errors.email}>
    <Input type="email" {...register('email')} error={!!errors.email} />
  </FormField>
  
  <Button type="submit" variant="primary">Submit</Button>
</form>
```

---

## StatCard

KPI/statistics display card for dashboards.

### Import

```tsx
import { StatCard } from '@/design-system';
```

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | `string` | - | Yes | Stat title/label |
| `value` | `string \| number` | - | Yes | Stat value |
| `change` | `string` | - | No | Change indicator (e.g., "+12%") |
| `isPositive` | `boolean` | `true` | No | Positive/negative change |
| `icon` | `ReactNode` | - | No | Stat icon |
| `variant` | `StatCardVariant` | `'default'` | No | Color variant |
| `description` | `string` | - | No | Additional description |

### StatCardVariant

```ts
type StatCardVariant = 'default' | 'primary' | 'secondary';
```

### Examples

```tsx
import { Users, Calendar, DollarSign, Clock } from 'lucide-react';

// Basic
<StatCard 
  title="Total Patients" 
  value="1,234" 
/>

// With change indicator
<StatCard 
  title="Total Patients" 
  value="1,234"
  change="+12%"
  isPositive={true}
/>

// Negative change
<StatCard 
  title="Cancellations" 
  value="23"
  change="-5%"
  isPositive={false}
/>

// With icon
<StatCard 
  title="Total Patients" 
  value="1,234"
  change="+12%"
  isPositive
  icon={<Users size={24} />}
/>

// Color variants
<StatCard 
  title="Active Patients" 
  value="892"
  icon={<Users size={24} />}
  variant="primary"
/>

<StatCard 
  title="Appointments" 
  value="56"
  icon={<Calendar size={24} />}
  variant="secondary"
/>

// With description
<StatCard 
  title="Revenue" 
  value="$45,678"
  change="+8.2%"
  isPositive
  description="vs last month"
  icon={<DollarSign size={24} />}
/>

// Dashboard grid example
<div className="grid grid-cols-4 gap-4">
  <StatCard title="Patients" value="1,234" icon={<Users />} change="+12%" isPositive />
  <StatCard title="Appointments" value="56" icon={<Calendar />} change="+5%" isPositive />
  <StatCard title="Revenue" value="$45K" icon={<DollarSign />} change="-2%" isPositive={false} />
  <StatCard title="Wait Time" value="12m" icon={<Clock />} change="-15%" isPositive />
</div>
```

---

## AlertBanner

Alert and notification banners.

### Import

```tsx
import { AlertBanner } from '@/design-system';
```

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `AlertVariant` | `'info'` | No | Alert variant |
| `title` | `string` | - | No | Alert title |
| `children` | `ReactNode` | - | Yes | Alert message content |
| `dismissible` | `boolean` | `false` | No | Show dismiss button |
| `onDismiss` | `() => void` | - | No | Dismiss handler |
| `icon` | `ReactNode` | - | No | Custom icon |
| `action` | `ReactNode` | - | No | Action button |

### AlertVariant

```ts
type AlertVariant = 'info' | 'success' | 'warning' | 'error';
```

### Examples

```tsx
// Info alert
<AlertBanner variant="info" title="Information">
  Your session will expire in 5 minutes.
</AlertBanner>

// Success alert
<AlertBanner variant="success" title="Success!">
  Patient record saved successfully.
</AlertBanner>

// Warning alert
<AlertBanner variant="warning" title="Warning">
  Please review the patient's allergies before proceeding.
</AlertBanner>

// Error alert
<AlertBanner variant="error" title="Error">
  Failed to save patient record. Please try again.
</AlertBanner>

// Dismissible
const [show, setShow] = useState(true);

{show && (
  <AlertBanner 
    variant="info"
    title="New Feature"
    dismissible
    onDismiss={() => setShow(false)}
  >
    Check out our new appointment scheduling system!
  </AlertBanner>
)}

// With action button
<AlertBanner 
  variant="warning"
  title="Outstanding Balance"
  action={<Button size="sm" variant="outline">Pay Now</Button>}
>
  Patient has an outstanding balance of $150.
</AlertBanner>

// Custom icon
import { Bell } from 'lucide-react';

<AlertBanner 
  variant="info"
  icon={<Bell size={20} />}
  title="Reminder"
>
  You have 3 appointments today.
</AlertBanner>
```

---

## Tabs

Tab navigation component.

### Import

```tsx
import { Tabs, TabPanel } from '@/design-system';
import type { TabItem } from '@/design-system';
```

### Tabs Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `items` | `TabItem[]` | - | Yes | Tab items configuration |
| `activeId` | `string` | - | Yes | Active tab ID |
| `onChange` | `(id: string) => void` | - | Yes | Tab change handler |
| `variant` | `TabVariant` | `'underline'` | No | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Size variant |
| `fullWidth` | `boolean` | `false` | No | Full width tabs |

### TabItem Interface

```ts
interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
}
```

### TabVariant

```ts
type TabVariant = 'underline' | 'pills' | 'boxed';
```

### TabPanel Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | `string` | - | Yes | Panel ID (must match tab ID) |
| `activeId` | `string` | - | Yes | Currently active tab ID |
| `children` | `ReactNode` | - | Yes | Panel content |

### Examples

```tsx
const [activeTab, setActiveTab] = useState('overview');

const tabs: TabItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'history', label: 'History', badge: '12' },
  { id: 'settings', label: 'Settings', disabled: true },
];

// Basic tabs
<Tabs 
  items={tabs} 
  activeId={activeTab} 
  onChange={setActiveTab} 
/>

<TabPanel id="overview" activeId={activeTab}>
  <p>Overview content</p>
</TabPanel>
<TabPanel id="details" activeId={activeTab}>
  <p>Details content</p>
</TabPanel>
<TabPanel id="history" activeId={activeTab}>
  <p>History content</p>
</TabPanel>

// Variants
<Tabs variant="underline" items={tabs} activeId={activeTab} onChange={setActiveTab} />
<Tabs variant="pills" items={tabs} activeId={activeTab} onChange={setActiveTab} />
<Tabs variant="boxed" items={tabs} activeId={activeTab} onChange={setActiveTab} />

// With icons
import { User, FileText, Clock } from 'lucide-react';

const tabsWithIcons: TabItem[] = [
  { id: 'profile', label: 'Profile', icon: <User size={16} /> },
  { id: 'documents', label: 'Documents', icon: <FileText size={16} /> },
  { id: 'activity', label: 'Activity', icon: <Clock size={16} /> },
];

<Tabs items={tabsWithIcons} activeId={activeTab} onChange={setActiveTab} />

// Full width
<Tabs fullWidth items={tabs} activeId={activeTab} onChange={setActiveTab} />

// Sizes
<Tabs size="sm" items={tabs} activeId={activeTab} onChange={setActiveTab} />
<Tabs size="lg" items={tabs} activeId={activeTab} onChange={setActiveTab} />
```

---

## SearchInput

Search input with icon, clear button, and loading state.

### Import

```tsx
import { SearchInput } from '@/design-system';
```

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Size variant |
| `clearable` | `boolean` | `true` | No | Show clear button when has value |
| `onClear` | `() => void` | - | No | Clear button handler |
| `loading` | `boolean` | `false` | No | Loading state |
| `fullWidth` | `boolean` | `false` | No | Full width |

*Extends all native `<input>` HTML attributes.*

### Examples

```tsx
// Basic
<SearchInput placeholder="Search patients..." />

// Controlled with clear
const [query, setQuery] = useState('');

<SearchInput 
  placeholder="Search..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onClear={() => setQuery('')}
/>

// Loading state
<SearchInput 
  placeholder="Searching..."
  loading
/>

// Sizes
<SearchInput size="sm" placeholder="Small" />
<SearchInput size="md" placeholder="Medium" />
<SearchInput size="lg" placeholder="Large" />

// Full width
<SearchInput fullWidth placeholder="Search entire database..." />

// Debounced search example
const [query, setQuery] = useState('');
const [isSearching, setIsSearching] = useState(false);

const debouncedSearch = useMemo(
  () => debounce((q: string) => {
    setIsSearching(true);
    searchPatients(q).finally(() => setIsSearching(false));
  }, 300),
  []
);

<SearchInput 
  placeholder="Search patients..."
  value={query}
  onChange={(e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  }}
  onClear={() => {
    setQuery('');
    debouncedSearch('');
  }}
  loading={isSearching}
/>
```

---

## NavItem

Sidebar navigation item.

### Import

```tsx
import { NavItem, NavGroup } from '@/design-system';
```

### NavItem Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | - | Yes | Item label |
| `icon` | `ReactNode` | - | No | Item icon |
| `href` | `string` | - | No | Link URL (renders as `<a>`) |
| `active` | `boolean` | `false` | No | Active state |
| `badge` | `ReactNode` | - | No | Badge content |
| `collapsed` | `boolean` | `false` | No | Collapsed mode (icon only) |
| `disabled` | `boolean` | `false` | No | Disabled state |
| `onClick` | `() => void` | - | No | Click handler |

### NavGroup Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | - | Yes | Group label |
| `icon` | `ReactNode` | - | No | Group icon |
| `children` | `ReactNode` | - | Yes | Child NavItems |
| `defaultOpen` | `boolean` | `false` | No | Initially open |
| `collapsed` | `boolean` | `false` | No | Collapsed mode |

### Examples

```tsx
import { Home, Users, Calendar, Settings, FileText } from 'lucide-react';

// Basic navigation items
<NavItem icon={<Home size={20} />} label="Dashboard" href="/" active />
<NavItem icon={<Users size={20} />} label="Patients" href="/patients" />
<NavItem icon={<Calendar size={20} />} label="Appointments" href="/appointments" />

// With badge
<NavItem 
  icon={<Calendar size={20} />} 
  label="Appointments" 
  href="/appointments"
  badge="5"
/>

// Disabled
<NavItem 
  icon={<FileText size={20} />} 
  label="Reports" 
  href="/reports"
  disabled
/>

// Grouped items
<NavGroup 
  icon={<Settings size={20} />} 
  label="Settings"
  defaultOpen
>
  <NavItem label="Profile" href="/settings/profile" />
  <NavItem label="Security" href="/settings/security" />
  <NavItem label="Notifications" href="/settings/notifications" />
</NavGroup>

// Collapsed sidebar (icon only)
<NavItem icon={<Home size={20} />} label="Dashboard" href="/" collapsed />
<NavItem icon={<Users size={20} />} label="Patients" href="/patients" collapsed />

// Button (no href)
<NavItem 
  icon={<LogOut size={20} />} 
  label="Logout" 
  onClick={handleLogout}
/>
```

---

## Pagination

Page navigation component.

### Import

```tsx
import { Pagination } from '@/design-system';
```

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `currentPage` | `number` | - | Yes | Current page (1-indexed) |
| `totalPages` | `number` | - | Yes | Total number of pages |
| `onChange` | `(page: number) => void` | - | Yes | Page change handler |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Size variant |
| `showFirstLast` | `boolean` | `true` | No | Show first/last page buttons |
| `siblingCount` | `number` | `1` | No | Pages to show on each side of current |
| `disabled` | `boolean` | `false` | No | Disabled state |

### Examples

```tsx
const [page, setPage] = useState(1);
const totalPages = 10;

// Basic
<Pagination 
  currentPage={page}
  totalPages={totalPages}
  onChange={setPage}
/>

// Without first/last buttons
<Pagination 
  currentPage={page}
  totalPages={totalPages}
  onChange={setPage}
  showFirstLast={false}
/>

// More sibling pages
<Pagination 
  currentPage={page}
  totalPages={20}
  onChange={setPage}
  siblingCount={2}
/>

// Sizes
<Pagination size="sm" currentPage={page} totalPages={totalPages} onChange={setPage} />
<Pagination size="md" currentPage={page} totalPages={totalPages} onChange={setPage} />
<Pagination size="lg" currentPage={page} totalPages={totalPages} onChange={setPage} />

// Disabled
<Pagination 
  currentPage={page}
  totalPages={totalPages}
  onChange={setPage}
  disabled
/>

// With table
<Card noPadding>
  <Table>...</Table>
  <div className="p-4 border-t flex justify-between items-center">
    <span className="text-sm text-muted">Showing 1-10 of 100</span>
    <Pagination 
      currentPage={page}
      totalPages={10}
      onChange={setPage}
      size="sm"
    />
  </div>
</Card>
```

---

## ProgressBar

Linear and step progress indicators.

### Import

```tsx
import { ProgressBar, StepProgress } from '@/design-system';
```

### ProgressBar Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | `number` | - | Yes | Current value |
| `max` | `number` | `100` | No | Maximum value |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Size variant |
| `variant` | `ProgressBarVariant` | `'primary'` | No | Color variant |
| `showLabel` | `boolean` | `false` | No | Show percentage label |
| `label` | `string` | - | No | Custom label text |
| `striped` | `boolean` | `false` | No | Striped style |
| `animated` | `boolean` | `false` | No | Animated stripes |

### StepProgress Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `currentStep` | `number` | - | Yes | Current step (0-indexed) |
| `totalSteps` | `number` | - | Yes | Total number of steps |
| `labels` | `string[]` | - | No | Step labels |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Size variant |

### ProgressBarVariant

```ts
type ProgressBarVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';
```

### Examples

```tsx
// Basic linear progress
<ProgressBar value={60} />

// With label
<ProgressBar value={75} showLabel />
<ProgressBar value={50} label="Uploading files..." showLabel />

// Variants
<ProgressBar value={80} variant="primary" />
<ProgressBar value={100} variant="success" />
<ProgressBar value={40} variant="warning" />
<ProgressBar value={20} variant="danger" />

// Sizes
<ProgressBar value={60} size="sm" />
<ProgressBar value={60} size="md" />
<ProgressBar value={60} size="lg" />

// Striped and animated
<ProgressBar value={60} striped />
<ProgressBar value={60} striped animated />

// Custom max value
<ProgressBar value={3} max={10} showLabel /> // Shows 30%

// Step progress
<StepProgress 
  currentStep={1}
  totalSteps={4}
/>

// Step progress with labels
<StepProgress 
  currentStep={2}
  totalSteps={4}
  labels={['Info', 'Details', 'Review', 'Complete']}
/>

// Upload progress example
const [progress, setProgress] = useState(0);

<ProgressBar 
  value={progress}
  label="Uploading document..."
  showLabel
  variant={progress === 100 ? 'success' : 'primary'}
/>
```

---

## IconButton

Icon-only button for compact actions.

### Import

```tsx
import { IconButton } from '@/design-system';
```

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `icon` | `ReactNode` | - | Yes | Icon element |
| `aria-label` | `string` | - | Yes | Accessibility label (required) |
| `variant` | `IconButtonVariant` | `'default'` | No | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Size variant |
| `rounded` | `boolean` | `false` | No | Circular shape |
| `loading` | `boolean` | `false` | No | Loading state |
| `disabled` | `boolean` | `false` | No | Disabled state |

### IconButtonVariant

```ts
type IconButtonVariant = 'default' | 'primary' | 'secondary' | 'ghost' | 'danger';
```

### Examples

```tsx
import { Edit, Trash, MoreHorizontal, Plus, X, Settings } from 'lucide-react';

// Basic
<IconButton icon={<Edit size={16} />} aria-label="Edit" />

// Variants
<IconButton icon={<Edit size={16} />} variant="default" aria-label="Edit" />
<IconButton icon={<Plus size={16} />} variant="primary" aria-label="Add" />
<IconButton icon={<Settings size={16} />} variant="secondary" aria-label="Settings" />
<IconButton icon={<MoreHorizontal size={16} />} variant="ghost" aria-label="More options" />
<IconButton icon={<Trash size={16} />} variant="danger" aria-label="Delete" />

// Sizes
<IconButton icon={<Edit size={14} />} size="sm" aria-label="Edit" />
<IconButton icon={<Edit size={16} />} size="md" aria-label="Edit" />
<IconButton icon={<Edit size={18} />} size="lg" aria-label="Edit" />

// Rounded (circular)
<IconButton icon={<Plus size={16} />} rounded aria-label="Add" />
<IconButton icon={<X size={16} />} rounded variant="ghost" aria-label="Close" />

// Loading
<IconButton icon={<Save size={16} />} loading aria-label="Saving" />

// In table row
<TableCell>
  <div className="flex gap-1">
    <IconButton icon={<Edit size={14} />} size="sm" aria-label="Edit row" />
    <IconButton icon={<Trash size={14} />} size="sm" variant="danger" aria-label="Delete row" />
  </div>
</TableCell>

// Card header action
<Card
  title="Patients"
  headerActions={
    <IconButton icon={<Plus size={16} />} variant="primary" aria-label="Add patient" />
  }
>
  ...
</Card>
```

---

## File Locations

| Component | Path |
|-----------|------|
| Card | `src/design-system/components/molecules/Card/` |
| FormField | `src/design-system/components/molecules/FormField/` |
| StatCard | `src/design-system/components/molecules/StatCard/` |
| AlertBanner | `src/design-system/components/molecules/AlertBanner/` |
| Tabs | `src/design-system/components/molecules/Tab/` |
| SearchInput | `src/design-system/components/molecules/SearchInput/` |
| NavItem | `src/design-system/components/molecules/NavItem/` |
| Pagination | `src/design-system/components/molecules/Pagination/` |
| ProgressBar | `src/design-system/components/molecules/ProgressBar/` |
| IconButton | `src/design-system/components/molecules/IconButton/` |
