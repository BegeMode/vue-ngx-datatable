import { Vue } from 'vue-property-decorator';
export default class SortingComparatorComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    columns: ({
        name: string;
        comparator: any;
        sortable?: undefined;
    } | {
        name: string;
        sortable: boolean;
        comparator?: undefined;
    })[];
    created(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
    companyComparator(propA: string, propB: string): 1 | -1;
}
