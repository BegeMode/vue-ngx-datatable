import { Vue } from 'vue-property-decorator';
export default class FilterBarComponent extends Vue {
    rows: Array<Record<string, string>>;
    temp: Array<Record<string, string>>;
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
    fetch(cb: (data: Array<Record<string, string>>) => void): void;
    updateFilter(event: KeyboardEvent): void;
}
