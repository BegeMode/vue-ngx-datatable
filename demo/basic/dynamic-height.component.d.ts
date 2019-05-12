import { Vue } from 'vue-property-decorator';
export default class DynamicHeightComponent extends Vue {
    rows: any[];
    expanded: {};
    timeout: any;
    created(): void;
    fetch(cb: any): void;
    getRowHeight(row: any): any;
}
