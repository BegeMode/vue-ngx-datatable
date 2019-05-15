/**
 * Returns the columns by pin.
 */
export interface IColumnsByPin {
    left: any[];
    center: any[];
    right: any[];
}
export declare function columnsByPin(cols: any[]): IColumnsByPin;
/**
 * Returns the widths of all group sets of a column
 */
export declare function columnGroupWidths(groups: any, all: any): {
    left: number;
    center: number;
    right: number;
    total: number;
};
/**
 * Calculates the total width of all columns and their groups
 */
export declare function columnTotalWidth(columns: any[], prop?: string): number;
/**
 * Calculates the total width of all columns and their groups
 */
export declare function columnsTotalWidth(columns: any, prop?: any): number;
export declare function columnsByPinArr(val: any): any[];
