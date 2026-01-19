import { BREAKPOINTS } from '@/constants';
import type { Breakpoint } from '@/types';

export function getCurrentBreakpoint(width: number): Breakpoint {
  if (width >= BREAKPOINTS.desktop) {
    return 'desktop';
  }
  if (width >= BREAKPOINTS.tablet) {
    return 'tablet';
  }
  return 'mobile';
}

export function isBreakpointAbove(width: number, breakpoint: Breakpoint): boolean {
  const breakpointValue = BREAKPOINTS[breakpoint];
  return width >= breakpointValue;
}

export function isBreakpointBelow(width: number, breakpoint: Breakpoint): boolean {
  const breakpointValue = BREAKPOINTS[breakpoint];
  return width < breakpointValue;
}
