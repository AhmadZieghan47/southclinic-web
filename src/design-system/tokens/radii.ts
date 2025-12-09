/**
 * Border Radius Tokens
 * Design System - South Physical Clinic
 *
 * Default: 8px as per designer spec
 */

export const radii = {
  none: '0',
  sm: '0.25rem', // 4px
  DEFAULT: '0.5rem', // 8px - Designer's default
  md: '0.5rem', // 8px
  lg: '0.75rem', // 12px
  xl: '1rem', // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
} as const;

export type RadiusToken = keyof typeof radii;
