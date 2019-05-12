import { Vue } from 'vue-property-decorator';
import { TableColumn } from '../../src/types';
export declare class FullScreenComponent extends Vue {
    rows: any[];
    columns: TableColumn[];
    created(): void;
    fetch(cb: any): void;
}
