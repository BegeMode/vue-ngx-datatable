import { Vue } from 'vue-property-decorator';
export default class InlineEditComponent extends Vue {
    editing: {};
    rows: Array<Record<string, unknown>>;
    created(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
    dblclick(edit: boolean, rowIndex: number, prop: string, update: () => void): void;
    updateValue(event: Event, cell: string, rowIndex: number): void;
}
