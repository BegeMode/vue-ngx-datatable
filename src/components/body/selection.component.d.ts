import ScrollerComponent from 'components/body/scroller.component';
import { CheckMode } from 'types/check.type';
import { SelectionType } from 'types/selection.type';
import { TableColumn } from 'types/table-column.type';
import { Vue } from 'vue-property-decorator';
export interface Model {
    type: string;
    event: MouseEvent | KeyboardEvent;
    row: Record<string, unknown>;
    rowIndex: number;
    rowElement: Element;
    cellElement: Element;
    cellIndex: number;
    column?: TableColumn;
}
export default class DataTableSelectionComponent extends Vue {
    rows: Record<string, unknown>[];
    selected: Record<string, unknown>[];
    checked: Record<string, unknown>[];
    selectEnabled: boolean;
    selectionType: SelectionType;
    checkMode: CheckMode;
    rowIdentity: (row: Record<string, unknown>) => string | number;
    selectCheck: () => void;
    scroller: ScrollerComponent;
    pageSize: number;
    bodyHeight: number;
    prevIndex: number;
    selectRow(event: KeyboardEvent | MouseEvent, index: number, row: Record<string, unknown>): void;
    checkRow(event: KeyboardEvent | MouseEvent, index: number, row: Record<string, unknown>): void;
    onActivate(model: Model, index: number): void;
    onKeyboardFocus(model: Model): void;
    focusRow(model: Model, keyCode: number): void;
    focusRow1(keyCode: number): void;
    getPrevNextRowElement(rowElement: Element, keyCode: number): Element;
    getPrevNextRow(rowElement: Element, keyCode: number): Element;
    getPrevNextRow1(rowElement: Element, keyCode: number): Element;
    focusCell(cellElement: Element, rowElement: Element, keyCode: number, cellIndex: number): void;
    getRowSelected(row: Record<string, unknown>): boolean;
    getRowChecked(row: Record<string, unknown>): boolean;
    getRowSelectedIdx(row: Record<string, unknown>, selected: Record<string, unknown>[]): number;
}
