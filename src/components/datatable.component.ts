import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import {
  forceFillColumnWidths, adjustColumnWidths, sortRows,
  setColumnDefaults, throttleable,
  groupRowsByParents, optionalGetterForProp, setColumnsDefaults
} from '../utils';
import { ColumnMode, SortType, SelectionType, TableColumn, ContextmenuType } from '../types';
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
import DataTableBodyCellComponent from './body/body-cell.component.vue';

Vue.component('datatable-body-cell', DataTableBodyCellComponent);

@Component({
  components: {
    'datatable-header': DataTableHeaderComponent,
    'datatable-body': DataTableBodyComponent,
    'datatable-footer': DataTableFooterComponent,
    'datatable-column': DataTableColumnComponent,
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
  @Prop() groupedRows: any[];
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
  @Prop() pagination: boolean;
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
  @Prop({ type: Boolean, default: true }) swapColumns: boolean;
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
   * A flag for switching summary row on / off
   */
  @Prop({ type: Boolean, default: false }) summaryRow: boolean;
  /**
   * A height of summary row
   */
  @Prop({ type: Number, default: 30 }) summaryHeight: number;
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

  /**
   * Returns if all rows are selected.
   */
  innerWidth: number = 0;
  pageSize: number = 0;
  bodyHeight: number = 0;
  rowCount: number = 0;
  // rowDiffer: KeyValueDiffer<{}, {}>;
  // offsetX = new BehaviorSubject(0);
  offsetX: number = 0;
  internalRows: any[] = null;
  internalColumns: TableColumn[] = null;
  myColumnMode: ColumnMode = ColumnMode.standard;
  mySortType: SortType = SortType.single;
  // tslint:disable-next-line:variable-name
  myOffset_: number = 0;
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

  private scrollbarHelper: ScrollbarHelper = new ScrollbarHelper();
  private dimensionsHelper: DimensionsHelper = new DimensionsHelper();
  // private columnChangesService: ColumnChangesService;

  destroyed() {
    window.removeEventListener('resize', this.onWindowResize);
    //  todo: this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * Lifecycle hook that is called after data-bound
   * properties of a directive are initialized.
   */
  mounted(): void {
    this.bodyComponent = this.$refs.datatableBody; // as DataTableBodyComponent;
    this.headerComponent = this.$refs.datatableHeader; //  as DataTableHeaderComponent;
    // this.rowDiffer = this.differs.find({}).create();

    // pick up columns
    // DataTableColumnComponent

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
      window.addEventListener('resize', this.onWindowResize);
    });

    // this.columnTemplates.changes.subscribe(v =>
    //   this.translateColumns(v));
      
    // todo: this.listenForColumnInputChanges();
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

    // auto sort on new updates
    if (!this.externalSorting) {
      this.sortInternalRows();
    }

    // auto group by parent on new update
    this.internalRows = groupRowsByParents(
      this.internalRows,
      optionalGetterForProp(this.treeFromRelation),
      optionalGetterForProp(this.treeToRelation)
  );

    // recalculate sizes/etc
    if (this.$el) {
      this.recalculate();
    }

    if (this.rows && this.groupRowsBy) {
      // If a column has been specified in _groupRowsBy created a new array with the data grouped by that row
      this.groupedRows = this.groupArrayBy(this.rows, this.groupRowsBy);
    }

    // this.cd.markForCheck();
  }

  @Watch('groupRowsBy') onGroupRowsByChanged() {
    if (this.groupRowsBy) {
      if (this.rows) {
        // creates a new array with the data grouped
        this.groupedRows = this.groupArrayBy(this.rows, this.groupRowsBy);
      }
    }
  }

  /**
   * Columns to be displayed.
   */
  @Watch('columns', { immediate: true }) onColumnsChanged(newVal) {
    if (newVal) {
      this.internalColumns = [...newVal];
      setColumnsDefaults(this.internalColumns, this);
      this.recalculateColumns();
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
    this.mySortType = SortType[this.sortType];
  }

  @Watch('offset', { immediate: true }) onOffsetChanged() {
    this.myOffset_ = this.offset;
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
    let allRowsSelected = (this.rows && this.selected && this.selected.length === this.rows.length);

    if (this.selectAllRowsOnPage) {
      const indexes = this.bodyComponent.indexes;
      const rowsOnPage = indexes.last - indexes.first;
      allRowsSelected = (this.selected.length === rowsOnPage);
    }

    return this.selected && this.rows &&
      this.rows.length !== 0 && allRowsSelected;
  }
  /**
   * Column templates gathered from `ContentChildren`
   * if described in your markup.
   */
  // @ContentChildren(DataTableColumnDirective)
  // set columnTemplates(val: QueryList<DataTableColumnDirective>) {
  //   this._columnTemplates = val;
  //   this.translateColumns(val);
  // }

  /**
   * Returns the column templates.
   */
  // get columnTemplates(): QueryList<DataTableColumnDirective> {
  //   return this._columnTemplates;
  // }

  /**
   * Footer template gathered from the ContentChild
   */
  // @ContentChild(DatatableFooterDirective)
  // footer: DatatableFooterDirective;
  /**
   * Translates the templates to the column objects
   */
  // translateColumns(val: any) {
  //   if (val) {
  //     const arr = val.toArray();
  //     if (arr.length) {
  //       this._internalColumns = translateTemplates(arr);
  //       setColumnDefaults(this._internalColumns);
  //       this.recalculateColumns();
  //       this.sortInternalRows();
  //       this.cd.markForCheck();
  //     }
  //   }
  // }

  /**
   * Creates a map with the data grouped by the user choice of grouping index
   *
   * @param originalArray the original array passed via parameter
   * @param groupByIndex  the index of the column to group the data by
   */
  groupArrayBy(originalArray: any, groupBy: any) {
    // create a map to hold groups with their corresponding results
    const map = new Map();
    let i: number = 0;

    originalArray.forEach((item: any) => {
      const key = item[groupBy];
      if (!map.has(key)) {
        map.set(key, [item]);
      } else {
        map.get(key).push(item);
      }
      i++;
    });

    const addGroup = (key: any, value: any) => {
      return {key, value};
    };

    // convert map back to a simple array of objects
    return Array.from(map, x => addGroup(x[0], x[1]));
  }

  /*
  * Lifecycle hook that is called when Angular dirty checks a directive.
  */
  // ngDoCheck(): void {
  //   if (this.rowDiffer.diff(this.rows)) {
  //     if (!this.externalSorting) {
  //       this.sortInternalRows();
  //     } else {
  //       this.internalRows = [...this.rows];
  //     }

  //     // auto group by parent on new update
  //     this.internalRows = groupRowsByParents(
  //       this.internalRows,
  //       optionalGetterForProp(this.treeFromRelation),
  //       optionalGetterForProp(this.treeToRelation)
  //     );

  //     this.recalculatePages();
  //     this.cd.markForCheck();
  //   }
  // }

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
    // this.offsetX.next(event.offsetX);
    this.$emit('offsetX', event.offsetX);
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
      this.selected = [];
      this.$emit('select', {
        selected: this.selected
      });
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
      return this.limit;
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

      if (this.groupedRows) {
        return this.groupedRows.length;
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
    const cols = this.internalColumns.map((c, i) => {
      c = { ...c };

      if (c.$$id === column.$$id) {
        idx = i;
        c.width = newValue;

        // set this so we can force the column
        // width distribution to be to this value
        c.$$oldWidth = newValue;
      }

      return c;
    });

    this.recalculateColumns(cols, idx);
    this.internalColumns = cols;

    this.$emit('resize', {
      column,
      newValue
    });
  }

  /**
   * The header triggered a column re-order event.
   */
  onColumnReorder({ column, newValue, prevValue }: any): void {
    const cols = this.internalColumns.map(c => {
      return { ...c };
    });

    if (this.swapColumns) {
      const prevCol = cols[newValue];
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
  onColumnSort(event: any): void {
    // clean selected rows
    if (this.selectAllRowsOnPage) {
      this.selected = [];
      this.$emit('select', {
        selected: this.selected
      });
    }

    this.sorts = event.sorts;

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
      optionalGetterForProp(this.treeToRelation)
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
      const allSelected = this.selected.length === (last - first);

      // remove all existing either way
      this.selected = [];

      // do the opposite here
      if (!allSelected) {
        this.selected.push(...this.internalRows.slice(first, last));
      }
    } else {
      // before we splice, chk if we currently have all selected
      const allSelected = this.selected.length === this.rows.length;
      // remove all existing either way
      this.selected = [];
      // do the opposite here
      if (!allSelected) {
        this.selected.push(...this.rows);
      }
    }

    this.$emit('select', {
      selected: this.selected
    });
  }

  /**
   * A row was selected from body
   */
  onBodySelect(event: any): void {
    this.$emit('select', event);
  }

  /**
   * A row was expanded or collapsed for tree
   */
  onTreeAction(event: any) {
    const row = event.row;
    // TODO: For duplicated items this will not work
    const rowIndex = this.rows.findIndex(r =>
      r[this.treeToRelation] === event.row[this.treeToRelation]);
    this.$emit('treeAction', {row, rowIndex});
  }

  onColumnInsert(column: TableColumn) {
    console.log('onColumnInsert', column);
    if (!this.internalColumns) {
      return this.onColumnsChanged([column]);
    }
    const colIndex = this.internalColumns.findIndex(c => c.name === column.name);
    // setColumnDefaults(column, this);
    if (colIndex < 0) {
      setColumnDefaults(column, this);
      this.internalColumns = [...this.internalColumns, column];
    } else {
      // this.internalColumns[colIndex] = column;
      const col = this.internalColumns[colIndex];
      this.$set(col, 'headerTemplate', column.headerTemplate);
      this.$set(col, 'cellTemplate', column.cellTemplate);
    }
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

  private sortInternalRows(): void {
    this.internalRows = sortRows(this.internalRows, this.internalColumns, this.sorts);
  }
}
