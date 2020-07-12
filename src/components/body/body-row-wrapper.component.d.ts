import { Vue } from 'vue-property-decorator';
export default class DataTableRowWrapperComponent extends Vue {
    innerWidth: number;
    rowDetail: boolean;
    groupHeader: boolean;
    groupLevel: number;
    offsetX: number;
    rowDetailHeight: number;
    groupRowHeight: number;
    row: any;
    groupRowsBy: any[];
    rowIndex: number;
    expanded: boolean;
    styleObject: any;
    groupHeaderSlot: any;
    rowDetailSlot: any;
    mounted(): void;
    updated(): void;
    onContextmenu($event: MouseEvent): void;
    get groupHeaderStyles(): Record<string, string>;
}
