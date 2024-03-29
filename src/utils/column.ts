import { TableColumn } from 'types/table-column.type';

export interface IColumnsWidth {
  left: number;
  center: number;
  right: number;
  total: number;
}

export interface IColumnsByPinRecord {
  type: 'left' | 'center' | 'right';
  columns: TableColumn[];
}

/**
 * Returns the columns by pin.
 */
export interface IColumnsByPin {
  left: TableColumn[];
  center: TableColumn[];
  right: TableColumn[];
}

export function columnsByPin(cols: TableColumn[]): IColumnsByPin {
  const ret: { left: TableColumn[]; center: TableColumn[]; right: TableColumn[] } = {
    left: [],
    center: [],
    right: [],
  };

  if (cols) {
    for (const col of cols) {
      if (col.frozenLeft) {
        ret.left.push(col);
      } else if (col.frozenRight) {
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
export function columnGroupWidths(groups: IColumnsByPin, all: TableColumn[], tableWidth: number): IColumnsWidth {
  const result = {
    left: columnTotalWidth(groups.left),
    center: columnTotalWidth(groups.center),
    right: columnTotalWidth(groups.right),
    total: Math.floor(columnTotalWidth(all)),
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
export function columnTotalWidth(columns: TableColumn[]): number {
  let totalWidth = 0;

  if (columns) {
    for (const c of columns) {
      if (c.hidden || !c.visible) {
        continue;
      }
      // const has = Boolean(prop && c[prop]);
      // const width = c.hidden ? 0 : has ? c[prop] : c.width;
      let width = c.hidden || !c.visible ? 0 : c.width || c.$$oldWidth;
      if (typeof width === 'string') {
        width = parseFloat(width);
      }
      totalWidth = totalWidth + width;
    }
  }

  return totalWidth;
}

/**
 * Calculates the total width of all columns and their groups
 */
export function columnsTotalWidth(columns: TableColumn[] /* , prop?: any */): number {
  let totalWidth = 0;

  for (const column of columns) {
    // const has = prop && column[prop];
    // totalWidth = totalWidth + (has ? column[prop] : column.width);
    totalWidth = totalWidth + column.width;
  }

  return totalWidth;
}

export function columnsByPinArr(val: IColumnsByPin): Array<IColumnsByPinRecord> {
  const colsByPinArr: Array<{ type: 'left' | 'center' | 'right'; columns: TableColumn[] }> = [];
  const colsByPin = val; // columnsByPin(val);

  colsByPinArr.push({ type: 'left', columns: colsByPin['left'] });
  colsByPinArr.push({ type: 'center', columns: colsByPin['center'] });
  colsByPinArr.push({ type: 'right', columns: colsByPin['right'] });

  return colsByPinArr;
}
