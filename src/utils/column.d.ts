import { TableColumn } from 'types/table-column.type';
export interface IColumnsWidth {
    left: number;
    center: number;
    right: number;
    total: number;
}
export interface IColumnsByPinRecord {
    type: 'left' | 'center' | 'right';
    columns: TableColumn[];
}
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
export declare function columnGroupWidths(groups: IColumnsByPin, all: TableColumn[], tableWidth: number): IColumnsWidth;
/**
 * Calculates the total width of all columns and their groups
 */
export declare function columnTotalWidth(columns: TableColumn[]): number;
/**
 * Calculates the total width of all columns and their groups
 */
export declare function columnsTotalWidth(columns: TableColumn[]): number;
export declare function columnsByPinArr(val: TableColumn[]): Array<IColumnsByPinRecord>;
