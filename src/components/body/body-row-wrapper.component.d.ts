import { TGroupByField } from 'components/datatable.component';
import { VNode } from 'vue';
import { Vue } from 'vue-property-decorator';
export default class DataTableRowWrapperComponent extends Vue {
    innerWidth: number;
    rowDetail: boolean;
    groupHeader: boolean;
    groupLevel: number;
    offsetX: number;
    rowDetailHeight: number;
    groupRowHeight: number;
    groupHeaderStyles: Record<string, string | number>;
    groupHeaderClasses: string | Array<string>;
    row: Record<string, unknown>;
    rowIdentity: (row: Record<string, unknown>) => string | number;
    groupRowsBy: Array<TGroupByField | Array<TGroupByField>>;
    rowIndex: number;
    expanded: boolean;
    styleObject: Record<string, string>;
    groupHeaderSlot: (obj: Record<string, unknown>) => VNode[];
    rowDetailSlot: (obj: Record<string, unknown>) => VNode[];
    mounted(): void;
    updated(): void;
    onContextmenu($event: MouseEvent): void;
    get groupTitleStyles(): Record<string, string | number>;
    get rowId(): string | number | null;
}
