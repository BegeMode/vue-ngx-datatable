import { Vue } from 'vue-property-decorator';
export default class RowGroupingComponent extends Vue {
    funder: any[];
    calculated: any[];
    pending: any[];
    groups: any[];
    editing: {};
    rows: any[];
    created(): void;
    fetch(cb: any): void;
    getGroupRowHeight(group: any, rowHeight: any): {};
    checkGroup(event: any, row: any, rowIndex: any, group: any): void;
    updateValue(event: any, cell: any, rowIndex: any): void;
    onDetailToggle(event: any): void;
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
}
