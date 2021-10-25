import { Vue } from 'vue-property-decorator';
interface IRow {
    exppayyes: number;
    exppayno: number;
    exppaypending: number;
    source: string;
    name: string;
    gender: string;
    company: string;
    age: number;
    comment: string;
    groupcomment: string;
    startdate: string;
    enddate: string;
    groupstatus: string;
    dt: string;
}
export default class RowGroupingCustomComponent extends Vue {
    editing: {};
    rows: Array<IRow>;
    groupRowsBy: (string | ({
        title: string;
        prop: string;
        valueGetter?: undefined;
    } | {
        title: string;
        prop: string;
        valueGetter: (dt: string) => number;
    })[])[];
    created(): void;
    fetch(cb: (data: Array<IRow>) => void): void;
    getGroupRowHeight(group: Array<unknown>, rowHeight: unknown): {};
    checkGroup(event: {
        target: {
            checked: boolean;
            value: string;
        };
    }, row: Record<string, unknown>, rowIndex: unknown, group: {
        rows: Array<IRow>;
    }): void;
    updateValue(event: {
        target: {
            checked: boolean;
            value: any;
        };
    }, cell: string, rowIndex: number): void;
    onDetailToggle(event: unknown): void;
    groupTitle(group: {
        key: string;
        level: number;
        value: any[];
        keys: Array<{
            title: string;
            prop: string;
            value: string;
        }>;
    }): string;
    onRendered(): void;
    onExpandAll(): void;
    onCollapseAll(): void;
    get groupHeaderStyles(): Record<string, string>;
}
export {};
