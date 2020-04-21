import { Vue } from 'vue-property-decorator';
import { TableColumn } from '../../types/table-column.type';
import { ICellContext } from 'types/cell-context.type';
export default class DataTableBodyRowComponent extends Vue {
    row: any;
    group: any[];
    columnsByPin: any[];
    columnGroupWidths: any;
    isSelected: boolean;
    isChecked: boolean;
    rowStyles: any;
    groupStyles: any;
    groupClass: string;
    displayCheck: any;
    treeStatus: ({
        type: string;
        default: 'collapsed';
    });
    cellContext: ICellContext;
    cellColumnCssClasses: (context: ICellContext) => Record<string, string>;
    cellStyleObject: (context: ICellContext) => Record<string, string | number>;
    marginCellStyle: (context: ICellContext) => Record<string, string>;
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
