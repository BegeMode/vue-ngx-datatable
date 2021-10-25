import { TableColumn } from 'types/table-column.type';
import Vue from 'vue';
/**
 * Sets the column defaults
 */
export declare function setColumnsDefaults(columns: TableColumn[], vm: Vue): void;
export declare function setColumnDefaults(column: TableColumn, vm: Vue): void;
export declare function isNullOrUndefined<T>(value: T | null | undefined): value is null | undefined;
/**
 * Translates templates definitions to objects
 */
