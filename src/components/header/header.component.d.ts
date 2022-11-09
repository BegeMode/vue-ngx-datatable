import { SelectionType } from 'types/selection.type';
import { SortType } from 'types/sort.type';
import { SortDirection } from 'types/sort-direction.type';
import { ISortPropDir } from 'types/sort-prop-dir.type';
import { TableColumn } from 'types/table-column.type';
import { IColumnsByPinRecord, IColumnsWidth } from 'utils/column';
import { Vue } from 'vue-property-decorator';
interface IDragPosition {
    left: number;
    right: number;
    index: number;
    element: HTMLElement;
}
export default class DataTableHeaderComponent extends Vue {
    sortAscendingIcon: string;
    sortDescendingIcon: string;
    scrollbarWidth: number;
    scrollbarH: boolean;
    dealsWithGroup: boolean;
    innerWidth: number;
    sorts: ISortPropDir[];
    sortType: SortType;
    allRowsSelected: boolean;
    selectionType: SelectionType;
    reorderable: boolean;
    headerHeight: string | number;
    columns: TableColumn[];
    offsetX: number;
    columnGroupWidths: IColumnsWidth;
    columnsByPin: IColumnsByPinRecord[];
    myHeaderHeight: string;
    styleByGroup: {
        left: {};
        center: {};
        right: {};
    };
    targetMarkerContext: {
        class: string;
    };
    dragEvent: MouseEvent;
    dragging: boolean;
    positions: Record<string, IDragPosition>;
    lastDraggingIndex: number;
    draggables: Array<{
        dragModel: TableColumn;
        element: HTMLElement;
    }>;
    onChangedInnerWidth(): void;
    onHeaderHeightChanged(): void;
    onColumnsChanged(): void;
    onOffsetXChanged(): void;
    onColumnGroupWidthsChanged(): void;
    onLongPressStart({ event, model }: {
        event: MouseEvent;
        model: {
            dragging: boolean;
        };
    }): void;
    onLongPressEnd({ event, model }: {
        event: MouseEvent;
        model: TableColumn;
    }): void;
    get headerWidth(): string;
    isEnableDragX(column: TableColumn): boolean;
    onColumnResized(width: number, column: TableColumn): void;
    onColumnVisibleChanged(column: TableColumn): void;
    getColumn(index: number): TableColumn;
    onSort({ column, prevValue, newValue, }: {
        column: TableColumn;
        prevValue: SortDirection;
        newValue: SortDirection;
    }): void;
    onSelect(event: Event): void;
    calcNewSorts(column: TableColumn, prevValue: SortDirection, newValue: SortDirection): ISortPropDir[];
    setStylesByGroup(): void;
    calcStylesByGroup(group: keyof IColumnsWidth): Record<string, string | number>;
    styleForGroup(group: IColumnsByPinRecord): Record<string, string | number>;
    get styleObject(): Record<string, string | number>;
    onHeaderCellMounted(column: TableColumn, element: HTMLElement): void;
    onDragStart(): void;
    onDragging({ element, model, event }: {
        element: HTMLElement;
        model: TableColumn;
        event: MouseEvent;
    }): void;
    onDragEnd({ element, model, event }: {
        element: HTMLElement;
        model: TableColumn;
        event: MouseEvent;
    }): void;
    onColumnReordered({ prevIndex, newIndex, model }: {
        prevIndex: number;
        newIndex: number;
        model: TableColumn;
    }): void;
    onTargetChanged({ prevIndex, newIndex, initialIndex, }: {
        prevIndex: number;
        newIndex?: number;
        initialIndex: number;
    }): void;
    isTarget(model: TableColumn, event: MouseEvent): {
        prop: string;
        pos: IDragPosition;
        i: number;
    };
}
export {};
