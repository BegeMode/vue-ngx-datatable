import { Vue } from 'vue-property-decorator';
import { TableColumn } from '../../types/table-column.type';
import { IRowContext } from 'types/row-context.type';
export default class DataTableBodyRowComponent extends Vue {
    row: any;
    rowContext: IRowContext;
    group: any[];
    columnsByPin: any[];
    columnGroupWidths: any;
    groupStyles: any;
    rowClass: (row: any, rowIndex: number) => string | string;
    displayCheck: any;
    slots: any;
    renderTracking: boolean;
    counter: number;
    isFocused: boolean;
    created(): void;
    updated(): void;
    onCellRendered(column: TableColumn): void;
    onFocus(): void;
    onBlur(): void;
    onActivate(event: any, index: number): void;
    onKeyDown(event: KeyboardEvent): void;
    onMouseenter(event: any): void;
    onTreeAction(event: any): void;
    get styles(): object;
    get cssClasses(): string;
}
