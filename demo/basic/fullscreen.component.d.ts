import { Vue } from 'vue-property-decorator';
import { TableColumn } from 'types/table-column.type';
export declare class FullScreenComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    columns: TableColumn[];
    created(): void;
    fetch(cb: (data: {
        cols: Array<string>;
        data: Array<Record<string, unknown>>;
    }) => void): void;
    onRendered(): void;
    rowIdentity(row: {
        Id: string | number;
    }): number | string;
}
