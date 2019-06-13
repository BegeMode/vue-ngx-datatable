import { SortDirection } from './sort-direction.type';
import { TableColumnProp, TableColumn } from './table-column.type';
export interface ISortPropDir {
    dir: SortDirection;
    prop: TableColumnProp;
}
export interface ISortEvent {
    sorts: ISortPropDir[];
    column: TableColumn;
    prevValue: SortDirection;
    newValue: SortDirection;
}
