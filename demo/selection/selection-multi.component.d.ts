import { Vue } from 'vue-property-decorator';
export default class MultiSelectionComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    selected: Array<Record<string, unknown>>;
    columns: any[];
    created(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
    onSelect({ selected }: {
        selected: Array<Record<string, unknown>>;
    }): void;
    onActivate(event: Record<string, unknown>): void;
}
