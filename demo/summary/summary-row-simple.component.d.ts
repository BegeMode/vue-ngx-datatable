import { Vue } from 'vue-property-decorator';
import './summary-row-simple.component.scss';
export default class SummaryRowSimpleComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    columns: ({
        name: string;
        summaryFunc: (cells: Array<string>) => string;
        prop?: undefined;
    } | {
        prop: string;
        summaryFunc: (cells: Array<number>) => number;
        name?: undefined;
    })[];
    enableSummary: boolean;
    summaryPosition: string;
    created(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
    onSummaryStateChange(a: unknown): void;
    private summaryForGender;
    private avgAge;
}
