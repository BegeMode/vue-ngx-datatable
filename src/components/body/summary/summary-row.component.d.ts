import { Vue } from 'vue-property-decorator';
import { ICellContext } from 'types/cell-context.type';
export interface ISummaryColumn {
    summaryFunc?: (cells: any[]) => any;
    summaryTemplate?: string;
    cellTemplate?: string;
    prop: string;
    filter?: (...args: any[]) => string;
}
export default class DataTableSummaryRowComponent extends Vue {
    rows: any[];
    columns: ISummaryColumn[];
    rowHeight: number;
    offsetX: number;
    innerWidth: number;
    columnsByPin: any[];
    columnGroupWidths: any;
    groupStyles: any;
    groupClass: string;
    rowStyles: any;
    cellContext: ICellContext;
    cellColumnCssClasses: (context: ICellContext) => Record<string, string>;
    cellStyleObject: (context: ICellContext) => Record<string, string | number>;
    marginCellStyle: (context: ICellContext) => Record<string, string>;
    slots: any;
    internalColumns: ISummaryColumn[];
    summaryRow: {};
    mySlotsFunc: any;
    onRowsChanged(): void;
    onColumnsChanged(): void;
    onChanges(): void;
    onActivate(event: any): void;
    private updateInternalColumns;
    private updateValues;
    private getSummaryFunction;
}
