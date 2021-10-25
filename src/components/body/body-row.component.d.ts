import { IRowContext } from 'types/row-context.type';
import { IColumnsByPinRecord, IColumnsWidth } from 'utils/column';
import { VNode } from 'vue';
import { Vue } from 'vue-property-decorator';
import { TableColumn } from '../../types/table-column.type';
export default class DataTableBodyRowComponent extends Vue {
    row: Record<string, unknown>;
    rowContext: IRowContext;
    columnsByPin: IColumnsByPinRecord[];
    columnGroupWidths: IColumnsWidth;
    groupStyles: Record<string, string | number>;
    rowClass: (row: Record<string, unknown>, rowIndex: number) => string | string;
    displayCheck: (row: Record<string, unknown>, column?: TableColumn, value?: unknown) => boolean;
    slots: () => Record<string, (arg?: Record<string, unknown>) => VNode[]>;
    renderTracking: boolean;
    counter: number;
    isFocused: boolean;
    created(): void;
    updated(): void;
    onCellRendered(column: TableColumn): void;
    onFocus(): void;
    onBlur(): void;
    onActivate(event: {
        cellIndex: number;
        rowElement: Element;
    }, index: number): void;
    onKeyDown(event: KeyboardEvent): void;
    onMouseenter(event: MouseEvent): void;
    onTreeAction(event: Event): void;
    get styles(): Record<string, string>;
    get cssClasses(): string;
}
