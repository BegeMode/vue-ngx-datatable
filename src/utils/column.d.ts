import { TableColumn } from '../types';
/**
 * Returns the columns by pin.
 */
export interface IColumnsByPin {
    left: TableColumn[];
    center: TableColumn[];
    right: TableColumn[];
}
export declare function columnsByPin(cols: TableColumn[]): IColumnsByPin;
/**
 * Returns the widths of all group sets of a column
 */
export declare function columnGroupWidths(groups: IColumnsByPin, all: TableColumn[], tableWidth: number): {
    left: number;
    center: number;
    right: number;
    total: number;
};
/**
 * Calculates the total width of all columns and their groups
 */
export declare function columnTotalWidth(columns: TableColumn[], prop?: string): number;
/**
 * Calculates the total width of all columns and their groups
 */
export declare function columnsTotalWidth(columns: TableColumn[], prop?: any): number;
export declare function columnsByPinArr(val: TableColumn[]): any[];
