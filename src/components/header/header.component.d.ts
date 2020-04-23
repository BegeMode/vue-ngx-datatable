import { Vue } from 'vue-property-decorator';
import { SortType, SelectionType, SortDirection, ISortPropDir } from '../../types';
export default class DataTableHeaderComponent extends Vue {
    sortAscendingIcon: any;
    sortDescendingIcon: any;
    scrollbarWidth: number;
    scrollbarH: boolean;
    dealsWithGroup: boolean;
    targetMarkerTemplate: any;
    innerWidth: number;
    sorts: ISortPropDir[];
    sortType: SortType;
    allRowsSelected: boolean;
    selectionType: SelectionType;
    reorderable: boolean;
    headerHeight: any;
    columns: any[];
    offsetX: number;
    columnsByPin: any;
    columnGroupWidths: any;
    myHeaderHeight: string;
    styleByGroup: {
        left: {};
        center: {};
        right: {};
    };
    targetMarkerContext: any;
    dragEventTarget: any;
    dragging: boolean;
    positions: any;
    lastDraggingIndex: number;
    draggables: any[];
    onChangedInnerWidth(): void;
    onHeaderHeightChanged(): void;
    onColumnsChanged(): void;
    onOffsetXChanged(): void;
    onLongPressStart({ event, model }: {
        event: any;
        model: any;
    }): void;
    onLongPressEnd({ event, model }: {
        event: any;
        model: any;
    }): void;
    get headerWidth(): string;
    isEnableDragX(column: any): any;
    onColumnResized(width: number, column: any): void;
    onHiddenChanged($event: any): void;
    getColumn(index: number): any;
    onSort({ column, prevValue, newValue }: any): void;
    onSelect(event: any): void;
    calcNewSorts(column: any, prevValue: SortDirection, newValue: SortDirection): ISortPropDir[];
    setStylesByGroup(): void;
    calcStylesByGroup(group: string): any;
    styleForGroup(group: any): any;
    get styleObject(): {
        width: string;
        height: string;
    };
    onHeaderCellMounted(column: any, element: any): void;
    onDragStart(): void;
    onDragging({ element, model, event }: any): void;
    onDragEnd({ element, model, event }: any): void;
    onColumnReordered({ prevIndex, newIndex, model }: any): void;
    onTargetChanged({ prevIndex, newIndex, initialIndex }: any): void;
    isTarget(model: any, event: any): any;
}
