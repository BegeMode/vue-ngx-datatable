import { CheckMode } from 'types/check.type';
import { ColumnMode } from 'types/column-mode.type';
import { ContextmenuType } from 'types/contextmenu.type';
import { IGroupedRows } from 'types/grouped-rows';
import { SelectionType } from 'types/selection.type';
import { SortType } from 'types/sort.type';
import { ISortEvent, ISortPropDir } from 'types/sort-prop-dir.type';
import { TableColumn } from 'types/table-column.type';
import { setColumnDefaults, setColumnsDefaults } from 'utils/column-helper';
import { isArrayEqual } from 'utils/equal.array';
import { adjustColumnWidths, forceFillColumnWidths } from 'utils/math';
import { sortRows } from 'utils/sort';
import { throttleable } from 'utils/throttle';
import { groupRowsByParents, optionalGetterForProp } from 'utils/tree';
import { VNode } from 'vue';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import VisibilityDirective from '../directives/visibility.directive';
import { DimensionsHelper } from '../services/dimensions-helper.service';
import { ScrollbarHelper } from '../services/scrollbar-helper.service';
import DataTableBody from './body/body.component';
import DataTableBodyComponent from './body/body.component.vue';
import DataTableBodyCellComponent from './body/body-cell.component.vue';
import DataTableColumnComponent from './columns/column.component';
import DataTableFooterComponent from './footer/footer.component';
import DataTableHeaderComponent from './header/header.component';

Vue.component('datatable-column', DataTableColumnComponent);
Vue.component('datatable-body-cell', DataTableBodyCellComponent);

interface IGroup {
  title: string;
  prop: string;
  valueGetter?: (value: unknown) => string;
}

export type TGroupByField = string | IGroup;

type TRowHeightFunc = (row: Record<string, unknown>, index?: number) => number;

@Component({
  directives: {
    'v-visibility-observer': VisibilityDirective,
  },
  components: {
    'datatable-header': DataTableHeaderComponent,
    'datatable-body': DataTableBodyComponent,
    'datatable-footer': DataTableFooterComponent,
  },
})
export default class DatatableComponent extends Vue {
  @Prop({ default: false }) visibilityCheck: boolean;
  @Prop({ default: 1000 }) visibilityCheckTimeout: number;
  /**
   * Rows that are displayed in the table.
   */
  @Prop() rows: Array<Record<string, unknown>>;
  /**
   * This attribute allows the user to set the names of the columns to group the data with
   */
  @Prop() groupRowsBy: Array<TGroupByField | Array<TGroupByField>>;
  @Prop() columns: TableColumn[];
  /**
   * List of row objects that should be
   * represented as selected in the grid.
   * Default value: `[]`
   */
  @Prop({ type: Array, default: (): Array<Record<string, unknown>> => [] }) selected: Array<Record<string, unknown>>;
  /**
   * List of row objects that should be
   * represented as checked in the grid.
   * Default value: `[]`
   */
  @Prop({ type: Array, default: (): Array<Record<string, unknown>> => [] }) checked: Array<Record<string, unknown>>;
  /**
   * Enable vertical scrollbars
   */
  @Prop({ type: Boolean, default: false }) scrollbarV: boolean;
  /**
   * Enable horz scrollbars
   */
  @Prop({ type: Boolean, default: false }) scrollbarH: boolean;
  /**
   * The row height; which is necessary
   * to calculate the height for the lazy rendering.
   */
  @Prop({ default: 'auto' }) rowHeight: TRowHeightFunc | number | string;
  /**
   * The group header row height
   */
  @Prop() groupRowHeight: number | string;
  /**
   * The group header row styles
   */
  @Prop() groupHeaderStyles: Record<string, string | number>;
  /**
   * The group header row css classes
   */
  @Prop() groupHeaderClasses: string | Array<string>;
  /**
   * The detail row height
   */
  @Prop() rowDetailHeight: number | string;
  /**
   * Type of column width distribution formula.
   * Example: flex, force, standard
   */
  @Prop({ type: String, validator: (value: string) => ['standard', 'flex', 'force'].indexOf(value) !== -1 })
  columnMode: string;
  /**
   * The minimum header height in pixels.
   * Pass a falsey for no header
   */
  @Prop({ type: Number, default: 30 }) headerHeight: number;
  /**
   * The minimum footer height in pixels.
   * Pass falsey for no footer
   */
  @Prop({ type: Number, default: 0 }) footerHeight: number;
  /**
   * If the table should use external paging
   * otherwise its assumed that all data is preloaded.
   */
  @Prop({ type: Boolean, default: false }) externalPaging: boolean;
  /**
   * If the table should use external page switcher
   */
  @Prop({ type: Boolean, default: false }) externalPager: boolean;
  /**
   * If the table should use external sorting or
   * the built-in basic sorting.
   */
  @Prop({ type: Boolean, default: false }) externalSorting: boolean;
  /**
   * The page size to be shown.
   * Default value: `undefined`
   */
  @Prop() limit: number;
  /**
   * The total count of all rows.
   * Default value: `0`
   */
  @Prop({ type: Number, default: 0 }) count: number;
  /**
   * The current offset ( page - 1 ) shown.
   * Default value: `0`
   */
  @Prop({ type: Number, default: 0 }) offset: number;
  /**
   * Show the linear loading bar.
   * Default value: `false`
   */
  @Prop({ type: Boolean, default: false }) loadingIndicator: boolean;
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
  @Prop() selectionType: SelectionType;
  /**
   * Type of row check type. Options are:
   *
   *  - `checkIsSelect`
   *  - `checkNoSelect`
   *
   * Default value: `checkIsSelect`
   */
  @Prop({ default: CheckMode.checkIsSelect }) checkMode: CheckMode;
  /**
   * Enable/Disable ability to re-order columns
   * by dragging them.
   */
  @Prop({ type: Boolean, default: true }) reorderable: boolean;
  /**
   * Swap columns on re-order columns or
   * move them.
   */
  @Prop({ type: Boolean, default: false }) swapColumns: boolean;
  /**
   * The type of sorting
   */
  @Prop({ type: String, validator: (value: string) => ['single', 'multi'].indexOf(value) !== -1 }) sortType: string;
  /**
   * Array of sorted columns by property and type.
   * Default value: `[]`
   */
  @Prop({ type: Array, default: (): Array<ISortPropDir> => [] }) sorts: ISortPropDir[];
  /**
   * Go to first page when sorting to see the newly sorted data
   * Default value: true
   */
  @Prop({ default: true }) goToFirstAfterSort: boolean;
  /**
   * Css class overrides
   */
  @Prop({
    type: Object,
    default: () => ({
      sortAscending: 'datatable-icon-up',
      sortDescending: 'datatable-icon-down',
      pagerLeftArrow: 'datatable-icon-left',
      pagerRightArrow: 'datatable-icon-right',
      pagerPrevious: 'datatable-icon-prev',
      pagerNext: 'datatable-icon-skip',
    }),
  })
  cssClasses: Record<string, unknown>;
  /**
   * Message overrides for localization
   *
   * emptyMessage     [default] = 'No data to display'
   * totalMessage     [default] = 'total'
   * selectedMessage  [default] = 'selected'
   */
  @Prop({
    type: Object,
    default: () => ({
      emptyMessage: 'No data to display',
      // Footer total message
      totalMessage: 'total',
      // Footer selected message
      selectedMessage: 'selected',
    }),
  })
  messages: Record<string, string>;
  /**
   * This will be used when displaying or selecting rows.
   * when tracking/comparing them, we'll use the value of this fn,
   *
   * (`fn(x) === fn(y)` instead of `x === y`)
   */
  @Prop({ type: Function, default: (x: Record<string, unknown>) => x }) rowIdentity: (
    x: Record<string, unknown>
  ) => string | number;
  /**
   * Row specific classes.
   * Similar implementation to ngClass.
   *
   *  [rowClass]="'first second'"
   *  [rowClass]="{ 'first': true, 'second': true, 'third': false }"
   */
  @Prop() rowClass: (row: Record<string, unknown>, rowIndex: number) => string | string;
  /**
   * A boolean/function you can use to check whether you want
   * to select a particular row based on a criteria. Example:
   *
   *    (selection) => {
   *      return selection !== 'Ethel Price';
   *    }
   */
  @Prop() selectCheck: () => void;
  /**
   * A function you can use to check whether you want
   * to show the checkbox for a particular row based on a criteria. Example:
   *
   *    (row, column, value) => {
   *      return row.name !== 'Ethel Price';
   *    }
   */
  @Prop({ type: Function, default: null }) displayCheck: (
    row: Record<string, unknown>,
    column?: TableColumn,
    value?: unknown
  ) => boolean;
  /**
   * A boolean you can use to set the detault behaviour of rows and groups
   * whether they will start expanded or not. If ommited the default is NOT expanded.
   *
   */
  @Prop({ type: Boolean, default: false }) groupExpansionDefault: boolean;
  /**
   * Property to which you can use for custom tracking of rows.
   * Example: 'name'
   */
  @Prop() trackByProp: string;
  /**
   * Property to which you can use for determining select all
   * rows on current page or not.
   *
   * @type {boolean}
   * @memberOf DatatableComponent
   */
  @Prop({ type: Boolean, default: false }) selectAllRowsOnPage: boolean;
  /**
   * A flag for row virtualization on / off
   */
  @Prop({ type: Boolean, default: true }) virtualization: boolean;
  /**
   * Tree from relation
   */
  @Prop() treeFromRelation: string;
  /**
   * Tree to relation
   */
  @Prop() treeToRelation: string;
  /**
   * Is the tree will be lazy loading
   */
  @Prop({ default: false }) lazyTree: boolean;
  /**
   * A flag for switching summary row on / off
   */
  @Prop({ type: Boolean, default: false }) summaryRow: boolean;
  /**
   * A height of summary row
   */
  @Prop({ default: 30 }) summaryHeight: number | string;
  /**
   * A property holds a summary row position: top/bottom
   */
  @Prop({ type: String, default: 'top' }) summaryPosition: string;
  /**
   * Before selection row check function. If return false selection will be cancel
   */
  @Prop() beforeSelectRowCheck: (newRow: Record<string, unknown>, oldSelected: Record<string, unknown>[]) => boolean;

  // non-reactive
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

  groupedRows: IGroupedRows[] = null;

  innerWidth = 0;
  pageSize = 0;
  bodyHeight = 0;
  rowCount = 0;
  offsetX = 0;
  internalRows: Array<Record<string, unknown>> = null;
  initialRows: Array<Record<string, unknown>> = null;
  internalColumns: TableColumn[] = null;
  myColumnMode: ColumnMode = ColumnMode.standard;
  mySortType: SortType = SortType.single;
  innerOffset = 0; // page number after scrolling
  mySelected: Array<Record<string, unknown>> = [];
  myChecked: Array<Record<string, unknown>> = [];
  renderTracking = false;
  isVisible = false;

  rowDetail = false; // DatatableRowDetailDirective;
  groupHeader = false; // DatatableGroupHeaderDirective;

  groupHeaderSlot: (obj: Record<string, unknown>) => VNode[] = null;
  rowDetailSlot: (obj: Record<string, unknown>) => VNode[] = null;
  footerSlot: (obj: Record<string, unknown>) => VNode[] = null;
  // isColumnsInited = false;
  // isColumnsInitedTimeoutId: number;

  private readonly scrollbarHelper: ScrollbarHelper = new ScrollbarHelper();
  private readonly dimensionsHelper: DimensionsHelper = new DimensionsHelper();
  private needToCalculateDims = true;

  @Watch('rows', { immediate: true }) onRowsChanged(val: Array<Record<string, unknown>>): void {
    if (val) {
      this.internalRows = [...val];
    }
    const treeFrom = optionalGetterForProp(this.treeFromRelation);
    const treeTo = optionalGetterForProp(this.treeToRelation);
    if (treeFrom && treeTo) {
      this.initialRows = this.internalRows;
    }

    // auto sort on new updates
    if (!this.externalSorting) {
      this.sortInternalRows();
    }

    // auto group by parent on new update
    this.internalRows = groupRowsByParents(
      this.internalRows as Array<{ level: number; treeStatus?: string }>,
      treeFrom,
      treeTo,
      this.lazyTree
    );
    this.groupedRows = null;
    if (this.rows && this.groupRowsBy) {
      // this.groupedRows = this.groupArrayBy(this.rows, this.groupRowsBy);
      this.groupedRows = this.groupArrayBy(this.rows, this.groupRowsBy, 0);
      this.internalRows = this.processGroupedRows(this.groupedRows) as Array<Record<string, unknown>>;
    }

    // recalculate sizes/etc
    if (this.$el) {
      this.recalculate();
    }
  }

  @Watch('groupRowsBy') onGroupRowsByChanged(
    newVal: Array<TGroupByField | Array<TGroupByField>>,
    oldVal: Array<TGroupByField | Array<TGroupByField>>
  ): void {
    if (isArrayEqual(newVal, oldVal)) {
      return;
    }
    this.groupHeader = Boolean(this.groupRowsBy);
    this.groupedRows = null;
    if (this.groupRowsBy) {
      this.groupedRows = this.groupArrayBy(this.rows, this.groupRowsBy, 0);
      this.internalRows = this.processGroupedRows(this.groupedRows) as Array<Record<string, unknown>>;
    } else {
      this.internalRows = this.rows;
    }
    // auto sort on new updates
    if (!this.externalSorting) {
      this.sortInternalRows();
    }
    this.recalculate();
  }

  /**
   * Columns to be displayed.
   */
  @Watch('columns', { immediate: true }) onColumnsChanged(newVal: TableColumn[]): void {
    if (newVal) {
      setColumnsDefaults(newVal, this);
      this.internalColumns = [...newVal];
      this.$nextTick(() => this.recalculateColumns());
    }
  }
  /**
   * The page size to be shown.
   * Default value: `undefined`
   */
  @Watch('limit') onLimitChanged(): void {
    // recalculate sizes/etc
    this.recalculate();
  }
  /**
   * The total count of all rows.
   * Default value: `0`
   */
  @Watch('count') onCountChanged(): void {
    // recalculate sizes/etc
    this.recalculate();
  }

  @Watch('columnMode', { immediate: true }) onColumnModeChanged(): void {
    this.myColumnMode = ColumnMode[this.columnMode] as ColumnMode;
  }

  @Watch('sortType', { immediate: true }) onSortTypeChanged(): void {
    if (SortType[this.sortType]) {
      this.mySortType = SortType[this.sortType] as SortType;
    }
  }

  @Watch('offset', { immediate: true }) onOffsetChanged(): void {
    if (this.innerOffset !== this.offset) {
      this.innerOffset = this.offset;
      if (this.pageSize && this.innerOffset >= 0) {
        this.onFooterPage({ page: this.innerOffset + 1 });
      }
    }
  }

  @Watch('pageSize') onPageSizeChanged(): void {
    if (this.pageSize && this.innerOffset >= 0) {
      this.$nextTick(() => this.onFooterPage({ page: this.innerOffset + 1 }));
    }
  }

  @Watch('selected', { immediate: true }) onSelectedChanged(): void {
    this.mySelected = this.selected;
  }

  @Watch('checked', { immediate: true }) onCheckedChanged(): void {
    this.myChecked = this.checked;
  }

  @Watch('sorts') onSortsChanged(): void {
    this.innerSortRows();
  }

  /**
   * Window resize handler to update sizes.
   */
  @throttleable(5)
  onWindowResize(): void {
    this.recalculate();
  }

  created(): void {
    this.groupHeader = Boolean(this.groupRowsBy);
    if (this.$listeners.rendered) {
      this.renderTracking = true;
    }
  }

  beforeDestroy(): void {
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.$el);
    }
  }

  /**
   * Lifecycle hook that is called after data-bound
   * properties of a directive are initialized.
   */
  mounted(): void {
    this.bodyComponent = this.$refs.datatableBody as DataTableBody;
    this.headerComponent = this.$refs.datatableHeader as DataTableHeaderComponent;
    this.groupHeaderSlot = this.$scopedSlots.groupHeader;
    this.rowDetailSlot = this.$scopedSlots.rowDetail;
    this.footerSlot = this.$scopedSlots.footer;
    this.rowDetail = Boolean(this.rowDetailSlot);

    if (!this.externalSorting) {
      this.sortInternalRows();
    }
    if ((window as Window).ResizeObserver) {
      this.needToCalculateDims = false;
      this.resizeObserver = new (window as Window).ResizeObserver(entries => {
        let height = 0;
        if (entries.length && entries[0].contentRect) {
          this.innerWidth = Math.floor(entries[0].contentRect.width);
          height = entries[0].contentRect.height;
        } else {
          height = this.$el.clientHeight;
          this.innerWidth = this.$el.clientWidth;
        }
        if (this.scrollbarV) {
          if (this.headerHeight) {
            height = height - this.headerHeight;
          }
          if (this.footerHeight) {
            height = height - this.footerHeight;
          }
          this.bodyHeight = height;
        }
        if (typeof requestAnimationFrame === 'undefined') {
          this.recalculate();
        } else {
          requestAnimationFrame(() => {
            this.recalculate();
          });
        }
      });
      this.resizeObserver.observe(this.$el);
    } else {
      this.resizeHandler = this.onWindowResize.bind(this) as () => void;
      window.addEventListener('resize', this.resizeHandler);
    }
    const init = () => {
      this.recalculate();
      // emit page for virtual server-side kickoff
      if (this.externalPaging && this.scrollbarV) {
        this.$emit('page', {
          count: this.count,
          pageSize: this.pageSize,
          limit: this.limit,
          offset: this.innerOffset,
        });
      }
    };
    if (typeof requestAnimationFrame === 'undefined') {
      init();
    } else {
      requestAnimationFrame(() => {
        init();
      });
    }
  }

  get myRowHeight(): number | string | TRowHeightFunc {
    if (typeof this.rowHeight === 'string') {
      return this.rowHeight === 'auto' ? 'auto' : Number(this.rowHeight);
    }
    return this.rowHeight;
  }

  get myOffset(): number {
    if (this.rowCount) {
      return Math.max(Math.min(this.innerOffset, Math.ceil(this.rowCount / this.pageSize) - 1), 0);
    }
    return this.innerOffset;
  }

  /**
   * CSS class applied if the header height if fixed height.
   */
  get isFixedHeader(): boolean {
    const headerHeight: number | string = this.headerHeight;
    return typeof headerHeight === 'string' ? <string>headerHeight !== 'auto' : true;
  }

  /**
   * CSS class applied to the root element if
   * the row heights are fixed heights.
   */
  get isFixedRow(): boolean {
    if (typeof this.rowHeight === 'function' || this.rowHeight === 'auto') {
      return false;
    }
    return true;
    // const rowHeight: number | string = this.rowHeight;
    // return typeof rowHeight === 'string' ? rowHeight !== 'auto' : true;
  }

  /**
   * CSS class applied to root element if
   * vertical scrolling is enabled.
   */
  get isVertScroll(): boolean {
    return this.scrollbarV;
  }

  /**
   * CSS class applied to root element if
   * virtualization is enabled.
   */
  get isVirtualized(): boolean {
    return this.virtualization;
  }

  /**
   * CSS class applied to the root element
   * if the horziontal scrolling is enabled.
   */
  get isHorScroll(): boolean {
    return this.scrollbarH;
  }

  /**
   * CSS class applied to root element is selectable.
   */
  get isSelectable(): boolean {
    // eslint-disable-next-line no-undefined
    return this.selectionType !== undefined;
  }

  /**
   * CSS class applied to root is checkbox selection.
   */
  get isCheckboxSelection(): boolean {
    return this.selectionType === SelectionType.checkbox;
  }

  /**
   * CSS class applied to root if cell selection.
   */
  get isCellSelection(): boolean {
    return this.selectionType === SelectionType.cell;
  }

  /**
   * CSS class applied to root if single select.
   */
  get isSingleSelection(): boolean {
    return this.selectionType === SelectionType.single;
  }

  get isSingleFocusSelection(): boolean {
    return this.selectionType === SelectionType.singleFocus;
  }

  /**
   * CSS class added to root element if mulit select
   */
  get isMultiSelection(): boolean {
    return this.selectionType === SelectionType.multi;
  }

  /**
   * CSS class added to root element if mulit click select
   */
  get isMultiClickSelection(): boolean {
    return this.selectionType === SelectionType.multiClick;
  }

  get classObject(): Record<string, unknown> {
    return {
      'fixed-header': this.isFixedHeader,
      'fixed-row': this.isFixedRow,
      'scroll-vertical': this.isVertScroll,
      virtualized: this.isVirtualized,
      'scroll-horz': this.isHorScroll,
      selectable: this.isSelectable,
      'checkbox-selection': this.isCheckboxSelection,
      'cell-selection': this.isCellSelection,
      'single-selection': this.isSingleSelection,
      'multi-selection': this.isMultiSelection,
      'multi-click-selection': this.isMultiClickSelection,
    };
  }

  get allRowsSelected(): boolean {
    let arr = this.mySelected;
    if (this.checkMode === CheckMode.checkNoSelect) {
      arr = this.myChecked;
    }
    let allRowsSelected = this.rows && arr && arr.length === this.rows.length;

    if (this.selectAllRowsOnPage && this.bodyComponent) {
      const indexes: { first: number; last: number } = this.bodyComponent.indexes;
      let rowsOnPage = this.rows.length;
      if (this.limit && !this.scrollbarV && !this.virtualization) {
        rowsOnPage = indexes.last - indexes.first;
      }
      allRowsSelected = arr.length === rowsOnPage;
    }

    return arr && this.rows && this.rows.length !== 0 && allRowsSelected;
  }

  get scrollbarWidth(): number {
    return this.scrollbarHelper.width;
  }

  reset(): void {
    this.bodyComponent.reset();
  }

  adjust(): void {
    this.bodyHeight = -1;
    setTimeout(() => {
      this.recalculateDims();
    });
  }

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
  recalculate(): void {
    if (this.needToCalculateDims) {
      // this.recalculatePages will be called in this.recalculateDims
      this.recalculateDims();
    } else {
      this.recalculatePages();
    }
    this.recalculateColumns();
  }

  /**
   * Recalulcates the column widths based on column width
   * distribution mode and scrollbar offsets.
   */
  recalculateColumns(
    columns: TableColumn[] = this.internalColumns,
    forceIdx: number = -1,
    allowBleed: boolean = this.scrollbarH
  ): TableColumn[] | null {
    if (!columns) {
      return null;
    }
    let width = this.innerWidth;
    if (this.scrollbarV || this.treeFromRelation) {
      width = width - this.scrollbarHelper.width;
    }
    this.calculateColumnsWidth(width, columns, forceIdx, allowBleed);
    return columns;
  }

  calculateColumnsWidth(
    width: number,
    columns: TableColumn[] = this.internalColumns,
    forceIdx: number = -1,
    allowBleed: boolean = this.scrollbarH
  ) {
    if (this.myColumnMode === ColumnMode.force) {
      forceFillColumnWidths(columns, width, forceIdx, allowBleed);
    } else if (this.myColumnMode === ColumnMode.flex) {
      adjustColumnWidths(columns, width);
    }
    const hiddenColumns = columns.filter(col => col.hidden);
    if (hiddenColumns.length && this.bodyComponent) {
      this.bodyComponent.onInnerWidthChanged();
    }
  }

  /**
   * Recalculates the dimensions of the table size.
   * Internally calls the page size and row count calcs too.
   *
   */
  recalculateDims(): void {
    const dims = this.dimensionsHelper.getDimensions(this.$el);
    this.innerWidth = Math.floor(dims.width);

    if (this.scrollbarV) {
      let height = dims.height;
      if (this.headerHeight) {
        height = height - this.headerHeight;
      }
      if (this.footerHeight) {
        height = height - this.footerHeight;
      }
      this.bodyHeight = height;
    }
    this.recalculatePages();
  }

  /**
   * Recalculates the pages after a update.
   */
  recalculatePages(): void {
    this.pageSize = this.calcPageSize();
    this.rowCount = this.calcRowCount();
    this.$emit('row-count', this.rowCount);
  }

  /**
   * Body triggered a page event.
   */
  onBodyPage({ offset }: { offset: number }): void {
    // Avoid pagination caming from body events like scroll when the table
    // has no virtualization and the external paging is enable.
    // This means, let's the developer handle pagination by my him(her) self
    if (this.externalPaging && !this.virtualization) {
      return;
    }
    if (this.innerOffset === offset) {
      return;
    }
    this.innerOffset = offset;
    this.$emit('page', {
      count: this.count,
      pageSize: this.pageSize,
      limit: this.limit,
      offset: this.innerOffset,
    });
  }

  /**
   * The body triggered a scroll event.
   */
  onBodyScroll(event: MouseEvent): void {
    this.offsetX = event.offsetX;
    // this.$emit('offsetX', event.offsetX);
    this.$emit('scroll', event);
  }

  /**
   * The footer triggered a page event.
   */
  onFooterPage(event: { page: number }): void {
    this.innerOffset = event.page - 1;
    if (this.bodyComponent) {
      this.bodyComponent.updateOffsetY(this.innerOffset, true);
    }

    this.$emit('page', {
      count: this.count,
      pageSize: this.pageSize,
      limit: this.limit,
      offset: this.innerOffset,
    });

    if (this.selectAllRowsOnPage && !this.scrollbarV && this.limit) {
      this.mySelected = [];
      this.$emit('select', {
        selected: this.mySelected,
      });
    }
  }

  onVisible(visible: boolean): void {
    if (this.isVisible !== visible) {
      this.isVisible = visible;
      if (this.isVisible) {
        this.recalculate();
      }
    }
  }

  /**
   * Recalculates the sizes of the page
   */
  calcPageSize(val: Array<Record<string, unknown>> = this.rows): number {
    // Keep the page size constant even if the row has been expanded.
    // This is because an expanded row is still considered to be a child of
    // the original row.  Hence calculation would use rowHeight only.
    if (this.scrollbarV && this.virtualization) {
      let rowHeight = 50;
      if (typeof this.rowHeight === 'number') {
        rowHeight = this.rowHeight;
      }
      const size = Math.ceil(this.bodyHeight / rowHeight);
      return Math.max(size, 0);
    }

    // if limit is passed, we are paging
    // eslint-disable-next-line no-undefined
    if (this.limit !== undefined && this.limit !== null) {
      return Number(this.limit);
    }

    // otherwise use row length
    if (val) {
      return val.length;
    }

    // other empty :(
    return 0;
  }

  /**
   * Calculates the row count.
   */
  calcRowCount(val: Array<Record<string, unknown>> = this.rows): number {
    if (!this.externalPaging) {
      if (!val) {
        return 0;
      }

      if (this.groupRowsBy) {
        return this.internalRows.length;
      }
      if (this.treeFromRelation !== null && this.treeToRelation !== null) {
        return this.internalRows.length;
      }
      return val.length;
    }
    return this.count;
  }

  /**
   * The header triggered a contextmenu event.
   */
  onColumnContextmenu({ event, column }: { event: MouseEvent; column: TableColumn }): void {
    this.$emit('tableContextmenu', { event, type: ContextmenuType.header, content: column });
  }

  /**
   * The body triggered a contextmenu event.
   */
  onRowContextmenu({ event, row }: { event: MouseEvent; row: Record<string, unknown> }): void {
    this.$emit('tableContextmenu', { event, type: ContextmenuType.body, content: row });
  }

  /**
   * The header triggered a column resize event.
   */
  onColumnResize({ column, newValue }: { column: TableColumn; newValue: number }): void {
    /* Safari/iOS 10.2 workaround */
    // eslint-disable-next-line no-undefined
    if (column === undefined) {
      return;
    }

    let idx: number;
    this.internalColumns.map((c, i) => {
      if (c.$$id === column.$$id) {
        idx = i;
        c.width = newValue;
        c.canAutoResize = false;

        // set this so we can force the column
        // width distribution to be to this value
        c.$$oldWidth = newValue;
      }

      return c;
    });

    this.recalculateColumns(this.internalColumns, idx);

    this.$emit('resize', {
      column,
      newValue,
    });
  }

  /**
   * The header triggered a column re-order event.
   */
  onColumnReorder({ column, newValue, prevValue }: { column: TableColumn; newValue: number; prevValue: number }): void {
    const cols = [...this.internalColumns];

    if (this.swapColumns) {
      const prevCol = cols[newValue];
      if (column.$$id === prevCol.$$id) {
        return;
      }
      cols[newValue] = column;
      cols[prevValue] = prevCol;
    } else if (newValue > prevValue) {
      const movedCol = cols[prevValue];
      for (let i = prevValue; i < newValue; i++) {
        cols[i] = cols[i + 1];
      }
      cols[newValue] = movedCol;
    } else {
      const movedCol = cols[prevValue];
      for (let i = prevValue; i > newValue; i--) {
        cols[i] = cols[i - 1];
      }
      cols[newValue] = movedCol;
    }

    this.internalColumns = cols;

    this.$emit('reorder', {
      column,
      newValue,
      prevValue,
    });
  }

  /**
   * The header triggered a column sort event.
   */
  onColumnSort(event: ISortEvent): void {
    // clean all checked rows
    if (this.selectAllRowsOnPage) {
      this.myChecked = [];
      this.$emit('check', {
        checked: this.myChecked,
      });
    }

    // this.mySorts = event.sorts;
    if (Array.isArray(this.sorts) && Array.isArray(event.sorts)) {
      this.sorts.length = 0;
      event.sorts.forEach(item => this.sorts.push(item));
      if (this.sorts.length === 0) {
        this.sorts.push({ dir: null, prop: null });
      }
    }

    // let rows = this.internalRows;
    this.innerSortRows();

    // Go to first page when sorting to see the newly sorted data
    if (this.goToFirstAfterSort) {
      this.innerOffset = 0;
    }
    this.bodyComponent.updateOffsetY(this.myOffset, true);
    this.$emit('sort', { ...event, sorts: event?.sorts?.filter(s => s.prop) });
  }

  /**
   * Toggle all row selection
   */
  onHeaderSelect(isChecked: boolean): void {
    let evName = 'select';
    if (this.selectAllRowsOnPage) {
      // before we splice, check if we currently have all selected
      const first = this.bodyComponent.indexes.first;
      const last = this.bodyComponent.indexes.last;
      if (this.checkMode === CheckMode.checkIsSelect) {
        const allSelected = this.mySelected.length === last - first;
        // remove all existing either way
        this.mySelected = [];
        // do the opposite here
        if (!allSelected) {
          this.mySelected.push(...this.internalRows.slice(first, last));
        }
      } else {
        evName = 'check';
        let allChecked = this.myChecked.length === last - first;
        if (this.scrollbarV && this.virtualization && !this.limit) {
          allChecked = this.myChecked.length === this.internalRows.length;
        }
        // remove all existing either way
        this.myChecked = [];
        // do the opposite here
        if (isChecked && !allChecked) {
          if (this.scrollbarV && this.virtualization) {
            this.myChecked.push(...this.internalRows);
          } else {
            this.myChecked.push(...this.internalRows.slice(first, last));
          }
        }
      }
    } else if (this.checkMode === CheckMode.checkIsSelect) {
      // before we splice, chk if we currently have all selected
      const allSelected = this.mySelected.length === this.rows.length;
      // remove all existing either way
      this.mySelected = [];
      // do the opposite here
      if (!allSelected) {
        this.mySelected.push(...this.rows);
      }
    } else {
      const allChecked = this.myChecked.length === this.rows.length;
      this.myChecked = [];
      if (!allChecked) {
        this.myChecked.push(...this.rows);
      }
    }

    this.$emit(evName, {
      selected: this.mySelected,
      checked: this.myChecked,
    });
  }

  /**
   * A row was selected from body
   */
  onBodySelect(event: Event): void {
    this.$emit('select', event);
  }

  /**
   * A row was checked from body
   */
  onBodyCheck(event: Event): void {
    this.$emit('check', event);
  }

  onGroupToggle(event: { value: IGroupedRows | boolean }): void {
    if (!event) {
      return;
    }
    if (typeof event.value !== 'boolean') {
      event.value.__expanded = !event.value.__expanded;
    }
    this.internalRows = this.processGroupedRows(this.groupedRows) as Array<Record<string, unknown>>;
    this.recalculate();
    this.$emit('group-toggle', Object.freeze(event));
  }

  /**
   * A row was expanded or collapsed for tree
   */
  onTreeAction(event: { row: Record<string, unknown> }): void {
    const row = event.row;
    // TODO: For duplicated items this will not work
    const rowIndex = this.rows.findIndex(r => r[this.treeToRelation] === event.row[this.treeToRelation]);
    this.$emit('tree-action', { row, rowIndex });
  }

  onColumnInsert(column: TableColumn): void {
    setColumnDefaults(column, this);
    if (!this.internalColumns) {
      this.internalColumns = [column];
    } else {
      this.internalColumns = [...this.internalColumns, column];
    }
    // if (!this.internalColumns) {
    //   setColumnDefaults(column, this);
    //   this.internalColumns = [column];
    // }
    // const colIndex = this.internalColumns.findIndex(c => {
    //   if (column.prop) {
    //     return c.prop === column.prop;
    //   } else {
    //     return c.name === column.name;
    //   }
    // });
    // if (colIndex < 0) {
    //   setColumnDefaults(column, this);
    //   this.internalColumns = [...this.internalColumns, column];
    // } else {
    //   const col = this.internalColumns[colIndex];
    //   this.$set(col, 'headerTemplate', column.headerTemplate);
    //   this.$set(col, 'cellTemplate', column.cellTemplate);
    // }
    if (this.isVisible) {
      this.recalculateColumns();
    }
    // clearTimeout(this.isColumnsInitedTimeoutId);
    // this.isColumnsInitedTimeoutId = setTimeout(() => this.$set(this, 'isColumnsInited', true), 50) as unknown as number;
  }

  onColumnRemoved(column: TableColumn): void {
    const colIndex = this.internalColumns.findIndex(c => c.name === column.name);
    const cols = [...this.internalColumns];
    cols.splice(colIndex, 1);
    this.internalColumns = [...cols];
    this.recalculateColumns();
  }

  onColumnChangeVisible(column: TableColumn): void {
    // we have to allow the cell's element to set it's width
    setTimeout(() => this.recalculateColumns(), 100);
  }

  /**
   * listen for changes to input bindings of all DataTableColumnDirective and
   * trigger the columnTemplates.changes observable to emit
   */
  // todo
  // private listenForColumnInputChanges(): void {
  //   this._subscriptions.push(this.columnChangesService
  //     .columnInputChanges$
  //     .subscribe(() => {
  //       if (this.columnTemplates) {
  //         this.columnTemplates.notifyOnChanges();
  //       }
  //     }));
  // }

  /**
   * Toggle the expansion of the row
   */
  toggleExpandDetail(row: Record<string, unknown>): void {
    this.bodyComponent.toggleExpandDetail(row);
    this.$emit('detail-toggle', {
      type: 'row',
      value: row,
    });
  }

  /**
   * Expand all the rows.
   */
  expandAllDetails(): void {
    this.bodyComponent.expandAllDetails();
    this.$emit('detail-toggle', {
      type: 'all',
      value: true,
    });
  }

  /**
   * Collapse all the rows.
   */
  collapseAllDetails(): void {
    this.bodyComponent.collapseAllDetails();
    this.$emit('detail-toggle', {
      type: 'all',
      value: false,
    });
  }

  /**
   * Expand all the group rows.
   */
  expandAllGroups(): void {
    this.groupedRows.forEach(row => {
      this.expandCollapseRow(row, true);
    });
    this.onGroupToggle({
      type: 'all',
      value: true,
    });
  }

  /**
   * Collapse all the rows.
   */
  collapseAllGroups(): void {
    this.groupedRows.forEach(row => {
      this.expandCollapseRow(row, false);
    });
    this.onGroupToggle({
      type: 'all',
      value: false,
    });
  }

  /**
   * Is the row visible in the current page
   */
  isRowVisible(row: Record<string, unknown>): boolean {
    return this.bodyComponent?.isRowVisible(row);
  }

  private innerSortRows(): void {
    const treeFrom = optionalGetterForProp(this.treeFromRelation);
    const treeTo = optionalGetterForProp(this.treeToRelation);
    if (treeFrom && treeTo) {
      this.internalRows = this.initialRows;
    }

    // this could be optimized better since it will resort
    // the rows again on the 'push' detection...
    if (this.externalSorting === false) {
      // don't use normal setter so we don't resort
      this.sortInternalRows();
    }

    // auto group by parent on new update
    this.internalRows = groupRowsByParents(
      this.internalRows as Array<{ level: number; treeStatus?: string }>,
      treeFrom,
      treeTo,
      this.lazyTree
    );
  }

  /**
   * Creates a map with the data grouped by the user choice of grouping index
   *
   * @param originalArray the original array passed via parameter
   * @param groupByIndex  the index of the column to group the data by
   */
  private groupArrayBy(
    originalArray: Record<string, unknown>[],
    groupRowsBy: Array<TGroupByField | Array<TGroupByField>>,
    level: number = 0
  ): IGroupedRows[] {
    let groupBy: Array<TGroupByField | Array<TGroupByField>> | TGroupByField | Array<TGroupByField> = groupRowsBy;
    if (Array.isArray(groupRowsBy)) {
      groupBy = groupRowsBy[level];
    }

    // create a map to hold groups with their corresponding results
    const map = new Map<string, Record<string, string>[]>();

    const getValue = (row: Record<string, string>, groupDescr: TGroupByField): string => {
      if (typeof groupDescr === 'string') {
        return row[groupDescr];
      }
      if ('prop' in groupDescr) {
        return groupDescr.valueGetter ? groupDescr.valueGetter(row[groupDescr.prop]) : row[groupDescr.prop];
      }
    };

    const getKey = (
      row: Record<string, string>,
      groupByArr: Array<TGroupByField | Array<TGroupByField>> | TGroupByField
    ): string => {
      if (!Array.isArray(groupByArr)) {
        return getValue(row, groupByArr);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      const result = groupByArr.reduce(
        (key: string, groupDescr: Array<TGroupByField | Array<TGroupByField>> | TGroupByField) => {
          let res: string = null;
          if (Array.isArray(groupDescr)) {
            return getKey(row, groupDescr);
          }
          res = getValue(row, groupDescr);
          if (!res) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return res;
          }
          return key ? `${key}^^${res}` : `${res}`;
        },
        ''
      ) as string;
      return result;
    };

    const itemsToRemove: Record<string, string>[] = [];
    originalArray.forEach((item: Record<string, string>) => {
      const key = getKey(item, groupBy);
      // eslint-disable-next-line no-undefined
      if (key !== undefined || key !== null) {
        itemsToRemove.push(item);
        if (!map.has(key)) {
          map.set(key, [item]);
        } else {
          map.get(key).push(item);
        }
      }
    });
    if (level > 0 && itemsToRemove.length) {
      itemsToRemove.forEach(item => {
        const i = originalArray.indexOf(item);
        if (i >= 0) {
          originalArray.splice(i, 1);
        }
      });
    }

    const keysDescr: Array<{
      title: string;
      prop: string; // | Array<TGroupByField | Array<TGroupByField>> | TGroupByField | Array<TGroupByField>;
    }> = [];
    if (Array.isArray(groupBy)) {
      groupBy.forEach(prop => {
        const title = this.getGroupTitle(prop);
        keysDescr.push({ title, prop: prop as string });
      });
    } else {
      const title = this.getGroupTitle(groupBy);
      keysDescr.push({ title, prop: groupBy as string });
    }
    // convert map back to a simple array of objects
    const result = Array.from(map, x => this.addGroup(x[0], x[1], level, keysDescr));
    if (Array.isArray(groupRowsBy) && level < groupRowsBy.length - 1) {
      result.forEach(item => {
        item.groups = this.groupArrayBy(item.rows, groupRowsBy, level + 1);
      });
    }
    return result;
  }

  private addGroup(
    key: string,
    value: Record<string, unknown>[],
    level1: number,
    keysDescr: Array<{
      title: string;
      prop: string;
    }>
  ): IGroupedRows {
    const keys = key ? key.toString().split('^^') : null;
    const keysObj: {
      title: string;
      prop: string; // | Array<TGroupByField | Array<TGroupByField>> | TGroupByField | Array<TGroupByField>;
      value: string;
    }[] = [];
    keysDescr.forEach((descr, index) => {
      keysObj.push({ title: descr.title, prop: descr.prop, value: keys && keys.length > index ? keys[index] : '' });
    });
    return {
      key,
      rows: value,
      level: level1,
      keys: keysObj,
      __expanded: true,
      __isGroup: true,
    };
  }

  private getGroupTitle(
    prop: Array<TGroupByField | Array<TGroupByField>> | TGroupByField | Array<TGroupByField>
  ): string {
    let title = prop;
    if (typeof prop === 'string') {
      const column = this.columns && this.columns.find(c => c.prop === prop);
      title = column ? column.name : prop;
    } else if ('title' in prop) {
      title = prop.title;
    }
    return <string>title;
  }

  private sortInternalRows(): void {
    if (this.groupedRows) {
      this.groupedRows = this.sortGroupedRows(this.groupedRows);
      this.internalRows = this.processGroupedRows(this.groupedRows) as Array<Record<string, unknown>>;
    } else {
      this.internalRows = sortRows(this.internalRows, this.internalColumns, this.sorts);
    }
  }

  private sortGroupedRows(groupedRows: IGroupedRows[]): IGroupedRows[] {
    const rows: Array<Record<string, unknown>> = [];
    groupedRows.forEach(gr => {
      const row = { __group: gr };
      gr.keys.forEach(keyDescr => {
        row[keyDescr.prop] = keyDescr.value;
      });
      rows.push(row);
      if (gr.groups && gr.groups.length) {
        gr.groups = this.sortGroupedRows(gr.groups);
      }
      if (gr.rows && gr.rows) {
        gr.rows = sortRows(gr.rows, this.internalColumns, this.sorts);
      }
    });
    const sortedRows = sortRows(rows, this.internalColumns, this.sorts);
    const result = sortedRows.map(r => r.__group);
    return result as IGroupedRows[];
  }

  private expandCollapseRow(group: IGroupedRows, expand: boolean): void {
    group.__expanded = expand;
    if (Array.isArray(group.groups)) {
      group.groups.forEach(gr => {
        this.expandCollapseRow(gr, expand);
      });
    }
  }

  private addRow(group: IGroupedRows, rows: Array<IGroupedRows | Record<string, unknown>>): void {
    // (group as any).__isGroup = true;
    // group.__expanded = true;
    rows.push(group);
    if (group.rows && group.__expanded) {
      group.rows.forEach(r => {
        rows.push(r);
      });
    }
    if (group.groups && group.__expanded) {
      group.groups.forEach(gr => {
        this.addRow(gr, rows);
      });
    }
  }

  private processGroupedRows(groupedRows: IGroupedRows[]): Array<IGroupedRows | Record<string, unknown>> {
    const rows: Array<IGroupedRows | Record<string, unknown>> = [];
    if (groupedRows && groupedRows.length) {
      // creates a new array with the data grouped
      groupedRows.forEach(g => {
        this.addRow(g, rows);
      });
    }
    return rows;
  }
}
