import { TableColumn } from 'types/table-column.type';
import { columnsByPin, columnsTotalWidth, IColumnsByPin } from './column';

/**
 * Calculates the Total Flex Grow
 */
function getTotalFlexGrow(columns: TableColumn[]) {
  let totalFlexGrow = 0;

  for (const c of columns) {
    totalFlexGrow += c.flexGrow || 0;
  }

  return totalFlexGrow;
}

/**
 * Adjusts the column widths.
 * Inspired by: https://github.com/facebook/fixed-data-table/blob/master/src/FixedDataTableWidthHelper.js
 */
export function adjustColumnWidths(allColumns: TableColumn[] = [], expectedWidth: number): void {
  // if (allColumns && allColumns.length) {
  //   allColumns = allColumns.filter(c => c.visible && !c.hidden);
  // }
  const hiddenColumns: TableColumn[] = [];
  allColumns.forEach(col => {
    col.hidden = false;
    const width = calcRealWidth(col);
    if (width !== null && width < 10) {
      hiddenColumns.push(col);
      col.hidden = true;
      if (!col.$$oldWidth) {
        col.$$oldWidth = col.width;
      }
      col.width = 0;
    }
  });
  allColumns = allColumns.filter(c => c.visible && !c.hidden);

  const columnsWidth = columnsTotalWidth(allColumns);
  const totalFlexGrow = getTotalFlexGrow(allColumns);
  const colsByGroup = columnsByPin(allColumns);

  if (columnsWidth !== expectedWidth) {
    scaleColumns(colsByGroup, expectedWidth, totalFlexGrow);
  }
}

/**
 * Resizes columns based on the flexGrow property, while respecting manually set widths
 */
function scaleColumns(colsByGroup: IColumnsByPin, maxWidth: number, totalFlexGrow: number): void {
  // calculate total width and flexgrow points for coulumns that can be resized
  let column: TableColumn;
  for (const attr in colsByGroup) {
    for (column of colsByGroup[attr]) {
      if (!column.canAutoResize) {
        maxWidth -= column.width;
        totalFlexGrow -= column.flexGrow ? column.flexGrow : 0;
      } else {
        column.width = 0;
      }
    }
  }
  const hasMinWidth = {};
  let remainingWidth = maxWidth;

  // resize columns until no width is left to be distributed
  do {
    const widthPerFlexPoint = remainingWidth / totalFlexGrow;
    remainingWidth = 0;
    for (const attr in colsByGroup) {
      for (column of colsByGroup[attr]) {
        // if the column can be resize and it hasn't reached its minimum width yet
        if (column.canAutoResize && !hasMinWidth[column.prop]) {
          const newWidth = column.width + column.flexGrow * widthPerFlexPoint;
          if (column.minWidth && newWidth < column.minWidth) {
            remainingWidth += newWidth - column.minWidth;
            column.width = column.minWidth;
            hasMinWidth[column.prop] = true;
          } else {
            column.width = newWidth;
          }
        }
      }
    }
  } while (remainingWidth !== 0);
}

function calcRealWidth(column: TableColumn): number {
  if (!column.element) {
    return null;
  }
  let w = (column.element as HTMLElement).offsetWidth;
  // eslint-disable-next-line no-undefined
  if (column.realWidth !== null || column.realWidth !== undefined) {
    return Math.max(w, column.realWidth);
  }
  if (!w || w < 0) {
    return w;
  }
  w = 0;
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < column.element.children.length; i++) {
    const el = column.element.children[i];
    w = Math.max(w, (el as HTMLElement).offsetWidth);
  }
  return w;
}

/**
 * Forces the width of the columns to
 * distribute equally but overflowing when necessary
 *
 * Rules:
 *
 *  - If combined withs are less than the total width of the grid,
 *    proportion the widths given the min / max / normal widths to fill the width.
 *
 *  - If the combined widths, exceed the total width of the grid,
 *    use the standard widths.
 *
 *  - If a column is resized, it should always use that width
 *
 *  - The proportional widths should never fall below min size if specified.
 *
 *  - If the grid starts off small but then becomes greater than the size ( + / - )
 *    the width should use the original width; not the newly proportioned widths.
 */
export function forceFillColumnWidths(
  allColumns: TableColumn[],
  expectedWidth: number,
  startIdx: number,
  allowBleed: boolean,
  defaultColWidth: number = 300
): void {
  // const hiddenColumns = allColumns.filter(c => c.hidden);
  // for (const column of hiddenColumns) {
  //   if(!column.$$oldWidth) {
  //     column.$$oldWidth = column.width;
  //   }
  //   column.width = 0;
  // }
  const hiddenColumns: TableColumn[] = [];
  allColumns.forEach(col => {
    col.hidden = false;
    const width = calcRealWidth(col);
    if (width !== null && width < 10) {
      hiddenColumns.push(col);
      col.hidden = true;
      if (!col.$$oldWidth) {
        col.$$oldWidth = col.width;
      }
      col.width = 0;
    }
  });

  allColumns = allColumns.filter(c => c.visible && !c.hidden);
  const columnsToResize = allColumns.slice(startIdx + 1, allColumns.length).filter(c => c.canAutoResize !== false);
  const averageColumnWidth = expectedWidth / columnsToResize.length;

  for (const column of columnsToResize) {
    if (!column.$$oldWidth) {
      column.$$oldWidth = column.width;
    }
    column.width = averageColumnWidth;
  }

  let additionWidthPerColumn = 0;
  let exceedsWindow = false;
  let contentWidth = getContentWidth(allColumns, defaultColWidth);
  let remainingWidth = expectedWidth - contentWidth;
  const columnsProcessed: any[] = [];

  // This loop takes care of the
  do {
    additionWidthPerColumn = remainingWidth / columnsToResize.length;
    exceedsWindow = contentWidth >= expectedWidth;

    for (const column of columnsToResize) {
      if (exceedsWindow && allowBleed) {
        column.width = column.$$oldWidth || column.width || defaultColWidth;
      } else {
        const newSize = (column.width || defaultColWidth) + additionWidthPerColumn;

        if (column.minWidth && newSize < column.minWidth) {
          column.width = column.minWidth;
          columnsProcessed.push(column);
        } else if (column.maxWidth && newSize > column.maxWidth) {
          column.width = column.maxWidth;
          columnsProcessed.push(column);
        } else {
          column.width = newSize;
        }
      }

      column.width = Math.max(0, column.width);
    }

    contentWidth = getContentWidth(allColumns);
    remainingWidth = expectedWidth - contentWidth;
    removeProcessedColumns(columnsToResize, columnsProcessed);
  } while (remainingWidth > 0 && columnsToResize.length !== 0);
}

/**
 * Remove the processed columns from the current active columns.
 */
function removeProcessedColumns(columnsToResize: any[], columnsProcessed: any[]) {
  for (const column of columnsProcessed) {
    const index = columnsToResize.indexOf(column);
    columnsToResize.splice(index, 1);
  }
}

/**
 * Gets the width of the columns
 */
function getContentWidth(allColumns: TableColumn[], defaultColWidth: number = 300): number {
  let contentWidth = 0;
  for (const column of allColumns) {
    contentWidth += column.width || defaultColWidth;
  }
  return contentWidth;
}
