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
      <slot name="header">
      <!-- Контент по умолчанию -->
        {{ name }}
      </slot>
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
  // @Prop() summaryTemplate: TemplateRef<any>;

  // @Prop()
  // @ContentChild(DataTableColumnCellDirective, { read: TemplateRef })
  // cellTemplate: TemplateRef<any>;

  // @Prop()
  // @ContentChild(DataTableColumnHeaderDirective, { read: TemplateRef })
  // headerTemplate: TemplateRef<any>;

  // @Prop()
  // @ContentChild(DataTableColumnCellTreeToggle, { read: TemplateRef })
  // treeToggleTemplate: TemplateRef<any>;
  private isFirstChange = true;
  
  // ngOnChanges() {
  //   if (this.isFirstChange) {
  //     this.isFirstChange = false;
  //   } else {
  //     this.columnChangesService.onInputChange();
  //   }
  // }

  mounted() {
    const column: TableColumn = {};
    column.name = this.name;
    column.prop = this.prop;
    column.frozenLeft = this.frozenLeft;
    column.frozenRight = this.frozenRight;
    column.flexGrow = this.flexGrow;
    column.resizeable = this.resizeable;
    column.comparator = this.comparator;
    // column.pipe = this.pipe;
    column.sortable = this.sortable;
    column.draggable = this.draggable;
    column.canAutoResize = this.canAutoResize;
    column.minWidth = this.minWidth;
    column.width = this.width;
    column.maxWidth = this.maxWidth;
    column.checkboxable = this.checkboxable;
    column.headerCheckboxable = this.headerCheckboxable;
    column.headerClass = this.headerClass;
    column.cellClass = this.cellClass;
    column.isTreeColumn = this.isTreeColumn;
    column.treeLevelIndent = this.treeLevelIndent;
    column.summaryFunc = this.summaryFunc;
    column.headerTemplate = this.$slots.header;
    column.cellTemplate = this.$scopedSlots.default;
    // todo: select any way to pass column to datatable // this.$emit('insert-column', column);
    (this.$parent as any).onColumnInsert(column);
    }
}
