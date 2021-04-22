// import { PipeTransform } from '@angular/core';
import { SortDirection } from 'types/sort-direction.type';
import { VNode } from 'vue/types/umd';
import { ValueGetter } from '../utils/column-prop-getters';

export type TComparator = (
  propA: string,
  propB: string,
  row: Record<string, unknown>,
  row1: Record<string, unknown>,
  dir: SortDirection
) => number;

/**
 * Column property that indicates how to retrieve this column's
 * value from a row.
 * 'a.deep.value', 'normalprop', 0 (numeric)
 */
export type TableColumnProp = string | number;

/**
 * Column Type
 * @type {object}
 */
export interface TableColumn {
  /**
   * Internal unique id
   *
   * @type {string}
   * @memberOf TableColumn
   */
  $$id?: string;

  /**
   * Internal for column width distributions
   *
   * @type {number}
   * @memberOf TableColumn
   */
  $$oldWidth?: number;

  /**
   * Internal for setColumnDefaults
   *
   * @type {ValueGetter}
   * @memberOf TableColumn
   */
  $$valueGetter?: ValueGetter;

  /**
   * Determines if column is checkbox
   *
   * @type {boolean}
   * @memberOf TableColumn
   */
  checkboxable?: boolean;

  /**
   * Determines if the column is frozen to the left
   *
   * @type {boolean}
   * @memberOf TableColumn
   */
  frozenLeft?: boolean;

  /**
   * Determines if the column is frozen to the right
   *
   * @type {boolean}
   * @memberOf TableColumn
   */
  frozenRight?: boolean;

  /**
   * The grow factor relative to other columns. Same as the flex-grow
   * API from http =//www.w3.org/TR/css3-flexbox/. Basically;
   * take any available extra width and distribute it proportionally
   * according to all columns' flexGrow values.
   *
   * @type {number}
   * @memberOf TableColumn
   */
  flexGrow?: number;

  /**
   * Min width of the column
   *
   * @type {number}
   * @memberOf TableColumn
   */
  minWidth?: number;

  /**
   * Max width of the column
   *
   * @type {number}
   * @memberOf TableColumn
   */
  maxWidth?: number;

  /**
   * The default width of the column, in pixels
   *
   * @type {number}
   * @memberOf TableColumn
   */
  width?: number;
  /**
   * The real calculated width of the column, in pixels
   *
   * @type {number}
   * @memberOf TableColumn
   */
  realWidth?: number;

  /**
   * Can the column be resized
   *
   * @type {boolean}
   * @memberOf TableColumn
   */
  resizeable?: boolean;

  /**
   * Custom sort comparator
   *
   * @type {*}
   * @memberOf TableColumn
   */
  comparator?: TComparator;

  /**
   * Custom pipe transforms
   *
   * @type {PipeTransform}
   * @memberOf TableColumn
   */
  // pipe?: PipeTransform;
  // todo: filter

  /**
   * Can the column be sorted
   *
   * @type {boolean}
   * @memberOf TableColumn
   */
  sortable?: boolean;

  /**
   * Can the column be re-arranged by dragging
   *
   * @type {boolean}
   * @memberOf TableColumn
   */
  draggable?: boolean;

  /**
   * Whether the column can automatically resize to fill space in the table.
   *
   * @type {boolean}
   * @memberOf TableColumn
   */
  canAutoResize?: boolean;

  /**
   * Column name or label
   *
   * @type {string}
   * @memberOf TableColumn
   */
  name?: string;

  /**
   * Property to bind to the row. Example:
   *
   * `someField` or `some.field.nested`, 0 (numeric)
   *
   * If left blank, will use the name as camel case conversion
   *
   * @type {TableColumnProp}
   * @memberOf TableColumn
   */
  prop?: TableColumnProp;

  /**
   * Cell template ref
   *
   * @type {*}
   * @memberOf TableColumn
   */
  cellTemplate?: (arg?: Record<string, unknown>) => VNode[];

  /**
   * Header template slot
   *
   * @type {*}
   * @memberOf TableColumn
   */
  headerTemplate?: (arg?: Record<string, unknown>) => VNode[];

  /**
   * Header append template slot
   *
   * @type {*}
   * @memberOf TableColumn
   */
  headerAppendTemplate?: (arg?: Record<string, unknown>) => VNode[];

  /**
   * Tree toggle template ref
   *
   * @type {*}
   * @memberOf TableColumn
   */
  treeToggleTemplate?: any;

  /**
   * CSS Classes for the cell
   *
   *
   * @memberOf TableColumn
   */
  cellClass?:
    | string
    | Array<string>
    | ((data: Record<string, unknown>) => string | Record<string, unknown>)
    | Array<string | Array<string> | ((data: Record<string, unknown>) => string | Record<string, unknown>)>;

  /**
   * CSS classes for the header
   *
   *
   * @memberOf TableColumn
   */
  headerClass?: string | ((data: any) => string);

  /**
   * Header checkbox enabled
   *
   * @type {boolean}
   * @memberOf TableColumn
   */
  headerCheckboxable?: boolean;

  /**
   * Is tree displayed on this column
   *
   * @type {boolean}
   * @memberOf TableColumn
   */
  isTreeColumn?: boolean;

  /**
   * Width of the tree level indent
   *
   * @type {number}
   * @memberOf TableColumn
   */
  treeLevelIndent?: number;

  /**
   * Summary function
   *
   * @type {(cells: any[]) => any}
   * @memberOf TableColumn
   */
  summaryFunc?: (cells: any[]) => any;

  /**
   * Summary cell template ref
   *
   * @type {*}
   * @memberOf TableColumn
   */
  summaryTemplate?: any;
  /**
   * Is column the drag'n'drop target?
   * @type {boolean}
   * @memberOf TableColumn
   */
  isTarget?: boolean;

  /**
   * Is column visibled?
   * @type {boolean}
   * @memberOf TableColumn
   */
  visible?: boolean;
  /**
   * Reference to HTMLElement
   * @type {Element}
   * @memberOf TableColumn
   */
  element?: Element;
  /**
   * Is column temporary hidden?
   * @type {boolean}
   * @memberOf TableColumn
   */
  hidden?: boolean;
  /**
   * Is column dragging now?
   * @type {boolean}
   * @memberOf TableColumn
   */
  dragging?: boolean;
  /**
   * Dragging marker css classes
   * @type {object}
   * @memberOf TableColumn
   */
  targetMarkerContext?: { class: string };
}
