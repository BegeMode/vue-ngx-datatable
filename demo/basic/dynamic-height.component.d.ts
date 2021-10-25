import { Vue } from 'vue-property-decorator';
export default class DynamicHeightComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    expanded: {};
    timeout: any;
    created(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
    getRowHeight(row: Record<string, unknown>): unknown;
}
