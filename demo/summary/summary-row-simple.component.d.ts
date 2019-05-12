import { Vue } from 'vue-property-decorator';
import './summary-row-simple.component.scss';
export default class SummaryRowSimpleComponent extends Vue {
    rows: any[];
    columns: ({
        name: string;
        summaryFunc: (cells: any) => string;
        prop?: undefined;
    } | {
        prop: string;
        summaryFunc: (cells: any) => number;
        name?: undefined;
    })[];
    enableSummary: boolean;
    summaryPosition: string;
    created(): void;
    fetch(cb: any): void;
    onSummaryStateChange(a: any): void;
    private summaryForGender;
    private avgAge;
}
