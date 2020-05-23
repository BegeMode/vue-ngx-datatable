import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { translateXY, columnsByPin, columnGroupWidths, RowHeightCache, columnsByPinArr } from '../../utils';
import { SelectionType, TableColumn, SortDirection } from '../../types';
import ScrollerComponent from './scroller.component';
import DataTableSelectionComponent from './selection.component';
import ProgressBarComponent from './progress-bar.component';
// import DataTableRowWrapperComponent from './body-row-wrapper.component.vue';
// import DataTableBodyRowComponent from './body-row.component.vue';
import DataTableSummaryRowComponent from './summary/summary-row.component';
import { ScrollbarHelper } from '../../services/scrollbar-helper.service';
import { ICellContext } from '../../types/cell-context.type';
import DataTableBodyGroupHeaderComponent from './body-group-header.component';
import DataTableBodyRowDetailComponent from './body-row-detail.component';
import { IGroupedRows } from '../../types/grouped-rows';
import DataTableRowWrapperComponent from './body-row-wrapper.component.vue';
import DataTableBodyRowComponent from './body-row.component.vue';
import { CheckMode } from '../../types/check.type';

@Component({
  components: {
    'datatable-selection': DataTableSelectionComponent,
    'datatable-progress': ProgressBarComponent,
    'datatable-scroller': ScrollerComponent,
    'datatable-summary-row': DataTableSummaryRowComponent,
    'datatable-row-wrapper': DataTableRowWrapperComponent,
    'datatable-body-row': DataTableBodyRowComponent,
    'datatable-group-header': DataTableBodyGroupHeaderComponent,
    'datatable-row-detail': DataTableBodyRowDetailComponent,
  }
})
export default class DataTableBodyComponent extends Vue {
  @Prop() scrollbarV: boolean;
  @Prop() scrollbarH: boolean;
  @Prop() loadingIndicator: boolean;
  @Prop() externalPaging: boolean;
  @Prop() rowHeight: number | ((row?: any) => number);
  @Prop() groupRowHeight: number | string;
  @Prop() offsetX: number;
  @Prop() emptyMessage: string;
  @Prop() selectionType: SelectionType;
  @Prop() checkMode: CheckMode;
  @Prop({ type: Array, default: () => [] }) selected: any[];
  @Prop({ type: Array, default: () => [] }) checked: any[];
  @Prop() rowIdentity: any;
  @Prop() rowDetail: any;
  @Prop() rowDetailHeight: number | string | ((row?: any, index?: any) => number);
  @Prop() groupHeader: any;
  @Prop() selectCheck: any;
  @Prop() displayCheck: any;
  @Prop() trackByProp: string;
  @Prop() rowClass: any;
  // @Prop() groupedRows: any;
  @Prop() groupExpansionDefault: boolean;
  @Prop() innerWidth: number;
  @Prop() groupRowsBy: string;
  @Prop() virtualization: boolean;
  @Prop() summaryRow: boolean;
  @Prop() summaryPosition: string;
  @Prop() summaryHeight: number | string;
  @Prop() pageSize: number;
  @Prop() limit: number;
  @Prop() rows: any[];
  @Prop() columns: TableColumn[];
  @Prop() offset: number;
  @Prop() rowCount: number;
  @Prop() bodyHeight: number;
  @Prop({ type: [Number, String], default: null }) minItemHeight: number | string;
  @Prop({ type: [String], default: 'height' }) heightField: string;
  @Prop() groupHeaderSlot: any;
  @Prop() rowDetailSlot: any;
  @Prop() renderTracking: boolean;

  scroller: any = null; // ScrollerComponent
  selector: any = null; // DataTableSelectionComponent;
  rowHeightsCache: RowHeightCache = new RowHeightCache();
  temp: any[] = [];
  offsetY: number = 0;
  myOffset: number = 0;
  myOffsetX: number = 0;
  indexes: any = {};
  columnGroupWidths: any = null;
  columnGroupWidthsWithoutGroup: any = null;
  rowIndexes: any = new Map();
  rowExpansions: any = new Map();
  myBodyHeight: any = null;
  columnsByPin: any = null;
  groupStyles = {
    left: {},
    center: {},
    right: {}
  };
  refreshCounters = {};

  rowTrackingFn: any;
  listener: any;
  lastFirst: number;
  lastLast: number;
  lastRowCount: number;
  rowsChanged: boolean;
  mySelected: any;
  private scrollbarHelper = new ScrollbarHelper();
  private cellContexts = new Map();
  private renderCounter = 0;
  private renderId = null;

  // ready = false;
  // startIndex = 0;
  // endIndex = 0;
  // length = 0;
  // oldScrollTop = null;
  // oldScrollBottom = null;
  // offsetTop = 0;
  // height = 0;

  // @Output() scroll: EventEmitter<any> = new EventEmitter();
  // @Output() page: EventEmitter<any> = new EventEmitter();
  // @Output() activate: EventEmitter<any> = new EventEmitter();
  // @Output() select: EventEmitter<any> = new EventEmitter();
  // @Output() detailToggle: EventEmitter<any> = new EventEmitter();
  // @Output() rowContextmenu = new EventEmitter<{ event: MouseEvent, row: any }>(false);
  // @Output() treeAction: EventEmitter<any> = new EventEmitter();

  /**
   * Creates an instance of DataTableBodyComponent.
   */
  created() {
    // declare fn here so we can get access to the `this` property
    this.rowTrackingFn = (row: any): any => {
      const idx = this.getRowIndex(row);
      if (this.trackByProp) {
        return `${idx}-${this.trackByProp}`;
      } else {
        return idx;
      }
    };
  }

  mounted() {
    this.selector = this.$refs.selector;
    this.scroller = this.$refs.scroller;
  }

  @Watch('pageSize') onPageSize() {
    this.recalcLayout();
  }

  @Watch('rows', { immediate: true }) onRowsChanged() {
    // this.updateVisibleItems(true);
    this.rowsChanged = true;
    this.rowExpansions.clear();
    const updateOffset = this.rows?.length && this.offset && this.offsetY === 0;
    this.recalcLayout(updateOffset);
    this.$nextTick(() => {
      this.scroller = this.$refs.scroller;
    });
  }

  // @Watch('groupedRows') onGroupedRowsChanged() {
  //   this.onRowsChanged();
  // }

  @Watch('selected', { immediate : true }) onSelectedChanged() {
    // this.mySelected = [...this.selected];
    this.mySelected = this.selected;
  }

  @Watch('columns', { immediate: true }) onColumnsChanged(newVal, oldVal) {
    if (newVal && oldVal && newVal.length < oldVal.length) {
      const removedColumns = oldVal.filter(col => !newVal.find(c => c.$$id === col.$$id));
      if (removedColumns) {
        this.updateCellContexts(removedColumns);
      }
    }
    this.recalculateColumns();
    this.buildStylesByGroup();
  }

  @Watch('offset', { immediate: true }) onOffsetChanged() {
    this.myOffset = this.offset;
  }

  @Watch('offsetX', { immediate: true }) onOffsetXChanged() {
    this.myOffsetX = this.offsetX;
  }

  @Watch('myOffsetX') onMyOffsetXChanged() {
    this.buildStylesByGroup();
  }

  @Watch('innerWidth') onInnerWidthChanged() {
    this.recalculateColumns();
    this.buildStylesByGroup();
  }

  @Watch('myOffset') onMyOffsetChanged() {
    this.recalcLayout();
  }

  @Watch('rowCount') onRowCountChanged() {
    this.recalcLayout();
  }

  @Watch('bodyHeight', { immediate: true }) onBodyHeightChanged() {
    this.myBodyHeight = this.bodyHeight;
    if (this.myBodyHeight === -1) {
      this.myBodyHeight = '0px';
      return;
    } else {
      if (this.scrollbarV) {
        this.myBodyHeight += 'px';
      } else {
        this.myBodyHeight = 'auto';
      }
      this.recalcLayout();
    }
  }

  get bodyWidth(): string {
    if (this.scrollbarH) {
      return this.innerWidth + 'px';
    } else {
      return '100%';
    }
  }

  get styleObject() {
    return {
      width: this.bodyWidth ? this.bodyWidth : 'auto',
      height: this.myBodyHeight ? this.myBodyHeight : 'auto',
    };
  }

  /**
   * Returns if selection is enabled.
   */
  get selectEnabled(): boolean {
    return !!this.selectionType;
  }

  get fixedRowHeight(): boolean {
    if (this.rowHeight && typeof this.rowHeight === 'number') {
      return true;
    }
    return false;
  }

  /**
   * Property that would calculate the height of scroll bar
   * based on the row heights cache for virtual scroll and virtualization. Other scenarios
   * calculate scroll height automatically (as height will be undefined).
   */
  get scrollHeight(): number | undefined {
    if (this.scrollbarV && this.virtualization && this.rowCount) {
      if (this.fixedRowHeight) {
        const height: any = this.rowHeight;
        return height * this.rowCount;
      }
      return this.rowHeightsCache.query(this.rowCount - 1);
    }
    // avoid TS7030: Not all code paths return a value.
    return undefined;
  }

  get scrollWidth() {
    return this.columnGroupWidths ? this.columnGroupWidths.total : 'auto';
  }

  /**
   * Called once, before the instance is destroyed.
   */
  destroyed(): void {
    // todo
    // if (this.rowDetail) this.listener.unsubscribe();
    // if (this.groupHeader) this.listener.unsubscribe();
  }

  reset() {
    this.offsetX = 0;
    this.offsetY = 0;
  }

  onSelect(event: { selected: Array<any>, index: number }) {
    // if (Array.isArray(event.selected)) {
    //   event.selected.forEach(row => {
    //     if (!this.refreshCounters[event.index]) {
    //       this.$set(this.refreshCounters, event.index, 0);
    //     }
    //     this.refreshCounters[event.index]++;
    //   });
    // }
    this.$emit('select', event);
  }

  recalculateColumns(val: any[] = this.columns): void {
    const colsByPin = columnsByPin(this.columns);
    this.columnsByPin = columnsByPinArr(this.columns);
    let width = this.innerWidth;
    if (this.scrollbarV) {
      width = width - this.scrollbarHelper.width;
    }
    this.columnGroupWidths = columnGroupWidths(colsByPin, this.columns, width);
  }

  /**
   * Updates the Y offset given a new offset.
   */
  updateOffsetY(offset?: number, fromPager: boolean = false): number {
    // scroller is missing on empty table
    if (!this.scroller) return;
    let offsetY = 0;
    if (this.scrollbarV && this.virtualization && offset) {
      // First get the row Index that we need to move to.
      const rowIndex = this.pageSize * offset;
      offsetY = this.rowHeightsCache.query(rowIndex - 1);
    } else if (this.scrollbarV && !this.virtualization) {
      offsetY = 0;
    }
    if (offset && !offsetY) {
      return 0;
    }
    this.scroller.setOffset(offsetY || 0, fromPager);
    return offsetY || 0;
  }
  
  onScrollSetup(event: { scrollYPos: number; scrollXPos: number }) {
    this.offsetX = event.scrollXPos;
    this.offsetY = event.scrollYPos;
  }

  /**
   * Body was scrolled, this is mainly useful for
   * when a user is server-side pagination via virtual scroll.
   */
  onBodyScroll(event: { direction: string; scrollYPos: number; scrollXPos: number; fromPager: boolean }): void {
    const scrollYPos: number = event.scrollYPos;
    const scrollXPos: number = event.scrollXPos;

    // if scroll change, trigger update
    // this is mainly used for header cell positions
    if (this.offsetY !== scrollYPos || this.myOffsetX !== scrollXPos) { // Math.abs(scrollYPos - this.offsetY) > 50
      this.$emit('scroll', {
        offsetY: scrollYPos,
        offsetX: scrollXPos
      });
    }
   
    this.offsetY = scrollYPos;
    this.myOffsetX = scrollXPos;
    this.$nextTick(() => {
      this.updateIndexes();
      this.updatePage(event.direction, event.fromPager);
      this.updateRows();
    });
  }

  /**
   * Updates the page given a direction.
   */
  updatePage(direction: string, fromPager: boolean): void {
    let offset = this.indexes.first / this.pageSize;

    if (fromPager) {
      offset = Math.ceil(offset);
    } else {
      if (direction === 'up') {
        offset = Math.ceil(offset);
      } else if (direction === 'down') {
        offset = Math.floor(offset);
      }
    }

    if (!fromPager && ['up', 'down'].includes(direction) && !isNaN(offset)) {
      this.$emit('page', { offset });
    }
  }

  /**
   * Updates the rows in the view port
   */
  updateRows(force: boolean = false): void {
    const { first, last } = this.indexes;
    if (!force && !this.rowsChanged && this.lastFirst === first && this.lastLast === last) {
      // console.log('this.lastFirst === first');
      return;
    }
    this.rowsChanged = false;
    this.lastFirst = first;
    this.lastLast = last;
    this.lastRowCount = this.rowCount;
    // if (!this.pagination) {
    //   first = Math.max(0, first - 20);
    //   last = Math.min(this.rowCount, last + 10);
    // }
    let rowIndex = first;
    let idx = 0;
    const temp: any[] = [];

    this.rowIndexes.clear();

    // if grouprowsby has been specified treat row paging
    // parameters as group paging parameters ie if limit 10 has been
    // specified treat it as 10 groups rather than 10 rows
    // if (this.groupedRows) {
    //   let maxRowsPerGroup = 3;
    //   // if there is only one group set the maximum number of
    //   // rows per group the same as the total number of rows
    //   if (this.groupedRows.length === 1) {
    //     maxRowsPerGroup = this.groupedRows[0].value.length;
    //   }
    //   let index = 0; 
    //   while (rowIndex < last && rowIndex < this.groupedRows.length) {
    //     // Add the groups into this page
    //     const group = this.groupedRows[rowIndex];
    //     group.value.forEach(row => this.rowIndexes.set(row, ++index));
    //     temp[idx] = group;
    //     idx++;

    //     // Group index in this context
    //     rowIndex++;
    //   }
    // } else {
    while (rowIndex < last && rowIndex < this.rowCount) {
      const row = this.rows[rowIndex];

      if (row) {
        this.rowIndexes.set(row, rowIndex);
        temp[idx] = row;
      }

      idx++;
      rowIndex++;
    }
    // }
  
    this.temp = temp;
    // console.log('updateRows first = ', first);
  }

  /**
   * Get the row height
   */
  getRowHeight(row: any): number {
    // if its a function return it
    if (typeof this.rowHeight === 'function') {
      return this.rowHeight(row);
    }

    return this.rowHeight;
  }

  /**
   * @param group the group with all rows
   */
  getGroupHeight(group: any): number {
    let rowHeight: number = 0;

    if (group.value) {
      for (let index = 0; index < group.value.length; index++) {
        rowHeight += this.getRowAndDetailHeight(group.value[index]);
      }
    }

    return rowHeight;
  }

  /**
   * Calculate row height based on the expanded state of the row.
   */
  getRowAndDetailHeight(row: any): number {
    let rowHeight = this.getRowHeight(row);
    const expanded = this.rowExpansions.get(row);

    // Adding detail row height if its expanded.
    if (expanded === 1) {
      rowHeight += this.getDetailRowHeight(row);
    }

    return rowHeight;
  }

  /**
   * Get the height of the detail row.
   */
  getDetailRowHeight = (row?: any, index?: any): number => {
    if (!this.rowDetail) return 0;
    const rowHeight = this.rowDetailHeight || this.getRowHeight(row) || 50;
    return typeof rowHeight === 'function' ? rowHeight(row, index) : Number(rowHeight);
  }

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
  getRowWrapperStyles(row: any): any {
    const styles = {};

    // only add styles for the group if there is a group
    if (this.groupRowsBy) {
      styles['width'] = this.columnGroupWidths.total;
    }

    if (this.scrollbarV && this.virtualization) {
      let idx = 0;
      // let row = rows;
      // if (this.groupedRows) {
      //   // Get the latest row rowindex in a group
      //   row = rows[rows.length - 1];
      //   idx = row ? this.getRowIndex(row) : 0;
      // } else {
      idx = this.getRowIndex(row);
      // }
      // const pos = idx * rowHeight;
      // The position of this row would be the sum of all row heights
      // until the previous row position.
      let pos = 0;
      let height: any = 50;
      if (this.fixedRowHeight && !this.rowDetail) {
        height = this.rowHeight;
        pos = idx * height;
      } else {
        pos = this.rowHeightsCache.query(idx - 1);
      }
      translateXY(styles, 0, pos);
    }
    return styles;
  }

  getRowOffsetY(index: number): { offsetY: number; height: number } {
    const result = this.rowHeightsCache.queryWithHeight(index);
    return result;
  }

  /**
   * Calculate bottom summary row offset for scrollbar mode.
   * For more information about cache and offset calculation
   * see description for `getRowsStyles` method
   *
   * @returns {*} Returns the CSS3 style to be applied
   *
   * @memberOf DataTableBodyComponent
   */
  getBottomSummaryRowStyles(): any {
    if (!this.scrollbarV || !this.rows || !this.rows.length) {
      return null;
    }

    const styles = { position: 'absolute' };
    const pos = this.rowHeightsCache.query(this.rows.length - 1);

    translateXY(styles, 0, pos);

    return styles;
  }

  /**
   * Hides the loading indicator
   */
  // hideIndicator(): void {
  //   setTimeout(() => this.loadingIndicator = false, 500);
  // }

  /**
   * Updates the index of the rows in the viewport
   */
  updateIndexes(): void {
    let first = 0;
    let last = 0;

    if (this.scrollbarV && !this.limit) {
      if (this.virtualization) {
        // Calculation of the first and last indexes will be based on where the
        // scrollY position would be at.  The last index would be the one
        // that shows up inside the view port the last.
        const height = parseInt(this.myBodyHeight, 0);
        first = this.rowHeightsCache.getRowIndex(this.offsetY, true);
        last = this.rowHeightsCache.getRowIndex(height + this.offsetY);
      } else {
        // If virtual rows are not needed
        // We render all in one go
        first = 0;
        last = this.rowCount;
      }
    } else {
      // The server is handling paging and will pass an array that begins with the
      // element at a specified offset.  first should always be 0 with external paging.
      if (!this.externalPaging) {
        first = Math.max(this.myOffset * this.pageSize, 0);
      }
      last = Math.min((first + this.pageSize), this.rowCount);
    }

    this.indexes = { first, last };
  }

  /**
   * Refreshes the full Row Height cache.  Should be used
   * when the entire row array state has changed.
   */
  refreshRowHeightCache(): void {
    if (!this.scrollbarV || (this.scrollbarV && !this.virtualization)) return;

    // clear the previous row height cache if already present.
    // this is useful during sorts, filters where the state of the
    // rows array is changed.
    this.rowHeightsCache.clearCache();

    // Initialize the tree only if there are rows inside the tree.
    if (this.rows && this.rows.length) {
      this.rowHeightsCache.initCache({
        rows: this.rows,
        rowHeight: this.rowHeight,
        rowDetailHeight: this.getDetailRowHeight,
        groupRowHeight: this.groupRowHeight,
        externalVirtual: this.scrollbarV && this.externalPaging,
        rowCount: this.rowCount,
        rowIndexes: this.rowIndexes,
        rowExpansions: this.rowExpansions
      });
    }
  }

  /**
   * Gets the index for the view port
   */
  getAdjustedViewPortIndex(): number {
    // Capture the row index of the first row that is visible on the viewport.
    // If the scroll bar is just below the row which is highlighted then make that as the
    // first index.
    const viewPortFirstRowIndex = this.indexes.first;

    if (this.scrollbarV && this.virtualization) {
      const offsetScroll = this.rowHeightsCache.query(viewPortFirstRowIndex - 1);
      return offsetScroll <= this.offsetY ? viewPortFirstRowIndex - 1 : viewPortFirstRowIndex;
    }

    return viewPortFirstRowIndex;
  }

  /**
   * Toggle the Expansion of the row i.e. if the row is expanded then it will
   * collapse and vice versa.   Note that the expanded status is stored as
   * a part of the row object itself as we have to preserve the expanded row
   * status in case of sorting and filtering of the row set.
   */
  toggleRowExpansion(row: any): boolean {
    // Capture the row index of the first row that is visible on the viewport.
    const viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
    let expanded = this.rowExpansions.get(row);

    // If the rowDetailHeight is auto --> only in case of non-virtualized scroll
    if (this.scrollbarV && this.virtualization) {
      const rowDetailHeight = this.getDetailRowHeight(row) * (expanded ? -1 : 1);
      // const idx = this.rowIndexes.get(row) || 0;
      const idx = this.getRowIndex(row);
      this.rowHeightsCache.update(idx, rowDetailHeight);
    }

    // Update the toggled row and update thive nevere heights in the cache.
    expanded = expanded ^= 1;
    this.rowExpansions.set(row, expanded);

    this.$emit('detail-toggle', {
      rows: [row],
      currentIndex: viewPortFirstRowIndex
    });
    return Boolean(expanded);
  }

  /**
   * Expand/Collapse all the rows no matter what their state is.
   */
  toggleAllRows(expanded: boolean): void {
    // clear prev expansions
    this.rowExpansions.clear();

    const rowExpanded = expanded ? 1 : 0;

    // Capture the row index of the first row that is visible on the viewport.
    const viewPortFirstRowIndex = this.getAdjustedViewPortIndex();

    for (const row of this.rows) {
      this.rowExpansions.set(row, rowExpanded);
    }

    if (this.scrollbarV) {
      // Refresh the full row heights cache since every row was affected.
      this.recalcLayout();
    }

    // Emit all rows that have been expanded.
    this.$emit('detail-toggle', {
      rows: this.rows,
      currentIndex: viewPortFirstRowIndex
    });
  }

  onGroupToggle($event) {
    this.$emit('group-toggle', $event);
    // if ($event.type === 'group') {
    //   this.toggleRowExpansion($event.value);
    // } else if ($event.type === 'all') {
    //   this.toggleAllRows($event.value);
    // }
    // this.updateIndexes();
    // this.updateRows(true);
  }

  /**
   * Recalculates the table
   */
  recalcLayout(updateOffset: boolean = false): void {
    this.refreshRowHeightCache();
    if (updateOffset) {
      this.offsetY = this.updateOffsetY(this.offset, true);
    }
    this.updateIndexes();
    this.$nextTick(() => {
      this.updateRows();
      if (updateOffset) {
        this.updateOffsetY(this.offset, true);
      }
    });
  }

  /**
   * Tracks the column
   */
  columnTrackingFn(index: number, column: any): any {
    return column.$$id;
  }

  /**
   * Gets the row pinning group styles
   */
  // stylesByGroup(group: string) {
  //   const widths = this.columnGroupWidths;
  //   const offsetX = this.myOffsetX;

  //   const styles = {
  //     width: `${widths[group]}px`
  //   };

  //   if (group === 'left') {
  //     translateXY(styles, offsetX, 0);
  //   } else if (group === 'right') {
  //     const bodyWidth = parseInt(this.innerWidth + '', 0);
  //     const totalDiff = widths.total - bodyWidth;
  //     const offsetDiff = totalDiff - offsetX;
  //     const offset = offsetDiff * -1;
  //     translateXY(styles, offset, 0);
  //   }

  //   return styles;
  // }

  initExpansions(group: IGroupedRows) {
    this.rowExpansions.set(group, 1);
    if (group.groups) {
      for (const gr of group.groups) {
        this.initExpansions(gr);
      }
    }
  }

  /**
   * Returns if the row was expanded and set default row expansion when row expansion is empty
   */
  getRowExpanded(row: any): boolean {
    // if (this.rowExpansions.size === 0 && this.groupExpansionDefault && this.groupedRows) {
    //   for (const group of this.groupedRows) {
    //     this.initExpansions(group);
    //   }
    // }
    const expanded = this.rowExpansions.get(row);
    return expanded === 1;
  }

  /**
   * Gets the row index given a row
   */
  getRowIndex(row: any): number {
    return row ? this.rowIndexes.get(row) || 0 : 0;
  }

  onTreeAction(event) {
    this.$emit('tree-action', event);
  }

  isSelect(row) {
    return this.selector ? this.selector.getRowSelected(row) : false;
  }

  isChecked(row) {
    return this.selector ? this.selector.getRowChecked(row) : false;
  }

  onActivate(event, index) {
    this.selector && this.selector.onActivate(event, this.indexes.first + index);
  }

  onRowRendered(row: any) {
    if (this.renderCounter === 0) {
      console.time('render');
    }
    this.renderCounter++;
    const counter = this.renderCounter;
    clearTimeout(this.renderId);
    this.renderId = setTimeout(() => this.checkRenderFinish(counter), 100);
  }

  checkRenderFinish(counter: number) {
    if (counter === this.renderCounter) {
      console.timeEnd('render');
      this.renderCounter = 0;
      this.$emit('rendered');
    } else {
      counter = this.renderCounter;
      clearTimeout(this.renderId);
      this.renderId = setTimeout(() => this.checkRenderFinish(counter), 100);
    }
  }

  buildStylesByGroup() {
    this.groupStyles['left'] = this.calcStylesByGroup('left');
    this.groupStyles['center'] = this.calcStylesByGroup('center');
    this.groupStyles['right'] = this.calcStylesByGroup('right');
  }

  calcStylesByGroup(group: string) {
    const widths = this.columnGroupWidths;
    const offsetX = this.myOffsetX;
    const styles = {
      width: `${widths[group]}px`
    };
    if (group === 'left') {
      translateXY(styles, offsetX, 0);
    } else if (group === 'right') {
      const bodyWidth = parseInt(this.innerWidth + '', 0);
      const totalDiff = widths.total - bodyWidth;
      const offsetDiff = totalDiff - offsetX;
      const offset = (offsetDiff + this.scrollbarHelper.width) * -1;
      translateXY(styles, offset, 0);
    }
    return styles;
  }

  getRowStyles(row: any): object {
    if (row) {
      return {
        width: this.columnGroupWidths.total + 'px',
        height: this.getRowHeight(row) + 'px',
      };
    }
    return {
      width: this.columnGroupWidths.total + 'px',
    };
  }

  getGroupStyles(colGroup: any): object {
    if (colGroup && colGroup.type) {
      return {
        width: this.columnGroupWidths.total + 'px',
        ...this.groupStyles[colGroup.type],
      };
    }
    return {
      width: this.columnGroupWidths.total + 'px',
    };
  }

  treeStatus(row) {
    if (!row) {
      return null;
    }
    return row.treeStatus;
  }

  getGroupClass(row): string {
    let cls = 'datatable-body-row';
    if (this.isSelect(row)) cls += ' active';
    const rowIndex = this.getRowIndex(row);
    if (rowIndex % 2 !== 0) {
      cls += ' datatable-row-odd';
    } else {
      cls += ' datatable-row-even';
    }
    if (this.rowClass) {
      const res = this.rowClass(row);
      if (typeof res === 'string') {
        cls += ` ${res}`;
      } else if (typeof res === 'object') {
        const keys = Object.keys(res);
        for (const k of keys) {
          if (res[k] === true) cls += ` ${k}`;
        }
      }
    }
    return cls;
  }

  getCellContext(row: any, group: any, column: any): ICellContext {
    let cellContext: ICellContext = this.cellContextFor(row, column);
    if (cellContext) {
      this.updateCellContext(cellContext, row);
      this.setCellValue(cellContext);
      return cellContext;
    }
    cellContext = {
      onCheckboxChangeFn: null,
      activateFn: null,
      displayCheck: this.displayCheck,
      row,
      group,
      column,
      rowHeight: this.getRowHeight(row),
      isSelected: this.isSelect(row),
      isChecked: this.isChecked(row),
      rowIndex: this.getRowIndex(row),
      expanded: this.getRowExpanded(row),
      treeStatus: this.treeStatus(row),
      onTreeAction: null,
      isFocused: false,
      value: '',
      sanitizedValue: '',
      // sortDir: SortDirection;
      // sorts: any[];
    };
    cellContext = (Vue as any).observable(cellContext);
    this.setCellValue(cellContext);
    this.saveContextFor(row, column, cellContext);
    return cellContext;
  }

  updateCellContext(context: ICellContext, row: any) {
    context.rowHeight = this.getRowHeight(row);
    context.isSelected = this.isSelect(row);
    context.isChecked = this.isChecked(row);
    context.rowIndex = this.getRowIndex(row);
    context.expanded = this.getRowExpanded(row);
    context.treeStatus = this.treeStatus(row);
  }

  cellContextFor(row: any, column: any): ICellContext {
    const rowId = this.rowIdentity(row);
    const colId = column.$$id;
    const cols = this.cellContexts.get(rowId);
    if (cols) {
      return cols[colId];
    }
    return null;
  }

  saveContextFor(row: any, column: any, cellContext: ICellContext) {
    const rowId = this.rowIdentity(row);
    const colId = column.$$id;
    let cols = this.cellContexts.get(rowId);
    if (!cols) {
      cols = {};
    }
    cols[colId] = cellContext;
    this.cellContexts.set(rowId, cols);
  }

  setCellValue(cellContext: ICellContext): void {
    let value = '';

    if (!cellContext.row || !cellContext.column) {
      value = '';
    } else {
      // todo: make transform by vue filters
      // const val = this.column.$$valueGetter(this.row, this.column.prop);
      // const userPipe: PipeTransform = this.column.pipe;

      // if (userPipe) {
      //   value = userPipe.transform(val);
      // } else if (value !== undefined) {
      //   value = val;
      // }
      value = cellContext.column.$$valueGetter(cellContext.row, cellContext.column.prop);
    }

    if(cellContext.value !== value) {
      cellContext.value = value;
      cellContext.sanitizedValue = value !== null && value !== undefined ? this.stripHtml(value) : value;
    }
  }

  updateCellContexts(removedColumns: TableColumn[]) {
    const values = Array.from(this.cellContexts.values());
    values.forEach(value => {
      removedColumns.forEach(removed => delete value[removed.$$id]);
    });
  }

  stripHtml(html: string): string {
    if(!html.replace) return html;
    return html.replace(/<\/?[^>]+(>|$)/g, '');
  }

  cellColumnCssClasses(context: ICellContext): Record<string, string> {
    if (!context) {
      // return 'datatable-body-cell';
      return null;
    }
    const result = {
      // 'datatable-body-cell': true,
    };
    // let cls = 'datatable-body-cell';
    let func = null;
    if (context.column.cellClass) {
      if (typeof context.column.cellClass === 'string') {
        // cls += ' ' + this.column.cellClass;
        result[context.column.cellClass] = true;
      } else if (Array.isArray(context.column.cellClass)) {
        context.column.cellClass.forEach(value => {
          if (typeof value === 'function') {
            func = value;
          } else {
            result[value] = true;
          }
        });
      } else if (typeof context.column.cellClass === 'function') {
        func = context.column.cellClass;
      }
      if(func) {
        const res = func({
          row: context.row,
          group: context.group,
          column: context.column,
          value: context.value,
          rowHeight: context.rowHeight,
        });

        if (typeof res === 'string') {
          // cls += res;
          result[res] = true;
        } else if (typeof res === 'object') {
          const keys = Object.keys(res);
          for (const k of keys) {
            if (res[k] === true) {
              // cls += ` ${k}`;
              result[` ${k}`] = true;
            }
          }
        }
      }
    }
    result['sort-active'] = !context.sortDir;
    result['active'] = context.isFocused;
    result['sort-asc'] = context.sortDir === SortDirection.asc;
    result['sort-desc'] = context.sortDir === SortDirection.desc;
    
    // if (!this.sortDir) cls += ' sort-active';
    // if (this.isFocused) cls += ' active';
    // if (this.sortDir === SortDirection.asc) cls += ' sort-asc';
    // if (this.sortDir === SortDirection.desc) cls += ' sort-desc';
    // return cls;
    return result;
  }

  cellStyleObject(context: ICellContext): Record<string, string | number> {
    if (!context) {
      return {};
    }
    return {
      width: context.column.width + 'px',
      minWidth: context.column.minWidth + 'px',
      maxWidth: context.column.maxWidth + 'px',
      height: this.cellHeight(context.rowHeight),
    };
  }

  marginCellStyle(context: ICellContext): Record<string, string> {
    if (!context) {
      return {};
    }
    return {
      'margin-left': this.calcLeftMargin(context.column, context.row) + 'px',
    };
  }

  cellHeight(rowHeight): string | number {
    const height = rowHeight;
    if (isNaN(height)) return height;
    return height + 'px';
  }

  calcLeftMargin(column: any, row: any) {
    const levelIndent = column.treeLevelIndent != null ? column.treeLevelIndent : 50;
    return column.isTreeColumn ? row.level * levelIndent : 0;
  }

  get cellSlots(): () => {} {
    const result = {};
    this.columns && this.columns.forEach(column => {
      if (column.cellTemplate) {
        result[column.prop] = column.cellTemplate;
      }
    });
    return () => result;
  }

  onCellFocus($event) {
    console.log('onCellFocus($event)');
  }

  /**
   * Toggle the expansion of the row
   */
  toggleExpandDetail(row: any): void {
    const expanded = this.toggleRowExpansion(row);
    this.columns.forEach(column => {
      const cellContext = this.cellContextFor(row, column);
      if (cellContext) {
        cellContext.expanded = expanded;
      }
    });
    this.updateIndexes();
    this.updateRows(true);
    this.$emit('detail-toggle', {
      type: 'row',
      value: row
    });
  }

  /**
   * Expand all the rows.
   */
  expandAllDetails(): void {
    this.toggleAllRows(true);
    this.$emit('detail-toggle', {
      type: 'all',
      value: true
    });
  }

  /**
   * Collapse all the rows.
   */
  collapseAllDetails(): void {
    this.toggleAllRows(false);
    this.$emit('detail-toggle', {
      type: 'all',
      value: false
    });
  }

}
