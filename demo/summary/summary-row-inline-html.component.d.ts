import { Vue } from 'vue-property-decorator';
import './summary-row-inline-html.component.scss';
export default class SummaryRowInlineHtmlComponent extends Vue {
    rows: any[];
    enableSummary: boolean;
    summaryPosition: string;
    created(): void;
    fetch(cb: any): void;
    readonly names: string[];
    summaryForGender(cells: string[]): string;
    avgAge(cells: number[]): number;
}
