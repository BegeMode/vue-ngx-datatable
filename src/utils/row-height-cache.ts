/**
 * This object contains the cache of the various row heights that are present inside
 * the data table.   Its based on Fenwick tree data structure that helps with
 * querying sums that have time complexity of log n.
 *
 * Fenwick Tree Credits: http://petr-mitrichev.blogspot.com/2013/05/fenwick-tree-range-updates.html
 * https://github.com/mikolalysenko/fenwick-tree
 *
 */
export class RowHeightCache {

  /**
   * Tree Array stores the cumulative information of the row heights to perform efficient
   * range queries and updates.  Currently the tree is initialized to the base row
   * height instead of the detail row height.
   */
  // private treeArray: number[] = [];
  private heights = [];

  /**
   * Clear the Tree array.
   */
  clearCache(): void {
    // this.treeArray = [];
    this.heights = [];
  }

  /**
   * Initialize the Fenwick tree with row Heights.
   *
   * @param rows The array of rows which contain the expanded status.
   * @param rowHeight The row height.
   * @param rowDetailHeight The detail row height.
   */
  initCache(details: any): void {
    const { rows, rowHeight, rowDetailHeight, groupRowHeight,
            externalVirtual, rowCount, rowIndexes, rowExpansions } = details;
    const isFn = typeof rowHeight === 'function';
    const isDetailFn = typeof rowDetailHeight === 'function';
    const isGroupFn = typeof groupRowHeight === 'function';

    if (!isFn && isNaN(rowHeight)) {
      throw new Error(`Row Height cache initialization failed. Please ensure that 'rowHeight' is a
        valid number or function value: (${rowHeight}) when 'scrollbarV' is enabled.`);
    }

    // Add this additional guard in case rowDetailHeight is set to 'auto' as it wont work.
    if (!isDetailFn && isNaN(rowDetailHeight)) {
      throw new Error(`Row Height cache initialization failed. Please ensure that 'rowDetailHeight' is a
        valid number or function value: (${rowDetailHeight}) when 'scrollbarV' is enabled.`);
    }

    const n = externalVirtual ? rowCount : rows.length;
    // this.treeArray = new Array(n);
    this.heights = new Array(n);

    for(let i = 0; i < n; ++i) {
      // this.treeArray[i] = 0;
      this.heights[i] = 0;
    }

    let accumulator = 0;

    for (let i = 0; i < n; ++i) {
      const row = rows[i];
      let currentRowHeight;
      if (row.__isGroup) {
        currentRowHeight = groupRowHeight;
        if (isGroupFn) {
          currentRowHeight = groupRowHeight(row);
        }
      } else {
        currentRowHeight = rowHeight;
        if (isFn) {
          currentRowHeight = rowHeight(row);
        }
      }

      // Add the detail row height to the already expanded rows.
      // This is useful for the table that goes through a filter or sort.
      const expanded = rowExpansions.get(row);
      if(row && expanded === 1) {
        if(isDetailFn) {
          const index = rowIndexes.get(row);
          currentRowHeight += rowDetailHeight(row, index);
        } else {
          currentRowHeight += rowDetailHeight;
        }
      }

      // this.updateTree(i, currentRowHeight);
      accumulator += currentRowHeight;
      this.heights[i] = { accumulator, height: currentRowHeight };
    }
    // this.heights = this.initHeights(details);
  }

  /**
   * Given the ScrollY position i.e. sum, provide the rowIndex
   * that is present in the current view port.  Below handles edge cases.
   */
  getRowIndex(scrollY: number, first: boolean = false): number {
    if(scrollY === 0) return 0;
    let result = this.calcRowIndex(scrollY);
    if (!first) {
      result++;
    }
    return result;
  }

  /**
   * When a row is expanded or rowHeight is changed, update the height.  This can
   * be utilized in future when Angular Data table supports dynamic row heights.
   */
  update(atRowIndex: number, byRowHeight: number): void {
    if (!this.heights || !this.heights.length) {
      return;
      // throw new Error(`Update at index ${atRowIndex} with value ${byRowHeight} failed:
      //   Row Height cache not initialized.`);
    }

    const n = this.heights.length;

    while(atRowIndex < n) {
      this.heights[atRowIndex].accumulator += byRowHeight;
      atRowIndex++;
    }
  }

  // update(atRowIndex: number, byRowHeight: number): void {
  //   if (!this.treeArray.length) {
  //     throw new Error(`Update at index ${atRowIndex} with value ${byRowHeight} failed:
  //       Row Height cache not initialized.`);
  //   }

  //   const n = this.treeArray.length;
  //   atRowIndex |= 0;

  //   while(atRowIndex < n) {
  //     this.treeArray[atRowIndex] += byRowHeight;
  //     atRowIndex |= (atRowIndex + 1);
  //   }
  // }

  /**
   * Range Sum query from 1 to the rowIndex
   */
  query(atIndex: number): number {
    if (atIndex < 0) {
      return 0;
    }
    return this.heights[atIndex].accumulator;
  }

  // query(atIndex: number): number {
  //   if (!this.treeArray.length) {
  //     throw new Error(`query at index ${atIndex} failed: Fenwick tree array not initialized.`);
  //   }

  //   let sum = 0;
  //   atIndex |= 0;

  //   while(atIndex >= 0) {
  //     sum += this.treeArray[atIndex];
  //     atIndex = (atIndex & (atIndex + 1)) - 1;
  //   }

  //   return sum;
  // }

  /**
   * Find the total height between 2 row indexes
   */
  queryBetween(atIndexA: number, atIndexB: number): number {
    return this.query(atIndexB) - this.query(atIndexA - 1);
  }

  /**
   * Given the ScrollY position i.e. sum, provide the rowIndex
   * that is present in the current view port.
   */
  private calcRowIndex(sum: number): number {
    if (!this.heights.length) return 0;
    
    if (this.heights[this.heights.length - 1].accumulator < sum) {
      return this.heights.length;
    }

    let pos = -1;
    const dataLength = this.heights.length;

    for (let i = 0; i < dataLength; i++) {
      if (this.heights[i].accumulator >= sum) {
        pos = i;
        break;
      }
    }

    return pos;
  }

  // private calcRowIndex(sum: number): number {
  //   if(!this.treeArray.length) return 0;

  //   let pos = -1;
  //   const dataLength = this.treeArray.length;

  //   // Get the highest bit for the block size.
  //   const highestBit = Math.pow(2, dataLength.toString(2).length - 1);

  //   for (let blockSize = highestBit; blockSize !== 0; blockSize >>= 1) {
  //     const nextPos = pos + blockSize;
  //     if (nextPos < dataLength && sum >= this.treeArray[nextPos]) {
  //       sum -= this.treeArray[nextPos];
  //       pos = nextPos;
  //     }
  //   }

  //   return pos + 1;
  // }

  // private initHeights(details: any) {
  //   const { rows, rowHeight, rowDetailHeight, externalVirtual, rowCount, rowIndexes, rowExpansions } = details;
  //   const isFn = typeof rowHeight === 'function';
  //   const isDetailFn = typeof rowDetailHeight === 'function';

  //   if (!isFn && isNaN(rowHeight)) {
  //     throw new Error(`Row Height cache initialization failed. Please ensure that 'rowHeight' is a
  //       valid number or function value: (${rowHeight}) when 'scrollbarV' is enabled.`);
  //   }

  //   // Add this additional guard in case rowDetailHeight is set to 'auto' as it wont work.
  //   if (!isDetailFn && isNaN(rowDetailHeight)) {
  //     throw new Error(`Row Height cache initialization failed. Please ensure that 'rowDetailHeight' is a
  //       valid number or function value: (${rowDetailHeight}) when 'scrollbarV' is enabled.`);
  //   }
  //   const n = externalVirtual ? rowCount : rows.length;
  //   const heights = new Array(n);

  //   let accumulator = 0;
  //   for (let i = 0; i < n; ++i) {
  //     const row = rows[i];
  //     let currentRowHeight = rowHeight;
  //     if(isFn) {
  //       currentRowHeight = rowHeight(row);
  //     }

  //     // Add the detail row height to the already expanded rows.
  //     // This is useful for the table that goes through a filter or sort.
  //     const expanded = rowExpansions.get(row);
  //     if(row && expanded === 1) {
  //       if(isDetailFn) {
  //         const index = rowIndexes.get(row);
  //         currentRowHeight += rowDetailHeight(row, index);
  //       } else {
  //         currentRowHeight += rowDetailHeight;
  //       }
  //     }
  //     accumulator += currentRowHeight;
  //     heights[i] = { accumulator, height: currentRowHeight };
  //   }
  //   return heights;
  // }

}
