import { Vue } from 'vue-property-decorator';
export default class ClientTreeComponent extends Vue {
    rows: any[];
    created(): void;
    fetch(cb: any): void;
    onTreeAction(event: any): void;
}
