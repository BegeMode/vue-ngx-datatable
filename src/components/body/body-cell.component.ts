import { IRowContext } from 'types/row-context.type';
import { TableColumn } from 'types/table-column.type';
import { Keys } from 'utils/keys';
import { VNode } from 'vue';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

export type TreeStatus = 'collapsed' | 'expanded' | 'loading' | 'disabled';

@Component
export default class DataTableBodyCellComponent extends Vue {
  @Prop() column: TableColumn;
  @Prop() rowContext: IRowContext;
  @Prop() tabIndex: string;
  @Prop() cellSlot: (obj: Record<string, unknown>) => VNode[];
  @Prop() renderTracking: boolean;
  @Prop() displayCheck: (row: Record<string, unknown>, column?: TableColumn, value?: unknown) => boolean;

  sanitizedValue: string = null;
  value: unknown = null;
  // sortDir: SortDirection = null;
  isFocused = false;
  // activateFn = this.activate.emit.bind(this.activate); todo

  @Watch('rowContext.row', { deep: true, immediate: true }) onRowChanged(): void {
    this.checkValueUpdates();
  }

  created(): void {
    if (this.cellSlot) {
      this.$slots.default = this.cellSlot({
        row: this.rowContext?.row ?? {},
        column: this.column,
        rowIndex: this.rowContext.rowIndex,
        expanded: this.rowContext.expanded,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        group: this.rowContext.group,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        value: this.value,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        updateCell: this.$forceUpdate.bind(this),
      });
    }
    if (this.renderTracking) {
      this.$emit('cell-created', this.column);
    }
  }

  beforeUpdate(): void {
    if (this.cellSlot) {
      this.$slots.default = this.cellSlot({
        row: this.rowContext?.row ?? {},
        column: this.column,
        rowIndex: this.rowContext.rowIndex,
        expanded: this.rowContext.expanded,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        group: this.rowContext.group,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        value: this.value,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
      value = this.column.$$valueGetter(this.rowContext.row, this.column.prop) as string;
    }
    if (this.value !== value) {
      this.value = value;
      // eslint-disable-next-line no-undefined
      this.sanitizedValue = value !== null && value !== undefined ? this.stripHtml(value) : value;
    }
  }

  stripHtml(html: string): string {
    if (!html.replace) {
      return html;
    }
    return html.replace(/<\/?[^>]+(>|$)/g, '');
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
  }

  onClick(event: MouseEvent): void {
    // props.context.isFocused = true;
    // props.context.abcd = true;
    this.$emit('activate', {
      type: 'click',
      event,
      row: this.rowContext.row,
      rowHeight: this.rowContext.rowHeight,
      column: this.column,
      cellElement: this.$el,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      value: this.value,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      group: this.rowContext.group,
    });
  }

  onDblClick(event: MouseEvent): void {
    this.$emit('activate', {
      type: 'dblclick',
      event,
      row: this.rowContext.row,
      rowHeight: this.rowContext.rowHeight,
      column: this.column,
      cellElement: this.$el,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      value: this.value,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      group: this.rowContext.group,
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
        rowHeight: this.rowContext.rowHeight,
        column: this.column,
        cellElement: this.$el,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        value: this.value,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        group: this.rowContext.group,
      });
    }
  }

  onCheckboxChange(event: MouseEvent): void {
    this.$emit('activate', {
      type: 'checkbox',
      event,
      row: this.rowContext.row,
      rowHeight: this.rowContext.rowHeight,
      column: this.column,
      cellElement: this.$el,
      treeStatus: this.rowContext.treeStatus,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      value: this.value,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      group: this.rowContext.group,
    });
  }

  onTreeAction(event: MouseEvent): void {
    this.$emit('tree-action', { event, row: this.rowContext.row });
  }

  onMouseEnter(event: MouseEvent): void {
    this.$emit('mouseenter', { event, row: this.rowContext.row });
  }

  get cssClasses(): Record<string, boolean> {
    if (!this.rowContext) {
      return null;
    }
    const result: Record<string, boolean> = {};
    let func: (data: Record<string, unknown>) => string | Record<string, unknown>;
    if (this.column.cellClass) {
      let cssClass = this.column.cellClass;
      if (!Array.isArray(cssClass)) {
        cssClass = [cssClass];
      }
      (cssClass as Array<(data: Record<string, unknown>) => string | Record<string, unknown>>).forEach(value => {
        func = null;
        if (typeof value === 'string') {
          result[value] = true;
        } else if (Array.isArray(value)) {
          (value as Array<string>).forEach(val => {
            result[val] = true;
          });
        } else if (typeof value === 'function') {
          func = value;
        }
        if (func) {
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
      });
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
      width: `${this.column.width}px`,
      // eslint-disable-next-line no-undefined
      minWidth: this.column.minWidth ? `${this.column.minWidth}px` : undefined,
      // eslint-disable-next-line no-undefined
      maxWidth: this.column.maxWidth ? `${this.column.maxWidth}px` : undefined,
      height: this.rowContext.rowHeight === 'auto' ? this.rowContext.rowHeight : `${this.rowContext.rowHeight}px`, // this.cellHeight(this.rowContext.rowHeight),
    };
  }

  get marginCellStyle(): Record<string, string> {
    if (!this.rowContext) {
      return {};
    }
    return {
      'margin-left': `${this.calcLeftMargin(this.column, this.rowContext.row)}px`,
    };
  }

  get isCheckboxable(): boolean {
    return (
      this.column.checkboxable &&
      (!this.displayCheck || this.displayCheck(this.rowContext.row, this.column, this.value))
    );
  }

  cellHeight(rowHeight: number): string | number {
    const height = rowHeight;
    if (isNaN(height)) {
      return height;
    }
    return `${height}px`;
  }

  calcLeftMargin(column: TableColumn, row: Record<string, unknown>): number {
    const levelIndent = column.treeLevelIndent ? column.treeLevelIndent : 50;
    return column.isTreeColumn ? (row.level as number) * levelIndent : 0;
  }
}
