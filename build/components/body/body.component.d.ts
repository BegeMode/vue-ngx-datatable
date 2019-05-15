import { Vue } from 'vue-property-decorator';
import { RowHeightCache } from '../../utils';
import { SelectionType, TableColumn } from '../../types';
import { ICellContext } from '../../types/cell-context.type';
import { IGroupedRows } from '../../types/grouped-rows';
export default class DataTableBodyComponent extends Vue {
    scrollbarV: boolean;
    scrollbarH: boolean;
    loadingIndicator: boolean;
    externalPaging: boolean;
    rowHeight: number | ((row?: any) => number);
    groupRowHeight: number | string;
    offsetX: number;
    emptyMessage: string;
    selectionType: SelectionType;
    selected: any[];
    rowIdentity: any;
    rowDetail: any;
    rowDetailHeight: number | string | ((row?: any, index?: any) => number);
    groupHeader: any;
    selectCheck: any;
    displayCheck: any;
    trackByProp: string;
    rowClass: any;
    groupedRows: any;
    groupExpansionDefault: boolean;
    innerWidth: number;
    groupRowsBy: string;
    virtualization: boolean;
    summaryRow: boolean;
    summaryPosition: string;
    summaryHeight: number | string;
    pageSize: number;
    limit: number;
    rows: any[];
    columns: any[];
    offset: number;
    rowCount: number;
    bodyHeight: number;
    minItemHeight: number | string;
    heightField: string;
    groupHeaderSlot: any;
    rowDetailSlot: any;
    scroller: any;
    selector: any;
    rowHeightsCache: RowHeightCache;
    temp: any[];
    offsetY: number;
    myOffset: number;
    myOffsetX: number;
    indexes: any;
    columnGroupWidths: any;
    columnGroupWidthsWithoutGroup: any;
    rowIndexes: any;
    rowExpansions: any;
    myBodyHeight: any;
    columnsByPin: any;
    groupStyles: {
        left: {};
        center: {};
        right: {};
    };
    rowTrackingFn: any;
    listener: any;
    lastFirst: number;
    lastLast: number;
    lastRowCount: number;
    rowsChanged: boolean;
    private scrollbarHelper;
    private cellContexts;
    /**
     * Creates an instance of DataTableBodyComponent.
     */
    created(): void;
    mounted(): void;
    onPageSize(): void;
    onRowsChanged(): void;
    onGroupedRowsChanged(): void;
    onColumnsChanged(newVal: any, oldVal: any): void;
    onOffsetChanged(): void;
    onOffsetXChanged(): void;
    onMyOffsetXChanged(): void;
    onInnerWidthChanged(): void;
    onMyOffsetChanged(): void;
    onRowCountChanged(): void;
    onBodyHeightChanged(): void;
    readonly bodyWidth: string;
    readonly styleObject: {
        width: string;
        height: any;
    };
    /**
     * Returns if selection is enabled.
     */
    readonly selectEnabled: boolean;
    readonly fixedRowHeight: boolean;
    /**
     * Property that would calculate the height of scroll bar
     * based on the row heights cache for virtual scroll and virtualization. Other scenarios
     * calculate scroll height automatically (as height will be undefined).
     */
    readonly scrollHeight: number | undefined;
    readonly scrollWidth: any;
    /**
     * Called after the constructor, initializing input properties
     */
    /**
     * Called once, before the instance is destroyed.
     */
    destroyed(): void;
    recalculateColumns(val?: any[]): void;
    /**
     * Updates the Y offset given a new offset.
     */
    updateOffsetY(offset?: number): void;
    /**
     * Body was scrolled, this is mainly useful for
     * when a user is server-side pagination via virtual scroll.
     */
    onBodyScroll(event: any): void;
    /**
     * Updates the page given a direction.
     */
    updatePage(direction: string): void;
    /**
     * Updates the rows in the view port
     */
    updateRows(force?: boolean): void;
    /**
     * Get the row height
     */
    getRowHeight(row: any): number;
    /**
     * @param group the group with all rows
     */
    getGroupHeight(group: any): number;
    /**
     * Calculate row height based on the expanded state of the row.
     */
    getRowAndDetailHeight(row: any): number;
    /**
     * Get the height of the detail row.
     */
    getDetailRowHeight: (row?: any, index?: any) => number;
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
     * @param {*} rows The row that needs to be placed in the 2D space.
     * @returns {*} Returns the CSS3 style to be applied
     *
     * @memberOf DataTableBodyComponent
     */
    getRowsStyles(rows: any): any;
    /**
     * Calculate bottom summary row offset for scrollbar mode.
     * For more information about cache and offset calculation
     * see description for `getRowsStyles` method
     *
     * @returns {*} Returns the CSS3 style to be applied
     *
     * @memberOf DataTableBodyComponent
     */
    getBottomSummaryRowStyles(): any;
    /**
     * Hides the loading indicator
     */
    hideIndicator(): void;
    /**
     * Updates the index of the rows in the viewport
     */
    updateIndexes(): void;
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
    toggleRowExpansion(row: any): void;
    /**
     * Expand/Collapse all the rows no matter what their state is.
     */
    toggleAllRows(expanded: boolean): void;
    onGroupToggle($event: any): void;
    /**
     * Recalculates the table
     */
    recalcLayout(): void;
    /**
     * Tracks the column
     */
    columnTrackingFn(index: number, column: any): any;
    /**
     * Gets the row pinning group styles
     */
    initExpansions(group: IGroupedRows): void;
    /**
     * Returns if the row was expanded and set default row expansion when row expansion is empty
     */
    getRowExpanded(row: any): boolean;
    /**
     * Gets the row index given a row
     */
    getRowIndex(row: any): number;
    onTreeAction(row: any): void;
    isSelect(row: any): any;
    onActivate(event: any, index: any): void;
    buildStylesByGroup(): void;
    calcStylesByGroup(group: string): {
        width: string;
    };
    getRowStyles(row: any): object;
    getGroupStyles(colGroup: any): object;
    getGroupClass(row: any): string;
    getCellContext(row: any, group: any, column: any): ICellContext;
    updateCellContext(context: ICellContext, row: any): void;
    cellContextFor(row: any, column: any): ICellContext;
    saveContextFor(row: any, column: any, cellContext: ICellContext): void;
    setCellValue(cellContext: ICellContext): void;
    updateCellContexts(removedColumns: TableColumn[]): void;
    stripHtml(html: string): string;
    cellColumnCssClasses(context: ICellContext): any;
    cellStyleObject(context: ICellContext): {
        width?: undefined;
        minWidth?: undefined;
        maxWidth?: undefined;
        height?: undefined;
    } | {
        width: string;
        minWidth: string;
        maxWidth: string;
        height: string | number;
    };
    marginCellStyle(context: ICellContext): {
        'margin-left'?: undefined;
    } | {
        'margin-left': string;
    };
    cellHeight(rowHeight: any): string | number;
    calcLeftMargin(column: any, row: any): number;
    readonly cellSlots: () => {};
    onCellFocus($event: any): void;
    /**
     * Toggle the expansion of the row
     */
    toggleExpandDetail(row: any): void;
    /**
     * Expand all the rows.
     */
    expandAllDetails(): void;
    /**
     * Collapse all the rows.
     */
    collapseAllDetails(): void;
}
