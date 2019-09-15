import { TableColumn } from '../types';

/**
 * Returns the columns by pin.
 */
export interface IColumnsByPin {
  left: TableColumn[];
  center: TableColumn[];
  right: TableColumn[];
}

export function columnsByPin(cols: TableColumn[]): IColumnsByPin {
  const ret: {left: TableColumn[], center: TableColumn[], right: TableColumn[]} = {
    left: [],
    center: [],
    right: []
  };

  if(cols) {
    for(const col of cols) {
      if(col.frozenLeft) {
        ret.left.push(col);
      } else if(col.frozenRight) {
        ret.right.push(col);
      } else {
        ret.center.push(col);
      }
    }
  }

  return ret;
}

/**
 * Returns the widths of all group sets of a column
 */
export function columnGroupWidths(groups: IColumnsByPin, all: TableColumn[], tableWidth: number) {
  const result =  {
    left: columnTotalWidth(groups.left),
    center: columnTotalWidth(groups.center),
    right: columnTotalWidth(groups.right),
    total: Math.floor(columnTotalWidth(all))
  };
  if (tableWidth > result.total) {
    result.center += tableWidth - result.total;
    result.total = tableWidth;
  }
  return result;
}

/**
 * Calculates the total width of all columns and their groups
 */
export function columnTotalWidth(columns: TableColumn[], prop?: string) {
  let totalWidth = 0;

  if(columns) {
    for(const c of columns) {
      const has = prop && c[prop];
      const width = (c as any).hidden ? 0 : has ? c[prop] : c.width;
      totalWidth = totalWidth + parseFloat(width);
    }
  }

  return totalWidth;
}

/**
 * Calculates the total width of all columns and their groups
 */
export function columnsTotalWidth(columns: TableColumn[], prop?: any) {
  let totalWidth = 0;

  for(const column of columns) {
    const has = prop && column[prop];
    totalWidth = totalWidth + (has ? column[prop] : column.width);
  }

  return totalWidth;
}

export function columnsByPinArr(val: TableColumn[]) {
  const colsByPinArr = [];
  const colsByPin = columnsByPin(val);

  colsByPinArr.push({ type: 'left', columns: colsByPin['left'] });
  colsByPinArr.push({ type: 'center', columns: colsByPin['center'] });
  colsByPinArr.push({ type: 'right', columns: colsByPin['right'] });

  return colsByPinArr;
}
