import { Vue } from 'vue-property-decorator';
export default class ResponsiveComponent extends Vue {
    rows: any[];
    expanded: any;
    timeout: any;
    created(): void;
    onPage(event: any): void;
    fetch(cb: any): void;
    toggleExpandRow(row: any): void;
    onDetailToggle(event: any): void;
}
