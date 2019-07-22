import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
// import { DataTableColumnHeaderDirective } from './column-header.directive';
// import { DataTableColumnCellDirective } from './column-cell.directive';
// import {
//   DataTableColumnCellTreeToggle
// } from './tree.directive';
import { TableColumnProp, TableColumn } from '../../types';

@Component({
  template: `
    <div>
      <slot name="header" v-bind="{column: column}">
      <!-- default content -->
        {{ name }}
      </slot>
      <!-- default slot for cell -->
      <slot>
      </slot>
    </div>`
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
  @Prop() canAutoResize: boolean;
  @Prop() minWidth: number;
  @Prop() width: number;
  @Prop() maxWidth: number;
  @Prop() checkboxable: boolean;
  @Prop() headerCheckboxable: boolean;
  @Prop() headerClass: string | ((data: any) => string|any);
  @Prop() cellClass: string | ((data: any) => string|any);
  @Prop() isTreeColumn: boolean;
  @Prop() treeLevelIndent: number;
  @Prop() summaryFunc: (cells: any[]) => any;
  @Prop({ default: true }) visible: boolean;

  // @Prop()
  // @ContentChild(DataTableColumnCellDirective, { read: TemplateRef })
  // cellTemplate: TemplateRef<any>;

  // @Prop()
  // @ContentChild(DataTableColumnHeaderDirective, { read: TemplateRef })
  // headerTemplate: TemplateRef<any>;

  // @Prop()
  // @ContentChild(DataTableColumnCellTreeToggle, { read: TemplateRef })
  // treeToggleTemplate: TemplateRef<any>;
  // private isFirstChange = true;
  
  // ngOnChanges() {
  //   if (this.isFirstChange) {
  //     this.isFirstChange = false;
  //   } else {
  //     this.columnChangesService.onInputChange();
  //   }
  // }

  column: TableColumn = {};

  mounted() {
    this.$set(this.column, 'name', this.name);
    this.$set(this.column, 'prop', this.prop);
    this.$set(this.column, 'frozenLeft', this.frozenLeft);
    this.$set(this.column, 'frozenRight', this.frozenRight);
    this.$set(this.column, 'flexGrow', this.flexGrow);
    this.$set(this.column, 'resizeable', this.resizeable);
    this.$set(this.column, 'comparator', this.comparator);
    // column.pipe = this.pipe;
    this.$set(this.column, 'sortable', this.sortable);
    this.$set(this.column, 'draggable', this.draggable);
    this.$set(this.column, 'canAutoResize', this.canAutoResize);
    this.$set(this.column, 'minWidth', this.minWidth);
    this.$set(this.column, 'width', this.width);
    this.$set(this.column, 'maxWidth', this.maxWidth);
    this.$set(this.column, 'checkboxable', this.checkboxable);
    this.$set(this.column, 'headerCheckboxable', this.headerCheckboxable);
    this.$set(this.column, 'headerClass', this.headerClass);
    this.$set(this.column, 'cellClass', this.cellClass);
    this.$set(this.column, 'isTreeColumn', this.isTreeColumn);
    this.$set(this.column, 'treeLevelIndent', this.treeLevelIndent);
    this.$set(this.column, 'summaryFunc', this.summaryFunc);
    this.$set(this.column, 'headerTemplate', this.$scopedSlots.header);
    this.$set(this.column, 'cellTemplate', this.$scopedSlots.default);
    this.$set(this.column, 'summaryTemplate', this.$scopedSlots.summary);
    this.$set(this.column, 'visible', this.visible);

    // todo: select any way to pass column to datatable // this.$emit('insert-column', column);
    (this.$parent as any).onColumnInsert(this.column);
  }
  
  destroyed() {
    (this.$parent as any).onColumnRemoved(this.column);
  }

  @Watch('visible') onVisibleChanged(newVal) {
    this.column.visible = newVal;
    (this.$parent as any).onColumnChangeVisible(this.column);
  }

}
