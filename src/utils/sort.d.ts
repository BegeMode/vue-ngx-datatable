import { SortType } from 'types/sort.type';
import { SortDirection } from 'types/sort-direction.type';
import { ISortPropDir } from 'types/sort-prop-dir.type';
import { TableColumn } from 'types/table-column.type';
/**
 * Gets the next sort direction
 */
export declare function nextSortDir(sortType: SortType, current: SortDirection): SortDirection | undefined;
/**
 * Adapted from fueld-ui on 6/216
 * https://github.com/FuelInteractive/fuel-ui/tree/master/src/pipes/OrderBy
 */
export declare function orderByComparator(a: unknown, b: unknown): number;
/**
 * creates a shallow copy of the `rows` input and returns the sorted copy. this function
 * does not sort the `rows` argument in place
 */
export declare function sortRows(rows: Record<string, unknown>[], columns: TableColumn[], dirs: ISortPropDir[]): Record<string, unknown>[];
