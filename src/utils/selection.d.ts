export declare function selectRows(selected: Record<string, unknown>[], row: Record<string, unknown>, comparefn: (r: Record<string, unknown>, arr: Record<string, unknown>[]) => number): Record<string, unknown>[];
export declare function selectRowsBetween(selected: Record<string, unknown>[], rows: Record<string, unknown>[], index: number, prevIndex: number, comparefn: () => boolean): Record<string, unknown>[];