import { Vue } from 'vue-property-decorator';
export default class DarkThemeComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    loadingIndicator: boolean;
    reorderable: boolean;
    columns: ({
        prop: string;
        summaryFunc: () => string;
        name?: undefined;
    } | {
        name: string;
        summaryFunc: (cells: Array<string>) => string;
        prop?: undefined;
    })[];
    created(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
    private summaryForGender;
}
