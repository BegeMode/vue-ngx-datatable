import { Vue } from 'vue-property-decorator';
export default class ColumnReorderComponent extends Vue {
    rows: any[];
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
    fetch(cb: any): void;
}
