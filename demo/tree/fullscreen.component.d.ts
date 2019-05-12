import { Vue } from 'vue-property-decorator';
export default class FullScreenTreeComponent extends Vue {
    rows: any[];
    lastIndex: number;
    created(): void;
    fetch(cb: any): void;
    onTreeAction(event: any): void;
}
