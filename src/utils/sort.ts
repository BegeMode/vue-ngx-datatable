import { SortType } from 'types/sort.type';
import { SortDirection } from 'types/sort-direction.type';
import { ISortPropDir } from 'types/sort-prop-dir.type';
import { TableColumn, TComparator } from 'types/table-column.type';
import { getterForProp } from './column-prop-getters';
/**
 * Gets the next sort direction
 */
export function nextSortDir(sortType: SortType, current: SortDirection): SortDirection | undefined {
  if (sortType === SortType.single) {
    if (current === SortDirection.asc) {
      return SortDirection.desc;
    }
    return SortDirection.asc;
  }
  if (!current) {
    return SortDirection.asc;
  }
  if (current === SortDirection.asc) {
    return SortDirection.desc;
  }
  if (current === SortDirection.desc) {
    // eslint-disable-next-line no-undefined
    return undefined;
  }
}

/**
 * Adapted from fueld-ui on 6/216
 * https://github.com/FuelInteractive/fuel-ui/tree/master/src/pipes/OrderBy
 */
export function orderByComparator(a: unknown, b: unknown): number {
  if (a === null || typeof a === 'undefined') {
    a = 0;
  }
  if (b === null || typeof b === 'undefined') {
    b = 0;
  }
  if (a instanceof Date && b instanceof Date) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
  } else if (
    isNaN(parseFloat(a as string)) ||
    !isFinite(a as number) ||
    isNaN(parseFloat(b as string)) ||
    !isFinite(b as number)
  ) {
    // Convert to string in case of a=0 or b=0
    a = String(a);
    b = String(b);
    // Isn't a number so lowercase the string to properly compare
    if ((a as string).toLowerCase() < (b as string).toLowerCase()) {
      return -1;
    }
    if ((a as string).toLowerCase() > (b as string).toLowerCase()) {
      return 1;
    }
  } else {
    // Parse strings as numbers to compare properly
    if (parseFloat(a as string) < parseFloat(b as string)) {
      return -1;
    }
    if (parseFloat(a as string) > parseFloat(b as string)) {
      return 1;
    }
  }

  // equal each other
  return 0;
}

/**
 * creates a shallow copy of the `rows` input and returns the sorted copy. this function
 * does not sort the `rows` argument in place
 */
export function sortRows(
  rows: Record<string, unknown>[],
  columns: TableColumn[],
  dirs: ISortPropDir[]
): Record<string, unknown>[] {
  if (!rows) {
    return [];
  }
  if (!dirs || !dirs.length) {
    return [...rows];
  }

  /**
   * record the row ordering of results from prior sort operations (if applicable)
   * this is necessary to guarantee stable sorting behavior
   */
  const rowToIndexMap = new Map<Record<string, unknown>, number>();
  rows.forEach((row, index) => rowToIndexMap.set(row, index));
  const temp = [...rows];
  const cols: Record<string, TComparator> = {};
  if (Array.isArray(columns)) {
    columns.forEach(col => {
      if (col.comparator && typeof col.comparator === 'function') {
        cols[col.prop] = col.comparator;
      }
    });
  }

  // cache valueGetter and compareFn so that they
  // do not need to be looked-up in the sort function body
  const cachedDirs = dirs.map(dir => {
    const prop = dir.prop;
    return {
      prop,
      dir: dir.dir,
      valueGetter: getterForProp(prop),
      compareFn: cols[prop] || orderByComparator,
    };
  });

  return temp.sort((rowA: Record<string, unknown>, rowB: Record<string, unknown>) => {
    for (const cachedDir of cachedDirs) {
      // Get property and valuegetters for column to be sorted
      const { prop, valueGetter } = cachedDir;
      // Get A and B cell values from rows based on properties of the columns
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const propA = valueGetter(rowA, prop);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const propB = valueGetter(rowB, prop);

      // Compare function gets five parameters:
      // Two cell values to be compared as propA and propB
      // Two rows corresponding to the cells as rowA and rowB
      // Direction of the sort for this column as SortDirection
      // Compare can be a standard JS comparison function (a,b) => -1|0|1
      // as additional parameters are silently ignored. The whole row and sort
      // direction enable more complex sort logic.
      const comparison =
        cachedDir.dir !== SortDirection.desc
          ? cachedDir.compareFn(propA as string, propB as string, rowA, rowB, cachedDir.dir)
          : -cachedDir.compareFn(propA as string, propB as string, rowA, rowB, cachedDir.dir);

      // Don't return 0 yet in case of needing to sort by next property
      if (comparison !== 0) {
        return comparison;
      }
    }

    if (!(rowToIndexMap.has(rowA) && rowToIndexMap.has(rowB))) {
      return 0;
    }

    /**
     * all else being equal, preserve original order of the rows (stable sort)
     */
    return rowToIndexMap.get(rowA) < rowToIndexMap.get(rowB) ? -1 : 1;
  });
}
