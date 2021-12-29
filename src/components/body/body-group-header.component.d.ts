import { TGroupByField } from 'components/datatable.component';
import { VNode } from 'vue';
import { Vue } from 'vue-property-decorator';
import { IGroupedRows } from '../../types/grouped-rows';
export default class DataTableBodyGroupHeaderComponent extends Vue {
    rowHeight: number | ((group?: IGroupedRows, index?: number) => number);
    group: IGroupedRows;
    expanded: boolean;
    active: boolean;
    groupHeaderSlot: (obj: Record<string, unknown>) => VNode[];
    groupLevel: number;
    groupRowsBy: Array<TGroupByField | Array<TGroupByField>>;
    created(): void;
    beforeUpdate(): void;
    /**
     * Toggle the expansion of a group
     */
    toggleExpandGroup(): void;
    get groupTitle(): string;
    get styles(): Record<string, string>;
    get groupBy(): TGroupByField | Array<TGroupByField>;
}
