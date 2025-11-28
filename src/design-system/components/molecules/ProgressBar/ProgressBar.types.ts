import type { HTMLAttributes } from 'react';

export type ProgressBarSize = 'sm' | 'md' | 'lg';
export type ProgressBarVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Progress value (0-100) */
  value: number;
  /** Maximum value */
  max?: number;
  /** Size variant */
  size?: ProgressBarSize;
  /** Color variant */
  variant?: ProgressBarVariant;
  /** Show percentage label */
  showLabel?: boolean;
  /** Custom label */
  label?: string;
  /** Striped style */
  striped?: boolean;
  /** Animated stripes */
  animated?: boolean;
}

export interface StepProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** Current step (0-indexed) */
  currentStep: number;
  /** Total steps */
  totalSteps: number;
  /** Step labels */
  labels?: string[];
  /** Size variant */
  size?: ProgressBarSize;
  /** Color variant */
  variant?: ProgressBarVariant;
}
