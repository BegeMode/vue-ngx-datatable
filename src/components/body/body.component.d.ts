import { TreeStatus } from 'components/body/body-cell.component';
import { TGroupByField } from 'components/datatable.component';
import { CheckMode } from 'types/check.type';
import { IGroupedRows } from 'types/grouped-rows';
import { IRowContext } from 'types/row-context.type';
import { SelectionType } from 'types/selection.type';
import { TableColumn } from 'types/table-column.type';
import { IColumnsByPinRecord, IColumnsWidth } from 'utils/column';
import { RowHeightCache } from 'utils/row-height-cache';
import { VNode } from 'vue';
import { Vue } from 'vue-property-decorator';
import ScrollerComponent from './scroller.component';
import DataTableSelectionComponent, { Model } from './selection.component';
export default class DataTableBodyComponent extends Vue {
    scrollbarV: boolean;
    scrollbarH: boolean;
    loadingIndicator: boolean;
    externalPaging: boolean;
    rowHeight: number | ((row: Record<string, unknown>, index?: number) => number);
    groupRowHeight: number | ((row: Record<string, unknown>, index?: number) => number);
    groupHeaderStyles: Record<string, string | number>;
    groupHeaderClasses: string | Array<string>;
    offsetX: number;
    emptyMessage: string;
    selectionType: SelectionType;
    checkMode: CheckMode;
    selected: Array<Record<string, unknown>>;
    checked: Array<Record<string, unknown>>;
    rowIdentity: (row: Record<string, unknown>) => string | number;
    rowDetail: boolean;
    rowDetailHeight: number | string | ((row?: Record<string, unknown>, index?: number) => number);
    groupHeader: boolean;
    selectCheck: () => void;
    displayCheck: (row: Record<string, unknown>, column?: TableColumn, value?: unknown) => boolean;
    trackByProp: string;
    rowClass: (row: Record<string, unknown>, rowIndex: number) => string | string;
    groupExpansionDefault: boolean;
    innerWidth: number;
    groupRowsBy: Array<TGroupByField | Array<TGroupByField>>;
    virtualization: boolean;
    summaryRow: boolean;
    summaryPosition: string;
    summaryHeight: number | string;
    pageSize: number;
    limit: number;
    rows: Record<string, unknown>[];
    columns: TableColumn[];
    offset: number;
    rowCount: number;
    bodyHeight: number;
    minItemHeight: number | string;
    heightField: string;
    groupHeaderSlot: (obj: Record<string, unknown>) => VNode[];
    rowDetailSlot: (obj: Record<string, unknown>) => VNode[];
    renderTracking: boolean;
    scroller: ScrollerComponent;
    selector: DataTableSelectionComponent;
    rowHeightsCache: RowHeightCache;
    offsetY: number;
    myOffset: number;
    myOffsetX: number;
    indexes: {
        first: number;
        last: number;
    };
    columnGroupWidths: IColumnsWidth;
    rowIndexes: Map<Record<string, unknown>, number>;
    rowExpansions: Map<Record<string, unknown> | IGroupedRows, boolean>;
    myBodyHeight: string;
    columnsByPin: IColumnsByPinRecord[];
    groupStyles: {
        left: {};
        center: {};
        right: {};
    };
    rowTrackingFn: (row: Record<string, unknown>) => string | number;
    lastFirst: number;
    lastLast: number;
    lastRowCount: number;
    rowsChanged: boolean;
    rowContexts: Array<IRowContext>;
    private readonly scrollbarHelper;
    private renderCounter;
    private renderId;
    onPageSize(): void;
    onRowsChanged(): Promise<void>;
    onSelectedChanged(): Promise<void>;
    onCheckedChanged(): Promise<void>;
    onColumnsChanged(): void;
    onOffsetChanged(): void;
    onOffsetXChanged(): void;
    onMyOffsetXChanged(): void;
    onInnerWidthChanged(): void;
    onMyOffsetChanged(): void;
    onRowCountChanged(): void;
    onBodyHeightChanged(): void;
    /**
     * Creates an instance of DataTableBodyComponent.
     */
    created(): void;
    mounted(): void;
    get bodyWidth(): string;
    get styleObject(): Record<string, string>;
    /**
     * Returns if selection is enabled.
     */
    get selectEnabled(): boolean;
    get checkEnabled(): boolean;
    get isUseRowHeightCache(): boolean;
    get fixedRowHeight(): boolean;
    /**
     * Property that would calculate the height of scroll bar
     * based on the row heights cache for virtual scroll and virtualization. Other scenarios
     * calculate scroll height automatically (as height will be undefined).
     */
    get scrollHeight(): number | undefined;
    get scrollWidth(): string;
    /**
     * Called once, before the instance is destroyed.
     */
    destroyed(): void;
    reset(): void;
    onSelect(event: {
        selected: Array<Record<string, unknown>>;
        index: number;
    }): void;
    recalculateColumns(val?: Array<TableColumn>): void;
    /**
     * Updates the Y offset given a new offset.
     */
    updateOffsetY(offset?: number, fromPager?: boolean): number;
    onScrollSetup(event: {
        scrollYPos: number;
        scrollXPos: number;
    }): void;
    /**
     * Body was scrolled, this is mainly useful for
     * when a user is server-side pagination via virtual scroll.
     */
    onBodyScroll(event: {
        direction: string;
        scrollYPos: number;
        scrollXPos: number;
        fromPager: boolean;
    }): void;
    /**
     * Updates the page given a direction.
     */
    updatePage(direction: string, fromPager: boolean): void;
    /**
     * Updates the rows in the view port
     */
    updateRows(force?: boolean): void;
    /**
     * Get the row height
     */
    getRowHeight(row: Record<string, unknown>): number;
    /**
     * @param group the group with all rows
     */
    getGroupHeight(group: {
        value: Array<Record<string, unknown>>;
    }): number;
    /**
     * Calculate row height based on the expanded state of the row.
     */
    getRowAndDetailHeight(row: Record<string, unknown>): number;
    /**
     * Get the height of the detail row.
     */
    getDetailRowHeight: (row?: Record<string, unknown>, index?: number) => number;
    /**
     * Calculates the styles for the row so that the rows can be moved in 2D space
     * during virtual scroll inside the DOM.   In the below case the Y position is
     * manipulated.   As an example, if the height of row 0 is 30 px and row 1 is
     * 100 px then following styles are generated:
     *
     * transform: translate3d(0px, 0px, 0px);    ->  row0
     * transform: translate3d(0px, 30px, 0px);   ->  row1
     * transform: translate3d(0px, 130px, 0px);  ->  row2
     *
     * Row heights have to be calculated based on the row heights cache as we wont
     * be able to determine which row is of what height before hand.  In the above
     * case the positionY of the translate3d for row2 would be the sum of all the
     * heights of the rows before it (i.e. row0 and row1).
     *
     * @param {*} row The row that needs to be placed in the 2D space.
     * @returns {*} Returns the CSS3 style to be applied
     *
     * @memberOf DataTableBodyComponent
     */
    getRowWrapperStyles(rowContext: IRowContext): Record<string, string>;
    getRowOffsetY(index: number): {
        offsetY: number;
        height: number;
    };
    /**
     * Calculate bottom summary row offset for scrollbar mode.
     * For more information about cache and offset calculation
     * see description for `getRowsStyles` method
     *
     * @returns {*} Returns the CSS3 style to be applied
     *
     * @memberOf DataTableBodyComponent
     */
    getBottomSummaryRowStyles(): Record<string, string>;
    /**
     * Hides the loading indicator
     */
    /**
     * Updates the index of the rows in the viewport
     */
    updateIndexes(direction?: string): void;
    /**
     * Refreshes the full Row Height cache.  Should be used
     * when the entire row array state has changed.
     */
    refreshRowHeightCache(): void;
    /**
     * Gets the index for the view port
     */
    getAdjustedViewPortIndex(): number;
    /**
     * Toggle the Expansion of the row i.e. if the row is expanded then it will
     * collapse and vice versa.   Note that the expanded status is stored as
     * a part of the row object itself as we have to preserve the expanded row
     * status in case of sorting and filtering of the row set.
     */
    toggleRowExpansion(rowContext: IRowContext): boolean;
    /**
     * Expand/Collapse all the rows no matter what their state is.
     */
    toggleAllRows(expanded: boolean): void;
    onGroupToggle($event: {
        value: Record<string, unknown>;
    }): void;
    /**
     * Recalculates the table
     */
    recalcLayout(): void;
    /**
     * Tracks the column
     */
    columnTrackingFn(index: number, column: TableColumn): string;
    /**
     * Gets the row pinning group styles
     */
    initExpansions(group: IGroupedRows): void;
    /**
     * Returns if the row was expanded and set default row expansion when row expansion is empty
     */
    getRowExpanded(row: Record<string, unknown>): boolean;
    /**
     * Gets the row index given a row
     */
    getRowIndex(row: Record<string, unknown>): number;
    onTreeAction(event: unknown): void;
    isSelect(row: Record<string, unknown>): boolean;
    isChecked(row: Record<string, unknown>): boolean;
    onActivate(model: Model, index: number): void;
    onRowRendered(row: Record<string, unknown>): void;
    checkRenderFinish(counter: number): void;
    buildStylesByGroup(): void;
    calcStylesByGroup(group: keyof IColumnsWidth): Record<string, string>;
    getGroupStyles(colGroup: {
        type: 'left' | 'center' | 'right';
    }): Record<string, string | number>;
    treeStatus(row: Record<string, unknown>): TreeStatus;
    isRowVisible(row: Record<string, unknown>): boolean;
    get cellSlots(): () => Record<string, (arg?: Record<string, unknown>) => VNode[]>;
    onCellFocus($event: Event): void;
    /**
     * Toggle the expansion of the row
     */
    toggleExpandDetail(row: Record<string, unknown>): void;
    /**
     * Expand all the rows.
     */
    expandAllDetails(): void;
    /**
     * Collapse all the rows.
     */
    collapseAllDetails(): void;
}
