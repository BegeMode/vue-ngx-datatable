import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import {
  forceFillColumnWidths, adjustColumnWidths, sortRows,
  setColumnDefaults, throttleable,
  groupRowsByParents, optionalGetterForProp, setColumnsDefaults
} from '../utils';
import { ColumnMode, SortType, SelectionType, TableColumn, ContextmenuType, ISortEvent } from '../types';
import DataTableBodyComponent from './body/body.component.vue';
// import { DatatableGroupHeaderDirective } from './body/body-group-header.directive';
// import { DataTableColumnDirective } from './columns';
// import { DatatableRowDetailDirective } from './row-detail';
// import { DatatableFooterDirective } from './footer';
import DataTableHeaderComponent from './header/header.component';
import DataTableFooterComponent from './footer/footer.component';
import { ScrollbarHelper } from '../services/scrollbar-helper.service';
import { DimensionsHelper } from '../services/dimensions-helper.service';
import DataTableColumnComponent from './columns/column.component';
import VisibilityDirective from '../directives/visibility.directive';
import { IGroupedRows } from '../types/grouped-rows';
import { isArrayEqual } from '../utils/equal.array';
import DataTableBodyCellComponent from './body/body-cell.component.vue';

Vue.component('datatable-column', DataTableColumnComponent);
Vue.component('datatable-body-cell', DataTableBodyCellComponent);

@Component({
  directives: {
    'v-visibility-observer': VisibilityDirective,

  },
  components: {
    'datatable-header': DataTableHeaderComponent,
    'datatable-body': DataTableBodyComponent,
    'datatable-footer': DataTableFooterComponent,
  }
})
export default class DatatableComponent extends Vue {
  /**
   * Template for the target marker of drag target columns.
   */
  @Prop() targetMarkerTemplate: any;
  /**
   * Rows that are displayed in the table.
   */
  @Prop() rows: any;
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
  // @Prop() groupedRows: any[];
   /**
    * This attribute allows the user to set the name of the column to group the data with
    */
  @Prop() groupRowsBy: string;
  @Prop() columns: TableColumn[];
  /**
   * List of row objects that should be
   * represented as selected in the grid.
   * Default value: `[]`
   */
  @Prop({ type: Array, default: () => [] }) selected: any[];
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
  @Prop() rowHeight: number | string;
  /**
   * The group row height
   */
  @Prop() groupRowHeight: number | string;
  /**
   * The detail row height
   */
  @Prop() rowDetailHeight: number | string;
  /**
   * Type of column width distribution formula.
   * Example: flex, force, standard
   */
  @Prop({ type: String, validator: (value) => ['standard', 'flex', 'force'].indexOf(value) !== -1 })
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
   * For no selection pass a `falsey`.
   * Default value: `undefined`
   */
  @Prop() selectionType: SelectionType;
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
  @Prop({ type: String, validator: (value) => ['single', 'multi'].indexOf(value) !== -1 }) sortType: string;
  /**
   * Array of sorted columns by property and type.
   * Default value: `[]`
   */
  @Prop({ type: Array, default: () => [] }) sorts: any[];
  /**
   * Css class overrides
   */
  @Prop({
    type: Object,
    default: () => {
      return {
        sortAscending: 'datatable-icon-up',
        sortDescending: 'datatable-icon-down',
        pagerLeftArrow: 'datatable-icon-left',
        pagerRightArrow: 'datatable-icon-right',
        pagerPrevious: 'datatable-icon-prev',
        pagerNext: 'datatable-icon-skip'
      };
    }
  }) cssClasses: any;
  /**
   * Message overrides for localization
   *
   * emptyMessage     [default] = 'No data to display'
   * totalMessage     [default] = 'total'
   * selectedMessage  [default] = 'selected'
   */
  @Prop({
    type: Object,
    default: () => {
      return {
        emptyMessage: 'No data to display',
        // Footer total message
        totalMessage: 'total',
        // Footer selected message
        selectedMessage: 'selected'
      };
    }
  }) messages: any;
  /**
   * This will be used when displaying or selecting rows.
   * when tracking/comparing them, we'll use the value of this fn,
   *
   * (`fn(x) === fn(y)` instead of `x === y`)
   */
  @Prop({ type: Function, default: ((x: any) => x) }) rowIdentity: (x: any) => any;
  /**
   * Row specific classes.
   * Similar implementation to ngClass.
   *
   *  [rowClass]="'first second'"
   *  [rowClass]="{ 'first': true, 'second': true, 'third': false }"
   */
  @Prop() rowClass: any;
  /**
   * A boolean/function you can use to check whether you want
   * to select a particular row based on a criteria. Example:
   *
   *    (selection) => {
   *      return selection !== 'Ethel Price';
   *    }
   */
  @Prop() selectCheck: any;
  /**
   * A function you can use to check whether you want
   * to show the checkbox for a particular row based on a criteria. Example:
   *
   *    (row, column, value) => {
   *      return row.name !== 'Ethel Price';
   *    }
   */
  @Prop({ type: Function, default: null }) displayCheck: (row: any, column?: any, value?: any) => boolean;
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
   * Reference to the body component for manually
   * invoking functions on the body.
   */
  bodyComponent: any; // DataTableBodyComponent;
  /**
   * Reference to the header component for manually
   * invoking functions on the header.
   *
   * @private
   * @type {DataTableHeaderComponent}
   * @memberOf DatatableComponent
   */
  headerComponent: any; // DataTableHeaderComponent;

  resizeHander: any;

  groupedRows: IGroupedRows[] = null;

  innerWidth: number = 0;
  pageSize: number = 0;
  bodyHeight: number = 0;
  rowCount: number = 0;
  offsetX: number = 0;
  internalRows: any[] = null;
  internalColumns: TableColumn[] = null;
  myColumnMode: ColumnMode = ColumnMode.standard;
  mySortType: SortType = SortType.single;
  // tslint:disable-next-line:variable-name
  myOffset_: number = 0;
  mySelected = [];
  renderTracking = false;
  isVisible: boolean = false;

  // non-reactive
  mySorts: any[];

  // _columnTemplates: QueryList<DataTableColumnDirective>;
  // _subscriptions: Subscription[] = [];
  /**
   * Row Detail templates gathered from the ContentChild
   */
  // @ContentChild(DatatableRowDetailDirective)
  rowDetail: boolean = false; // DatatableRowDetailDirective;
  /**
   * Group Header templates gathered from the ContentChild
   */
  // @ContentChild(DatatableGroupHeaderDirective)
  groupHeader: boolean = false; // DatatableGroupHeaderDirective;

  groupHeaderSlot = null;
  rowDetailSlot = null;
  footerSlot = null;

  private scrollbarHelper: ScrollbarHelper = new ScrollbarHelper();
  private dimensionsHelper: DimensionsHelper = new DimensionsHelper();

  created() {
    this.groupHeader = Boolean(this.groupRowsBy);
    if (this.$listeners.rendered) {
      this.renderTracking = true;
    }
  }

  destroyed() {
    window.removeEventListener('resize', this.resizeHander);
  }

  /**
   * Lifecycle hook that is called after data-bound
   * properties of a directive are initialized.
   */
  mounted(): void {
    this.bodyComponent = this.$refs.datatableBody; // as DataTableBodyComponent;
    this.headerComponent = this.$refs.datatableHeader; //  as DataTableHeaderComponent;
    this.groupHeaderSlot = this.$scopedSlots.groupHeader;
    this.rowDetailSlot = this.$scopedSlots.rowDetail;
    this.footerSlot = this.$scopedSlots.footer;
    this.rowDetail = Boolean(this.rowDetailSlot);
    // need to call this immediatly to size
    // if the table is hidden the visibility
    // listener will invoke this itself upon show
    this.recalculate();

    if (!this.externalSorting) {
      this.sortInternalRows();
    }
    // this has to be done to prevent the change detection
    // tree from freaking out because we are readjusting
    if (typeof requestAnimationFrame === 'undefined') {
      return;
    }
    requestAnimationFrame(() => {
      this.recalculate();
      // emit page for virtual server-side kickoff
      if (this.externalPaging && this.scrollbarV) {
        this.$emit('page', {
          count: this.count,
          pageSize: this.pageSize,
          limit: this.limit,
          offset: 0
        });
      }
      this.resizeHander = this.onWindowResize.bind(this);
      window.addEventListener('resize', this.resizeHander);
    });
  }

  /**
   * Body was scrolled typically in a `scrollbarV:true` scenario.
   */
  // @Output() scroll: EventEmitter<any> = new EventEmitter();
  /**
   * A cell or row was focused via keyboard or mouse click.
   */
  // @Output() activate: EventEmitter<any> = new EventEmitter();

  /**
   * A cell or row was selected.
   */
  // @Output() select: EventEmitter<any> = new EventEmitter();

  /**
   * Column sort was invoked.
   */
  // @Output() sort: EventEmitter<any> = new EventEmitter();

  /**
   * The table was paged either triggered by the pager or the body scroll.
   */
  // @Output() page: EventEmitter<any> = new EventEmitter();

  /**
   * Columns were re-ordered.
   */
  // @Output() reorder: EventEmitter<any> = new EventEmitter();

  /**
   * Column was resized.
   */
  // @Output() resize: EventEmitter<any> = new EventEmitter();

  /**
   * The context menu was invoked on the table.
   * type indicates whether the header or the body was clicked.
   * content contains either the column or the row that was clicked.
   */
  // @Output() tableContextmenu = new EventEmitter<{ event: MouseEvent, type: ContextmenuType, content: any }>(false);

  /**
   * A row was expanded ot collapsed for tree
   */
  // @Output() treeAction: EventEmitter<any> = new EventEmitter();
  
  @Watch('rows', { immediate: true }) onRowsChanged(val: any) {
    if (val) {
      this.internalRows = [...val];
    }

    // auto group by parent on new update
    this.internalRows = groupRowsByParents(
      this.internalRows,
      optionalGetterForProp(this.treeFromRelation),
      optionalGetterForProp(this.treeToRelation),
      this.lazyTree
    );
    
    this.groupedRows = null;
    if (this.rows && this.groupRowsBy) {
      // this.groupedRows = this.groupArrayBy(this.rows, this.groupRowsBy);
      this.groupedRows = this.groupArrayBy(this.rows, this.groupRowsBy, 0);
      this.internalRows = this.processGroupedRows(this.groupedRows);
    }

    // auto sort on new updates
    if (!this.externalSorting) {
      this.sortInternalRows();
    }

    // recalculate sizes/etc
    if (this.$el) {
      this.recalculate();
    }
  }

  addRow(group: IGroupedRows, rows: any[]) {
    // (group as any).__isGroup = true;
    // group.__expanded = true;
    rows.push(group);
    if (group.value && group.__expanded) {
      group.value.forEach(r => {
        rows.push(r);
      });
    }
    if (group.groups && group.__expanded) {
      group.groups.forEach(gr => {
        this.addRow(gr, rows);
      });
    }
  }

  processGroupedRows(groupedRows: IGroupedRows[]): any[] {
    const rows = [];
    if (groupedRows && groupedRows.length) {
      // creates a new array with the data grouped
      groupedRows.forEach(g => {
        this.addRow(g, rows);
      });
    }
    return rows;
  }

  @Watch('groupRowsBy') onGroupRowsByChanged(newVal, oldVal) {
    if (isArrayEqual(newVal, oldVal)) {
      return;
    }
    this.groupHeader = Boolean(this.groupRowsBy);
    this.groupedRows = null;
    if (this.groupRowsBy) {
      this.groupedRows = this.groupArrayBy(this.rows, this.groupRowsBy, 0);
      this.internalRows = this.processGroupedRows(this.groupedRows);
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
  @Watch('columns', { immediate: true }) onColumnsChanged(newVal) {
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
  @Watch('limit') onLimitChanged() {
    // recalculate sizes/etc
    this.recalculate();
  }
  /**
   * The total count of all rows.
   * Default value: `0`
   */
  @Watch('count') onCountChanged() {
    // recalculate sizes/etc
    this.recalculate();
  }

  @Watch('columnMode', { immediate: true }) onColumnModeChanged() {
    this.myColumnMode = ColumnMode[this.columnMode];
  }

  @Watch('sortType', { immediate: true }) onSortTypeChanged() {
    if (SortType[this.sortType]) {
      this.mySortType = SortType[this.sortType];
    }
  }

  @Watch('offset', { immediate: true }) onOffsetChanged() {
    this.myOffset_ = this.offset;
  }

  @Watch('sorts', { immediate: true }) onSortsChanged() {
    this.mySorts = this.sorts;
  }

  @Watch('selected', { immediate: true }) onSelectedChanged() {
    this.mySelected = this.selected;
  }

  get myOffset(): number {
    return Math.max(Math.min(this.myOffset_, Math.ceil(this.rowCount / this.pageSize) - 1), 0);
  }

  /**
   * CSS class applied if the header height if fixed height.
   */
  get isFixedHeader(): boolean {
    const headerHeight: number | string = this.headerHeight;
    return (typeof headerHeight === 'string') ?
      (<string>headerHeight) !== 'auto' : true;
  }

  /**
   * CSS class applied to the root element if
   * the row heights are fixed heights.
   */
  get isFixedRow(): boolean {
    const rowHeight: number | string = this.rowHeight;
    return (typeof rowHeight === 'string') ?
      (<string>rowHeight) !== 'auto' : true;
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

  get classObject() {
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
    let allRowsSelected = (this.rows && this.mySelected && this.mySelected.length === this.rows.length);

    if (this.selectAllRowsOnPage) {
      const indexes = this.bodyComponent.indexes;
      const rowsOnPage = indexes.last - indexes.first;
      allRowsSelected = (this.mySelected.length === rowsOnPage);
    }

    return this.mySelected && this.rows &&
      this.rows.length !== 0 && allRowsSelected;
  }

  get scrollbarWidth(): number {
    return this.scrollbarHelper.width;
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
    this.recalculateDims();
    this.recalculateColumns();
  }

  /**
   * Window resize handler to update sizes.
   */
  // @HostListener('window:resize')
  @throttleable(5)
  onWindowResize(): void {
    this.recalculate();
  }

  /**
   * Recalulcates the column widths based on column width
   * distribution mode and scrollbar offsets.
   */
  recalculateColumns(
    columns: any[] = this.internalColumns,
    forceIdx: number = -1,
    allowBleed: boolean = this.scrollbarH): any[] | undefined {

    if (!columns) return undefined;

    let width = this.innerWidth;
    if (this.scrollbarV) {
      width = width - this.scrollbarHelper.width;
    }

    if (this.myColumnMode === ColumnMode.force) {
      forceFillColumnWidths(columns, width, forceIdx, allowBleed);
    } else if (this.myColumnMode === ColumnMode.flex) {
      adjustColumnWidths(columns, width);
    }
    const hiddenColumns = columns.filter(col => (col as any).hidden);
    if (hiddenColumns.length) {
      this.bodyComponent && this.bodyComponent.onInnerWidthChanged();
    }

    return columns;
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
      if (this.headerHeight) height = height - this.headerHeight;
      if (this.footerHeight) height = height - this.footerHeight;
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
  onBodyPage({ offset }: any): void {

    // Avoid pagination caming from body events like scroll when the table 
    // has no virtualization and the external paging is enable. 
    // This means, let's the developer handle pagination by my him(her) self
    if(this.externalPaging && !this.virtualization) {
      return;
    }

    if (this.myOffset_ === offset) {
      return;
    }
    
    this.myOffset_ = offset;

    this.$emit('page', {
      count: this.count,
      pageSize: this.pageSize,
      limit: this.limit,
      offset: this.myOffset_,
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
  onFooterPage(event: any) {
    this.myOffset_ = event.page - 1;
    this.bodyComponent.updateOffsetY(this.myOffset_);

    this.$emit('page', {
      count: this.count,
      pageSize: this.pageSize,
      limit: this.limit,
      offset: this.myOffset_
    });

    if (this.selectAllRowsOnPage) {
      this.mySelected = [];
      this.$emit('select', {
        selected: this.mySelected
      });
    }
  }

  onVisible(visible: boolean) {
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
  calcPageSize(val: any[] = this.rows): number {
    // Keep the page size constant even if the row has been expanded.
    // This is because an expanded row is still considered to be a child of
    // the original row.  Hence calculation would use rowHeight only.
    if (this.scrollbarV && this.virtualization) {
      let rowHeight = 30;
      if (typeof this.rowHeight === 'number') {
        rowHeight = this.rowHeight;
      }
      const size = Math.ceil(this.bodyHeight / rowHeight);
      return Math.max(size, 0);
    }

    // if limit is passed, we are paging
    if (this.limit !== undefined) {
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
  calcRowCount(val: any[] = this.rows): number {
    if (!this.externalPaging) {
      if (!val) return 0;

      if (this.groupRowsBy) {
        return this.internalRows.length;
      } else if (this.treeFromRelation != null && this.treeToRelation != null) {
        return this.internalRows.length;
      } else {
        return val.length;
      }
    }

    return this.count;
  }

  /**
   * The header triggered a contextmenu event.
   */
  onColumnContextmenu({ event, column }: any): void {
    this.$emit('tableContextmenu', { event, type: ContextmenuType.header, content: column });
  }

  /**
   * The body triggered a contextmenu event.
   */
  onRowContextmenu({ event, row }: any): void {
    this.$emit('tableContextmenu', { event, type: ContextmenuType.body, content: row });
  }

  /**
   * The header triggered a column resize event.
   */
  onColumnResize({ column, newValue }: any): void {
    /* Safari/iOS 10.2 workaround */
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
      newValue
    });
  }

  /**
   * The header triggered a column re-order event.
   */
  onColumnReorder({ column, newValue, prevValue }: any): void {
    const cols = [...this.internalColumns];

    if (this.swapColumns) {
      const prevCol = cols[newValue];
      if (column.$$id === prevCol.$$id) {
        return;
      }
      cols[newValue] = column;
      cols[prevValue] = prevCol;
    } else {
      if (newValue > prevValue) {
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
    }

    this.internalColumns = cols;

    this.$emit('reorder', {
      column,
      newValue,
      prevValue
    });
  }

  /**
   * The header triggered a column sort event.
   */
  onColumnSort(event: ISortEvent): void {
    // clean selected rows
    if (this.selectAllRowsOnPage) {
      this.mySelected = [];
      this.$emit('select', {
        selected: this.mySelected
      });
    }

    this.mySorts = event.sorts;

    // this could be optimized better since it will resort
    // the rows again on the 'push' detection...
    if (this.externalSorting === false) {
      // don't use normal setter so we don't resort
      this.sortInternalRows();
    }

    // auto group by parent on new update
    this.internalRows = groupRowsByParents(
      this.internalRows,
      optionalGetterForProp(this.treeFromRelation),
      optionalGetterForProp(this.treeToRelation),
      this.lazyTree
    );

    // Always go to first page when sorting to see the newly sorted data
    this.myOffset_ = 0;
    this.bodyComponent.updateOffsetY(this.myOffset_);
    this.$emit('sort', event);
  }

  /**
   * Toggle all row selection
   */
  onHeaderSelect(event: any): void {

    if (this.selectAllRowsOnPage) {
      // before we splice, chk if we currently have all selected
      const first = this.bodyComponent.indexes.first;
      const last = this.bodyComponent.indexes.last;
      const allSelected = this.mySelected.length === (last - first);

      // remove all existing either way
      this.mySelected = [];

      // do the opposite here
      if (!allSelected) {
        this.mySelected.push(...this.internalRows.slice(first, last));
      }
    } else {
      // before we splice, chk if we currently have all selected
      const allSelected = this.mySelected.length === this.rows.length;
      // remove all existing either way
      this.mySelected = [];
      // do the opposite here
      if (!allSelected) {
        this.mySelected.push(...this.rows);
      }
    }

    this.$emit('select', {
      selected: this.mySelected
    });
  }

  /**
   * A row was selected from body
   */
  onBodySelect(event: any): void {
    this.$emit('select', event);
  }

  onGroupToggle(event: any) {
    event.value.__expanded = !event.value.__expanded;
    this.internalRows = this.processGroupedRows(this.groupedRows);
    this.recalculate();
  }

  /**
   * A row was expanded or collapsed for tree
   */
  onTreeAction(event: any) {
    const row = event.row;
    // TODO: For duplicated items this will not work
    const rowIndex = this.rows.findIndex(r =>
      r[this.treeToRelation] === event.row[this.treeToRelation]);
    this.$emit('tree-action', {row, rowIndex});
  }

  onColumnInsert(column: TableColumn) {
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
  }
  
  onColumnRemoved(column: TableColumn) {
    const colIndex = this.internalColumns.findIndex(c => c.name === column.name);
    const cols = [...this.internalColumns];
    cols.splice(colIndex, 1);
    this.internalColumns = [...cols];
    this.recalculateColumns();
  }

  onColumnChangeVisible(column: TableColumn) {
    // we have to allow the cell's element to set it's width
    setTimeout(() => this.recalculateColumns(), 100);
  }

  // onHiddenChanged() {
  //   this.recalculateColumns();
  //   this.bodyComponent && this.bodyComponent.onInnerWidthChanged();
  //   // this.$nextTick(() => {
  //   //   this.recalculateColumns();
  //   //   this.bodyComponent.recalculateColumns();
  //   //   this.bodyComponent.buildStylesByGroup();
  //   // });
  // }
    
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
  toggleExpandDetail(row: any): void {
    this.bodyComponent.toggleExpandDetail(row);
    this.$emit('detail-toggle', {
      type: 'row',
      value: row
    });
  }

  /**
   * Expand all the rows.
   */
  expandAllDetails(): void {
    this.bodyComponent.expandAllDetails();
    this.$emit('detail-toggle', {
      type: 'all',
      value: true
    });
  }

  /**
   * Collapse all the rows.
   */
  collapseAllDetails(): void {
    this.bodyComponent.collapseAllDetails();
    this.$emit('detail-toggle', {
      type: 'all',
      value: false
    });
  }

  /**
   * Creates a map with the data grouped by the user choice of grouping index
   *
   * @param originalArray the original array passed via parameter
   * @param groupByIndex  the index of the column to group the data by
   */
  private groupArrayBy(originalArray: any[], groupRowsBy: any, level: number = 0): IGroupedRows[] {
    let groupBy = groupRowsBy;
    if (Array.isArray(groupRowsBy)) {
      groupBy = groupRowsBy[level];
    }

    // create a map to hold groups with their corresponding results
    const map = new Map();
    let getKey = (row: any, groupDescr: string | { title: string, prop: string } | string): string => {
      if (typeof groupDescr === 'string') {
        return row[groupDescr as string];
      } else if ('prop' in groupDescr) {
        return row[groupDescr.prop];
      }
    };
    if (Array.isArray(groupBy)) {
      const getKey1 = (row: any, groupByArr: Array<{ title: string, prop: string } | string>): string => {
        return groupByArr.reduce((key, groupDescr) => {
          let prop = groupDescr as string;
          if (typeof groupDescr === 'object' && 'prop' in groupDescr) {
            prop = groupDescr.prop;
          }
          const value = row[prop];
          if (!value) {
            return value;
          }
          return key ? `${key}^^${value}` : `${value}`;
        }, '');
      };
      getKey = getKey1 as any;
    }

    const itemsToRemove = [];
    originalArray.forEach((item: any) => {
      const key = getKey(item, groupBy);
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

    const keysDescr = [];
    if (Array.isArray(groupBy)) {
      groupBy.forEach(prop => {
        const title = this.getGroupTitle(prop);
        keysDescr.push({ title, prop });
      });
    } else {
      const title = this.getGroupTitle(groupBy);
      keysDescr.push({ title, prop: groupBy });
    }
    // convert map back to a simple array of objects
    const result = Array.from(map, x => this.addGroup(x[0], x[1], level, keysDescr));
    if (Array.isArray(groupRowsBy) && level < groupRowsBy.length - 1) {
      result.forEach(item => {
        item.groups = this.groupArrayBy(item.value, groupRowsBy, level + 1);
      });
    }
   
    return result;
  }

  private addGroup(key: string, value: any, _level: number,
                   keysDescr: Array<{ title: string; prop: string; }>): IGroupedRows {
    const keys = key ? key.toString().split('^^') : null;
    const keysObj = [];
    keysDescr.forEach((descr, index) => {
      keysObj.push({ title: descr.title, prop: descr.prop, value: keys && keys.length > index ? keys[index] : '' });
    });
    return {
      key,
      value,
      level: _level,
      keys: keysObj,
      __expanded: true,
      __isGroup: true
    };
  }

  private getGroupTitle(prop: string | { title: string, prop: string }): string {
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
      this.internalRows = this.processGroupedRows(this.groupedRows);
    } else {
      this.internalRows = sortRows(this.internalRows, this.internalColumns, this.mySorts);
    }
  }

  private sortGroupedRows(groupedRows: IGroupedRows[]): IGroupedRows[] {
    const rows = [];
    let sortedRows: any[];
    groupedRows.forEach(gr => {
      const row = { __group: gr };
      gr.keys.forEach(keyDescr => {
        row[keyDescr.prop] = keyDescr.value;
      });
      rows.push(row);
      if (gr.groups && gr.groups.length) {
        gr.groups = this.sortGroupedRows(gr.groups);
      }
      if (gr.value && gr.value) {
        gr.value = sortRows(gr.value, this.internalColumns, this.mySorts);
      }
    });
    sortedRows = sortRows(rows, this.internalColumns, this.mySorts);
    const result = sortedRows.map(r => r.__group);
    return result;
  }

}
