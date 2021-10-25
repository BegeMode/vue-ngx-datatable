import { IGroupedRows } from 'types/grouped-rows';
import { VNode } from 'vue';
import { Vue } from 'vue-property-decorator';
export default class DataTableBodyRowDetailComponent extends Vue {
    rowHeight: number | ((group?: IGroupedRows, index?: number) => number);
    row: Record<string, unknown>;
    expanded: boolean;
    rowDetailSlot: (obj: Record<string, unknown>) => VNode[];
    created(): void;
    beforeUpdate(): void;
    toggleExpandGroup(): void;
}
