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
    created(): void;
    onContextmenu($event: MouseEvent): void;
    get groupHeaderStyles(): any;
}
