import { Vue } from 'vue-property-decorator';
import './summary-row-inline-html.component.scss';
import { TableColumn } from 'types/table-column.type';
export default class SummaryRowCustomTemplateComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    nameSummaryCell: any;
    columns: Array<TableColumn>;
    created(): void;
    mounted(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
    getNames(): string[];
    private summaryForGender;
    private avgAge;
}
