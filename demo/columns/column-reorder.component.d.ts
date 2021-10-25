import { Vue } from 'vue-property-decorator';
export default class ColumnReorderComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    loadingIndicator: boolean;
    reorderable: boolean;
    swapColumns: boolean;
    columns: ({
        prop: string;
        name?: undefined;
        sortable?: undefined;
    } | {
        name: string;
        prop?: undefined;
        sortable?: undefined;
    } | {
        name: string;
        sortable: boolean;
        prop?: undefined;
    })[];
    created(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
}
