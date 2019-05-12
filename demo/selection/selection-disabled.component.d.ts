import { Vue } from 'vue-property-decorator';
export default class MultiDisableSelectionComponent extends Vue {
    rows: any[];
    selected: any[];
    columns: any[];
    created(): void;
    fetch(cb: any): void;
    onSelect({ selected }: {
        selected: any;
    }): void;
    onActivate(event: any): void;
    checkSelectable(event: any): boolean;
}
