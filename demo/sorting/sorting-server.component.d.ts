import { Vue } from 'vue-property-decorator';
export default class ServerSortingComponent extends Vue {
    loading: boolean;
    rows: any[];
    columns: {
        name: string;
        sortable: boolean;
    }[];
    created(): void;
    fetch(cb: any): void;
    onSort(event: any): void;
}
