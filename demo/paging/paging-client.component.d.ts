import { Vue } from 'vue-property-decorator';
export default class ClientPagingComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    page: number;
    created(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
}
