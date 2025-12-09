# Design Tokens

Design tokens are the foundational values that define the visual language of the South Physical Clinic design system.

---

## Colors

### Brand Colors

#### Primary (Teal)

| Token                    | CSS Variable            | Value     | Usage                                 |
| ------------------------ | ----------------------- | --------- | ------------------------------------- |
| `colors.primary.DEFAULT` | `--color-primary`       | `#0D9488` | Primary buttons, links, active states |
| `colors.primary.hover`   | `--color-primary-hover` | `#0F766E` | Primary hover states                  |
| `colors.primary.light`   | `--color-primary-light` | `#CCFBF1` | Primary backgrounds, highlights       |

#### Secondary (Sky Blue)

| Token                      | CSS Variable              | Value     | Usage                      |
| -------------------------- | ------------------------- | --------- | -------------------------- |
| `colors.secondary.DEFAULT` | `--color-secondary`       | `#0EA5E9` | Secondary buttons, accents |
| `colors.secondary.hover`   | `--color-secondary-hover` | `#0284C7` | Secondary hover states     |
| `colors.secondary.light`   | `--color-secondary-light` | `#E0F2FE` | Secondary backgrounds      |

#### Destructive (Rose)

| Token                        | CSS Variable                | Value     | Usage                    |
| ---------------------------- | --------------------------- | --------- | ------------------------ |
| `colors.destructive.DEFAULT` | `--color-destructive`       | `#E11D48` | Delete buttons, errors   |
| `colors.destructive.hover`   | `--color-destructive-hover` | `#BE123C` | Destructive hover states |
| `colors.destructive.light`   | `--color-destructive-light` | `#FFE4E6` | Error backgrounds        |

### Semantic Colors

#### Success (Green)

| Token                    | CSS Variable            | Value     | Usage                               |
| ------------------------ | ----------------------- | --------- | ----------------------------------- |
| `colors.success.DEFAULT` | `--color-success`       | `#16A34A` | Success states, positive indicators |
| `colors.success.hover`   | `--color-success-hover` | `#15803D` | Success hover states                |
| `colors.success.light`   | `--color-success-light` | `#DCFCE7` | Success backgrounds                 |

#### Warning (Amber)

| Token                    | CSS Variable            | Value     | Usage                  |
| ------------------------ | ----------------------- | --------- | ---------------------- |
| `colors.warning.DEFAULT` | `--color-warning`       | `#CA8A04` | Warning states, alerts |
| `colors.warning.hover`   | `--color-warning-hover` | `#A16207` | Warning hover states   |
| `colors.warning.light`   | `--color-warning-light` | `#FEF9C3` | Warning backgrounds    |

#### Info (Blue)

| Token                 | CSS Variable         | Value     | Usage                |
| --------------------- | -------------------- | --------- | -------------------- |
| `colors.info.DEFAULT` | `--color-info`       | `#0EA5E9` | Info states, notices |
| `colors.info.hover`   | `--color-info-hover` | `#0284C7` | Info hover states    |
| `colors.info.light`   | `--color-info-light` | `#E0F2FE` | Info backgrounds     |

### Neutral Colors

#### Text

| Token                | CSS Variable          | Value     | Usage                    |
| -------------------- | --------------------- | --------- | ------------------------ |
| `colors.heading`     | `--color-heading`     | `#1F2937` | Headings, important text |
| `colors.body`        | `--color-body`        | `#4B5563` | Body text, paragraphs    |
| `colors.muted`       | `--color-muted`       | `#6B7280` | Secondary text, labels   |
| `colors.placeholder` | `--color-placeholder` | `#9CA3AF` | Placeholder text         |

#### Surfaces

| Token               | CSS Variable         | Value     | Usage                 |
| ------------------- | -------------------- | --------- | --------------------- |
| `colors.background` | `--color-background` | `#F3F4F6` | Page background       |
| `colors.surface`    | `--color-surface`    | `#FFFFFF` | Cards, modals, panels |

#### Borders

| Token                | CSS Variable           | Value     | Usage                   |
| -------------------- | ---------------------- | --------- | ----------------------- |
| `colors.border`      | `--color-border`       | `#D1D5DB` | Default borders         |
| `colors.borderLight` | `--color-border-light` | `#E5E7EB` | Light borders, dividers |

### Gray Scale

| Token              | CSS Variable       | Value     |
| ------------------ | ------------------ | --------- |
| `colors.gray[50]`  | `--color-gray-50`  | `#F9FAFB` |
| `colors.gray[100]` | `--color-gray-100` | `#F3F4F6` |
| `colors.gray[200]` | `--color-gray-200` | `#E5E7EB` |
| `colors.gray[300]` | `--color-gray-300` | `#D1D5DB` |
| `colors.gray[400]` | `--color-gray-400` | `#9CA3AF` |
| `colors.gray[500]` | `--color-gray-500` | `#6B7280` |
| `colors.gray[600]` | `--color-gray-600` | `#4B5563` |
| `colors.gray[700]` | `--color-gray-700` | `#374151` |
| `colors.gray[800]` | `--color-gray-800` | `#1F2937` |
| `colors.gray[900]` | `--color-gray-900` | `#111827` |

### Absolute Colors

| Token                | CSS Variable    | Value         |
| -------------------- | --------------- | ------------- |
| `colors.white`       | `--color-white` | `#FFFFFF`     |
| `colors.black`       | `--color-black` | `#000000`     |
| `colors.transparent` | -               | `transparent` |

---

## Typography

### Font Family

```css
--font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

**Note:** Inter is loaded from Google Fonts in `index.html`.

### Font Sizes

| Token                        | CSS Variable       | Value      | Pixels | Usage                   |
| ---------------------------- | ------------------ | ---------- | ------ | ----------------------- |
| `typography.fontSize.xs`     | `--font-size-xs`   | `0.75rem`  | 12px   | Captions, badges        |
| `typography.fontSize.sm`     | `--font-size-sm`   | `0.875rem` | 14px   | Secondary text, labels  |
| `typography.fontSize.base`   | `--font-size-base` | `1rem`     | 16px   | Body text               |
| `typography.fontSize.lg`     | `--font-size-lg`   | `1.125rem` | 18px   | Large body, subheadings |
| `typography.fontSize.xl`     | `--font-size-xl`   | `1.25rem`  | 20px   | Section titles          |
| `typography.fontSize['2xl']` | `--font-size-2xl`  | `1.5rem`   | 24px   | Page titles             |
| `typography.fontSize['3xl']` | `--font-size-3xl`  | `1.875rem` | 30px   | Large titles            |
| `typography.fontSize['4xl']` | `--font-size-4xl`  | `2.25rem`  | 36px   | Hero titles             |

### Font Weights

| Token                            | CSS Variable             | Value | Usage            |
| -------------------------------- | ------------------------ | ----- | ---------------- |
| `typography.fontWeight.normal`   | `--font-weight-normal`   | `400` | Body text        |
| `typography.fontWeight.medium`   | `--font-weight-medium`   | `500` | Labels, emphasis |
| `typography.fontWeight.semibold` | `--font-weight-semibold` | `600` | Subheadings      |
| `typography.fontWeight.bold`     | `--font-weight-bold`     | `700` | Headings         |

### Line Heights

| Token                           | CSS Variable            | Value   | Usage            |
| ------------------------------- | ----------------------- | ------- | ---------------- |
| `typography.lineHeight.none`    | `--line-height-none`    | `1`     | Single line text |
| `typography.lineHeight.tight`   | `--line-height-tight`   | `1.25`  | Headings         |
| `typography.lineHeight.snug`    | `--line-height-snug`    | `1.375` | Subheadings      |
| `typography.lineHeight.normal`  | `--line-height-normal`  | `1.5`   | Body text        |
| `typography.lineHeight.relaxed` | `--line-height-relaxed` | `1.625` | Large body       |
| `typography.lineHeight.loose`   | `--line-height-loose`   | `2`     | Loose text       |

### Letter Spacing

| Token                              | CSS Variable | Value      |
| ---------------------------------- | ------------ | ---------- |
| `typography.letterSpacing.tighter` | -            | `-0.05em`  |
| `typography.letterSpacing.tight`   | -            | `-0.025em` |
| `typography.letterSpacing.normal`  | -            | `0`        |
| `typography.letterSpacing.wide`    | -            | `0.025em`  |
| `typography.letterSpacing.wider`   | -            | `0.05em`   |

---

## Spacing

Based on a **4px grid system** (0.25rem increments).

| Token          | CSS Variable    | Value      | Pixels |
| -------------- | --------------- | ---------- | ------ |
| `spacing[0]`   | `--spacing-0`   | `0`        | 0px    |
| `spacing.px`   | `--spacing-px`  | `1px`      | 1px    |
| `spacing[0.5]` | `--spacing-0-5` | `0.125rem` | 2px    |
| `spacing[1]`   | `--spacing-1`   | `0.25rem`  | 4px    |
| `spacing[1.5]` | `--spacing-1-5` | `0.375rem` | 6px    |
| `spacing[2]`   | `--spacing-2`   | `0.5rem`   | 8px    |
| `spacing[2.5]` | `--spacing-2-5` | `0.625rem` | 10px   |
| `spacing[3]`   | `--spacing-3`   | `0.75rem`  | 12px   |
| `spacing[3.5]` | `--spacing-3-5` | `0.875rem` | 14px   |
| `spacing[4]`   | `--spacing-4`   | `1rem`     | 16px   |
| `spacing[5]`   | `--spacing-5`   | `1.25rem`  | 20px   |
| `spacing[6]`   | `--spacing-6`   | `1.5rem`   | 24px   |
| `spacing[7]`   | `--spacing-7`   | `1.75rem`  | 28px   |
| `spacing[8]`   | `--spacing-8`   | `2rem`     | 32px   |
| `spacing[9]`   | `--spacing-9`   | `2.25rem`  | 36px   |
| `spacing[10]`  | `--spacing-10`  | `2.5rem`   | 40px   |
| `spacing[11]`  | `--spacing-11`  | `2.75rem`  | 44px   |
| `spacing[12]`  | `--spacing-12`  | `3rem`     | 48px   |
| `spacing[14]`  | `--spacing-14`  | `3.5rem`   | 56px   |
| `spacing[16]`  | `--spacing-16`  | `4rem`     | 64px   |
| `spacing[20]`  | `--spacing-20`  | `5rem`     | 80px   |
| `spacing[24]`  | `--spacing-24`  | `6rem`     | 96px   |

### Common Usage Patterns

| Use Case       | Recommended Spacing                                           |
| -------------- | ------------------------------------------------------------- |
| Icon/text gap  | `--spacing-2` (8px)                                           |
| Button padding | `--spacing-3` (12px) horizontal, `--spacing-2` (8px) vertical |
| Card padding   | `--spacing-5` or `--spacing-6` (20-24px)                      |
| Section gap    | `--spacing-6` or `--spacing-8` (24-32px)                      |
| Page padding   | `--spacing-6` (24px)                                          |

---

## Shadows

Soft, subtle shadows for elevation.

| Token             | CSS Variable     | Value                                                                 | Usage                     |
| ----------------- | ---------------- | --------------------------------------------------------------------- | ------------------------- |
| `shadows.none`    | `--shadow-none`  | `none`                                                                | No shadow                 |
| `shadows.sm`      | `--shadow-sm`    | `0 1px 2px 0 rgb(0 0 0 / 0.05)`                                       | Subtle elevation (inputs) |
| `shadows.DEFAULT` | `--shadow`       | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`       | Default (cards)           |
| `shadows.md`      | `--shadow-md`    | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`    | Medium (dropdowns)        |
| `shadows.lg`      | `--shadow-lg`    | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`  | High (popovers)           |
| `shadows.xl`      | `--shadow-xl`    | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Highest (modals)          |
| `shadows['2xl']`  | `--shadow-2xl`   | `0 25px 50px -12px rgb(0 0 0 / 0.25)`                                 | Extra high                |
| `shadows.inner`   | `--shadow-inner` | `inset 0 2px 4px 0 rgb(0 0 0 / 0.05)`                                 | Inset shadow              |

---

## Border Radius

Default border radius is **8px** per designer specification.

| Token           | CSS Variable    | Value     | Pixels   | Usage                     |
| --------------- | --------------- | --------- | -------- | ------------------------- |
| `radii.none`    | `--radius-none` | `0`       | 0px      | No rounding               |
| `radii.sm`      | `--radius-sm`   | `0.25rem` | 4px      | Small elements            |
| `radii.DEFAULT` | `--radius`      | `0.5rem`  | 8px      | Default (buttons, inputs) |
| `radii.md`      | `--radius-md`   | `0.5rem`  | 8px      | Same as default           |
| `radii.lg`      | `--radius-lg`   | `0.75rem` | 12px     | Cards, modals             |
| `radii.xl`      | `--radius-xl`   | `1rem`    | 16px     | Large cards               |
| `radii['2xl']`  | `--radius-2xl`  | `1.5rem`  | 24px     | Extra large               |
| `radii.full`    | `--radius-full` | `9999px`  | Circular | Avatars, pills            |

---

## Z-Index

Layering system for overlays and modals.

| Token                  | CSS Variable         | Value  | Usage               |
| ---------------------- | -------------------- | ------ | ------------------- |
| `zIndex.hide`          | -                    | `-1`   | Hidden elements     |
| `zIndex.auto`          | -                    | `auto` | Default stacking    |
| `zIndex.base`          | `--z-base`           | `0`    | Base layer          |
| `zIndex.docked`        | `--z-docked`         | `10`   | Docked elements     |
| `zIndex.dropdown`      | `--z-dropdown`       | `1000` | Dropdowns           |
| `zIndex.sticky`        | `--z-sticky`         | `1020` | Sticky headers      |
| `zIndex.fixed`         | `--z-fixed`          | `1030` | Fixed elements      |
| `zIndex.modalBackdrop` | `--z-modal-backdrop` | `1040` | Modal backdrop      |
| `zIndex.modal`         | `--z-modal`          | `1050` | Modals              |
| `zIndex.popover`       | `--z-popover`        | `1060` | Popovers            |
| `zIndex.tooltip`       | `--z-tooltip`        | `1070` | Tooltips            |
| `zIndex.toast`         | `--z-toast`          | `1080` | Toast notifications |

---

## Transitions

| CSS Variable        | Value        | Usage               |
| ------------------- | ------------ | ------------------- |
| `--transition-fast` | `150ms ease` | Quick interactions  |
| `--transition-base` | `200ms ease` | Default transitions |
| `--transition-slow` | `300ms ease` | Slower animations   |

---

## Using Tokens

### In CSS Modules

```css
.button {
  background-color: var(--color-primary);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.button:hover {
  background-color: var(--color-primary-hover);
}
```

### In TypeScript

```tsx
import { colors, typography, spacing } from '@/design-system';

// Access token values programmatically
console.log(colors.primary.DEFAULT); // '#0D9488'
console.log(typography.fontSize.base); // '1rem'
console.log(spacing[4]); // '1rem'
```

---

## File Locations

| Token         | File Path                                     |
| ------------- | --------------------------------------------- |
| Colors        | `src/design-system/tokens/colors.ts`          |
| Typography    | `src/design-system/tokens/typography.ts`      |
| Spacing       | `src/design-system/tokens/spacing.ts`         |
| Shadows       | `src/design-system/tokens/shadows.ts`         |
| Radii         | `src/design-system/tokens/radii.ts`           |
| Z-Index       | `src/design-system/tokens/zIndex.ts`          |
| CSS Variables | `src/design-system/foundations/variables.css` |
