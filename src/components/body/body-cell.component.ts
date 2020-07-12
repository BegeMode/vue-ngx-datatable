import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
// import { Keys } from '../../utils';
// import { SortDirection } from '../../types';
// import { TableColumn } from '../../types/table-column.type';
import { Keys } from '../../utils';
import { IRowContext } from '../../types/row-context.type';
import { SortDirection, TableColumn } from 'types';

export type TreeStatus = 'collapsed' | 'expanded' | 'loading' | 'disabled';

@Component
export default class DataTableBodyCellComponent extends Vue {
  @Prop() column: TableColumn;
  @Prop() rowContext: IRowContext;
  @Prop() tabIndex: string;
  @Prop() cellSlot: any;
  @Prop() renderTracking: boolean;
  @Prop() displayCheck: (row: any, column?: TableColumn, value?: any) => boolean;

  sanitizedValue: any = null;
  value: any = null;
  // sortDir: SortDirection = null;
  isFocused: boolean = false;
  // activateFn = this.activate.emit.bind(this.activate); todo

  @Watch('rowContext.row', { deep: true, immediate: true }) onRowChanged() {
    this.checkValueUpdates();
  }

  created() {
    if (this.cellSlot) {
      this.$slots.default = this.cellSlot({
        row: this.rowContext?.row ?? {}, 
        column: this.column,
        rowIndex: this.rowContext.rowIndex, 
        group: this.rowContext.group, 
        expanded: this.rowContext.expanded,
        value: this.value,
        updateCell: this.$forceUpdate.bind(this),
      });
    }
    if (this.renderTracking) {
      this.$emit('cell-created', this.column);
    }
  }

  beforeUpdate() {
    if (this.cellSlot) {
      this.$slots.default = this.cellSlot({
        row: this.rowContext?.row ?? {}, 
        column: this.column,
        rowIndex: this.rowContext.rowIndex, 
        group: this.rowContext.group, 
        expanded: this.rowContext.expanded,
        value: this.value,
        updateCell: this.$forceUpdate.bind(this),
      });
    }
    if (this.renderTracking) {
      this.$emit('cell-updated', this.column);
    }
  }

  checkValueUpdates(): void {
    let value = '';

    if (!this.rowContext || !this.column) {
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
      value = this.column.$$valueGetter(this.rowContext.row, this.column.prop);
    }

    if(this.value !== value) {
      this.value = value;
      this.sanitizedValue = value !== null && value !== undefined ? this.stripHtml(value) : value;
    }
  }

  stripHtml(html: string): string {
    if(!html.replace) return html;
    return html.replace(/<\/?[^>]+(>|$)/g, '');
  }

  onFocus(): void {
    this.isFocused = true;
  }
  
  onBlur(): void {
    this.isFocused = false;
  }

  onClick(event): void {
    // props.context.isFocused = true;
    // props.context.abcd = true;
    this.$emit('activate', {
      type: 'click',
      event,
      row: this.rowContext.row,
      group: this.rowContext.group,
      rowHeight: this.rowContext.rowHeight,
      column: this.column,
      value: this.value,
      cellElement: this.$el,
    });
  }
  
  onDblClick(event): void {
    this.$emit('activate', {
      type: 'dblclick',
      event,
      row: this.rowContext.row,
      group: this.rowContext.group,
      rowHeight: this.rowContext.rowHeight,
      column: this.column,
      value: this.value,
      cellElement: this.$el,
    });
  }
  
  onKeyDown(event): void {
    const keyCode = event.keyCode;
    const isTargetCell = event.target === this.$el;
    const isAction = 
      keyCode === Keys.return ||
      keyCode === Keys.down ||
      keyCode === Keys.up ||
      keyCode === Keys.left ||
      keyCode === Keys.right ||
      keyCode === Keys.pageUp ||
      keyCode === Keys.pageDown;
  
    if (isAction && isTargetCell) {
      event.preventDefault();
      event.stopPropagation();
  
      this.$emit('activate', {
        type: 'keydown',
        event,
        row: this.rowContext.row,
        rowIndex: this.rowContext.rowIndex,
        group: this.rowContext.group,
        rowHeight: this.rowContext.rowHeight,
        column: this.column,
        value: this.value,
        cellElement: this.$el,
      });
    }
  }
  
  onCheckboxChange(event): void {
    this.$emit('activate', {
      type: 'checkbox',
      event,
      row: this.rowContext.row,
      group: this.rowContext.group,
      rowHeight: this.rowContext.rowHeight,
      column: this.column,
      value: this.value,
      cellElement: this.$el,
      treeStatus: this.rowContext.treeStatus,
    });
  }
  
  onTreeAction(event) {
    this.$emit('tree-action', { event, row: this.rowContext.row });
  }

  onMouseEnter(event) {
    this.$emit('mouseenter', { event, row: this.rowContext.row });
  }

  get cssClasses(): Record<string, string | number> {
    if (!this.rowContext) {
      return null;
    }
    const result = {
    };
    let func = null;
    if (this.column.cellClass) {
      if (typeof this.column.cellClass === 'string') {
        result[this.column.cellClass] = true;
      } else if (Array.isArray(this.column.cellClass)) {
        this.column.cellClass.forEach(value => {
          if (typeof value === 'function') {
            func = value;
          } else {
            result[value] = true;
          }
        });
      } else if (typeof this.column.cellClass === 'function') {
        func = this.column.cellClass;
      }
      if(func) {
        const res = func({
          row: this.rowContext?.row,
          group: this.rowContext?.group,
          column: this.column,
          value: this.value,
          rowHeight: this.rowContext?.rowHeight,
        });

        if (typeof res === 'string') {
          result[res] = true;
        } else if (typeof res === 'object') {
          const keys = Object.keys(res);
          for (const k of keys) {
            if (res[k] === true) {
              result[` ${k}`] = true;
            }
          }
        }
      }
    }
    // result['sort-active'] = !this.sortDir;
    result['active'] = this.isFocused;
    // result['sort-asc'] = this.sortDir === SortDirection.asc;
    // result['sort-desc'] = this.sortDir === SortDirection.desc;
    return result;
  }

  get styles(): Record<string, string | number> {
    if (!this.rowContext) {
      return {};
    }
    return {
      width: this.column.width + 'px',
      minWidth: this.column.minWidth ? this.column.minWidth + 'px' : undefined,
      maxWidth: this.column.maxWidth ? this.column.maxWidth + 'px' : undefined,
      height: this.rowContext.rowHeight + 'px', // this.cellHeight(this.rowContext.rowHeight),
    };
  }

  get marginCellStyle(): Record<string, string> {
    if (!this.rowContext) {
      return {};
    }
    return {
      'margin-left': this.calcLeftMargin(this.column, this.rowContext.row) + 'px',
    };
  }

  get isCheckboxable(): boolean {
    return this.column.checkboxable && (!this.displayCheck || this.displayCheck(this.rowContext.row, this.column, this.value));
  }

  cellHeight(rowHeight: number): string | number {
    const height = rowHeight;
    if (isNaN(height)) return height;
    return height + 'px';
  }

  calcLeftMargin(column: TableColumn, row: any) {
    const levelIndent = column.treeLevelIndent != null ? column.treeLevelIndent : 50;
    return column.isTreeColumn ? row.level * levelIndent : 0;
  }
}

/*@Component
export default class DataTableBodyCellComponent extends Vue {
  @Prop() displayCheck: (row: any, column?: TableColumn, value?: any) => boolean;
  @Prop() group: any;
  @Prop() rowHeight: number;
  @Prop() isSelected: boolean;
  @Prop() expanded: boolean;
  @Prop() rowIndex: number;
  @Prop() column: TableColumn;
  @Prop() row: any;
  @Prop() sorts: any[];
  @Prop() treeStatus: TreeStatus;

  sanitizedValue: any = null;
  value: any = null;
  sortDir: SortDirection = null;
  isFocused: boolean = false;
  // activateFn = this.activate.emit.bind(this.activate); todo

  cellContext: any = {
    onCheckboxChangeFn: this.onCheckboxChange,
    // activateFn: this.activateFn,  todo
    row: this.row,
    group: this.group,
    value: this.value,
    column: this.column,
    rowHeight: this.rowHeight,
    isSelected: this.isSelected,
    rowIndex: this.rowIndex,
    treeStatus: this.treeStatus,
    onTreeAction: this.onTreeAction.bind(this),
  };

  private _treeStatus: TreeStatus = 'collapsed';

  @Watch('group') onGroupChanged() {
    this.cellContext.group = this.group;
    this.checkValueUpdates();
  }

  @Watch('rowHeight') onRowHeightChanged() {
    this.cellContext.rowHeight = this.rowHeight;
    this.checkValueUpdates();
  }

  @Watch('isSelected') onIsSelectedChanged() {
    this.cellContext.isSelected = this.isSelected;
  }

  @Watch('expanded') onExpandedChanged() {
    this.cellContext.expanded = this.expanded;
  }

  @Watch('rowIndex') onRowIndexChanged() {
    this.cellContext.rowIndex = this.rowIndex;
    this.checkValueUpdates();
  }

  @Watch('column', { immediate: true }) onColumnChanged() {
    this.cellContext.column = this.column;
    if (this.column.cellTemplate) {
      this.$slots.default = this.column.cellTemplate({ row: this.row });
    }
    this.checkValueUpdates();
  }

  @Watch('row') onRowChanged() {
    this.cellContext.row = this.row;
    this.checkValueUpdates();
  }

  @Watch('sorts') onSortsChanged() {
    this.calcSortDir = this.calcSortDir(this.sorts);
  }

  @Watch('treeStatus') onTreeStatusChanged(status: TreeStatus) {
    if (status !== 'collapsed' &&
        status !== 'expanded' &&
        status !== 'loading' &&
        status !== 'disabled') {
      this._treeStatus = 'collapsed';
    } else {
      this._treeStatus = status;
    }
    this.cellContext.treeStatus = this._treeStatus;
    this.checkValueUpdates();
  }

  // @Output() activate: EventEmitter<any> = new EventEmitter();
  // @Output() treeAction: EventEmitter<any> = new EventEmitter();

  // @ViewChild('cellTemplate', { read: ViewContainerRef }) cellTemplate: ViewContainerRef;

  created() {
    this.cellContext.group = this.group;
    this.cellContext.rowHeight = this.rowHeight;
    this.cellContext.isSelected = this.isSelected;
    this.cellContext.expanded = this.expanded;
    this.cellContext.rowIndex = this.rowIndex;
    this.cellContext.column = this.column;
    this.cellContext.row = this.row;
    this.cellContext.treeStatus = this._treeStatus;
  }

  get columnCssClasses(): any {
    const result = {
      'datatable-body-cell': true,
    };
    // let cls = 'datatable-body-cell';
    if (this.column.cellClass) {
      if (typeof this.column.cellClass === 'string') {
        // cls += ' ' + this.column.cellClass;
        result[this.column.cellClass] = true;
      } else if(typeof this.column.cellClass === 'function') {
        const res = this.column.cellClass({
          row: this.row,
          group: this.group,
          column: this.column,
          value: this.value ,
          rowHeight: this.rowHeight
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
    result['sort-active'] = !this.sortDir;
    result['active'] = !this.isFocused;
    result['sort-asc'] = this.sortDir === SortDirection.asc;
    result['sort-desc'] = this.sortDir === SortDirection.desc;
    // if (!this.sortDir) cls += ' sort-active';
    // if (this.isFocused) cls += ' active';
    // if (this.sortDir === SortDirection.asc) cls += ' sort-asc';
    // if (this.sortDir === SortDirection.desc) cls += ' sort-desc';
    // return cls;
    return result;
  }

  get styleObject() {
    return {
      width: this.column.width + 'px',
      minWidth: this.column.minWidth + 'px',
      maxWidth: this.column.maxWidth + 'px',
      height: this.height,
      'margin-left': this.calcLeftMargin(this.column, this.row) + 'px',
    };
  }

  get height(): string | number {
    const height = this.rowHeight;
    if (isNaN(height)) return height;
    return height + 'px';
  }

  destroyed(): void {
    // todo
    // if (this.cellTemplate) {
    //   this.cellTemplate.clear();
    // }
  }

  checkValueUpdates(): void {
    let value = '';

    if (!this.row || !this.column) {
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
      value = this.column.$$valueGetter(this.row, this.column.prop);
    }

    if(this.value !== value) {
      this.value = value;
      this.cellContext.value = value;
      this.sanitizedValue = value !== null && value !== undefined ? this.stripHtml(value) : value;
    }
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
  }

  onClick(event: MouseEvent): void {
    this.$emit('activate', {
      type: 'click',
      event,
      row: this.row,
      group: this.group,
      rowHeight: this.rowHeight,
      column: this.column,
      value: this.value,
      cellElement: this.$el
    });
  }

  onDblClick(event: MouseEvent): void {
    this.$emit('activate', {
      type: 'dblclick',
      event,
      row: this.row,
      group: this.group,
      rowHeight: this.rowHeight,
      column: this.column,
      value: this.value,
      cellElement: this.$el
    });
  }

  onKeyDown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    const isTargetCell = event.target === this.$el;

    const isAction =
      keyCode === Keys.return ||
      keyCode === Keys.down ||
      keyCode === Keys.up ||
      keyCode === Keys.left ||
      keyCode === Keys.right;

    if (isAction && isTargetCell) {
      event.preventDefault();
      event.stopPropagation();

      this.$emit('activate', {
        type: 'keydown',
        event,
        row: this.row,
        group: this.group,
        rowHeight: this.rowHeight,
        column: this.column,
        value: this.value,
        cellElement: this.$el
      });
    }
  }

  onCheckboxChange(event: any): void {
    this.$emit('activate', {
      type: 'checkbox',
      event,
      row: this.row,
      group: this.group,
      rowHeight: this.rowHeight,
      column: this.column,
      value: this.value,
      cellElement: this.$el,
      treeStatus: 'collapsed'
    });
  }

  calcSortDir(sorts: any[]): any {
    if (!sorts) return;

    const sort = sorts.find((s: any) => {
      return s.prop === this.column.prop;
    });

    if (sort) return sort.dir;
  }

  stripHtml(html: string): string {
    if(!html.replace) return html;
    return html.replace(/<\/?[^>]+(>|$)/g, '');
  }

  onTreeAction(row: any) {
    this.$emit('treeAction', row);
  }

  calcLeftMargin(column: any, row: any) {
    const levelIndent = column.treeLevelIndent != null ? column.treeLevelIndent : 50;
    return column.isTreeColumn ? row.level * levelIndent : 0;
  }

}
*/
