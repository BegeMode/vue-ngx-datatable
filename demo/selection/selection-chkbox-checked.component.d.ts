import { Vue } from 'vue-property-decorator';
export default class CheckNoSelectionComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    selected: Array<Record<string, unknown>>;
    checked: Array<Record<string, unknown>>;
    created(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
    onSelect({ selected }: {
        selected: Array<Record<string, unknown>>;
    }): void;
    onCheck({ checked }: {
        checked: Array<Record<string, unknown>>;
    }): void;
    onActivate(event: Record<string, unknown>): void;
    add(): void;
    update(): void;
    remove(): void;
    displayCheck(row: Record<string, unknown>): boolean;
}