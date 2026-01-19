import type { ResponsiveConfig, ComponentVariant } from '@/types';

export const BREAKPOINTS: ResponsiveConfig = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
} as const;

export const COMPONENT_SIZES = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export const COMPONENT_VARIANTS: Record<ComponentVariant, { bg: string; text: string; border: string }> = {
  primary: {
    bg: 'bg-blue-600',
    text: 'text-white',
    border: 'border-blue-600',
  },
  secondary: {
    bg: 'bg-gray-600',
    text: 'text-white',
    border: 'border-gray-600',
  },
  tertiary: {
    bg: 'bg-transparent',
    text: 'text-gray-700',
    border: 'border-gray-300',
  },
} as const;

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

export const Z_INDEX = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

export const LAYOUT = {
  maxWidth: '1280px',
  padding: {
    mobile: '1rem',
    tablet: '2rem',
    desktop: '3rem',
  },
} as const;

export const SEARCH = {
  debounceDelay: 300,
  minQueryLength: 2,
  maxResults: 50,
} as const;
