import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Keys } from '../../utils/keys';

@Component({
  // components: {
  //   'datatable-body-cell': DataTableBodyCellComponent,
  // }
})
export default class DataTableBodyRowComponent1 extends Vue {
  @Prop() row: any;
  @Prop() group: any[];
  @Prop() columnsByPin: any[];
  @Prop() columnGroupWidths: any;
  @Prop() isSelected: boolean;
  @Prop() rowStyles: any;
  @Prop() groupStyles: any;
  @Prop() groupClass: string;
  @Prop() displayCheck: any; // (row: any, column?: TableColumn, value?: any) => boolean,
  @Prop() treeStatus: ({ type: string, default: 'collapsed' });
  @Prop() cellContext: any;
  @Prop() cellColumnCssClasses: any;
  @Prop() cellStyleObject: any;
  @Prop() marginCellStyle: any;
  @Prop() slots: any;

  cellSlots = {};

  created() {
    if (IS_DEV) {
      console.log('DataTableBodyRowComponent1 is created');
    }
    if (this.slots) {
      this.cellSlots = this.slots();
    }
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

  onTreeAction() {
    this.$emit('treeAction');
  }

}
