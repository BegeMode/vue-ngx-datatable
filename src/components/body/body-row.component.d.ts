import { Vue } from 'vue-property-decorator';
import { TableColumn } from '../../types/table-column.type';
export default class DataTableBodyRowComponent extends Vue {
    row: any;
    group: any[];
    columnsByPin: any[];
    columnGroupWidths: any;
    isSelected: boolean;
    rowStyles: any;
    groupStyles: any;
    groupClass: string;
    displayCheck: any;
    treeStatus: ({
        type: string;
        default: 'collapsed';
    });
    cellContext: any;
    cellColumnCssClasses: any;
    cellStyleObject: any;
    marginCellStyle: any;
    slots: any;
    renderTracking: boolean;
    counter: number;
    created(): void;
    updated(): void;
    onRowChanged(newVal: any, oldVal: any): void;
    onCellRendered(column: TableColumn): void;
    onActivate(event: any, index: number): void;
    onKeyDown(event: KeyboardEvent): void;
    onMouseenter(event: any): void;
    onTreeAction(event: any): void;
}
