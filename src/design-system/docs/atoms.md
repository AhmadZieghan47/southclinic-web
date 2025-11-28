# Atoms

Atoms are the smallest, most basic building blocks of the design system. They are simple, single-purpose components that cannot be broken down further.

---

## Button

Primary action component with multiple visual variants.

### Import

```tsx
import { Button } from '@/design-system';
```

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `ReactNode` | - | Yes | Button content |
| `variant` | `ButtonVariant` | `'primary'` | No | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Size variant |
| `fullWidth` | `boolean` | `false` | No | Full width button |
| `loading` | `boolean` | `false` | No | Loading state with spinner |
| `leftIcon` | `ReactNode` | - | No | Icon on the left |
| `rightIcon` | `ReactNode` | - | No | Icon on the right |
| `disabled` | `boolean` | `false` | No | Disabled state |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | No | Button type |

### ButtonVariant

```ts
type ButtonVariant = 
  | 'primary'        // Teal background, white text
  | 'secondary'      // Gray background
  | 'outline'        // Border only, transparent background
  | 'ghost'          // No border, no background
  | 'destructive'    // Red background for dangerous actions
  | 'danger'         // Alias for destructive
  | 'warning'        // Yellow/amber background
  | 'outlinePrimary' // Primary color border
  | 'outlineSecondary'// Secondary color border
  | 'outlineDanger'; // Danger color border
```

### Examples

```tsx
// Basic variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With icons
import { Plus, ArrowRight, Save } from 'lucide-react';

<Button leftIcon={<Plus size={16} />}>Add Item</Button>
<Button rightIcon={<ArrowRight size={16} />}>Continue</Button>
<Button leftIcon={<Save size={16} />} loading>Saving...</Button>

// States
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
<Button fullWidth>Full Width Button</Button>

// Form submit
<Button type="submit" variant="primary">
  Submit Form
</Button>
```

### Sizing Guide

| Size | Height | Font Size | Icon Size | Padding |
|------|--------|-----------|-----------|---------|
| `sm` | 32px | 14px | 14-16px | 8px 12px |
| `md` | 40px | 14px | 16-18px | 10px 16px |
| `lg` | 48px | 16px | 18-20px | 12px 20px |

---

## Input

Text input component with support for icons and error states.

### Import

```tsx
import { Input } from '@/design-system';
```

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Size variant |
| `error` | `boolean` | `false` | No | Error state |
| `errorMessage` | `string` | - | No | Error message text |
| `leftElement` | `ReactNode` | - | No | Left icon/element |
| `rightElement` | `ReactNode` | - | No | Right icon/element |
| `fullWidth` | `boolean` | `false` | No | Full width input |
| `type` | `string` | `'text'` | No | Input type |
| `placeholder` | `string` | - | No | Placeholder text |
| `disabled` | `boolean` | `false` | No | Disabled state |

*Extends all native `<input>` HTML attributes.*

### Examples

```tsx
// Basic usage
<Input placeholder="Enter your name" />
<Input type="email" placeholder="Email address" />
<Input type="password" placeholder="Password" />
<Input type="number" placeholder="0" />

// With icons
import { Mail, Eye, EyeOff, Search, Calendar } from 'lucide-react';

<Input 
  leftElement={<Mail size={16} />} 
  placeholder="Email" 
/>

<Input 
  rightElement={<Eye size={16} />} 
  type="password"
  placeholder="Password" 
/>

<Input 
  leftElement={<Search size={16} />}
  rightElement={<span className="text-muted">⌘K</span>}
  placeholder="Search..." 
/>

// Error state
<Input 
  error 
  errorMessage="This field is required" 
  placeholder="Required field"
/>

// Sizes
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />

// Full width
<Input fullWidth placeholder="Full width input" />
```

### Sizing Guide

| Size | Height | Font Size | Icon Size |
|------|--------|-----------|-----------|
| `sm` | 32px | 14px | 14-16px |
| `md` | 40px | 14px | 16px |
| `lg` | 48px | 16px | 18px |

---

## Select

Dropdown select component.

### Import

```tsx
import { Select } from '@/design-system';
import type { SelectOption } from '@/design-system';
```

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `options` | `SelectOption[]` | - | Yes | Array of options |
| `placeholder` | `string` | - | No | Placeholder text |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Size variant |
| `error` | `boolean` | `false` | No | Error state |
| `fullWidth` | `boolean` | `false` | No | Full width select |
| `leftElement` | `ReactNode` | - | No | Left icon/element |
| `disabled` | `boolean` | `false` | No | Disabled state |

*Extends all native `<select>` HTML attributes except `size`.*

### SelectOption Interface

```ts
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

### Examples

```tsx
const statusOptions: SelectOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending', disabled: true },
];

// Basic usage
<Select 
  options={statusOptions} 
  placeholder="Select status" 
/>

// With left icon
import { User } from 'lucide-react';

<Select 
  options={statusOptions}
  leftElement={<User size={16} />}
  placeholder="Select user type"
/>

// Error state
<Select 
  options={statusOptions}
  error
  placeholder="Required"
/>

// Controlled
const [status, setStatus] = useState('');

<Select 
  options={statusOptions}
  value={status}
  onChange={(e) => setStatus(e.target.value)}
/>
```

---

## Badge

Status indicators and labels.

### Import

```tsx
import { Badge } from '@/design-system';
```

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `ReactNode` | - | No | Badge content |
| `variant` | `BadgeVariant` | `'default'` | No | Color variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Size variant |
| `pill` | `boolean` | `false` | No | Rounded pill style |
| `dot` | `boolean` | `false` | No | Dot indicator (no text) |

### BadgeVariant

```ts
type BadgeVariant = 
  | 'default'   // Gray
  | 'primary'   // Teal
  | 'secondary' // Blue
  | 'success'   // Green
  | 'warning'   // Yellow
  | 'danger'    // Red
  | 'info';     // Blue
```

### Examples

```tsx
// Variants
<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Error</Badge>
<Badge variant="info">Info</Badge>

// Sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>

// Pill style (more rounded)
<Badge pill>Rounded</Badge>
<Badge pill variant="success">Active</Badge>

// Dot indicator
<Badge dot variant="success" />
<Badge dot variant="warning" />
<Badge dot variant="danger" />

// In context
<span>
  Status: <Badge variant="success">Active</Badge>
</span>
```

---

## Spinner

Loading indicator.

### Import

```tsx
import { Spinner } from '@/design-system';
```

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Size variant |
| `variant` | `SpinnerVariant` | `'default'` | No | Color variant |
| `label` | `string` | `'Loading'` | No | Accessibility label |

### SpinnerVariant

```ts
type SpinnerVariant = 
  | 'default'  // Gray
  | 'primary'  // Teal
  | 'white'    // White (for dark backgrounds)
  | 'current'; // Inherits current text color
```

### Examples

```tsx
// Basic
<Spinner />

// Sizes
<Spinner size="sm" /> // 16px
<Spinner size="md" /> // 24px
<Spinner size="lg" /> // 32px

// Variants
<Spinner variant="default" />
<Spinner variant="primary" />

// On dark background
<div style={{ background: '#000', padding: 20 }}>
  <Spinner variant="white" />
</div>

// With loading text
<div className="flex items-center gap-2">
  <Spinner size="sm" />
  <span>Loading...</span>
</div>

// Custom label for accessibility
<Spinner label="Loading patient data" />
```

---

## Checkbox

Single checkbox with optional label.

### Import

```tsx
import { Checkbox } from '@/design-system';
```

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | - | No | Checkbox label |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Size variant |
| `error` | `boolean` | `false` | No | Error state |
| `indeterminate` | `boolean` | `false` | No | Indeterminate state |
| `checked` | `boolean` | - | No | Checked state |
| `onChange` | `ChangeEventHandler` | - | No | Change handler |
| `disabled` | `boolean` | `false` | No | Disabled state |

*Extends all native `<input type="checkbox">` HTML attributes.*

### Examples

```tsx
// Basic
<Checkbox label="Accept terms and conditions" />

// Controlled
const [checked, setChecked] = useState(false);

<Checkbox 
  label="Subscribe to newsletter"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>

// Sizes
<Checkbox size="sm" label="Small" />
<Checkbox size="md" label="Medium" />
<Checkbox size="lg" label="Large" />

// States
<Checkbox label="Checked" checked />
<Checkbox label="Indeterminate" indeterminate />
<Checkbox label="Error" error />
<Checkbox label="Disabled" disabled />
<Checkbox label="Disabled checked" disabled checked />

// Without label (use aria-label)
<Checkbox aria-label="Select row" />
```

---

## Radio

Radio button and radio group.

### Import

```tsx
import { Radio, RadioGroup } from '@/design-system';
import type { RadioOption } from '@/design-system';
```

### RadioGroup Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `name` | `string` | - | Yes | Radio group name |
| `options` | `RadioOption[]` | - | Yes | Array of options |
| `value` | `string` | - | No | Selected value |
| `onChange` | `(value: string) => void` | - | No | Change handler |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | No | Layout direction |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Size variant |
| `error` | `boolean` | `false` | No | Error state |
| `disabled` | `boolean` | `false` | No | Disabled state |

### RadioOption Interface

```ts
interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

### Examples

```tsx
const genderOptions: RadioOption[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

// Basic RadioGroup
<RadioGroup
  name="gender"
  options={genderOptions}
  value={gender}
  onChange={setGender}
/>

// Horizontal layout
<RadioGroup
  name="size"
  options={[
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
  ]}
  direction="horizontal"
  value={size}
  onChange={setSize}
/>

// With disabled option
const paymentOptions = [
  { value: 'card', label: 'Credit Card' },
  { value: 'cash', label: 'Cash' },
  { value: 'insurance', label: 'Insurance', disabled: true },
];

<RadioGroup name="payment" options={paymentOptions} />

// Error state
<RadioGroup name="required" options={options} error />

// Individual Radio (rarely used)
<Radio name="option" value="a" label="Option A" />
<Radio name="option" value="b" label="Option B" />
```

---

## Toggle

On/off switch component.

### Import

```tsx
import { Toggle } from '@/design-system';
```

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | - | No | Toggle label |
| `labelPosition` | `'left' \| 'right'` | `'right'` | No | Label position |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Size variant |
| `checked` | `boolean` | - | No | Checked state |
| `onChange` | `ChangeEventHandler` | - | No | Change handler |
| `disabled` | `boolean` | `false` | No | Disabled state |

*Extends all native `<input type="checkbox">` HTML attributes.*

### Examples

```tsx
// Basic
<Toggle label="Enable notifications" />

// Controlled
const [enabled, setEnabled] = useState(false);

<Toggle 
  label="Dark mode"
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
/>

// Label positions
<Toggle label="Label on right" labelPosition="right" />
<Toggle label="Label on left" labelPosition="left" />

// Sizes
<Toggle size="sm" label="Small" />
<Toggle size="md" label="Medium" />
<Toggle size="lg" label="Large" />

// States
<Toggle label="Enabled" checked />
<Toggle label="Disabled" disabled />
<Toggle label="Disabled checked" disabled checked />

// Without label
<Toggle aria-label="Toggle feature" />
```

---

## Avatar

User profile images with fallback initials.

### Import

```tsx
import { Avatar } from '@/design-system';
```

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `src` | `string` | - | No | Image URL |
| `alt` | `string` | - | No | Alt text |
| `initials` | `string` | - | No | Fallback initials |
| `size` | `AvatarSize` | `'md'` | No | Size variant |
| `variant` | `'circle' \| 'rounded'` | `'circle'` | No | Shape variant |
| `color` | `'gray' \| 'primary' \| 'secondary'` | `'gray'` | No | Background color |

### AvatarSize

```ts
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

| Size | Dimensions |
|------|------------|
| `xs` | 24px |
| `sm` | 32px |
| `md` | 40px |
| `lg` | 48px |
| `xl` | 64px |

### Examples

```tsx
// With image
<Avatar src="/path/to/image.jpg" alt="John Doe" />

// With initials fallback
<Avatar initials="JD" />
<Avatar initials="AB" color="primary" />
<Avatar initials="CD" color="secondary" />

// Sizes
<Avatar size="xs" initials="XS" />
<Avatar size="sm" initials="SM" />
<Avatar size="md" initials="MD" />
<Avatar size="lg" initials="LG" />
<Avatar size="xl" initials="XL" />

// Shapes
<Avatar initials="JD" variant="circle" /> // Default
<Avatar initials="JD" variant="rounded" />

// With image and fallback
<Avatar 
  src="/maybe-broken.jpg" 
  alt="User" 
  initials="U" 
/>
```

---

## Divider

Separator line for content.

### Import

```tsx
import { Divider } from '@/design-system';
```

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | No | Orientation |
| `variant` | `'solid' \| 'dashed'` | `'solid'` | No | Line style |
| `label` | `string` | - | No | Center label |
| `labelPosition` | `'left' \| 'center' \| 'right'` | `'center'` | No | Label position |
| `spacing` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Vertical spacing |

### Examples

```tsx
// Basic horizontal divider
<Divider />

// With spacing
<Divider spacing="sm" />
<Divider spacing="md" />
<Divider spacing="lg" />

// Dashed variant
<Divider variant="dashed" />

// With label
<Divider label="OR" />
<Divider label="Section" labelPosition="left" />
<Divider label="End" labelPosition="right" />

// Vertical (in flex container)
<div style={{ display: 'flex', height: 40, alignItems: 'center' }}>
  <span>Left</span>
  <Divider orientation="vertical" />
  <span>Right</span>
</div>
```

---

## File Locations

| Component | Path |
|-----------|------|
| Button | `src/design-system/components/atoms/Button/` |
| Input | `src/design-system/components/atoms/Input/` |
| Select | `src/design-system/components/atoms/Select/` |
| Badge | `src/design-system/components/atoms/Badge/` |
| Spinner | `src/design-system/components/atoms/Spinner/` |
| Checkbox | `src/design-system/components/atoms/Checkbox/` |
| Radio | `src/design-system/components/atoms/Radio/` |
| Toggle | `src/design-system/components/atoms/Toggle/` |
| Avatar | `src/design-system/components/atoms/Avatar/` |
| Divider | `src/design-system/components/atoms/Divider/` |
