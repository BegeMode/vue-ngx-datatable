import { Vue } from 'vue-property-decorator';
export default class FullScreenTreeComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    lastIndex: number;
    created(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
    onTreeAction(event: any): void;
}
