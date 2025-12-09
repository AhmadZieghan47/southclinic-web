# Code Review Report: Design System Atoms

## General Observations

The `atoms` components are generally well-structured, using CSS Modules for styling and TypeScript for type safety. The file structure is consistent, and `index.ts` files are used effectively for exports.

## Component Specific Findings

### Avatar
- **File**: `src/design-system/components/atoms/Avatar/Avatar.tsx`
- **Accessibility**: When `initials` are rendered (because `src` is missing or error), there is no `role="img"` or `aria-label`. If the initials are just text, this is fine, but if it's meant to represent the user image, ensuring `alt` text or a proper role is present on the container might be beneficial if the text content isn't sufficient context.
- **Suggestion**: Consider adding `title={alt}` to the container when showing initials to provide a tooltip with the full name/alt text.

### Badge
- **File**: `src/design-system/components/atoms/Badge/Badge.tsx`
- **Accessibility**: When `dot` is true, `children` are not rendered. This results in an empty `span` with only styling. This is inaccessible to screen readers unless the consumer provides an `aria-label` or `title`.
- **Suggestion**: Add a check or documentation to ensure `aria-label` is passed when `dot` is true.

### Button
- **File**: `src/design-system/components/atoms/Button/Button.tsx`
- **Accessibility**: When `loading` is true, the text content is hidden visually (via `color: transparent`), but still present in the DOM. This is good for screen readers. However, `aria-busy="true"` should be added to the button when in loading state.
- **Icon**: `loading` spinner is a `span` which is decorative. It should probably have `aria-hidden="true"`.

### Checkbox
- **File**: `src/design-system/components/atoms/Checkbox/Checkbox.tsx`
- **Bug/Issue**: `indeterminate` state logic sets `checkboxRef.current.indeterminate = true`. However, the visual representation depends on the `Minus` icon being rendered. The CSS hides `.icon` (`display: none`) by default and only shows it when `.input:checked` matches. If `indeterminate` is true but `checked` is false (which is common for indeterminate), the `Minus` icon will remain hidden because the input isn't "checked".
- **Suggestion**: Add CSS to show the icon when the input is indeterminate, or ensure `checked` is true when indeterminate (though `indeterminate` usually overrides `checked` visual in native inputs, here it's custom). A CSS selector like `.input:indeterminate + .checkbox .icon` might not work easily because `indeterminate` is a property, not always an attribute selector, but `:indeterminate` pseudo-class exists.
- **Fix**: Update CSS to support `:indeterminate` or ensuring the icon is visible.

### Input
- **File**: `src/design-system/components/atoms/Input/Input.tsx`
- **Layout Issue**: The `wrapper` div has `display: inline-flex` and `align-items: center`. The `errorMessage` is rendered inside this wrapper. This will cause the error message to appear to the right of the input (inline) rather than below it, which seems contrary to `margin-top` in the CSS.
- **Suggestion**: The `errorMessage` should likely be rendered outside the `wrapper` or the layout strategy needs to be adjusted (e.g., `flex-direction: column` for the outer container, with an inner wrapper for the input and icons).
- **Accessibility**: `errorMessage` is rendered but not linked to the input. Use `aria-describedby` on the input pointing to the error message ID, and `aria-invalid={error}`.

### Select
- **File**: `src/design-system/components/atoms/Select/Select.tsx`
- **Logic**: `placeholder` prop renders a disabled option with `value=""`. If the consumer doesn't provide a `value` prop (uncontrolled) or `value` is undefined, this is fine. But if `value` is controlled and not empty string initially, React might complain if it switches.
- **Styling**: `padding-right` and `padding-left` (for `leftElement`) are hardcoded in pixels. Ensure this aligns with the token values if possible, though it seems intentional for icon spacing.

### Toggle
- **File**: `src/design-system/components/atoms/Toggle/Toggle.tsx`
- **Good**: Uses `role="switch"`.
- **Structure**: Similar to Checkbox, seems robust.

### Radio
- **File**: `src/design-system/components/atoms/Radio/Radio.tsx`
- **Good**: `RadioGroup` handles `role="radiogroup"`.

### Divider
- **File**: `src/design-system/components/atoms/Divider/Divider.tsx`
- **Good**: Uses `role="separator"`.

### Spinner
- **File**: `src/design-system/components/atoms/Spinner/Spinner.tsx`
- **Good**: Uses `role="status"` and `sr-only` text.

## Summary

The components are off to a great start. The main issues to address are:
1.  **Layout bug in `Input`**: Error message positioning.
2.  **Visual bug in `Checkbox`**: Indeterminate state visibility.
3.  **Accessibility**: Enhancements for `Button` (loading state), `Badge` (dot only), and `Input` (error message association).
