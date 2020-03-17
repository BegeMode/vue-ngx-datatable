import { Vue } from 'vue-property-decorator';
export default class SingleSelectionComponent extends Vue {
    items: any[];
    selected: any[];
    columns: any[];
    created(): void;
    fetch(cb: any): void;
    rowIdentity(row: any): number;
    onSelect({ selected }: {
        selected: any;
    }): Promise<void>;
    onActivate(event: any): void;
    updateRow(row: any): Promise<any>;
    get rows(): any[];
}
