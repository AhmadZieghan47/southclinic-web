# Layouts

Layouts are page-level templates that provide consistent structure across different sections of the application.

---

## MainLayout

The primary application shell with sidebar navigation and header.

### Import

```tsx
import { MainLayout } from '@/design-system';
import type { MenuItem } from '@/design-system';
```

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `logoText` | `string` | `'South Clinic'` | No | Logo/brand text |
| `menuItems` | `MenuItem[]` | - | Yes | Sidebar menu configuration |
| `userName` | `string` | - | No | User display name |
| `notificationCount` | `number` | - | No | Notification badge count |
| `onLogout` | `() => void` | - | No | Logout handler |

### MenuItem Interface

```ts
interface MenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  path?: string;
  children?: {
    id: string;
    label: string;
    path: string;
  }[];
}
```

### Features

- **Responsive Sidebar**: Collapsible on smaller screens
- **Header**: With notifications and user menu
- **Active State**: Automatic highlighting based on current route
- **Nested Navigation**: Support for expandable menu groups
- **Content Outlet**: Uses React Router's `<Outlet />` for nested routes

### Examples

```tsx
import { LayoutDashboard, Users, Calendar, FileText, Settings, HelpCircle } from 'lucide-react';

// Menu configuration
const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
    path: '/',
  },
  {
    id: 'patients',
    label: 'Patients',
    icon: <Users size={20} />,
    path: '/patients',
  },
  {
    id: 'appointments',
    label: 'Appointments',
    icon: <Calendar size={20} />,
    path: '/appointments',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: <FileText size={20} />,
    path: '/reports',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings size={20} />,
    children: [
      { id: 'profile', label: 'Profile', path: '/settings/profile' },
      { id: 'security', label: 'Security', path: '/settings/security' },
      { id: 'notifications', label: 'Notifications', path: '/settings/notifications' },
    ],
  },
  {
    id: 'help',
    label: 'Help & Support',
    icon: <HelpCircle size={20} />,
    path: '/help',
  },
];

// Basic usage
<MainLayout
  menuItems={menuItems}
  userName="Dr. Smith"
  notificationCount={3}
  onLogout={() => auth.logout()}
/>

// With custom logo
<MainLayout
  logoText="Medical Center"
  menuItems={menuItems}
  userName="Dr. Smith"
/>

// Without notifications
<MainLayout
  menuItems={menuItems}
  userName="Dr. Smith"
/>

// Router configuration
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <MainLayout
              menuItems={menuItems}
              userName={user?.name}
              notificationCount={notifications.length}
              onLogout={handleLogout}
            />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients/:id" element={<PatientDetail />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="settings/*" element={<Settings />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Sidebar Behavior

| Screen Width | Behavior |
|--------------|----------|
| ≥ 1024px | Sidebar always visible |
| < 1024px | Sidebar hidden, toggle button in header |

### CSS Variables Used

```css
--sidebar-width: 260px;
--sidebar-collapsed-width: 70px;
--header-height: 64px;
```

---

## DashboardLayout

Page layout for dashboard views with header, stats grid, and content sections.

### Import

```tsx
import { DashboardLayout } from '@/design-system';
```

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | `string` | - | Yes | Page title |
| `subtitle` | `string` | - | No | Page subtitle/description |
| `breadcrumbs` | `ReactNode` | - | No | Breadcrumb navigation |
| `actions` | `ReactNode` | - | No | Header action buttons |
| `stats` | `ReactNode` | - | No | Stats cards section |
| `children` | `ReactNode` | - | Yes | Main content |
| `className` | `string` | - | No | Additional CSS class |

### Features

- **Responsive Stats Grid**: 4 columns → 2 columns → 1 column
- **Header with Actions**: Title, subtitle, and action buttons
- **Breadcrumbs Support**: Navigation trail
- **Content Area**: Flexible content section

### Examples

```tsx
// Basic dashboard
<DashboardLayout
  title="Dashboard"
  subtitle="Welcome back, Dr. Smith"
>
  <Card title="Recent Activity">
    <p>Activity content...</p>
  </Card>
</DashboardLayout>

// With breadcrumbs
<DashboardLayout
  title="Patient Management"
  subtitle="View and manage all patients"
  breadcrumbs={
    <nav className="text-sm text-muted">
      <a href="/">Home</a> / <span>Patients</span>
    </nav>
  }
>
  <PatientList />
</DashboardLayout>

// With actions
<DashboardLayout
  title="Patients"
  subtitle="Manage patient records"
  actions={
    <>
      <Button variant="outline" leftIcon={<Download size={16} />}>
        Export
      </Button>
      <Button variant="primary" leftIcon={<Plus size={16} />}>
        Add Patient
      </Button>
    </>
  }
>
  <PatientTable />
</DashboardLayout>

// With stats
import { Users, Calendar, DollarSign, Clock } from 'lucide-react';

<DashboardLayout
  title="Dashboard"
  subtitle="Overview of your clinic"
  stats={
    <>
      <StatCard 
        title="Total Patients" 
        value="1,234" 
        change="+12%"
        isPositive
        icon={<Users size={24} />}
        variant="primary"
      />
      <StatCard 
        title="Today's Appointments" 
        value="28" 
        change="+5"
        isPositive
        icon={<Calendar size={24} />}
      />
      <StatCard 
        title="Monthly Revenue" 
        value="$45,678" 
        change="+8.2%"
        isPositive
        icon={<DollarSign size={24} />}
      />
      <StatCard 
        title="Avg Wait Time" 
        value="12 min" 
        change="-15%"
        isPositive
        icon={<Clock size={24} />}
        description="vs last week"
      />
    </>
  }
>
  <div className="grid grid-cols-2 gap-6">
    <Card title="Recent Appointments">
      <AppointmentList />
    </Card>
    <Card title="Patient Activity">
      <ActivityFeed />
    </Card>
  </div>
</DashboardLayout>

// Complete example
<DashboardLayout
  title="Dashboard"
  subtitle="Welcome back, Dr. Smith"
  breadcrumbs={<Breadcrumbs items={[{ label: 'Home', href: '/' }]} />}
  actions={
    <>
      <Button variant="outline">Settings</Button>
      <Button variant="primary">New Appointment</Button>
    </>
  }
  stats={
    <>
      <StatCard title="Patients" value="1,234" icon={<Users />} />
      <StatCard title="Appointments" value="56" icon={<Calendar />} />
      <StatCard title="Revenue" value="$45K" icon={<DollarSign />} />
      <StatCard title="Wait Time" value="12m" icon={<Clock />} />
    </>
  }
>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <Card title="Today's Schedule" headerActions={<Button size="sm">View All</Button>}>
      <ScheduleList />
    </Card>
    <Card title="Recent Patients" headerActions={<Button size="sm">View All</Button>}>
      <PatientList limit={5} />
    </Card>
  </div>
  
  <Card title="Analytics" className="mt-6">
    <AnalyticsChart />
  </Card>
</DashboardLayout>
```

### Stats Grid Breakpoints

| Breakpoint | Columns |
|------------|---------|
| ≥ 1200px | 4 columns |
| 640px - 1199px | 2 columns |
| < 640px | 1 column |

---

## WizardLayout

Page layout for multi-step wizards and forms.

### Import

```tsx
import { WizardLayout } from '@/design-system';
import type { WizardLayoutStep } from '@/design-system';
```

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | `string` | - | Yes | Page title |
| `steps` | `WizardLayoutStep[]` | - | Yes | Step configuration |
| `currentStep` | `number` | - | Yes | Current step (0-indexed) |
| `children` | `ReactNode` | - | Yes | Step content |
| `error` | `string` | - | No | Error message to display |
| `backLink` | `ReactNode` | - | No | Back navigation element |
| `className` | `string` | - | No | Additional CSS class |

### WizardLayoutStep Interface

```ts
interface WizardLayoutStep {
  id: string;
  title: string;
  description?: string;
}
```

### Features

- **Progress Indicator**: Visual step progression
- **Error Display**: Dismissible error banner
- **Back Navigation**: Optional back link
- **Centered Layout**: Max-width content area
- **Step Information**: Titles and optional descriptions

### Examples

```tsx
const [currentStep, setCurrentStep] = useState(0);

const steps: WizardLayoutStep[] = [
  { id: 'info', title: 'Patient Info' },
  { id: 'medical', title: 'Medical History' },
  { id: 'insurance', title: 'Insurance' },
  { id: 'review', title: 'Review' },
];

// Basic wizard layout
<WizardLayout
  title="New Patient Registration"
  steps={steps}
  currentStep={currentStep}
>
  <Card>
    {currentStep === 0 && <PatientInfoForm />}
    {currentStep === 1 && <MedicalHistoryForm />}
    {currentStep === 2 && <InsuranceForm />}
    {currentStep === 3 && <ReviewStep />}
    
    <div className="flex justify-between mt-6">
      <Button 
        variant="outline" 
        onClick={() => setCurrentStep(s => s - 1)}
        disabled={currentStep === 0}
      >
        Previous
      </Button>
      {currentStep < steps.length - 1 ? (
        <Button 
          variant="primary"
          onClick={() => setCurrentStep(s => s + 1)}
        >
          Next
        </Button>
      ) : (
        <Button 
          variant="primary"
          onClick={handleSubmit}
        >
          Complete Registration
        </Button>
      )}
    </div>
  </Card>
</WizardLayout>

// With back link
import { ArrowLeft } from 'lucide-react';

<WizardLayout
  title="New Patient Registration"
  steps={steps}
  currentStep={currentStep}
  backLink={
    <Button 
      variant="ghost" 
      leftIcon={<ArrowLeft size={16} />}
      onClick={() => navigate('/patients')}
    >
      Back to Patients
    </Button>
  }
>
  {/* Step content */}
</WizardLayout>

// With error
<WizardLayout
  title="New Patient Registration"
  steps={steps}
  currentStep={currentStep}
  error={error}
>
  {/* Step content */}
</WizardLayout>

// Steps with descriptions
const stepsWithDesc: WizardLayoutStep[] = [
  { 
    id: 'info', 
    title: 'Patient Info',
    description: 'Basic information',
  },
  { 
    id: 'medical', 
    title: 'Medical History',
    description: 'Health records',
  },
  { 
    id: 'insurance', 
    title: 'Insurance',
    description: 'Coverage details',
  },
  { 
    id: 'review', 
    title: 'Review',
    description: 'Confirm details',
  },
];

<WizardLayout
  title="New Patient Registration"
  steps={stepsWithDesc}
  currentStep={currentStep}
>
  {/* Step content */}
</WizardLayout>

// Complete example with form handling
function PatientRegistration() {
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const steps: WizardLayoutStep[] = [
    { id: 'info', title: 'Patient Info' },
    { id: 'medical', title: 'Medical History' },
    { id: 'insurance', title: 'Insurance' },
    { id: 'review', title: 'Review' },
  ];

  const handleNext = async () => {
    try {
      setError(null);
      await validateStep(currentStep);
      setCurrentStep(s => s + 1);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      await createPatient(formData);
      navigate('/patients');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <WizardLayout
      title="New Patient Registration"
      steps={steps}
      currentStep={currentStep}
      error={error}
      backLink={
        <Button 
          variant="ghost" 
          leftIcon={<ArrowLeft size={16} />}
          onClick={() => navigate('/patients')}
        >
          Cancel
        </Button>
      }
    >
      <Card>
        <StepContent 
          step={currentStep} 
          formData={formData}
          onChange={setFormData}
        />
        
        <div className="flex justify-between mt-6 pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(s => s - 1)}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button variant="primary" onClick={handleNext}>
              Continue
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSubmit}>
              Complete Registration
            </Button>
          )}
        </div>
      </Card>
    </WizardLayout>
  );
}
```

### Layout Dimensions

| Property | Value |
|----------|-------|
| Max width | 900px |
| Padding | 24px |
| Step indicator width | 120px per step |

---

## Layout Comparison

| Layout | Use Case | Key Features |
|--------|----------|--------------|
| **MainLayout** | Application shell | Sidebar, header, nested routes |
| **DashboardLayout** | Dashboard pages | Stats grid, actions, breadcrumbs |
| **WizardLayout** | Multi-step forms | Progress indicator, error handling |

### When to Use Each

**MainLayout:**
- Wrap the entire application
- Provides consistent navigation
- Use as the root layout for authenticated pages

**DashboardLayout:**
- Dashboard overview pages
- List pages with stats
- Pages with action buttons in header

**WizardLayout:**
- Patient registration
- Multi-step forms
- Onboarding flows
- Any process with sequential steps

---

## File Locations

| Layout | Path |
|--------|------|
| MainLayout | `src/design-system/layouts/MainLayout/` |
| DashboardLayout | `src/design-system/layouts/DashboardLayout/` |
| WizardLayout | `src/design-system/layouts/WizardLayout/` |
