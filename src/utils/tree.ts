/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TableColumnProp } from '../types/table-column.type';
import { getterForProp } from './column-prop-getters';

export type OptionalValueGetter = (row: Record<string, unknown>) => any | undefined;
export function optionalGetterForProp(prop: TableColumnProp): OptionalValueGetter {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return prop && (row => getterForProp(prop)(row, prop));
}

/**
 * This functions rearrange items by their parents
 * Also sets the level value to each of the items
 *
 * Note: Expecting each item has a property called parentId
 * Note: This algorithm will fail if a list has two or more items with same ID
 * NOTE: This algorithm will fail if there is a deadlock of relationship
 *
 * For example,
 *
 * Input
 *
 * id -> parent
 * 1  -> 0
 * 2  -> 0
 * 3  -> 1
 * 4  -> 1
 * 5  -> 2
 * 7  -> 8
 * 6  -> 3
 *
 *
 * Output
 * id -> level
 * 1      -> 0
 * --3    -> 1
 * ----6  -> 2
 * --4    -> 1
 * 2      -> 0
 * --5    -> 1
 * 7     -> 8
 *
 *
 * @param rows
 *
 */
export function groupRowsByParents(
  rows: Record<string, unknown>[],
  from?: OptionalValueGetter,
  to?: OptionalValueGetter,
  lazyTree: boolean = false
): Record<string, unknown>[] {
  if (!rows) {
    return rows;
  }
  if (from && to) {
    const nodeById = {};
    const l = rows.length;
    let node: TreeNode | null = null;

    nodeById[0] = new TreeNode(); // that's the root node

    const uniqIDs = rows.reduce((arr, item) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const toValue = to(item);
      if (arr.indexOf(toValue) === -1) {
        arr.push(toValue);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return arr;
    }, []);

    for (let i = 0; i < l; i++) {
      // make TreeNode objects for each item
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      nodeById[to(rows[i])] = new TreeNode(rows[i]);
    }
    let notResolvedNodes = [];
    for (let i = 0; i < l; i++) {
      // link all TreeNode objects
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      node = nodeById[to(rows[i])];
      let parent = 0;
      const fromValue = from(node.row);
      if (Boolean(fromValue) && uniqIDs.indexOf(fromValue) > -1) {
        parent = fromValue;
      }
      node.parent = nodeById[parent];
      // eslint-disable-next-line no-undefined
      if (node.parent.row['level'] === null || node.parent.row['level'] === undefined) {
        notResolvedNodes.push(node);
      } else {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        node.row['level'] = node.parent.row['level'] + 1;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        node.parent.children.push(node);
      }
    }
    const temp = [];
    do {
      temp.length = 0;
      while (notResolvedNodes.length) {
        node = notResolvedNodes.pop();
        // eslint-disable-next-line no-undefined
        if (node.parent.row['level'] === null || node.parent.row['level'] === undefined) {
          temp.push(node);
        } else {
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          node.row['level'] = node.parent.row['level'] + 1;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          node.parent.children.push(node);
        }
      }
      notResolvedNodes = temp;
    } while (notResolvedNodes.length);

    let resolvedRows: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    nodeById[0].flatten(
      // eslint-disable-next-line space-before-function-paren
      function() {
        resolvedRows = [...resolvedRows, this.row];
      },
      true,
      lazyTree
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return resolvedRows;
  }
  return rows;
}

class TreeNode {
  public row: any;
  public parent: any;
  public children: any[];

  constructor(row: any | null = null) {
    if (!row) {
      row = {
        level: -1,
        treeStatus: 'expanded',
      };
    }
    this.row = row;
    this.parent = null;
    this.children = [];
  }

  flatten(f: any, recursive: boolean, lazyTree: boolean = false) {
    if (this.row['treeStatus'] === 'expanded') {
      for (let i = 0, l = this.children.length; i < l; i++) {
        const child = this.children[i];
        if (!lazyTree && (!child.children || !child.children.length)) {
          child.row['treeStatus'] = 'disabled';
        } else if (child.children && child.children.length && child.row['treeStatus'] === 'disabled') {
          child.row['treeStatus'] = 'collapsed';
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        f.apply(child, Array.prototype.slice.call(arguments, 2));
        if (recursive) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          child.flatten.apply(child, arguments, lazyTree);
        }
      }
    }
  }
}
