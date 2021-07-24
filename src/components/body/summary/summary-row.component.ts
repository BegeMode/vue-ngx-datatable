import { IRowContext } from 'types/row-context.type';
import { IColumnsByPinRecord, IColumnsWidth } from 'utils/column';
import { VNode } from 'vue';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import DataTableBodyRowComponent from '../body-row.component.vue';

export interface ISummaryColumn {
  summaryFunc?: (cells: any[]) => any;
  summaryTemplate?: (arg?: Record<string, unknown>) => VNode[];
  cellTemplate?: string;

  prop: string;
  // pipe?: PipeTransform;
  filter?: (...args) => string;
}

function defaultSumFunc(cells: any[]): number {
  const cellsWithValues = cells.filter(cell => Boolean(cell));

  if (!cellsWithValues.length) {
    return null;
  }
  if (cellsWithValues.some(cell => typeof cell !== 'number')) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/restrict-plus-operands
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
      @activate="onActivate"
    >
    </datatable-body-row>
  `,
})
export default class DataTableSummaryRowComponent extends Vue {
  @Prop() rows: Record<string, unknown>[];
  @Prop() columns: ISummaryColumn[];
  @Prop() rowHeight: number;
  @Prop() offsetX: number;
  @Prop() innerWidth: number;

  @Prop() columnsByPin: IColumnsByPinRecord[];
  @Prop() columnGroupWidths: IColumnsWidth;
  @Prop() groupStyles: Record<string, string | number>;
  @Prop() groupClass: string;
  @Prop() slots: () => Record<string, (arg?: Record<string, unknown>) => VNode[]>;

  internalColumns: ISummaryColumn[] = [];
  summaryRow: Record<string, unknown> = {};
  mySlotsFunc: () => Record<string, (arg?: Record<string, unknown>) => VNode[]> = null;
  myRowContext: IRowContext = null;

  @Watch('rows', { immediate: true }) onRowsChanged(): void {
    this.onChanges();
  }

  @Watch('columns') onColumnsChanged(): void {
    this.onChanges();
  }

  onChanges(): void {
    if (!this.columns || !this.rows) {
      return;
    }
    this.updateInternalColumns();
    this.updateValues();
  }

  onActivate(event: Event): void {
    this.$emit('summary-activate', event, this.summaryRow);
  }

  private updateInternalColumns() {
    this.mySlotsFunc = this.slots;
    const summarySlots: Record<string, (arg?: Record<string, unknown>) => VNode[]> = {};
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.summaryRow[col.prop] = col.filter
          ? col.filter(sumFunc(cellsFromSingleColumn))
          : sumFunc(cellsFromSingleColumn);
      });
    this.myRowContext = {
      row: this.summaryRow,
      rowIndex: -1,
      expanded: false,
      isChecked: false,
      isSelected: false,
      rowHeight: this.rowHeight,
      treeStatus: null,
    };
  }

  private getSummaryFunction(column: ISummaryColumn): (a: any[]) => any {
    if (!column.summaryFunc) {
      return defaultSumFunc;
    }
    if (column.summaryFunc === null) {
      return noopSumFunc;
    }
    return column.summaryFunc;
  }
}
