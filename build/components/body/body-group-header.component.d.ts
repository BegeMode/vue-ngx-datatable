import { Vue } from 'vue-property-decorator';
import { IGroupedRows } from '../../types/grouped-rows';
export default class DataTableBodyGroupHeaderComponent extends Vue {
    rowHeight: (number | ((group?: any, index?: number) => number));
    group: IGroupedRows;
    expanded: boolean;
    groupHeaderSlot: any;
    groupLevel: number;
    groupRowsBy: string | any[];
    created(): void;
    beforeUpdate(): void;
    /**
     * Toggle the expansion of a group
     */
    toggleExpandGroup(): void;
    /**
     * Expand all groups
     */
    expandAllGroups(): void;
    /**
     * Collapse all groups
     */
    collapseAllGroups(): void;
    readonly groupTitle: string;
    readonly styles: {
        'padding-left': string;
    };
    readonly groupBy: any;
}
