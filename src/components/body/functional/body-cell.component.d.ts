import { Vue } from 'vue-property-decorator';
export declare type TreeStatus = 'collapsed' | 'expanded' | 'loading' | 'disabled';
declare const _default: import("vue/types/vue").VueConstructor<{
    onFocus(props: any): void;
    onBlur(props: any): void;
    onClick(event: any, listeners: any, props: any): void;
    onDblClick(event: any, listeners: any, props: any): void;
    onKeyDown(event: any, listeners: any, props: any): void;
    onCheckboxChange(event: any, listeners: any, props: any): void;
    onTreeAction(event: any, listeners: any, props: any): void;
} & {
    context: any;
    cellColumnCssClasses: Function;
    cellStyleObject: Function;
    marginCellStyle: Function;
    tabIndex: string;
} & Vue>;
export default _default;
