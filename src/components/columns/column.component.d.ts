import { TableColumn, TableColumnProp, TComparator } from 'types/table-column.type';
import { Vue } from 'vue-property-decorator';
export default class DataTableColumnComponent extends Vue {
    name: string;
    prop: TableColumnProp;
    frozenLeft: boolean;
    frozenRight: boolean;
    flexGrow: number;
    resizeable: boolean;
    comparator: TComparator;
    sortable: boolean;
    draggable: boolean;
    canAutoResize: boolean;
    minWidth: number;
    width: number;
    maxWidth: number;
    checkboxable: boolean;
    headerCheckboxable: boolean;
    headerClass: string | ((data: {
        column: TableColumn;
    }) => string | Record<string, unknown>);
    cellClass: string | Array<string> | ((data: Record<string, unknown>) => string | Record<string, unknown>) | Array<string | Array<string> | ((data: Record<string, unknown>) => string | Record<string, unknown>)>;
    isTreeColumn: boolean;
    treeLevelIndent: number;
    summaryFunc: (cells: unknown[]) => string;
    visible: boolean;
    column: TableColumn;
    onVisibleChanged(newVal: boolean): void;
    onFrozenLeftChanged(newVal: boolean): void;
    onFrozenRightChanged(newVal: boolean): void;
    onFlexGrowChanged(newVal: number): void;
    onResizeableChanged(newVal: boolean): void;
    onSortableChanged(newVal: boolean): void;
    onDraggableChanged(newVal: boolean): void;
    onCheckboxableChanged(newVal: boolean): void;
    onWidthChanged(newVal: number): void;
    mounted(): void;
}
