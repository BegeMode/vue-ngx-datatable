import { Vue } from 'vue-property-decorator';
export default class SingleSelectionComponent extends Vue {
    items: Array<Record<string, unknown>>;
    selected: Array<Record<string, unknown>>;
    columns: any[];
    created(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
    rowIdentity(row: Record<string, number>): number;
    onSelect({ selected }: {
        selected: Array<Record<string, unknown>>;
    }): Promise<void>;
    onActivate(event: Record<string, unknown>): void;
    updateRow(row: any): Promise<any>;
    get rows(): unknown[];
}
