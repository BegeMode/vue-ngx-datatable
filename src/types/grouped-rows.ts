export interface IGroupedRows {
  __isGroup: true;
  key: string;
  level: number;
  __expanded: boolean;
  value: any[];
  groups?: IGroupedRows[];
  keys?: any;
}
