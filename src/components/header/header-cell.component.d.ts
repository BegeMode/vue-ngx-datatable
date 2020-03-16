import { Vue } from 'vue-property-decorator';
import { SortDirection, SortType, SelectionType, TableColumn } from '../../types';
export default class DataTableHeaderCellComponent extends Vue {
    sortType: SortType;
    sortAscendingIcon: string;
    sortDescendingIcon: string;
    isTarget: boolean;
    allRowsSelected: boolean;
    selectionType: SelectionType;
    column: TableColumn;
    sorts: any[];
    headerHeight: number;
    sortFn: any;
    sortDir: SortDirection;
    cellContext: any;
    onAllRowsSelectedChanged(): void;
    onColumnChahged(): void;
    onSortsChanged(): void;
    created(): void;
    mounted(): void;
    beforeUpdate(): void;
    get columnCssClasses(): any;
    get name(): string;
    get styles(): {
        height: string;
        width: string;
        'min-width': string;
        'max-width': string;
    };
    get sortCssClass(): string;
    get cssClass(): string;
    get isCheckboxable(): boolean;
    onContextmenu($event: MouseEvent): void;
    calcSortDir(sorts: any[]): any;
    onSort(): void;
    calcSortCssClass(sortDir: SortDirection): string;
    calcCssClass(sortDir: SortDirection): string;
}
