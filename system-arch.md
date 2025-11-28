# SOUTH PHYSICAL CLINIC — DESIGN SYSTEM ARCHITECTURE

> **Version:** 2.0  
> **Last Updated:** November 2025  
> **Approach:** Fresh Start (Clean Slate)

---

# PHASE 0 — COMPREHENSIVE DESIGN SYSTEM EXECUTION PLAN

## 1. Project Decisions

### 1.1 Confirmed Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Old Design System** | DELETE ALL | Fresh start, no legacy baggage |
| **Theme Mode** | LIGHT ONLY | Per designer specification |
| **Icon Library** | Lucide React | Already installed, tree-shakable |
| **CSS Approach** | CSS Modules | Scoped styles, TypeScript friendly |
| **Responsive Strategy** | Desktop-First | Fixed widths, enterprise focus |
| **Application Code** | KEEP | features/, hooks/, services/, contexts/, routes/ |

### 1.2 Files/Folders to DELETE

```
DELETE:
├── src/theme/                    # Old token system
│   ├── variables.css
│   ├── tokens.ts
│   └── ThemeProvider.tsx
├── src/components/ui/            # Old UI components
│   ├── Button/
│   ├── Card/
│   ├── Input/
│   └── Table/
├── src/components/layout/        # Old layout components
│   ├── Header/
│   ├── Sidebar/
│   └── MainLayout/
├── src/index.css                 # Old global styles
└── src/App.css                   # Old app styles
```

### 1.3 Files/Folders to KEEP

```
KEEP:
├── src/features/                 # Business logic
├── src/hooks/                    # Custom hooks
├── src/services/                 # API services
├── src/contexts/                 # React contexts
├── src/routes/                   # Routing
├── src/types/                    # TypeScript types
└── src/assets/                   # Static assets
```

---

## 2. Designer's Theme Specification

### 2.1 Official Design Tokens

| Token | Value | CSS Variable | Usage |
|-------|-------|--------------|-------|
| **Primary** | `#0D9488` | `--color-primary` | Buttons, active states, sidebar |
| **Secondary** | `#0EA5E9` | `--color-secondary` | Links, accents |
| **Destructive** | `#E11D48` | `--color-destructive` | Errors, delete actions |
| **Background** | `#F3F4F6` | `--color-background` | Main page background |
| **Surface** | `#FFFFFF` | `--color-surface` | Cards, panels |
| **Heading** | `#1F2937` | `--color-heading` | Headings, titles |
| **Body** | `#4B5563` | `--color-body` | Body text |
| **Muted** | `#6B7280` | `--color-muted` | Secondary text |
| **Border** | `#D1D5DB` | `--color-border` | Borders, dividers |

### 2.2 Extended Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| **Primary Hover** | `#0F766E` | Button hover state |
| **Primary Light** | `#CCFBF1` | Primary backgrounds |
| **Secondary Hover** | `#0284C7` | Link hover |
| **Secondary Light** | `#E0F2FE` | Info backgrounds |
| **Destructive Hover** | `#BE123C` | Delete hover |
| **Destructive Light** | `#FFE4E6` | Error backgrounds |
| **Success** | `#16A34A` | Success states |
| **Success Light** | `#DCFCE7` | Success backgrounds |
| **Warning** | `#CA8A04` | Warning states |
| **Warning Light** | `#FEF9C3` | Warning backgrounds |

### 2.3 Gray Scale

| Token | Value | Usage |
|-------|-------|-------|
| **Gray 50** | `#F9FAFB` | Subtle backgrounds |
| **Gray 100** | `#F3F4F6` | Page background |
| **Gray 200** | `#E5E7EB` | Borders, dividers |
| **Gray 300** | `#D1D5DB` | Input borders |
| **Gray 400** | `#9CA3AF` | Placeholder text |
| **Gray 500** | `#6B7280` | Muted text |
| **Gray 600** | `#4B5563` | Body text |
| **Gray 700** | `#374151` | Strong text |
| **Gray 800** | `#1F2937` | Headings |
| **Gray 900** | `#111827` | Darkest text |

### 2.4 Typography

| Property | Value | CSS Variable |
|----------|-------|--------------|
| **Font Family** | Inter, sans-serif | `--font-family` |
| **Font Size XS** | 12px | `--font-size-xs` |
| **Font Size SM** | 14px | `--font-size-sm` |
| **Font Size Base** | 16px | `--font-size-base` |
| **Font Size LG** | 18px | `--font-size-lg` |
| **Font Size XL** | 20px | `--font-size-xl` |
| **Font Size 2XL** | 24px | `--font-size-2xl` |
| **Font Size 3XL** | 30px | `--font-size-3xl` |
| **Font Size 4XL** | 36px | `--font-size-4xl` |
| **Font Weight Normal** | 400 | `--font-weight-normal` |
| **Font Weight Medium** | 500 | `--font-weight-medium` |
| **Font Weight Semibold** | 600 | `--font-weight-semibold` |
| **Font Weight Bold** | 700 | `--font-weight-bold` |

### 2.5 Spacing Scale (8px grid)

| Token | Value | CSS Variable |
|-------|-------|--------------|
| **0** | 0px | `--spacing-0` |
| **1** | 4px | `--spacing-1` |
| **2** | 8px | `--spacing-2` |
| **3** | 12px | `--spacing-3` |
| **4** | 16px | `--spacing-4` |
| **5** | 20px | `--spacing-5` |
| **6** | 24px | `--spacing-6` |
| **8** | 32px | `--spacing-8` |
| **10** | 40px | `--spacing-10` |
| **12** | 48px | `--spacing-12` |
| **16** | 64px | `--spacing-16` |
| **20** | 80px | `--spacing-20` |

### 2.6 Shapes & Effects

| Property | Value | CSS Variable |
|----------|-------|--------------|
| **Radius SM** | 4px | `--radius-sm` |
| **Radius** | 8px | `--radius` |
| **Radius LG** | 12px | `--radius-lg` |
| **Radius XL** | 16px | `--radius-xl` |
| **Radius Full** | 9999px | `--radius-full` |
| **Shadow SM** | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | `--shadow-sm` |
| **Shadow** | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` | `--shadow` |
| **Shadow MD** | `0 4px 6px -1px rgb(0 0 0 / 0.1)` | `--shadow-md` |
| **Shadow LG** | `0 10px 15px -3px rgb(0 0 0 / 0.1)` | `--shadow-lg` |

### 2.7 Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| **Dropdown** | 1000 | Dropdowns, selects |
| **Sticky** | 1020 | Sticky headers |
| **Fixed** | 1030 | Fixed elements |
| **Modal Backdrop** | 1040 | Modal overlay |
| **Modal** | 1050 | Modal content |
| **Popover** | 1060 | Popovers, tooltips |
| **Toast** | 1070 | Toast notifications |

---

## 3. Design System Folder Audit

### 3.1 Contents Summary

| Category | Count | Examples |
|----------|-------|----------|
| **Page Layouts** | 8 | Dashboard, Scheduler, Reports, HR, Finance |
| **Modals** | 6 | Add Payment, Edit Appointment, Cancel |
| **Patient Views** | 15 | Details, Headers, States, Tabs, Warnings |
| **Wizards** | 10 | Create Patient (4 steps), Begin Treatment (4 steps) |
| **UI States** | 6 | Loading, Error, Not Found variations |
| **Total** | 45 | Each has `code.html` + `screen.png` |

---

## 4. Scope Definition

### 4.1 In Scope

- [x] Delete old design system completely
- [ ] Create new token system (TS + CSS)
- [ ] Build all UI components from designs
- [ ] Create layout system
- [ ] Document component APIs
- [ ] Establish naming conventions

### 4.2 Out of Scope

- Dark mode (Light only per spec)
- Backend integration
- Automated testing
- CI/CD configuration
- Mobile responsiveness

---

## 5. Constraints

| Constraint | Impact |
|------------|--------|
| **Light Mode Only** | Simpler token system, no theme switching |
| **CSS Modules** | Scoped styles, no Tailwind |
| **Desktop-First** | Fixed widths, no mobile breakpoints |
| **Lucide Icons** | Map Material icons to Lucide equivalents |

---

## 6. Architecture

### 6.1 New Folder Structure

```
src/
├── design-system/
│   ├── index.ts                    # Barrel export
│   │
│   ├── tokens/
│   │   ├── index.ts                # All tokens export
│   │   ├── colors.ts               # Color palette
│   │   ├── typography.ts           # Font tokens
│   │   ├── spacing.ts              # Spacing scale
│   │   ├── shadows.ts              # Shadow tokens
│   │   └── radii.ts                # Border radius tokens
│   │
│   ├── foundations/
│   │   ├── variables.css           # CSS custom properties
│   │   ├── reset.css               # CSS reset
│   │   └── global.css              # Global styles
│   │
│   ├── components/
│   │   ├── index.ts                # All components export
│   │   │
│   │   ├── atoms/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.module.css
│   │   │   │   ├── Button.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   ├── Select/
│   │   │   ├── Checkbox/
│   │   │   ├── Radio/
│   │   │   ├── Toggle/
│   │   │   ├── Badge/
│   │   │   ├── Spinner/
│   │   │   ├── Avatar/
│   │   │   ├── Divider/
│   │   │   └── index.ts
│   │   │
│   │   ├── molecules/
│   │   │   ├── FormField/
│   │   │   ├── SearchInput/
│   │   │   ├── StatCard/
│   │   │   ├── AlertBanner/
│   │   │   ├── NavItem/
│   │   │   ├── Tab/
│   │   │   ├── Pagination/
│   │   │   ├── ProgressBar/
│   │   │   ├── IconButton/
│   │   │   └── index.ts
│   │   │
│   │   └── organisms/
│   │       ├── Modal/
│   │       ├── DataTable/
│   │       ├── Wizard/
│   │       ├── Sidebar/
│   │       ├── Header/
│   │       ├── ProfileHeader/
│   │       ├── EmptyState/
│   │       ├── DescriptionList/
│   │       └── index.ts
│   │
│   ├── layouts/
│   │   ├── MainLayout/
│   │   ├── DashboardLayout/
│   │   ├── WizardLayout/
│   │   └── index.ts
│   │
│   └── patterns/
│       ├── LoadingState/
│       ├── ErrorState/
│       └── index.ts
│
├── features/                       # KEEP - Business logic
├── hooks/                          # KEEP - Custom hooks
├── services/                       # KEEP - API services
├── contexts/                       # KEEP - React contexts
├── routes/                         # KEEP - Routing
├── types/                          # KEEP - TypeScript types
└── main.tsx                        # Entry point (update imports)
```

---

## 7. Component System Blueprint

### 7.1 Atoms (10 components) ✅ COMPLETE

| Component | Priority | Status | Description |
|-----------|----------|--------|-------------|
| **Button** | P0 | [x] ✅ | Primary, secondary, outline, ghost, destructive variants |
| **Input** | P0 | [x] ✅ | Text, password, number, with icons |
| **Select** | P0 | [x] ✅ | Dropdown with options |
| **Checkbox** | P1 | [x] ✅ | Single checkbox with label |
| **Radio** | P1 | [x] ✅ | Radio group |
| **Toggle** | P1 | [x] ✅ | On/off switch |
| **Badge** | P0 | [x] ✅ | Status indicators |
| **Spinner** | P0 | [x] ✅ | Loading indicator |
| **Avatar** | P1 | [x] ✅ | User profile images |
| **Divider** | P2 | [x] ✅ | Horizontal/vertical separator |

### 7.2 Molecules (10 components) ✅ COMPLETE

| Component | Priority | Status | Description |
|-----------|----------|--------|-------------|
| **FormField** | P0 | [x] ✅ | Label + Input + Error message |
| **SearchInput** | P1 | [x] ✅ | Input with search icon |
| **StatCard** | P0 | [x] ✅ | KPI display card |
| **AlertBanner** | P0 | [x] ✅ | Warning/info/error banners |
| **NavItem** | P1 | [x] ✅ | Sidebar navigation item |
| **Tab** | P0 | [x] ✅ | Tab navigation |
| **Pagination** | P1 | [x] ✅ | Page navigation |
| **ProgressBar** | P1 | [x] ✅ | Step indicator |
| **IconButton** | P1 | [x] ✅ | Icon-only button |
| **Card** | P0 | [x] ✅ | Content container with title, actions |

### 7.3 Organisms (8 components) ✅ COMPLETE

| Component | Priority | Status | Description |
|-----------|----------|--------|-------------|
| **Modal** | P0 | [x] ✅ | Dialog with header, body, footer |
| **DataTable** | P0 | [x] ✅ | Table with sorting, pagination |
| **Wizard** | P0 | [x] ✅ | Multi-step form |
| **Sidebar** | P1 | [x] ✅ | Navigation sidebar (in MainLayout) |
| **Header** | P1 | [x] ✅ | Page header with actions (in MainLayout) |
| **ProfileHeader** | P1 | [x] ✅ | Patient profile header |
| **EmptyState** | P1 | [x] ✅ | No data / error display |
| **DescriptionList** | P2 | [x] ✅ | Key-value pairs display |

### 7.4 Layouts (3 templates) ✅ COMPLETE

| Layout | Priority | Status | Description |
|--------|----------|--------|-------------|
| **MainLayout** | P0 | [x] ✅ | Sidebar + Header + Content |
| **DashboardLayout** | P1 | [x] ✅ | Dashboard with stats grid |
| **WizardLayout** | P1 | [x] ✅ | Multi-step form layout |

---

## 8. Icon Mapping (Material Symbols → Lucide)

| Material Symbol | Lucide Equivalent |
|-----------------|-------------------|
| `dashboard` | `LayoutDashboard` |
| `group` | `Users` |
| `person` | `User` |
| `calendar_month` | `Calendar` |
| `calendar_today` | `CalendarDays` |
| `assessment` | `BarChart3` |
| `bar_chart` | `BarChart2` |
| `settings` | `Settings` |
| `logout` | `LogOut` |
| `add` | `Plus` |
| `close` | `X` |
| `check` | `Check` |
| `error` | `AlertCircle` |
| `warning` | `AlertTriangle` |
| `info` | `Info` |
| `search` | `Search` |
| `chevron_left` | `ChevronLeft` |
| `chevron_right` | `ChevronRight` |
| `expand_more` | `ChevronDown` |
| `expand_less` | `ChevronUp` |
| `edit` | `Pencil` |
| `delete` | `Trash2` |
| `phone` | `Phone` |
| `medical_services` | `Stethoscope` |
| `notifications` | `Bell` |
| `help` | `HelpCircle` |
| `work` | `Briefcase` |
| `clinical_notes` | `ClipboardList` |
| `badge` | `BadgeCheck` |
| `arrow_forward` | `ArrowRight` |
| `arrow_back` | `ArrowLeft` |

---

## 9. Naming Conventions

### 9.1 Files & Folders

| Type | Convention | Example |
|------|------------|---------|
| Component folder | PascalCase | `Button/` |
| Component file | PascalCase | `Button.tsx` |
| CSS Module | PascalCase.module.css | `Button.module.css` |
| Types file | PascalCase.types.ts | `Button.types.ts` |
| Token files | camelCase | `colors.ts` |

### 9.2 CSS Classes (in modules)

| Type | Convention | Example |
|------|------------|---------|
| Root class | camelCase | `.button` |
| Variant | camelCase | `.primary`, `.secondary` |
| Size | camelCase | `.sm`, `.md`, `.lg` |
| State | camelCase | `.disabled`, `.loading` |

### 9.3 TypeScript

| Type | Convention | Example |
|------|------------|---------|
| Props interface | ComponentProps | `ButtonProps` |
| Variant type | ComponentVariant | `ButtonVariant` |
| Size type | ComponentSize | `ButtonSize` |

---

## 10. Implementation Phases

### Phase 1: Foundation (Day 1) ✅ COMPLETE
- [x] Delete old design system files
- [x] Create folder structure
- [x] Create token files (colors, typography, spacing, shadows, radii)
- [x] Create CSS variables file
- [x] Create CSS reset
- [x] Update main.tsx imports

### Phase 2: Atoms (Day 2-3) ✅ COMPLETE
- [x] Button (all variants)
- [x] Input (all types)
- [x] Select
- [x] Badge
- [x] Spinner
- [x] Checkbox, Radio, Toggle
- [x] Avatar, Divider

### Phase 3: Molecules (Day 4-5) ✅ COMPLETE
- [x] FormField
- [x] StatCard
- [x] AlertBanner
- [x] Tab (Tabs, TabPanel)
- [x] SearchInput
- [x] NavItem (NavItem, NavGroup)
- [x] Pagination
- [x] ProgressBar (ProgressBar, StepProgress)
- [x] IconButton
- [x] Card

### Phase 4: Organisms (Day 6-8) ✅ COMPLETE
- [x] Modal (with ModalHeader, ModalBody, ModalFooter)
- [x] DataTable (basic)
- [x] Wizard (with WizardHeader, WizardContent, WizardFooter)
- [x] Sidebar (in MainLayout)
- [x] Header (in MainLayout)
- [x] ProfileHeader
- [x] EmptyState
- [x] DescriptionList

### Phase 5: Layouts (Day 9) ✅ COMPLETE
- [x] MainLayout
- [x] DashboardLayout
- [x] WizardLayout

### Phase 6: Integration (Day 10) ✅ COMPLETE (Design System Ready)
- [x] All components exported and available
- [ ] Final testing (pending new features)
- [x] Documentation ✅

#### Documentation Files Created:
- `src/design-system/README.md` - Main documentation with quick start and full API reference
- `src/design-system/docs/tokens.md` - Complete tokens documentation (colors, typography, spacing, shadows, radii, zIndex)
- `src/design-system/docs/atoms.md` - All atoms with props and examples
- `src/design-system/docs/molecules.md` - All molecules with props and examples
- `src/design-system/docs/organisms.md` - All organisms with props and examples
- `src/design-system/docs/layouts.md` - All layouts with props and examples

---

## 11. Deliverables Checklist

### Tokens ✅
- [x] `src/design-system/tokens/colors.ts`
- [x] `src/design-system/tokens/typography.ts`
- [x] `src/design-system/tokens/spacing.ts`
- [x] `src/design-system/tokens/shadows.ts`
- [x] `src/design-system/tokens/radii.ts`
- [x] `src/design-system/tokens/zIndex.ts`
- [x] `src/design-system/tokens/index.ts`

### Foundations ✅
- [x] `src/design-system/foundations/variables.css`
- [x] `src/design-system/foundations/reset.css`
- [x] `src/design-system/foundations/global.css`

### Components
- [ ] 10 Atom components
- [ ] 9 Molecule components
- [ ] 8 Organism components

### Layouts
- [ ] 3 Layout templates

### Documentation
- [ ] Component usage examples
- [ ] Token reference

---

## 12. Approval

**Plan Status:** APPROVED

**Approved Changes:**
- [x] Delete entire old design system
- [x] Light mode only
- [x] Use exact designer tokens
- [x] Keep Lucide React icons
- [x] CSS Modules approach
- [x] Desktop-first responsive strategy

---

**Ready to proceed with Phase 1: Foundation**
