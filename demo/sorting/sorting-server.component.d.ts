import { ISortEvent } from 'types/sort-prop-dir.type';
import { Vue } from 'vue-property-decorator';
export default class ServerSortingComponent extends Vue {
    loading: boolean;
    rows: Array<Record<string, unknown>>;
    columns: {
        name: string;
        sortable: boolean;
    }[];
    created(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
    onSort(event: {
        sorts: ISortEvent;
    }): void;
}
