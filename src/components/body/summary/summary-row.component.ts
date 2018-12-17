import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

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
  template: `
  <datatable-body-row
    v-if="summaryRow && internalColumns"
    tabindex="-1"
    :innerWidth="innerWidth"
    :offsetX="offsetX"
    :columns="internalColumns"
    :rowHeight="rowHeight"
    :row="summaryRow"
    :rowIndex="-1">
  </datatable-body-row>
  `,
})
export default class DataTableSummaryRowComponent extends Vue {
  @Prop() rows: any[];
  @Prop() columns: ISummaryColumn[];

  @Prop() rowHeight: number;
  @Prop() offsetX: number;
  @Prop() innerWidth: number;

  internalColumns: ISummaryColumn[] = [];
  summaryRow = {};

  @Watch('rows', { immediate: true }) onRowsChanged() {
    this.onChanges();  
  }

  @Watch('columns') onColumnsChanged() {
    this.onChanges();  
  }

  onChanges() {
    if (!this.columns || !this.rows) { return; }
    this.updateInternalColumns();
    this.updateValues();
  }

  private updateInternalColumns() {
    // this.internalColumns = this.columns.map(col => ({
    //   ...col,
    //   cellTemplate: col.summaryTemplate
    // }));
    this.internalColumns = this.columns.map(col => {
      col.cellTemplate = col.summaryTemplate;
      return col;
    });
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
