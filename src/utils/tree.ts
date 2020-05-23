import { TableColumnProp } from '../types/table-column.type';
import { getterForProp } from './column-prop-getters';

export type OptionalValueGetter = (row: any) => any | undefined;
export function optionalGetterForProp(prop: TableColumnProp): OptionalValueGetter {
  return prop && ((row) => getterForProp(prop)(row, prop));
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
export function groupRowsByParents(rows: any[], from?: OptionalValueGetter, to?: OptionalValueGetter,
                                   lazyTree: boolean = false): any[] {
  if (!rows) {
    this.rows;
  }
  if (from && to) {
    const nodeById = {};
    const l = rows.length;
    let node: TreeNode | null = null;

    nodeById[0] = new TreeNode(); // that's the root node

    const uniqIDs = rows.reduce((arr, item) => {
      const toValue = to(item);
      if (arr.indexOf(toValue) === -1) {
        arr.push(toValue);
      }
      return arr;
    }, []);

    for (let i = 0; i < l; i++) {  // make TreeNode objects for each item
      nodeById[ to(rows[i]) ] = new TreeNode(rows[i]);
    }
    let notResolvedNodes = []; 
    for (let i = 0; i < l; i++) {  // link all TreeNode objects
      node = nodeById[ to(rows[i]) ];
      let parent = 0;
      const fromValue = from(node.row);
      if (!!fromValue && (uniqIDs.indexOf(fromValue) > -1)) {
        parent = fromValue;
      }
      node.parent = nodeById[parent];
      if (node.parent.row['level'] === null || node.parent.row['level'] === undefined) {
        notResolvedNodes.push(node);
      } else {
        node.row['level'] = node.parent.row['level'] + 1;
        node.parent.children.push(node);
      }
    }
    const temp = [];
    do {
      temp.length = 0;
      while (notResolvedNodes.length) {
        node = notResolvedNodes.pop();
        if (node.parent.row['level'] === null || node.parent.row['level'] === undefined) {
          temp.push(node);
        } else {
          node.row['level'] = node.parent.row['level'] + 1;
          node.parent.children.push(node);
        }
      }
      notResolvedNodes = temp;
    } while (notResolvedNodes.length);

    let resolvedRows: any[] = [];
    nodeById[0].flatten(function() {
      resolvedRows = [...resolvedRows, this.row];
    }, true, lazyTree);

    return resolvedRows;
  } else {
    return rows;
  }
}

class TreeNode {
  public row: any;
  public parent: any;
  public children: any[];

  constructor(row: any | null = null) {
    if (!row) {
      row = {
        level: -1,
        treeStatus: 'expanded'
      };
    }
    this.row = row;
    this.parent = null;
    this.children = [];
  }

  flatten(f: any, recursive: boolean, lazyTree: boolean = false)  {
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
          child.flatten.apply(child, arguments, lazyTree);
        }
      }
    }
  }
}
