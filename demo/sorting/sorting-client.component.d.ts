import { Vue } from 'vue-property-decorator';
export default class ClientSortingComponent extends Vue {
    rows: Array<Record<string, unknown>>;
    columns: {
        name: string;
    }[];
    created(): void;
    fetch(cb: (data: Array<Record<string, unknown>>) => void): void;
}
