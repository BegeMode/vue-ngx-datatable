import { Vue } from 'vue-property-decorator';
import { IRowContext } from 'types/row-context.type';
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
    slots: any;
    internalColumns: ISummaryColumn[];
    summaryRow: {};
    mySlotsFunc: any;
    myRowContext: IRowContext;
    onRowsChanged(): void;
    onColumnsChanged(): void;
    onChanges(): void;
    onActivate(event: any): void;
    private updateInternalColumns;
    private updateValues;
    private getSummaryFunction;
}
