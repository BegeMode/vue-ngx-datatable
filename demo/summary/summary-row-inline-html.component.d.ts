import { Vue } from 'vue-property-decorator';
import './summary-row-inline-html.component.scss';
export default class SummaryRowInlineHtmlComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    enableSummary: boolean;
    summaryPosition: string;
    created(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
    get names(): string[];
    summaryForGender(cells: string[]): string;
    avgAge(cells: number[]): number;
}
