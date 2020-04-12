import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
// import { Keys } from '../../utils';
// import { SortDirection } from '../../types';
// import { TableColumn } from '../../types/table-column.type';
// import { ICellContext } from '../../types/cell-context.type';
import { Keys } from '../../utils';
import { ICellContext } from '../../types/cell-context.type';

export type TreeStatus = 'collapsed' | 'expanded' | 'loading' | 'disabled';

@Component
export default class DataTableBodyCellComponent extends Vue {
  @Prop() context: ICellContext;
  @Prop() cellColumnCssClasses: (context: ICellContext) => Record<string, string>;
  @Prop() cellStyleObject: (context: ICellContext) => Record<string, string | number>;
  @Prop() marginCellStyle: (context: ICellContext) => Record<string, string>;
  @Prop() tabIndex: string;
  @Prop() cellSlot: any;
  @Prop() renderTracking: boolean;

  created() {
    if (this.cellSlot) {
      this.$slots.default = this.cellSlot({
        row: this.context && this.context.row ? this.context.row : {}, 
        column: this.context.column,
        rowIndex: this.context.rowIndex, 
        group: this.context.group, 
        expanded: this.context.expanded,
        value: this.context.value,
        updateCell: this.$forceUpdate.bind(this),
      });
    }
    if (this.renderTracking) {
      this.$emit('cell-created', this.context.column);
    }
  }

  beforeUpdate() {
    if (this.cellSlot) {
      this.$slots.default = this.cellSlot({
        row: this.context && this.context.row ? this.context.row : {}, 
        column: this.context.column,
        rowIndex: this.context.rowIndex, 
        group: this.context.group, 
        expanded: this.context.expanded,
        value: this.context.value,
        updateCell: this.$forceUpdate.bind(this),
      });
    }
    if (this.renderTracking) {
      this.$emit('cell-updated', this.context.column);
    }
  }

  onFocus(): void {
    this.context.isFocused = true;
  }
  
  onBlur(): void {
    this.context.isFocused = false;
  }

  onClick(event): void {
    // props.context.isFocused = true;
    // props.context.abcd = true;
    this.$emit('activate', {
      type: 'click',
      event,
      row: this.context.row,
      group: this.context.group,
      rowHeight: this.context.rowHeight,
      column: this.context.column,
      value: this.context.value,
      cellElement: this.$el,
    });
  }
  
  onDblClick(event): void {
    this.$emit('activate', {
      type: 'dblclick',
      event,
      row: this.context.row,
      group: this.context.group,
      rowHeight: this.context.rowHeight,
      column: this.context.column,
      value: this.context.value,
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
      keyCode === Keys.right;
  
    if (isAction && isTargetCell) {
      event.preventDefault();
      event.stopPropagation();
  
      this.$emit('activate', {
        type: 'keydown',
        event,
        row: this.context.row,
        group: this.context.group,
        rowHeight: this.context.rowHeight,
        column: this.context.column,
        value: this.context.value,
        cellElement: this.$el,
      });
    }
  }
  
  onCheckboxChange(event): void {
    this.$emit('activate', {
      type: 'checkbox',
      event,
      row: this.context.row,
      group: this.context.group,
      rowHeight: this.context.rowHeight,
      column: this.context.column,
      value: this.context.value,
      cellElement: this.$el,
      treeStatus: 'collapsed'
    });
  }
  
  onTreeAction(event) {
    this.$emit('tree-action', { event, row: this.context.row });
  }

  onMouseEnter(event) {
    this.$emit('mouseenter', { event, row: this.context.row });
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
