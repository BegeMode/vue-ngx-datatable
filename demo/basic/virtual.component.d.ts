import { Vue } from 'vue-property-decorator';
export default class VirtualScrollComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    expanded: {};
    timeout: any;
    created(): void;
    onPage(event: unknown): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
    getRowHeight(row: {
        height: number;
    }): number;
    onRendered(): void;
}
