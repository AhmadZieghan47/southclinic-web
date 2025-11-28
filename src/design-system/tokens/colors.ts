/**
 * Color Tokens
 * Design System - South Physical Clinic
 * 
 * Theme: LIGHT MODE ONLY
 * Primary: Teal-600 (#0D9488)
 * Secondary: Sky-500 (#0EA5E9)
 * Destructive: Rose-600 (#E11D48)
 */

export const colors = {
  // Brand Colors
  primary: {
    DEFAULT: '#0D9488',
    hover: '#0F766E',
    light: '#CCFBF1',
  },
  secondary: {
    DEFAULT: '#0EA5E9',
    hover: '#0284C7',
    light: '#E0F2FE',
  },
  destructive: {
    DEFAULT: '#E11D48',
    hover: '#BE123C',
    light: '#FFE4E6',
  },

  // Semantic Colors
  success: {
    DEFAULT: '#16A34A',
    hover: '#15803D',
    light: '#DCFCE7',
  },
  warning: {
    DEFAULT: '#CA8A04',
    hover: '#A16207',
    light: '#FEF9C3',
  },
  info: {
    DEFAULT: '#0EA5E9',
    hover: '#0284C7',
    light: '#E0F2FE',
  },

  // Neutral Colors
  background: '#F3F4F6',
  surface: '#FFFFFF',
  
  // Text Colors
  heading: '#1F2937',
  body: '#4B5563',
  muted: '#6B7280',
  placeholder: '#9CA3AF',

  // Border
  border: '#D1D5DB',
  borderLight: '#E5E7EB',

  // Gray Scale
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Absolute
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type ColorToken = keyof typeof colors;
