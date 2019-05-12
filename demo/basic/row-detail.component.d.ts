import { Vue } from 'vue-property-decorator';
export default class RowDetailsComponent extends Vue {
    rows: any[];
    expanded: any;
    timeout: any;
    created(): void;
    onPage(event: any): void;
    fetch(cb: any): void;
    toggleExpandRow(row: any): void;
    onDetailToggle(event: any): void;
    expandAllRows(): void;
    collapseAllRows(): void;
}
