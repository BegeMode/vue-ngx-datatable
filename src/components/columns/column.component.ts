import DatatableComponent from 'components/datatable.component';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { TableColumn, TableColumnProp } from '../../types';

@Component({
  template: `
    <div>
      <slot name="header" v-bind="{column: column}">
        <!-- default content -->
        {{ name }}
      </slot>
      <!-- default slot for cell -->
      <slot> </slot>
    </div>
  `,
})
export default class DataTableColumnComponent extends Vue {
  @Prop() name: string;
  @Prop() prop: TableColumnProp;
  @Prop() frozenLeft: any;
  @Prop() frozenRight: any;
  @Prop() flexGrow: number;
  @Prop() resizeable: boolean;
  @Prop() comparator: any;
  @Prop() pipe: any;
  @Prop() sortable: boolean;
  @Prop() draggable: boolean;
  @Prop({ default: true }) canAutoResize: boolean;
  @Prop() minWidth: number;
  @Prop() width: number;
  @Prop() maxWidth: number;
  @Prop() checkboxable: boolean;
  @Prop() headerCheckboxable: boolean;
  @Prop() headerClass: string | ((data: { column: TableColumn }) => string | Record<string, unknown>);
  @Prop() cellClass:
    | string
    | Array<string>
    | ((data: Record<string, unknown>) => string | Record<string, unknown>)
    | Array<string | Array<string> | ((data: Record<string, unknown>) => string | Record<string, unknown>)>;
  @Prop() isTreeColumn: boolean;
  @Prop() treeLevelIndent: number;
  @Prop() summaryFunc: (cells: any[]) => any;
  @Prop({ default: true }) visible: boolean;

  column: TableColumn = {};

  @Watch('visible') onVisibleChanged(newVal: boolean): void {
    this.column.visible = newVal;
    (this.$parent as DatatableComponent).onColumnChangeVisible(this.column);
  }

  // @Watch('column.width') onWidthChanged(): void {
  //   this.$emit('update-width', this.column.width);
  // }

  mounted(): void {
    this.$set(this.column, 'name', this.name);
    this.$set(this.column, 'prop', this.prop);
    this.$set(this.column, 'frozenLeft', this.frozenLeft);
    this.$set(this.column, 'frozenRight', this.frozenRight);
    this.$set(this.column, 'flexGrow', this.flexGrow);
    this.$set(this.column, 'resizeable', this.resizeable);
    this.$set(this.column, 'comparator', this.comparator);
    this.$set(this.column, 'sortable', this.sortable);
    this.$set(this.column, 'draggable', this.draggable);
    this.$set(this.column, 'canAutoResize', this.canAutoResize);
    this.$set(this.column, 'minWidth', this.minWidth);
    this.$set(this.column, 'width', this.width);
    this.$set(this.column, 'maxWidth', this.maxWidth);
    this.$set(this.column, 'checkboxable', this.checkboxable);
    this.$set(this.column, 'headerCheckboxable', this.headerCheckboxable);
    let headerClasses = [];
    if (Array.isArray(this.headerClass)) {
      headerClasses = [...this.headerClass];
    } else if (typeof this.headerClass === 'string') {
      headerClasses.push(this.headerClass);
    } else if (typeof this.headerClass === 'function') {
      const res = this.headerClass({
        column: this.column,
      });
      if (typeof res === 'string') {
        headerClasses.push(res);
      } else if (typeof res === 'object') {
        const keys = Object.keys(res);
        for (const key of keys) {
          if (res[key] === true) {
            headerClasses.push(key);
          }
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.$el.classList.length; i++) {
      const value = this.$el.classList[0];
      headerClasses.push(value);
    }
    this.$set(this.column, 'headerClass', headerClasses);

    let cellClasses = [];
    if (Array.isArray(this.cellClass)) {
      cellClasses = [...this.cellClass];
    } else if (typeof this.cellClass === 'string') {
      cellClasses.push(this.cellClass);
    } else if (typeof this.cellClass === 'function') {
      cellClasses.push(this.cellClass);
    }
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.$el.classList.length; i++) {
      const value = this.$el.classList[0];
      cellClasses.push(value);
    }
    this.$set(this.column, 'cellClass', cellClasses);

    this.$set(this.column, 'isTreeColumn', this.isTreeColumn);
    this.$set(this.column, 'treeLevelIndent', this.treeLevelIndent);
    this.$set(this.column, 'summaryFunc', this.summaryFunc);
    this.$set(this.column, 'headerTemplate', this.$scopedSlots.header);
    this.$set(this.column, 'cellTemplate', this.$scopedSlots.default);
    this.$set(this.column, 'summaryTemplate', this.$scopedSlots.summary);
    this.$set(this.column, 'visible', this.visible);

    // todo: select any way to pass column to datatable // this.$emit('insert-column', column);
    (this.$parent as DatatableComponent).onColumnInsert(this.column);
  }
}
