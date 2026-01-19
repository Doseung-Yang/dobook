export function isValidString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isValidArray<T>(value: unknown): value is readonly T[] {
  return Array.isArray(value) && value.length > 0;
}

export function isValidObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isNumberInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}
