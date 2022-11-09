import { SortDirection } from 'types/sort-direction.type';
import { ISortPropDir } from 'types/sort-prop-dir.type';
import { orderByComparator } from 'utils/sort';
import { TableColumn, TableColumnProp, TComparator } from '../types/table-column.type';
import { getterForProp } from './column-prop-getters';

export type OptionalValueGetter = (row: Record<string, unknown>) => unknown | undefined;
export function optionalGetterForProp(prop: TableColumnProp): OptionalValueGetter {
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
  columns?: TableColumn[],
  sortDirs?: ISortPropDir[],
  lazyTree: boolean = false
): Record<string, unknown>[] {
  if (!rows) {
    return rows;
  }
  if (from && to) {
    const nodeById: Record<string | number, TreeNode> = {};
    const l = rows.length;
    let node: TreeNode | null = null;

    nodeById[0] = new TreeNode(); // that's the root node

    const uniqIDs: Array<unknown> = rows.reduce((arr, item) => {
      const toValue = to(item);
      if (arr.indexOf(toValue) === -1) {
        arr.push(toValue);
      }
      return arr as Array<unknown>;
    }, []);

    for (let i = 0; i < l; i++) {
      // make TreeNode objects for each item
      nodeById[to(rows[i]) as string | number] = new TreeNode(rows[i]);
    }
    let notResolvedNodes = [];
    for (let i = 0; i < l; i++) {
      // link all TreeNode objects
      node = nodeById[to(rows[i]) as string | number];
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
        node.row['level'] = node.parent.row['level'] + 1;
        node.parent.children.push(node);
      }
    }
    const temp = [];
    const toSortSet = new Set<TreeNode>();
    do {
      temp.length = 0;
      while (notResolvedNodes.length) {
        node = notResolvedNodes.pop();
        // eslint-disable-next-line no-undefined
        if (node.parent.row['level'] === null || node.parent.row['level'] === undefined) {
          temp.push(node);
        } else {
          node.row['level'] = node.parent.row['level'] + 1;
          node.parent.children.push(node);
          if (sortDirs?.length) {
            toSortSet.add(node.parent);
          }
        }
      }
      notResolvedNodes = [...temp];
    } while (notResolvedNodes.length);
    if (sortDirs?.length) {
      toSortSet.forEach(value => value.sortTreeNodes(columns, sortDirs));
    }

    let resolvedRows: Record<string, unknown>[] = [];
    nodeById[0].flatten(
      function () {
        resolvedRows = [...resolvedRows, (this as TreeNode).row];
      },
      true,
      lazyTree
    );
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

  sortTreeNodes(columns: TableColumn[], dirs: ISortPropDir[]): void {
    const nodes: TreeNode[] = this.children;
    if (!nodes || !columns || !dirs) {
      return;
    }
    if (!dirs || !dirs.length) {
      return;
    }

    /**
     * record the row ordering of results from prior sort operations (if applicable)
     * this is necessary to guarantee stable sorting behavior
     */
    const rowToIndexMap = new Map<Record<string, unknown>, number>();
    nodes.forEach((node, index) => rowToIndexMap.set(node.row, index));
    const cols: Record<string, TComparator> = {};
    if (Array.isArray(columns)) {
      columns.forEach(col => {
        if (col.comparator && typeof col.comparator === 'function') {
          cols[col.prop] = col.comparator;
        }
      });
    }

    // cache valueGetter and compareFn so that they
    // do not need to be looked-up in the sort function body
    const cachedDirs = dirs.map(dir => {
      const prop = dir.prop;
      return {
        prop,
        dir: dir.dir,
        valueGetter: getterForProp(prop),
        compareFn: cols[prop] || orderByComparator,
      };
    });

    nodes.sort((nodeA: TreeNode, nodeB: TreeNode) => {
      for (const cachedDir of cachedDirs) {
        // Get property and valuegetters for column to be sorted
        const { prop, valueGetter } = cachedDir;
        // Get A and B cell values from rows based on properties of the columns
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const propA = valueGetter(nodeA.row, prop);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const propB = valueGetter(nodeB.row, prop);

        // Compare function gets five parameters:
        // Two cell values to be compared as propA and propB
        // Two rows corresponding to the cells as rowA and rowB
        // Direction of the sort for this column as SortDirection
        // Compare can be a standard JS comparison function (a,b) => -1|0|1
        // as additional parameters are silently ignored. The whole row and sort
        // direction enable more complex sort logic.
        const comparison =
          cachedDir.dir !== SortDirection.desc
            ? cachedDir.compareFn(propA as string, propB as string, nodeA.row, nodeB.row, cachedDir.dir)
            : -cachedDir.compareFn(propA as string, propB as string, nodeA.row, nodeB.row, cachedDir.dir);

        // Don't return 0 yet in case of needing to sort by next property
        if (comparison !== 0) {
          return comparison;
        }
      }

      if (!(rowToIndexMap.has(nodeA.row) && rowToIndexMap.has(nodeB.row))) {
        return 0;
      }

      /**
       * all else being equal, preserve original order of the rows (stable sort)
       */
      return rowToIndexMap.get(nodeA.row) < rowToIndexMap.get(nodeB.row) ? -1 : 1;
    });
  }

  flatten(f: () => void, recursive: boolean, lazyTree: boolean = false): void {
    if (this.row['treeStatus'] === 'expanded') {
      for (let i = 0, l = this.children.length; i < l; i++) {
        const child = this.children[i];
        if (!lazyTree && (!child.children || !child.children.length)) {
          child.row['treeStatus'] = 'disabled';
        } else if (
          (child.children && child.children.length && !child.row['treeStatus']) ||
          child.row['treeStatus'] === 'disabled'
        ) {
          child.row['treeStatus'] = 'collapsed';
        }
        f.call(child);
        if (recursive) {
          child.flatten(f, recursive, lazyTree);
        }
      }
    }
  }
}
