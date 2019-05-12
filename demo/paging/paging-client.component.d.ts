import { Vue } from 'vue-property-decorator';
export default class ClientPagingComponent extends Vue {
    rows: any[];
    page: number;
    created(): void;
    fetch(cb: any): void;
}
