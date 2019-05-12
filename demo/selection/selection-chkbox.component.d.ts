import { Vue } from 'vue-property-decorator';
export default class CheckboxSelectionComponent extends Vue {
    rows: any[];
    selected: any[];
    created(): void;
    fetch(cb: any): void;
    onSelect({ selected }: {
        selected: any;
    }): void;
    onActivate(event: any): void;
    add(): void;
    update(): void;
    remove(): void;
    displayCheck(row: any): boolean;
}
