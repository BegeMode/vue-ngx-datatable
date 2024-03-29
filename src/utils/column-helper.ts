import { TableColumn } from 'types/table-column.type';
import Vue from 'vue';
// import { DataTableColumnDirective } from '../components/columns';
import { camelCase, deCamelCase } from './camel-case';
import { getterForProp } from './column-prop-getters';
import { id } from './id';

/**
 * Sets the column defaults
 */
export function setColumnsDefaults(columns: TableColumn[], vm: Vue): void {
  if (!columns) {
    return;
  }

  // Only one column should hold the tree view
  // Thus if multiple columns are provided with
  // isTreeColumn as true we take only the first one
  let treeColumnFound = false;

  for (const column of columns) {
    setColumnDefaults(column, vm);
    if (!('isTreeColumn' in column)) {
      vm.$set(column, 'isTreeColumn', false);
    } else if (column.isTreeColumn && !treeColumnFound) {
      // If the first column with isTreeColumn is true found
      // we mark that treeCoulmn is found
      vm.$set(column, 'isTreeColumn', true);
      treeColumnFound = true;
    } else {
      // After that isTreeColumn property for any other column
      // will be set as false
      vm.$set(column, 'isTreeColumn', false);
    }
  }
}

export function setColumnDefaults(column: TableColumn, vm: Vue): void {
  if (!column) {
    return;
  }

  if (!column.$$id) {
    column.$$id = id();
  }

  // prop can be numeric; zero is valid not a missing prop
  // translate name => prop
  if (isNullOrUndefined(column.prop) && column.name) {
    column.prop = camelCase(column.name);
  }

  vm.$set(column, '$$valueGetter', getterForProp(column.prop));

  // format props if no name passed
  if (!isNullOrUndefined(column.prop) && isNullOrUndefined(column.name)) {
    column.name = deCamelCase(String(column.prop));
  }

  if (isNullOrUndefined(column.prop) && isNullOrUndefined(column.name)) {
    column.name = ''; // Fixes IE and Edge displaying `null`
  }

  if (!('resizeable' in column)) {
    vm.$set(column, 'resizeable', true);
  }

  if (!('sortable' in column)) {
    vm.$set(column, 'sortable', true);
  }

  if (!('draggable' in column)) {
    vm.$set(column, 'draggable', true);
  }

  if (!('visible' in column)) {
    vm.$set(column, 'visible', true);
  }

  if (!('canAutoResize' in column) || isNullOrUndefined(column.canAutoResize)) {
    column.canAutoResize = true;
  }

  if (!('width' in column) || !column.width) {
    vm.$set(column, 'width', 150);
  } else {
    vm.$set(column, 'width', column.width);
  }
  vm.$set(column, 'isTreeColumn', column.isTreeColumn);
  vm.$set(column, 'isTarget', isNullOrUndefined(column.isTarget) ? false : column.isTarget);
}

export function isNullOrUndefined<T>(value: T | null | undefined): value is null | undefined {
  // eslint-disable-next-line no-undefined
  return value === null || value === undefined;
}

/**
 * Translates templates definitions to objects
 */
// export function translateTemplates(templates: DataTableColumnDirective[]): any[] {
//   const result: any[] = [];

//   for(const temp of templates) {
//     const col: any = {};

//     const props = Object.getOwnPropertyNames(temp);
//     for(const prop of props) {
//       col[prop] = temp[prop];
//     }

//     if(temp.headerTemplate) {
//       col.headerTemplate = temp.headerTemplate;
//     }

//     if(temp.cellTemplate) {
//       col.cellTemplate = temp.cellTemplate;
//     }

//     if(temp.summaryFunc) {
//       col.summaryFunc = temp.summaryFunc;
//     }

//     if(temp.summaryTemplate) {
//       col.summaryTemplate = temp.summaryTemplate;
//     }

//     result.push(col);
//   }

//   return result;
// }
