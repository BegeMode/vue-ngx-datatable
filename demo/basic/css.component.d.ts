import { Vue } from 'vue-property-decorator';
export default class RowCssComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    expanded: {};
    timeout: any;
    created(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
    getRowClass(row: {
        age: number;
    }): {
        'age-is-ten': boolean;
    };
    getCellClass({ row, column, value }: {
        row: Record<string, unknown>;
        column: unknown;
        value: string;
    }): Record<string, unknown>;
}
