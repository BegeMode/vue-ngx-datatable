import { Vue } from 'vue-property-decorator';
import { ColumnMode, SortType, SelectionType, TableColumn } from '../types';
export default class DatatableComponent extends Vue {
    /**
     * Template for the target marker of drag target columns.
     */
    targetMarkerTemplate: any;
    /**
     * Rows that are displayed in the table.
     */
    rows: any;
    /**
     * This attribute allows the user to set a grouped array in the following format:
     *  [
     *    {groupid=1} [
     *      {id=1 name="test1"},
     *      {id=2 name="test2"},
     *      {id=3 name="test3"}
     *    ]},
     *    {groupid=2>[
     *      {id=4 name="test4"},
     *      {id=5 name="test5"},
     *      {id=6 name="test6"}
     *    ]}
     *  ]
     */
    /**
     * This attribute allows the user to set the name of the column to group the data with
     */
    groupRowsBy: string;
    columns: TableColumn[];
    /**
     * List of row objects that should be
     * represented as selected in the grid.
     * Default value: `[]`
     */
    selected: any[];
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
    rowHeight: number | string;
    /**
     * The group row height
     */
    groupRowHeight: number | string;
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
     * For no selection pass a `falsey`.
     * Default value: `undefined`
     */
    selectionType: SelectionType;
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
    sorts: any[];
    /**
     * Css class overrides
     */
    cssClasses: any;
    /**
     * Message overrides for localization
     *
     * emptyMessage     [default] = 'No data to display'
     * totalMessage     [default] = 'total'
     * selectedMessage  [default] = 'selected'
     */
    messages: any;
    /**
     * This will be used when displaying or selecting rows.
     * when tracking/comparing them, we'll use the value of this fn,
     *
     * (`fn(x) === fn(y)` instead of `x === y`)
     */
    rowIdentity: (x: any) => any;
    /**
     * Row specific classes.
     * Similar implementation to ngClass.
     *
     *  [rowClass]="'first second'"
     *  [rowClass]="{ 'first': true, 'second': true, 'third': false }"
     */
    rowClass: any;
    /**
     * A boolean/function you can use to check whether you want
     * to select a particular row based on a criteria. Example:
     *
     *    (selection) => {
     *      return selection !== 'Ethel Price';
     *    }
     */
    selectCheck: any;
    /**
     * A function you can use to check whether you want
     * to show the checkbox for a particular row based on a criteria. Example:
     *
     *    (row, column, value) => {
     *      return row.name !== 'Ethel Price';
     *    }
     */
    displayCheck: (row: any, column?: any, value?: any) => boolean;
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
     * Reference to the body component for manually
     * invoking functions on the body.
     */
    bodyComponent: any;
    /**
     * Reference to the header component for manually
     * invoking functions on the header.
     *
     * @private
     * @type {DataTableHeaderComponent}
     * @memberOf DatatableComponent
     */
    headerComponent: any;
    resizeHander: any;
    groupedRows: any[];
    innerWidth: number;
    pageSize: number;
    bodyHeight: number;
    rowCount: number;
    offsetX: number;
    internalRows: any[];
    internalColumns: TableColumn[];
    myColumnMode: ColumnMode;
    mySortType: SortType;
    myOffset_: number;
    mySelected: any[];
    mySorts: any[];
    isVisible: boolean;
    /**
     * Row Detail templates gathered from the ContentChild
     */
    rowDetail: boolean;
    /**
     * Group Header templates gathered from the ContentChild
     */
    groupHeader: boolean;
    groupHeaderSlot: any;
    rowDetailSlot: any;
    footerSlot: any;
    private scrollbarHelper;
    private dimensionsHelper;
    destroyed(): void;
    /**
     * Lifecycle hook that is called after data-bound
     * properties of a directive are initialized.
     */
    mounted(): void;
    /**
     * Body was scrolled typically in a `scrollbarV:true` scenario.
     */
    /**
     * A cell or row was focused via keyboard or mouse click.
     */
    /**
     * A cell or row was selected.
     */
    /**
     * Column sort was invoked.
     */
    /**
     * The table was paged either triggered by the pager or the body scroll.
     */
    /**
     * Columns were re-ordered.
     */
    /**
     * Column was resized.
     */
    /**
     * The context menu was invoked on the table.
     * type indicates whether the header or the body was clicked.
     * content contains either the column or the row that was clicked.
     */
    /**
     * A row was expanded ot collapsed for tree
     */
    onRowsChanged(val: any): void;
    onGroupRowsByChanged(newVal: any, oldVal: any): void;
    /**
     * Columns to be displayed.
     */
    onColumnsChanged(newVal: any): void;
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
    onSortsChanged(): void;
    onSelectedChanged(): void;
    readonly myOffset: number;
    /**
     * CSS class applied if the header height if fixed height.
     */
    readonly isFixedHeader: boolean;
    /**
     * CSS class applied to the root element if
     * the row heights are fixed heights.
     */
    readonly isFixedRow: boolean;
    /**
     * CSS class applied to root element if
     * vertical scrolling is enabled.
     */
    readonly isVertScroll: boolean;
    /**
     * CSS class applied to root element if
     * virtualization is enabled.
     */
    readonly isVirtualized: boolean;
    /**
     * CSS class applied to the root element
     * if the horziontal scrolling is enabled.
     */
    readonly isHorScroll: boolean;
    /**
     * CSS class applied to root element is selectable.
     */
    readonly isSelectable: boolean;
    /**
     * CSS class applied to root is checkbox selection.
     */
    readonly isCheckboxSelection: boolean;
    /**
     * CSS class applied to root if cell selection.
     */
    readonly isCellSelection: boolean;
    /**
     * CSS class applied to root if single select.
     */
    readonly isSingleSelection: boolean;
    /**
     * CSS class added to root element if mulit select
     */
    readonly isMultiSelection: boolean;
    /**
     * CSS class added to root element if mulit click select
     */
    readonly isMultiClickSelection: boolean;
    readonly classObject: {
        'fixed-header': boolean;
        'fixed-row': boolean;
        'scroll-vertical': boolean;
        virtualized: boolean;
        'scroll-horz': boolean;
        selectable: boolean;
        'checkbox-selection': boolean;
        'cell-selection': boolean;
        'single-selection': boolean;
        'multi-selection': boolean;
        'multi-click-selection': boolean;
    };
    readonly allRowsSelected: boolean;
    readonly scrollbarWidth: number;
    /**
     * Column templates gathered from `ContentChildren`
     * if described in your markup.
     */
    /**
     * Returns the column templates.
     */
    /**
     * Footer template gathered from the ContentChild
     */
    /**
     * Translates the templates to the column objects
     */
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
     * Window resize handler to update sizes.
     */
    onWindowResize(): void;
    /**
     * Recalulcates the column widths based on column width
     * distribution mode and scrollbar offsets.
     */
    recalculateColumns(columns?: any[], forceIdx?: number, allowBleed?: boolean): any[] | undefined;
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
    onBodyPage({ offset }: any): void;
    /**
     * The body triggered a scroll event.
     */
    onBodyScroll(event: MouseEvent): void;
    /**
     * The footer triggered a page event.
     */
    onFooterPage(event: any): void;
    onVisible(visible: boolean): void;
    /**
     * Recalculates the sizes of the page
     */
    calcPageSize(val?: any[]): number;
    /**
     * Calculates the row count.
     */
    calcRowCount(val?: any[]): number;
    /**
     * The header triggered a contextmenu event.
     */
    onColumnContextmenu({ event, column }: any): void;
    /**
     * The body triggered a contextmenu event.
     */
    onRowContextmenu({ event, row }: any): void;
    /**
     * The header triggered a column resize event.
     */
    onColumnResize({ column, newValue }: any): void;
    /**
     * The header triggered a column re-order event.
     */
    onColumnReorder({ column, newValue, prevValue }: any): void;
    /**
     * The header triggered a column sort event.
     */
    onColumnSort(event: any): void;
    /**
     * Toggle all row selection
     */
    onHeaderSelect(event: any): void;
    /**
     * A row was selected from body
     */
    onBodySelect(event: any): void;
    /**
     * A row was expanded or collapsed for tree
     */
    onTreeAction(event: any): void;
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
    toggleExpandDetail(row: any): void;
    /**
     * Expand all the rows.
     */
    expandAllDetails(): void;
    /**
     * Collapse all the rows.
     */
    collapseAllDetails(): void;
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
}
