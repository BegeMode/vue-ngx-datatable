import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DataTableBodyRowComponent from '../body-row.component.vue';
import { IRowContext } from 'types/row-context.type';

export interface ISummaryColumn {
  summaryFunc?: (cells: any[]) => any;
  summaryTemplate?: string; // TemplateRef<any>;
  cellTemplate?: string;

  prop: string;
  // pipe?: PipeTransform;
  filter?: (...args) => string;
}

function defaultSumFunc(cells: any[]): any {
  const cellsWithValues = cells.filter(cell => !!cell);

  if (!cellsWithValues.length) {
    return null;
  }
  if (cellsWithValues.some(cell => typeof cell !== 'number')) {
    return null;
  }

  return cellsWithValues.reduce((res, cell) => res + cell);
}

function noopSumFunc(cells: any[]): void {
  return null;
}

@Component({
  components: {
    'datatable-body-row': DataTableBodyRowComponent,
  },
  template: `
  <datatable-body-row
    v-if="summaryRow && internalColumns"
    tabindex="-1"
    :columnsByPin="columnsByPin"
    :columnGroupWidths="columnGroupWidths"
    :groupStyles="groupStyles"
    :rowContext="myRowContext"
    :row="summaryRow"
    :slots="mySlotsFunc"
    @activate="onActivate">
  </datatable-body-row>
  `,
})
export default class DataTableSummaryRowComponent extends Vue {
  @Prop() rows: any[];
  @Prop() columns: ISummaryColumn[];
  @Prop() rowHeight: number;
  @Prop() offsetX: number;
  @Prop() innerWidth: number;

  @Prop() columnsByPin: any[];
  @Prop() columnGroupWidths: any;
  @Prop() groupStyles: any;
  @Prop() groupClass: string;
  @Prop() slots: any;

  internalColumns: ISummaryColumn[] = [];
  summaryRow = {};
  mySlotsFunc: any = null;
  myRowContext: IRowContext= null;

  @Watch('rows', { immediate: true }) onRowsChanged() {
    this.onChanges();  
  }

  @Watch('columns') onColumnsChanged() {
    this.onChanges();  
  }

  onChanges() {
    if (!this.columns || !this.rows) {
      return;
    }
    this.updateInternalColumns();
    this.updateValues();
  }

  onActivate(event) {
    this.$emit('summary-activate', event, this.summaryRow);
  }

  private updateInternalColumns() {
    this.mySlotsFunc = this.slots;
    const summarySlots = {};
    this.internalColumns = this.columns.map(col => {
      if (col.summaryTemplate) {
        summarySlots[col.prop] = col.summaryTemplate;
      }
      return col;
    });
    if (Object.keys(summarySlots).length) {
      const slots = Object.assign({}, this.slots());
      Object.keys(summarySlots).forEach(column => {
        slots[column] = summarySlots[column];
      });
      this.mySlotsFunc = () => slots;
    }
  }

  private updateValues() {
    this.summaryRow = {};

    this.columns
      .filter(col => !col.summaryTemplate)
      .forEach(col => {
      const cellsFromSingleColumn = this.rows.map(row => row[col.prop]);
      const sumFunc = this.getSummaryFunction(col);

      // this.summaryRow[col.prop] = col.pipe ?
      //   col.pipe.transform(sumFunc(cellsFromSingleColumn)) :
      //   sumFunc(cellsFromSingleColumn);
      this.summaryRow[col.prop] = col.filter ?
        col.filter(sumFunc(cellsFromSingleColumn)) :
        sumFunc(cellsFromSingleColumn);
      });
    this.myRowContext = { row: this.summaryRow, rowIndex: -1, expanded: false, isChecked: false, isSelected: false, rowHeight: this.rowHeight, treeStatus: null };
  }

  private getSummaryFunction(column: ISummaryColumn): (a: any[]) => any {
    if (column.summaryFunc === undefined) {
      return defaultSumFunc;
    } else if (column.summaryFunc === null) {
      return noopSumFunc;
    } else {
      return column.summaryFunc;
    }
  }
}
