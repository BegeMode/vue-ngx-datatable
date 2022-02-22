import '../themes/material.scss';
import '../themes/dark.scss';
import '../themes/bootstrap.scss';
import '../../assets/icons.css';
import { CheckMode } from 'types/check.type';
import { ColumnMode } from 'types/column-mode.type';
import { IGroupedRows } from 'types/grouped-rows';
import { SelectionType } from 'types/selection.type';
import { SortType } from 'types/sort.type';
import { ISortEvent, ISortPropDir } from 'types/sort-prop-dir.type';
import { TableColumn } from 'types/table-column.type';
import { VNode } from 'vue';
import { Vue } from 'vue-property-decorator';
import DataTableBody from './body/body.component';
import DataTableHeaderComponent from './header/header.component';
interface IGroup {
    title: string;
    prop: string;
    valueGetter?: (value: unknown) => string;
}
export declare type TGroupByField = string | IGroup;
declare type TRowHeightFunc = (row: Record<string, unknown>, index?: number) => number;
export default class DatatableComponent extends Vue {
    visibilityCheck: boolean;
    visibilityCheckTimeout: number;
    /**
     * Rows that are displayed in the table.
     */
    rows: Array<Record<string, unknown>>;
    /**
     * This attribute allows the user to set the names of the columns to group the data with
     */
    groupRowsBy: Array<TGroupByField | Array<TGroupByField>>;
    columns: TableColumn[];
    /**
     * List of row objects that should be
     * represented as selected in the grid.
     * Default value: `[]`
     */
    selected: Array<Record<string, unknown>>;
    /**
     * List of row objects that should be
     * represented as checked in the grid.
     * Default value: `[]`
     */
    checked: Array<Record<string, unknown>>;
    /**
     * Enable vertical scrollbars
     */
    scrollbarV: boolean;
    /**
     * Enable horz scrollbars
     */
    scrollbarH: boolean;
    /**
     * The row height; which is necessary
     * to calculate the height for the lazy rendering.
     */
    rowHeight: TRowHeightFunc | number | string;
    /**
     * The group header row height
     */
    groupRowHeight: number | string;
    /**
     * The group header row styles
     */
    groupHeaderStyles: Record<string, string | number>;
    /**
     * The group header row css classes
     */
    groupHeaderClasses: string | Array<string>;
    /**
     * The detail row height
     */
    rowDetailHeight: number | string;
    /**
     * Type of column width distribution formula.
     * Example: flex, force, standard
     */
    columnMode: string;
    /**
     * The minimum header height in pixels.
     * Pass a falsey for no header
     */
    headerHeight: number;
    /**
     * The minimum footer height in pixels.
     * Pass falsey for no footer
     */
    footerHeight: number;
    /**
     * If the table should use external paging
     * otherwise its assumed that all data is preloaded.
     */
    externalPaging: boolean;
    /**
     * If the table should use external page switcher
     */
    externalPager: boolean;
    /**
     * If the table should use external sorting or
     * the built-in basic sorting.
     */
    externalSorting: boolean;
    /**
     * The page size to be shown.
     * Default value: `undefined`
     */
    limit: number;
    /**
     * The total count of all rows.
     * Default value: `0`
     */
    count: number;
    /**
     * The current offset ( page - 1 ) shown.
     * Default value: `0`
     */
    offset: number;
    /**
     * Show the linear loading bar.
     * Default value: `false`
     */
    loadingIndicator: boolean;
    /**
     * Type of row selection. Options are:
     *
     *  - `single`
     *  - `multi`
     *  - `checkbox`
     *  - `multiClick`
     *  - `cell`
     *
     * For no selection pass a `false`.
     * Default value: `undefined`
     */
    selectionType: SelectionType;
    /**
     * Type of row check type. Options are:
     *
     *  - `checkIsSelect`
     *  - `checkNoSelect`
     *
     * Default value: `checkIsSelect`
     */
    checkMode: CheckMode;
    /**
     * Enable/Disable ability to re-order columns
     * by dragging them.
     */
    reorderable: boolean;
    /**
     * Swap columns on re-order columns or
     * move them.
     */
    swapColumns: boolean;
    /**
     * The type of sorting
     */
    sortType: string;
    /**
     * Array of sorted columns by property and type.
     * Default value: `[]`
     */
    sorts: ISortPropDir[];
    /**
     * Go to first page when sorting to see the newly sorted data
     * Default value: true
     */
    goToFirstAfterSort: boolean;
    /**
     * Css class overrides
     */
    cssClasses: Record<string, unknown>;
    /**
     * Message overrides for localization
     *
     * emptyMessage     [default] = 'No data to display'
     * totalMessage     [default] = 'total'
     * selectedMessage  [default] = 'selected'
     */
    messages: Record<string, string>;
    /**
     * This will be used when displaying or selecting rows.
     * when tracking/comparing them, we'll use the value of this fn,
     *
     * (`fn(x) === fn(y)` instead of `x === y`)
     */
    rowIdentity: (x: Record<string, unknown>) => string | number;
    /**
     * Row specific classes.
     * Similar implementation to ngClass.
     *
     *  [rowClass]="'first second'"
     *  [rowClass]="{ 'first': true, 'second': true, 'third': false }"
     */
    rowClass: (row: Record<string, unknown>, rowIndex: number) => string | string;
    /**
     * A boolean/function you can use to check whether you want
     * to select a particular row based on a criteria. Example:
     *
     *    (selection) => {
     *      return selection !== 'Ethel Price';
     *    }
     */
    selectCheck: () => void;
    /**
     * A function you can use to check whether you want
     * to show the checkbox for a particular row based on a criteria. Example:
     *
     *    (row, column, value) => {
     *      return row.name !== 'Ethel Price';
     *    }
     */
    displayCheck: (row: Record<string, unknown>, column?: TableColumn, value?: unknown) => boolean;
    /**
     * A boolean you can use to set the detault behaviour of rows and groups
     * whether they will start expanded or not. If ommited the default is NOT expanded.
     *
     */
    groupExpansionDefault: boolean;
    /**
     * Property to which you can use for custom tracking of rows.
     * Example: 'name'
     */
    trackByProp: string;
    /**
     * Property to which you can use for determining select all
     * rows on current page or not.
     *
     * @type {boolean}
     * @memberOf DatatableComponent
     */
    selectAllRowsOnPage: boolean;
    /**
     * A flag for row virtualization on / off
     */
    virtualization: boolean;
    /**
     * Tree from relation
     */
    treeFromRelation: string;
    /**
     * Tree to relation
     */
    treeToRelation: string;
    /**
     * Is the tree will be lazy loading
     */
    lazyTree: boolean;
    /**
     * A flag for switching summary row on / off
     */
    summaryRow: boolean;
    /**
     * A height of summary row
     */
    summaryHeight: number | string;
    /**
     * A property holds a summary row position: top/bottom
     */
    summaryPosition: string;
    /**
     * Before selection row check function. If return false selection will be cancel
     */
    beforeSelectRowCheck: (newRow: Record<string, unknown>, oldSelected: Record<string, unknown>[]) => boolean | Promise<boolean>;
    /**
     * Reference to the body component for manually
     * invoking functions on the body.
     */
    bodyComponent: DataTableBody;
    /**
     * Reference to the header component for manually
     * invoking functions on the header.
     *
     * @private
     * @type {DataTableHeaderComponent}
     * @memberOf DatatableComponent
     */
    headerComponent: DataTableHeaderComponent;
    resizeHandler: () => void;
    resizeObserver?: ResizeObserver;
    groupedRows: IGroupedRows[];
    innerWidth: number;
    pageSize: number;
    bodyHeight: number;
    rowCount: number;
    offsetX: number;
    internalRows: Array<Record<string, unknown>>;
    initialRows: Array<Record<string, unknown>>;
    internalColumns: TableColumn[];
    myColumnMode: ColumnMode;
    mySortType: SortType;
    innerOffset: number;
    mySelected: Array<Record<string, unknown>>;
    myChecked: Array<Record<string, unknown>>;
    expandedGroups: Record<string, boolean>;
    renderTracking: boolean;
    isVisible: boolean;
    rowDetail: boolean;
    groupHeader: boolean;
    groupHeaderSlot: (obj: Record<string, unknown>) => VNode[];
    rowDetailSlot: (obj: Record<string, unknown>) => VNode[];
    footerSlot: (obj: Record<string, unknown>) => VNode[];
    private readonly scrollbarHelper;
    private readonly dimensionsHelper;
    private needToCalculateDims;
    private activeGroupRow;
    onRowsChanged(val: Array<Record<string, unknown>>): void;
    onGroupRowsByChanged(newVal: Array<TGroupByField | Array<TGroupByField>>, oldVal: Array<TGroupByField | Array<TGroupByField>>): void;
    /**
     * Columns to be displayed.
     */
    onColumnsChanged(newVal: TableColumn[]): void;
    /**
     * The page size to be shown.
     * Default value: `undefined`
     */
    onLimitChanged(): void;
    /**
     * The total count of all rows.
     * Default value: `0`
     */
    onCountChanged(): void;
    onColumnModeChanged(): void;
    onSortTypeChanged(): void;
    onOffsetChanged(): void;
    onPageSizeChanged(): void;
    onSelectedChanged(): void;
    onCheckedChanged(): void;
    onSortsChanged(): void;
    /**
     * Window resize handler to update sizes.
     */
    onWindowResize(): void;
    created(): void;
    beforeDestroy(): void;
    /**
     * Lifecycle hook that is called after data-bound
     * properties of a directive are initialized.
     */
    mounted(): void;
    get myRowHeight(): number | string | TRowHeightFunc;
    get myOffset(): number;
    /**
     * CSS class applied if the header height if fixed height.
     */
    get isFixedHeader(): boolean;
    /**
     * CSS class applied to the root element if
     * the row heights are fixed heights.
     */
    get isFixedRow(): boolean;
    /**
     * CSS class applied to root element if
     * vertical scrolling is enabled.
     */
    get isVertScroll(): boolean;
    /**
     * CSS class applied to root element if
     * virtualization is enabled.
     */
    get isVirtualized(): boolean;
    /**
     * CSS class applied to the root element
     * if the horziontal scrolling is enabled.
     */
    get isHorScroll(): boolean;
    /**
     * CSS class applied to root element is selectable.
     */
    get isSelectable(): boolean;
    /**
     * CSS class applied to root is checkbox selection.
     */
    get isCheckboxSelection(): boolean;
    /**
     * CSS class applied to root if cell selection.
     */
    get isCellSelection(): boolean;
    /**
     * CSS class applied to root if single select.
     */
    get isSingleSelection(): boolean;
    get isSingleFocusSelection(): boolean;
    /**
     * CSS class added to root element if mulit select
     */
    get isMultiSelection(): boolean;
    /**
     * CSS class added to root element if mulit click select
     */
    get isMultiClickSelection(): boolean;
    get classObject(): Record<string, unknown>;
    get allRowsSelected(): boolean;
    get scrollbarWidth(): number;
    reset(): void;
    adjust(): void;
    /**
     * Recalc's the sizes of the grid.
     *
     * Updated automatically on changes to:
     *
     *  - Columns
     *  - Rows
     *  - Paging related
     *
     * Also can be manually invoked or upon window resize.
     */
    recalculate(): void;
    /**
     * Recalulcates the column widths based on column width
     * distribution mode and scrollbar offsets.
     */
    recalculateColumns(columns?: TableColumn[], forceIdx?: number, allowBleed?: boolean): TableColumn[] | null;
    calculateColumnsWidth(width: number, columns?: TableColumn[], forceIdx?: number, allowBleed?: boolean): void;
    /**
     * Recalculates the dimensions of the table size.
     * Internally calls the page size and row count calcs too.
     *
     */
    recalculateDims(): void;
    /**
     * Recalculates the pages after a update.
     */
    recalculatePages(): void;
    /**
     * Body triggered a page event.
     */
    onBodyPage({ offset }: {
        offset: number;
    }): void;
    /**
     * The body triggered a scroll event.
     */
    onBodyScroll(event: MouseEvent): void;
    /**
     * The footer triggered a page event.
     */
    onFooterPage(event: {
        page: number;
    }): void;
    onVisible(visible: boolean): void;
    /**
     * Recalculates the sizes of the page
     */
    calcPageSize(val?: Array<Record<string, unknown>>): number;
    /**
     * Calculates the row count.
     */
    calcRowCount(val?: Array<Record<string, unknown>>): number;
    /**
     * The header triggered a contextmenu event.
     */
    onColumnContextmenu({ event, column }: {
        event: MouseEvent;
        column: TableColumn;
    }): void;
    /**
     * The body triggered a contextmenu event.
     */
    onRowContextmenu({ event, row }: {
        event: MouseEvent;
        row: Record<string, unknown>;
    }): void;
    /**
     * The header triggered a column resize event.
     */
    onColumnResize({ column, newValue }: {
        column: TableColumn;
        newValue: number;
    }): void;
    /**
     * The header triggered a column re-order event.
     */
    onColumnReorder({ column, newValue, prevValue }: {
        column: TableColumn;
        newValue: number;
        prevValue: number;
    }): void;
    /**
     * The header triggered a column sort event.
     */
    onColumnSort(event: ISortEvent): void;
    /**
     * Toggle all row selection
     */
    onHeaderSelect(isChecked: boolean): void;
    /**
     * A row was selected from body
     */
    onBodySelect(event: Event): void;
    /**
     * A row was checked from body
     */
    onBodyCheck(event: Event): void;
    onGroupToggle(event: {
        value: IGroupedRows | boolean;
    }): void;
    /**
     * A row was expanded or collapsed for tree
     */
    onTreeAction(event: {
        row: Record<string, unknown>;
    }): void;
    onColumnInsert(column: TableColumn): void;
    onColumnRemoved(column: TableColumn): void;
    onColumnChangeVisible(column: TableColumn): void;
    /**
     * listen for changes to input bindings of all DataTableColumnDirective and
     * trigger the columnTemplates.changes observable to emit
     */
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
    /**
     * Expand all the group rows.
     */
    expandAllGroups(): void;
    /**
     * Collapse all the rows.
     */
    collapseAllGroups(): void;
    /**
     * Is the row visible in the current page
     */
    isRowVisible(row: Record<string, unknown>): boolean;
    /**
     * Is the group row expanded
     */
    private isGroupExpanded;
    private innerSortRows;
    /**
     * Creates a map with the data grouped by the user choice of grouping index
     *
     * @param originalArray the original array passed via parameter
     * @param groupByIndex  the index of the column to group the data by
     */
    private groupArrayBy;
    private addGroup;
    private getGroupTitle;
    private sortInternalRows;
    private sortGroupedRows;
    private expandCollapseRow;
    private addRow;
    private processGroupedRows;
}
export {};
