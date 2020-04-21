import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Keys } from '../../utils/keys';
import DataTableBodyCellComponent from './body-cell.component.vue';
import { TableColumn } from '../../types/table-column.type';
import { ICellContext } from 'types/cell-context.type';

@Component({
  components: {
    'datatable-body-cell': DataTableBodyCellComponent,
  }
})
export default class DataTableBodyRowComponent extends Vue {
  @Prop() row: any;
  @Prop() group: any[];
  @Prop() columnsByPin: any[];
  @Prop() columnGroupWidths: any;
  @Prop() isSelected: boolean;
  @Prop() isChecked: boolean;
  @Prop() rowStyles: any;
  @Prop() groupStyles: any;
  @Prop() groupClass: string;
  @Prop() displayCheck: any; // (row: any, column?: TableColumn, value?: any) => boolean,
  @Prop() treeStatus: ({ type: string, default: 'collapsed' });
  @Prop() cellContext: ICellContext;
  @Prop() cellColumnCssClasses: (context: ICellContext) => Record<string, string>;
  @Prop() cellStyleObject: (context: ICellContext) => Record<string, string | number>;
  @Prop() marginCellStyle: (context: ICellContext) => Record<string, string>;
  @Prop() slots: any;
  @Prop() renderTracking: boolean;

  counter = 0; // it's need to update cells after row's changing

  created() {
    if (this.renderTracking) {
      this.$emit('row-created', this.row);
    }
  }

  updated() {
    if (this.renderTracking) {
      this.$emit('row-updated', this.row);
    }
  }

  @Watch('row', { deep: true }) onRowChanged(newVal, oldVal) {
    if (newVal === oldVal) {
      // there was only row's properties changed - it's need to update cells
      this.counter++;
    }
  }

  onCellRendered(column: TableColumn) {
    this.$emit('row-updated', this.row);
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
      keyCode === Keys.left ||
      keyCode === Keys.right;

    if (isAction && isTargetRow) {
      event.preventDefault();
      event.stopPropagation();

      this.$emit('activate', {
        type: 'keydown',
        event,
        row: this.row,
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

}
