import { Vue } from 'vue-property-decorator';
export declare type TreeStatus = 'collapsed' | 'expanded' | 'loading' | 'disabled';
export default class DataTableBodyCellComponent extends Vue {
    context: any;
    cellColumnCssClasses: any;
    cellStyleObject: any;
    marginCellStyle: any;
    tabIndex: string;
    cellSlot: any;
    renderTracking: boolean;
    created(): void;
    beforeUpdate(): void;
    onFocus(): void;
    onBlur(): void;
    onClick(event: any): void;
    onDblClick(event: any): void;
    onKeyDown(event: any): void;
    onCheckboxChange(event: any): void;
    onTreeAction(event: any): void;
    onMouseEnter(event: any): void;
}
