import { TableColumnProp } from '../types/table-column.type';
export declare type OptionalValueGetter = (row: Record<string, unknown>) => unknown | undefined;
export declare function optionalGetterForProp(prop: TableColumnProp): OptionalValueGetter;
/**
 * This functions rearrange items by their parents
 * Also sets the level value to each of the items
 *
 * Note: Expecting each item has a property called parentId
 * Note: This algorithm will fail if a list has two or more items with same ID
 * NOTE: This algorithm will fail if there is a deadlock of relationship
 *
 * For example,
 *
 * Input
 *
 * id -> parent
 * 1  -> 0
 * 2  -> 0
 * 3  -> 1
 * 4  -> 1
 * 5  -> 2
 * 7  -> 8
 * 6  -> 3
 *
 *
 * Output
 * id -> level
 * 1      -> 0
 * --3    -> 1
 * ----6  -> 2
 * --4    -> 1
 * 2      -> 0
 * --5    -> 1
 * 7     -> 8
 *
 *
 * @param rows
 *
 */
export declare function groupRowsByParents(rows: Array<{
    level: number;
    treeStatus?: string;
}>, from?: OptionalValueGetter, to?: OptionalValueGetter, lazyTree?: boolean): Record<string, unknown>[];
