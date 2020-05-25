import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Keys } from '../../utils/keys';
import DataTableBodyCellComponent from './body-cell.component.vue';
import { TableColumn } from '../../types/table-column.type';
import { IRowContext } from 'types/row-context.type';

@Component({
  components: {
    'datatable-body-cell': DataTableBodyCellComponent,
  }
})
export default class DataTableBodyRowComponent extends Vue {
  @Prop() row: any;
  @Prop() rowContext: IRowContext;
  @Prop() group: any[];
  @Prop() columnsByPin: any[];
  @Prop() columnGroupWidths: any;
  @Prop() groupStyles: any;
  @Prop() groupClass: string;
  @Prop() displayCheck: any; // (row: any, column?: TableColumn, value?: any) => boolean,
  @Prop() slots: any;
  @Prop() renderTracking: boolean;

  counter = 0; // it's need to update cells after row's changing
  isFocused: boolean = false;


  created() {
    if (this.renderTracking) {
      this.$emit('row-created', this.row);
    }
  }

  updated() {
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

  onCellRendered(column: TableColumn) {
    this.$emit('row-updated', this.row);
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }

  onActivate(event: any, index: number): void {
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
        rowElement: this.$el
      });
    }
  }

  onMouseenter(event: any): void {
    this.$emit('activate', {
        type: 'mouseenter',
        event,
        row: this.row,
        rowElement: this.$el
      });
  }

  onTreeAction(event) {
    this.$emit('tree-action', event);
  }

  get styles(): object {
    if (this.rowContext) {
      return {
        width: this.columnGroupWidths.total + 'px',
        height: this.rowContext.rowHeight + 'px',
      };
    }
    return {
      width: this.columnGroupWidths.total + 'px',
    };
  }

}
