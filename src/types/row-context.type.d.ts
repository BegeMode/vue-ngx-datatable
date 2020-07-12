import { TreeStatus } from '../components/body/body-cell.component';
export interface IRowContext {
    activateFn?: () => void;
    row: any;
    group?: any;
    rowHeight: number;
    isSelected: boolean;
    isChecked: boolean;
    rowIndex: number;
    treeStatus: TreeStatus;
    expanded: boolean;
    isFocused?: boolean;
}
