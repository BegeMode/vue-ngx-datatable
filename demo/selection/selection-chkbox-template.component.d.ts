import { Vue } from 'vue-property-decorator';
export default class CustomCheckboxSelectionComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    selected: Array<Record<string, unknown>>;
    allSelected: boolean;
    created(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
    onSelect({ selected }: {
        selected: Array<Record<string, unknown>>;
    }): void;
    onActivate(event: Record<string, unknown>): void;
    selectAll(): void;
    isSelected(row: Record<string, unknown>): Record<string, unknown>;
    onCheckboxChange(event: unknown, row: Record<string, unknown>): void;
    add(): void;
    update(): void;
    remove(): void;
}
