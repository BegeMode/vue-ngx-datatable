import { Vue } from 'vue-property-decorator';
export default class CheckNoSelectionComponent extends Vue {
    rows: any[];
    selected: any[];
    checked: any[];
    created(): void;
    fetch(cb: any): void;
    onSelect({ selected }: {
        selected: any;
    }): void;
    onCheck({ checked }: {
        checked: any;
    }): void;
    onActivate(event: any): void;
    add(): void;
    update(): void;
    remove(): void;
    displayCheck(row: any): boolean;
}
