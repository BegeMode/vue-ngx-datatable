import { Vue } from 'vue-property-decorator';
export default class DarkThemeComponent extends Vue {
    rows: any[];
    loadingIndicator: boolean;
    reorderable: boolean;
    columns: ({
        prop: string;
        summaryFunc: () => any;
        name?: undefined;
    } | {
        name: string;
        summaryFunc: (cells: any) => string;
        prop?: undefined;
    } | {
        name: string;
        summaryFunc: () => any;
        prop?: undefined;
    })[];
    created(): void;
    fetch(cb: any): void;
    private summaryForGender;
}
