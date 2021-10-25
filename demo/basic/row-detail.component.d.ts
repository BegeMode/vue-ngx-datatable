import { Vue } from 'vue-property-decorator';
export default class RowDetailsComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    timeout: any;
    created(): void;
    onPage(event: Record<string, unknown>): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
    toggleExpandRow(row: Record<string, unknown>): void;
    onDetailToggle(event: Record<string, unknown>): void;
    expandAllRows(): void;
    collapseAllRows(): void;
}
