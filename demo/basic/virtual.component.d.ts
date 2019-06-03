import { Vue } from 'vue-property-decorator';
export default class VirtualScrollComponent extends Vue {
    rows: any[];
    expanded: {};
    timeout: any;
    created(): void;
    onPage(event: any): void;
    fetch(cb: any): void;
    getRowHeight(row: any): any;
    onRendered(): void;
}
