export interface IGroupedRows {
  __isGroup: true;
  key: string;
  level: number;
  __expanded: boolean;
  rows: Record<string, unknown | IGroupedRows>[];
  groups?: IGroupedRows[];
  keys?: Array<{ title: string; prop: string; value: string }>;
  active?: boolean;
}
