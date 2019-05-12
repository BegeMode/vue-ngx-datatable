import { Vue } from 'vue-property-decorator';
export default class FilterBarComponent extends Vue {
    rows: any[];
    temp: any[];
    columns: ({
        prop: string;
        name?: undefined;
    } | {
        name: string;
        prop?: undefined;
    })[];
    table: any;
    created(): void;
    mounted(): void;
    fetch(cb: any): void;
    updateFilter(event: any): void;
}
