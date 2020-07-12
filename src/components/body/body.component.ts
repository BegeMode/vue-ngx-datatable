import { TreeStatus } from 'components/body/body-cell.component';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { ScrollbarHelper } from '../../services/scrollbar-helper.service';
import { SelectionType, TableColumn } from '../../types';
import { CheckMode } from '../../types/check.type';
import { IGroupedRows } from '../../types/grouped-rows';
import { IRowContext } from '../../types/row-context.type';
import {
  columnGroupWidths,
  columnsByPin,
  columnsByPinArr,
  IColumnsWidth,
  RowHeightCache,
  throttle,
  translateXY,
} from '../../utils';
import DataTableBodyGroupHeaderComponent from './body-group-header.component';
import DataTableBodyRowDetailComponent from './body-row-detail.component';
import DataTableRowWrapperComponent from './body-row-wrapper.component.vue';
import DataTableBodyRowComponent from './body-row.component.vue';
import ProgressBarComponent from './progress-bar.component';
import ScrollerComponent from './scroller.component';
import DataTableSelectionComponent from './selection.component';
// import DataTableRowWrapperComponent from './body-row-wrapper.component.vue';
// import DataTableBodyRowComponent from './body-row.component.vue';
import DataTableSummaryRowComponent from './summary/summary-row.component';

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
  },
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
  @Prop() rowIdentity: (row: any) => any;
  @Prop() rowDetail: boolean;
  @Prop() rowDetailHeight: number | string | ((row?: any, index?: any) => number);
  @Prop() groupHeader: any;
  @Prop() selectCheck: any;
  @Prop() displayCheck: any;
  @Prop() trackByProp: string;
  @Prop() rowClass: (row: any, rowIndex: number) => string | string;
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
  @Prop() rows: Record<string, unknown>[];
  @Prop() columns: TableColumn[];
  @Prop() offset: number;
  @Prop() rowCount: number;
  @Prop() bodyHeight: number;
  @Prop({ type: [Number, String], default: null }) minItemHeight: number | string;
  @Prop({ type: [String], default: 'height' }) heightField: string;
  @Prop() groupHeaderSlot: any;
  @Prop() rowDetailSlot: any;
  @Prop() renderTracking: boolean;

  scroller: ScrollerComponent = null; // ScrollerComponent
  selector: DataTableSelectionComponent = null; // DataTableSelectionComponent;
  rowHeightsCache: RowHeightCache = new RowHeightCache();
  offsetY = 0;
  myOffset = 0;
  myOffsetX = 0;
  indexes = { first: 0, last: 0 };
  columnGroupWidths: IColumnsWidth = null;
  columnGroupWidthsWithoutGroup = null;
  rowIndexes = new Map<Record<string, unknown>, number>();
  rowExpansions = new Map<Record<string, unknown> | IGroupedRows, boolean>();
  myBodyHeight: number | string = null;
  columnsByPin = null;
  groupStyles = {
    left: {},
    center: {},
    right: {},
  };

  onBodyScrollHandler = throttle(this.onBodyScroll.bind(this), 10, { trailing: true });

  rowTrackingFn: any;
  listener: any;
  lastFirst: number;
  lastLast: number;
  lastRowCount: number;
  rowsChanged: boolean;
  rowContexts: Array<IRowContext> = [];
  private readonly scrollbarHelper = new ScrollbarHelper();
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

  @Watch('pageSize') onPageSize(): void {
    this.recalcLayout();
  }

  @Watch('rows', { immediate: true }) async onRowsChanged(): Promise<void> {
    this.rowsChanged = true;
    this.rowExpansions.clear();
    // const updateOffset = this.rows && this.rows.length && this.offset || (!this.offset && this.offsetY);
    const updateOffset =
      this.rows && this.rows.length && ((this.offset && !this.offsetY) || (!this.offset && this.offsetY));
    if (updateOffset) {
      this.updateOffsetY(this.offset, true);
      await this.$nextTick();
      if (this.offset && !this.offsetY) {
        // if offsetY wasn't set, try one more time
        this.updateOffsetY(this.offset, true);
        await this.$nextTick();
      }
    }
    this.recalcLayout();
    // this.$nextTick(() => {
    //   this.scroller = this.$refs.scroller;
    //   if (updateOffset) {
    //     this.updateOffsetY(this.offset, true);
    //   }
    // });
  }

  // @Watch('groupedRows') onGroupedRowsChanged() {
  //   this.onRowsChanged();
  // }

  @Watch('selected', { deep: true }) async onSelectedChanged(): Promise<void> {
    await this.$nextTick();
    this.rowContexts.forEach(rowContext => {
      rowContext.isSelected = this.isSelect(rowContext.row);
      rowContext.isChecked = this.isChecked(rowContext.row);
    });
  }

  @Watch('checked', { deep: true }) async onCheckedChanged(): Promise<void> {
    await this.$nextTick();
    this.rowContexts.forEach(rowContext => {
      rowContext.isChecked = this.isChecked(rowContext.row);
    });
  }

  @Watch('columns', { immediate: true }) onColumnsChanged(): void {
    this.recalculateColumns();
    this.buildStylesByGroup();
  }

  @Watch('offset', { immediate: true }) onOffsetChanged(): void {
    this.myOffset = this.offset;
  }

  @Watch('offsetX', { immediate: true }) onOffsetXChanged(): void {
    this.myOffsetX = this.offsetX;
  }

  @Watch('myOffsetX') onMyOffsetXChanged(): void {
    this.buildStylesByGroup();
  }

  @Watch('innerWidth') onInnerWidthChanged(): void {
    this.recalculateColumns();
    this.buildStylesByGroup();
  }

  @Watch('myOffset') onMyOffsetChanged(): void {
    if (this.limit) {
      this.recalcLayout();
    }
  }

  @Watch('rowCount') onRowCountChanged(): void {
    this.recalcLayout();
  }

  @Watch('bodyHeight', { immediate: true }) onBodyHeightChanged(): void {
    this.myBodyHeight = this.bodyHeight;
    if (this.myBodyHeight === -1) {
      this.myBodyHeight = '0px';
      return;
    }
    if (this.scrollbarV) {
      this.myBodyHeight = this.myBodyHeight.toString() + 'px';
    } else {
      this.myBodyHeight = 'auto';
    }
    this.recalcLayout();
  }

  /**
   * Creates an instance of DataTableBodyComponent.
   */
  created(): void {
    // declare fn here so we can get access to the `this` property
    this.rowTrackingFn = (row: any): any => {
      const idx = this.getRowIndex(row);
      if (this.trackByProp) {
        return `${idx}-${this.trackByProp}`;
      }
      return idx;
    };
  }

  mounted(): void {
    this.selector = this.$refs.selector as DataTableSelectionComponent;
    this.scroller = this.$refs.scroller as ScrollerComponent;
  }

  get bodyWidth(): string {
    if (this.scrollbarH) {
      return `${this.innerWidth}px`;
    }
    return '100%';
  }

  get styleObject(): Record<string, string> {
    return {
      width: this.bodyWidth ? this.bodyWidth : 'auto',
      height: this.myBodyHeight ? this.myBodyHeight.toString() : 'auto',
    };
  }

  /**
   * Returns if selection is enabled.
   */
  get selectEnabled(): boolean {
    return Boolean(this.selectionType);
  }

  get checkEnabled(): boolean {
    return this.checkMode === CheckMode.checkNoSelect || this.selectionType === SelectionType.checkbox;
  }

  get isUseRowHeightCache(): boolean {
    if (
      (this.fixedRowHeight && !this.rowDetailHeight && !this.groupRowsBy) ||
      (this.scrollbarV && !this.virtualization) ||
      !this.scrollbarV
    ) {
      return false;
    }
    return true;
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
      if (!this.isUseRowHeightCache) {
        const height: any = this.rowHeight;
        return height * this.rowCount;
      }
      return this.rowHeightsCache.query(this.rowCount - 1);
    }
  }

  get scrollWidth(): string {
    return this.columnGroupWidths ? this.columnGroupWidths.total.toString() : 'auto';
  }

  /**
   * Called once, before the instance is destroyed.
   */
  destroyed(): void {
    // todo
    // if (this.rowDetail) this.listener.unsubscribe();
    // if (this.groupHeader) this.listener.unsubscribe();
  }

  reset(): void {
    this.offsetX = 0;
    this.offsetY = 0;
  }

  onSelect(event: { selected: Array<any>; index: number }): void {
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
    if (!this.scroller) {
      return;
    }
    let offsetY = 0;
    if (this.scrollbarV && this.virtualization && offset) {
      // First get the row Index that we need to move to.
      const rowIndex = this.pageSize * offset;
      if (this.isUseRowHeightCache) {
        offsetY = this.rowHeightsCache.query(rowIndex - 1);
      } else {
        offsetY = rowIndex * (this.rowHeight as number);
      }
    } else if (this.scrollbarV && !this.virtualization) {
      offsetY = 0;
    }
    if (offset && !offsetY) {
      return 0;
    }
    this.scroller.setOffset(offsetY || 0, fromPager);
    return offsetY || 0;
  }

  onScrollSetup(event: { scrollYPos: number; scrollXPos: number }): void {
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
    if (this.offsetY !== scrollYPos || this.myOffsetX !== scrollXPos) {
      // Math.abs(scrollYPos - this.offsetY) > 50
      this.$emit('scroll', {
        offsetY: scrollYPos,
        offsetX: scrollXPos,
      });
    }
    this.offsetY = scrollYPos;
    this.myOffsetX = scrollXPos;
    this.$nextTick(() => {
      this.updateIndexes(event.direction);
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
    } else if (direction === 'up') {
      offset = Math.ceil(offset);
    } else if (direction === 'down') {
      offset = Math.floor(offset);
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
    if (this.rows?.length) {
      this.lastFirst = first;
      this.lastLast = last;
    }
    this.lastRowCount = this.rowCount;
    // if (!this.pagination) {
    //   first = Math.max(0, first - 20);
    //   last = Math.min(this.rowCount, last + 10);
    // }
    let rowIndex = first;
    let idx = 0;
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
    const temp: Array<IRowContext> = [];
    let rowContext: IRowContext;
    while (rowIndex < last && rowIndex < this.rowCount) {
      const row = this.rows[rowIndex];
      if (row) {
        this.rowIndexes.set(row, rowIndex);
        rowContext = this.rowContexts[idx];
        if (!rowContext) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          rowContext = {} as any;
        }
        rowContext.row = row;
        rowContext.rowIndex = rowIndex;
        rowContext.rowHeight = this.getRowHeight(row);
        rowContext.isSelected = this.isSelect(row);
        rowContext.isChecked = this.isChecked(row);
        rowContext.expanded = this.getRowExpanded(row);
        rowContext.treeStatus = this.treeStatus(row);
        temp[idx] = rowContext;
        // temp[idx] = {
        //   row,
        //   rowIndex,
        //   rowHeight: this.getRowHeight(row),
        //   isSelected: this.isSelect(row),
        //   isChecked: this.isChecked(row),
        //   expanded: this.getRowExpanded(row),
        //   treeStatus: this.treeStatus(row)
        // };
        idx++;
      }
      rowIndex++;
    }
    // }
    this.rowContexts = temp;
    // console.log('updateRows first = ', first);
  }

  /**
   * Get the row height
   */
  getRowHeight(row: Record<string, unknown>): number {
    // if its a function return it
    if (typeof this.rowHeight === 'function') {
      return this.rowHeight(row);
    }
    return this.rowHeight;
  }

  /**
   * @param group the group with all rows
   */
  getGroupHeight(group: { value: Array<Record<string, unknown>> }): number {
    let rowHeight = 0;
    if (Array.isArray(group.value)) {
      for (const value of group.value) {
        rowHeight += this.getRowAndDetailHeight(value);
      }
    }
    return rowHeight;
  }

  /**
   * Calculate row height based on the expanded state of the row.
   */
  getRowAndDetailHeight(row: Record<string, unknown>): number {
    let rowHeight = this.getRowHeight(row);
    const expanded = this.rowExpansions.get(row);

    // Adding detail row height if its expanded.
    if (expanded) {
      rowHeight += this.getDetailRowHeight(row);
    }

    return rowHeight;
  }

  /**
   * Get the height of the detail row.
   */
  getDetailRowHeight = (row?: Record<string, unknown>, index?: number): number => {
    if (!this.rowDetail) {
      return 0;
    }
    const rowHeight = this.rowDetailHeight || this.getRowHeight(row) || 50;
    return typeof rowHeight === 'function' ? rowHeight(row, index) : Number(rowHeight);
  };

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
  getRowWrapperStyles(rowContext: IRowContext): Record<string, string> {
    if (!rowContext) {
      return null;
    }
    const styles = {};
    // only add styles for the group if there is a group
    if (this.groupRowsBy) {
      styles['width'] = '100%'; // this.columnGroupWidths.total + 'px';
    }

    if (this.scrollbarV && this.virtualization) {
      let idx = 0;
      // let row = rows;
      // if (this.groupedRows) {
      //   // Get the latest row rowindex in a group
      //   row = rows[rows.length - 1];
      //   idx = row ? this.getRowIndex(row) : 0;
      // } else {
      idx = rowContext.rowIndex;
      // }
      // const pos = idx * rowHeight;
      // The position of this row would be the sum of all row heights
      // until the previous row position.
      let pos = 0;
      let height: any = 50;
      if (!this.isUseRowHeightCache) {
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
    if (this.isUseRowHeightCache) {
      let result = this.rowHeightsCache.queryWithHeight(index);
      if (!result) {
        result = { height: 0, offsetY: 0 };
      }
      return result;
    }
    return {
      offsetY: (this.rowHeight as number) * index,
      height: this.rowHeight as number,
    };
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
  getBottomSummaryRowStyles(): Record<string, string> {
    if (!this.scrollbarV || !this.rows || !this.rows.length) {
      return null;
    }

    const styles = { position: 'absolute' };
    let pos = 0;
    if (this.isUseRowHeightCache) {
      pos = this.rowHeightsCache.query(this.rows.length - 1);
    } else {
      pos = (this.rowHeight as number) * (this.rowCount - 1);
    }

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
  updateIndexes(direction?: string): void {
    let first = 0;
    let last = 0;

    if (this.scrollbarV && !this.limit) {
      if (this.virtualization) {
        // Calculation of the first and last indexes will be based on where the
        // scrollY position would be at.  The last index would be the one
        // that shows up inside the view port the last.
        const height = parseInt(this.myBodyHeight.toString(), 10);
        if (this.isUseRowHeightCache) {
          first = this.rowHeightsCache.getRowIndex(this.offsetY);
          last = this.rowHeightsCache.getRowIndex(height + this.offsetY) + 1;
        } else {
          first = Math.floor(this.offsetY / (this.rowHeight as number));
          last = Math.ceil((height + this.offsetY) / (this.rowHeight as number));
        }
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
      last = Math.min(first + this.pageSize, this.rowCount);
    }
    // if (direction === 'down') {
    //   last = last === this.rowCount ? last : last + 1;
    // }
    this.indexes = { first, last };
  }

  /**
   * Refreshes the full Row Height cache.  Should be used
   * when the entire row array state has changed.
   */
  refreshRowHeightCache(): void {
    if (!this.isUseRowHeightCache) {
      return;
    }
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
        rowExpansions: this.rowExpansions,
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

    let offsetScroll;
    if (this.isUseRowHeightCache) {
      offsetScroll = this.rowHeightsCache.query(viewPortFirstRowIndex);
      return offsetScroll <= this.offsetY ? Math.max(0, viewPortFirstRowIndex - 1) : viewPortFirstRowIndex;
    }
    offsetScroll = (this.rowHeight as number) * viewPortFirstRowIndex;
    return offsetScroll <= this.offsetY ? Math.max(0, viewPortFirstRowIndex - 1) : viewPortFirstRowIndex;
    // return viewPortFirstRowIndex;
  }

  /**
   * Toggle the Expansion of the row i.e. if the row is expanded then it will
   * collapse and vice versa.   Note that the expanded status is stored as
   * a part of the row object itself as we have to preserve the expanded row
   * status in case of sorting and filtering of the row set.
   */
  toggleRowExpansion(rowContext: IRowContext): boolean {
    // Capture the row index of the first row that is visible on the viewport.
    // const viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
    let expanded = rowContext.expanded;

    // If the rowDetailHeight is auto --> only in case of non-virtualized scroll
    if (this.isUseRowHeightCache) {
      const rowDetailHeight = this.getDetailRowHeight(rowContext.row) * (expanded ? -1 : 1);
      this.rowHeightsCache.update(rowContext.rowIndex, rowDetailHeight);
    }
    // Update the toggled row and update thive nevere heights in the cache.
    expanded = !expanded;
    this.rowExpansions.set(rowContext.row, expanded);

    this.$emit('detail-toggle', {
      rows: [rowContext.row],
      currentIndex: rowContext.rowIndex, // viewPortFirstRowIndex
    });
    return Boolean(expanded);
  }

  /**
   * Expand/Collapse all the rows no matter what their state is.
   */
  toggleAllRows(expanded: boolean): void {
    // clear prev expansions
    this.rowExpansions.clear();

    const rowExpanded = Boolean(expanded);

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
      currentIndex: viewPortFirstRowIndex,
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onGroupToggle($event: any): void {
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
  recalcLayout(): void {
    this.refreshRowHeightCache();
    this.updateIndexes();
    this.updateRows();
  }

  /**
   * Tracks the column
   */
  columnTrackingFn(index: number, column: TableColumn): string {
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

  initExpansions(group: IGroupedRows): void {
    this.rowExpansions.set(group, true);
    if (group.groups) {
      for (const gr of group.groups) {
        this.initExpansions(gr);
      }
    }
  }

  /**
   * Returns if the row was expanded and set default row expansion when row expansion is empty
   */
  getRowExpanded(row: Record<string, unknown>): boolean {
    // if (this.rowExpansions.size === 0 && this.groupExpansionDefault && this.groupedRows) {
    //   for (const group of this.groupedRows) {
    //     this.initExpansions(group);
    //   }
    // }
    if (!this.rowDetail) {
      return false;
    }
    const expanded = this.rowExpansions.get(row);
    return expanded;
  }

  /**
   * Gets the row index given a row
   */
  getRowIndex(row: Record<string, unknown>): number {
    return row ? this.rowIndexes.get(row) || 0 : 0;
  }

  onTreeAction(event: unknown): void {
    this.$emit('tree-action', event);
  }

  isSelect(row: Record<string, unknown>): boolean {
    if (!this.selectEnabled) {
      return false;
    }
    return this.selector ? this.selector.getRowSelected(row) : false;
  }

  isChecked(row: Record<string, unknown>): boolean {
    if (!this.checkEnabled) {
      return false;
    }
    return this.selector ? this.selector.getRowChecked(row) : false;
  }

  onActivate(event: any, index: number): void {
    if (this.selector) {
      this.selector.onActivate(event, this.indexes.first + index);
    }
  }

  onRowRendered(row: Record<string, unknown>): void {
    if (this.renderCounter === 0) {
      // eslint-disable-next-line no-console
      console.time('render');
    }
    this.renderCounter++;
    const counter = this.renderCounter;
    clearTimeout(this.renderId);
    this.renderId = setTimeout(() => this.checkRenderFinish(counter), 100);
  }

  checkRenderFinish(counter: number): void {
    if (counter === this.renderCounter) {
      // eslint-disable-next-line no-console
      console.timeEnd('render');
      this.renderCounter = 0;
      this.$emit('rendered');
    } else {
      counter = this.renderCounter;
      clearTimeout(this.renderId);
      this.renderId = setTimeout(() => this.checkRenderFinish(counter), 100);
    }
  }

  buildStylesByGroup(): void {
    this.groupStyles['left'] = this.calcStylesByGroup('left');
    this.groupStyles['center'] = this.calcStylesByGroup('center');
    this.groupStyles['right'] = this.calcStylesByGroup('right');
  }

  calcStylesByGroup(group: keyof IColumnsWidth): Record<string, string> {
    const widths = this.columnGroupWidths;
    const offsetX = this.myOffsetX;
    const styles = {
      width: `${widths[group]}px`,
    };
    if (group === 'left') {
      translateXY(styles, offsetX, 0);
    } else if (group === 'right') {
      const bodyWidth = parseInt(this.innerWidth.toString(), 10);
      const totalDiff = widths.total - bodyWidth;
      const offsetDiff = totalDiff - offsetX;
      const offset = (offsetDiff + this.scrollbarHelper.width) * -1;
      translateXY(styles, offset, 0);
    }
    return styles;
  }

  getGroupStyles(colGroup: { type: 'left' | 'center' | 'right' }): Record<string, string | number> {
    if (colGroup && colGroup.type) {
      return {
        width: `${this.columnGroupWidths.total}px`,
        ...this.groupStyles[colGroup.type],
      };
    }
    return {
      width: `${this.columnGroupWidths.total}px`,
    };
  }

  treeStatus(row: Record<string, unknown>): TreeStatus {
    if (!row) {
      return null;
    }
    return row.treeStatus as TreeStatus;
  }

  isRowVisible(row: Record<string, unknown>): boolean {
    const rowContext = this.rowContexts.find(c => c.row === row);
    if (!rowContext) {
      return false;
    }
    let rowOffsetY;
    if (this.isUseRowHeightCache) {
      rowOffsetY = this.rowHeightsCache.query(rowContext.rowIndex);
    } else {
      rowOffsetY = (this.rowHeight as number) * rowContext.rowIndex;
    }
    return rowOffsetY >= this.offsetY && rowOffsetY <= this.offsetY + this.bodyHeight;
  }

  get cellSlots(): () => Record<string, unknown> {
    const result = {};
    if (this.columns) {
      this.columns.forEach(column => {
        if (column.cellTemplate) {
          result[column.prop] = column.cellTemplate;
        }
      });
    }
    return () => result;
  }

  onCellFocus($event: any): void {
    // eslint-disable-next-line no-console
    console.log('onCellFocus($event)');
  }

  /**
   * Toggle the expansion of the row
   */
  toggleExpandDetail(row: Record<string, unknown>): void {
    const rowContext = this.rowContexts.find(c => c.row === row);
    if (!rowContext) {
      throw new Error('row context is not found');
    }
    rowContext.expanded = this.toggleRowExpansion(rowContext);
    this.updateIndexes();
    this.updateRows(true);
    this.$emit('detail-toggle', {
      type: 'row',
      value: row,
    });
  }

  /**
   * Expand all the rows.
   */
  expandAllDetails(): void {
    this.toggleAllRows(true);
    this.$emit('detail-toggle', {
      type: 'all',
      value: true,
    });
  }

  /**
   * Collapse all the rows.
   */
  collapseAllDetails(): void {
    this.toggleAllRows(false);
    this.$emit('detail-toggle', {
      type: 'all',
      value: false,
    });
  }
}
