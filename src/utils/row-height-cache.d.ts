import { IGroupedRows } from 'types/grouped-rows';
/**
 * This object contains the cache of the various row heights that are present inside
 * the data table.   Its based on Fenwick tree data structure that helps with
 * querying sums that have time complexity of log n.
 *
 * Fenwick Tree Credits: http://petr-mitrichev.blogspot.com/2013/05/fenwick-tree-range-updates.html
 * https://github.com/mikolalysenko/fenwick-tree
 *
 */
interface IRowsHeightCache {
    rows: Record<string, unknown>[];
    rowHeight: number | ((row: Record<string, unknown>, index?: number) => number);
    rowDetailHeight: number | ((row: Record<string, unknown>, index?: number) => number);
    groupRowHeight: number | ((row: Record<string, unknown>, index?: number) => number);
    externalVirtual: boolean;
    rowCount: number;
    rowIndexes: Map<Record<string, unknown>, number>;
    rowExpansions: Map<Record<string, unknown> | IGroupedRows, boolean>;
}
export declare class RowHeightCache {
    /**
     * Tree Array stores the cumulative information of the row heights to perform efficient
     * range queries and updates.  Currently the tree is initialized to the base row
     * height instead of the detail row height.
     */
    private heights;
    /**
     * Clear the Tree array.
     */
    clearCache(): void;
    /**
     * Initialize the Fenwick tree with row Heights.
     *
     * @param rows The array of rows which contain the expanded status.
     * @param rowHeight The row height.
     * @param rowDetailHeight The detail row height.
     */
    initCache(details: IRowsHeightCache): void;
    /**
     * Given the ScrollY position i.e. sum, provide the rowIndex
     * that is present in the current view port.  Below handles edge cases.
     */
    getRowIndex(scrollY: number): number;
    /**
     * When a row is expanded or rowHeight is changed, update the height.  This can
     * be utilized in future when Angular Data table supports dynamic row heights.
     */
    update(atRowIndex: number, byRowHeight: number): void;
    /**
     * Range Sum query from 1 to the rowIndex
     */
    query(atIndex: number): number;
    queryWithHeight(atIndex: number): {
        offsetY: number;
        height: number;
    };
    /**
     * Find the total height between 2 row indexes
     */
    queryBetween(atIndexA: number, atIndexB: number): number;
    /**
     * Given the ScrollY position i.e. sum, provide the rowIndex
     * that is present in the current view port.
     */
    private calcRowIndex;
}
export {};
