import { TableColumn } from 'types/table-column.type';
import { Vue } from 'vue-property-decorator';
export default class CellSelectionComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    selected: Array<Record<string, unknown>>;
    columns: TableColumn[];
    created(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
    onFocus(event: FocusEvent): void;
    onSelect(event: Array<Record<string, unknown>>): void;
    onActivate(event: Record<string, unknown>): void;
}
