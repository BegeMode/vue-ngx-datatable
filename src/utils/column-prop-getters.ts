// maybe rename this file to prop-getters.ts

import { TableColumnProp } from 'types/table-column.type';
import { isNullOrUndefined } from 'utils/column-helper';

export type ValueGetter = (obj: Record<string, unknown>, prop: TableColumnProp) => unknown;

/**
 * Always returns the empty string ''
 * @returns {string}
 */
export function emptyStringGetter(): string {
  return '';
}

/**
 * Returns the appropriate getter function for this kind of prop.
 * If prop == null, returns the emptyStringGetter.
 */
export function getterForProp(prop: TableColumnProp): ValueGetter {
  if (isNullOrUndefined(prop)) {
    return emptyStringGetter;
  }

  if (typeof prop === 'number') {
    return numericIndexGetter;
  }
  // deep or simple
  if (prop.indexOf('.') !== -1) {
    return deepValueGetter;
  }
  return shallowValueGetter;
}

/**
 * Returns the value at this numeric index.
 * @param row array of values
 * @param index numeric index
 * @returns {any} or '' if invalid index
 */
export function numericIndexGetter(row: Record<string, unknown>, index: number): unknown {
  if (row === null) {
    return '';
  }
  // mimic behavior of deepValueGetter
  if (!row || index === null) {
    return row;
  }

  const value = row[index];
  // eslint-disable-next-line no-undefined
  if (value === null || value === undefined) {
    return '';
  }
  return value;
}

/**
 * Returns the value of a field.
 * (more efficient than deepValueGetter)
 * @param obj object containing the field
 * @param fieldName field name string
 * @returns {unknown}
 */
export function shallowValueGetter(obj: Record<string, unknown>, fieldName: string): unknown {
  if (obj === null) {
    return '';
  }
  if (!obj || !fieldName) {
    return obj;
  }

  const value = obj[fieldName];
  // eslint-disable-next-line no-undefined
  if (value === null || value === undefined) {
    return '';
  }
  return value;
}

/**
 * Returns a deep object given a string. zoo['animal.type']
 * @param {object} obj
 * @param {string} path
 */
export function deepValueGetter(obj: Record<string, unknown>, path: string): unknown {
  if (obj === null) {
    return '';
  }
  if (!obj || !path) {
    return obj;
  }

  // check if path matches a root-level field
  // { "a.b.c": 123 }
  let current = obj[path];
  // eslint-disable-next-line no-undefined
  if (current !== undefined) {
    return current;
  }

  current = obj;
  const split = path.split('.');

  if (split.length) {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < split.length; i++) {
      current = current[split[i]] as Record<string, unknown>;

      // if found undefined, return empty string
      // eslint-disable-next-line no-undefined
      if (current === undefined || current === null) {
        return '';
      }
    }
  }
  return current;
}
