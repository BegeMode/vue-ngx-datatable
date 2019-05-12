import { Vue } from 'vue-property-decorator';
export default class SortingComparatorComponent extends Vue {
    rows: any[];
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
    fetch(cb: any): void;
    companyComparator(propA: any, propB: any): 1 | -1;
}
