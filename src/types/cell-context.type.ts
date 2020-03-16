import { TableColumn } from './table-column.type';
import { TreeStatus } from '../components/body/body-cell.component';
import { SortDirection } from './sort-direction.type';

export interface ICellContext {
  onCheckboxChangeFn: () => void;
  activateFn: () => void;
  row: any;
  group: any;
  value: any;
  column: TableColumn;
  rowHeight: number;
  isSelected: boolean;
  isChecked: boolean;
  rowIndex: number;
  treeStatus: TreeStatus;
  onTreeAction: () => void;
  sanitizedValue: any;
  isFocused: boolean;
  expanded: boolean;
  displayCheck?: (row: any, column?: TableColumn, value?: any) => boolean;
  sortDir?: SortDirection;
  sorts?: any[];
}
