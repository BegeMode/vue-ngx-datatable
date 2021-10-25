import { Vue } from 'vue-property-decorator';
export default class ResponsiveComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    timeout: number;
    created(): void;
    onPage(event: Record<string, unknown>): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
    toggleExpandRow(row: Record<string, unknown>): void;
    onDetailToggle(event: Record<string, unknown>): void;
}
