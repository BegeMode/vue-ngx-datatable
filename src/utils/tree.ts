/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TableColumnProp } from '../types/table-column.type';
import { getterForProp } from './column-prop-getters';

export type OptionalValueGetter = (row: Record<string, unknown>) => unknown | undefined;
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
  rows: Array<{ level: number; treeStatus?: string }>,
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
      const t = to(rows[i]);
      if (t) {
        nodeById[t as string | number] = new TreeNode(rows[i]);
      }
    }
    let notResolvedNodes = [];
    for (let i = 0; i < l; i++) {
      // link all TreeNode objects
      const t = to(rows[i]);
      if (t) {
        node = nodeById[t as string | number];
      }
      let parent = 0;
      const fromValue = from(node.row);
      if (Boolean(fromValue) && uniqIDs.indexOf(fromValue) > -1) {
        parent = fromValue as number;
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
      notResolvedNodes = [...temp];
    } while (notResolvedNodes.length);

    let resolvedRows: Record<string, unknown>[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    nodeById[0].flatten(
      function () {
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
  public row: { level: number; treeStatus?: string };
  public parent: TreeNode;
  public children: Array<TreeNode>;

  constructor(row: { level: number; treeStatus?: string } | null = null) {
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

  flatten(f: () => void, recursive: boolean, lazyTree: boolean = false): void {
    if (this.row['treeStatus'] === 'expanded') {
      for (let i = 0, l = this.children.length; i < l; i++) {
        const child = this.children[i];
        if (!lazyTree && (!child.children || !child.children.length)) {
          child.row['treeStatus'] = 'disabled';
        } else if (child.children && child.children.length && child.row['treeStatus'] === 'disabled') {
          child.row['treeStatus'] = 'collapsed';
        }
        f.apply(child, Array.prototype.slice.call(arguments, 2));
        if (recursive) {
          child.flatten(f, recursive, lazyTree);
        }
      }
    }
  }
}
