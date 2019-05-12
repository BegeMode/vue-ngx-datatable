import { Vue } from 'vue-property-decorator';
export default class ClientSortingComponent extends Vue {
    rows: any[];
    columns: {
        name: string;
    }[];
    created(): void;
    fetch(cb: any): void;
}
