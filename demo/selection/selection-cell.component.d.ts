import { Vue } from 'vue-property-decorator';
export default class CellSelectionComponent extends Vue {
    rows: any[];
    selected: any[];
    columns: any[];
    created(): void;
    fetch(cb: any): void;
    onFocus(event: any): void;
    onSelect(event: any): void;
    onActivate(event: any): void;
}
