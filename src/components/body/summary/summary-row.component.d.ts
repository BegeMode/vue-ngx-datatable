import { IRowContext } from 'types/row-context.type';
import { IColumnsByPinRecord, IColumnsWidth } from 'utils/column';
import { VNode } from 'vue';
import { Vue } from 'vue-property-decorator';
export interface ISummaryColumn {
    summaryFunc?: (cells: unknown[]) => string;
    summaryTemplate?: (arg?: Record<string, unknown>) => VNode[];
    cellTemplate?: string;
    prop: string;
    filter?: (...args: Array<unknown>) => string;
}
export default class DataTableSummaryRowComponent extends Vue {
    rows: Record<string, unknown>[];
    columns: ISummaryColumn[];
    rowHeight: number;
    offsetX: number;
    innerWidth: number;
    columnsByPin: IColumnsByPinRecord[];
    columnGroupWidths: IColumnsWidth;
    groupStyles: Record<string, string | number>;
    groupClass: string;
    slots: () => Record<string, (arg?: Record<string, unknown>) => VNode[]>;
    internalColumns: ISummaryColumn[];
    summaryRow: Record<string, unknown>;
    mySlotsFunc: () => Record<string, (arg?: Record<string, unknown>) => VNode[]>;
    myRowContext: IRowContext;
    onRowsChanged(): void;
    onColumnsChanged(): void;
    onChanges(): void;
    onActivate(event: Event): void;
    private updateInternalColumns;
    private updateValues;
    private getSummaryFunction;
}
