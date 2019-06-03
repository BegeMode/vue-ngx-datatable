import { Vue } from 'vue-property-decorator';
export default class InlineEditComponent extends Vue {
    editing: {};
    rows: any[];
    created(): void;
    fetch(cb: any): void;
    dblclick(edit: any, rowIndex: any, prop: any, update: any): void;
    updateValue(event: any, cell: any, rowIndex: any): void;
}
