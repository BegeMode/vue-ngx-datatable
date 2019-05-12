export interface IGroupedRows {
    key: string;
    level: number;
    value: any[];
    groups?: IGroupedRows[];
    keys?: any;
}
