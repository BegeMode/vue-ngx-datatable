import { Vue } from 'vue-property-decorator';
import { SelectionType, TableColumn } from '../../types';
import { CheckMode } from '../../types/check.type';
export interface Model {
    type: string;
    event: MouseEvent | KeyboardEvent;
    row: any;
    rowElement: any;
    cellElement: any;
    cellIndex: number;
    column?: TableColumn;
}
export default class DataTableSelectionComponent extends Vue {
    rows: any[];
    selected: any[];
    checked: any[];
    selectEnabled: boolean;
    selectionType: SelectionType;
    checkMode: CheckMode;
    rowIdentity: any;
    selectCheck: any;
    prevIndex: number;
    selectRow(event: KeyboardEvent | MouseEvent, index: number, row: any): void;
    checkRow(event: KeyboardEvent | MouseEvent, index: number, row: any): void;
    onActivate(model: Model, index: number): void;
    onKeyboardFocus(model: Model): void;
    focusRow(rowElement: any, keyCode: number): void;
    getPrevNextRow(rowElement: any, keyCode: number): any;
    focusCell(cellElement: any, rowElement: any, keyCode: number, cellIndex: number): void;
    getRowSelected(row: any): boolean;
    getRowChecked(row: any): boolean;
    getRowSelectedIdx(row: any, selected: any[]): number;
}
