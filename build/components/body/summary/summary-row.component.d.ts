import { Vue } from 'vue-property-decorator';
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
    cellContext: any;
    cellColumnCssClasses: any;
    cellStyleObject: any;
    marginCellStyle: any;
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
