export type StringInjectData = string[] | Record<string, unknown>;

/**
 * Inject values into a string using placeholders.
 * - Array: placeholders like `{0}`, `{1}` map to array indices.
 * - Object: placeholders like `{key}` map to object properties.
 */
export default function stringInject(str: string, data: StringInjectData): string;
export default function stringInject(str: unknown, data: unknown): string | false;
export default function stringInject(str: unknown, data: unknown): string | false {
  if (typeof str === 'string' && Array.isArray(data)) {
    return str.replace(/\{(\d+)\}/g, (match, idx) => {
      const i = Number(idx);
      return typeof data[i] !== 'undefined' ? String(data[i]) : match;
    });
  }

  if (typeof str === 'string' && data && typeof data === 'object') {
    if (Object.keys(data as object).length === 0) return str;
    return str.replace(/\{([^}]+)\}/g, (match, key) => {
      return Object.prototype.hasOwnProperty.call(data, key) && (data as any)[key] != null
        ? String((data as any)[key])
        : match;
    });
  }

  if (typeof str === 'string') {
    // If data isn't array/object, return the original string unchanged.
    return str;
  }

  // Invalid first argument type.
  return false;
}

