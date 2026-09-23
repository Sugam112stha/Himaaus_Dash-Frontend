/** Small, dependency-free validation helpers shared by all forms in this module. */

export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function hasMinLength(value: string, min: number): boolean {
  return value.trim().length >= min;
}

export function isValidUrl(value: string): boolean {
  return /^https?:\/\/.+\..+/.test(value.trim());
}

export function isNonNegativeNumber(value: number): boolean {
  return Number.isFinite(value) && value >= 0;
}

export function isPositiveInteger(value: number): boolean {
  return Number.isInteger(value) && value >= 1;
}

export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}
