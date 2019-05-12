import { Vue } from 'vue-property-decorator';
export default class CustomCheckboxSelectionComponent extends Vue {
    rows: any[];
    selected: any[];
    allSelected: boolean;
    created(): void;
    fetch(cb: any): void;
    onSelect({ selected }: {
        selected: any;
    }): void;
    onActivate(event: any): void;
    selectAll(): void;
    isSelected(row: any): any;
    onCheckboxChange(event: any, row: any): void;
    add(): void;
    update(): void;
    remove(): void;
}
