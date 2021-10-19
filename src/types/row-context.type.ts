import { IGroupedRows } from 'types/grouped-rows';
import { TreeStatus } from '../components/body/body-cell.component';

export interface IRowContext {
  activateFn?: () => void;
  row: Record<string, unknown>;
  group?: IGroupedRows | Record<string, unknown>;
  rowHeight: number;
  isSelected: boolean;
  isChecked: boolean;
  rowIndex: number;
  treeStatus: TreeStatus;
  expanded: boolean;
  isFocused?: boolean;
}
