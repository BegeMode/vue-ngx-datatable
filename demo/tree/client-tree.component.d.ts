import { Vue } from 'vue-property-decorator';
export default class ClientTreeComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    created(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
    onTreeAction(event: any): void;
}
