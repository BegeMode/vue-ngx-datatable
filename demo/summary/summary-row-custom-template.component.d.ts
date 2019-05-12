import { Vue } from 'vue-property-decorator';
import './summary-row-inline-html.component.scss';
export default class SummaryRowCustomTemplateComponent extends Vue {
    rows: any[];
    nameSummaryCell: any;
    columns: any[];
    created(): void;
    mounted(): void;
    fetch(cb: any): void;
    getNames(): string[];
    private summaryForGender;
    private avgAge;
}
