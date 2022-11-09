import { IRowContext } from 'types/row-context.type';
import { IColumnsByPinRecord, IColumnsWidth } from 'utils/column';
import { VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TableColumn } from '../../types/table-column.type';
import { Keys } from '../../utils/keys';
import DataTableBodyCellComponent from './body-cell.component.vue';

@Component({
  components: {
    'datatable-body-cell': DataTableBodyCellComponent,
  },
})
export default class DataTableBodyRowComponent extends Vue {
  @Prop() row: Record<string, unknown>;
  @Prop() rowContext: IRowContext;
  @Prop() columnsByPin: IColumnsByPinRecord[];
  @Prop() columnGroupWidths: IColumnsWidth;
  @Prop() groupStyles: Record<string, string | number>;
  @Prop() rowClass: (row: Record<string, unknown>, rowIndex: number) => string | string;
  @Prop() displayCheck: (row: Record<string, unknown>, column?: TableColumn, value?: unknown) => boolean;
  @Prop() slots: () => Record<string, (arg?: Record<string, unknown>) => VNode[]>;
  @Prop() renderTracking: boolean;

  counter = 0; // it's need to update cells after row's changing
  isFocused = false;

  created(): void {
    if (this.renderTracking) {
      this.$emit('row-created', this.row);
    }
  }

  updated(): void {
    if (this.renderTracking) {
      this.$emit('row-updated', this.row);
    }
    if (this.isFocused) {
      (this.$el as HTMLElement).focus();
    }
  }

  // @Watch('row', { deep: true }) onRowChanged(newVal, oldVal) {
  //   if (newVal === oldVal) {
  //     // there was only row's properties changed - it's need to update cells
  //     this.counter++;
  //   }
  // }

  onCellRendered(column: TableColumn): void {
    this.$emit('row-updated', this.row);
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
  }

  onActivate(event: { cellIndex: number; rowElement: Element }, index: number): void {
    event.cellIndex = index;
    event.rowElement = this.$el;
    this.$emit('activate', event);
  }

  onKeyDown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    const isTargetRow = event.target === this.$el;

    const isAction =
      keyCode === Keys.return ||
      keyCode === Keys.down ||
      keyCode === Keys.up ||
      keyCode === Keys.pageUp ||
      keyCode === Keys.pageDown;

    if (isAction && isTargetRow) {
      event.preventDefault();
      event.stopPropagation();

      this.$emit('activate', {
        type: 'keydown',
        event,
        row: this.row,
        rowIndex: this.rowContext.rowIndex,
        rowElement: this.$el,
      });
    }
  }

  onMouseenter(event: MouseEvent): void {
    this.$emit('activate', {
      type: 'mouseenter',
      event,
      row: this.row,
      rowElement: this.$el,
    });
  }

  onTreeAction(event: Event): void {
    this.$emit('tree-action', event);
  }

  get styles(): Record<string, string> {
    if (this.rowContext) {
      return {
        width: `${this.columnGroupWidths?.total ?? 0}px`,
        height: this.rowContext.rowHeight === 'auto' ? this.rowContext.rowHeight : `${this.rowContext.rowHeight}px`,
      };
    }
    return {
      width: `${this.columnGroupWidths?.total ?? 0}px`,
    };
  }

  get cssClasses(): string {
    let cls = '';
    if (this.rowContext?.isSelected) {
      cls += ' active';
    }
    if (this.rowContext?.rowIndex % 2 !== 0) {
      cls += ' datatable-row-odd';
    } else {
      cls += ' datatable-row-even';
    }
    if (typeof this.rowClass === 'function') {
      const res = this.rowClass(this.rowContext.row, this.rowContext.rowIndex);
      if (typeof res === 'string') {
        cls += ` ${res}`;
      } else if (typeof res === 'object') {
        const keys = Object.keys(res);
        for (const k of keys) {
          if (res[k] === true) {
            cls += ` ${k}`;
          }
        }
      }
    }
    return cls;
  }
}
